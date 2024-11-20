import React from "react";
import { DialogTypesMap } from "../Dialog.types";
import { Portal } from "@mui/material";
import { NotificationBox, StyledLegendBox } from "../Dialog.styled";

const NotificationSuccess = ({ onClose, message }: DialogTypesMap["notification_error"]) => {
    return (
        <Portal container={document.body}>
            <NotificationBox onClick={onClose}>
                <StyledLegendBox icon={false} type="error">
                    {message}
                </StyledLegendBox>
            </NotificationBox>
        </Portal>
    );
};

export default NotificationSuccess;
