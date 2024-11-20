import { Chart } from "@/components";
import { processBarChartData, processLineChartData } from "@/components/Chart/helper";
import FormWrapper from "@/components/FormWrapper/FormWrapper";
import useGridPlate from "@/hooks/useGridPlate";
import { useFetchAoiStatisticsQuery, useFetchThroughputDataQuery } from "@/redux/slices/apiSlice";
import { predefinedErrors } from "@/types/error.types";
import { groupingByRange } from "@/utils/dateRanges";
import { Divider, Stack, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { Layouts } from "../../page.types";
import BarChartToolbar from "../BarChartToolbar/BarChartToolbar";
import LineChartToolbar from "../LineChartToolbar/LineChartToolbar";
import ReportToolbar from "../ReportToolbar/ReportToolbar";
import { useConfig } from "./helper";
import useFormHandlers from "./helper/useFormHandlers";
import useInitReports from "./helper/useInitReports";

const ReportWidget = () => {
    const theme = useTheme();
    // TODO split into two different components
    // TODO later we should move it to separate function everywhere
    const grid = useGridPlate();
    const isHidden = [Layouts.health_tools, Layouts.tools].includes(grid);
    const t = useTranslations();

    const { AOIConfig, TPTConfig, queryOptions, tools, AOI, TPT, timeFilter, visible } = useConfig();

    const { data: barChartData = [], isLoading: isAOI } = useFetchAoiStatisticsQuery(AOIConfig, queryOptions);
    const { data: lineChartData = { toolDataPoints: [], average: [] }, isLoading: isTPT } = useFetchThroughputDataQuery(
        TPTConfig,
        queryOptions
    );

    const allTools = tools.map(({ machineName, toolId }) => {
        return { value: String(toolId), text: String(machineName) };
    });

    const allErrors = predefinedErrors.map(error => {
        return { value: String(error), text: String(error) };
    });

    const { resetAOI, resetTPT } = useInitReports({ tools, AOI, TPT, tptData: lineChartData });

    const AOIValues = {
        selectedAOITools: AOI.selectedTools,
        selectedAOIErrors: AOI.selectedErrors,
        selectedAOIDate: AOI.selectedDateRange
    };

    const TPTValues = {
        selectedTPTTools: TPT.selectedTools,
        selectedTPTDate: TPT.selectedDateRange
    };

    const dateRange = {
        startDate: TPTConfig.startDate,
        endDate: TPTConfig.endDate
    };

    const defaultTimeValues = { timeFilter, visible };
    const { onSubmit: onSubmitTime, onSubmitAOIFilters, onSubmitTPTFilters } = useFormHandlers();

    const barChart = processBarChartData(barChartData, theme, { filter: AOI.selectedErrors });
    const grouping = groupingByRange(TPT.selectedDateRange);
    const lineChart = processLineChartData(lineChartData, theme, dateRange, t("average"), {
        toolsMap: tools,
        grouping
    });

    if (isHidden) return null;

    return (
        <Stack direction="column" gap={TPT.selectedTools.length > 6 ? 3 : 4}>
            <FormWrapper defaultValues={defaultTimeValues} onSubmit={onSubmitTime} mode="onChange">
                <ReportToolbar />
            </FormWrapper>
            <Divider />
            <FormWrapper defaultValues={AOIValues} onSubmit={onSubmitAOIFilters} mode="onChange">
                <BarChartToolbar
                    errorValues={allErrors}
                    toolsValues={allTools}
                    reset={resetAOI}
                    dateType={AOI.selectedDateType}
                />
            </FormWrapper>
            <Chart type="bar" props={{ data: barChart }} isLoading={isAOI} />
            <Divider />
            <FormWrapper defaultValues={TPTValues} onSubmit={onSubmitTPTFilters} mode="onChange">
                <LineChartToolbar toolsValues={allTools} reset={resetTPT} dateType={TPT.selectedDateType} />
            </FormWrapper>
            <Chart type="line" props={{ data: lineChart }} isLoading={isTPT} />
        </Stack>
    );
};

export default ReportWidget;
