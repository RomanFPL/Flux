import { pollingInterval } from "@/config";
import useToolWidgetDefault from "@/hooks/useToolWidgetDefault";
import { RootState } from "@/redux";
import { todayEnd, weekStart } from "@/utils/predefinedDatesRange";
import { useSelector } from "react-redux";
import { prepareSeverity } from "./helper";

export const useConfig = (toolId: string) => {
    const toolsWarning = useSelector((state: RootState) => state.toolsWarning);
    const toolState = toolsWarning.find(tool => tool.id === toolId);

    const { maximize, visible, selectedSeverities, selectedDateRange, selectedDateType } = toolState || {};

    const isDate = selectedDateRange?.every(date => date);

    const queryOptions = { pollingInterval, skip: !isDate };
    const initDateRange: [string, string] = [weekStart.toISOString(), todayEnd.toISOString()];

    const config = {
        startDate: selectedDateRange && selectedDateRange[0] ? selectedDateRange[0] : initDateRange[0],
        endDate: selectedDateRange && selectedDateRange[1] ? selectedDateRange[1] : initDateRange[1],
        toolId: toolId,
        severity: prepareSeverity(selectedSeverities)
    };

    const { defaultWidget } = useToolWidgetDefault();
    const defaultWidgetTool = defaultWidget?.warnings?.find(tool => tool.id === toolId);

    const defaultValues = {
        maximize,
        visible,
        selectedSeverities,
        selectedDateRange,
        selectedDateType
    };

    return {
        maximize,
        visible,
        selectedDateType,
        selectedDateRange,
        config,
        queryOptions,
        defaultValues,
        defaultWidgetTool
    };
};

export default useConfig;
