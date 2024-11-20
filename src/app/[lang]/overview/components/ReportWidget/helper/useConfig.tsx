import { pollingInterval } from "@/config";
import { RootState } from "@/redux";
import { useFetchToolsQuery } from "@/redux/slices/apiSlice";
import { ToolIdentity } from "@/services/openApi";
import { useSelector } from "react-redux";

const WORST_TOOLS_NUMBER = 3;
export const getToolsIds = (tools: ToolIdentity[]) => tools.map(({ toolId }) => String(toolId));

export const useConfig = () => {
    const { data: tools = [] } = useFetchToolsQuery();
    const { AOI, TPT } = useSelector((state: RootState) => state.reports);
    const { timeFilter, visible } = useSelector((state: RootState) => state.reports);
    const toolsIds = getToolsIds(tools);

    const selectedAOITools: string[] = AOI.selectedTools.map(({ value }) => value);
    const selectedTPTTools: string[] = TPT.selectedTools.map(({ value }) => value);

    const isAOIDate = AOI.selectedDateRange.every(date => date);
    const isTPTDate = TPT.selectedDateRange.every(date => date);

    const queryOptions = { pollingInterval, skip: !toolsIds || !isAOIDate || !isTPTDate };

    const AOIConfig = {
        startDate: AOI.selectedDateRange[0],
        endDate: AOI.selectedDateRange[1],
        toolIds: selectedAOITools
    };

    const TPTConfig = {
        startDate: TPT.selectedDateRange[0],
        endDate: TPT.selectedDateRange[1],
        toolIds: selectedTPTTools,
        worstToolsCount: WORST_TOOLS_NUMBER
    };

    return { AOIConfig, TPTConfig, queryOptions, tools, AOI, TPT, timeFilter, visible };
};

export default useConfig;
