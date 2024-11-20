import { Item } from "@/components/MultiselectButton/MultiselectButton.types";
import { TimeToggleOptions } from "@/types/TimeToggleType";
import { ToolCardProps } from "@/components/ToolCard/ToolCard.types";

export interface ToolsWidgetProps {
    tools: ToolCardProps[];
}

export const toolsColors = {
    red: "#C95D63",
    orange: "#EE8434",
    green: "#5DAC81"
};

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

export interface BarChartFilterData {
    selectedAOITools: Item[];
    selectedAOIErrors: Item[];
    selectedAOIDate: [string, string];
}
export interface LineChartFilterData {
    selectedTPTTools: Item[];
    selectedTPTDate: [string, string];
}

export interface CommonChartFilterData {
    timeFilter: TimeToggleOptions | null;
    visible: boolean;
}
