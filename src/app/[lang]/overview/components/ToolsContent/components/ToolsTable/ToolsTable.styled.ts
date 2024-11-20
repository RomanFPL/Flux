import { Stack, styled, Table, TableCell, TableContainer, TableRow } from "@mui/material";

export const StyledStatusTableContainer = styled(TableContainer)(({ theme }) => ({
    height: "100%",
    width: "100%",
    overflow: "hidden",
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.border}`,
    "& thead": {
        position: "sticky",
        top: 0,
        backgroundColor: theme.palette.background.default,
        zIndex: 1,
        height: "39px"
    },
    "& tbody": {
        display: "block",
        height: "100%",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
            width: "5px",
            marginRight: "5px"
        },
        "&::-webkit-scrollbar-track": {
            marginRight: "5px"
            // marginTop: "60px"
        }
    },
    "& tr": {
        display: "table",
        tableLayout: "fixed",
        width: "100%"
    }
}));

export const StatusTable = styled(Table)(({ theme }) => ({
    display: "table",
    width: "100%",
    height: "100%",
    // minWidth: 650,
    borderCollapse: "separate",
    borderSpacing: "0",
    "& th": {
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
        padding: theme.spacing(2, 2),
        fontSize: theme.typography.body1.fontSize,
        whiteSpace: "nowrap",
        "&:last-child": {
            overflow: "hidden",
            textOverflow: "ellipsis"
        },
        "&:first-of-type": {
            paddingLeft: "15px",
            width: "auto"
        }
    },
    "& tbody tr:last-child td": {
        borderBottom: "none"
    }
}));

export const StyledDragTableRow = styled(TableRow, {
    shouldForwardProp: prop => prop !== "dragged"
})<{ dragged?: boolean }>(({ theme, dragged }) => ({
    backgroundColor: dragged ? `${theme.palette.hover}80` : "inherit",
    opacity: dragged ? 0.5 : 1,
    cursor: dragged ? "grabbing" : "move",
    position: "relative",
    transition: "background-color 0.3s ease, opacity 0.3s ease",
    "&:hover": {
        backgroundColor: dragged ? "inherit" : `${theme.palette.hover}80`
    }
}));

export const StyledTableRow = styled(TableRow)(({ theme, selected }) => ({
    backgroundColor: selected ? "#CDE1E988" : "inherit"
}));

export const StyledStatus = styled("div")<{ color: string }>(({ color }) => ({
    minWidth: "12px",
    height: "12px",
    maxWidth: "12px",
    backgroundColor: color,
    borderRadius: 3
}));

export const StyledSecGemBox = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(1)
}));

export const StyledDropZoneBefore = styled("div")(({ theme }) => ({
    position: "absolute",
    width: "100%",
    height: "2px",
    top: "-1px",
    left: 0,
    backgroundColor: theme.palette.primary.main
}));

export const StyledDropZoneAfter = styled("div")(({ theme }) => ({
    position: "absolute",
    width: "100%",
    height: "2px",
    bottom: "-1px",
    left: 0,
    backgroundColor: theme.palette.primary.main
}));

export const EmptyTableRow = styled(TableRow)(({ theme }) => ({
    position: "relative",
    height: "40px",
    padding: 0,
    margin: 0,
    backgroundColor: `${theme.palette.hover}80`
}));

export const EmptyTableCell = styled(TableCell)(({ theme }) => ({
    position: "relative",
    height: "100%",
    padding: 0,
    margin: 0
}));
