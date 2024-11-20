import { Checkbox, styled } from "@mui/material";

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.palette.primary.main,
    position: "relative",
    "&.Mui-checked": {
        color: theme.palette.text.primary
    },
    "& svg": {
        display: "none"
    },
    "&.Mui-checked::before": {
        content: "''",
        height: "6px",
        width: "6px",
        background: theme.palette.text.primary,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)"
    },
    "&::after": {
        content: "''",
        height: "12px",
        width: "12px",
        border: `2px solid ${theme.palette.text.primary}`,
        borderRadius: "2px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)"
    }
}));

export default CustomCheckbox;
