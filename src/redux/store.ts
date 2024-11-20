import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import healthReducer from "./slices/healthSlice";
import reportsReducer from "./slices/reportsSlice";
import toolsReducer from "./slices/toolsSlice";
import userReducer from "./slices/userSlice";
import dialogReducer from "./slices/dialogSlice";
import toolsWarningReducer from "./slices/toolsWarningSlice";
import toolsReportsReducer from "./slices/toolsReportsSlice";
import toolsMetricsReducer from "./slices/toolsMetricsSlice";
import dashboardDataMiddleware from "./middleware/dashboardDataMiddleware";

export const store = configureStore({
    reducer: {
        user: userReducer,
        tools: toolsReducer,
        reports: reportsReducer,
        health: healthReducer,
        dialog: dialogReducer,
        toolsWarning: toolsWarningReducer,
        toolsReports: toolsReportsReducer,
        toolsMetrics: toolsMetricsReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(apiSlice.middleware, dashboardDataMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
