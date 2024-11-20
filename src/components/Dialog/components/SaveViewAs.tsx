import { Dialog } from "@mui/material";
import React, { useState } from "react";
import FormWrapper from "../../FormWrapper/FormWrapper";
import { DialogTypesMap } from "../Dialog.types";
import { ActionButton, ActionsGroup, MainDialogContent, MainTitle, paperMinDialog } from "../Dialog.styled";
import { useTranslations } from "next-intl";
import TextField from "../../TextField.tsx";

interface SaveAsFormData {
    name: string;
}

const SaveViewAs = ({ open, onClose, onSave }: DialogTypesMap["saveAs"]) => {
    const t = useTranslations();
    const [error, setError] = useState<string | null>(null);
    const defaultValues = { name: "" };
    const onSubmit = (data: SaveAsFormData) => {
        setError(null);
        onSave(data.name, setError);
    };
    return (
        <Dialog open={open} onClose={onClose} PaperProps={paperMinDialog}>
            <FormWrapper<SaveAsFormData> defaultValues={defaultValues} onSubmit={onSubmit}>
                <MainTitle>{t("save_as")}</MainTitle>
                <MainDialogContent>
                    <TextField.withController name="name" label={t("name")} error={error} />
                </MainDialogContent>
                <ActionsGroup>
                    <ActionButton onClick={onClose} variant="contained">
                        {t("cancel")}
                    </ActionButton>
                    <ActionButton type="submit" variant="contained" color="info">
                        {t("save")}
                    </ActionButton>
                </ActionsGroup>
            </FormWrapper>
        </Dialog>
    );
};

export default SaveViewAs;
