import { pollingInterval } from "@/config";
import { useFetchToolsQuery, useFetchToolsStatusesQuery } from "@/redux/slices/apiSlice";
import { ToolsState } from "@/redux/slices/toolsSlice";
import { ToolIdentity, ToolInfoStatus } from "@/services/openApi/api";
import { predefinedErrors } from "@/types/error.types";
import { TimeToggleOptions } from "@/types/TimeToggleType";
import { IUserView } from "@/types/userInterface";
import { quarterEnd, todayEnd, weekStart } from "@/utils/dateRanges";
import { getToolsFilterInit } from "@/utils/getWidgetInitState";
import updateSortedTools from "@/utils/updateSortedTools";

const prepareToolsDefault = (tools: ToolInfoStatus[]): ToolsState => {
    const newSortedTools = updateSortedTools(tools, []);
    const defaultFilter = getToolsFilterInit();

    return {
        visible: true,
        toolsFilters: defaultFilter,
        sortedTools: newSortedTools
    };
};

const prepareReportsDefault = (tools: ToolIdentity[]) => {
    const allTools = tools.map(({ machineName, toolId }) => {
        return { value: String(toolId), text: String(machineName) };
    });

    const allErrors = predefinedErrors.map(error => {
        return { value: String(error), text: String(error) };
    });

    const initDateRange: [string, string] = [weekStart.toISOString(), todayEnd.toISOString()];

    return {
        visible: true,
        timeFilter: TimeToggleOptions.WEEK,
        AOI: {
            selectedTools: allTools,
            selectedErrors: allErrors,
            selectedDateRange: initDateRange,
            selectedDateType: TimeToggleOptions.WEEK
        },
        TPT: {
            selectedTools: allTools,
            selectedDateRange: initDateRange,
            worstTools: [],
            selectedDateType: TimeToggleOptions.WEEK
        }
    };
};

const prepareHealthDefault = () => {
    const initDateRange: [string, string] = [quarterEnd.toISOString(), todayEnd.toISOString()];
    return { visible: true, dateFilter: TimeToggleOptions.QUARTER, dateRange: initDateRange };
};

export const prepareDefault = (toolsInfo: ToolInfoStatus[], toolsIdentity: ToolIdentity[]): IUserView => ({
    name: "default",
    health: prepareHealthDefault(),
    tools: prepareToolsDefault(toolsInfo),
    reports: prepareReportsDefault(toolsIdentity)
});

/**
 * This hook is used to prepare the default state for the View Dashboard.
 * Based on the fetched data for tools and reports, it generates a default widget structure
 * containing the layout and visibility of Health, Tools, and Reports.
 *
 * The hook fetches tool statuses and report data, processes them, and returns a default widget state.
 * It also provides an indicator (`isReady`) to show whether the required data has been successfully fetched.
 *
 * @returns {{
 *   defaultWidget: IUserView; // The generated default widget state for the dashboard.
 *   isReady: boolean;            // Indicates whether both tools and reports data are successfully fetched.
 * }}
 */
const useWidgetDefault = () => {
    const { data: toolTools = [], isSuccess: isTools } = useFetchToolsStatusesQuery(void 0, {
        pollingInterval
    });
    const { data: toolReports = [], isSuccess: isReport } = useFetchToolsQuery();

    const isReady = isTools && isReport;

    const defaultWidget = prepareDefault(toolTools, toolReports);

    if (!isReady) return { defaultWidget: null, isReady: false };

    return { defaultWidget, isReady };
};

export default useWidgetDefault;
