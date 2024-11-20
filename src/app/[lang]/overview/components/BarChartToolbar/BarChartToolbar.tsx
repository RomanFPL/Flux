import { CustomDateButton, MultiselectButton } from "@/components";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { BarChartToolbarProps } from "./BarChartToolbar.types";

const BarChartToolbar = ({ errorValues = [], toolsValues = [], reset, dateType }: BarChartToolbarProps) => {
    const t = useTranslations();
    const { getValues } = useFormContext();

    const maxTools = getValues("selectedAOITools").length === toolsValues.length;
    const maxErrors = getValues("selectedAOIErrors").length === errorValues.length;

    return (
        <Stack direction="row" gap={3}>
            <Typography variant="h4">{t("statistics")}</Typography>
            <CustomDateButton.withController dateType={dateType} name="selectedAOIDate" />
            <MultiselectButton.withController
                defaultName={t("tools")}
                width={"115px"}
                items={toolsValues}
                name="selectedAOITools"
                type={["search"]}
                budge={!maxTools}
            />
            <MultiselectButton.withController
                defaultName={t("errors")}
                width={"115px"}
                items={errorValues}
                name="selectedAOIErrors"
                budge={!maxErrors}
            />
            <Divider />
            <Button variant="text" onClick={reset}>
                {t("clear")}
            </Button>
        </Stack>
    );
};

export default BarChartToolbar;
