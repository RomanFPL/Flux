import { CustomDateButton, MultiselectButton } from "@/components";
import { RootState } from "@/redux";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { LineChartToolbarProps } from "./LineChartToolbar.types";

const LineChartToolbar = ({ toolsValues, reset, dateType }: LineChartToolbarProps) => {
    const t = useTranslations();
    const { getValues } = useFormContext();

    const maxTools = getValues("selectedTPTTools").length === toolsValues.length;
    const { TPT } = useSelector((state: RootState) => state.reports);
    const { worstTools } = TPT;
    const worstToolsId = worstTools?.map((tool: { value: any }) => {
        return tool.value;
    });

    return (
        <Stack direction="row" gap={3}>
            <Typography variant="h4">{t("statistics_hour")}</Typography>
            <CustomDateButton.withController dateType={dateType} name="selectedTPTDate" />
            <MultiselectButton.withController
                defaultName={t("tools")}
                width={"115px"}
                items={toolsValues}
                name="selectedTPTTools"
                type={["mark"]}
                budge={!maxTools}
                markedItems={worstToolsId}
            />
            <Divider />
            <Button variant="text" onClick={reset}>
                {t("reset")}
            </Button>
        </Stack>
    );
};

export default LineChartToolbar;
