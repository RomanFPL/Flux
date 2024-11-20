import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToolTabs } from "@/types/ToolTabsType";

export interface MetricsToolsState {
    id: string;
    visible: boolean;
    activeTab: ToolTabs;
}

const initialState: MetricsToolsState[] = [];

type IdBasedField<T = {}> = { id: string } & T;

const toolsMetricsSlice = createSlice({
    name: "metrics",
    initialState,
    reducers: {
        updateToolsMetricsVisibility(state, action: PayloadAction<IdBasedField<{ visible: boolean }>>) {
            const index = state.findIndex(tool => tool.id === action.payload.id);
            if (index !== -1) state[index].visible = action.payload.visible;
        },
        updateToolsMetricsActiveTab(state, action: PayloadAction<IdBasedField<{ activeTab: ToolTabs }>>) {
            const index = state.findIndex(tool => tool.id === action.payload.id);
            if (index !== -1) state[index].activeTab = action.payload.activeTab;
        },
        updateToolsMetricsState(_, action: PayloadAction<MetricsToolsState[]>) {
            return action.payload;
        }
    }
});

export const { updateToolsMetricsVisibility, updateToolsMetricsActiveTab, updateToolsMetricsState } =
    toolsMetricsSlice.actions;

export default toolsMetricsSlice.reducer;
