import { ChartData } from "chart.js";
import { CustomChartData } from "../Chart.types";

export interface LegendLabel {
    text: string;
    color: string;
    isMarked?: boolean;
}

export const convertBarChartDataToLegendLabels = (
    chartData: ChartData<"bar", (number | [number, number] | null)[], unknown>["datasets"]
): LegendLabel[] => {
    return chartData.map(dataset => ({
        text: dataset.label || "",
        color: dataset?.backgroundColor?.toString() || ""
    }));
};

export const convertLineChartDataToLegendLabels = (chartData: CustomChartData["datasets"]): LegendLabel[] => {
    return chartData.map(dataset => ({
        text: dataset.label || "",
        color: dataset?.backgroundColor?.toString() || "",
        isMarked: dataset?.isMarked
    }));
};
