import { Chart, ChartData } from "chart.js";

export interface BarChartProps {
    data: ChartData<"bar", (number | [number, number] | null)[], unknown>;
    withLegend?: boolean;
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

export type BarChartType = Chart<"bar", (number | [number, number] | null)[], unknown> | null;
