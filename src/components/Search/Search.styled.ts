import { InputAdornment, styled, TextField } from "@mui/material";

export const StyledSearch = styled(TextField)(({ theme }) => ({
    "@media (max-width: 1900px)": {
        width: "185px"
    },
    "& .MuiInputBase-root": {
        borderRadius: "10px",
        height: "40px",
        width: "185px",
        paddingLeft: "10px",
        paddingRight: "10px"
    },
    "& .MuiInputBase-input::placeholder": {
        opacity: 0.5
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: theme.palette.border
        },
        "&.Mui-focused fieldset": {
            border: `1px solid ${theme.palette.border}`,
            boxShadow: `0px 3px 6px ${theme.palette.shadow}`
        },
        "&:hover fieldset": {
            borderColor: theme.palette.border,
            boxShadow: `0px 3px 6px ${theme.palette.shadow}`
        }
    }
}));

export const StyledStartIcon = styled(InputAdornment)({
    margin: "0px"
});

export const StyledEndIcon = styled(InputAdornment)({
    margin: "0px"
});
