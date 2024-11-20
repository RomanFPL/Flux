import { styled, Table, TableContainer, TableRow } from "@mui/material";

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    //TODO: Find better way to control size
    maxHeight: "calc(100vh - 630px)",
    overflowY: "auto",
    // border: `1px solid ${theme.palette.border}`,
    "& thead": {
        position: "sticky",
        top: 0,
        backgroundColor: theme.palette.background.default,
        zIndex: 1
    },
    "&::-webkit-scrollbar-corner": {
        height: 10
    },
    "&::-webkit-scrollbar-button:single-button": {
        height: 40,
        background: theme.palette.secondary.main
    },
    "&::-webkit-scrollbar-button:single-button:vertical:decrement": {
        height: 40
    },
    "&::-webkit-scrollbar-button:single-button:vertical:increment": {
        height: 0,
        width: 0
    }
}));

export const StyledTable = styled(Table)(({ theme }) => ({
    minWidth: 650,
    borderCollapse: "separate",
    borderSpacing: "0",
    height: "max-content",
    "& th": {
        padding: theme.spacing(1, 2),
        borderTop: `1px solid ${theme.palette.border}`,
        borderBottom: "none",
        backgroundColor: `${theme.palette.secondary.main}80`,
        color: `${theme.palette.text.primary}80`,
        fontSize: theme.typography.body1.fontSize,
        fontWeight: theme.typography.fontWeightRegular,
        lineHeight: 1.3,
        width: "100px"
    },
    "& td": {
        width: "100px",
        boxSizing: "border-box",
        lineHeight: "20px",
        padding: theme.spacing(2, 2),
        borderBottom: `1px solid ${theme.palette.border}`,
        fontSize: theme.typography.body1.fontSize
    },
    "& td:last-child": {
        width: "60%"
    },
    "& tbody tr:last-child td": {
        borderBottom: "none"
    }
}));

export const CheckboxTable = styled(Table)(({ theme }) => ({
    minWidth: 650,
    borderCollapse: "separate",
    borderSpacing: "0",
    "& th": {
        // borderTop: `1px solid ${theme.palette.border}`,
        borderBottom: "none",
        padding: theme.spacing(1, 2),
        backgroundColor: `${theme.palette.secondary.main}80`,
        color: `${theme.palette.text.primary}80`,
        fontSize: theme.typography.body1.fontSize,
        fontWeight: theme.typography.fontWeightRegular,
        lineHeight: 1.3,
        height: 40,
        "&:last-child": {
            maxWidth: 100
        }
    },
    "& td": {
        // borderBottom: `1px solid ${theme.palette.border}`,
        padding: theme.spacing(2, 2),
        fontSize: theme.typography.body1.fontSize,
        whiteSpace: "nowrap",
        "&:last-child": {
            maxWidth: 100,
            overflow: "hidden",
            textOverflow: "ellipsis"
        }
    },
    "& tbody tr:last-child td": {
        borderBottom: "none"
    }
}));

export const StyledTableRow = styled(TableRow)(({ theme, selected }) => ({
    backgroundColor: selected ? "#CDE1E988" : "inherit",
    cursor: "pointer"
}));
