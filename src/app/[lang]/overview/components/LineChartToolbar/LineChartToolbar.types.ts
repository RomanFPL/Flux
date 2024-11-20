import { Item } from "@/components/MultiselectButton/MultiselectButton.types";
import { TimeToggleOptions } from "@/types/TimeToggleType";

export interface LineChartToolbarProps {
    toolsValues: Item[];
    reset: () => void;
    dateType?: TimeToggleOptions | null;
}
