import { RootState } from "@/redux/store";
import { ToolLayouts } from "@/types/slices.types";
import { useSelector } from "react-redux";

const useToolGridPlate = (toolId: string): ToolLayouts => {
    const toolsWarning = useSelector((state: RootState) => state.toolsWarning);
    const toolsReports = useSelector((state: RootState) => state.toolsReports);
    const warningsMaximize = toolsWarning.find(tool => tool.id === toolId)?.maximize;
    const warningsVisible = toolsWarning.find(tool => tool.id === toolId)?.visible;
    const reportsVisible = toolsReports.find(tool => tool.id === toolId)?.visible;
    const lccMaximize = toolsReports.find(tool => tool.id === toolId)?.LCC.maximize;

    if (warningsMaximize && warningsVisible) {
        return ToolLayouts.warnings;
    }

    if (lccMaximize) {
        return ToolLayouts.lcc;
    }

    if (warningsVisible && reportsVisible) {
        return ToolLayouts.default;
    }

    if (warningsVisible && !reportsVisible) {
        return ToolLayouts.main_warnings;
    }

    if (!warningsVisible && reportsVisible) {
        return ToolLayouts.main_reports;
    }

    if (!warningsVisible && !reportsVisible) {
        return ToolLayouts.main;
    }

    return ToolLayouts.default;
};

export default useToolGridPlate;
