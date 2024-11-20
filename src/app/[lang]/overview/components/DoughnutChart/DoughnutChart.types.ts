import { ChartData } from "chart.js";

export interface DoughnutChartProps {
    data: ChartData<"doughnut", number[], string>;
    toolsCount?: number;
    labels: ChartDataLabels[];
}

export interface ChartDataLabels {
    name: string;
    count: number;
    color: string;
}
