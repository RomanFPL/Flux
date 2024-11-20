import React from "react";
import { StyledAccountWrapper } from "./AccountWrapper.styled";
import { AccountWrapperProps } from "./AccountWrapper.types";
import ToolFlags from "@/app/[lang]/tools/[tool]/components/ToolFlags/ToolFlags";
import { StyledDivider } from "../../AppBar.styled";
import { Stack, Typography } from "@mui/material";
import NextPmIcon from "../../../../icons/NextPmIcon";
import { formatDate } from "../../helper";
import { useTranslations } from "next-intl";
import theme from "@/styles/theme/theme";

const AccountWrapper = ({ tool }: AccountWrapperProps) => {
    const t = useTranslations();
    const isPeriodic = tool?.shortNotifications?.periodicCalibIsForcesSkipped;
    const isMotion = tool?.shortNotifications?.motionByPassOn;
    const isConstrains = tool?.shortNotifications?.axisConstrainsNotFound;

    return (
        <StyledAccountWrapper>
            {/* SHIR TODO a lot not used logic, please make it easer.  Here should be 1 var*/}
            {/* SHIR TODO and refactor logic*/}
            {(isPeriodic || isMotion || isConstrains) && (
                <>
                    <ToolFlags isPeriodic={isPeriodic} isMotion={isMotion} isConstrains={isConstrains} />
                    <StyledDivider />
                </>
            )}
            {/* SHIR TODO move it to styled*/}
            <Stack direction="row" gap={theme.spacing(1)} alignItems={"center"}>
                <NextPmIcon />
                <Stack>
                    <Typography variant="subtitle2">{t("nextPM")}</Typography>
                    <Typography variant="h4">{tool.nextPMDate ? formatDate(tool.nextPMDate) : ""}</Typography>
                </Stack>
            </Stack>
            <StyledDivider />
        </StyledAccountWrapper>
    );
};

export default AccountWrapper;
