import {
    DataPoint,
    LightLCCDataPoints,
    ToolDataPoints,
    ToolIdentity,
    ToolsDataPointsData
} from "@/services/openApi/api";
import { HOURS, LABELS } from "./constants";
import { DatesRange } from "./processLineChartData";

const getPointName = (tool: ToolDataPoints, tools?: ToolIdentity[]) =>
    tools?.find(({ toolId }) => toolId === tool.toolID)?.machineName || String(tool.toolID);

const getAverageValue = (value: number, averageValue?: number) =>
    value ? (value + Number(averageValue)) / 2 : Number(averageValue);

const getDateLabel = (dateStr?: string) => {
    const date = new Date(dateStr || "");
    const day = date.getDate();
    const month = date.getMonth() + 1;
    if (!day || !month) return "";

    return `${day}/${month}`;
};

const sumDataValues = (dataArray: number[]) => {
    return dataArray.reduce((total, number) => Number(total) + Number(number), 0);
};

const mutateOriginArray = (originArray: number[], point: DataPoint) => {
    const date = new Date(point.date || "");
    const hour = date.getUTCHours();
    const index = HOURS.indexOf(hour);
    if (index !== -1) {
        originArray[index] = getAverageValue(originArray[index], point.value);
    }
};

export const prepareAverageDataPerHour = (data: ToolsDataPointsData, dateRange: DatesRange) => {
    const startHour = new Date(dateRange.startDate).getHours();
    const endHour = new Date(dateRange.endDate).getHours();

    const formatHourLabel = (hour: number): string => {
        const period = hour < 12 ? "AM" : "PM";
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
        return `${formattedHour}${period}`;
    };

    const labels = Array.from({ length: endHour - startHour + 1 }, (_, i) => formatHourLabel(startHour + i));

    const averageData: number[] = new Array(labels.length).fill(0);
    const countData: number[] = new Array(labels.length).fill(0);

    data.average?.forEach(point => {
        const hour = point.date ? new Date(point.date).getUTCHours() : null;
        if (hour !== null && hour >= startHour && hour <= endHour) {
            const index = hour - startHour;
            averageData[index] += point.value || 0;
            countData[index] += 1;
        }
    });

    const finalAverageData = averageData.map((total, index) => (countData[index] > 0 ? total / countData[index] : 0));

    return { labels, values: finalAverageData };
};

export const getDaysDatasets = (data?: Array<DataPoint> | null) => {
    if (!data) return { labels: [], values: [] };

    const dataBasedArray = data.reduce((acc: { [key: string]: number[] }, item) => {
        const formattedDate = getDateLabel(item.date);
        // console.log(item.date);

        if (Object.keys(acc).find(date => date === formattedDate)) {
            const newValuesArray = [...acc[formattedDate], Number(item.value)];
            return { ...acc, [formattedDate]: newValuesArray };
        }

        if (formattedDate) return { ...acc, [formattedDate]: [] };
        return acc;
    }, {});

    const labels = Object.keys(dataBasedArray);
    const values = Object.values(dataBasedArray).map(values => sumDataValues(values));
    return { labels, values };
};

export const prepareToolDataPointsPerDay = (data: ToolsDataPointsData | null) => {
    if (!data) return [];

    return (
        data.toolDataPoints?.map(({ toolID = "", dataPoints }) => {
            const dataLabels = getDaysDatasets(dataPoints);
            return { ...dataLabels, toolId: String(toolID) };
        }) || []
    );
};

export const prepareToolDataPointsPerHour = (data: ToolsDataPointsData, toolsMap?: ToolIdentity[]) => {
    const toolDataPoints: { values: number[]; toolId: string }[] = [];

    data?.toolDataPoints?.forEach(tool => {
        const toolsPoints: number[] = new Array(LABELS.length).fill(0);
        tool.dataPoints?.forEach(point => mutateOriginArray(toolsPoints, point));

        const pointName = getPointName(tool, toolsMap);

        toolDataPoints.push({
            values: toolsPoints,
            toolId: pointName
        });
    });

    return toolDataPoints;
};

export const prepareToolDataPointsPerLight = (data: LightLCCDataPoints[]) => {
    if (!data) return [];

    return (
        data?.map(({ lightName = "", dataPoints }) => {
            const dataLabels = getDaysDatasets(dataPoints);
            return { ...dataLabels, lightName: String(lightName) };
        }) || []
    );
};
