import { TimeToggleOptions } from "@/types/TimeToggleType";
import { differenceInHours, endOfDay, startOfDay, subDays, subMonths } from "date-fns";

export const quarterEnd = endOfDay(subMonths(new Date(), 3));
export const monthEnd = endOfDay(subMonths(new Date(), 1));
export const weekEnd = endOfDay(subDays(new Date(), 7));
export const yesterdayEnd = endOfDay(subDays(new Date(), 1));
export const todayEnd = endOfDay(new Date());
export const monthStart = startOfDay(subMonths(new Date(), 1));
export const weekStart = startOfDay(subDays(new Date(), 7));
export const todayStart = startOfDay(new Date());

export const day: [string, string] = [todayStart.toISOString(), todayEnd.toISOString()];
export const week: [string, string] = [weekStart.toISOString(), todayEnd.toISOString()];
export const month: [string, string] = [monthStart.toISOString(), todayEnd.toISOString()];

export const isDefinedRange = (range: [string, string]) => {
    return [day, week, month].some(
        ([start, end]) => start.slice(1, 20) === range[0].slice(1, 20) && end.slice(1, 20) === range[1].slice(1, 20)
    );
};

export const getGlobalDateFilter = (
    firstGraphDateFilter: TimeToggleOptions | null,
    secondGraphDateFilter: TimeToggleOptions | null
): TimeToggleOptions | null => {
    return firstGraphDateFilter === secondGraphDateFilter ? firstGraphDateFilter : null;
};

export const groupingByRange = (range: [string, string]) => {
    const [start, end] = range;

    const hoursDifference = differenceInHours(new Date(end), new Date(start));

    if (hoursDifference <= 24) return "hour";

    return "day";
};
