import { DoughnutChartProps } from "../../../DoughnutChart/DoughnutChart.types";

export interface PieChartProps {
    chartData: Omit<DoughnutChartProps, "toolsCount">;
    totalTools?: number;
}
