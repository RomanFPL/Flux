import { Controller, useFormContext } from "react-hook-form";
import MultiselectButton from "./MultiselectButton";
import { MultiselectControllerWrapperProps } from "./MultiselectButton.types";

const MultiselectControllerWrapper = ({ name, ...props }: MultiselectControllerWrapperProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return <MultiselectButton {...props} selectedItems={field.value} setSelectedItems={field.onChange} />;
            }}
        />
    );
};

export default MultiselectControllerWrapper;
