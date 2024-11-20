import { TimeToggleOptions } from "@/types/TimeToggleType";
import { calcDuration } from "@/utils";
import { getGlobalDateFilter } from "@/utils/dateRanges";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../../components/MultiselectButton/MultiselectButton.types";

export interface ReportState {
    timeFilter: TimeToggleOptions | null;
    visible: boolean;
    AOI: {
        selectedTools: Item[];
        selectedErrors: Item[];
        selectedDateRange: [string, string];
        selectedDateType: TimeToggleOptions | null;
    };
    TPT: {
        selectedTools: Item[];
        selectedDateRange: [string, string];
        worstTools: Item[];
        selectedDateType: TimeToggleOptions | null;
    };
}

const initialState: ReportState = {
    timeFilter: TimeToggleOptions.WEEK,
    visible: true,
    AOI: {
        selectedTools: [],
        selectedErrors: [],
        selectedDateRange: ["", ""],
        selectedDateType: TimeToggleOptions.WEEK
    },
    TPT: { selectedTools: [], selectedDateRange: ["", ""], worstTools: [], selectedDateType: TimeToggleOptions.WEEK }
};

export const reportsSlice = createSlice({
    name: "reports",
    initialState,
    reducers: {
        updateReportVisibility(state, action: PayloadAction<boolean>) {
            state.visible = action.payload;
        },
        updateSelectedAOI(state, action: PayloadAction<ReportState["AOI"]>) {
            state.AOI = action.payload;
            state.timeFilter = getGlobalDateFilter(action.payload.selectedDateType, state.TPT.selectedDateType);
        },
        updateSelectedAOITools(state, action: PayloadAction<Item[]>) {
            state.AOI.selectedTools = action.payload;
        },
        updateSelectedAOIErrors(state, action: PayloadAction<Item[]>) {
            state.AOI.selectedErrors = action.payload;
        },
        updateSelectedAOIDateRange(state, action: PayloadAction<[string, string]>) {
            state.AOI.selectedDateRange = action.payload;
        },
        updateSelectedTPT(state, action: PayloadAction<ReportState["TPT"]>) {
            state.TPT = action.payload;
            state.timeFilter = getGlobalDateFilter(action.payload.selectedDateType, state.AOI.selectedDateType);
        },
        updateSelectedTPTTools(state, action: PayloadAction<Item[]>) {
            state.TPT.selectedTools = action.payload;
        },
        updateSelectedTPTDateRange(state, action: PayloadAction<[string, string]>) {
            state.TPT.selectedDateRange = action.payload;
        },
        updateWorstTools(state, action: PayloadAction<Item[]>) {
            state.TPT.worstTools = action.payload;
        },
        updateAOIDateType(state, action: PayloadAction<TimeToggleOptions | null>) {
            state.AOI.selectedDateType = action.payload;
            state.timeFilter = getGlobalDateFilter(action.payload, state.TPT.selectedDateType);
        },
        updateTPTDateType(state, action: PayloadAction<TimeToggleOptions | null>) {
            state.TPT.selectedDateType = action.payload;
            state.timeFilter = getGlobalDateFilter(action.payload, state.AOI.selectedDateType);
        },
        updateReportsDynamicDateRange(state) {
            if (null !== state.TPT.selectedDateType) {
                state.TPT.selectedDateRange = calcDuration(state.TPT.selectedDateType);
            }
            if (null !== state.AOI.selectedDateType) {
                state.AOI.selectedDateRange = calcDuration(state.AOI.selectedDateType);
            }
        }
    }
});

export const {
    updateReportVisibility,
    updateSelectedAOI,
    updateSelectedAOITools,
    updateSelectedAOIErrors,
    updateSelectedAOIDateRange,
    updateSelectedTPT,
    updateSelectedTPTTools,
    updateSelectedTPTDateRange,
    updateWorstTools,
    updateAOIDateType,
    updateTPTDateType,
    updateReportsDynamicDateRange
} = reportsSlice.actions;

export default reportsSlice.reducer;
