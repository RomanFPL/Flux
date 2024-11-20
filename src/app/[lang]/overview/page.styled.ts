import { Box, styled, Typography } from "@mui/material";
import { LayoutBoxProps } from "./page.types";

export const LayoutBox = styled(Box, {
    shouldForwardProp: prop => prop !== "selectedLayout"
})<LayoutBoxProps>(({ selectedLayout }) => {
    const layouts = {
        default: {
            gridTemplateColumns: "minmax(0, 0.55fr) minmax(0, 0.45fr)",
            gridTemplateRows: "minmax(273px, 1fr) 2fr",
            rowGap: "20px",
            columnGap: "20px"
        },
        health_tools: {
            gridTemplateColumns: "1fr",
            gridTemplateRows: "minmax(273px, 1fr) 2fr",
            rowGap: "20px",
            columnGap: "auto"
        },
        reports_tools: {
            gridTemplateColumns: "minmax(0, 0.55fr) minmax(0, 0.45fr)",
            gridTemplateRows: "1fr",
            rowGap: "auto",
            columnGap: "20px"
        },
        tools: {
            gridTemplateColumns: "1fr",
            gridTemplateRows: "1fr",
            rowGap: "auto",
            columnGap: "auto"
        }
    };

    return {
        padding: "0 20px 20px 20px",
        display: "grid",
        height: "calc(100vh - 87px)",
        maxHeight: "calc(100vh - 87px)",
        width: "100%",
        "& > :nth-of-type(2)": {
            overflowY: "auto"
        },
        ...layouts[selectedLayout]
    };
});

export const StyledPaper = styled(Box)({
    borderRadius: "15px",
    height: "100%",
    background: "#fff",
    padding: "20px"
});

export const HealthSection = styled(StyledPaper, {
    shouldForwardProp: prop => prop !== "selectedLayout"
})<LayoutBoxProps>(({ selectedLayout }) => {
    const layouts = {
        default: {
            gridRow: "1 / 2"
        },
        health_tools: {
            gridRow: "1 / 2"
        },
        reports_tools: {
            gridRow: "none",
            display: "none"
        },
        tools: {
            gridRow: "none",
            display: "none"
        }
    };

    return {
        gridColumn: "1 / 2",
        ...layouts[selectedLayout]
    };
});

export const ToolsSection = styled(StyledPaper, {
    shouldForwardProp: prop => prop !== "selectedLayout"
})<LayoutBoxProps>(({ selectedLayout }) => {
    const layouts = {
        default: {
            gridRow: "2 / 3",
            gridColumn: "1 / 2"
        },
        health_tools: {
            gridRow: "2 / 3",
            gridColumn: "1 / 3"
        },
        reports_tools: {
            gridRow: "1 / 2",
            gridColumn: "1 / 2"
        },
        tools: {
            gridRow: "1 / 2",
            gridColumn: "1 / 3"
        }
    };

    return {
        padding: 0,
        overflowY: "hidden",
        ...layouts[selectedLayout]
    };
});

export const ReportsSection = styled(StyledPaper, {
    shouldForwardProp: prop => prop !== "selectedLayout"
})<LayoutBoxProps>(({ selectedLayout }) => {
    const layouts = {
        default: {
            gridRow: "1 / 3",
            gridColumn: "2 / 3"
        },
        health_tools: {
            gridRow: "none",
            gridColumn: "none",
            display: "none"
        },
        reports_tools: {
            gridRow: "1 / 3",
            gridColumn: "2 / 3"
        },
        tools: {
            gridRow: "none",
            gridColumn: "none",
            display: "none"
        }
    };

    return {
        ...layouts[selectedLayout]
    };
});

export const StyledTypography = styled(Typography)({
    opacity: 0.5,
    fontWeight: "bold",
    position: "absolute",
    textTransform: "uppercase"
});
