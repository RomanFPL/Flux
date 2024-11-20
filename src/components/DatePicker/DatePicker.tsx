import React, { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { FormLabel, Stack } from "@mui/material";
import { DatePickerProps } from "./DatePicker.types";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import { St } from "./DatePicker.styled";
import theme from "../../styles/theme/theme";
import { format, getHours, setHours } from "date-fns";
import PrevIcon from "../../icons/PrevIcon";
import NextIcon from "../../icons/NextIcon";
import DropDownIcon from "../../icons/DropDownIcon";
import { setMinutesToZero } from "@/utils/setMinutesToZero";
import BackgroundBox from "../DateRangePickerPopper/components/BackgroundBox/BackgroundBox";

const DatePicker = ({ required, label, selectedDate, handleDateChange }: DatePickerProps) => {
    const [open, setOpen] = useState(false);

    const handleInputClick = () => {
        setOpen(true);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    const formattedDate = selectedDate ? format(new Date(selectedDate), "d MMMM yyyy") : "YourDate";

    const handleDateSelect = (date: Date | null) => {
        if (!date) return "";
        if (selectedDate) {
            const hour = getHours(new Date(selectedDate));
            const updatedDate = setHours(date, hour);
            const ISOString = setMinutesToZero(updatedDate.toUTCString());
            handleDateChange(ISOString);
            return;
        }
        date.setMinutes(0, 0, 0);
        const ISOString = setMinutesToZero(date.toUTCString());
        handleDateChange(ISOString);
    };

    return (
        <>
            <Stack width="100%" gap={1}>
                <FormLabel component="label">
                    {label} {required && <St>*</St>}
                </FormLabel>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MUIDatePicker
                        slots={{
                            leftArrowIcon: PrevIcon,
                            rightArrowIcon: NextIcon,
                            switchViewIcon: DropDownIcon
                        }}
                        open={open}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                onClick: handleInputClick,
                                InputProps: {
                                    endAdornment: null,
                                    value: formattedDate,
                                    sx: {
                                        height: "40px",
                                        maxHeight: "40px",
                                        "& .MuiInputBase-input": {
                                            padding: "10px 12px"
                                        },
                                        "&.MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                borderColor: theme.palette.border
                                            },
                                            "&:hover fieldset": {
                                                borderColor: theme.palette.border,
                                                boxShadow: `0px 3px 6px ${theme.palette.shadow}`
                                            },
                                            "&.Mui-focused": {
                                                borderColor: theme.palette.border,
                                                boxShadow: `0px 3px 6px ${theme.palette.shadow}`
                                            }
                                        }
                                    }
                                }
                            },
                            switchViewButton: {
                                sx: {
                                    background: "transparent",
                                    "&:hover": { background: "transparent" }
                                }
                            },
                            popper: {
                                sx: {
                                    ".MuiPickersArrowSwitcher-spacer": {
                                        width: "40px"
                                    },
                                    ".MuiPickersCalendarHeader-root": {
                                        padding: 4,
                                        height: 30,
                                        "& button": {
                                            height: 30,
                                            width: 30,
                                            padding: 0
                                        }
                                    }
                                },
                                modifiers: [
                                    {
                                        name: "offset",
                                        options: {
                                            offset: [0, 5]
                                        }
                                    }
                                ]
                            }
                        }}
                        value={new Date(selectedDate)}
                        onChange={handleDateSelect}
                    />
                </LocalizationProvider>
                <BackgroundBox isVisible={open} handler={handleClickAway} zindex={1300} />
            </Stack>
        </>
    );
};

export default DatePicker;
