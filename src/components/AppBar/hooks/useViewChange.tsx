import { HealthState } from "@/redux/slices/healthSlice";
import { ReportState } from "@/redux/slices/reportsSlice";
import { ToolsState } from "@/redux/slices/toolsSlice";
import { RootState } from "@/redux/store";
import { IUserView } from "@/types/userInterface";
import { useSelector } from "react-redux";

const isHealthUnchanged = (health: HealthState, uiState?: IUserView | null) => {
    if (!uiState) return false;
    const { health: healthUI } = uiState;
    return health.dateFilter === healthUI.dateFilter && health.visible === healthUI.visible;
};

const isToolsUnchanged = (tools: ToolsState, uiState?: IUserView | null) => {
    if (!uiState) return false;
    const { tools: toolsUI } = uiState;

    const isSameStatusGroup = toolsUI.toolsFilters.selectedStatusGroup.every(item =>
        tools.toolsFilters.selectedStatusGroup.find(tool => tool.value === item.value)
    );

    return (
        tools.visible === toolsUI.visible &&
        JSON.stringify(tools.sortedTools) === JSON.stringify(toolsUI.sortedTools) &&
        tools.toolsFilters.changeExpandFlag === toolsUI.toolsFilters.changeExpandFlag &&
        tools.toolsFilters.isExpandView === toolsUI.toolsFilters.isExpandView &&
        tools.toolsFilters.isGridView === toolsUI.toolsFilters.isGridView &&
        tools.toolsFilters.searchValue === toolsUI.toolsFilters.searchValue &&
        isSameStatusGroup
    );
};

const isReportUnchanged = (reports: ReportState, uiState?: IUserView | null) => {
    if (!uiState) return false;
    const { reports: reportsUI } = uiState;

    const isSameAOISelectedTools = reportsUI.AOI.selectedTools.every(item =>
        reports.AOI.selectedTools.find(tool => tool.value === item.value)
    );

    const isSameAOISelectedErrors = reportsUI.AOI.selectedErrors.every(item =>
        reports.AOI.selectedErrors.find(tool => tool.value === item.value)
    );

    const isSameAOIDate = reportsUI.AOI.selectedDateRange.every(
        (item, index) => reports.AOI.selectedDateRange[index] === item
    );

    const isSameTPTSelectedTools = reportsUI.TPT.selectedTools.every(item =>
        reports.TPT.selectedTools.find(tool => tool.value === item.value)
    );

    const isSameTPTDate = reportsUI.TPT.selectedDateRange.every(
        (item, index) => reports.TPT.selectedDateRange[index] === item
    );

    // When timeFilter is dynamic, changes to AOI and TPT date ranges do not trigger a view change
    return (
        reports.visible === reportsUI.visible &&
        reports.timeFilter === reportsUI.timeFilter &&
        isSameAOISelectedTools &&
        isSameAOISelectedErrors &&
        (reports.timeFilter === null ? isSameAOIDate : true) &&
        isSameTPTSelectedTools &&
        (reports.timeFilter === null ? isSameTPTDate : true)
    );
};

/**
 * `useViewChange` checks if the current state of widgets (Health, Tools, Reports) matches
 * the saved state in Redux (user's UI preferences).
 *
 * It compares the current widget states with the saved `currentUserInterface`. If any changes are detected,
 * it returns `isMutated: true`, meaning the user has modified the settings.
 *
 */
const useViewChange = () => {
    const health = useSelector((state: RootState) => state.health);
    const tools = useSelector((state: RootState) => state.tools);
    const reports = useSelector((state: RootState) => state.reports);
    const { currentUserInterface } = useSelector((state: RootState) => state.user);

    const isHealthValid = isHealthUnchanged(health, currentUserInterface);
    const isToolsValid = isToolsUnchanged(tools, currentUserInterface);
    const isReportsValid = isReportUnchanged(reports, currentUserInterface);

    const isUIUnchanged = isHealthValid && isToolsValid && isReportsValid;

    return { isMutated: !isUIUnchanged };
};

export default useViewChange;
