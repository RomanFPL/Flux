import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "./TextField";
import { TextFieldControllerWrapperProps } from "./TextField.types";

const TextFieldControllerWrapper = ({ name, ...props }: TextFieldControllerWrapperProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            rules={props.required ? { required: "This field is required" } : undefined}
            render={({ field }) => {
                return <TextField {...props} value={field.value} setValue={field.onChange} />;
            }}
        />
    );
};

export default TextFieldControllerWrapper;
