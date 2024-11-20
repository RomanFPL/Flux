import { IconButton, Toggle } from "@/components";
import MinimizeIcon from "@/icons/MinimizeIcon";
import { TimeToggleOptions } from "@/types/TimeToggleType";
import { Divider, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const ReportToolbar = () => {
    const t = useTranslations();

    return (
        <Stack direction="row" spacing={2} justifyContent="space-between">
            <Typography variant="h3">{t("reports")}</Typography>
            <Stack gap={3} direction="row">
                <Toggle.withController name="timeFilter" items={Object.values(TimeToggleOptions).slice(0, 3)} />
                <Divider />
                <IconButton.withController name="visible" tooltipText={t("minimize")}>
                    <MinimizeIcon />
                </IconButton.withController>
            </Stack>
        </Stack>
    );
};

export default ReportToolbar;
