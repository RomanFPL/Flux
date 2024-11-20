import { Box, styled } from "@mui/material";

export interface ChartContainerProps {
    withLegend?: boolean;
}

export const ChartContainer = styled(Box, {
    shouldForwardProp: prop =>
        prop !== "withLegend" && prop !== "withDivider" && prop !== "withVerticalLines" && prop !== "withPoints"
})<ChartContainerProps>(({ withLegend = true, theme }) => ({
    height: "calc(50vh - 200px)",
    width: "100%",
    position: "relative",
    paddingBottom: withLegend ? theme.spacing(4) : 0,
    flexGrow: 1
}));
