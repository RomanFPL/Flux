import React from "react";
import { DialogTypesMap } from "../Dialog.types";
import { Dialog, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { ActionButton, ActionsGroup, MainDialogContent, MainTitle, paperDialog } from "../Dialog.styled";

const OverrideView = ({ open, onClose, viewName }: DialogTypesMap["override"]) => {
    const t = useTranslations();
    return (
        <Dialog open={open} onClose={onClose} PaperProps={paperDialog}>
            <MainTitle>{t("already_exists", { view: viewName })}</MainTitle>
            <MainDialogContent>
                <Typography>{t("override_view", { view: viewName })}</Typography>
            </MainDialogContent>
            <ActionsGroup>
                <ActionButton onClick={onClose} variant="contained" color="error" content="responsive">
                    {t("override")}
                </ActionButton>
                <ActionButton onClick={onClose} variant="contained">
                    {t("cancel")}
                </ActionButton>
            </ActionsGroup>
        </Dialog>
    );
};

export default OverrideView;
