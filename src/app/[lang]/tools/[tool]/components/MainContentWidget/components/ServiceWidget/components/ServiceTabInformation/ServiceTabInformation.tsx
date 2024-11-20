import { Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";
import { useServiceWidget } from "../../ServiceWidgetContext";
import { prepareServiceInfo } from "./helper";

const ServiceTabInformation = () => {
    const t = useTranslations();
    const { toolData } = useServiceWidget();
    const { backupSystemLocation, chuckType, environment, optics } = prepareServiceInfo(toolData);

    return (
        <Stack direction="row" justifyContent="start" alignItems="center" gap={6}>
            <Stack direction="column">
                <Typography variant="h6">{t("backup_system_location")}</Typography>
                <Typography variant="h4" component="p">
                    {backupSystemLocation}
                </Typography>
            </Stack>
            <Stack direction="column">
                <Typography variant="h6">{t("chuck_type")}</Typography>
                <Typography variant="h4" component="p">
                    {chuckType}
                </Typography>
            </Stack>
            <Stack direction="column">
                <Typography variant="h6">{t("environment")}</Typography>
                <Typography variant="h4" component="p">
                    {t("environment_var", { number: environment })}
                </Typography>
            </Stack>
            <Stack direction="column">
                <Typography variant="h6">{t("optics")}</Typography>
                <Typography variant="h4" component="p">
                    {optics}
                </Typography>
            </Stack>
        </Stack>
    );
};
export default ServiceTabInformation;
