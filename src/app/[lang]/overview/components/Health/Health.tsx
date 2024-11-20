import { Divider, Typography } from "@mui/material";

import FormWrapper from "@/components/FormWrapper/FormWrapper";
import { pollingInterval } from "@/config";
import useGridPlate from "@/hooks/useGridPlate";
import { useFetchHealthQuery } from "@/redux/slices/apiSlice";
import { updateDateFilter, updateHealthVisibility } from "@/redux/slices/healthSlice";
import { RootState } from "@/redux/store";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { Layouts } from "../../page.types";
import { useProcessDoughnutChartData } from "../DoughnutChart/helper";
import PieChart from "./components/PieChart/PieChart";
import { HealthFormData } from "./components/Statistics/Statistics.types";
import { StyledBoxOuter } from "./Health.styled";
import HealthStatistics from "./HealthStatistics";

const Health = () => {
    const dispatch = useDispatch();
    const t = useTranslations();
    // TODO later we should move it to separate function everywhere
    const grid = useGridPlate();
    const isHidden = [Layouts.tools, Layouts.reports_tools].includes(grid);

    const { dateFilter, dateRange, visible } = useSelector((state: RootState) => state.health);
    const [startDate, endDate] = dateRange;

    const { data: health = {} } = useFetchHealthQuery({ startDate, endDate }, { pollingInterval });

    const chartData = useProcessDoughnutChartData(health);

    const defaultValues = { selectedTimeFilter: dateFilter, visible };

    const onSubmitForm = ({ selectedTimeFilter, visible }: HealthFormData) => {
        dispatch(updateDateFilter(selectedTimeFilter));
        dispatch(updateHealthVisibility(visible));
    };

    if (isHidden) return null;

    return (
        <StyledBoxOuter component="section">
            <Typography style={{ position: "absolute", top: 0, left: 0 }} variant="h3">
                {t("health")}
            </Typography>
            <PieChart chartData={chartData} totalTools={health.totalTools} />
            <Divider orientation="vertical" flexItem />
            <FormWrapper defaultValues={defaultValues} onSubmit={onSubmitForm} mode="onChange">
                <HealthStatistics {...{ dateFilter, dateRange }} />
            </FormWrapper>
            <div />
        </StyledBoxOuter>
    );
};

export default Health;
