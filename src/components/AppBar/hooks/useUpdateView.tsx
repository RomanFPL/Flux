import { updateDateFilter, updateHealthVisibility } from "@/redux/slices/healthSlice";
import { updateReportVisibility, updateSelectedAOI, updateSelectedTPT } from "@/redux/slices/reportsSlice";
import { updateToolsFilters, updateToolsSort } from "@/redux/slices/toolsSlice";
import { updateCurrentUserInterface } from "@/redux/slices/userSlice";
import { TimeToggleOptions } from "@/types/TimeToggleType";
import { IUserView } from "@/types/userInterface";
import { day, month, week } from "@/utils/dateRanges";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

/**
 * Hook to handle updating the state based on the selected user view.
 *
 * Usage:
 * - Call `updateView` with a specific user view to apply that view's settings to the Redux store.
 */

const updateView = (dispatch: Dispatch<UnknownAction>, view?: IUserView) => {
    if (!view) return;

    dispatch(updateHealthVisibility(view.health.visible));
    dispatch(updateDateFilter(view.health.dateFilter));

    dispatch(updateReportVisibility(view.reports.visible));

    //TODO move to separate function / refactor
    if (view.reports.timeFilter === TimeToggleOptions.DAY) {
        const tpt = { ...view.reports.TPT, selectedDateRange: day, selectedDateType: TimeToggleOptions.DAY };
        const aoi = { ...view.reports.AOI, selectedDateRange: day, selectedDateType: TimeToggleOptions.DAY };
        dispatch(updateSelectedAOI(aoi));
        dispatch(updateSelectedTPT(tpt));
    }
    if (view.reports.timeFilter === TimeToggleOptions.WEEK) {
        const tpt = { ...view.reports.TPT, selectedDateRange: week, selectedDateType: TimeToggleOptions.WEEK };
        const aoi = { ...view.reports.AOI, selectedDateRange: week, selectedDateType: TimeToggleOptions.WEEK };
        dispatch(updateSelectedAOI(aoi));
        dispatch(updateSelectedTPT(tpt));
    }
    if (view.reports.timeFilter === TimeToggleOptions.MONTH) {
        const tpt = { ...view.reports.TPT, selectedDateRange: month, selectedDateType: TimeToggleOptions.MONTH };
        const aoi = { ...view.reports.AOI, selectedDateRange: month, selectedDateType: TimeToggleOptions.MONTH };
        dispatch(updateSelectedAOI(aoi));
        dispatch(updateSelectedTPT(tpt));
    }

    if (!view.reports.timeFilter) {
        dispatch(updateSelectedAOI({ ...view.reports.AOI, selectedDateType: null }));
        dispatch(updateSelectedTPT({ ...view.reports.TPT, selectedDateType: null }));
    }

    dispatch(updateToolsFilters(view.tools.toolsFilters));
    dispatch(updateToolsSort(view.tools.sortedTools));

    dispatch(updateCurrentUserInterface(view));
};

export default updateView;
