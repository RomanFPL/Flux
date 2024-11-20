import { useFetchToolsQuery } from "@/redux/slices/apiSlice";
import { ToolIdentity } from "@/services/openApi";
import { predefinedErrors } from "@/types/error.types";
import { predefinedGraphs } from "@/types/graph.types";
import { LccLightType } from "@/types/LccLightType";
import { predefinedSeverities } from "@/types/severity.types";
import { TimeToggleOptions } from "@/types/TimeToggleType";
import { ToolTabs } from "@/types/ToolTabsType";
import { todayEnd, weekStart } from "@/utils/predefinedDatesRange";

export const prepareToolsReportsDefault = (data: ToolIdentity[]) => {
    const initDateRange: [string, string] = [weekStart.toISOString(), todayEnd.toISOString()];
    const initLccDateRange: [string, string] = ["", ""];

    const allErrors = predefinedErrors.map(error => {
        return { value: String(error), text: String(error) };
    });

    const graphs = predefinedGraphs
        .filter(graph => graph !== "LCC")
        .map(graph => {
            return { value: String(graph), text: String(graph) };
        });

    return data.map(tool => ({
        id: String(tool.toolId),
        timeFilter: TimeToggleOptions.WEEK,
        visible: true,
        selectedGraphs: graphs,
        AOI: {
            selectedErrors: allErrors,
            selectedDateRange: initDateRange,
            selectedDateType: TimeToggleOptions.WEEK
        },
        TPT: {
            selectedDateRange: initDateRange,
            selectedDateType: TimeToggleOptions.WEEK
        },
        LCC: {
            lightType: LccLightType.REF,
            timeFilter: null,
            zoom: 1,
            maximize: false,
            selectedDateRange: initLccDateRange
        }
    }));
};

export const prepareToolsWarningsDefault = (data: ToolIdentity[]) => {
    const allSeverities = predefinedSeverities.map(severity => {
        return { value: String(severity), text: String(severity) };
    });
    const initDateRange: [string, string] = [weekStart.toISOString(), todayEnd.toISOString()];

    return data.map(tool => ({
        id: String(tool.toolId),
        visible: true,
        maximize: false,
        selectedSeverities: allSeverities,
        selectedDateRange: initDateRange,
        selectedDateType: TimeToggleOptions.WEEK
    }));
};

export const prepareToolsMetricsDefault = (data: ToolIdentity[]) =>
    data.map(tool => ({
        id: String(tool.toolId),
        visible: true,
        activeTab: ToolTabs.LIGHT_SOURCES
    }));

export const prepareToolDefault = (toolsIdentity: ToolIdentity[]) => {
    return {
        name: "default",
        metrics: prepareToolsMetricsDefault(toolsIdentity),
        warnings: prepareToolsWarningsDefault(toolsIdentity),
        reports: prepareToolsReportsDefault(toolsIdentity)
    };
};

const useToolWidgetDefault = () => {
    const { data: toolData = [], isSuccess: isReady } = useFetchToolsQuery();

    const defaultWidget = prepareToolDefault(toolData);

    if (!isReady) return { defaultWidget: null, isReady: false };

    return { defaultWidget, isReady };
};

export default useToolWidgetDefault;
