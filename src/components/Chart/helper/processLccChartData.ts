import { DataPoint, LightLCCDataPoints } from "@/services/openApi/api";
import { Theme } from "@mui/material";
import { LineChartData } from "../Chart.types";
import { getLCCDataPoints } from "./getDataPoints";
import { getDaysDatasets, prepareToolDataPointsPerLight } from "./prepareToolDataPoints";

const processLccChartData = (data: LightLCCDataPoints[], theme: Theme): LineChartData => {
    if (!data) return { labels: [], datasets: [] };

    const combinedDataPoints: Array<DataPoint> = data.flatMap(item =>
        item.dataPoints ? item.dataPoints.filter((dp): dp is DataPoint => dp !== null && dp !== undefined) : []
    );

    const { labels } = getDaysDatasets(combinedDataPoints);
    const lccDataPoints = prepareToolDataPointsPerLight(data);
    const lccDataSet = getLCCDataPoints({ theme, dataRange: lccDataPoints });

    return {
        labels: labels,
        datasets: [...lccDataSet]
    };
};

export default processLccChartData;
