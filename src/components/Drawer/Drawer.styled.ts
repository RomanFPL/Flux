import { Box, Drawer, List, styled } from "@mui/material";

const drawerWidth = 230;

export const StyledDrawer = styled(Drawer)({
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
        width: drawerWidth,
        boxSizing: "border-box",
        backgroundColor: "#fff",
        color: "#333",
        padding: "20px",
        borderColor: "transparent"
    }
});

export const StyledBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "108px"
});

export const StyledList = styled(List)({
    paddingTop: "0"
});
