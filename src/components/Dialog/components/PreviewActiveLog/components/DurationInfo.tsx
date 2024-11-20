import { Stack } from "@mui/material";
import React from "react";
import InfoItem from "./InfoItem";

interface DurationInfoProps {
    startDate?: string;
    startTime?: string;
    duration?: string;
}

const DurationInfo = ({ startDate, startTime, duration }: DurationInfoProps) => {
    return (
        <Stack flexDirection="row" gap={6}>
            <InfoItem content={startDate} label="Start Date" />
            <InfoItem content={startTime} label="Start Time" />
            <InfoItem content={duration} label="Duration" />
        </Stack>
    );
};

export default DurationInfo;
