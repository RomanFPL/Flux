import { Button, Popper, styled } from "@mui/material";

export const StyledButton = styled(Button)(({ theme }) => ({
    width: "",
    minHeight: theme.spacing(8),
    padding: theme.spacing(3),
    paddingTop: 0,
    paddingBottom: 0,
    background: "transparent",
    boxShadow: "none",
    borderRadius: theme.spacing(2),
    border: "1px solid #E6EAEE",
    "&:hover": {
        boxShadow: `0px 3px 6px ${theme.palette.shadow}`,
        borderColor: theme.palette.border,
        background: "transparent"
    },
    "& .MuiButton-startIcon, & .MuiButton-endIcon": {
        color: "#0D3457"
    },
    "& .MuiButton-endIcon": {
        marginLeft: theme.spacing(4)
    }
}));

export const StyledPopper = styled(Popper)(({ theme }) => ({
    zIndex: 9999,
    paddingTop: "5px"
}));

export const St = styled("span")({
    color: "#C95D63"
});
