import { Box, Slider, styled } from "@mui/material";

export const StyledSliderContainer = styled(Box)({
    width: "100%",
    padding: "20px 45px"
});

export const CustomSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.primary.main,
    height: 4,
    margin: "0 auto",
    padding: "10px 0",
    "& .MuiSlider-track": {
        height: 4,
        borderRadius: 4,
        transition: "width 0.3s ease",
        backgroundColor: theme.palette.selected,
        borderColor: theme.palette.selected
    },
    "& .MuiSlider-rail": {
        height: 4,
        borderRadius: 4,
        backgroundColor: theme.palette.border
    },
    "& .MuiSlider-valueLabel": {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) !important",
        fontSize: 12,
        background: "transparent",
        color: theme.palette.primary.contrastText,
        padding: 0,
        whiteSpace: "nowrap",
        "&:before": {
            display: "none"
        }
    }
}));
