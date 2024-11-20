import { Loading } from "@/components";
import dynamic from "next/dynamic";
import { ChartContainer } from "./Chart.styled";
import { ChartProps } from "./Chart.types";

const BarChart = dynamic(() => import("./components/BarChart/BarChart"), {
    ssr: false
});
const LineChart = dynamic(() => import("./components/LineChart/LineChart"), {
    ssr: false
});

const Chart = (props: ChartProps) => {
    return (
        <ChartContainer {...props.props}>
            <Loading loading={!!props.isLoading}>
                {props.type === "bar" && <BarChart {...props.props} />}
                {props.type === "line" && <LineChart {...props.props} />}
            </Loading>
        </ChartContainer>
    );
};

export default Chart;
