import apiClient from "./apiClient";

/**
 * Fetches AOI statistics data.
 *
 * @param {string} startDate - The start date for the statistics.
 * @param {string} endDate - The end date for the statistics.
 * @param {string[]} toolIds - Array of tool IDs, optional.
 */
export const fetchAoiStatistics = async (startDate: string, endDate: string, toolIds?: string[]) => {
    let url = `/graphdata/aoistatistics/${encodeURIComponent(startDate)}/${encodeURIComponent(endDate)}`;
    if (toolIds && toolIds.length > 0) {
        url += `/${toolIds.map(id => encodeURIComponent(id)).join(",")}`;
    }

    try {
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch AOI statistics:", error);
        throw error;
    }
};

/**
 * Fetches LCC data for a specific tool and light type over a date range.
 *
 * @param toolid - The specific tool ID.
 * @param lightType - The type of light data being requested.
 * @param startDate - The start date for the LCC data.
 * @param endDate - The end date for the LCC data.
 */
export const fetchLccData = async (
    toolid: string,
    lightType: string,
    startDate: string,
    endDate: string
): Promise<any> => {
    const url = `/graphdata/lcc/${encodeURIComponent(toolid)}/${encodeURIComponent(lightType)}/${encodeURIComponent(startDate)}/${encodeURIComponent(endDate)}`;

    try {
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch LCC data:", error);
        throw error;
    }
};

interface QueryParams {
    worstToolsCount?: number;
}

/**
 * Fetches throughput data, wafer per hour, over a date range.
 *
 * @param startDate - The start date for the throughput data.
 * @param endDate - The end date for the throughput data.
 * @param toolIds - Array of tool IDs, optional.
 * @param worstToolsCount - Number of worst tools to display
 */
export const fetchThroughputData = async (
    startDate: string,
    endDate: string,
    toolIds?: string[],
    worstToolsCount?: number
): Promise<any> => {
    let url = `/graphdata/tpt/${encodeURIComponent(startDate)}/${encodeURIComponent(endDate)}`;
    if (toolIds && toolIds.length > 0) {
        url += `/${toolIds.map(id => encodeURIComponent(id)).join(",")}`;
    }

    const queryParams: QueryParams = {};
    if (worstToolsCount !== undefined) {
        queryParams.worstToolsCount = worstToolsCount;
    }

    try {
        const response = await apiClient.get(url, { params: queryParams });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch throughput data:", error);
        throw error;
    }
};

/**
 * Fetches yield data over a date range.
 *
 * @param startDate - The start date for the yield data.
 * @param endDate - The end date for the yield data.
 * @param toolIds - Array of tool IDs, optional.
 */
export const fetchYieldData = async (startDate: string, endDate: string, toolIds?: string[]): Promise<any> => {
    let url = `/graphdata/yield/${encodeURIComponent(startDate)}/${encodeURIComponent(endDate)}`;
    if (toolIds && toolIds.length > 0) {
        url += `/${toolIds.map(id => encodeURIComponent(id)).join(",")}`;
    }

    try {
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch yield data:", error);
        throw error;
    }
};
