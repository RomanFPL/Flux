import theme from "@/styles/theme/theme";
import { Box, ToggleButton, ToggleButtonGroup, styled } from "@mui/material";
import { StyledToggleButtonProps } from "./Toggle.types";

export const StyledBox = styled(Box)({
    display: "inline-flex;",
    width: "auto",
    flexDirection: "column",
    gap: 5
});

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
    height: "40px",
    borderRadius: "10px",
    // backgroundColor: theme.palette.secondary.main,
    bgcolor: theme.palette.secondary.main,
    color: theme.palette.primary.main
});

export const StyledToggleButton = styled(ToggleButton)<StyledToggleButtonProps>(({ index, numitems }) => ({
    paddingLeft: 0 === index ? "15px" : "7px",
    paddingRight: numitems === index ? "15px" : "7px",
    borderWidth: "0px",
    borderRadius: "10px",
    justifyItems: "center",
    textTransform: "none"
}));
