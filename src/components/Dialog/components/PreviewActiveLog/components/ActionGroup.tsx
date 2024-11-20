import React from "react";
import { Stack } from "@mui/material";
import { ActionsGroupExtended } from "../PreviewActiveLog.styled";
import IconButton from "../../../../IconButton/IconButton";
import { EditIcon, DeleteIcon } from "@/icons";
import { ActionButton } from "../../../Dialog.styled";
import { useTranslations } from "next-intl";

interface ActionGroupProps {
    onClose: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

const ActionGroup = ({ onClose, onEdit, onDelete }: ActionGroupProps) => {
    const t = useTranslations();
    return (
        <ActionsGroupExtended>
            <Stack flexDirection="row" gap={3}>
                {onEdit && (
                    <IconButton bgVariant="secondary" onClick={onEdit}>
                        <EditIcon />
                    </IconButton>
                )}
                {onDelete && (
                    <IconButton bgVariant="secondary" onClick={onDelete}>
                        <DeleteIcon />
                    </IconButton>
                )}
            </Stack>
            <ActionButton onClick={onClose} variant="contained" color="info">
                {t("ok")}
            </ActionButton>
        </ActionsGroupExtended>
    );
};

export default ActionGroup;
