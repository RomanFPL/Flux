import { Stack, Typography } from "@mui/material";
import React from "react";
import IconButton from "../../../../../IconButton/IconButton";
import { ArrowRightIcon } from "@/icons";
import { ActivityHeaderProps } from "./ActivityHeader.types";

const ActivityHeader = ({ handleDefaultView, toolId, title }: ActivityHeaderProps) => {
    if (handleDefaultView)
        return (
            <Stack flexDirection="row" justifyContent="space-between" alignItems="center" padding={6} pb={2} pt={4}>
                <Stack gap={4} flexDirection="row" alignItems="center">
                    <IconButton onClick={handleDefaultView}>
                        <ArrowRightIcon
                            style={{
                                transform: "rotate(180deg)"
                            }}
                        />
                    </IconButton>
                    <Typography variant="h5" fontSize={16}>
                        {title}
                    </Typography>
                </Stack>
                <Typography variant="h5" fontSize={16}>
                    {toolId}
                </Typography>
            </Stack>
        );

    return (
        <Stack flexDirection="row" justifyContent="space-between" padding={6} pb={4}>
            <Typography variant="h5" fontSize={16}>
                {title}
            </Typography>
            <Typography variant="h5" fontSize={16}>
                {toolId}
            </Typography>
        </Stack>
    );
};

export default ActivityHeader;
