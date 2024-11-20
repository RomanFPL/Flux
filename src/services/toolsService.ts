import apiClient from "./apiClient";
import {
    LightReplacementPrediction,
    MaintenanceTask,
    MaintenanceTaskAddOrUpdateRes,
    ToolIdentity,
    ToolInfo,
    ToolInfoStatus
} from "./openApi";

export const fetchToolsData = async (): Promise<ToolIdentity[]> => {
    const url = "/tools";
    try {
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch tools data:", error);
        throw error;
    }
};

export const fetchToolsInfoStatusesData = async (): Promise<ToolInfoStatus[]> => {
    const url = "/tools/infostatuses";
    try {
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch tools data:", error);
        throw error;
    }
};

export const fetchToolData = async (toolId: string): Promise<ToolInfo> => {
    const url = `/tools/${toolId}`;
    try {
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch tool data:", error);
        throw error;
    }
};

export const fetchPredictToolData = async (toolId: string): Promise<LightReplacementPrediction[]> => {
    const url = `/predict/lights-replace/${toolId}`;
    try {
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch predict tool data:", error);
        throw error;
    }
};

export const fetchToolMaintenanceData = async (toolId: string): Promise<MaintenanceTask[]> => {
    const url = `/mptasks/${toolId}`;
    try {
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch predict tool data:", error);
        throw error;
    }
};

export const addToolMaintenanceData = async (
    maintenanceData: MaintenanceTask
): Promise<MaintenanceTaskAddOrUpdateRes> => {
    const url = "/mptasks";
    try {
        const response = await apiClient.post(url, maintenanceData);
        return response.data;
    } catch (error) {
        console.error("Failed to add maintenance task:", error);
        throw error;
    }
};

export const deleteToolMaintenanceData = async (taskId: number): Promise<any> => {
    const url = `/mptasks/${taskId}`;
    try {
        const data = await apiClient.delete(url);
        return { data };
    } catch (error) {
        console.error("Failed to delete maintenance task:", error);
        throw error;
    }
};
