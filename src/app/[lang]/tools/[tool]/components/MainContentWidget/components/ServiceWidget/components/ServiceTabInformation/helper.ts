import { ToolInfo } from "@/services/openApi/api";

export const prepareServiceInfo = (toolData: ToolInfo) => {
    const opticNames = toolData.cameras?.map(({ name }) => name).join("/");

    const serviceInfo = {
        backupSystemLocation: toolData?.toolStatus?.backupSystemLocation,
        chuckType: toolData?.chuckType,
        environment: toolData?.toolStatus?.environment,
        optics: opticNames
    };

    return serviceInfo;
};
