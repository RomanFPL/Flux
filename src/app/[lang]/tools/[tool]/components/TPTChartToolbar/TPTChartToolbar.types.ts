import { TimeToggleOptions } from "@/types/TimeToggleType";

export interface TPTChartToolbarProps {
    reset: () => void;
    dateType?: TimeToggleOptions | null;
}
