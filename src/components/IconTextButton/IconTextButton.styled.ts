import { Button, styled } from "@mui/material";

export interface CustomStyledIconTextButtonProps {
    bgVariant?: "default" | "secondary" | "navigation";
}

export const StyledIconTextButton = styled(Button, {
    shouldForwardProp: prop => prop !== "bgVariant"
})<CustomStyledIconTextButtonProps>(({ theme, bgVariant }) => ({
    fontSize: theme.typography.fontSize,
    padding: "8px 15px 8px 10px",
    width: "auto",
    height: "40px",
    display: "flex",
    backgroundColor:
        bgVariant === "secondary"
            ? "#CDE1E9"
            : bgVariant === "navigation"
              ? theme.palette.navigation
              : theme.palette.background.default,
    "&:hover": {
        padding: "8px 15px 8px 10px",
        width: "auto",
        fontWeight: "inherit",
        backgroundColor:
            bgVariant === "navigation"
                ? theme.palette.navigation
                : bgVariant === "secondary"
                  ? "#CDE1E9"
                  : theme.palette.hover,
        boxShadow: `0px 3px 6px ${theme.palette.shadow}`
    },
    "&.Mui-disabled": {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.main,
        opacity: 0.5
    }
}));
