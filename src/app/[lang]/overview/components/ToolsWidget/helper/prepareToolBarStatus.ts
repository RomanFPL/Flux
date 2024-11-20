import { ActiveToolStatus, ToolInfoStatus } from "@/services/openApi/api";

export const isToolUp = (status?: ActiveToolStatus) => {
    return (
        ActiveToolStatus.Engineering === status ||
        ActiveToolStatus.Idle === status ||
        ActiveToolStatus.Production === status
    );
};

export const isToolDown = (status?: ActiveToolStatus) => {
    return ActiveToolStatus.Breakdown === status;
};

export const isToolMain = (status?: ActiveToolStatus) => {
    return ActiveToolStatus.Maitanance === status;
};

export const isToolUnknown = (status?: ActiveToolStatus) => {
    const knownStatuses: ActiveToolStatus[] = [
        ActiveToolStatus.Maitanance,
        ActiveToolStatus.Breakdown,
        ActiveToolStatus.Engineering,
        ActiveToolStatus.Idle,
        ActiveToolStatus.Production
    ];

    return !!status ? !knownStatuses.includes(status) : !status;
};

export const getToolStatusCount = (tools: ToolInfoStatus[], statusChecker: (status?: ActiveToolStatus) => boolean) => {
    return tools.reduce(
        (count, currentItems) => (statusChecker(currentItems?.toolStatus?.activeToolStatus) ? ++count : count),
        0
    );
};

const prepareToolBarStatus = (tools: ToolInfoStatus[], hiddenDownTools: number) => {
    return {
        toolCount: tools.length,
        toolsUp: getToolStatusCount(tools, isToolUp),
        toolsDown: getToolStatusCount(tools, isToolDown),
        toolsMain: getToolStatusCount(tools, isToolMain),
        unknownTools: getToolStatusCount(tools, isToolUnknown),
        hiddenDownTools
    };
};
export default prepareToolBarStatus;
