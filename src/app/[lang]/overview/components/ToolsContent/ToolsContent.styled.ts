import { Stack, styled } from "@mui/material";

export const ToolsContainer = styled(Stack)(({ theme }) => ({
    height: "calc(100% - 60px)",
    overflowY: "auto",
    paddingBottom: theme.spacing(4),
    paddingLeft: "10px",
    marginLeft: "-10px"
}));
