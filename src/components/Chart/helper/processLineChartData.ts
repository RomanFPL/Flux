import { ToolIdentity, ToolsDataPointsData } from "@/services/openApi/api";
import { Theme } from "@mui/material";
import { LineChartData } from "../Chart.types";
import {
    getDaysDatasets,
    prepareAverageDataPerHour,
    prepareToolDataPointsPerDay,
    prepareToolDataPointsPerHour
} from "./prepareToolDataPoints";
import { getAverageDataPoints, getGeneralDataPoints } from "./getDataPoints";

export type DatesRange = {
    startDate: string;
    endDate: string;
};

const processLineChartData = (
    data: ToolsDataPointsData,
    theme: Theme,
    dateRange: DatesRange,
    avgText?: string,
    options?: { averageOnly?: boolean; toolsMap?: ToolIdentity[]; grouping?: "day" | "hour" }
): LineChartData => {
    if (!data) return { labels: [], datasets: [] };

    const isDashed = !!options?.averageOnly;

    if (options?.grouping === "day") {
        const { values, labels } = getDaysDatasets(data.average);
        const averageDataSet = getAverageDataPoints({ values, label: avgText, theme, isDashed });

        if (options?.averageOnly) return { labels: labels, datasets: [averageDataSet] };

        const toolDataPoints = prepareToolDataPointsPerDay(data);
        const generalDataSet = getGeneralDataPoints({ theme, dataRange: toolDataPoints });
        return { labels: labels, datasets: [averageDataSet, ...generalDataSet] };
    }

    if (options?.grouping === "hour") {
        const { values, labels } = prepareAverageDataPerHour(data, dateRange);
        const averageDataSet = getAverageDataPoints({ values, label: avgText, theme, isDashed });

        if (options?.averageOnly) return { labels: labels, datasets: [averageDataSet] };

        const toolDataPoints = prepareToolDataPointsPerHour(data, options?.toolsMap);
        const generalDataSet = getGeneralDataPoints({ theme, dataRange: toolDataPoints });

        return {
            labels: labels,
            datasets: [averageDataSet, ...generalDataSet]
        };
    }

    return { labels: [], datasets: [] };
};

export default processLineChartData;
