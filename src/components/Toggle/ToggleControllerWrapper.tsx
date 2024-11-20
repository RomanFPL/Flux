import { Controller, useFormContext } from "react-hook-form";
import Toggle from "./Toggle";
import { ToggleProps } from "./Toggle.types";

interface ToggleControllerWrapperProps<T extends string> extends Omit<ToggleProps<T>, "value" | "handleChange"> {
    name: string;
}

const ToggleControllerWrapper = <T extends string>({ name, ...props }: ToggleControllerWrapperProps<T>) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return <Toggle {...props} name={name} value={field.value} handleChange={field.onChange} />;
            }}
        />
    );
};

export default ToggleControllerWrapper;
