import apiClient from "./apiClient";
import { ToolLogMessage } from "./openApi";

/**
 * Fetches log messages data.
 *
 * @param {string} toolId - The specific tool ID.
 * @param {string} startDate - The start date for the log messages.
 * @param {string} endDate - The end date for the log messages.
 * @param {string} [severity] - The severity level of the log messages, optional.
 */
export const fetchLogMessagesData = async (
    toolId: string,
    startDate: string,
    endDate: string,
    severity?: string
): Promise<ToolLogMessage[]> => {
    let url = `/logmessages/${encodeURIComponent(toolId)}/${encodeURIComponent(startDate)}/${encodeURIComponent(endDate)}`;
    if (severity) {
        url += `/${encodeURIComponent(severity)}`;
    }

    try {
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch log messages data:", error);
        throw error;
    }
};
