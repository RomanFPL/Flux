import {
    fetchAoiStatisticsAction,
    fetchLogMessagesAction,
    fetchPredictToolDataAction,
    fetchThroughputDataAction,
    fetchToolDataAction,
    fetchToolMaintenanceDataAction,
    fetchToolsAction,
    fetchToolsStatusesAction,
    GraphDataActionArgs,
    LogMessagesActionArgs,
    PredictToolActionArgs,
    ToolDataActionArgs
} from "@/actions";
import useAutoFetch from "./useAutoFetch";

//TODO implement more complex way to fetch data
// Handle caching for every request
// Handle validation for provided arguments
// Implement prefetched data functionality
// Fix components rerender on every state change
// Handle conditional fetching

const interval = 10000;

const useOverviewFetching = () => {
    // TODO remove!!!
    const toolsIds: string[] = [];

    useAutoFetch(fetchToolsStatusesAction, undefined, {
        interval
    });

    useAutoFetch(fetchToolsAction);
    useAutoFetch<GraphDataActionArgs>(
        fetchAoiStatisticsAction,
        {
            startDate: "2024-05-14T09:27:04.103Z",
            endDate: "2024-05-26T09:27:13.355Z",
            toolIds: toolsIds
        },
        { interval }
    );
    useAutoFetch<GraphDataActionArgs>(
        fetchThroughputDataAction,
        {
            startDate: "2024-05-14T09:27:04.103Z",
            endDate: "2024-06-20T09:27:13.355Z",
            toolIds: toolsIds
        },
        { interval }
    );
};

const useToolFetching = (tool: string) => {
    useAutoFetch<ToolDataActionArgs>(
        fetchToolDataAction,
        {
            toolId: tool
        },
        { interval }
    );

    useAutoFetch<GraphDataActionArgs>(
        fetchAoiStatisticsAction,
        {
            startDate: "2024-05-14T09:27:04.103Z",
            endDate: "2024-05-26T09:27:13.355Z",
            toolIds: [tool]
        },
        { interval }
    );

    useAutoFetch<GraphDataActionArgs>(
        fetchThroughputDataAction,
        {
            startDate: "2024-05-14T09:27:04.103Z",
            endDate: "2024-06-20T09:27:13.355Z",
            toolIds: [tool]
        },
        { interval }
    );

    useAutoFetch<LogMessagesActionArgs>(
        fetchLogMessagesAction,
        {
            startDate: "2024-05-14T09:27:04.103Z",
            endDate: "2024-06-20T09:27:13.355Z",
            toolId: tool
        },
        { interval }
    );

    useAutoFetch<PredictToolActionArgs>(
        fetchPredictToolDataAction,
        {
            toolId: tool
        },
        { interval }
    );

    useAutoFetch<PredictToolActionArgs>(
        fetchToolMaintenanceDataAction,
        {
            toolId: tool
        },
        { interval }
    );
};

export { useOverviewFetching, useToolFetching };
