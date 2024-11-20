import { ActiveSecsGemStatus, ActiveToolStatus } from "@/services/openApi";
import theme from "@/styles/theme/theme";
import { predefinedStatusGroups } from "@/types/statusGroup.types";

export const getSecGem = (value: ActiveSecsGemStatus | undefined, t: (key: string) => string) => {
    let name = t ? t("unknown") : "";
    let color = theme.palette.status.unknown;
    switch (value) {
        case ActiveSecsGemStatus.OnlineLocal:
            name = t("online_local");
            color = theme.palette.secgem.onlineLocal;
            break;
        case ActiveSecsGemStatus.OnlineRemote:
            name = t("online_remote");
            color = theme.palette.secgem.onlineRemote;
            break;
        case ActiveSecsGemStatus.Offline:
            name = t("offline");
            color = theme.palette.secgem.offline;
            break;
        case ActiveSecsGemStatus.NotExists:
            break;
        default:
            break;
    }
    return { name, color };
};

export const getStatus = (status: ActiveToolStatus | undefined, t?: (key: string) => string) => {
    let name = t ? t("unknown") : "";
    let color = theme.palette.status.unknown;
    switch (status) {
        case ActiveToolStatus.Breakdown:
            name = t ? t("breakdown") : "";
            color = theme.palette.status.toolDown;
            break;
        case ActiveToolStatus.Engineering:
            name = t ? t("engineering") : "";
            color = theme.palette.status.toolUp;
            break;
        case ActiveToolStatus.Idle:
            name = t ? t("idle") : "";
            color = theme.palette.status.toolUp;
            break;
        case ActiveToolStatus.Maitanance:
            name = t ? t("maintenance") : "";
            color = theme.palette.status.maintenance;
            break;
        case ActiveToolStatus.Offline:
            name = t ? t("offline") : "";
            color = theme.palette.status.unknown;
            break;
        case ActiveToolStatus.Production:
            name = t ? t("production") : "";
            color = theme.palette.status.toolUp;
            break;
        default:
            break;
    }
    return { name, color };
};

export const getStatusFromGroup = (status: ActiveToolStatus | undefined): (typeof predefinedStatusGroups)[number] => {
    let name = "Unavailable";
    switch (status) {
        case ActiveToolStatus.Breakdown:
            name = "Tool Down";
            break;
        case ActiveToolStatus.Engineering:
            name = "Tool Up";
            break;
        case ActiveToolStatus.Idle:
            name = "Tool Up";
            break;
        case ActiveToolStatus.Maitanance:
            name = "Maintenance";
            break;
        case ActiveToolStatus.Offline:
            name = "Unavailable";
            break;
        case ActiveToolStatus.Production:
            name = "Tool Up";
        default:
            break;
    }
    return name;
};
