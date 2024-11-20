import { styled, Typography } from "@mui/material";

export const StyledDiv = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "7px",
    backgroundColor: "transparent",
    border: `1px solid ${theme.palette.status.toolDown}`,
    borderRadius: "10px",
    height: "40px",
    width: "auto",
    padding: "10px"
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.status.toolDown
}));

export const StyledDivDivider = styled("div")(({ theme }) => ({
    height: "20px",
    width: "1px",
    backgroundColor: theme.palette.status.toolDown
}));
