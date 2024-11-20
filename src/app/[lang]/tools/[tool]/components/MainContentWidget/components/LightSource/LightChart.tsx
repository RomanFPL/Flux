import { LightSymbol } from "@/icons";
import { useTheme } from "@mui/material";
import { ArcElement, Chart, ChartData, ChartOptions, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";
import { StyledBox, StyledStackTotalTools, StylesGridLayout } from "./LightChart.styles";
import { LightChartProps } from "./LightChart.types";

Chart.register(ArcElement, Legend, ChartDataLabels);

const LightChart = ({
    currentLifeTime,
    maxLifeTime,
    recommendedReplacement,
    necessaryReplacement,
    capacityLeft,
    chartWidth
}: LightChartProps) => {
    const theme = useTheme();
    const currentCapacity = capacityLeft ? 100 - capacityLeft : 100;

    const getColor = () => {
        const recRepPer = recommendedReplacement ? recommendedReplacement * 100 : 0;
        const necRepPer = necessaryReplacement ? necessaryReplacement * 100 : 0;

        if (currentCapacity) {
            if (recRepPer && currentCapacity < recRepPer) {
                return theme.palette.status.toolUp;
            } else if (recRepPer && currentCapacity >= recRepPer && necRepPer && currentCapacity < necRepPer) {
                return theme.palette.status.maintenance;
            } else if (necRepPer && currentCapacity >= necRepPer) {
                return theme.palette.status.toolDown;
            } else {
                return theme.palette.status.toolDown;
            }
        } else {
            return theme.palette.status.toolUp;
        }
    };

    const data: ChartData<"doughnut", number[], string> = {
        datasets: [
            {
                data: [
                    (maxLifeTime ? maxLifeTime : 0) - (currentLifeTime ? currentLifeTime : 0),
                    currentLifeTime ? currentLifeTime : 0
                ],
                // 66 = 40% opacity
                backgroundColor: [getColor(), `#${getColor().split("#")[1]}66`],
                // remove default highlight color on hover
                hoverBackgroundColor: [getColor(), `#${getColor().split("#")[1]}66`],
                hoverBorderColor: [getColor(), `#${getColor().split("#")[1]}66`]
            }
        ]
    };

    const options: ChartOptions<"doughnut"> = {
        cutout: "85%",
        plugins: {
            datalabels: {
                display: false
            },
            legend: {
                display: false
            },
            tooltip: { enabled: false }
        },
        elements: {
            arc: {
                borderWidth: 0,
                // remove default highlight color on hover
                hoverBackgroundColor: [getColor(), `#${getColor().split("#")[1]}66`],
                hoverBorderColor: [getColor(), `#${getColor().split("#")[1]}66`]
            }
        }
    };

    return (
        <StylesGridLayout>
            <StyledStackTotalTools>
                <LightSymbol></LightSymbol>
            </StyledStackTotalTools>
            <StyledBox width={chartWidth}>
                <Doughnut data={data} options={options}></Doughnut>
            </StyledBox>
        </StylesGridLayout>
    );
};

export default LightChart;
