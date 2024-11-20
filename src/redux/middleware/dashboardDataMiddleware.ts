import { prepareToolDefault } from "@/hooks/useToolWidgetDefault";
import { prepareDefault } from "@/hooks/useWidgetDefault";
import { fetchToolsData, fetchToolsInfoStatusesData } from "@/services/toolsService";
import { fetchUserPreferenceState } from "@/services/userService";
import { Middleware } from "@reduxjs/toolkit";
import { getAvailableViews } from "../../components/AppBar/helper/viewHandlers";
import updateView from "../../components/AppBar/hooks/useUpdateView";
import { updateToolsMetricsState } from "../slices/toolsMetricsSlice";
import { updateToolsReportsState } from "../slices/toolsReportsSlice";
import { updateWarningsState } from "../slices/toolsWarningSlice";
import { updateAvailableInterfaces, updateLoading } from "../slices/userSlice";
import { RootState } from "../store";

function hasTypeField(obj: unknown): obj is { type: string } {
    return typeof obj === "object" && obj !== null && "type" in obj;
}

const dashboardDataMiddleware: Middleware<{}, any, any> = storeAPI => next => async (action: unknown) => {
    if (hasTypeField(action) && action.type === "INITIALIZE_DASHBOARD") {
        storeAPI.dispatch(updateLoading(true));
        const state: RootState = storeAPI.getState();
        const userID = state.user.data.id;

        const activeView =
            typeof window !== "undefined"
                ? window.localStorage.getItem("activeView")?.replace(/^"|"$/g, "")
                : "default";

        if (typeof userID !== "number") throw Error("USER IS NOT DEFINED");

        const userPreferences = await fetchUserPreferenceState(userID);
        const toolsIdentity = await fetchToolsData();
        const toolsInfo = await fetchToolsInfoStatusesData();

        const defaultWidget = prepareDefault(toolsInfo, toolsIdentity);

        const views = getAvailableViews(userPreferences, defaultWidget);
        storeAPI.dispatch(updateAvailableInterfaces(views));

        const activeWidget = views.find(({ name }) => name === activeView) || defaultWidget;
        updateView(storeAPI.dispatch, activeWidget);

        const defaultWidgetTool = prepareToolDefault(toolsIdentity);
        storeAPI.dispatch(updateWarningsState(defaultWidgetTool.warnings));
        storeAPI.dispatch(updateToolsMetricsState(defaultWidgetTool.metrics));
        storeAPI.dispatch(updateToolsReportsState(defaultWidgetTool.reports));

        storeAPI.dispatch(updateLoading(false));
    }
    return next(action);
};

export default dashboardDataMiddleware;
