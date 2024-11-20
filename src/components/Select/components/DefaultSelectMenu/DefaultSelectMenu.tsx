import React, { useState } from "react";
import { StyledSelect } from "./DefaultSelectMenu.styled";
import DropDownIcon from "@/icons/DropDownIcon";
import { MenuItem } from "@mui/material";
import { DefaultSelectMenuProps } from "./DefaultSelectMenu.types";

const DefaultSelectMenu: React.FC<DefaultSelectMenuProps> = ({
    width,
    borderColor,
    name,
    disabled,
    selectedValue,
    handleChange,
    items
}) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);

    return (
        <StyledSelect
            width={width}
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
    );
};

export default DefaultSelectMenu;
