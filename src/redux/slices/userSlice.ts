import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HealthState } from "./healthSlice";
import { ReportState } from "./reportsSlice";
import { ToolsState } from "./toolsSlice";
import { IUserView } from "@/types/userInterface";
interface UserState {
    isAuthenticated: boolean;
    data: {
        id?: number;
        username?: string;
        email?: string;
    };
    loading: boolean;
    error?: string;
    currentUserInterface: IUserView | null;
    availableInterfaces: IUserView[];
}
export interface Widgets {
    name: string;
    tools: ToolsState;
    health: HealthState;
    reports: ReportState;
}

export const widgetsNames = ["tools" as const, "reports" as const, "health" as const];

const initialState: UserState = {
    isAuthenticated: true,
    data: {
        id: 0,
        username: "Shir Fisher"
    },
    loading: false,
    error: undefined,
    currentUserInterface: null,
    availableInterfaces: []
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        loginLogic(state) {
            state.loading = true;
        },
        updateUser(state, action: PayloadAction<Partial<UserState["data"]>>) {
            state.data = { ...state.data, ...action.payload };
        },
        updateCurrentUserInterface(state, action: PayloadAction<IUserView>) {
            state.currentUserInterface = action.payload;
        },
        updateAvailableInterfaces(state, action: PayloadAction<IUserView[]>) {
            state.availableInterfaces = action.payload;
        }
    }
});

export const { updateLoading, updateUser, updateCurrentUserInterface, updateAvailableInterfaces } = userSlice.actions;

export default userSlice.reducer;
