import React, { MouseEvent, SyntheticEvent, useState } from "react";
import {
    ContextMenuItem,
    StyledContextSelect,
    PaperProps,
    MainMenuItem,
    paperProps,
    buttonSize
} from "./ContextMainMenu.styled";
import { Menu, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { Divider } from "@mui/material";
import DropDownIcon from "@/icons/DropDownIcon";
import IconButton from "../../../IconButton/IconButton";
import DotsIcon from "../../../../icons/DotsIcon";
import { ContextMainMenuProps, MenuItemProps } from "./ContextMainMenu.types";

const ContextMainMenu: React.FC<ContextMainMenuProps> = ({
    items,
    width,
    borderColor,
    listName,
    disabled,
    name,
    selectedValue,
    handleChange
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [interactValue, setInteractValue] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);

    const t = useTranslations();

    const handleCloseOnAction = (e: React.MouseEvent<HTMLLIElement, globalThis.MouseEvent>, action?: () => void) => {
        e.preventDefault();
        e.stopPropagation();
        setAnchorEl(null);
        setOpen(false);
        setInteractValue("");
        action?.();
    };

    const handleOpen = (event: SyntheticEvent) => {
        setOpen(true);
    };

    const handleMenuClick = (event: MouseEvent<HTMLElement>, value: string) => {
        event.preventDefault();
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        setInteractValue(value);
    };

    const handleClose = (event: SyntheticEvent<Element, Event>) => {
        if (anchorEl) {
            event.stopPropagation();
            event.preventDefault();
            setInteractValue("");
            setAnchorEl(null);
        }
        if (!anchorEl && open) setOpen(false);
    };

    const renderValues = (selected: unknown) => {
        if (items?.length) {
            const selectedItem = items.find(item => item.value === selected);
            return selectedItem?.edited ? t("star_point", { name: selectedItem.text }) : selectedItem?.text;
        }
    };
    const getContextMenuItem = (item: MenuItemProps, view?: string) => {
        const { name, action } = item;
        if (name === "divider") return <Divider key={name} sx={{ mt: 15, mb: 15 }} />;

        return (
            <ContextMenuItem key={name} onClick={e => handleCloseOnAction(e, () => action?.(view))}>
                {name}
            </ContextMenuItem>
        );
    };

    return (
        <StyledContextSelect
            width={width}
            borderColor={borderColor}
            aria-controls={name}
            SelectDisplayProps={{ "aria-controls": name }}
            open={open}
            onOpen={handleOpen}
            disabled={disabled}
            value={selectedValue?.value}
            onChange={handleChange}
            onClose={handleClose}
            IconComponent={DropDownIcon}
            MenuProps={{ PaperProps }}
            renderValue={renderValues}
        >
            {listName && (
                <Typography variant="subtitle2" sx={{ padding: "15px 15px 10px 15px" }}>
                    {listName}
                </Typography>
            )}
            {items?.map(({ value, text, context, edited }) => (
                <MainMenuItem isSelected={value === selectedValue?.value} key={value} value={value} disableRipple>
                    {edited ? t("star_point", { name: text }) : text}
                    {!!context?.length && (
                        <>
                            <IconButton
                                onClick={event => handleMenuClick(event, value)}
                                size="small"
                                bgVariant="transparent"
                                style={buttonSize}
                            >
                                <DotsIcon
                                    style={{
                                        ...buttonSize,
                                        color: selectedValue?.value === value ? "#fff" : "inherit"
                                    }}
                                />
                            </IconButton>
                            <Menu
                                sx={{ marginLeft: "30px", marginTop: "-30px" }}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl) && interactValue === value}
                                onClose={handleClose}
                                slotProps={paperProps}
                            >
                                {context?.map(item => getContextMenuItem(item, text))}
                            </Menu>
                        </>
                    )}
                </MainMenuItem>
            ))}
        </StyledContextSelect>
    );
};

export default ContextMainMenu;
