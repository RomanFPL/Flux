"use client";

import { ToolTabs } from "@/types/ToolTabsType";
import LightSourcesWidget from "./components/LightSourcesWidget/LightSourcesWidget";
import MainContentToolbar from "../MainContentToolbar/MainContentToolbar";
import ServiceWidget from "./components/ServiceWidget/ServiceWidget";
import { StyledDivider, StyledStack } from "./MainContentWidget.styled";
import AccuracyWidget from "./components/AccuracyWidget/AccuracyWidget";
import HealthWidget from "./components/HealthWidget/HealthWidget";
import InfoWidget from "./components/InfoWidget/InfoWidget";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateToolsMetricsActiveTab } from "@/redux/slices/toolsMetricsSlice";
import { MainContentWidgetProps } from "./MainContentWidget.types";
import { getToolWidgetById } from "@/utils";

const MainContentWidget = ({ toolId }: MainContentWidgetProps) => {
    const dispatch = useDispatch();
    const toolsMetrics = useSelector((state: RootState) => state.toolsMetrics);
    const metric = getToolWidgetById(toolsMetrics, toolId);

    if (!metric) return null;

    const handleTabChange = (event: React.MouseEvent<HTMLElement>, newValue: ToolTabs | null) => {
        if (!!newValue) dispatch(updateToolsMetricsActiveTab({ id: toolId, activeTab: newValue }));
    };

    const tabComponents = {
        [ToolTabs.LIGHT_SOURCES]: LightSourcesWidget,
        [ToolTabs.SERVICE]: ServiceWidget,
        [ToolTabs.ACCURACY]: AccuracyWidget,
        [ToolTabs.HEALTH]: HealthWidget,
        [ToolTabs.INFO]: InfoWidget
    };

    const ActiveTabComponent = tabComponents[metric.activeTab];

    return (
        <StyledStack>
            <MainContentToolbar activeTab={metric.activeTab} handleTabChange={handleTabChange} />
            <StyledDivider />
            {ActiveTabComponent && <ActiveTabComponent />}
        </StyledStack>
    );
};

export default MainContentWidget;
