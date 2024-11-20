import { FormLabel, Stack, Typography } from "@mui/material";
import React from "react";
import { TextFieldProps } from "./TextField.types";
import { MainField, St } from "./TextField.tsx.styled";
import { useTranslations } from "next-intl";

const TextField = ({ label, required, type = "default", value, setValue, error }: TextFieldProps) => {
    const t = useTranslations();

    const star = required ? <St>{t("star")}</St> : null;
    const inputId = `input-${label?.replace(/\s+/g, "-").toLowerCase()}`;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(event.target.value);
    };

    if (type === "hour")
        return (
            <Stack width="100%">
                {label && (
                    <FormLabel component="label" htmlFor={inputId}>
                        {label} {star}
                    </FormLabel>
                )}
                <Stack flexDirection="row" alignItems="center" gap={1}>
                    <MainField
                        id={inputId}
                        autoFocus
                        margin="dense"
                        type="number"
                        fullWidth
                        label=""
                        variant="outlined"
                        value={value}
                        onChange={handleChange}
                    />
                    <span>h</span>
                </Stack>
            </Stack>
        );

    if (label)
        return (
            <Stack>
                <Stack flexDirection="row" justifyContent="space-between">
                    <FormLabel component="label" htmlFor={inputId}>
                        {label} {star}
                    </FormLabel>
                    {error && <Typography color="#C95D63">{error}</Typography>}
                </Stack>
                <MainField
                    id={inputId}
                    autoFocus
                    margin="dense"
                    type="text"
                    fullWidth
                    label=""
                    variant="outlined"
                    value={value}
                    onChange={handleChange}
                />
            </Stack>
        );

    return (
        <MainField
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            label=""
            variant="outlined"
            value={value}
            onChange={handleChange}
        />
    );
};

export default TextField;
