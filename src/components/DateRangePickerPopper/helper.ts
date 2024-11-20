import { enUS } from "date-fns/locale";

export const getYearMonths = (currentDate: Date) => {
    const months = [];
    const startMonth = currentDate.getMonth();
    const startYear = currentDate.getFullYear();

    for (let i = 0; i < 12; i++) {
        const monthDate = new Date(startYear, startMonth - i, 1);
        months.unshift({
            text: monthDate.toLocaleString("en-GB", { month: "long", year: "numeric" }),
            value: monthDate
        });
    }

    return months;
};

export const getTimeFormat = (date: Date) =>
    date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

export const customLocale: Locale = {
    ...enUS,
    localize: {
        ...enUS.localize,
        day: (n: number) => ["S", "M", "T", "W", "T", "F", "S"][n],
        ordinalNumber: (n: number, options?: { unit?: string }) => String(n),
        era: enUS.localize?.era ?? (() => ""),
        quarter: enUS.localize?.quarter ?? (() => ""),
        month: enUS.localize?.month ?? (() => ""),
        dayPeriod: enUS.localize?.dayPeriod ?? (() => "")
    }
};

export const formatTime = (hours: number) => {
    const isPM = hours >= 12;
    const formattedHour = hours % 12 || 12;
    return `${formattedHour} ${isPM ? "PM" : "AM"}`;
};

export const convertToUTC = (date: Date): Date => {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
};
