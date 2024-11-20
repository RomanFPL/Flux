import { Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

interface DurationInfoProps {
    hours: number;
}

const DurationInfo = ({ hours }: DurationInfoProps) => {
    const t = useTranslations();
    return (
        <Stack gap={1}>
            <Typography variant="body2">{t("total_duration")}</Typography>
            <Typography variant="body1">{t("hours", { hours })}</Typography>
        </Stack>
    );
};

export default DurationInfo;
