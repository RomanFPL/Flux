import apiClient from "./apiClient";

export interface AvailableViews {
    userID: number;
    value: { value: string };
}

/**
 * Fetches user preference state data for a specific user.
 *
 * @param userID - The ID of the user for whom the preference state is to be fetched.
 * @returns The preference state data fetched from the API.
 */
export const fetchUserPreferenceState = async (userID: string | number): Promise<AvailableViews> => {
    const url = `/users/preferencesstate/${encodeURIComponent(userID)}`;

    try {
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user preference state:", error);
        return { userID: Number(userID), value: { value: "" } };
    }
};

/**
 * Updates user preference state data for a specific user.
 *
 * @param preferenceData - The preference data to update which includes the userID and the preference values.
 * @returns The updated preference state data from the API.
 */
export const updateUserPreferenceState = async (preferenceData: {
    userID: number;
    value: { value: string };
}): Promise<any> => {
    const url = "/users/preferencesstate";

    try {
        const response = await apiClient.put(url, preferenceData);
        return response.data;
    } catch (error) {
        console.error("Failed to update user preference state:", error);
        throw error;
    }
};
