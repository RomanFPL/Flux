import { endOfDay, startOfDay, subMonths } from "date-fns";
import { useTranslations } from "next-intl";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { DateRangePicker, Range, RangeKeyDict } from "react-date-range";
import Slider from "../Slider";
import BackgroundBox from "./components/BackgroundBox/BackgroundBox";
import {
    ActionBock,
    ApplyButton,
    CalendarTypography,
    DateSelector,
    StyledPaper,
    StyledPopper,
    TypographyBlock
} from "./DateRangePickerPopper.styled";
import { convertToUTC, customLocale, formatTime, getTimeFormat } from "./helper";
import useCustomCalendarNavigation from "./useCustomCalendarNavigation";

interface DateRangePickerWrapperProps {
    open: boolean;
    setOpen: (boolean: any) => void;
    anchorRef: React.RefObject<HTMLElement>;
    setDateRange: (range: [string, string]) => void;
    dateRange: [string, string];
    showSlider?: boolean;
}

const DateRangePickerPopper: React.FC<DateRangePickerWrapperProps> = ({
    open,
    setOpen,
    anchorRef,
    setDateRange,
    dateRange,
    showSlider = false
}) => {
    const t = useTranslations();

    const popperRef = useRef<HTMLDivElement>(null);

    const customCalendarNavigation = useCustomCalendarNavigation();

    const predefinedValues = useMemo(
        () => ({
            startDate: convertToUTC(new Date(dateRange[0])),
            endDate: convertToUTC(new Date(dateRange[1])),
            key: "selection"
        }),
        [dateRange]
    );

    const predefinedTimeValues = useMemo(
        () => [new Date(dateRange[0]).getHours(), new Date(dateRange[1]).getHours()],
        [dateRange]
    );

    const [monthRange, setMonthRange] = useState<Range[]>([predefinedValues]);
    const [timeRange, setTimeRange] = useState<number[]>(predefinedTimeValues);
    const dateStart = new Date(String(monthRange?.[0].startDate));
    const dateEnd = new Date(String(monthRange?.[0]?.endDate));
    const formattedStartDate = getTimeFormat(dateStart);
    const formattedEndDate = getTimeFormat(dateEnd);

    useEffect(() => {
        setMonthRange([predefinedValues]);
    }, [predefinedValues]);
    useEffect(() => {
        setTimeRange(predefinedTimeValues);
    }, [predefinedTimeValues]);

    const handleClose = () => {
        const [startHour, endHour] = timeRange;

        const updatedStartDate = new Date(dateStart);
        const updatedEndDate = new Date(dateEnd);
        if (showSlider) {
            updatedStartDate.setHours(startHour, 0, 0);
            updatedEndDate.setHours(endHour, 59, 59, 999);
        }

        setDateRange([updatedStartDate.toISOString(), updatedEndDate.toISOString()]);
        setOpen(false);
    };

    const previousMonth = subMonths(new Date(), 1);

    const handleRangeChange = (range: RangeKeyDict) => {
        const rangeData = {
            ...range.selection,
            startDate: range.selection.startDate
                ? convertToUTC(startOfDay(range.selection.startDate))
                : range.selection.startDate,
            endDate: range.selection.endDate ? convertToUTC(endOfDay(range.selection.endDate)) : range.selection.endDate
        };
        setMonthRange([rangeData]);
    };

    const handleTimeChanged = (event: Event, newValue: number | number[]) => {
        setTimeRange(newValue as number[]);
    };

    const preparedMonthTitle =
        formattedStartDate === formattedEndDate ? formattedEndDate : [formattedStartDate, formattedEndDate].join(" - ");

    return (
        <>
            <StyledPopper ref={popperRef} open={open} anchorEl={anchorRef.current} placement="bottom-start">
                <StyledPaper>
                    <DateSelector>
                        <TypographyBlock>
                            <CalendarTypography>{preparedMonthTitle}</CalendarTypography>
                        </TypographyBlock>
                        <DateRangePicker
                            onChange={handleRangeChange}
                            showMonthAndYearPickers={false}
                            showMonthArrow={false}
                            months={2}
                            ranges={monthRange}
                            maxDate={new Date()}
                            shownDate={previousMonth}
                            rangeColors={["#CDE1E9", "#007192"]}
                            locale={customLocale}
                            direction="horizontal"
                            navigatorRenderer={customCalendarNavigation}
                            preventSnapRefocus
                        />
                        {showSlider && (
                            <Slider
                                onChange={handleTimeChanged}
                                valueLabelFormat={value => formatTime(value)}
                                value={timeRange}
                                min={0}
                                max={23}
                                step={1}
                            />
                        )}
                        <ActionBock>
                            <ApplyButton onClick={handleClose}>{t("apply")}</ApplyButton>
                        </ActionBock>
                    </DateSelector>
                </StyledPaper>
            </StyledPopper>
            <BackgroundBox isVisible={open} handler={handleClose} />
        </>
    );
};

export default DateRangePickerPopper;
