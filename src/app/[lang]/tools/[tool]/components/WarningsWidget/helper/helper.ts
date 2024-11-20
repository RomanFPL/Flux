import { Item } from "@/components/MultiselectButton/MultiselectButton.types";
import { ToolLogMessage } from "@/services/openApi";
import { formatTableDate } from "@/utils/formatTableDate";

export const normalizeLogData = (data: ToolLogMessage[]): string[][] => {
    return [...data]
        .sort(
            (a, b) => new Date(a?.log?.eventDateTime || "").getTime() - new Date(b?.log?.eventDateTime || "").getTime()
        )
        .map(item => {
            if (!item) return [];
            return [
                formatTableDate(item.log?.eventDateTime || ""),
                item.log?.severity || "",
                item.log?.longMessage || ""
            ];
        });
};

export const prepareSeverity = (severities: Item[] | undefined) => {
    const hasError = severities?.some(severity => severity.value === "Error");
    const hasWarning = severities?.some(severity => severity.value === "Warning");
    if (hasError && hasWarning) {
        return "All";
    }
    if (hasError && !hasWarning) {
        return "Error";
    }
    if (!hasError && hasWarning) {
        return "Warning";
    }
    if (!hasError && !hasWarning) {
        return "None";
    }
    return "None";
};
