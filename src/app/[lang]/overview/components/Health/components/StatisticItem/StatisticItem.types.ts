import { Item } from "../../Health.types";

export interface StatisticItemProps {
    title: string;
    timeMarker: string;
    items: Item[];
    isRow?: boolean;
}
