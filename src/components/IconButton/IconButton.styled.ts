import { Box, IconButton, styled } from "@mui/material";

export interface CustomStyledIconButtonProps {
    bgVariant?: "default" | "secondary" | "navigation" | "transparent" | "primary";
}

export const StylesBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
});

export const StyledIconButton = styled(IconButton, {
    shouldForwardProp: prop => prop !== "bgVariant"
})<CustomStyledIconButtonProps>(({ theme, bgVariant = "default" }) => {
    const bg = {
        default: theme.palette.background.default,
        primary: "#007192",
        secondary: "#CDE1E9",
        navigation: theme.palette.navigation,
        transparent: "transparent"
    };

    const bgHover = {
        default: theme.palette.hover,
        primary: "#007192",
        secondary: "#CDE1E9",
        navigation: theme.palette.hover,
        transparent: "transparent"
    };

    return {
        fontSize: theme.typography.fontSize,
        padding: 0,
        width: "40px",
        height: "40px",
        backgroundColor: bg[bgVariant],
        "&:hover": {
            fontWeight: "600",
            boxShadow: `0px 3px 6px ${theme.palette.shadow}`,
            backgroundColor: bgHover[bgVariant]
        },
        "&.MuiIconButton-sizeMedium": {
            width: "30px",
            height: "30px",
            padding: "3px",
            borderRadius: "10px"
        },
        "&.MuiIconButton-sizeSmall": {
            width: "18px",
            height: "19px",
            borderRadius: "5px"
        },
        "&.MuiIconButton-colorInfo": {
            backgroundColor: "transparent"
        },
        "&.Mui-disabled": {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.main,
            opacity: 0.5
        }
    };
});
