import useToolWidgetDefault from "@/hooks/useToolWidgetDefault";
import {
    updateToolsReportsLccLightType,
    updateToolsReportsLccTimeFilter,
    updateToolsReportsLccZoom,
    updateToolsReportsSelectedAOI,
    updateToolsReportsSelectedTPT
} from "@/redux/slices/toolsReportsSlice";
import { useDispatch } from "react-redux";

// This hook helps replace empty values in redux
// same values should be defined inside default form values
// then redux state sync data from form
const useInitReports = (toolId: string) => {
    const dispatch = useDispatch();
    const { defaultWidget } = useToolWidgetDefault();
    const toolReports = defaultWidget?.reports?.find(tool => tool.id === toolId);

    const resetAOI = () => {
        if (toolReports) {
            dispatch(updateToolsReportsSelectedAOI({ id: toolId, aoi: toolReports?.AOI }));
        }
    };

    const resetTPT = () => {
        if (toolReports) {
            dispatch(updateToolsReportsSelectedTPT({ id: toolId, tpt: toolReports?.TPT }));
        }
    };

    const resetLCC = () => {
        if (toolReports) {
            dispatch(updateToolsReportsLccLightType({ id: toolId, type: toolReports?.LCC.lightType }));
            dispatch(updateToolsReportsLccTimeFilter({ id: toolId, timeFilter: toolReports?.LCC.timeFilter }));
            dispatch(updateToolsReportsLccZoom({ id: toolId, zoom: toolReports?.LCC.zoom }));
        }
    };

    return { resetAOI, resetTPT, resetLCC };
};

export default useInitReports;
