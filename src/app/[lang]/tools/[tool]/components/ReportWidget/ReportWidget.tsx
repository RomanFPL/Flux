import { Chart } from "@/components";
import processBarChartData from "@/components/Chart/helper/processBarChartData";
import processLccChartData from "@/components/Chart/helper/processLccChartData";
import processLineChartData from "@/components/Chart/helper/processLineChartData";
import FormWrapper from "@/components/FormWrapper/FormWrapper";
import useToolGridPlate from "@/hooks/useToolGridPlate";
import { useFetchAoiStatisticsQuery, useFetchLccDataQuery, useFetchThroughputDataQuery } from "@/redux/slices/apiSlice";
import { ToolIdentity } from "@/services/openApi";
import { predefinedErrors } from "@/types/error.types";
import { predefinedGraphs } from "@/types/graph.types";
import { ToolLayouts } from "@/types/slices.types";
import { groupingByRange } from "@/utils/dateRanges";
import { Divider, Stack, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import AOIChartToolbar from "../AOIChartToolbar/AOIChartToolbar";
import LCCChartToolbar from "../LCCChartToolbar/LCCChartToolbar";
import NoGraphs from "../NoGraphs/NoGraphs";
import ReportToolbar from "../ReportToolbar/ReportToolbar";
import TPTChartToolbar from "../TPTChartToolbar/TPTChartToolbar";
import { useConfig, useInitReports } from "./helper";
import useFormHandlers from "./helper/useFormHandlers";
import { ReportWidgetProps } from "./ReportWidget.types";

const ReportWidget = ({ toolId }: ReportWidgetProps) => {
    const theme = useTheme();
    const t = useTranslations();
    const {
        AOIConfig,
        TPTConfig,
        LCCConfig,
        queryOptions,
        tool,
        AOI,
        TPT,
        LCC,
        timeFilter,
        visible,
        selectedGraphs,
        graphDisplayed,
        numGraphDisplayed,
        isLccMax
    } = useConfig(toolId);

    const grid = useToolGridPlate(toolId);
    const isHidden = [ToolLayouts.main, ToolLayouts.main_warnings, ToolLayouts.warnings].includes(grid);

    const { data: barChartData = [], isLoading: isAOI } = useFetchAoiStatisticsQuery(AOIConfig, queryOptions);
    const { data: lineChartData = { toolDataPoints: [], average: [] }, isLoading: isTPT } = useFetchThroughputDataQuery(
        TPTConfig,
        queryOptions
    );
    const { data: lccChartData = [], isLoading: isLCC } = useFetchLccDataQuery(LCCConfig, queryOptions);

    const allErrors = predefinedErrors.map(error => {
        return { value: String(error), text: String(error) };
    });

    const allGraphs = predefinedGraphs.map(graph => {
        return { value: String(graph), text: String(graph) };
    });

    const dateRange = {
        startDate: TPTConfig.startDate,
        endDate: TPTConfig.endDate
    };

    const { resetAOI, resetTPT, resetLCC } = useInitReports(toolId);

    const AOIValues = {
        selectedAOIErrors: AOI?.selectedErrors,
        selectedAOIDate: AOI?.selectedDateRange
    };

    const TPTValues = {
        selectedTPTDate: TPT?.selectedDateRange
    };

    const LCCValues = {
        lightType: LCC?.lightType,
        timeFilter: LCC?.timeFilter,
        zoom: LCC?.zoom,
        maximize: LCC?.maximize
    };

    const defaultTimeValues = { timeFilter, visible, selectedGraphs };
    const { onSubmit, onSubmitAOIFilters, onSubmitTPTFilters, onSubmitLCCFilters } = useFormHandlers();

    const barChart = processBarChartData(barChartData, theme, { filter: AOI?.selectedErrors });
    const grouping = groupingByRange(TPT?.selectedDateRange as [string, string]);
    const lineChart = processLineChartData(lineChartData, theme, dateRange, t("average"), {
        toolsMap: [tool.identity] as ToolIdentity[],
        grouping,
        averageOnly: true
    });
    const lccChart = processLccChartData(lccChartData, theme);

    const renderGeneralToolBar = () => {
        return (
            <>
                <FormWrapper defaultValues={defaultTimeValues} onSubmit={onSubmit} mode="onChange">
                    <ReportToolbar graphValues={allGraphs} />
                </FormWrapper>
                <Divider />
            </>
        );
    };

    const renderAOIGrpah = () => {
        return (
            <>
                <FormWrapper defaultValues={AOIValues} onSubmit={onSubmitAOIFilters} mode="onChange">
                    <AOIChartToolbar errorValues={allErrors} dateType={AOI?.selectedDateType} reset={resetAOI} />
                </FormWrapper>
                <Chart type="bar" props={{ data: barChart, withLegend: true }} isLoading={isAOI} />
            </>
        );
    };

    const renderTPTGraph = () => {
        return (
            <>
                <FormWrapper defaultValues={TPTValues} onSubmit={onSubmitTPTFilters} mode="onChange">
                    <TPTChartToolbar dateType={TPT?.selectedDateType} reset={resetTPT} />
                </FormWrapper>
                <Chart type="line" props={{ data: lineChart, withLegend: false }} isLoading={isTPT} />
            </>
        );
    };

    const renderLCCGraph = () => {
        return (
            <>
                <FormWrapper defaultValues={LCCValues} onSubmit={onSubmitLCCFilters} mode="onChange">
                    <LCCChartToolbar reset={resetLCC} />
                </FormWrapper>
                <Chart
                    type="line"
                    props={{
                        data: lccChart,
                        withLegend: true,
                        withDivider: false,
                        withVerticalLines: true,
                        withPoints: true,
                        zoom: LCC?.zoom
                    }}
                    isLoading={isLCC}
                />
            </>
        );
    };

    if (isHidden) return null;

    return (
        <Stack direction="column" gap={4} height={"100%"}>
            {!isLccMax && renderGeneralToolBar()}
            {graphDisplayed.aoi && !isLccMax && renderAOIGrpah()}
            {graphDisplayed.aoi && (graphDisplayed.tpt || graphDisplayed.lcc) && !isLccMax && <Divider />}
            {graphDisplayed.tpt && !isLccMax && renderTPTGraph()}
            {!graphDisplayed.aoi && graphDisplayed.tpt && graphDisplayed.lcc && !isLccMax && <Divider />}
            {graphDisplayed.lcc && renderLCCGraph()}
            {numGraphDisplayed < 2 && !isLccMax && <NoGraphs numberGraphs={numGraphDisplayed} />}
        </Stack>
    );
};

export default ReportWidget;
