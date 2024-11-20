import React from "react";
import { ListItemProps } from "@mui/material";

export interface NavigationItemProps {
    name: string;
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
    count?: number;
    selectedItem?: string;
    link?: string;
    isDropdownOpen?: boolean;
    isSecondary?: boolean;
    isLatest?: boolean;
}

export interface ExtendedNavigationItemProps extends NavigationItemProps {
    children?: NavigationItemProps[];
}

export interface StyledListItemProps extends ListItemProps {
    isSelected: boolean;
    isSecondary?: boolean;
    isLatest?: boolean;
    withHalfRound?: boolean;
}
