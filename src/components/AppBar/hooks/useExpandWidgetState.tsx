import useToolId from "@/hooks/useToolId";
import { updateHealthVisibility } from "@/redux/slices/healthSlice";
import { updateReportVisibility } from "@/redux/slices/reportsSlice";
import { updateToolsReportsVisibility } from "@/redux/slices/toolsReportsSlice";
import { updateWarningMaximize, updateWarningVisibility } from "@/redux/slices/toolsWarningSlice";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { CombinedFormData } from "../AppBar.types";

/**
 * This hook provides handlers for managing the visibility of ExpandWidget items.
 * It interacts with the Redux store to update the visibility state of reports and health widgets.
 */

const getOverviewItems = (isToolPage?: boolean, reportsToolVisible?: boolean, reportsVisible?: boolean) => {
    if (isToolPage) {
        if (reportsToolVisible) {
            return "";
        } else {
            return "reports";
        }
    } else {
        if (reportsVisible) {
            return "";
        } else {
            return "reports";
        }
    }
};

const getToolItems = (isToolPage?: boolean, warningsToolVisible?: boolean, healthVisible?: boolean) => {
    if (isToolPage) {
        if (warningsToolVisible) {
            return "";
        } else {
            return "warnings";
        }
    } else {
        if (healthVisible) {
            return "";
        } else {
            return "health";
        }
    }
};

const useExpandWidgetState = (isToolPage?: boolean) => {
    const { toolId } = useToolId();

    const healthVisible = useSelector((state: RootState) => state.health).visible;
    const reportsVisible = useSelector((state: RootState) => state.reports).visible;
    const toolsReports = useSelector((state: RootState) => state.toolsReports);
    const toolsWarning = useSelector((state: RootState) => state.toolsWarning);
    const reportsToolVisible = toolsReports.find(tool => tool.id === toolId)?.visible;
    const warningsToolVisible = toolsWarning.find(tool => tool.id === toolId)?.visible;

    const dispatch = useAppDispatch();

    const expandItems_1 = getOverviewItems(isToolPage, reportsToolVisible, reportsVisible);
    const expandItems_2 = getToolItems(isToolPage, warningsToolVisible, healthVisible);

    const items: string[] = [expandItems_1, expandItems_2].filter(item => !!item);

    const defaultWidgetsVisibility = isToolPage
        ? { reports: reportsToolVisible, warnings: warningsToolVisible }
        : { reports: reportsVisible, health: healthVisible };

    const onSubmitWidgetsVisibility = (data: CombinedFormData) => {
        if ("warnings" in data) {
            dispatch(updateToolsReportsVisibility({ id: toolId, visible: data.reports }));
            dispatch(updateWarningVisibility({ id: toolId, visible: data.warnings }));
            dispatch(updateWarningMaximize({ id: toolId, maximize: data.warningsMax }));
        } else {
            dispatch(updateReportVisibility(data.reports));
            dispatch(updateHealthVisibility(data.health));
        }
    };

    return { items, defaultWidgetsVisibility, onSubmitWidgetsVisibility };
};

export default useExpandWidgetState;
