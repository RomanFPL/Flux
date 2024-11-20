import { Item } from "@/components/MultiselectButton/MultiselectButton.types";
import { LccLightType } from "@/types/LccLightType";
import { LccTimeToggleOptions, TimeToggleOptions } from "@/types/TimeToggleType";
import { calcDuration, calcLccDuration } from "@/utils";
import { getGlobalDateFilter } from "@/utils/dateRanges";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ToolsReportsState {
    id: string;
    timeFilter: TimeToggleOptions | null;
    visible: boolean;
    selectedGraphs: Item[];
    AOI: {
        selectedErrors: Item[];
        selectedDateRange: [string, string];
        selectedDateType: TimeToggleOptions | null;
    };
    TPT: {
        selectedDateRange: [string, string];
        selectedDateType: TimeToggleOptions | null;
    };
    LCC: {
        lightType: LccLightType;
        selectedDateRange: [string, string];
        timeFilter: LccTimeToggleOptions | null;
        zoom: number;
        maximize: boolean;
    };
}

const initialState: ToolsReportsState[] = [];

type IdBasedField<T = {}> = { id: string } & T;

const toolsReportsSlice = createSlice({
    name: "toolsReports",
    initialState,
    reducers: {
        updateToolsReportsVisibility(state, action: PayloadAction<IdBasedField<{ visible: boolean }>>) {
            const index = state.findIndex(tool => tool.id === action.payload.id);
            if (index !== -1) state[index].visible = action.payload.visible;
        },
        updateToolsReportsState(_, action: PayloadAction<ToolsReportsState[]>) {
            return action.payload;
        },
        updateToolsReportsSelectedAOI(state, action: PayloadAction<IdBasedField<{ aoi: ToolsReportsState["AOI"] }>>) {
            const index = state.findIndex(tool => tool.id === action.payload.id);
            if (index !== -1) {
                state[index].AOI = action.payload.aoi;
                state[index].timeFilter = getGlobalDateFilter(
                    action.payload.aoi.selectedDateType,
                    state[index].TPT.selectedDateType
                );
            }
        },
        updateToolsReportsSelectedAOIErrors(state, action: PayloadAction<IdBasedField<{ errors: Item[] }>>) {
            const index = state.findIndex(tool => tool.id === action.payload.id);
            if (index !== -1) state[index].AOI.selectedErrors = action.payload.errors;
        },
        updateToolsReportsSelectedAOIDateRange(
            state,
            action: PayloadAction<IdBasedField<{ range: [string, string] }>>
        ) {
            const index = state.findIndex(tool => tool.id === action.payload.id);
            if (index !== -1) state[index].AOI.selectedDateRange = action.payload.range;
        },
        updateToolsReportsSelectedTPT(state, action: PayloadAction<IdBasedField<{ tpt: ToolsReportsState["TPT"] }>>) {
            const index = state.findIndex(tool => tool.id === action.payload.id);
            if (index !== -1) {
                state[index].TPT = action.payload.tpt;
                state[index].timeFilter = getGlobalDateFilter(
                    action.payload.tpt.selectedDateType,
                    state[index].AOI.selectedDateType
                );
            }
        },
        updateToolsReportsSelectedTPTDateRange(
            state,
            action: PayloadAction<IdBasedField<{ range: [string, string] }>>
        ) {
            const index = state.findIndex(tool => tool.id === action.payload.id);
            if (index !== -1) state[index].TPT.selectedDateRange = action.payload.range;
        },
        updateToolsReportsAOIDateType(state, action: PayloadAction<IdBasedField<{ type: TimeToggleOptions | null }>>) {
            const index = state.findIndex(tool => tool.id === action.payload.id);
            if (index !== -1) {
                state[index].AOI.selectedDateType = action.payload.type;
                state[index].timeFilter = getGlobalDateFilter(action.payload.type, state[index].TPT.selectedDateType);
            }
        },
        updateToolsReportsTPTDateType(state, action: PayloadAction<IdBasedField<{ type: TimeToggleOptions | null }>>) {
            const index = state.findIndex(tool => tool.id === action.payload.id);
            if (index !== -1) {
                state[index].TPT.selectedDateType = action.payload.type;
                state[index].timeFilter = getGlobalDateFilter(action.payload.type, state[index].AOI.selectedDateType);
            }
        },
        updateToolsReportsSelectedDatesRange(state, action: PayloadAction<IdBasedField>) {
            const index = state.findIndex(tool => tool.id === action.payload.id);
            if (index !== -1) {
                if (null !== state[index].TPT.selectedDateType) {
                    state[index].TPT.selectedDateRange = calcDuration(state[index].TPT.selectedDateType);
                }
                if (null !== state[index].AOI.selectedDateType) {
                    state[index].AOI.selectedDateRange = calcDuration(state[index].AOI.selectedDateType);
                }
            }
        },
        updateToolsReportsSelectedGraphs(state, action: PayloadAction<IdBasedField<{ graphs: Item[] }>>) {
            const index = state.findIndex(tool => tool.id === action.payload.id);
            if (index !== -1) state[index].selectedGraphs = action.payload.graphs;
        },
        updateToolsReportsLcc(state, action: PayloadAction<IdBasedField<{ lcc: ToolsReportsState["LCC"] }>>) {
            const index = state.findIndex(tool => tool.id === action.payload.id);
            if (index !== -1) state[index].LCC = action.payload.lcc;
        },
        updateToolsReportsLccLightType(state, action: PayloadAction<IdBasedField<{ type: LccLightType }>>) {
            const index = state.findIndex(tool => tool.id === action.payload.id);
            if (index !== -1) state[index].LCC.lightType = action.payload.type;
        },
        updateToolsReportsLccTimeFilter(
            state,
            action: PayloadAction<IdBasedField<{ timeFilter: LccTimeToggleOptions | null }>>
        ) {
            const index = state.findIndex(tool => tool.id === action.payload.id);
            if (index !== -1) {
                state[index].LCC.timeFilter = action.payload.timeFilter;
                state[index].LCC.selectedDateRange = calcLccDuration(state[index].LCC.timeFilter);
            }
        },
        updateToolsReportsLccZoom(state, action: PayloadAction<IdBasedField<{ zoom: number }>>) {
            const index = state.findIndex(tool => tool.id === action.payload.id);
            if (index !== -1) state[index].LCC.zoom = action.payload.zoom;
        },
        updateToolsReportsLccMaximize(state, action: PayloadAction<IdBasedField<{ maximize: boolean }>>) {
            const index = state.findIndex(tool => tool.id === action.payload.id);
            if (index !== -1) state[index].LCC.maximize = action.payload.maximize;
        },
        updateToolsReportsDynamicDateRange(state, action: PayloadAction<IdBasedField>) {
            const index = state.findIndex(tool => tool.id === action.payload.id);
            if (index !== -1) {
                if (null !== state[index].TPT.selectedDateType) {
                    state[index].TPT.selectedDateRange = calcDuration(state[index].TPT.selectedDateType);
                }
                if (null !== state[index].AOI.selectedDateType) {
                    state[index].AOI.selectedDateRange = calcDuration(state[index].AOI.selectedDateType);
                }
                state[index].LCC.selectedDateRange = calcLccDuration(state[index].LCC.timeFilter);
            }
        }
    }
});

export const {
    updateToolsReportsState,
    updateToolsReportsVisibility,
    updateToolsReportsSelectedAOI,
    updateToolsReportsSelectedAOIErrors,
    updateToolsReportsSelectedAOIDateRange,
    updateToolsReportsSelectedTPT,
    updateToolsReportsSelectedTPTDateRange,
    updateToolsReportsAOIDateType,
    updateToolsReportsTPTDateType,
    updateToolsReportsSelectedDatesRange,
    updateToolsReportsSelectedGraphs,
    updateToolsReportsLcc,
    updateToolsReportsLccLightType,
    updateToolsReportsLccTimeFilter,
    updateToolsReportsLccZoom,
    updateToolsReportsLccMaximize,
    updateToolsReportsDynamicDateRange
} = toolsReportsSlice.actions;

export default toolsReportsSlice.reducer;
