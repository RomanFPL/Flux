import { Badge, Checkbox } from "@/components";
import { DropDownIcon } from "@/icons";
import { Divider, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import React, { SyntheticEvent, useMemo, useState } from "react";
import {
    MenuItemWrapper,
    MenuWrapper,
    SelectALLWrapper,
    SelectAllTypography,
    SelectMenuWrapper,
    SelectionCount,
    StyledSelect,
    StyledTextField,
    StylesExclamationMark
} from "./MultiselectButton.styled";
import { Item, StyledSelectButtonProps } from "./MultiselectButton.types";

const MultiselectButton = ({
    name,
    defaultName,
    items = [],
    selectedItems,
    setSelectedItems,
    width,
    disabled,
    bordercolor,
    maxSelection = { value: 10, type: "warning" },
    type = ["default"],
    budge = true,
    markedItems
}: StyledSelectButtonProps) => {
    const theme = useTheme();
    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const t = useTranslations();

    const handleOpen = (event: SyntheticEvent) => {
        event.preventDefault();
        setOpen(true);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleItemToggle = (item: Item) => {
        const itemIndex = selectedItems.findIndex(({ value }) => item.value === value);
        if (itemIndex > -1) {
            const updatedItems = [...selectedItems];
            updatedItems.splice(itemIndex, 1);
            setSelectedItems(updatedItems);
        } else if (selectedItems.length < maxSelection.value) {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const filteredItems = useMemo(() => {
        return items.filter(item => item.text.toLowerCase().includes(search.toLowerCase()));
    }, [items, search]);

    const isMaxSelected = selectedItems.length >= maxSelection.value;

    const renderBadge = () => <Badge defaultName={defaultName} itemCount={budge ? selectedItems.length : null} />;

    const renderMenuItems = () => (
        <>
            {filteredItems.map(item => {
                const isChecked = !!selectedItems.find(({ value }) => item.value === value);
                const isItemDisabled = !isChecked && isMaxSelected && maxSelection.type === "disabled";
                return (
                    <MenuItemWrapper key={item.value} disabled={isItemDisabled} onClick={() => handleItemToggle(item)}>
                        <Checkbox checked={isChecked} />
                        <Typography>{item.text}</Typography>
                        {type.includes("mark") &&
                            markedItems &&
                            markedItems?.includes(item.value) &&
                            renderExclamationMark()}
                    </MenuItemWrapper>
                );
            })}
            {isMaxSelected && maxSelection.type === "warning" && (
                <SelectionCount>Select up to {maxSelection.value} tools</SelectionCount>
            )}
        </>
    );

    const renderSearchBar = () => (
        <StyledTextField
            size="small"
            placeholder={t("searchPlaceholder")}
            id="search"
            value={search}
            onChange={handleSearchChange}
        />
    );

    const renderSelectAllOption = () => (
        <SelectALLWrapper
            onClick={() => {
                if (selectedItems.length !== items.length) setSelectedItems(items);
            }}
        >
            <Checkbox checked={selectedItems.length === items.length} />
            <SelectAllTypography>{t("check_all")}</SelectAllTypography>
        </SelectALLWrapper>
    );

    const renderExclamationMark = () => {
        return <StylesExclamationMark>{"!"}</StylesExclamationMark>;
    };

    const menuProps = {
        marginTop: "5px",
        borderRadius: "10px",
        boxShadow: `0px 3px 6px ${theme.palette.shadow}`,
        border: `1px solid ${theme.palette.border}`
    };

    return (
        <StyledSelect
            width={width}
            bordercolor={bordercolor}
            aria-controls={name}
            SelectDisplayProps={{ "aria-controls": name }}
            open={open}
            onOpen={handleOpen}
            disabled={disabled}
            onClose={() => setOpen(false)}
            IconComponent={DropDownIcon}
            multiple
            value={selectedItems.length ? selectedItems : [{ value: "", text: defaultName }]}
            renderValue={renderBadge}
            MenuProps={{
                PaperProps: { style: menuProps },
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
                {type.includes("search") && renderSearchBar()}
                {type.includes("search") && renderSelectAllOption()}
                {type.includes("search") && <Divider />}
                <SelectMenuWrapper>{renderMenuItems()}</SelectMenuWrapper>
            </MenuWrapper>
        </StyledSelect>
    );
};

export default MultiselectButton;
