import { Item } from "@/components/MultiselectButton/MultiselectButton.types";
import { TimeToggleOptions } from "@/types/TimeToggleType";
import { calcDuration } from "@/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WarningToolsState {
    id: string;
    visible: boolean;
    maximize: boolean;
    selectedSeverities: Item[];
    selectedDateRange: [string, string];
    selectedDateType: TimeToggleOptions | null;
}

const initialState: WarningToolsState[] = [];

type IdBasedField<T = {}> = { id: string } & T;

const toolsWarningSlice = createSlice({
    name: "warning",
    initialState,
    reducers: {
        updateWarningVisibility(state, action: PayloadAction<IdBasedField<{ visible: boolean }>>) {
            const index = state.findIndex(tool => tool.id === action.payload.id);
            if (index !== -1) state[index].visible = action.payload.visible;
        },
        updateWarningMaximize(state, action: PayloadAction<IdBasedField<{ maximize: boolean }>>) {
            const index = state.findIndex(tool => tool.id === action.payload.id);
            if (index !== -1) state[index].maximize = action.payload.maximize;
        },
        updateWarningSelectedSeverities(state, action: PayloadAction<IdBasedField<{ severities: Item[] }>>) {
            const index = state.findIndex(tool => tool.id === action.payload.id);
            if (index !== -1) state[index].selectedSeverities = action.payload.severities;
        },
        updateWarningSelectedDateRange(state, action: PayloadAction<IdBasedField<{ range: [string, string] }>>) {
            const index = state.findIndex(tool => tool.id === action.payload.id);
            if (index !== -1) state[index].selectedDateRange = action.payload.range;
        },
        updateWarningSelectedDateType(state, action: PayloadAction<IdBasedField<{ type: TimeToggleOptions | null }>>) {
            const index = state.findIndex(tool => tool.id === action.payload.id);
            if (index !== -1) {
                state[index].selectedDateType = action.payload.type;
            }
        },
        updateToolWarningsState(state, action: PayloadAction<IdBasedField<{ warning: WarningToolsState }>>) {
            const index = state.findIndex(tool => tool.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload.warning;
            }
        },
        updateWarningsState(_, action: PayloadAction<WarningToolsState[]>) {
            return action.payload;
        },
        updateWarningDynamicDateRange(state, action: PayloadAction<IdBasedField>) {
            const index = state.findIndex(tool => tool.id === action.payload.id);
            if (index !== -1) {
                if (null !== state[index].selectedDateType) {
                    state[index].selectedDateRange = calcDuration(state[index].selectedDateType);
                }
            }
        }
    }
});

export const {
    updateWarningVisibility,
    updateWarningMaximize,
    updateWarningSelectedSeverities,
    updateWarningSelectedDateRange,
    updateWarningSelectedDateType,
    updateToolWarningsState,
    updateWarningsState,
    updateWarningDynamicDateRange
} = toolsWarningSlice.actions;

export default toolsWarningSlice.reducer;
