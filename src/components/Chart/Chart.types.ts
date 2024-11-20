import { ChartData, ChartDataset } from "chart.js";
import { BarChartProps } from "./components/BarChart/BarChart.types";
import { LineChartProps } from "./components/LineChart/LineChart.types";

type BarChart = {
    type: "bar";
    props: BarChartProps;
    isLoading?: boolean;
};

type LineChart = {
    type: "line";
    props: LineChartProps;
    isLoading?: boolean;
};

export type ChartProps = BarChart | LineChart;

// export interface LineChartData {
//     labels: string[];
//     datasets: Array<{
//         label: string;
//         data: number[];
//         borderColor: string;
//         backgroundColor: string;
//         borderWidth: number;
//         borderDash?: number[];
//         pointRadius: number;
//         isMarked: boolean;
//     }>;
// }

// Define a custom dataset type
export interface CustomLineDataset extends ChartDataset<"line", number[]> {
    isMarked?: boolean;
}

export interface CustomChartData extends Omit<ChartData<"line", number[], string>, "datasets"> {
    datasets: CustomLineDataset[];
}

export interface LineChartData {
    labels: string[];
    datasets: CustomLineDataset[];
}

export interface BarChartData {
    labels: string[];
    datasets: Array<{
        label: string;
        data: number[];
        backgroundColor: string;
        stack: string;
        barThickness: number;
    }>;
}

export const initChartData = {
    open: false,
    data: { label: "", value: "", color: "" },
    position: { x: 0, y: 0 }
};
