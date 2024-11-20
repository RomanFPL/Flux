import { format } from "date-fns";
import { useRef, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DateRangePickerPopper from "../DateRangePickerPopper/DateRangePickerPopper";
import DateRangeButton from "./components/DateRangeButton/DateRangeButton";
import { CustomDateButtonProps } from "./CustomDateButton.types";

const CustomDateButton = ({ dateRange, setDateRange, dateType, isTimeDisplay = true }: CustomDateButtonProps) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const sDate = new Date(dateRange[0] || 0);
    const eDate = new Date(dateRange[1] || 0);
    const startData = format(sDate, "dd/MM/yyyy");
    const endData = format(eDate, "dd/MM/yyyy");
    const startTime = isTimeDisplay ? format(sDate, "h:mm a") : "";
    const endTime = isTimeDisplay ? format(eDate, "h:mm a") : "";

    return (
        <>
            <DateRangeButton
                ref={anchorRef}
                {...{ startData, startTime, endData, endTime, dateType }}
                onClick={handleToggle}
            />
            <DateRangePickerPopper
                open={open}
                setOpen={setOpen}
                anchorRef={anchorRef}
                showSlider={isTimeDisplay}
                dateRange={dateRange}
                setDateRange={setDateRange}
            />
        </>
    );
};

export default CustomDateButton;
