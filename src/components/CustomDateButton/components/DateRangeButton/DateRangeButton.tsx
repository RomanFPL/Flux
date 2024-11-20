import Badge from "@/components/Badge/Badge";
import { DatetimeIcon, DayIcon, DropDownIcon, FilterWhiteIcon, MonthIcon, WeekIcon } from "@/icons";
import { TimeToggleOptions } from "@/types/TimeToggleType";
import { Stack, Typography } from "@mui/material";
import React, { ForwardedRef } from "react";
import { DateTypography, StyledButton } from "./DateRangeButton.styled";
import { DateRangeButtonProps } from "./DateRangeButton.types";

const DateRangeButton = React.forwardRef(
    (
        { startData, startTime, endData, endTime, onClick, dateType }: DateRangeButtonProps,
        ref: ForwardedRef<HTMLButtonElement>
    ) => {
        const renderIcon = () => {
            if (TimeToggleOptions.DAY === dateType) {
                return <DayIcon />;
            } else if (TimeToggleOptions.WEEK === dateType) {
                return <WeekIcon />;
            } else if (TimeToggleOptions.MONTH === dateType) {
                return <MonthIcon />;
            } else {
                return <FilterWhiteIcon />;
            }
        };
        return (
            <StyledButton
                ref={ref}
                variant="contained"
                onClick={onClick}
                startIcon={<DatetimeIcon />}
                endIcon={<DropDownIcon />}
            >
                <Stack direction="row" gap={0.4}>
                    <Stack gap={0}>
                        <DateTypography>{startData}</DateTypography>
                        <DateTypography>{startTime}</DateTypography>
                    </Stack>
                    <Typography lineHeight={1.1}>-</Typography>
                    <Stack gap={0}>
                        <DateTypography>{endData}</DateTypography>
                        <DateTypography>{endTime}</DateTypography>
                    </Stack>
                </Stack>
                <Badge icon={renderIcon()}></Badge>
            </StyledButton>
        );
    }
);

DateRangeButton.displayName = "DateRangeButton";

export default DateRangeButton;
