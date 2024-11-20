import { Box, Button, Paper, Popper, Stack, Typography, styled } from "@mui/material";

export const DateTypography = styled(Typography)({
    textAlign: "start",
    lineHeight: 1.3
});

export const CalendarTypography = styled(Typography)({
    textAlign: "center",
    color: "#0D3457",
    fontWeight: 500
});

export const NavigatorContainer = styled(Stack)({
    justifyContent: "space-between",
    flexDirection: "row",
    gap: "10px",
    padding: "20px 20px 10px 5px"
});

export const TypographyBlock = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    borderBottom: "1px solid #E6EAEE"
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
    borderRadius: "10px",
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
    minWidth: "500px",
    border: "1px solid #E6EAEE",
    elevation: 3
}));

export const ActionBock = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-end",
    borderTop: "1px solid #E6EAEE"
}));

export const StyledPopper = styled(Popper)(({ theme }) => ({
    zIndex: 2,
    paddingTop: "5px"
}));

export const DateSelector = styled(Stack)(({ theme }) => {
    // Common styles
    const boxCentering = {
        maxWidth: "35px",
        height: "35px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };

    const bgColors = {
        backgroundColor: theme.palette.action.selected,
        color: theme.palette.primary.main
    };

    const startBorder = {
        left: 0,
        width: "100%",
        borderRadius: "0 !important",
        borderBottomLeftRadius: "50% !important",
        borderTopLeftRadius: "50% !important"
    };

    const endBorder = {
        left: 0,
        width: "100%",
        borderRadius: "0 !important",
        borderBottomRightRadius: "50% !important",
        borderTopRightRadius: "50% !important"
    };

    return {
        flexDirection: "column",
        "& .rdrDefinedRangesWrapper, & .rdrDateDisplayWrapper, & .rdrMonthName": {
            display: "none"
        },
        "& .rdrDayPassive": {
            visibility: "hidden"
        },
        "& .rdrWeekDay": {
            ...boxCentering
        },
        "& .rdrDays": {
            rowGap: "5px"
        },
        "& .rdrDay": {
            ...boxCentering
        },
        "& .rdrMonths": {
            padding: "0 20px 20px 20px",
            gap: "20px"
        },
        "& .rdrMonth": {
            width: "245px",
            padding: 0
        },
        "& .rdrDay:not(.rdrDayPassive) .rdrInRange ~ .rdrDayNumber span": {
            color: "#0D3457 !important"
        },
        "& .rdrDay:not(.rdrDayPassive) .rdrStartEdge ~ .rdrDayNumber span": {
            fontWeight: "bold !important"
        },
        "& .rdrDay:not(.rdrDayPassive) .rdrEndEdge ~ .rdrDayNumber span": {
            fontWeight: "bold !important"
        },
        "& .rdrDayNumber": {
            ...boxCentering,
            top: 0,
            borderRadius: "50%",
            fontWeight: 500
        },
        "& .rdrInRange": {
            borderRadius: "0 !important",
            height: "35px",
            top: 0,
            color: theme.palette.primary.main
        },
        ".rdrStartEdge.rdrEndEdge": {
            left: 0,
            borderRadius: "50% !important"
        },
        "& .rdrStartEdge, & .rdrEndEdge": {
            top: 0,
            borderRadius: "0 !important",
            height: "35px",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
        },
        "& .rdrStartEdge": {
            ...startBorder
        },
        "& .rdrEndEdge": {
            ...endBorder
        },
        "& .rdrDayHovered": {
            ...bgColors,
            borderRadius: "50%",
            border: "none"
        },
        "& .rdrDay:hover .rdrDayNumber": {
            border: "none",
            outline: "none",
            boxShadow: "none"
        },
        "& .rdrDayInPreview": {
            ...bgColors,
            top: 0,
            height: "35px",
            borderRadius: "0",
            border: "none"
        },
        "& .rdrDayEndOfWeek .rdrDayInPreview": {
            ...bgColors,
            top: 0,
            height: "35px",
            borderRadius: "0 !important",
            border: "none"
        },
        "& .rdrDayStartPreview": {
            ...bgColors,
            ...startBorder,
            top: 0,
            height: "35px",
            border: "none"
        },
        "& .rdrDayStartOfWeek .rdrEndEdge": {
            left: "0 !important"
        },

        "& .rdrDayEndPreview": {
            ...bgColors,
            ...endBorder,
            top: 0,
            height: "35px",
            border: "none"
        },
        "& .rdrDayEndPreview.rdrDayStartPreview": {
            ...bgColors,
            borderRadius: "50% !important",
            border: "none"
        },
        "& .rdrDayToday span::after": {
            display: "none"
        }
    };
});

export const ApplyButton = styled(Button)(({ theme }) => ({
    background: theme.palette.primary.main,
    textTransform: "capitalize",
    margin: theme.spacing(4),
    color: theme.palette.common.white,
    padding: "11px 23px",
    minWidth: "auto",
    fontWeight: 400,
    display: "inline-block",
    transition: "transform 0.3s ease",
    "&:hover": {
        padding: "11px 23px",
        background: theme.palette.primary.main,
        fontWeight: 400,
        boxShadow: "0px 3px 6px #0D34571A"
    }
}));
