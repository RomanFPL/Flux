import { CustomDateButton, MultiselectButton } from "@/components";
// import CustomDateButton from "@/components/CustomDateButton/CustomDateButton";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { AOIChartToolbarProps } from "./AOIChartToolbar.types";

const AOIChartToolbar = ({ errorValues = [], reset, dateType }: AOIChartToolbarProps) => {
    const t = useTranslations();
    const { getValues } = useFormContext();

    const maxErrors = getValues("selectedAOIErrors").length === errorValues.length;

    return (
        <Stack direction="row" gap={3}>
            <Typography variant="h4">{t("statistics")}</Typography>
            <CustomDateButton.withController dateType={dateType} name="selectedAOIDate" />
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

export default AOIChartToolbar;
