import { Box, styled, Typography } from "@mui/material";

export const StyledBoxColumn17 = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "17px"
});

export const StyledTitleOuterTypography = styled(Typography)({
    fontStyle: "italic",
    opacity: 0.5
});

export const StyledTitleInnerSpan = styled("span")({
    fontStyle: "normal",
    fontWeight: "bold"
});

export const StyledBoxGrid = styled(Box)({
    display: "grid",
    gridTemplateColumns: "auto auto",
    gap: "20px"
});

export const StyledBoxGridRow = styled(Box)({
    display: "grid",
    gridTemplateRows: "auto auto",
    gap: "20px"
});

export const StyledBoxFlexExpand = styled(Box)({
    display: "flex",
    flexDirection: "row",
    gap: "30px"
});
