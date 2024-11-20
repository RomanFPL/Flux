import { IconButton, Toggle } from "@/components";
import { MaximizeIcon, MinusIcon, PlusIcon, RestoreIcon } from "@/icons";
import { LccLightType } from "@/types/LccLightType";
import { LccTimeToggleOptions } from "@/types/TimeToggleType";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { StyledBox } from "./LCCChartToolbar.styled";
import { LCCChartToolbarProps } from "./LCCChartToolbar.types";

const ZOOM_DELTA = 0.1;

const LCCChartToolbar = ({ reset }: LCCChartToolbarProps) => {
    const t = useTranslations();

    const { setValue, watch } = useFormContext();
    const isMaximized = watch("maximize");
    const zoom = watch("zoom");

    const handleZoomOut = () => {
        setValue("zoom", zoom ? zoom - ZOOM_DELTA : 0);
    };

    const handleZoomIn = () => {
        setValue("zoom", zoom ? zoom + ZOOM_DELTA : 0);
    };

    return (
        <StyledBox>
            <Stack direction="row" gap={3}>
                <Typography variant="h4">{t("lcc")}</Typography>
                <Toggle.withController name="lightType" items={Object.values(LccLightType)} />
                <Toggle.withController name="timeFilter" items={Object.values(LccTimeToggleOptions)} />
                <Divider />
                <IconButton.withController name="minus" onClick={handleZoomOut} tooltipText={t("zoom_out")}>
                    <MinusIcon />
                </IconButton.withController>
                <IconButton.withController name="plus" onClick={handleZoomIn} tooltipText={t("zoom_in")}>
                    <PlusIcon />
                </IconButton.withController>
                <Divider />
                <Button variant="text" onClick={reset}>
                    {t("reset")}
                </Button>
            </Stack>
            <Stack direction="row">
                <IconButton.withController name="maximize" tooltipText={isMaximized ? t("restore") : t("maximize")}>
                    {isMaximized ? <RestoreIcon /> : <MaximizeIcon />}
                </IconButton.withController>
            </Stack>
        </StyledBox>
    );
};

export default LCCChartToolbar;
