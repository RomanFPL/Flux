import { Stack, Typography } from "@mui/material";
import React from "react";

interface InfoItemProps {
    content?: string;
    label: string;
}

const InfoItem = ({ content, label }: InfoItemProps) => {
    return (
        <Stack gap={1}>
            <Typography variant="subtitle2" fontSize={12}>
                {label}
            </Typography>
            <Typography>{content}</Typography>
        </Stack>
    );
};

export default InfoItem;
