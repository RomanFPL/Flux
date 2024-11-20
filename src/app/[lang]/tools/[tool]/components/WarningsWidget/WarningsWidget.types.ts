import { Item } from "@/components/MultiselectButton/MultiselectButton.types";
import { TimeToggleOptions } from "@/types/TimeToggleType";

export interface WarningsFormData {
    visible: boolean;
    maximize: boolean;
    selectedSeverities: Item[];
    selectedDateRange: [string, string];
    selectedDateType: TimeToggleOptions | null;
}

export interface WarningsWidgetProps {
    toolId: string;
}
