import { TimeToggleOptions } from "@/types/TimeToggleType";
import { Item } from "../../Health.types";

export interface StatisticProps {
    dateFilter: TimeToggleOptions;
    errors: Item[];
    predictions: Item[];
}

export interface HealthFormData {
    selectedTimeFilter: TimeToggleOptions;
    visible: boolean;
}
