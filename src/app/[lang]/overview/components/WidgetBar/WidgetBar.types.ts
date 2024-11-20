import { Item } from "@/components/MultiselectButton/MultiselectButton.types";

export interface ToolBarProps {
    toolCount?: number;
    toolsUp?: number;
    toolsDown?: number;
    toolsMain?: number;
    hiddenDownTools?: number;
    unknownTools?: number;
    statusGroupValue: Item[];
}

export interface FormFields {
    searchValue: string;
}
