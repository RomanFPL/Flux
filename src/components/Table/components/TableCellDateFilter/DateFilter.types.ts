export interface DateFilterProps {
    dateRange: [string, string];
    onDateChange: (range: string[]) => void;
    children?: React.ReactNode;
    withFilterIcon?: boolean;
}
