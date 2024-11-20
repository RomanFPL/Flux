import { LightLifeTimeUnits } from "@/services/openApi";
import { Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import LightChart from "./LightChart";
import {
    CHART_WIDTH,
    LightSourcesContainer,
    PredictionText,
    StyledBox,
    StyledPrediction,
    StyledValue
} from "./LightSource.styled";
import { LightSourceProps } from "./LightSource.types";
import { useMemo } from "react";
import { normalizeValue } from "@/utils";

const LightSource = ({
    name,
    currentLifeTime,
    maxLifeTime,
    lightLifeTimeUnits,
    recommendedReplacement,
    necessaryReplacement,
    lightCategoryType,
    cameraName,
    daysToReplacement
}: LightSourceProps) => {
    const t = useTranslations();

    const getFormattedUsage = (currValue: number, maxValue: number, units: string) => {
        return `${currValue.toFixed(0)}${units} ${t("used")} / ${maxValue.toFixed(0)}${units}`;
    };

    const customToFixed = (value: number) => {
        return value % 1 > 0 ? value.toFixed(1) : value.toFixed(0);
    };
    const getReplacement = () => {
        if (daysToReplacement) {
            if (daysToReplacement > 365) {
                return `${customToFixed(daysToReplacement / 365)} ${t("years")}`;
            } else if (daysToReplacement > 30) {
                return `${customToFixed(daysToReplacement / 30)} ${t("months")}`;
            } else if (daysToReplacement > 7) {
                return `${customToFixed(daysToReplacement / 7)} ${t("weeks")}`;
            } else {
                return `${daysToReplacement} ${t("days")}`;
            }
        }
        return "";
    };

    const units = LightLifeTimeUnits.Hours === lightLifeTimeUnits ? t("h_unit") : t("m_unit");
    const maxValue = normalizeValue(maxLifeTime).unitNormalize(lightLifeTimeUnits).notLessThan(0).getValue();
    const currValue = normalizeValue(currentLifeTime)
        .unitNormalize(lightLifeTimeUnits)
        .notMoreThan(maxValue)
        .replaceNegativeValue(maxValue)
        .getValue();

    const capacityLeft = maxValue > 0 && maxValue > currValue ? Math.floor((1 - currValue / maxValue) * 100) : 0;

    const getLightName = useMemo(() => {
        const shortCameraName = cameraName ? cameraName.replace(/camera/gi, "").trim() : "";
        const shortLightName = "Reflective" === name ? "Ref" : "Diffusive" === name ? "Diff" : "";
        return `${shortCameraName}, ${lightCategoryType}, ${shortLightName}`;
    }, [cameraName, lightCategoryType, name]);

    const usage = getFormattedUsage(currValue, maxValue, units);

    return (
        <LightSourcesContainer>
            <LightChart
                currentLifeTime={currValue}
                maxLifeTime={maxValue}
                capacityLeft={capacityLeft}
                recommendedReplacement={recommendedReplacement}
                necessaryReplacement={necessaryReplacement}
                chartWidth={CHART_WIDTH}
            />
            <Stack direction="column">
                <PredictionText noWrap variant="h4">
                    {getLightName}
                </PredictionText>
                <StyledValue>{usage}</StyledValue>
                <StyledBox>
                    <StyledPrediction noWrap>
                        {getReplacement()} {t("to_replace")}
                    </StyledPrediction>
                </StyledBox>
                <Stack direction="row" alignItems={"center"}>
                    <Typography variant="h5">{capacityLeft}%</Typography>
                    &nbsp;
                    <Typography>{t("lifetime_left")}</Typography>
                </Stack>
            </Stack>
        </LightSourcesContainer>
    );
};

export default LightSource;
