import { ToolInfoStatus } from "@/services/openApi/api";
import { getSecGem, getStatus } from "@/utils/toolStatusUtils";

const transformData = (data: ToolInfoStatus[], t: (key: string) => string): string[][] => {
    if (!data) return [];
    return data.map(item => [
        getStatus(item.toolStatus?.activeToolStatus).color,
        String(item.identity?.machineName),
        getStatus(item.toolStatus?.activeToolStatus, t).name,
        getSecGem(item.toolStatus?.activeSecsGemStatus, t).name +
            "," +
            getSecGem(item.toolStatus?.activeSecsGemStatus, t).color,
        String(item.toolStatus?.lastLogMessage?.longMessage),
        String(item.identity?.toolId)
    ]);
};

export default transformData;
