import {
    addToolMaintenanceData,
    deleteToolMaintenanceData,
    fetchAoiStatistics,
    fetchHealthData,
    fetchLccData,
    fetchLogMessagesData,
    fetchPredictToolData,
    fetchThroughputData,
    fetchToolData,
    fetchToolMaintenanceData,
    fetchToolsData,
    fetchToolsInfoStatusesData
} from "@/services";
import {
    DailyErrorCount,
    LightLCCDataPoints,
    LightReplacementPrediction,
    MaintenanceTask,
    MaintenanceTaskAddOrUpdateRes,
    OverallHealthStatus,
    ToolIdentity,
    ToolInfo,
    ToolInfoStatus,
    ToolLogMessage,
    ToolsDataPointsData
} from "@/services/openApi";
import { AvailableViews, fetchUserPreferenceState, updateUserPreferenceState } from "@/services/userService";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RequestArgs } from "../../services/openApi/base";

const _base_url = process.env.NEXT_PUBLIC_DB_URL || "https://fleetmanagerbackapi.azurewebsites.net";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: _base_url }),
    endpoints: builder => ({
        fetchHealth: builder.query<OverallHealthStatus, { startDate: string; endDate: string }>({
            queryFn: async ({ startDate, endDate }) => {
                try {
                    const data = await fetchHealthData(startDate, endDate);
                    return { data };
                } catch (error: any) {
                    return {
                        error: { status: "CUSTOM_ERROR", error: error.message }
                    };
                }
            }
        }),
        fetchTools: builder.query<ToolIdentity[], void>({
            queryFn: async () => {
                try {
                    const data = await fetchToolsData();
                    return { data };
                } catch (error: any) {
                    return {
                        error: { status: "CUSTOM_ERROR", error: error.message }
                    };
                }
            }
        }),
        fetchToolsStatuses: builder.query<ToolInfoStatus[], void>({
            queryFn: async () => {
                try {
                    const data = await fetchToolsInfoStatusesData();
                    return { data };
                } catch (error: any) {
                    return {
                        error: { status: "CUSTOM_ERROR", error: error.message }
                    };
                }
            }
        }),
        fetchToolData: builder.query<ToolInfo, string>({
            queryFn: async toolId => {
                try {
                    const data = await fetchToolData(toolId);
                    return { data };
                } catch (error: any) {
                    return {
                        error: { status: "CUSTOM_ERROR", error: error.message }
                    };
                }
            }
        }),
        fetchPredictToolData: builder.query<LightReplacementPrediction[], string>({
            queryFn: async toolId => {
                try {
                    const data = await fetchPredictToolData(toolId);
                    return { data };
                } catch (error: any) {
                    return {
                        error: { status: "CUSTOM_ERROR", error: error.message }
                    };
                }
            }
        }),
        fetchToolMaintenanceData: builder.query<MaintenanceTask[], string>({
            queryFn: async toolId => {
                try {
                    const data = await fetchToolMaintenanceData(toolId);
                    return { data };
                } catch (error: any) {
                    return {
                        error: { status: "CUSTOM_ERROR", error: error.message }
                    };
                }
            }
        }),
        fetchLogMessages: builder.query<
            ToolLogMessage[],
            {
                toolId: string;
                startDate: string;
                endDate: string;
                severity?: string;
            }
        >({
            queryFn: async ({ toolId, startDate, endDate, severity }) => {
                try {
                    const data = await fetchLogMessagesData(toolId, startDate, endDate, severity);
                    return { data };
                } catch (error: any) {
                    return {
                        error: { status: "CUSTOM_ERROR", error: error.message }
                    };
                }
            }
        }),
        fetchAoiStatistics: builder.query<
            DailyErrorCount[],
            {
                startDate: string;
                endDate: string;
                toolIds?: string[];
            }
        >({
            queryFn: async ({ startDate, endDate, toolIds }) => {
                try {
                    const data = await fetchAoiStatistics(startDate, endDate, toolIds);
                    return { data };
                } catch (error: any) {
                    return {
                        error: { status: "CUSTOM_ERROR", error: error.message }
                    };
                }
            }
        }),
        fetchThroughputData: builder.query<
            ToolsDataPointsData,
            {
                startDate: string;
                endDate: string;
                toolIds?: string[];
                worstToolsCount?: number;
            }
        >({
            queryFn: async ({ startDate, endDate, toolIds, worstToolsCount }) => {
                try {
                    const data = await fetchThroughputData(startDate, endDate, toolIds, worstToolsCount);
                    return { data };
                } catch (error: any) {
                    return {
                        error: { status: "CUSTOM_ERROR", error: error.message }
                    };
                }
            }
        }),
        fetchLccData: builder.query<
            LightLCCDataPoints[],
            {
                toolid: string;
                lightType: string;
                startDate: string;
                endDate: string;
            }
        >({
            queryFn: async ({ toolid, lightType, startDate, endDate }) => {
                try {
                    const data = await fetchLccData(toolid, lightType, startDate, endDate);
                    return { data };
                } catch (error: any) {
                    return {
                        error: { status: "CUSTOM_ERROR", error: error.message }
                    };
                }
            }
        }),
        fetchUserPreferenceState: builder.query<AvailableViews, number>({
            queryFn: async userID => {
                try {
                    const data = await fetchUserPreferenceState(userID);
                    return { data };
                } catch (error: any) {
                    return {
                        error: { status: "CUSTOM_ERROR", error: error.message }
                    };
                }
            }
        }),
        updateUserPreferenceState: builder.mutation<any, { userID: number; value: { value: string } }>({
            queryFn: async preferenceData => {
                try {
                    const data = await updateUserPreferenceState(preferenceData);
                    return { data };
                } catch (error: any) {
                    return {
                        error: { status: "CUSTOM_ERROR", error: error.message }
                    };
                }
            }
        }),
        addToolMaintenanceData: builder.mutation<MaintenanceTaskAddOrUpdateRes, MaintenanceTask>({
            queryFn: async maintenanceData => {
                try {
                    const data = await addToolMaintenanceData(maintenanceData);
                    return { data };
                } catch (error: any) {
                    return {
                        error: { status: "CUSTOM_ERROR", error: error.message }
                    };
                }
            },
            onQueryStarted: async (maintenanceData, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    if (!maintenanceData.toolID) return;

                    dispatch(
                        apiSlice.util.updateQueryData("fetchToolMaintenanceData", maintenanceData.toolID, draft => {
                            if (!data.task) return;
                            if (maintenanceData.id) {
                                const existingTaskIndex = draft.findIndex(({ id }) => id === data.task?.id);
                                if (existingTaskIndex !== -1) draft[existingTaskIndex] = data.task;
                            } else {
                                draft.push(data.task);
                            }
                        })
                    );
                } catch (error) {
                    console.error("Error while updating cache:", error);
                }
            }
        }),
        deleteToolMaintenanceData: builder.mutation<RequestArgs, { toolId: string; taskId: number }>({
            queryFn: async ({ taskId }) => {
                try {
                    const data = await deleteToolMaintenanceData(taskId);
                    return { data };
                } catch (error: any) {
                    return {
                        error: { status: "CUSTOM_ERROR", error: error.message }
                    };
                }
            },
            onQueryStarted: async ({ toolId, taskId }, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;

                    dispatch(
                        apiSlice.util.updateQueryData("fetchToolMaintenanceData", toolId, draft => {
                            const index = draft.findIndex(task => task.id === taskId);
                            if (index !== -1) {
                                draft.splice(index, 1);
                            }
                        })
                    );
                } catch (error) {
                    console.error("Error while updating cache:", error);
                }
            }
        })
    })
});

export const {
    useFetchHealthQuery,
    useFetchToolsQuery,
    useFetchToolsStatusesQuery,
    useFetchToolDataQuery,
    useFetchPredictToolDataQuery,
    useFetchToolMaintenanceDataQuery,
    useFetchLogMessagesQuery,
    useFetchAoiStatisticsQuery,
    useFetchThroughputDataQuery,
    useFetchLccDataQuery,
    useFetchUserPreferenceStateQuery,
    useUpdateUserPreferenceStateMutation,
    useAddToolMaintenanceDataMutation,
    useDeleteToolMaintenanceDataMutation
} = apiSlice;
