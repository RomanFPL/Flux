import { Box, Stack, styled } from "@mui/material";

export const StylesGridLayout = styled("div")({
    display: "grid",
    justifyContent: "center",
    alignItems: "center"
});

export const StyledBox = styled(Box)<{ width?: number }>(({ width = 85 }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: width,
    gridColumn: 1,
    gridRow: 1
}));

export const StyledStackTotalTools = styled(Stack)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gridColumn: 1,
    gridRow: 1
});
