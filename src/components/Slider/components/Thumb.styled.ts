import { SliderThumb, styled } from "@mui/material";

export const CustomThumb = styled(SliderThumb, {
    shouldForwardProp: prop => prop !== "index"
})<{ index: number }>(({ index, theme }) => ({
    height: "35px",
    width: "55px",
    backgroundColor: theme.palette.primary.main,
    borderRadius: index === 0 ? "10px 0 0 10px" : "0 10px 10px 0",
    "&:hover, &.Mui-focusVisible, &.Mui-active": {
        boxShadow: `0px 3px 6px ${theme.palette.shadow}`
    }
}));
