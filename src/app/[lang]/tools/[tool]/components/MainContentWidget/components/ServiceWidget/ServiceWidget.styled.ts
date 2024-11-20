import { styled, TableContainer } from "@mui/material";

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    marginTop: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.border}`
    // height: "calc(100% - 250px)"
}));
