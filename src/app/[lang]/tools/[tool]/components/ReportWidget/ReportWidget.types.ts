import { ToolCardProps } from "@/components/ToolCard/ToolCard.types";

export interface ToolsWidgetProps {
    tools: ToolCardProps[];
}

export const toolsColors = {
    red: "#C95D63",
    orange: "#EE8434",
    green: "#5DAC81"
};

import { Item } from "@/components/MultiselectButton/MultiselectButton.types";
import { LccLightType } from "@/types/LccLightType";
import { LccTimeToggleOptions, TimeToggleOptions } from "@/types/TimeToggleType";

export interface LineChartData {
    labels: string[];
    datasets: Array<{
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
        borderWidth: number;
        borderDash?: number[];
        pointRadius: number;
        isMarked: boolean;
    }>;
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

export interface AOIChartFilterData {
    selectedAOIErrors: Item[];
    selectedAOIDate: [string, string];
}
export interface LineChartFilterData {
    selectedTPTDate: [string, string];
}
export interface CommonChartFilterData {
    timeFilter: TimeToggleOptions | null;
    visible: boolean;
    selectedGraphs: Item[];
}

export interface LCCChartFilterData {
    lightType: LccLightType;
    timeFilter: LccTimeToggleOptions | null;
    zoom: number;
    maximize: boolean;
}

export interface ReportWidgetProps {
    toolId: string;
}
export interface ReportsFormData {
    visible: boolean;
}
