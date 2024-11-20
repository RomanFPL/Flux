import { TimeToggleOptions } from "@/types/TimeToggleType";

export type CustomDateButtonProps = {
    dateRange: [string, string];
    setDateRange: (range: [string, string]) => void;
    dateType?: TimeToggleOptions | null;
    isTimeDisplay?: boolean;
};
