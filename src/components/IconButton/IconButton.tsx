import { Tooltip } from "@mui/material";
import { StyledIconButton, StylesBox } from "./IconButton.styled";
import { StyledIconButtonProps } from "./IconButton.types";

const IconButton = ({ tooltipText = "", children, size = "large", ...props }: StyledIconButtonProps) => {
    return (
        <Tooltip title={tooltipText}>
            <StylesBox m={0} p={0}>
                <StyledIconButton size={size} {...props}>
                    {children}
                </StyledIconButton>
            </StylesBox>
        </Tooltip>
    );
};

export default IconButton;
