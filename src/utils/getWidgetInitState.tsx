import { predefinedStatusGroups } from "../types/statusGroup.types";

export const getWidgetInitState = () => {};

export const getToolsFilterInit = () => {
    const selectedStatusGroup = predefinedStatusGroups.map(group => {
        return { value: String(group), text: String(group) };
    });
    const searchValue = "";
    const isGridView = true;
    const isExpandView = false;
    const changeExpandFlag = false;

    return { searchValue, selectedStatusGroup, isGridView, isExpandView, changeExpandFlag };
};
