import { Dialog, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";
import { DialogTypesMap } from "../Dialog.types";
import { ActionButton, ActionsGroup, MainDialogContent, MainTitle, paperDialog } from "../Dialog.styled";

const UnsavedChangesView = ({ open, onClose, onDiscard, onSave }: DialogTypesMap["unsavedChanges"]) => {
    const t = useTranslations();
    return (
        <Dialog open={open} onClose={onClose} PaperProps={paperDialog}>
            <MainTitle>{t("unsaved_changes")}</MainTitle>
            <MainDialogContent>
                <Typography>{t("proceed_changes")}</Typography>
            </MainDialogContent>
            <ActionsGroup>
                <ActionButton onClick={onClose} variant="contained">
                    {t("cancel")}
                </ActionButton>
                <ActionButton onClick={onDiscard} variant="contained" color="info" content="responsive">
                    {t("discard")}
                </ActionButton>
                <ActionButton onClick={onSave} variant="contained" color="success" content="responsive">
                    {t("proceed")}
                </ActionButton>
            </ActionsGroup>
        </Dialog>
    );
};

export default UnsavedChangesView;
