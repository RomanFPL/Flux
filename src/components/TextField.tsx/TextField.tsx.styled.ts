import { styled, TextField } from "@mui/material";
import theme from "../../styles/theme/theme";

export const MainField = styled(TextField)({
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    margin: "5px 0 0 0",
    padding: 0,
    height: "40px",
    "& .MuiOutlinedInput-root": {
        borderRadius: "10px",
        height: "40px",
        padding: 0,
        "& fieldset": {
            borderColor: theme.palette.border
        },
        "&:hover fieldset": {
            borderColor: theme.palette.border,
            boxShadow: `0px 3px 6px ${theme.palette.shadow}`
        },
        "&.Mui-focused fieldset": {
            borderColor: theme.palette.border
        },
        "& .MuiOutlinedInput-input": {
            height: "40px",
            padding: "0 12px",
            boxSizing: "border-box"
        }
    },
    "& .MuiInputBase-input": {
        height: "40px",
        padding: "0 12px",
        boxSizing: "border-box"
    },
    "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
        WebkitAppearance: "none",
        margin: 0
    },
    "& input[type=number]": {
        MozAppearance: "textfield"
    }
});

export const St = styled("span")({
    color: "#C95D63"
});
