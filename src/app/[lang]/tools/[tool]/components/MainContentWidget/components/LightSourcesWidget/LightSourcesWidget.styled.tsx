import { Box, styled } from "@mui/material";

export const RootStyled = styled("div", {
    shouldForwardProp: prop => prop !== "isCentered"
})<{ isCentered: boolean }>(({ isCentered, theme }) => ({
    paddingTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    justifyContent: isCentered ? "center" : "flex-start",
    height: "100%",
    width: "100%"
}));

export const GridStyled = styled(Box, {
    shouldForwardProp: prop => prop !== "isCentered" && prop !== "isFullWidth"
})<{ isCentered: boolean; isFullWidth: boolean }>(({ isCentered, isFullWidth, theme }) => ({
    display: "grid",
    gridTemplateColumns: `repeat(${isFullWidth ? 5 : 3}, minmax(0, 1fr))`,
    width: "100%",
    height: isCentered ? "100%" : "auto",
    rowGap: isCentered ? "auto" : theme.spacing(4),
    justifyContent: "center"
}));
