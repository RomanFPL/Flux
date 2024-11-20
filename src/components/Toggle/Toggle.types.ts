import { ToggleButtonGroupProps } from "@mui/material";
import { NavigationItemProps } from "../NavigationItem/NavigationItem.types";

export interface ToggleProps<T> extends ToggleButtonGroupProps {
    name?: string;
    label?: string;
    items: T[];
    value: T | null;
    handleChange: (event: React.MouseEvent<HTMLElement>, newValue: T | null) => void;
}

export interface DrawerProps {
    version?: string;
    selectedItem?: string;
    navItems: NavigationItemProps[];
}

export interface StyledToggleButtonProps {
    index: number;
    numitems: number;
}
