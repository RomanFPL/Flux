import { Box, styled } from "@mui/material";

export const StyledBoxColumn = styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "20px",
    height: "100%"
});

export const StyledBoxRow = styled(Box)({
    display: "flex",
    flexDirection: "row",
    gap: "25px",
    height: "100%",
    justifyContent: "space-between",
    width: "100%"
});
