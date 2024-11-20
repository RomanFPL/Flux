import { Controller, useFormContext } from "react-hook-form";
import {
    isContextMenuPropsWithController,
    isDefaultSelectMenuPropsWithController,
    isFormSelectPropsWithController,
    SelectControllerWrapperProps
} from "./Select.types";
import { ContextMainMenu, FormSelectField, DefaultSelectMenu } from "./components/index";

const SelectButtonControllerWrapper = ({ ...props }: SelectControllerWrapperProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={props.name}
            control={control}
            render={({ field }) => {
                if (isContextMenuPropsWithController(props)) {
                    const selected = props.items?.find(({ value }) => value === field.value) || null;
                    return <ContextMainMenu {...props} selectedValue={selected} handleChange={field.onChange} />;
                }

                if (isDefaultSelectMenuPropsWithController(props)) {
                    const selected = props.items?.find(({ value }) => value === field.value) || null;
                    return <DefaultSelectMenu {...props} selectedValue={selected} handleChange={field.onChange} />;
                }

                if (isFormSelectPropsWithController(props)) {
                    const selected = props.items?.find(({ value }) => value === field.value) || null;
                    return <FormSelectField {...props} selectedValue={selected} handleChange={field.onChange} />;
                }
                return <></>;
            }}
        />
    );

    return null;
};

export default SelectButtonControllerWrapper;
