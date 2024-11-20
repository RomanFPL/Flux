import { useTranslations } from "next-intl";
import DoughnutChart from "../../../DoughnutChart/DoughnutChart";
import { StyledGraphTypography, StyledGraphTypographyExpand, StylesGraphStack } from "./PieChart.styled";
import { PieChartProps } from "./PieChart.types";
import useGridPlate from "@/hooks/useGridPlate";
import { Layouts } from "../../../../page.types";

const PieChart = ({ chartData: { data, labels }, totalTools }: PieChartProps) => {
    const t = useTranslations();
    // TODO later we should move it to separate function everywhere
    const grid = useGridPlate();
    const isHealthExpand = Layouts.health_tools === grid;
    const GrapthTypography = isHealthExpand ? StyledGraphTypographyExpand : StyledGraphTypography;
    return (
        <StylesGraphStack>
            <GrapthTypography variant="body2">{t("current_status")}</GrapthTypography>
            <DoughnutChart data={data} labels={labels} toolsCount={totalTools} />
        </StylesGraphStack>
    );
};

export default PieChart;
