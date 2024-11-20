import { TimeToggleOptions } from "@/types/TimeToggleType";
import { IUserView } from "@/types/userInterface";
import { day, month, week } from "@/utils/dateRanges";
import { AvailableViews } from "@/services/userService";

export const normalizeViews = (views: IUserView[]) => {
    const pureViews = views.filter(({ name }) => name !== "default");
    //TODO refactor this logic
    const preparedDateViews = pureViews.map(view => {
        if (view.reports.timeFilter === TimeToggleOptions.DAY) {
            const tpt = { ...view.reports.TPT, selectedDateRange: day, selectedDateType: TimeToggleOptions.DAY };
            const aoi = { ...view.reports.AOI, selectedDateRange: day, selectedDateType: TimeToggleOptions.DAY };
            return { ...view, reports: { ...view.reports, AOI: aoi, TPT: tpt } };
        }
        if (view.reports.timeFilter === TimeToggleOptions.WEEK) {
            const tpt = { ...view.reports.TPT, selectedDateRange: week, selectedDateType: TimeToggleOptions.WEEK };
            const aoi = { ...view.reports.AOI, selectedDateRange: week, selectedDateType: TimeToggleOptions.WEEK };
            return { ...view, reports: { ...view.reports, AOI: aoi, TPT: tpt } };
        }
        if (view.reports.timeFilter === TimeToggleOptions.MONTH) {
            const tpt = { ...view.reports.TPT, selectedDateRange: month, selectedDateType: TimeToggleOptions.MONTH };
            const aoi = { ...view.reports.AOI, selectedDateRange: month, selectedDateType: TimeToggleOptions.MONTH };
            return { ...view, reports: { ...view.reports, AOI: aoi, TPT: tpt } };
        }
        return view;
    });
    return preparedDateViews;
};

export const removeViewByName = (views: IUserView[], name?: string) => {
    return views.filter(view => view.name !== name);
};

export const replaceViewByName = (views: IUserView[], updatedView: IUserView): IUserView[] => {
    return views.map(view => (view.name === updatedView.name ? updatedView : view));
};

export const getAvailableViews = (data?: AvailableViews, widgetDefault?: IUserView | null): IUserView[] => {
    if (!data) return [];
    const viewsString = data?.value?.value;

    if (!viewsString && widgetDefault) return [widgetDefault];
    try {
        const allViews: IUserView[] = JSON.parse(viewsString);

        const preparedViews = normalizeViews(allViews);

        if (!widgetDefault) return preparedViews;

        return [widgetDefault, ...preparedViews];
    } catch (e) {
        if (widgetDefault) return [widgetDefault];
        return [];
    }
};

export const preparePreferencesData = (userID: number, preparedViews: IUserView[]) => ({
    userID: userID,
    value: { value: JSON.stringify(preparedViews) }
});
