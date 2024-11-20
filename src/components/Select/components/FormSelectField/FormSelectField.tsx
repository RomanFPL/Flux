import React, { useState } from "react";
import { St, StyledSelect } from "./FormSelectField.styled";
import { FormLabel, MenuItem, Stack } from "@mui/material";
import DropDownIcon from "@/icons/DropDownIcon";
import { FormSelectFieldProps } from "./FormSelectField.types";
import { useTranslations } from "next-intl";

const FormSelectField: React.FC<FormSelectFieldProps> = ({
    width = "auto",
    label,
    borderColor,
    name,
    disabled,
    selectedValue,
    handleChange,
    items,
    required
}) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const t = useTranslations();

    const star = required ? <St>{t("star")}</St> : null;
    const inputId = `input-${label?.replace(/\s+/g, "-").toLowerCase()}`;

    return (
        <Stack gap={1} width={width}>
            <FormLabel component="label" htmlFor={inputId}>
                {label} {star}
            </FormLabel>
            <StyledSelect
                id={inputId}
                width="100%"
                borderColor={borderColor}
                aria-controls={name}
                SelectDisplayProps={{ "aria-controls": name }}
                open={open}
                onOpen={handleOpen}
                disabled={disabled}
                onClose={() => setOpen(false)}
                value={selectedValue?.value}
                onChange={handleChange}
                IconComponent={DropDownIcon}
                MenuProps={{ sx: { marginTop: "5px" } }}
            >
                {items?.map(({ value, text }) => (
                    <MenuItem key={String(value)} value={String(value)}>
                        {text}
                    </MenuItem>
                ))}
            </StyledSelect>
        </Stack>
    );
};

export default FormSelectField;
