import { Stack } from "@mui/material";
import React from "react";
import { StyledBadge } from "./Badge.styled";
import { SelectBadgeContentProps } from "./Badge.types";

const Badge: React.FC<SelectBadgeContentProps> = ({ defaultName, itemCount, icon }) => {
    return (
        <Stack gap={3} alignItems="center" flexDirection="row">
            <span>{defaultName}</span>
            <StyledBadge badgeContent={icon ? icon : itemCount} />
        </Stack>
    );
};

export default Badge;
