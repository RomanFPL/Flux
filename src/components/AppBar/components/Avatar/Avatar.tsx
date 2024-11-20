import { Tooltip, Avatar as AvatarMUI } from "@mui/material";
import React from "react";
import { getInitials } from "../../helper";
import { AvatarProp } from "./Avatar.types";
import { StyledIconButton } from "./Avatar.styled";

const Avatar = ({ accountName, accountImage }: AvatarProp) => {
    return (
        <Tooltip title={accountName} placement="bottom-end">
            <StyledIconButton onClick={() => {}}>
                <AvatarMUI variant="circular" alt={accountName} src={accountImage}>
                    {getInitials(accountName)}
                </AvatarMUI>
            </StyledIconButton>
        </Tooltip>
    );
};

export default Avatar;
