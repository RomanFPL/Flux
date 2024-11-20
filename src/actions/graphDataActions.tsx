import { fetchAoiStatistics, fetchLccData, fetchThroughputData, fetchYieldData } from "@/services/graphService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface GraphDataActionArgs {
    startDate: string;
    endDate: string;
    toolIds?: string[];
    worstToolsCount?: number;
}
export interface LccActionArgs {
    toolid: string;
    lightType: string;
    startDate: string;
    endDate: string;
}

// Async Thunk for fetching Aoi Statistics data
export const fetchAoiStatisticsAction = createAsyncThunk(
    "reports/fetchAoiStatistics",
    async (params: GraphDataActionArgs, { rejectWithValue }) => {
        try {
            return await fetchAoiStatistics(params.startDate, params.endDate, params.toolIds);
        } catch (error: any) {
            return rejectWithValue(error.message || "An unknown error occurred");
        }
    }
);

// Async Thunk for fetching LCC data
export const fetchLccDataAction = createAsyncThunk(
    "graphdata/fetchLccData",
    async (params: LccActionArgs, { rejectWithValue }) => {
        try {
            return await fetchLccData(params.toolid, params.lightType, params.startDate, params.endDate);
        } catch (error: any) {
            console.error("Error fetching LCC data:", error);
            return rejectWithValue(error.message || "An unknown error occurred");
        }
    }
);

// Async Thunk for fetching Throughput data
export const fetchThroughputDataAction = createAsyncThunk(
    "graphdata/fetchThroughputData",
    async (params: GraphDataActionArgs, { rejectWithValue }) => {
        try {
            return await fetchThroughputData(params.startDate, params.endDate, params.toolIds, params.worstToolsCount);
        } catch (error: any) {
            console.error("Error fetching throughput data:", error);
            return rejectWithValue(error.message || "An unknown error occurred");
        }
    }
);

// Async Thunk for fetching Yield data
export const fetchYieldDataAction = createAsyncThunk(
    "graphdata/fetchYieldData",
    async (params: GraphDataActionArgs, { rejectWithValue }) => {
        try {
            return await fetchYieldData(params.startDate, params.endDate, params.toolIds);
        } catch (error: any) {
            console.error("Error fetching yield data:", error);
            return rejectWithValue(error.message || "An unknown error occurred");
        }
    }
);
