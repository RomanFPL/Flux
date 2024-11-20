import { Box, Grid, styled } from "@mui/material";

const COMMON_PADDING = 17 / 2;

export const StyledDropZoneBefore = styled(Box)(({ theme }) => ({
    position: "absolute",
    width: "2px",
    height: `calc( 100% - ${COMMON_PADDING * 2}px)`,
    left: 0,
    top: `${COMMON_PADDING}px`,
    backgroundColor: theme.palette.primary.main
}));

export const StyledDropZoneAfter = styled(Box)(({ theme }) => ({
    position: "absolute",
    width: "2px",
    height: `calc( 100% - ${COMMON_PADDING * 2}px)`,
    right: 0,
    top: `${COMMON_PADDING}px`,
    backgroundColor: theme.palette.primary.main
}));

export const StyledGridItem = styled(Grid)({
    display: "inline-block",
    position: "relative",
    padding: `${COMMON_PADDING}px`,
    boxSizing: "content-box",
    margin: `${-COMMON_PADDING}px`
});
