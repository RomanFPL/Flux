import { Box, Divider, styled } from "@mui/material";

export const LegendContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    flexWrap: "wrap",
    rowGap: "0px"
}));

export const LegendItem = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center"
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
    height: theme.typography.fontSize
}));

export const ColorBox = styled(Box)<{ color: string }>(({ theme, color }) => ({
    width: theme.typography.fontSize,
    height: theme.typography.fontSize,
    backgroundColor: color,
    borderRadius: theme.spacing(0.6),
    marginRight: theme.spacing(1)
}));
