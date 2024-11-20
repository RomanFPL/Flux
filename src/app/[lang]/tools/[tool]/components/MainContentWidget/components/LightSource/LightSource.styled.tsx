import { Box, Stack, styled, Typography } from "@mui/material";

export const MAX_WIDTH = 246;
export const CHART_WIDTH = 85;

export const StyledValue = styled(Typography)({
    opacity: 0.7
});

export const StyledBox = styled(Box)(({ theme }) => ({
    borderRadius: "5px",
    border: `1px solid ${theme.palette.prediction}`,
    padding: `0px ${theme.spacing(1)}`
}));

export const LightSourcesContainer = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    gap: theme.spacing(2.4),
    maxWidth: `${MAX_WIDTH}px`,
    width: MAX_WIDTH
}));

export const PredictionText = styled(Typography)(({ theme }) => ({
    textOverflow: "ellipsis",
    maxWidth: `calc(${MAX_WIDTH}px - ${CHART_WIDTH}px - 12px)`
}));

export const StyledPrediction = styled(PredictionText)(({ theme }) => ({
    color: theme.palette.prediction,
    fontStyle: "italic",
    maxWidth: `calc(${MAX_WIDTH}px - ${CHART_WIDTH}px - 12px)`
}));
