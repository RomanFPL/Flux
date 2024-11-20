import { SxProps, Theme } from "@mui/material";
import { CSSProperties, ReactNode } from "react";

export interface CustomTooltipProps {
    children: ReactNode;
    style?: CSSProperties & SxProps<Theme>;
    tailDirection?: "left" | "right" | "top";
    type?: "default" | "block";
}
