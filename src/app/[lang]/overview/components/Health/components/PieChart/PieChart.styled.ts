import { Stack, styled, Typography } from "@mui/material";

export const StylesGraphStack = styled(Stack)({
    width: "auto",
    justifyContent: "space-between",
    rowGap: "20px"
    // height: "100%"
});

export const StyledGraphTypography = styled(Typography)({
    fontStyle: "italic",
    position: "absolute",
    bottom: 0,
    opacity: 0.5
});

export const StyledGraphTypographyExpand = styled(Typography)({
    fontStyle: "italic",
    top: 0,
    opacity: 0.5
});
