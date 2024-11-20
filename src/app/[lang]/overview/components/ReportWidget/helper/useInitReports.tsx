import useWidgetDefault from "@/hooks/useWidgetDefault";
import { ReportState, updateSelectedAOI, updateSelectedTPT } from "@/redux/slices/reportsSlice";
import { ToolIdentity, ToolsDataPointsData } from "@/services/openApi/api";
import { useDispatch } from "react-redux";

interface InitProps {
    tools: ToolIdentity[];
    AOI: ReportState["AOI"];
    TPT: ReportState["TPT"];
    tptData: ToolsDataPointsData;
}

// This hook helps replace empty values in redux
// same values should be defined inside default form values
// then redux state sync data from form
const useInitReports = ({ AOI, TPT }: InitProps) => {
    const dispatch = useDispatch();
    const { defaultWidget } = useWidgetDefault();

    const resetAOI = () => {
        if (defaultWidget) {
            dispatch(updateSelectedAOI(defaultWidget?.reports.AOI));
        }
    };

    const resetTPT = () => {
        if (defaultWidget) {
            dispatch(updateSelectedTPT(defaultWidget?.reports.TPT));
        }
    };

    return { resetAOI, resetTPT };
};

export default useInitReports;
