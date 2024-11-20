import { IconButton } from "@/components";
import { ArrowRightIcon } from "@/icons";
import { Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

interface TimeSelectGroupProps {
    handleTimeView: () => void;
}

const TimeSelectGroup = ({ handleTimeView }: TimeSelectGroupProps) => {
    const t = useTranslations();
    return (
        <Stack gap={3} flexDirection="row" alignItems="center">
            <Typography variant="body1">{t("update_date_time")}</Typography>
            <IconButton onClick={handleTimeView}>
                <ArrowRightIcon />
            </IconButton>
        </Stack>
    );
};

export default TimeSelectGroup;
