import theme from "@/styles/theme/theme";
import { Box, Select, Stack, styled, TextField, Typography } from "@mui/material";
import { MenuItemWrapperProps, StylesSelectProps } from "./MultiselectButton.types";

export const StyledSelect = styled(Select)<StylesSelectProps>(
    ({ width = "125px", bordercolor = theme.palette.border }) => ({
        height: "40px",
        position: "relative",
        minWidth: width,
        width: width,
        boxSizing: "border-box",
        background: "#fff",
        borderColor: bordercolor,
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
    })
);

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

export const SelectAllTypography = styled(Typography)({
    fontSize: 12,
    fontStyle: "italic",
    opacity: 0.5
});

export const SelectALLWrapper = styled(MenuItemWrapper)({
    paddingBottom: "10px",
    paddingTop: 0,
    // textDecoration: "line-through",
    "&:hover": {
        backgroundColor: "transparent"
    }
});

export const SelectionCount = styled(Typography)(({ theme }) => ({
    position: "absolute",
    bottom: 0,
    margin: "10px",
    height: "29px",
    width: "140px",
    background: theme.palette.warning.main,
    borderRadius: "5px",
    color: theme.palette.common.white,
    fontStyle: "italic",
    fontSize: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
    "@media (max-width: 1900px)": {
        width: "140px"
    },
    "& .MuiTextField-root": {
        height: "40px",
        width: "140px"
    },
    "& .MuiInputBase-root": {
        margin: "10px",
        borderRadius: "10px",
        height: "40px",
        width: "140px"
    },
    "& .MuiInputBase-input::placeholder": {
        opacity: 1
    },
    "& .MuiOutlinedInput-root": {
        height: "40px",
        "& fieldset": {
            borderColor: theme.palette.border
        },
        "&.Mui-focused fieldset": {
            border: `1px solid ${theme.palette.border}`
        },
        "&:hover fieldset": {
            borderColor: theme.palette.border
        }
    }
}));

export const StylesExclamationMark = styled(Typography)(({ theme }) => ({
    fontWeight: "bold",
    maxHeight: "21px",
    fontSize: "16px",
    color: theme.palette.charts.orange
}));
