import React from "react";
import Link from "next/link";
import {
    StyledIcon,
    StyledListItem,
    StyledListItemButton,
    StyledListItemIcon,
    StyledCountText,
    StyledListItemText
} from "./NavigationItem.styled";
import { ExtendedNavigationItemProps } from "./NavigationItem.types";
import { DropDownIcon } from "@/icons";
import { isLinkSelected } from "@/utils";

const NavigationItem = ({
    name,
    icon,
    link = "",
    selectedItem,
    count,
    children,
    isDropdownOpen,
    isSecondary,
    isLatest
}: ExtendedNavigationItemProps) => {
    //TODO change it to fit logic requirements
    const isSelected = isLinkSelected(link, selectedItem);

    return (
        <Link href={!children ? link : ""} style={{ textDecoration: "none" }}>
            <StyledListItem
                isSelected={isSelected}
                disablePadding
                isSecondary={isSecondary}
                isLatest={isLatest}
                withHalfRound={!!children && isDropdownOpen}
            >
                <StyledListItemButton>
                    {icon && (
                        <StyledListItemIcon>
                            <StyledIcon isSelected={isSelected}>{icon}</StyledIcon>
                        </StyledListItemIcon>
                    )}
                    <StyledListItemText isSecondary={isSecondary}>
                        {name}
                        {count && <StyledCountText isSelected={isSelected}>({count})</StyledCountText>}
                    </StyledListItemText>
                    {children && (
                        <StyledListItemIcon>
                            <StyledIcon isSelected={isSelected} withEndIcon>
                                <DropDownIcon
                                    style={{
                                        transform: isDropdownOpen ? "rotateZ(180deg)" : undefined
                                    }}
                                />
                            </StyledIcon>
                        </StyledListItemIcon>
                    )}
                </StyledListItemButton>
            </StyledListItem>
        </Link>
    );
};

export default NavigationItem;
