import { Chart, ChartData } from "chart.js";

export interface LineChartProps {
    data: ChartData<"line", number[], string>;
    withLegend?: boolean;
    withDivider?: boolean;
    withVerticalLines?: boolean;
    withPoints?: boolean;
    zoom?: number | undefined;
}

export interface TooltipData {
    label?: string;
    value?: string | number | [number, number] | null;
    color?: string;
}

export interface TooltipPosition {
    x: number;
    y: number;
}

export interface TooltipState {
    open: boolean;
    data: TooltipData;
    position: TooltipPosition;
}

export type LineChartType = Chart<"line", (number | [number, number] | null)[], unknown> | null;
