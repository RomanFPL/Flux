import { LccTimeToggleOptions, TimeToggleOptions } from "@/types/TimeToggleType";
import { endOfDay, startOfDay, subDays, subMonths, subYears } from "date-fns";

export const calcDuration = (duration: TimeToggleOptions | null) => {
    const todayEnd = endOfDay(new Date());
    const yearStart = startOfDay(subYears(new Date(), 1));
    const quarterStart = startOfDay(subMonths(new Date(), 3));
    const monthStart = startOfDay(subMonths(new Date(), 1));
    const weekStart = startOfDay(subDays(new Date(), 7));
    const todayStart = startOfDay(new Date());
    switch (duration) {
        case TimeToggleOptions.DAY:
            const day: [string, string] = [todayStart.toISOString(), todayEnd.toISOString()];
            return day;
        case TimeToggleOptions.WEEK:
            const week: [string, string] = [weekStart.toISOString(), todayEnd.toISOString()];
            return week;
        case TimeToggleOptions.MONTH:
            const month: [string, string] = [monthStart.toISOString(), todayEnd.toISOString()];
            return month;
        case TimeToggleOptions.QUARTER:
            const quarter: [string, string] = [quarterStart.toISOString(), todayEnd.toISOString()];
            return quarter;
        case TimeToggleOptions.YEAR:
            const year: [string, string] = [yearStart.toISOString(), todayEnd.toISOString()];
            return year;
        default:
            throw new Error("Invalid duration");
    }
};

export const calcLccDuration = (duration: LccTimeToggleOptions | null | undefined) => {
    const todayEnd = endOfDay(new Date());
    const fiveYearStart = startOfDay(subYears(new Date(), 5));
    const yearStart = startOfDay(subYears(new Date(), 1));
    const monthStart = startOfDay(subMonths(new Date(), 1));
    const weekStart = startOfDay(subDays(new Date(), 7));
    const todayStart = startOfDay(new Date());
    switch (duration) {
        case LccTimeToggleOptions.DAY:
            const day: [string, string] = [todayStart.toISOString(), todayEnd.toISOString()];
            return day;
        case LccTimeToggleOptions.WEEK:
            const week: [string, string] = [weekStart.toISOString(), todayEnd.toISOString()];
            return week;
        case LccTimeToggleOptions.MONTH:
            const month: [string, string] = [monthStart.toISOString(), todayEnd.toISOString()];
            return month;
        case LccTimeToggleOptions.YEAR:
            const year: [string, string] = [yearStart.toISOString(), todayEnd.toISOString()];
            return year;
        case LccTimeToggleOptions.FIVE:
            const fiveYear: [string, string] = [fiveYearStart.toISOString(), todayEnd.toISOString()];
            return fiveYear;
        default:
            const defaultValue: [string, string] = ["", ""];
            return defaultValue;
    }
};

export const getFormattedDate = (date: Date) => {
    const formattedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
    return formattedDate;
};
