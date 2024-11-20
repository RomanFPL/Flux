import { Box, Paper, Typography, styled } from "@mui/material";

export const ToolCardContainer = styled(Paper, {
    shouldForwardProp: prop => !["statusColor", "isOpen", "dragged"].includes(prop.toString())
})<{ statusColor?: string; isOpen?: boolean; dragged?: boolean }>(({ theme, statusColor, isOpen, dragged }) => ({
    boxSizing: "border-box",
    position: "relative",
    zIndex: isOpen ? "100" : "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    flexDirection: "column",
    padding: "10px",
    borderRadius: theme.shape.borderRadius,
    minHeight: "77px",
    height: isOpen ? "auto" : "77px",
    border: `1px solid ${theme.palette.border}`,
    borderLeft: `7px solid ${statusColor}`,
    boxShadow: "none",
    cursor: dragged ? "grabbing" : "move",
    backgroundColor: dragged ? `${theme.palette.hover}80` : "inherit",
    opacity: dragged ? 0.5 : 1,
    "::before": {
        content: "''",
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "2px",
        backgroundColor: statusColor
    },
    "&:hover": {
        backgroundColor: dragged ? "inherit" : `${theme.palette.hover}80`
    }
}));
export const ToolInfo = styled(Box)(() => ({
    width: "100%",
    flexGrow: 1
}));

export const ToolHead = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    alignItems: "start",
    gap: theme.spacing(1),
    justifyContent: "space-between"
}));

export const TypographyStyle = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    lineHeight: "19px",
    // textOverflow: "ellipsis",
    overflow: "hidden"
}));

export const TitleTypography = styled(TypographyStyle, {
    shouldForwardProp: prop => prop !== "isIcon" && prop !== "wrapText"
})<{ isIcon: boolean; wrapText?: boolean }>(({ isIcon, wrapText }) => ({
    fontWeight: "bold",
    // textTransform: "uppercase",
    width: isIcon ? "calc(100% - 18px)" : "100%",
    whiteSpace: wrapText ? "normal" : "nowrap",
    textOverflow: "ellipsis"
}));

export const EllipsisTypography = styled(TypographyStyle)({
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
    height: "18px"
});

export const ExtendedTypography = styled(TypographyStyle)({
    WebkitBoxOrient: "vertical",
    lineHeight: 1.3
});

export const SecGemBox = styled(Box)({
    display: "inline-flex",
    alignItems: "center"
});
