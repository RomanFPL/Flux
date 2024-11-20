import { endOfDay, startOfDay, subDays, subMonths, subYears } from "date-fns";

export const yearEnd = endOfDay(subYears(new Date(), 1));
export const quarterEnd = endOfDay(subMonths(new Date(), 3));
export const monthEnd = endOfDay(subMonths(new Date(), 1));
export const weekEnd = endOfDay(subDays(new Date(), 7));
export const yesterdayEnd = endOfDay(subDays(new Date(), 1));
export const todayEnd = endOfDay(new Date());
export const yearStart = startOfDay(subYears(new Date(), 1));
export const quarterStart = startOfDay(subMonths(new Date(), 3));
export const monthStart = startOfDay(subMonths(new Date(), 1));
export const weekStart = startOfDay(subDays(new Date(), 7));
export const todayStart = startOfDay(new Date());

export const day: [string, string] = [todayStart.toISOString(), todayEnd.toISOString()];
export const week: [string, string] = [weekStart.toISOString(), todayEnd.toISOString()];
export const month: [string, string] = [monthStart.toISOString(), todayEnd.toISOString()];
export const quarter: [string, string] = [quarterStart.toISOString(), todayEnd.toISOString()];
export const year: [string, string] = [yearStart.toISOString(), todayEnd.toISOString()];

export const isDefinedRange = (range: [string, string]) => {
    return [day, week, month].some(
        ([start, end]) => start.slice(1, 20) === range[0].slice(1, 20) && end.slice(1, 20) === range[1].slice(1, 20)
    );
};
