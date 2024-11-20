import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Layouts } from "../types/slices.types";

const useGridPlate = (): Layouts => {
    const healthVisible = useSelector((state: RootState) => state.health.visible);
    const reportsVisible = useSelector((state: RootState) => state.reports.visible);

    if (healthVisible && reportsVisible) {
        return Layouts.default;
    }

    if (healthVisible && !reportsVisible) {
        return Layouts.health_tools;
    }

    if (!healthVisible && reportsVisible) {
        return Layouts.reports_tools;
    }

    if (!healthVisible && !reportsVisible) {
        return Layouts.tools;
    }

    return Layouts.default;
};

export default useGridPlate;
