import { DegradationIcon } from "@/icons";
import AlignmentErrorIcon from "@/icons/AlignmentErrorIcon";
import KillAoiErrorIcon from "@/icons/KillAoiErrorIcon";
import LightIcon from "@/icons/LightIcon";
import ScanErrorIcon from "@/icons/ScanErrorIcon";
import { OverallHealthStatus } from "@/services/openApi";
import { useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { Item } from "./Health.types";

const usePrepareHealthRows = (health: OverallHealthStatus) => {
    const t = useTranslations();
    const theme = useTheme();
    const errors: Item[] = [
        {
            name: t("alignment_errors"),
            color: theme.palette.errors.alignment,
            icon: AlignmentErrorIcon,
            value: health.alignmentErrors,
            isValid:
                health.alignmentErrors !== undefined &&
                health.alignmentErrorsMaxNormal !== undefined &&
                Number(health.alignmentErrors) <= Number(health.alignmentErrorsMaxNormal)
                    ? true
                    : false
        },
        {
            name: `${t("2D")} ${t("scan_errors")}`,
            color: theme.palette.errors.scan_2d,
            icon: ScanErrorIcon,
            value: health.scan2DErrors,
            isValid:
                health.scan2DErrors !== undefined &&
                health.scan2DErrorsMaxNormal !== undefined &&
                Number(health.scan2DErrors) <= Number(health.scan2DErrorsMaxNormal)
                    ? true
                    : false
        },
        {
            name: t("kill_aoi"),
            color: theme.palette.errors.killaoi,
            icon: KillAoiErrorIcon,
            value: health.killAOICount,
            isValid:
                health.killAOICount !== undefined &&
                health.killAOICountMaxNormal !== undefined &&
                Number(health.killAOICount) <= Number(health.killAOICountMaxNormal)
                    ? true
                    : false
        },
        {
            name: `${t("3D")} ${t("scan_errors")}`,
            color: theme.palette.errors.scan_3d,
            icon: ScanErrorIcon,
            value: health.scan3DErrors,
            isValid:
                health.scan3DErrors !== undefined &&
                health.scan3DErrorsMaxNormal !== undefined &&
                Number(health.scan3DErrors) <= Number(health.scan3DErrorsMaxNormal)
                    ? true
                    : false
        }
    ];

    const predictions: Item[] = [
        {
            name: t("light_lifetime_near_expiration"),
            color: theme.palette.prediction,
            icon: LightIcon,
            value: health.toolsLightsExpiredCount
        },
        {
            name: t("high_degradation_rate"),
            color: theme.palette.prediction,
            icon: DegradationIcon,
            value: health.highDegradationRateToolsCount
        }
    ];

    return { errors, predictions };
};

export default usePrepareHealthRows;
