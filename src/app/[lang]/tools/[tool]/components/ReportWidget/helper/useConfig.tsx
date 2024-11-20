import { pollingInterval } from "@/config";
import { RootState } from "@/redux";
import { useFetchToolDataQuery } from "@/redux/slices/apiSlice";
import { LccLightType } from "@/types/LccLightType";
import { todayEnd, weekEnd } from "@/utils/dateRanges";
import { useSelector } from "react-redux";

export const useConfig = (toolId: string) => {
    const { data: tool = {} } = useFetchToolDataQuery(toolId);
    const toolsReports = useSelector((state: RootState) => state.toolsReports);
    const toolState = toolsReports.find(tool => tool.id === toolId);

    const { AOI, TPT, LCC, timeFilter, visible, selectedGraphs } = toolState || {};

    const isAOIDate = AOI?.selectedDateRange.every(date => date);
    const isTPTDate = TPT?.selectedDateRange.every(date => date);

    const queryOptions = { pollingInterval, skip: !isAOIDate || !isTPTDate };
    const initDateRange: [string, string] = [weekEnd.toISOString(), todayEnd.toISOString()];

    const AOIConfig = {
        startDate: AOI?.selectedDateRange[0] || initDateRange[0],
        endDate: AOI?.selectedDateRange[1] || initDateRange[1],
        toolIds: [toolId] || []
    };

    const TPTConfig = {
        startDate: TPT?.selectedDateRange[0] || initDateRange[0],
        endDate: TPT?.selectedDateRange[1] || initDateRange[1],
        toolIds: [toolId] || []
    };

    const LCCConfig = {
        toolid: toolId || "",
        lightType: (LCC?.lightType as string) || (LccLightType.REF as string),
        startDate: LCC?.selectedDateRange[0] || "",
        endDate: LCC?.selectedDateRange[1] || ""
    };

    const graphDisplayed = {
        aoi: selectedGraphs?.some(graph => graph.value === "AOI Statistics"),
        tpt: selectedGraphs?.some(graph => graph.value === "Wafers per Hour"),
        lcc: selectedGraphs?.some(graph => graph.value === "LCC")
    };
    const numGraphDisplayed = Number(graphDisplayed.aoi) + Number(graphDisplayed.tpt) + Number(graphDisplayed.lcc);
    const isLccMax = LCC?.maximize;

    return {
        AOIConfig,
        TPTConfig,
        LCCConfig,
        queryOptions,
        tool,
        AOI,
        TPT,
        LCC,
        timeFilter,
        visible,
        selectedGraphs,
        graphDisplayed,
        numGraphDisplayed,
        isLccMax
    };
};

export default useConfig;
