import { Select, styled } from "@mui/material";
import { StylesSelectProps } from "../../Select.types";
import theme from "@/styles/theme/theme";

export const StyledSelect = styled(Select, {
    shouldForwardProp: prop => prop !== "noHover" && prop !== "borderColor"
})<StylesSelectProps>(({ width = "125px", borderColor = theme.palette.border, noHover }) => {
    const withBorder = {
        borderColor: borderColor,
        boxShadow: `0px 3px 6px ${theme.palette.shadow}`
    };
    const hover = noHover ? { borderColor: "transparent" } : withBorder;
    return {
        height: "40px",
        minWidth: width,
        width: width,
        boxSizing: "border-box",
        position: "relative",
        background: "#fff",
        borderColor: borderColor,
        "& .MuiSelect-icon": {
            height: "16px",
            right: "15px",
            color: theme.palette.text.primary
        },
        "&.MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: borderColor
            },
            "&.Mui-focused fieldset": {
                border: `1px solid ${borderColor}`
            },
            "&:hover fieldset": hover
        }
    };
});

export const St = styled("span")({
    color: "#C95D63"
});
