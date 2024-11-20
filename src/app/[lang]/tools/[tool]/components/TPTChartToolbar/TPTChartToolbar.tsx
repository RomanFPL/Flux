import { CustomDateButton } from "@/components";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { TPTChartToolbarProps } from "./TPTChartToolbar.types";

const TPTChartToolbar = ({ reset, dateType }: TPTChartToolbarProps) => {
    const t = useTranslations();
    return (
        <Stack direction="row" gap={3}>
            <Typography variant="h4">{t("statistics_hour")}</Typography>
            <CustomDateButton.withController dateType={dateType} name="selectedTPTDate" />
            <Divider />
            <Button variant="text" onClick={reset}>
                {t("reset")}
            </Button>
        </Stack>
    );
};

export default TPTChartToolbar;
