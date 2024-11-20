import React from "react";
import DatePickerRoot from "./DatePicker";
import DatePickerControllerWrapper from "./DataPickerControllerWrapper";

const DatePicker = (props: React.ComponentProps<typeof DatePickerRoot>) => {
    return <DatePickerRoot {...props} />;
};

DatePicker.withController = DatePickerControllerWrapper;

export default DatePicker;
