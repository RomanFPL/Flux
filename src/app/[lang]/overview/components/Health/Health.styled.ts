import { Box, styled } from "@mui/material";

export const StyledBoxOuter = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
    position: "relative"
});

export const StyledIconBox = styled(Box)({
    position: "absolute",
    top: "0",
    right: "0"
});
