"use client";

import { useTranslations } from "next-intl";
import { StyledDiv, StyledDivDivider, StyledTypography } from "./ToolFlags.styled";
import { ToolFlagsProps } from "./ToolFlags.types";

const ToolFlags = (props: ToolFlagsProps) => {
    const { isPeriodic, isMotion, isConstrains } = props;
    // TODO SHIR Also here this logic is not needed, do it mapping array
    const t = useTranslations();

    return (
        <StyledDiv>
            {isPeriodic && <StyledTypography>{t("PeriodicCalibFlag")}</StyledTypography>}
            {((isPeriodic && isMotion && isConstrains) || (isMotion && isPeriodic)) && (
                <StyledDivDivider></StyledDivDivider>
            )}
            {isMotion && <StyledTypography>{t("MotionFlag")}</StyledTypography>}
            {((isConstrains && (isMotion || isPeriodic)) || (isMotion && isConstrains)) && (
                <StyledDivDivider></StyledDivDivider>
            )}
            {isConstrains && <StyledTypography>{t("AxisConstrainsFlag")}</StyledTypography>}
        </StyledDiv>
    );
};

export default ToolFlags;
