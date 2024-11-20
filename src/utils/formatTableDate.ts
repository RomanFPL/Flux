// TODO later check libs which can do it.

import { format } from "date-fns";

export const formatTableDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = String(date.getUTCFullYear()).slice(2); // Get last two digits
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

export const formatShortTableDate = (dateString?: string): string => {
    if (!dateString) return "";
    return format(new Date(dateString), "dd-MM-yyyy");
};
