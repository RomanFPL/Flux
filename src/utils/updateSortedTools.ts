import { ToolInfoStatus } from "../services/openApi/api";

const getToolsIds = (tools: ToolInfoStatus[]) => {
    return tools.map(tool => {
        return tool.identity?.toolId;
    });
};

const updateSortedTools = (tools: ToolInfoStatus[], sortedTools: (string | null | undefined)[]) => {
    const toolsIds = tools.map(tool => {
        return tool.identity?.toolId;
    });

    if (!sortedTools) {
        sortedTools = getToolsIds(tools);
    }

    const orderedToolsRemove = sortedTools.filter(item => toolsIds.includes(item));

    const newToolsIds = toolsIds.filter(item => !orderedToolsRemove.includes(item));
    return [...orderedToolsRemove, ...newToolsIds];
};

export default updateSortedTools;
