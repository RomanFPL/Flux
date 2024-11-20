import { ToolInfoStatus } from "@/services/openApi/api";

const getSortedTools = (tools: ToolInfoStatus[], orderedIds: (string | null | undefined)[]) => {
    const idMap = new Map(orderedIds.map((id, index) => [id, index]));
    return tools.sort((a, b) => {
        const indexA = idMap.get(a.identity?.toolId ?? "") ?? -1;
        const indexB = idMap.get(b.identity?.toolId ?? "") ?? -1;
        return indexA - indexB;
    });
};

export default getSortedTools;
