import { Box, Popper, styled } from "@mui/material";

export const StyledPopper = styled(Popper)<{ zindex?: number }>(({ zindex }) => ({
    zIndex: zindex || 1,
    top: 0,
    left: 0,
    position: "absolute"
}));

export const StyledBox = styled(Box)({
    width: "100vw",
    height: "100vh",
    top: 0,
    left: 0
});
