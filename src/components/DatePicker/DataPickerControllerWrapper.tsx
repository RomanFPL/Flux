import { Controller, useFormContext } from "react-hook-form";
import { DatePickerProps } from "./DatePicker.types";
import DatePicker from "./DatePicker";

interface DatePickerControllerWrapperProps extends Omit<DatePickerProps, "selectedDate" | "handleDateChange"> {
    name: string;
}

const DatePickerControllerWrapper = ({ name, ...props }: DatePickerControllerWrapperProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return <DatePicker {...props} selectedDate={field.value} handleDateChange={field.onChange} />;
            }}
        />
    );
};

export default DatePickerControllerWrapper;
