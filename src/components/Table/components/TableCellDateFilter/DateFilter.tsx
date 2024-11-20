import React, { memo, useRef, useState } from "react";
import { Stack } from "@mui/material";
import { DateFilterProps } from "./DateFilter.types";
import DateRangePickerPopper from "@/components/DateRangePickerPopper/DateRangePickerPopper";
import FilterIcons from "../FilterIcons/FilterIcons";

const areEqual = (prevProps: DateFilterProps, nextProps: DateFilterProps) => {
    return prevProps.dateRange[0] === nextProps.dateRange[0] && prevProps.dateRange[1] === nextProps.dateRange[1];
};

const DateFilter: React.FC<DateFilterProps> = ({ dateRange, onDateChange, children, withFilterIcon }) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    return (
        <>
            <Stack
                sx={{ cursor: "pointer" }}
                alignItems="center"
                gap="5px"
                direction="row"
                ref={anchorRef}
                onClick={handleToggle}
            >
                {children}
                <FilterIcons withFilterIcon={withFilterIcon} />
            </Stack>
            <DateRangePickerPopper
                open={open}
                setOpen={setOpen}
                anchorRef={anchorRef}
                dateRange={dateRange}
                setDateRange={onDateChange}
            />
        </>
    );
};

export default memo(DateFilter, areEqual);
