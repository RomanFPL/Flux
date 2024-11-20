/* eslint-disable react-hooks/exhaustive-deps */
import { updateHealthDynamicDateRange } from "@/redux/slices/healthSlice";
import { updateReportsDynamicDateRange } from "@/redux/slices/reportsSlice";
import { updateToolsReportsDynamicDateRange } from "@/redux/slices/toolsReportsSlice";
import { updateWarningDynamicDateRange } from "@/redux/slices/toolsWarningSlice";
import { ToolIdentity } from "@/services/openApi";
import { calcTimeUntilMidnight } from "@/utils";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

/**
 * `useMidnightUpdate` triggers each midnight an update in 'date range' in state widgets (Health, Reports, toolsReports, toolsWarning)
 **/

const useMidnightUpdate = (tools: ToolIdentity[]) => {
    const dispatch = useDispatch();
    const toolsRef = useRef(tools);

    useEffect(() => {
        toolsRef.current = tools;
    }, [tools]);

    useEffect(() => {
        let timerId: ReturnType<typeof setTimeout>;
        const startMidnightTimer = () => {
            const initialTimeLeft = calcTimeUntilMidnight();

            timerId = setTimeout(() => {
                dispatch(updateHealthDynamicDateRange());
                dispatch(updateReportsDynamicDateRange());
                toolsRef.current.forEach(tool => {
                    if (tool.toolId) {
                        dispatch(updateWarningDynamicDateRange({ id: tool.toolId }));
                        dispatch(updateToolsReportsDynamicDateRange({ id: tool.toolId }));
                    }
                });

                startMidnightTimer();
            }, initialTimeLeft);
        };

        startMidnightTimer();

        return () => clearTimeout(timerId);
    }, []);
};

export default useMidnightUpdate;
