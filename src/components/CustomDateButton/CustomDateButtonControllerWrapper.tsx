import { Controller, useFormContext } from "react-hook-form";
import CustomDateButton from "./CustomDateButton";
import { CustomDateButtonProps } from "./CustomDateButton.types";

interface MultiselectControllerWrapperProps extends Omit<CustomDateButtonProps, "dateRange" | "setDateRange"> {
    name: string;
}

const MultiselectControllerWrapper = ({ name, ...props }: MultiselectControllerWrapperProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return <CustomDateButton {...props} dateRange={field.value} setDateRange={field.onChange} />;
            }}
        />
    );
};

export default MultiselectControllerWrapper;
