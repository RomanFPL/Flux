import { DialogActions, styled } from "@mui/material";

export const paperDialogExtended = { sx: { height: "auto", width: 560, boxSizing: "border-box" } };

export const ActionsGroupExtended = styled(DialogActions)({
    borderTop: "1px solid #E6EAEE",
    margin: "0 0 auto 0",
    padding: 30,
    display: "flex",
    gap: "15px",
    justifyContent: "space-between"
});
