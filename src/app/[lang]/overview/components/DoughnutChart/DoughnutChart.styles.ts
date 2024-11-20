import { Box, Stack, Typography, styled } from "@mui/material";

export const StylesGridLayout = styled("div")({
    display: "grid",
    justifyContent: "center",
    alignItems: "center"
});

export const StyledBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "110px",
    gridColumn: 1,
    gridRow: 1
});

export const StyledStackTotalTools = styled(Stack)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gridColumn: 1,
    gridRow: 1
});

export const StylesTotalTypography = styled(Typography)({
    fontWeight: "bold"
});

export const StyledRectangle = styled("div")<{ color: string }>(({ color }) => ({
    minWidth: "12px",
    height: "12px",
    backgroundColor: color,
    borderRadius: 3
}));

export const StyledLegnedItem = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(1)
}));

export const StyledLegendBox = styled(Box, {
    shouldForwardProp: prop => prop !== "isExpand"
})<{ isExpand: boolean }>(({ theme, isExpand }) => ({
    display: "flex",
    flexDirection: isExpand ? "column" : "row",
    rowGap: theme.spacing(1),
    columnGap: theme.spacing(2.5),
    flexWrap: "wrap",
    justifyContent: isExpand ? "flex-start" : "center"
}));

export const Dot = styled("span")<{ color?: string }>(({ color }) => ({
    display: "block",
    width: "7px",
    height: "7px",
    borderRadius: "2px",
    background: color
}));

export const StyledStack = styled(Stack)({
    gap: 5,
    flexDirection: "row",
    alignItems: "center"
});

export const OuterStyledStack = styled(Stack, {
    shouldForwardProp: prop => prop !== "isExpand"
})<{ isExpand: boolean }>(({ isExpand }) => ({
    minWidth: "180px",
    maxWidth: isExpand ? "232px" : "180px",
    margin: "auto",
    flexGrow: 1,
    columnGap: "20px",
    justifyContent: "center",
    alignItems: "center"
}));
