import { SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";

export interface MenuItemProps {
    name: string;
    action?: (name?: string) => void;
}

export interface ContextItem {
    value: string;
    text: string;
    context?: MenuItemProps[];
    edited?: boolean;
}

export interface ContextMainMenuProps {
    type: "contextMenu";
    name?: string;
    items?: ContextItem[];
    selectedValue: ContextItem | null;
    width?: string;
    borderColor?: string;
    listName?: string;
    disabled?: boolean;
    handleChange?: (event: SelectChangeEvent<unknown>, child: ReactNode) => void;
    children?: React.ReactNode;
}
