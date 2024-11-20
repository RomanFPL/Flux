"use client";
import { Box, Typography, styled } from "@mui/material";

export const StyledToolBar = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    justifyContent: "space-between"
}));

export const StatusBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    height: "40px"
}));

export const StyledStatusBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: theme.spacing(2)
}));

export const StatusText = styled(Typography, {
    shouldForwardProp: prop => !["statusColor", "opacity"].includes(prop.toString())
})<{ statusColor?: string; opacity?: number }>(({ statusColor, opacity = 1 }) => ({
    fontWeight: "bold",
    textWrap: "nowrap",
    color: statusColor,
    opacity: opacity
}));

export const ToolBarActions = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: theme.spacing(3)
    // width: "auto", // TODO change on theme defined.
    // "@media (max-width: 1900px)": {
    //     width: "100%"
    // }
}));

export const StyledDescription = styled(Typography)(({ theme }) => ({
    color: theme.palette.status.toolDown,
    fontWeight: "bold",
    fontSize: "14px",
    width: "100%",
    fontStyle: "italic"
}));
