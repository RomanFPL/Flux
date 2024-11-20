import { useTranslations as baseUseTranslations } from "next-intl";
type UseTranslationsType = ReturnType<typeof baseUseTranslations>;
import { MaintenanceTask } from "@/services/openApi/api";
import format from "date-fns/format";

export const getActiveLogPreviewData = (maintenanceInfo: MaintenanceTask, t: UseTranslationsType) => {
    return {
        id: String(maintenanceInfo.id),
        dateTime: maintenanceInfo?.workLogs?.map(log => ({
            startDate: log?.startDate ? format(new Date(log.startDate), "dd MMMM yyyy") : "",
            startTime: log?.startDate ? format(new Date(log.startDate), "hh:mm a") : "",
            duration: log.durationHours ? t("hours" as never, { hours: log.durationHours }) : ""
        })),
        general: [
            { label: "Service Notification", content: String(maintenanceInfo.notificationReference) },
            {
                label: "Part Replaced",
                content: t("booleanResult" as never, {
                    value: maintenanceInfo.partsReplaced === null ? "No" : maintenanceInfo.partsReplaced
                })
            },
            { label: "Type", content: String(maintenanceInfo.serviceType) },
            { label: "Severity", content: String(maintenanceInfo.severity) },
            { label: "Engineer", content: String(maintenanceInfo.engineer) },
            { label: "Activity Type", content: String(maintenanceInfo.actionTaken) },
            { label: "Description", content: String(maintenanceInfo.description) }
        ]
    };
};
