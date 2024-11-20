import {
    ActiveElement,
    BarElement,
    CategoryScale,
    ChartEvent,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import zoomPlugin from "chartjs-plugin-zoom";
import { useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { BarChartProps, TooltipState, BarChartType } from "./BarChart.types";
import { CustomLegend, CustomTooltip } from "@/components";
import { useTheme } from "@mui/material";
import { convertBarChartDataToLegendLabels } from "../../helper";
import { useMouseInside } from "../../hooks/useMouseInside";
import { initChartData } from "../../Chart.types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, zoomPlugin, ChartDataLabels);

const BarChart = ({ data }: BarChartProps) => {
    const [tooltipInfo, setTooltipInfo] = useState<TooltipState>(initChartData);
    const theme = useTheme();
    const chartRef = useRef<BarChartType>(null);

    const onChartLeave = () => setTooltipInfo(item => ({ ...item, open: false }));
    useMouseInside(chartRef.current, onChartLeave);

    const isRight = Number(chartRef?.current?.width) / 2 < tooltipInfo.position.x;

    const options = {
        plugins: {
            // scroll problem caused because of tooltip
            // zoom: {
            //     zoom: {
            //         wheel: {
            //             enabled: true
            //         },
            //         pinch: {
            //             enabled: true
            //         },
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
                backgroundColor: "#FFF",
                bodyColor: "#0D3457",
                borderWidth: 0.5,
                borderColor: "#0D3457",
                enabled: false,
                position: "nearest" as const,
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
                const activeElement = elements[0];
                const datasetIndex = activeElement.datasetIndex;
                const index = activeElement?.index;
                const label = data?.datasets?.[datasetIndex]?.label;
                const value = data?.datasets?.[datasetIndex]?.data?.[index];
                const color = data?.datasets?.[datasetIndex]?.backgroundColor?.toString();
                const xDifference = Math.abs(tooltipInfo.position.x - (Number(event?.x) + 20));
                const yDifference = Math.abs(tooltipInfo.position.y - (Number(event?.y) - 20));

                if (
                    tooltipInfo.data.label !== label ||
                    tooltipInfo.data.value !== value ||
                    xDifference > 5 ||
                    yDifference > 5
                ) {
                    setTooltipInfo({
                        open: true,
                        data: { label, value, color },
                        position: {
                            x: Number(event?.x) + 25,
                            y: Number(event?.y) - 20
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
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: Number(theme.typography.body2.fontSize),
                        family: theme.typography.fontFamily
                    },
                    display: true,
                    drawTicks: false,
                    color: "#0B375A88"
                }
            },
            y: {
                stacked: true,
                beginAtZero: true,
                grid: {
                    display: true,
                    drawBorder: false,
                    drawTicks: true
                },
                border: { display: false },
                ticks: {
                    font: {
                        size: Number(theme.typography.body2.fontSize),
                        family: theme.typography.fontFamily
                    },
                    padding: 10,
                    maxTicksLimit: 6,
                    display: true,
                    drawTicks: false,
                    color: "#0B375A88"
                }
            }
        }
    };

    const legendLabels = convertBarChartDataToLegendLabels(data.datasets);

    return (
        <>
            <Bar ref={chartRef} data={data} options={options} style={{ marginLeft: "-10px" }} />
            <CustomLegend labels={legendLabels} />
            {tooltipInfo.open && (
                <CustomTooltip
                    tailDirection={isRight ? "right" : "left"}
                    style={{
                        left: tooltipInfo.position.x,
                        top: tooltipInfo.position.y,
                        background: tooltipInfo?.data?.color
                    }}
                >
                    {`${tooltipInfo?.data?.value} ${tooltipInfo?.data?.label}`}
                </CustomTooltip>
            )}
        </>
    );
};

export default BarChart;
