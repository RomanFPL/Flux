import { OverallHealthStatus } from "@/services/openApi";
import { useTheme } from "@mui/material";
import { ChartData } from "chart.js";
import { useTranslations } from "next-intl";
import { ChartDataLabels } from "./DoughnutChart.types";

export const useProcessDoughnutChartData = (
    healthData: OverallHealthStatus
): {
    data: ChartData<"doughnut", number[], string>;
    labels: ChartDataLabels[];
} => {
    const t = useTranslations();
    const theme = useTheme();
    const { toolUp, toolDown, maintenance } = theme.palette.status;
    const healthMap = [
        {
            count: Number(healthData?.toolsInProduction),
            name: t("toolsUp"),
            color: toolUp
        },
        {
            count: Number(healthData?.toolsDown),
            name: t("toolsDown"),
            color: toolDown
        },
        {
            count: Number(healthData?.toolsInMaintenance),
            name: t("toolsMaint"),
            color: maintenance
        }
    ];

    const preparedLabels = healthMap.filter(({ count }) => !!count).map(({ name }) => name);

    const data: ChartData<"doughnut", number[], string> = {
        labels: preparedLabels,
        datasets: [
            {
                data: healthMap.map(({ count }) => count),
                backgroundColor: healthMap.map(({ color }) => color),
                hoverBackgroundColor: healthMap.map(({ color }) => color),
                hoverBorderColor: healthMap.map(({ color }) => color)
            }
        ]
    };

    return { data, labels: healthMap };
};
