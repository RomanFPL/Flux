import { Theme } from "@mui/material";
import { DailyErrorCount } from "@/services/openApi/api";
import { Item } from "../../MultiselectButton/MultiselectButton.types";
import { BarChartData } from "../Chart.types";
import { predefinedErrors } from "@/types/error.types";

const getOrderedErrors = (errors?: Item[]): string[] => {
    if (!errors) return [];
    const predefinedOrder: string[] = predefinedErrors.reduce((preparedErrors: string[], currentError: string) => {
        const orderValue = errors.find(({ value }) => value === currentError);
        if (orderValue) {
            return [...preparedErrors, orderValue.value];
        }
        return preparedErrors;
    }, []);

    return predefinedOrder;
};

const processBarChartData = (
    data: DailyErrorCount[],
    theme: Theme,
    options?: { filter?: Item[]; grouping?: "day" | "hour" }
): BarChartData => {
    if (!data)
        return {
            labels: [],
            datasets: []
        };

    const predefinedOrder = getOrderedErrors(options?.filter);

    const errorTypes = new Set<string>();
    data.forEach(day => day.errorsCount?.forEach(error => errorTypes.add(error.name || "")));

    const sortedData = [...data];
    sortedData.sort((a: DailyErrorCount, b: DailyErrorCount) => {
        const a_date = a.date ? new Date(a.date) : new Date(0);
        const b_date = b.date ? new Date(b.date) : new Date(0);
        return a_date.getTime() - b_date.getTime();
    });

    const datasets = predefinedOrder.map(type => ({
        label: type,
        data: new Array(sortedData.length).fill(0),
        backgroundColor: getBarColor(type, theme),
        hoverBackgroundColor: getBarColor(type, theme),
        stack: "Stack 0",
        barThickness: 16
    }));

    const labels = sortedData.map(day => {
        const date = new Date(day.date || "");
        return `${date.getDate()}/${date.getMonth() + 1}`;
    });

    sortedData.forEach((day, index) => {
        day.errorsCount?.forEach(error => {
            const dataset = datasets.find(d => d.label === error.name);
            if (dataset && error.value !== undefined) {
                dataset.data[index] = error.value;
            }
        });
    });

    return {
        labels,
        datasets
    };
};

function getBarColor(errorType: string, theme: Theme): string {
    switch (errorType) {
        case "Alignment error":
            return theme.palette.charts.pink;
        case "Scan break":
            return theme.palette.charts.navy;
        case "2D scan error":
            return theme.palette.charts.yellow;
        case "3D scan error":
            return theme.palette.charts.aqua;
        case "Kill AOI":
            return theme.palette.charts.lightBlue;
        default:
            return theme.palette.background.paper;
    }
}

export default processBarChartData;
