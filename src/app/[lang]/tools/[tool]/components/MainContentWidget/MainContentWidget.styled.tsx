import { Divider, Stack, styled } from "@mui/material";

export const StyledDivider = styled(Divider)(({ theme }) => ({
    marginTop: theme.spacing(4)
}));

export const StyledStack = styled(Stack)({
    height: "100%"
});
