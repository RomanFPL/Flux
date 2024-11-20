import apiClient from "./apiClient";

/**
 * Fetches overall health status data for a specific date range.
 *
 * @param startDate - The start date for the health data.
 * @param endDate - The end date for the health data.
 * @returns The health data fetched from the API.
 */
export const fetchHealthData = async (startDate: string, endDate: string): Promise<any> => {
    const url = `/health/${encodeURIComponent(startDate)}/${encodeURIComponent(endDate)}`;

    try {
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch health data:", error);
        throw error;
    }
};
