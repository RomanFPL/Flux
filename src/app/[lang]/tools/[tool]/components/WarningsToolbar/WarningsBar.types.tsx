import { Item } from "@/components/MultiselectButton/MultiselectButton.types";
import { TimeToggleOptions } from "@/types/TimeToggleType";

export interface WarningsBarProps {
    warningNumber: number;
    severityValue: Item[];
    reset: () => void;
    dateType?: TimeToggleOptions | null;
}
