import { Box, styled, Typography } from "@mui/material";

export const StyledVersionTimeBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2)
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
    height: theme.spacing(4),
    mt: 2,
    display: "block"
}));
