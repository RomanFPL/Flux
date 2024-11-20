import { IconButtonProps } from "@mui/material";
import { CustomStyledIconButtonProps } from "./IconButton.styled";

export interface StyledIconButtonProps extends CustomStyledIconButtonProps, IconButtonProps {
    tooltipText?: string;
    children: React.ReactNode;
}
