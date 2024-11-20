import { Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";

interface HeaderGroupProps {
    toolId: string;
    id: string;
}

const HeaderGroup = ({ toolId, id }: HeaderGroupProps) => {
    const t = useTranslations();
    return (
        <Stack flexDirection="row" justifyContent="space-between" padding={6} pb={4}>
            <Typography variant="h5" fontSize={16}>
                {t("log_id", { id })}
            </Typography>
            <Typography variant="h5" fontSize={16}>
                {toolId}
            </Typography>
        </Stack>
    );
};

export default HeaderGroup;
