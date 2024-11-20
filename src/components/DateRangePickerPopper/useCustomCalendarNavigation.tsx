import { Box, SelectChangeEvent, Stack } from "@mui/material";
import { getYearMonths } from "./helper";

import React from "react";
import { NavigatorContainer } from "./DateRangePickerPopper.styled";
import SelectButton from "../Select/Select";
import IconButton from "../IconButton";
import { PrevIcon, NextIcon } from "@/icons";
import { addMonths } from "date-fns";

const getSelectedElem = (
    range: Array<{
        text: string;
        value: Date;
    }>,
    currentDate: Date,
    returnNext: boolean = true
): {
    text: string;
    value: Date;
} => {
    const currentIndex = range.findIndex(({ value }) => {
        return value.getMonth() === currentDate.getMonth() && value.getFullYear() === currentDate.getFullYear();
    });

    if (currentIndex === -1) return { value: new Date(), text: "" };

    if (returnNext) return range[currentIndex + 1];
    return range[currentIndex];
};

const useCustomCalendarNavigation = () => {
    const customCalendarNavigation = (
        currFocusedDate: Date,
        changeShownDate: (value: Date | number | string, mode?: "set" | "setYear" | "setMonth" | "monthOffset") => void
    ) => {
        const dateArray = getYearMonths(new Date());
        const handleFirstCalendar = (event: SelectChangeEvent<unknown>) => {
            const selectedDate = event.target.value as Date;
            changeShownDate(selectedDate, "set");
        };

        const handleSecondCalendar = (event: SelectChangeEvent<unknown>) => {
            const selectedDate = event.target.value as Date;
            changeShownDate(addMonths(selectedDate, -1), "set");
        };

        const calendarList1 = dateArray.slice(0, -1);
        const calendarList2 = dateArray.slice(1);

        const selected1Value = getSelectedElem(dateArray, currFocusedDate, false);
        const selected2Value = getSelectedElem(dateArray, currFocusedDate);

        const availablePrev = selected1Value.value !== calendarList1[0].value;
        const availableNext = selected2Value.value !== calendarList2.reverse()?.[0].value;

        return (
            <NavigatorContainer>
                <Box paddingRight={18} paddingLeft={4}>
                    <SelectButton
                        type="default"
                        width="140px"
                        items={calendarList1}
                        selectedValue={selected1Value}
                        handleChange={handleFirstCalendar}
                    />
                </Box>
                <SelectButton
                    type="default"
                    width="140px"
                    items={calendarList2}
                    selectedValue={selected2Value}
                    handleChange={handleSecondCalendar}
                />
                <Stack flexDirection="row" gap={2}>
                    <IconButton size="medium" onClick={() => availablePrev && changeShownDate(-1, "monthOffset")}>
                        <PrevIcon />
                    </IconButton>
                    <IconButton size="medium" onClick={() => availableNext && changeShownDate(1, "monthOffset")}>
                        <NextIcon />
                    </IconButton>
                </Stack>
            </NavigatorContainer>
        );
    };

    return customCalendarNavigation;
};

export default useCustomCalendarNavigation;
