import { Item } from "@/components/MultiselectButton/MultiselectButton.types";
import { TimeToggleOptions } from "@/types/TimeToggleType";

export interface BarChartToolbarProps {
    errorValues: Item[];
    toolsValues: Item[];
    reset: () => void;
    dateType?: TimeToggleOptions | null;
}
