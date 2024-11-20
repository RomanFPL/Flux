import { Alert, Box, Button, DialogActions, DialogContent, DialogTitle, styled } from "@mui/material";

export const NotificationBox = styled(Box)({
    width: "100vw",
    height: "100vh",
    zIndex: 9,
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    top: "24px"
});

export const MainTitle = styled(DialogTitle)({
    padding: 0,
    fontSize: 16,
    fontWeight: "bold",
    color: "#0D3457",
    opacity: 1
});

export const LogMainTitle = styled(DialogTitle)({
    padding: 0,
    fontSize: 16,
    fontWeight: "bold",
    color: "#C95D63",
    opacity: 1
});

export const ActionsGroup = styled(DialogActions)({
    margin: "0 0 auto 0",
    padding: 0,
    display: "flex",
    gap: "15px",
    justifyContent: "end",
    marginTop: 40
});

export const MainDialogContent = styled(DialogContent)({ padding: 0, marginTop: "20px" });

export const StyledLegendBox = styled(Alert, {
    shouldForwardProp: prop => prop !== "type"
})<{ type: "error" | "success" }>(({ theme, type }) => ({
    backgroundColor: type.toLowerCase().includes("error") ? "#C95D63" : "#5DAC81",
    display: "flex",
    alignItems: "center",
    height: "40px",
    color: "#fff",
    padding: "9px 20px",
    borderRadius: "10px",
    boxShadow: "0px 3px 6px #00000029",
    textAlign: "center",
    "& .MuiAlert-message": { padding: 0 }
}));

export const ActionButton = styled(Button, {
    shouldForwardProp: prop => prop !== "color" && prop !== "size"
})<{ color?: "cancel" | "success" | "info" | "error"; content?: "static" | "responsive" }>(({
    color = "cancel",
    content: size = "static"
}) => {
    const colors: { [key: string]: string } = {
        cancel: "#F0F3F5",
        success: "#5DAC81",
        info: "#007192",
        error: "#C95D63"
    };
    const hoverColors: { [key: string]: string } = {
        cancel: "#E6EAEE",
        success: "#5DAC81",
        info: "#007192",
        error: "#C95D63"
    };

    const textColors: { [key: string]: string } = {
        cancel: "#0D3457",
        success: "#FFFFFF",
        info: "#FFFFFF",
        error: "#FFFFFF"
    };

    return {
        textTransform: "capitalize",
        background: colors[color],
        height: "40px",
        width: size === "static" ? "82px" : "auto",
        padding: size === "responsive" ? "10px" : "auto",
        cursor: "pointer",
        boxShadow: "none",
        margin: "0 !important",
        color: textColors[color],
        "&:hover": {
            boxShadow: "none",
            backgroundColor: hoverColors[color]
        }
    };
});

export const paperDialog = { sx: { padding: "30px", height: 257, width: 444, boxSizing: "border-box" } };
export const paperMinDialog = { sx: { padding: "30px", height: 257, width: 284 } };
