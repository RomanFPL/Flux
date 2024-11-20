import { MaintenanceTask } from "@/services/openApi/api";

export const getMaintenanceById = (selectedRows: string[], maintenanceData: MaintenanceTask[]) => {
    const [currentId] = selectedRows;
    const maintenanceInfo: MaintenanceTask = maintenanceData.find(({ id }) => currentId === String(id)) || {};
    return maintenanceInfo;
};
