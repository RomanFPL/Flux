import { Box, styled, Typography } from "@mui/material";
import { LayoutBoxProps } from "./page.types";
import Link from "next/link";

export const LayoutBox = styled(Box, {
    shouldForwardProp: prop => prop !== "selectedLayout"
})<LayoutBoxProps>(({ selectedLayout }) => {
    const layouts = {
        default: {
            gridTemplateColumns: "minmax(0, 0.55fr) minmax(0, 0.45fr)",
            gridTemplateRows: "2fr minmax(275px, 1fr) ",
            rowGap: "20px",
            columnGap: "20px"
        },
        main_warnings: {
            gridTemplateColumns: "1fr",
            gridTemplateRows: "2fr minmax(275px, 1fr) ",
            rowGap: "20px",
            columnGap: "auto"
        },
        main_reports: {
            gridTemplateColumns: "minmax(0, 0.55fr) minmax(0, 0.45fr)",
            gridTemplateRows: "1fr",
            rowGap: "auto",
            columnGap: "20px"
        },
        warnings: {
            gridTemplateColumns: "1fr",
            gridTemplateRows: "1fr",
            rowGap: "auto",
            columnGap: "auto"
        },
        main: {
            gridTemplateColumns: "1fr",
            gridTemplateRows: "1fr",
            rowGap: "auto",
            columnGap: "auto"
        },
        lcc: {
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
            paddingBottom: "20px"
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

export const InfoSection = styled(StyledPaper, {
    shouldForwardProp: prop => prop !== "selectedLayout"
})<LayoutBoxProps>(({ selectedLayout }) => {
    const layouts = {
        default: {
            gridRow: "1 / 2"
        },
        main_warnings: {
            gridRow: "1 / 2"
        },
        main_reports: {
            gridRow: "1 / 2",
            gridColumn: "1 / 2"
        },
        warnings: {
            gridRow: "none",
            display: "none"
        },
        main: {
            gridRow: "1 / 2",
            gridColumn: "1 / 3"
        },
        lcc: {
            gridRow: "none",
            display: "none"
        }
    };

    return {
        gridColumn: "1 / 2",
        ...layouts[selectedLayout]
    };
});

export const WarningsSection = styled(StyledPaper, {
    shouldForwardProp: prop => prop !== "selectedLayout"
})<LayoutBoxProps>(({ selectedLayout }) => {
    const layouts = {
        default: {
            gridRow: "2 / 3",
            gridColumn: "1 / 2"
        },
        main_warnings: {
            gridRow: "2 / 3",
            gridColumn: "1 / 3"
        },
        main_reports: {
            gridRow: "none",
            display: "none"
        },
        warnings: {
            gridRow: "1 / 2",
            gridColumn: "1 / 3"
        },
        main: {
            gridRow: "none",
            display: "none"
        },
        lcc: {
            gridRow: "none",
            display: "none"
        }
    };

    return {
        overflowY: "auto",
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
        main_warnings: {
            gridRow: "none",
            gridColumn: "none",
            display: "none"
        },
        main_reports: {
            gridRow: "1 / 3",
            gridColumn: "2 / 3"
        },
        warnings: {
            gridRow: "none",
            gridColumn: "none",
            display: "none"
        },
        main: {
            gridRow: "none",
            gridColumn: "none",
            display: "none"
        },
        lcc: {
            gridRow: "1 / 2",
            gridColumn: "1 / 2"
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

const StyledNavigationBox = styled(Box)({
    height: "100%",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    minWidth: "40px",
    "&:before": {
        content: "''",
        display: "block",
        height: "40px",
        width: "60px",
        position: "absolute",
        "&:hover~a": {
            display: "block"
        }
    },
    "&:hover a": {
        display: "block"
    }
});

export const StyledPrevBox = styled(StyledNavigationBox)({
    left: "8px",
    "&:before": {
        left: "-10px"
    }
});

export const StyledNextBox = styled(StyledNavigationBox)({
    right: "8px",
    "&:before": {
        right: "-10px"
    }
});

export const StyledLink = styled(Link)({
    display: "none",
    paddingBottom: "0!important",
    borderRadius: "10px",
    boxShadow: "0px 3px 6px #0D34571A"
});
