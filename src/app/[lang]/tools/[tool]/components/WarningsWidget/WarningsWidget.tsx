import { Loading, Table } from "@/components";
import FormWrapper from "@/components/FormWrapper/FormWrapper";
import useToolGridPlate from "@/hooks/useToolGridPlate";
import { NoWarningsFound } from "@/icons";
import { useFetchLogMessagesQuery } from "@/redux/slices/apiSlice";
import {
    updateWarningMaximize,
    updateWarningSelectedDateRange,
    updateWarningSelectedDateType,
    updateWarningSelectedSeverities,
    updateWarningVisibility
} from "@/redux/slices/toolsWarningSlice";
import { ToolLayouts } from "@/types/slices.types";
import { Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import WarningsBar from "../WarningsToolbar/WarningsToolbar";
import { StylesTypography } from "./WarningsWidget.styled";
import { WarningsFormData, WarningsWidgetProps } from "./WarningsWidget.types";
import { normalizeLogData, useConfig, useInitWarnings } from "./helper";

const NUM_LATEST_WARNINGS = 4;

const WarningsWidget = ({ toolId }: WarningsWidgetProps) => {
    const dispatch = useDispatch();
    const t = useTranslations();
    const grid = useToolGridPlate(toolId);
    const isHidden = [ToolLayouts.main, ToolLayouts.main_reports].includes(grid);

    const {
        maximize,
        visible,
        selectedDateType,
        selectedDateRange,
        config,
        queryOptions,
        defaultValues,
        defaultWidgetTool
    } = useConfig(toolId);

    const { data: logMessages = [], isLoading: isLogMessages } = useFetchLogMessagesQuery(config, queryOptions);
    const logHeaders = [{ name: t("date") }, { name: t("severity") }, { name: t("message") }];
    const logData = normalizeLogData(logMessages);

    const displayedLogData = maximize ? logData : logData.slice(0, NUM_LATEST_WARNINGS);
    const logLength = maximize ? logMessages.length : NUM_LATEST_WARNINGS;

    const { reset } = useInitWarnings({ toolId, visible: visible ?? true, maximize: maximize ?? false });

    const onSubmitForm = (data: WarningsFormData) => {
        const severities = data.maximize ? data.selectedSeverities : defaultWidgetTool?.selectedSeverities ?? [];
        const dateRange = data.maximize ? data.selectedDateRange : defaultWidgetTool?.selectedDateRange ?? ["", ""];
        dispatch(updateWarningVisibility({ id: toolId, visible: data.visible }));
        dispatch(updateWarningMaximize({ id: toolId, maximize: data.maximize }));
        dispatch(updateWarningSelectedSeverities({ id: toolId, severities: severities }));
        if (JSON.stringify(dateRange) !== JSON.stringify(selectedDateRange)) {
            dispatch(updateWarningSelectedDateRange({ id: toolId, range: dateRange }));
            const isMaximizedChange = JSON.stringify(data.maximize) !== JSON.stringify(maximize);
            const dateType = isMaximizedChange ? defaultWidgetTool?.selectedDateType ?? null : null;
            dispatch(updateWarningSelectedDateType({ id: toolId, type: dateType }));
        }
    };

    if (isHidden) return null;

    return (
        <Stack spacing={4} height="100%">
            <FormWrapper defaultValues={defaultValues} onSubmit={onSubmitForm} mode="onChange">
                <WarningsBar
                    severityValue={defaultWidgetTool?.selectedSeverities ?? []}
                    dateType={selectedDateType}
                    warningNumber={logLength}
                    reset={reset}
                />
            </FormWrapper>
            <Loading loading={isLogMessages}>
                {logMessages.length ? (
                    <Table headData={logHeaders} contentData={displayedLogData} />
                ) : (
                    <Stack justifyContent="center" alignItems="center" height="80%">
                        <Stack direction="row" gap={3} alignItems="center">
                            <NoWarningsFound />
                            <StylesTypography>{t("no_warnings")}</StylesTypography>
                        </Stack>
                    </Stack>
                )}
            </Loading>
        </Stack>
    );
};

export default WarningsWidget;
