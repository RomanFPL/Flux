import { Dialog, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";
import { DialogTypesMap } from "../Dialog.types";
import { ActionButton, ActionsGroup, MainDialogContent, MainTitle, paperDialog } from "../Dialog.styled";

const DeleteView = ({ open, onClose, viewName, onDelete }: DialogTypesMap["delete"]) => {
    const t = useTranslations();
    return (
        <Dialog open={open} onClose={onClose} PaperProps={paperDialog}>
            <MainTitle>{t("delete_view", { view: viewName })}</MainTitle>
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

export default DeleteView;
