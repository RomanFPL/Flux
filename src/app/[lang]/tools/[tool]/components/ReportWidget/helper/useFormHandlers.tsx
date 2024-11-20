import useToolId from "@/hooks/useToolId";
import { RootState } from "@/redux";
import {
    updateToolsReportsAOIDateType,
    updateToolsReportsLccLightType,
    updateToolsReportsLccMaximize,
    updateToolsReportsLccTimeFilter,
    updateToolsReportsLccZoom,
    updateToolsReportsSelectedAOIDateRange,
    updateToolsReportsSelectedAOIErrors,
    updateToolsReportsSelectedGraphs,
    updateToolsReportsSelectedTPTDateRange,
    updateToolsReportsTPTDateType,
    updateToolsReportsVisibility
} from "@/redux/slices/toolsReportsSlice";
import { calcDuration } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import {
    AOIChartFilterData,
    CommonChartFilterData,
    LCCChartFilterData,
    LineChartFilterData
} from "../ReportWidget.types";

const useFormHandlers = () => {
    const { toolId } = useToolId();
    const dispatch = useDispatch();
    const toolsReports = useSelector((state: RootState) => state.toolsReports);
    const toolState = toolsReports.find(tool => tool.id === toolId);
    const { AOI, TPT } = toolState || {};
    const onSubmitAOIFilters = (data: AOIChartFilterData) => {
        dispatch(updateToolsReportsSelectedAOIErrors({ id: toolId, errors: data.selectedAOIErrors }));
        if (JSON.stringify(data.selectedAOIDate) !== JSON.stringify(AOI?.selectedDateRange)) {
            dispatch(updateToolsReportsSelectedAOIDateRange({ id: toolId, range: data.selectedAOIDate }));
            dispatch(updateToolsReportsAOIDateType({ id: toolId, type: null }));
        }
    };

    const onSubmitTPTFilters = (data: LineChartFilterData) => {
        if (JSON.stringify(data.selectedTPTDate) !== JSON.stringify(TPT?.selectedDateRange)) {
            dispatch(updateToolsReportsSelectedTPTDateRange({ id: toolId, range: data.selectedTPTDate }));
            dispatch(updateToolsReportsTPTDateType({ id: toolId, type: null }));
        }
    };

    const onSubmitLCCFilters = (data: LCCChartFilterData) => {
        dispatch(updateToolsReportsLccLightType({ id: toolId, type: data.lightType }));
        dispatch(updateToolsReportsLccTimeFilter({ id: toolId, timeFilter: data.timeFilter }));
        dispatch(updateToolsReportsLccZoom({ id: toolId, zoom: data.zoom }));
        dispatch(updateToolsReportsLccMaximize({ id: toolId, maximize: data.maximize }));
    };

    const onSubmit = (data: CommonChartFilterData) => {
        dispatch(updateToolsReportsVisibility({ id: toolId, visible: data.visible }));
        dispatch(updateToolsReportsAOIDateType({ id: toolId, type: data.timeFilter }));
        dispatch(updateToolsReportsTPTDateType({ id: toolId, type: data.timeFilter }));
        dispatch(updateToolsReportsSelectedGraphs({ id: toolId, graphs: data.selectedGraphs }));

        if (null === data.timeFilter) {
            return;
        }
        const range = calcDuration(data.timeFilter);
        dispatch(updateToolsReportsSelectedAOIDateRange({ id: toolId, range: range }));
        dispatch(updateToolsReportsSelectedTPTDateRange({ id: toolId, range: range }));
    };

    return { onSubmitAOIFilters, onSubmitTPTFilters, onSubmitLCCFilters, onSubmit };
};

export default useFormHandlers;
