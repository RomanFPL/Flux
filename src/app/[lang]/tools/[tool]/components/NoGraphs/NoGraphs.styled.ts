import { Stack, styled, Typography } from "@mui/material";

export const NoGraphsWrapper = styled(Stack)(() => ({
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
}));

export const TypographyStyled = styled(Typography)(() => ({
    fontSize: "20px",
    width: " 120px",
    wordBreak: "break-word"
}));
