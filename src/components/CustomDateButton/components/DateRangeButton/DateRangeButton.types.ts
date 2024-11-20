import { TimeToggleOptions } from "@/types/TimeToggleType";

export interface DateRangeButtonProps {
    startData: string;
    startTime: string;
    endData: string;
    endTime: string;
    onClick: () => void;
    dateType?: TimeToggleOptions | null;
}
