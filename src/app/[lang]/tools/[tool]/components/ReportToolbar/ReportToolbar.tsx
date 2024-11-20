import { IconButton, MultiselectButton, Toggle } from "@/components";
import MinimizeIcon from "@/icons/MinimizeIcon";
import { TimeToggleOptions } from "@/types/TimeToggleType";
import { Box, Divider, Stack, Tooltip, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { ReportToolbarProps } from "./ReportToolbar.types";

const ReportToolbar = ({ graphValues = [] }: ReportToolbarProps) => {
    const t = useTranslations();
    const { getValues } = useFormContext();

    const maxGraphs = getValues("selectedGraphs").length === graphValues.length;

    return (
        <Stack direction="row" spacing={2} justifyContent="space-between">
            <Typography variant="h3">{t("reports")}</Typography>
            <Stack gap={3} direction="row">
                <MultiselectButton.withController
                    defaultName={t("graphs")}
                    width={"147px"}
                    items={graphValues}
                    name="selectedGraphs"
                    budge={!maxGraphs}
                    maxSelection={{ type: "disabled", value: 2 }}
                />
                <Toggle.withController name="timeFilter" items={Object.values(TimeToggleOptions).slice(0, 3)} />
                <Divider />
                <Tooltip title={t("minimize")}>
                    <Box>
                        <IconButton.withController name="visible" tooltipText={t("minimize")}>
                            <MinimizeIcon />
                        </IconButton.withController>
                    </Box>
                </Tooltip>
            </Stack>
        </Stack>
    );
};

export default ReportToolbar;
