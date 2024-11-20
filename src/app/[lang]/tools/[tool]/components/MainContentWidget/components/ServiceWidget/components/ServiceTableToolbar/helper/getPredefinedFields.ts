import { MaintenanceTask } from "@/services/openApi/api";
import { IActivityFields } from "@/components/Dialog/components/AddActivityLog/AddActivityLog";

export const getPredefinedFields = (task: MaintenanceTask): IActivityFields => ({
    notificationReference: task.notificationReference || "",
    partReplaced: !!task.partsReplaced ? "YES" : "NO",
    workLogs:
        task.workLogs?.map(log => ({
            startDate: log.startDate || "",
            durationHours: log.durationHours || 0
        })) || [],
    type: task.serviceType || "Regular",
    severity: task.severity || "Normal",
    engineer: task.engineer || "",
    actionTaken: task.actionTaken || "T&M",
    description: task.description || ""
});
