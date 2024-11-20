import { CustomTooltip } from "@/components";
import { initChartData } from "@/components/Chart/Chart.types";
import { TooltipState } from "@/components/Chart/components/BarChart/BarChart.types";
import useHover from "@/hooks/useHover";
import { Typography, useTheme } from "@mui/material";
import { ActiveElement, ArcElement, Chart, ChartEvent, ChartOptions, Legend, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Dot,
    OuterStyledStack,
    StyledBox,
    StyledLegendBox,
    StyledLegnedItem,
    StyledRectangle,
    StyledStack,
    StyledStackTotalTools,
    StylesGridLayout,
    StylesTotalTypography
} from "./DoughnutChart.styles";
import { DoughnutChartProps } from "./DoughnutChart.types";
import useGridPlate from "@/hooks/useGridPlate";
import { Layouts } from "../../page.types";

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DoughnutChart = ({ data, toolsCount, labels }: DoughnutChartProps) => {
    const t = useTranslations();
    const theme = useTheme();
    const [ref, hovering] = useHover<HTMLDivElement>();
    // TODO later we should move it to separate function everywhere
    const grid = useGridPlate();
    const isHealthExpand = Layouts.health_tools === grid;

    const [tooltipInfo, setTooltipInfo] = useState<TooltipState>(initChartData);

    useEffect(() => {
        if (!hovering)
            setTooltipInfo({
                ...tooltipInfo,
                data: { label: "", value: "", color: "" },
                open: false
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hovering]);

    const options: ChartOptions<"doughnut"> = {
        cutout: "85%",
        onHover: (event: ChartEvent, elements: ActiveElement[]) => {
            if (elements.length > 0) {
                const activeElement = elements[0];
                const datasetIndex = activeElement.datasetIndex;
                const index = activeElement?.index;
                const label = data?.labels?.[index];
                const value = data?.datasets?.[datasetIndex]?.data?.[index];
                const draftColor = data?.datasets?.[datasetIndex]?.backgroundColor;
                const color: string[] = Array.isArray(draftColor) ? draftColor : [draftColor] || [];
                const selectedColor = color?.[index];
                const xDifference = Math.abs(tooltipInfo.position.x - Number(event?.x));
                const yDifference = Math.abs(tooltipInfo.position.y - (Number(event?.y) - 30));

                if (xDifference > 5 || yDifference > 5) {
                    setTooltipInfo({
                        open: true,
                        data: { label, value, color: selectedColor },
                        position: {
                            x: Number(event?.x),
                            y: Number(event?.y) - 30
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
                borderWidth: 0
            }
        }
    };

    const legend = labels.filter(({ count }) => !!count);

    return (
        <OuterStyledStack
            isExpand={isHealthExpand}
            spacing={theme.spacing(2)}
            direction={isHealthExpand ? "row" : "column"}
        >
            <StylesGridLayout>
                <StyledStackTotalTools>
                    <StylesTotalTypography variant="h2">{toolsCount}</StylesTotalTypography>
                    <Typography>{t("total_tools")}</Typography>
                </StyledStackTotalTools>
                <StyledBox position="relative" ref={ref}>
                    <Doughnut data={data} options={options} />
                    {tooltipInfo.open && (
                        <CustomTooltip
                            tailDirection="top"
                            type="block"
                            style={{
                                left: tooltipInfo.position.x,
                                top: tooltipInfo.position.y
                            }}
                        >
                            <StyledStack>
                                <Dot color={tooltipInfo?.data?.color} />
                                <span>{Number(tooltipInfo?.data?.value)}</span>
                            </StyledStack>
                        </CustomTooltip>
                    )}
                </StyledBox>
            </StylesGridLayout>
            <StyledLegendBox isExpand={isHealthExpand}>
                {legend.map((item, index) => (
                    <StyledLegnedItem key={index}>
                        <StyledRectangle color={item.color}></StyledRectangle>
                        <Typography>{item.name}</Typography>
                    </StyledLegnedItem>
                ))}
            </StyledLegendBox>
        </OuterStyledStack>
    );
};

export default DoughnutChart;
