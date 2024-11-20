import { Item } from "@/components/MultiselectButton/MultiselectButton.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getToolsFilterInit } from "../../utils/getWidgetInitState";

export interface ToolsState {
    visible: boolean;
    toolsFilters: {
        searchValue: string;
        selectedStatusGroup: Item[];
        isGridView: boolean;
        isExpandView: boolean;
        changeExpandFlag: boolean;
    };
    sortedTools: (string | null | undefined)[];
}

const defaultFilter = getToolsFilterInit();

const initialState: ToolsState = {
    visible: true,
    toolsFilters: defaultFilter,
    sortedTools: []
};

const toolsSlice = createSlice({
    name: "tools",
    initialState,
    reducers: {
        updateSearchValue(state, action: PayloadAction<string>) {
            state.toolsFilters.searchValue = action.payload;
        },
        updateSelectedStatusGroup(state, action: PayloadAction<Item[]>) {
            state.toolsFilters.selectedStatusGroup = action.payload;
        },
        updateViewType(state, action: PayloadAction<boolean>) {
            state.toolsFilters.isGridView = action.payload;
        },
        updateExpandView(state, action: PayloadAction<boolean>) {
            state.toolsFilters.isExpandView = action.payload;
            state.toolsFilters.changeExpandFlag = !state.toolsFilters.changeExpandFlag;
        },
        updateToolsSort(state, action: PayloadAction<ToolsState["sortedTools"]>) {
            state.sortedTools = action.payload;
        },
        updateToolsFilters(state, action: PayloadAction<ToolsState["toolsFilters"]>) {
            state.toolsFilters = action.payload;
        }
    }
});

export const {
    updateSearchValue,
    updateSelectedStatusGroup,
    updateViewType,
    updateExpandView,
    updateToolsSort,
    updateToolsFilters
} = toolsSlice.actions;
export default toolsSlice.reducer;
