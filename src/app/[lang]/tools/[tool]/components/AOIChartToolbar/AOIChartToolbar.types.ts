import { Item } from "@/components/MultiselectButton/MultiselectButton.types";
import { TimeToggleOptions } from "@/types/TimeToggleType";

export interface AOIChartToolbarProps {
    errorValues: Item[];
    reset: () => void;
    dateType?: TimeToggleOptions | null;
}
