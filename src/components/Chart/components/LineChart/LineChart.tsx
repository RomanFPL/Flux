import { CustomLegend, CustomTooltip } from "@/components";
import { Stack } from "@mui/material";
import {
    ActiveElement,
    CategoryScale,
    ChartEvent,
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip
} from "chart.js";
import { useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { initChartData } from "../../Chart.types";
import { convertLineChartDataToLegendLabels } from "../../helper";
import { useMouseInside } from "../../hooks/useMouseInside";
import { LineChartProps, LineChartType, TooltipState } from "./LineChart.types";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({
    data,
    withLegend = true,
    withDivider = true,
    withVerticalLines = false,
    withPoints = false,
    zoom
}: LineChartProps) => {
    const [tooltipInfo, setTooltipInfo] = useState<TooltipState>(initChartData);

    const chartRef = useRef<LineChartType>(null);
    const onChartLeave = () => setTooltipInfo(item => ({ ...item, open: false }));
    useMouseInside(chartRef.current, onChartLeave);

    const options = {
        plugins: {
            // zoom: {
            //     zoom: {
            //         enabled: true,
            //         mode: "x" as const
            //     },
            //     pan: {
            //         enabled: true,
            //         mode: "x" as const
            //     }
            // },
            legend: {
                display: false,
                position: "bottom" as const,
                align: "start" as const,
                labels: {
                    boxHeight: 12,
                    pointStyle: "rectRounded",
                    usePointStyle: true,
                    color: "#0B375A",
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                backgroundColor: "",
                enabled: false,
                position: "average" as const,
                mode: "nearest" as const,
                displayColors: false,
                padding: 10,
                callbacks: {
                    title: function () {
                        return "";
                    }
                }
            },
            datalabels: {
                display: false,
                color: "black" as const
            }
        },
        onHover: (event: ChartEvent, elements: ActiveElement[]) => {
            if (elements.length > 0) {
                const { x: xElemPosition, y: yElemPosition } = elements?.[0]?.element;
                const activeElement = elements[0];
                const datasetIndex = activeElement.datasetIndex;
                const index = activeElement?.index;
                const label = data?.labels?.[index];
                const value = data?.datasets?.[datasetIndex]?.data?.[index];
                const color = data?.datasets?.[datasetIndex]?.backgroundColor?.toString();
                const xDifference = Math.abs(tooltipInfo.position.x - (Number(event?.x) + 20));
                const yDifference = Math.abs(tooltipInfo.position.y - (Number(event?.y) - 20));

                if (
                    tooltipInfo.data.label !== label ||
                    tooltipInfo.data.value !== value ||
                    xDifference > 10 ||
                    yDifference > 10
                ) {
                    setTooltipInfo({
                        open: true,
                        data: { label, value, color },
                        position: {
                            x: Number(xElemPosition) + 20,
                            y: Number(yElemPosition) - 20
                        }
                    });
                }
            } else if (tooltipInfo.open) {
                setTooltipInfo({
                    ...tooltipInfo,
                    data: { label: "", value: "", color: "" },
                    open: false
                });
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            point: {
                radius: 6,
                hoverRadius: 6,
                hoverBorderWidth: 3,
                hoverBackgroundColor: "#FFFFFF",
                hoverBorderColor: (context: any) => {
                    const dataset = context?.dataset;
                    return dataset?.borderColor || "";
                },
                pointBorderColor: (context: any) => {
                    const dataset = context?.dataset;
                    return withPoints ? dataset?.borderColor || "" : "#FFFFFF00";
                },
                pointBackgroundColor: (context: any) => {
                    const dataset = context?.dataset;
                    return withPoints ? dataset?.borderColor || "" : "#FFFFFF00";
                }
            }
        },
        scales: {
            x: {
                stacked: false,
                grid: {
                    display: withVerticalLines
                },
                ticks: {
                    display: true,
                    drawTicks: false,
                    color: "#0B375A88"
                }
            },
            y: {
                stacked: false,
                beginAtZero: true,
                grid: {
                    display: true,
                    drawBorder: false,
                    drawTicks: true
                },
                border: { display: false },
                ticks: {
                    padding: 10,
                    maxTicksLimit: 7,
                    display: true,
                    drawTicks: false,
                    color: "#0B375A88"
                }
            }
        }
    };

    const legendLabels = convertLineChartDataToLegendLabels(data.datasets);

    return (
        <Stack height={"100%"}>
            <Line ref={chartRef} data={data} options={options} style={{ marginLeft: "-10px" }} />
            {withLegend && <CustomLegend withDivider={withDivider} labels={legendLabels} />}
            {tooltipInfo.open && (
                <CustomTooltip
                    tailDirection="top"
                    style={{
                        left: tooltipInfo.position.x,
                        top: tooltipInfo.position.y,
                        background: tooltipInfo?.data?.color
                    }}
                >
                    <Stack gap={2} flexDirection="row">
                        <span>{tooltipInfo?.data?.label}</span>
                        <span>|</span>
                        <span>{Number(tooltipInfo?.data?.value)?.toFixed(2)}</span>
                    </Stack>
                </CustomTooltip>
            )}
        </Stack>
    );
};

export default LineChart;
