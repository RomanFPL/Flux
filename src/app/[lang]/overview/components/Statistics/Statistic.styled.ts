import { Box, Typography, styled } from "@mui/material";
import { StyledBoxSymbolProps, StyledTypographyProps } from "./Statistic.types";
import theme from "@/styles/theme/theme";

export const StyledBoxOuter = styled(Box)({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "8px"
});

export const StyledBoxSymbol = styled(Box)<StyledBoxSymbolProps>(({ color }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    minWidth: "40px",
    maxWidth: "40px",
    minHeight: "40px",
    maxHeight: "40px",
    backgroundColor: color
}));

// box for name and data
export const StyledBoxNameData = styled(Box)({
    display: "flex",
    flexDirection: "column"
});

// box for data
export const StyledBoxData = styled(Box)({
    display: "flex",
    flexDirection: "row",
    gap: "5px",
    alignItems: "center"
});

export const StyledTypography = styled(Typography)<StyledTypographyProps>(({ isvalid }) => ({
    fontWeight: "bold",
    textAlign: "left",
    color:
        isvalid !== undefined
            ? isvalid
                ? theme.palette.status.toolUp
                : theme.palette.status.toolDown
            : theme.palette.text.primary
}));

export const StyledSpan = styled("span")({
    fontSize: theme.typography.fontSize
});
