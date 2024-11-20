import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextArea from "./TextArea";
import { TextAreaControllerWrapperProps } from "./TextArea.types";

const TextAreaControllerWrapper = ({ name, ...props }: TextAreaControllerWrapperProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return <TextArea {...props} value={field.value} setValue={field.onChange} />;
            }}
        />
    );
};

export default TextAreaControllerWrapper;
