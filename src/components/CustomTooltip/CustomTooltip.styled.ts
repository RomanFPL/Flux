import { Box, styled, SxProps, Theme } from "@mui/material";

export const StyledTooltipComponent = styled(Box, {
    shouldForwardProp: prop => !["tailDirection"].includes(prop.toString())
})<{ style?: SxProps<Theme>; tailDirection?: "left" | "right" | "top" }>(({ theme, style, tailDirection }) => {
    let positionStyles = {};
    let transform;

    if (tailDirection === "left") {
        positionStyles = {
            bottom: "50%",
            left: 0,
            transform: "translateY(50%) rotateX(-50deg) translateX(-50%) rotate(45deg)"
        };
    }

    if (tailDirection === "right") {
        positionStyles = {
            top: "50%",
            right: 0,
            transform: "translateY(-50%) rotateX(-50deg) translateX(50%) rotate(45deg)"
        };
        transform = "translateX(calc(-100% - 55px))";
    }

    if (tailDirection === "top") {
        positionStyles = {
            bottom: 0,
            transform: "translateY(50%) rotateY(-50deg) translateX(50%) rotate(45deg)",
            right: "50%"
        };
        transform = "translateX(-75%) translateY(-110%)";
    }

    return {
        backgroundColor: style?.backgroundColor || theme.palette.primary.main,
        color: style?.color || "white",
        padding: theme.spacing(2),
        boxShadow: "0px 3px 6px #0D34571A",
        borderRadius: theme.shape.borderRadius,
        display: "inline-flex",
        alignItems: "center",
        fontWeight: 400,
        position: "absolute",
        width: "max-content",
        transform: transform,
        ...style,
        "&::after": {
            content: "''",
            position: "absolute",
            width: 15,
            height: 15,
            backgroundColor: "inherit",
            zIndex: 0,
            borderTopLeftRadius: "4px",
            ...positionStyles
        }
    };
});

export const StyledBoxTooltip = styled(Box)(({ style, theme }) => ({
    position: "absolute",
    borderRadius: "8px",
    padding: `${theme.spacing(0.8)} ${theme.spacing(1.6)}`,
    background: "#FFFFFF",
    boxShadow: "0px 3px 6px #0D34571A",
    opacity: 1,
    zIndex: 1,
    ...style
}));
