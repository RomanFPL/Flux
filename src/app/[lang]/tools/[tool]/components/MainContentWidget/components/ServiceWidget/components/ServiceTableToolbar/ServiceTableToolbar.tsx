import { IconButton } from "@/components";
import { AddTextIcon, ExportIcon } from "@/icons";
import DeleteIcon from "@/icons/DeleteIcon";
import EditIcon from "@/icons/EditIcon";
import EmailIcon from "@/icons/EmailIcon";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";
import { ServiceActions } from "./ServiceTableToolbar.typed";
import { useServiceWidget } from "../../ServiceWidgetContext";
import { getAvailableActions } from "../../helper";
import useToolbarActions from "./helper/useToolbarActions";

const ServiceTableToolbar = () => {
    const t = useTranslations();
    const { maintenanceData, selectedRows } = useServiceWidget();

    const activityAmount = maintenanceData.length;

    const availableActions = getAvailableActions(selectedRows);
    const isAvailable = (action: ServiceActions) => !availableActions?.includes(action!);

    const { onAddClick, onEditClick, onOpenClick, onDeleteClick, onClearFilters } = useToolbarActions();

    return (
        <Stack p={2} direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">{t("activity", { amount: activityAmount })}</Typography>
            <Stack direction="row" spacing={3}>
                <Button variant="text" onClick={onClearFilters}>
                    {t("clear_filters")}
                </Button>
                <Divider />
                <IconButton
                    bgVariant="secondary"
                    tooltipText={t("open")}
                    onClick={() => onOpenClick()}
                    disabled={isAvailable("open")}
                >
                    <EmailIcon />
                </IconButton>
                <IconButton
                    bgVariant="secondary"
                    tooltipText={t("edit")}
                    onClick={onEditClick}
                    disabled={isAvailable("edit")}
                >
                    <EditIcon />
                </IconButton>
                <Stack direction="row" spacing={2}>
                    <IconButton
                        bgVariant="secondary"
                        tooltipText={t("delete")}
                        onClick={onDeleteClick}
                        disabled={isAvailable("delete")}
                    >
                        <DeleteIcon />
                    </IconButton>
                    <Divider />
                    <IconButton tooltipText={t("export")} disabled={isAvailable("export")}>
                        <ExportIcon />
                    </IconButton>
                    <IconButton onClick={onAddClick} disabled={isAvailable("add")}>
                        <AddTextIcon />
                    </IconButton>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default ServiceTableToolbar;
