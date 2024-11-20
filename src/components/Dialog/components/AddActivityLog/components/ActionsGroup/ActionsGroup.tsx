import { ActionButton } from "@/components/Dialog/Dialog.styled";
import { Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { ActionsGroupExtended } from "./ActionsGroup.styled";

interface ActionsGroupProps {
    onClose: () => void;
    actionBtnName: string;
}

const ActionsGroup = ({ actionBtnName, onClose }: ActionsGroupProps) => {
    const t = useTranslations();
    const { formState } = useFormContext();
    const hasErrors = Object.keys(formState.errors).length > 0;

    return (
        <ActionsGroupExtended>
            {hasErrors && (
                <Stack marginRight="auto">
                    <Typography color="#C95D63" variant="body2" fontStyle="italic">
                        {t("fill_all_fields")}
                    </Typography>
                </Stack>
            )}
            <ActionButton onClick={onClose} variant="contained">
                {t("cancel")}
            </ActionButton>
            <ActionButton type="submit" variant="contained" color="info">
                {actionBtnName}
            </ActionButton>
        </ActionsGroupExtended>
    );
};

export default ActionsGroup;
