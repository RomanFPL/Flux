import { Item } from "@/components/MultiselectButton/MultiselectButton.types";

export const toolsColors = {
    red: "#C95D63",
    orange: "#EE8434",
    green: "#5DAC81"
};

export interface ToolsWidgetProps {
    elementsAmount?: number;
}

export interface ToolsFilterData {
    searchValue: string;
    selectedStatusGroup: Item[];
    isGridView: boolean;
    isExpandView: boolean;
}
