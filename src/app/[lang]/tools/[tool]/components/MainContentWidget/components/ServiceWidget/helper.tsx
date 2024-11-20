import { formatShortTableDate } from "@/utils";
import { ServiceActions } from "./components/ServiceTableToolbar/ServiceTableToolbar.typed";
import { MaintenanceTask, ServiceType } from "@/services/openApi/api";
import { useTranslations } from "next-intl";

export const transformData = (data: MaintenanceTask[]): string[][] => {
    if (!data) return [];

    const sortedData = [...data].sort((a, b) => {
        const dateA = new Date(a?.workLogs?.[0].startDate || 0).getTime();
        const dateB = new Date(b?.workLogs?.[0].startDate || 0).getTime();
        return dateA - dateB;
    });

    return sortedData.map(item => [
        String(item.id),
        formatShortTableDate(item?.workLogs?.[0].startDate || ""),
        `${item.workLogs?.reduce((acc, log) => acc + (Number(log.durationHours) || 0), 0)}h`,
        String(item.notificationReference),
        item.partsReplaced ? "Yes" : "No",
        String(item.serviceType),
        String(item.severity),
        String(item.engineer) || "Engineer name"
    ]);
};

export const getAvailableActions = (selectedRows: string[]): Array<ServiceActions> => {
    if (selectedRows.length === 0) return ["add"];
    if (selectedRows.length === 1) return ["delete", "add", "edit", "open"];
    return ["add", "delete"];
};

export const getDateRangeFromData = (data: MaintenanceTask[]): [string, string] => {
    const allDates = data.flatMap(entry =>
        entry.workLogs?.map(log => log.startDate).filter(dateStr => dateStr !== undefined)
    );

    const dates = allDates
        .map(dateStr => (dateStr ? new Date(dateStr) : null))
        .filter(date => date !== null && !isNaN(date.getTime()));

    const startDate = new Date(Math.min(...dates.map(date => date!.getTime())));
    const endDate = new Date(Math.max(...dates.map(date => date!.getTime())));

    startDate.setDate(startDate.getDate());
    endDate.setDate(endDate.getDate());

    return [startDate.toISOString(), endDate.toISOString()];
};

export const getUniqueServiceTypes = (data: { serviceType?: ServiceType }[]): ServiceType[] => {
    return Array.from(
        new Set(data.map(entry => entry.serviceType).filter((type): type is ServiceType => type !== undefined))
    );
};

export const useTableHeadData = () => {
    const t = useTranslations();
    return [
        { name: t("number") },
        { name: t("start_date"), filterType: "date" },
        { name: t("duration") },
        { name: t("notification") },
        { name: t("parts_replaced") },
        { name: t("type"), filterType: "type" },
        { name: t("severity") },
        { name: t("engineer") }
    ];
};
