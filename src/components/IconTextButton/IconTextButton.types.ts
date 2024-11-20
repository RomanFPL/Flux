import { ButtonProps } from "@mui/material";
import { CustomStyledIconTextButtonProps } from "./IconTextButton.styled";

export interface StyledIconTextButtonProps extends CustomStyledIconTextButtonProps, ButtonProps {
    icon?: React.ReactNode;
}
