import { AppBar, Box, Divider, Toolbar, Typography, styled } from "@mui/material";

const drawerWidth = 230;

export const StyledAppBar = styled(AppBar)({
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: "transparent",
    boxShadow: "none"
});

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    background: "transparent",
    padding: "20px",
    color: theme.palette.text.primary,
    "&.MuiToolbar-root": {
        padding: "20px"
    }
}));

export const StylesAccountTypography = styled(Typography)({
    textWrap: "nowrap"
});

export const StyledAccountWrapper = styled(Box)({
    flexGrow: 0,
    marginLeft: "auto",
    gap: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
});

export const StyledBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
});

export const StyledDivider = styled(Divider)({
    alignSelf: "stretch"
});
