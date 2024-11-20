import React, { useState, SyntheticEvent } from "react";
import { Stack, Typography } from "@mui/material";
import { Checkbox } from "@/components";
import { DropDownIcon } from "@/icons";
import { Item } from "@/components/MultiselectButton/MultiselectButton.types";
import { MenuItemWrapper, MenuWrapper, SelectMenuWrapper, StyledSelect } from "./TypeFilter.styled";
import { TypeFilterProps } from "./TypeFilter.types";
import FilterIcons from "../FilterIcons/FilterIcons";

const TypeFilter: React.FC<TypeFilterProps> = ({
    items,
    selectedItems,
    setSelectedItems,
    children,
    withFilterIcon
}) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = (event: SyntheticEvent) => {
        event.preventDefault();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleItemToggle = (item: Item) => {
        const itemIndex = selectedItems.indexOf(item.value);
        if (itemIndex > -1) {
            const updatedItems = selectedItems.filter(value => value !== item.value);
            setSelectedItems(updatedItems);
        } else {
            setSelectedItems([...selectedItems, item.value]);
        }
    };

    const renderMenuItems = () => (
        <>
            {items.map(item => {
                const isChecked = selectedItems.includes(item.value);
                return (
                    <MenuItemWrapper key={item.value} onClick={() => handleItemToggle(item)}>
                        <Checkbox checked={isChecked} />
                        <Typography>{item.text}</Typography>
                    </MenuItemWrapper>
                );
            })}
        </>
    );

    return (
        <>
            <Stack sx={{ cursor: "pointer" }} alignItems="center" gap="5px" direction="row">
                {children}
                <FilterIcons withFilterIcon={withFilterIcon} />
            </Stack>
            <StyledSelect
                open={open}
                onOpen={handleOpen}
                onClose={handleClose}
                multiple
                IconComponent={DropDownIcon}
                value={selectedItems}
                MenuProps={{
                    PaperProps: {
                        style: {
                            marginTop: "5px",
                            borderRadius: "10px",
                            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)"
                        }
                    },
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right"
                    },
                    transformOrigin: {
                        vertical: "top",
                        horizontal: "right"
                    }
                }}
            >
                <MenuWrapper>
                    <SelectMenuWrapper>{renderMenuItems()}</SelectMenuWrapper>
                </MenuWrapper>
            </StyledSelect>
        </>
    );
};

export default TypeFilter;
