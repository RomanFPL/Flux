import { ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Typography } from "@mui/material";
import { StyledListItemProps } from "./NavigationItem.types";

export const StyledListItem = styled(ListItem, {
    shouldForwardProp: prop =>
        prop !== "isSelected" && prop !== "withHalfRound" && prop !== "isLatest" && prop !== "isSecondary"
})<StyledListItemProps>(({ isSelected, theme, isSecondary, withHalfRound, isLatest }) => {
    const bgColor = isSecondary ? "#CDE1E9" : theme.palette.primary.main;
    const textColor = isSecondary ? theme.palette.text.primary : "#fff";
    const radius = withHalfRound ? "10px 10px 0 0" : theme.shape.borderRadius;
    const secondaryRadius = isLatest ? "0 0 10px 10px" : 0;

    return {
        width: "auto",
        borderRadius: isSecondary ? secondaryRadius : radius,
        backgroundColor: isSelected ? bgColor : "inherit",
        boxShadow: isSelected ? `0px 3px 6px ${theme.palette.shadow}` : "inherit",
        span: {
            display: "flex",
            gap: theme.spacing(1),
            color: isSelected ? textColor : theme.palette.text.primary,
            fontWeight: "bold"
        },
        "&:hover": {
            backgroundColor: isSelected ? bgColor : "#FFF",
            cursor: isSelected ? "default" : "pointer",
            boxShadow: `0px 3px 6px ${theme.palette.shadow}`
        }
    };
});

export const StyledListItemButton = styled(ListItemButton)({
    padding: "13px 15px",
    "&:hover": {
        backgroundColor: "transparent"
    }
});

export const StyledListItemIcon = styled(ListItemIcon)({
    minWidth: "30px"
});

export const StyledIcon = styled("div")<{
    isSelected: boolean;
    withEndIcon?: boolean;
}>(({ isSelected, withEndIcon, theme }) => ({
    display: "flex",
    alignItems: "center",
    color: isSelected ? "#fff" : theme.palette.text.primary,
    marginLeft: withEndIcon ? "auto" : undefined,
    marginRight: withEndIcon ? 0 : undefined
}));

export const StyledCountText = styled(Typography, {
    shouldForwardProp: prop => prop !== "isSelected"
})<{ isSelected: boolean }>(({ isSelected, theme }) => ({
    color: isSelected ? "#fff" : theme.palette.text.primary,
    fontWeight: "bold",
    opacity: 0.5
}));

export const StyledListItemText = styled(ListItemText, {
    shouldForwardProp: prop => prop !== "isSecondary"
})<{ isSecondary?: boolean }>(({ isSecondary, theme }) => ({
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    margin: "0px",
    paddingLeft: isSecondary ? theme.spacing(3) : 0
}));
