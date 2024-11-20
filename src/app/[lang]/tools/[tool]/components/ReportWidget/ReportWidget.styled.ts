import { Box, TextField, Typography, styled } from "@mui/material";

export const ChartContainer = styled(Box)(({ theme }) => ({
    height: "calc(50vh - 200px)",
    width: "100%",
    position: "relative",
    paddingBottom: theme.spacing(4)
}));

export const StyledToolBar = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: 1,
    marginBottom: theme.spacing(4),
    justifyContent: "space-between"
}));

export const StatusBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    height: "40px",
    gap: theme.spacing(3)
}));

export const StyledStatusBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: theme.spacing(2)
}));

export const StatusText = styled(Typography, {
    shouldForwardProp: prop => !["statusColor", "opacity"].includes(prop.toString())
})<{ statusColor: string; opacity?: number }>(({ statusColor, opacity = 1 }) => ({
    fontWeight: "bold",
    color: statusColor,
    opacity: opacity
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
    "@media (max-width: 1900px)": {
        width: "192px"
    },
    "& .MuiInputBase-root": {
        borderRadius: "10px",
        height: "40px"
    },
    "& .MuiInputBase-input::placeholder": {
        opacity: 1
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: theme.palette.border
        },
        "&.Mui-focused fieldset": {
            border: `1px solid ${theme.palette.border}`,
            boxShadow: `0px 3px 6px ${theme.palette.shadow}`
        },
        "&:hover fieldset": {
            borderColor: theme.palette.border,
            boxShadow: `0px 3px 6px ${theme.palette.shadow}`
        }
    }
}));

export const StyledDescription = styled(Typography)(({ theme }) => ({
    color: theme.palette.errors.alignment,
    fontWeight: "bold",
    fontSize: "14px",
    width: "100%",
    fontStyle: "italic"
}));
