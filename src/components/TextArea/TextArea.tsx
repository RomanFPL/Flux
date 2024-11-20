import { FormLabel, Stack } from "@mui/material";
import React from "react";
import { TextAreaFieldProps } from "./TextArea.types";
import { Star, StyledTextArea } from "./TextArea.styled";

const TextAreaField = ({ label, setValue, value, required }: TextAreaFieldProps) => {
    const inputId = `textarea-${label?.replace(/\s+/g, "-").toLowerCase()}`;
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(event.target.value);
    };

    return (
        <Stack>
            <FormLabel component="label" htmlFor={inputId}>
                {label} {required && <Star>*</Star>}
            </FormLabel>
            <StyledTextArea id={inputId} multiline rows={4} variant="outlined" value={value} onChange={handleChange} />
        </Stack>
    );
};

export default TextAreaField;
