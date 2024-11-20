import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHealthData } from "@/services";
import { TimeToggleOptions } from "@/types/TimeToggleType";

export interface HealthActionArgs {
    startDate: string;
    endDate: string;
}

export interface DateActionArgs {
    dateFilter: TimeToggleOptions;
}

export const fetchHealthAction = createAsyncThunk(
    "health/fetchHealth",
    async (params: HealthActionArgs, { rejectWithValue }) => {
        try {
            return await fetchHealthData(params.startDate, params.endDate);
        } catch (error: any) {
            return rejectWithValue(error.message || "An unknown error occurred");
        }
    }
);
