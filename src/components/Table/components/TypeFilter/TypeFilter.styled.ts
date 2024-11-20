import { MenuItemWrapperProps, StylesSelectProps } from "@/components/MultiselectButton/MultiselectButton.types";
import theme from "@/styles/theme/theme";
import { Box, Select, Stack, styled } from "@mui/material";

export const StyledSelect = styled(Select)<StylesSelectProps>(({ bordercolor = theme.palette.border }) => ({
    height: "40px",
    position: "absolute",
    top: 0,
    left: 0,
    width: "60px",
    boxSizing: "border-box",
    background: "#fff",
    borderColor: bordercolor,
    opacity: 0,
    "& .MuiSelect-icon": {
        height: "16px",
        right: "15px",
        color: theme.palette.text.primary
    },
    "&.MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: bordercolor
        },
        "&.Mui-focused fieldset": {
            border: `1px solid ${bordercolor}`
        },
        "&:hover fieldset": {
            borderColor: bordercolor,
            boxShadow: `0px 3px 6px ${theme.palette.shadow}`
        }
    }
}));

export const SelectMenuWrapper = styled(Stack)({
    flexDirection: "column",
    paddingBottom: "10px",
    paddingTop: "10px",
    maxHeight: "190px",
    overflow: "auto"
});

export const MenuWrapper = styled(Stack)({
    flexDirection: "column"
});

export const MenuItemWrapper = styled(Box)<MenuItemWrapperProps>(({ disabled = true }) => ({
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "14px",
    paddingTop: "4px",
    paddingBottom: "4px",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "#F0F3F5"
    },
    opacity: disabled ? 0.5 : 1
}));
