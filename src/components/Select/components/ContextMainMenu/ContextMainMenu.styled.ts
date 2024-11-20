import theme from "@/styles/theme/theme";
import { MenuItem, Select, styled } from "@mui/material";
import { StylesSelectProps } from "../../Select.types";

export const StyledContextSelect = styled(Select, {
    shouldForwardProp: prop => prop !== "borderColor"
})<StylesSelectProps>(({ width = "125px", borderColor = theme.palette.border }) => {
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
            color: theme.palette.text.primary,
            "&.Mui-disabled": {
                opacity: 0.5
            }
        },
        "& .Mui-selected": {
            backgroundColor: "#007192"
        },
        "&.MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: borderColor
            },
            "&.Mui-focused fieldset": {
                border: `1px solid ${borderColor}`
            },
            "&:hover:not(.Mui-disabled) fieldset": {
                borderColor: borderColor,
                boxShadow: `0px 3px 6px ${theme.palette.shadow}`
            },
            "&.Mui-disabled fieldset": {
                borderColor: "transparent"
            }
        }
    };
});

export const MainMenuItem = styled(MenuItem, {
    shouldForwardProp: prop => prop !== "isSelected"
})<{ isSelected: boolean }>(({ isSelected }) => {
    return {
        display: "flex",
        justifyContent: "space-between",
        transition: "none !important",
        animation: "none !important",
        paddingRight: 0,
        paddingTop: 2.5,
        paddingBottom: 2.5,
        backgroundColor: isSelected ? "#007192" : "inherit",
        color: isSelected ? "#FFFFFF" : "inherit",
        "&.Mui-selected": {
            backgroundColor: "#007192 !important",
            color: "white !important"
        },
        "&.Mui-selected:hover": {
            backgroundColor: "#007192 !important",
            color: "white !important"
        },
        "&:hover": {
            backgroundColor: isSelected ? "#007192" : "#f5f5f5"
        },
        "&.Mui-focusVisible": {
            backgroundColor: isSelected ? "#007192" : "inherit"
        }
    };
});

export const ContextMenuItem = styled(MenuItem)(() => {
    return {
        width: 145,
        paddingTop: 4,
        paddingBottom: 4
    };
});

export const PaperProps = {
    sx: {
        paddingBottom: "15px",
        marginTop: "5px"
    }
};

export const buttonSize = {
    height: "24px",
    width: "24px"
};

export const paperProps = {
    paper: {
        sx: {
            boxShadow: "0px 3px 6px #0D34571A",
            padding: "15px 0"
        }
    }
};
