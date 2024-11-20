"use client";

import { IconButton, Toggle } from "@/components";
import { ToggleProps } from "@/components/Toggle/Toggle.types";
import useToolId from "@/hooks/useToolId";
import { DvrIcon, JobIcon, MachineCalibIcon, ScanResultIcon, SecgemIcon, SettingsIcon, ToolStatusIcon } from "@/icons";
import { useFetchToolDataQuery } from "@/redux/slices/apiSlice";
import { ToolTabs } from "@/types/ToolTabsType";
import { getSecGem, getStatus } from "@/utils";
import { Box, Divider, Stack, Tooltip } from "@mui/material";
import { useTranslations } from "next-intl";
import { StyledGraphTypography, StyledStack } from "./MainContentToolbar.styled";
import { MainContentToolbarProps } from "./MainContentToolbar.types";

const MainContentToolbar = (props: MainContentToolbarProps) => {
    const { activeTab, handleTabChange } = props;
    const { toolId } = useToolId();
    const t = useTranslations();

    const { data: tool = {} } = useFetchToolDataQuery(toolId);

    const tabToggleProps: ToggleProps<ToolTabs> = {
        items: Object.values(ToolTabs),
        value: activeTab,
        handleChange: handleTabChange
    };

    return (
        <Stack direction="row" justifyContent="space-between" gap={3}>
            <StyledStack direction="row">
                {/* TABS */}
                <Toggle {...tabToggleProps} />
                {/* secGem and status indications */}
                <Stack justifyContent="space-between" height={"100%"}>
                    <Tooltip placement="right" title={getSecGem(tool.toolStatus?.activeSecsGemStatus, t).name}>
                        <Box>
                            <SecgemIcon color={getSecGem(tool.toolStatus?.activeSecsGemStatus, t).color} />
                        </Box>
                    </Tooltip>
                    <Tooltip placement="right" title={getStatus(tool.toolStatus?.activeToolStatus, t).name}>
                        <Box>
                            <ToolStatusIcon
                                color={getStatus(tool.toolStatus?.activeToolStatus, t).color}
                            ></ToolStatusIcon>
                        </Box>
                    </Tooltip>
                </Stack>
            </StyledStack>
            {/* Shortcut buttons */}
            <Stack direction="row" gap={3}>
                <StyledGraphTypography variant="body2" alignSelf={"end"}>
                    {t("shortcut")}
                </StyledGraphTypography>
                <IconButton tooltipText={t("machine_calibration")}>
                    <MachineCalibIcon />
                </IconButton>
                <IconButton tooltipText={t("scan_results")}>
                    <ScanResultIcon />
                </IconButton>
                <IconButton tooltipText={t("jobs")}>
                    <JobIcon />
                </IconButton>
                <Divider orientation="vertical" flexItem />
                <IconButton tooltipText={t("shortcuts_settings")}>
                    <SettingsIcon />
                </IconButton>
                <Divider orientation="vertical" flexItem />
                <IconButton tooltipText={t("dvr_cameras")}>
                    <DvrIcon />
                </IconButton>
            </Stack>
        </Stack>
    );
};

export default MainContentToolbar;
