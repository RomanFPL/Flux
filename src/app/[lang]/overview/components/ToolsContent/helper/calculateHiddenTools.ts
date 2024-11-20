import { ToolInfoStatus } from "@/services/openApi/api";
import { getToolStatusCount, isToolDown } from "../../ToolsWidget/helper/prepareToolBarStatus";

const calculateHiddenTools = (tools: ToolInfoStatus[], topComponentAmount: number, componentAmount: number): number => {
    if (!topComponentAmount && !componentAmount) return 0;
    const previousTools = tools.slice(0, topComponentAmount);
    const latestTools = tools.slice(componentAmount, tools.length);

    const rawTools = [...previousTools, ...latestTools];

    const hiddenTools = getToolStatusCount(rawTools, isToolDown);

    return hiddenTools;
};

export default calculateHiddenTools;
