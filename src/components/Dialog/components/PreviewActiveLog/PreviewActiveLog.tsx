import { Dialog, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { paperDialogExtended } from "./PreviewActiveLog.styled";
import { useTranslations } from "next-intl";
import HeaderGroup from "./components/HeaderGroup";
import DurationInfo from "./components/DurationInfo";
import InfoItem from "./components/InfoItem";
import ActionGroup from "./components/ActionGroup";
import useToolId from "@/hooks/useToolId";
import { DialogTypesMap } from "../../Dialog.types";

const PreviewActiveLog = ({ open, onClose, onEdit, onDelete, data }: DialogTypesMap["preview_active_log"]) => {
    const t = useTranslations();
    const { toolId } = useToolId();
    return (
        <Dialog open={open} onClose={onClose} PaperProps={paperDialogExtended}>
            <HeaderGroup id={String(data.id)} toolId={toolId} />
            <Stack gap={4} padding={6} height="580px" overflow="auto" mr={2} pt={0}>
                <Typography variant="subtitle2">{t("date_time")}</Typography>
                {data.dateTime?.map(({ startDate, startTime, duration }, idx) => (
                    <DurationInfo key={idx} {...{ startDate, startTime, duration }} />
                ))}
                <Divider />
                {data.general.map(
                    ({ label, content }, idx) => content && <InfoItem key={idx} {...{ label, content }} />
                )}
            </Stack>
            <ActionGroup {...{ onClose, onEdit, onDelete }} />
        </Dialog>
    );
};

export default PreviewActiveLog;
