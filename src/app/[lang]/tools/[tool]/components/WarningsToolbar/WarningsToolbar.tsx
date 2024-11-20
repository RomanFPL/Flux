import { CustomDateButton, IconButton, MultiselectButton } from "@/components";
import { MaximizeIcon, RestoreIcon } from "@/icons";
import MinimizeIcon from "@/icons/MinimizeIcon";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { WarningsBarProps } from "./WarningsBar.types";
import { StyledDivider } from "./WarningsToolbar.styled";

const WarningsBar = ({ warningNumber = 0, severityValue = [], reset, dateType }: WarningsBarProps) => {
    const t = useTranslations();
    const { watch, getValues } = useFormContext();
    const isMaximized = watch("maximize");

    const maxSeverity = getValues("selectedSeverities").length === severityValue.length;

    return (
        <Stack direction="row" spacing={2} justifyContent="space-between">
            <Stack direction="column" spacing={1} justifyContent="space-between">
                <Typography variant="h3">{t("title", { warnings: warningNumber })}</Typography>
                <Stack direction="row" spacing={2} alignItems={"center"} justifyContent={"flex-start"}>
                    <Typography variant="body1" lineHeight={1.3}>
                        {isMaximized ? t("all_warnings") : t("latest_warning")}
                    </Typography>
                    {!isMaximized && <StyledDivider />}
                    {!isMaximized && (
                        <Typography variant="subtitle1" lineHeight={1.3}>
                            {t("expand")}
                        </Typography>
                    )}
                </Stack>
            </Stack>
            <Stack spacing={3} direction="row">
                {isMaximized && (
                    <>
                        <Button variant="text" onClick={reset}>
                            {t("clear_filters")}
                        </Button>
                        <Divider />
                        <CustomDateButton.withController
                            dateType={dateType}
                            isTimeDisplay={false}
                            name="selectedDateRange"
                        />
                        <MultiselectButton.withController
                            defaultName={t("severity")}
                            width={"125px"}
                            items={severityValue}
                            name="selectedSeverities"
                            budge={!maxSeverity}
                        />
                    </>
                )}
                <IconButton.withController name="maximize" tooltipText={isMaximized ? t("restore") : t("maximize")}>
                    {isMaximized ? <RestoreIcon /> : <MaximizeIcon />}
                </IconButton.withController>
                <IconButton.withController name="visible" actionType="false" tooltipText={t("minimize")}>
                    <MinimizeIcon />
                </IconButton.withController>
            </Stack>
        </Stack>
    );
};

export default WarningsBar;
