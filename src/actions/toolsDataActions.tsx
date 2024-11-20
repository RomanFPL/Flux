import { fetchLogMessagesData } from "@/services/messagesService";
import {
    fetchPredictToolData,
    fetchToolData,
    fetchToolMaintenanceData,
    fetchToolsData,
    fetchToolsInfoStatusesData
} from "@/services/toolsService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface ToolDataActionArgs {
    toolId: string;
}

export interface LogMessagesActionArgs {
    toolId: string;
    startDate: string;
    endDate: string;
    severity?: string;
}

export interface PredictToolActionArgs {
    toolId: string;
}
export interface MaintenanceTaskArgs {
    toolId: string;
}

export const fetchToolsAction = createAsyncThunk("tools/fetchTools", async (_, { rejectWithValue }) => {
    try {
        return await fetchToolsData();
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchToolsStatusesAction = createAsyncThunk("tools/fetchToolsStatuses", async (_, { rejectWithValue }) => {
    try {
        return await fetchToolsInfoStatusesData();
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchToolDataAction = createAsyncThunk(
    "tools/fetchToolData",
    async (params: ToolDataActionArgs, { rejectWithValue }) => {
        try {
            return await fetchToolData(params.toolId);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchLogMessagesAction = createAsyncThunk(
    "tools/fetchLogMessages",
    async (params: LogMessagesActionArgs, { rejectWithValue }) => {
        try {
            return await fetchLogMessagesData(params.toolId, params.startDate, params.endDate, params.severity);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchPredictToolDataAction = createAsyncThunk(
    "tools/fetchPredictToolData",
    async (params: PredictToolActionArgs, { rejectWithValue }) => {
        try {
            return await fetchPredictToolData(params.toolId);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchToolMaintenanceDataAction = createAsyncThunk(
    "tools/fetchToolMaintenanceData",
    async (params: MaintenanceTaskArgs, { rejectWithValue }) => {
        try {
            return await fetchToolMaintenanceData(params.toolId);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);
