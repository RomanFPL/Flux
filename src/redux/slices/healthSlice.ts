import { TimeToggleOptions } from "@/types/TimeToggleType";
import { calcDuration } from "@/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BaseHealthFilter {
    dateFilter: TimeToggleOptions;
    visible: boolean;
    dateRange: [string, string];
}

export interface HealthState extends BaseHealthFilter {}

const initialState: HealthState = { visible: true, dateFilter: TimeToggleOptions.QUARTER, dateRange: ["", ""] };

const healthSlice = createSlice({
    name: "health",
    initialState,
    reducers: {
        updateDateFilter(state, action: PayloadAction<TimeToggleOptions>) {
            state.dateFilter = action.payload;
            const duration = calcDuration(state.dateFilter);
            state.dateRange = duration;
        },
        updateHealthVisibility(state, action: PayloadAction<boolean>) {
            state.visible = action.payload;
        },
        updateHealthDynamicDateRange(state) {
            state.dateRange = calcDuration(state.dateFilter);
        }
    }
});

export const { updateDateFilter, updateHealthVisibility, updateHealthDynamicDateRange } = healthSlice.actions;
export default healthSlice.reducer;
