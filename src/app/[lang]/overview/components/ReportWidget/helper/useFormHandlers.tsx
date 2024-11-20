import { RootState } from "@/redux";
import {
    updateAOIDateType,
    updateReportVisibility,
    updateSelectedAOIDateRange,
    updateSelectedAOIErrors,
    updateSelectedAOITools,
    updateSelectedTPTDateRange,
    updateSelectedTPTTools,
    updateTPTDateType
} from "@/redux/slices/reportsSlice";
import { TimeToggleOptions } from "@/types/TimeToggleType";
import { day, month, week } from "@/utils/dateRanges";
import { useDispatch, useSelector } from "react-redux";
import { BarChartFilterData, CommonChartFilterData, LineChartFilterData } from "../ReportWidget.types";

const useFormHandlers = () => {
    const dispatch = useDispatch();
    const { TPT, AOI } = useSelector((state: RootState) => state.reports);
    const onSubmitAOIFilters = (data: BarChartFilterData) => {
        dispatch(updateSelectedAOITools(data.selectedAOITools));
        dispatch(updateSelectedAOIErrors(data.selectedAOIErrors));
        if (JSON.stringify(data.selectedAOIDate) !== JSON.stringify(AOI.selectedDateRange)) {
            dispatch(updateSelectedAOIDateRange(data.selectedAOIDate));
            dispatch(updateAOIDateType(null));
        }
    };

    const onSubmitTPTFilters = (data: LineChartFilterData) => {
        dispatch(updateSelectedTPTTools(data.selectedTPTTools));
        if (JSON.stringify(data.selectedTPTDate) !== JSON.stringify(TPT.selectedDateRange)) {
            dispatch(updateSelectedTPTDateRange(data.selectedTPTDate));
            dispatch(updateTPTDateType(null));
        }
    };

    const onSubmit = ({ timeFilter, visible }: CommonChartFilterData) => {
        if (timeFilter === TimeToggleOptions.DAY) {
            dispatch(updateSelectedAOIDateRange(day));
            dispatch(updateSelectedTPTDateRange(day));
        } else if (timeFilter === TimeToggleOptions.WEEK) {
            dispatch(updateSelectedAOIDateRange(week));
            dispatch(updateSelectedTPTDateRange(week));
        } else if (timeFilter === TimeToggleOptions.MONTH) {
            dispatch(updateSelectedAOIDateRange(month));
            dispatch(updateSelectedTPTDateRange(month));
        } else {
            return;
        }

        dispatch(updateReportVisibility(visible));
        dispatch(updateAOIDateType(timeFilter));
        dispatch(updateTPTDateType(timeFilter));
    };

    return { onSubmitAOIFilters, onSubmitTPTFilters, onSubmit };
};

export default useFormHandlers;
