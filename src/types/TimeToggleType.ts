/* eslint-disable no-unused-vars */
export enum TimeToggleOptions {
    DAY = "D",
    WEEK = "W",
    MONTH = "M",
    QUARTER = "Q",
    YEAR = "Y"
}

export enum LccTimeToggleOptions {
    DAY = "D",
    WEEK = "W",
    MONTH = "M",
    YEAR = "Y",
    FIVE = "F"
}

export const timeLabels = {
    [TimeToggleOptions.DAY]: "day",
    [TimeToggleOptions.WEEK]: "week",
    [TimeToggleOptions.MONTH]: "month",
    [TimeToggleOptions.QUARTER]: "quarter",
    [TimeToggleOptions.YEAR]: "year"
};
