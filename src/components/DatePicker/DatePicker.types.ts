export interface DatePickerProps {
    required?: boolean;
    label?: string;
    selectedDate: string;
    handleDateChange: (newDate: string) => void;
}
