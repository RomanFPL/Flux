import { Dialog, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";
import { DialogTypesMap } from "../Dialog.types";
import { ActionButton, ActionsGroup, LogMainTitle, MainDialogContent, paperDialog } from "../Dialog.styled";

const DeleteActiveLog = ({ open, onClose, viewName, onDelete }: DialogTypesMap["delete_active_log"]) => {
    const t = useTranslations();
    return (
        <Dialog open={open} onClose={onClose} PaperProps={paperDialog}>
            <LogMainTitle>{t("delete_log", { view: viewName })}</LogMainTitle>
            <MainDialogContent>
                <Typography>{t("delete_proceed", { view: viewName })}</Typography>
            </MainDialogContent>
            <ActionsGroup>
                <ActionButton onClick={onClose} variant="contained">
                    {t("cancel")}
                </ActionButton>
                <ActionButton onClick={onDelete} variant="contained" color="error" content="responsive">
                    {t("delete")}
                </ActionButton>
            </ActionsGroup>
        </Dialog>
    );
};

export default DeleteActiveLog;
