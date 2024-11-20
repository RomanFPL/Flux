import { ToolInfoStatus } from "@/services/openApi/api";
import { Item } from "@/components/MultiselectButton/MultiselectButton.types";
import { getStatusFromGroup } from "@/utils/toolStatusUtils";

const normalizeSearchValue = (tool: ToolInfoStatus, searchValue?: string) =>
    tool.identity?.machineName?.toLowerCase().includes(String(searchValue?.toLowerCase()));

interface getFilteredToolsProps {
    data: ToolInfoStatus[];
    filter: { searchValue?: string; selectedStatusGroup?: Item[] };
}

const getToolsBySearchValue = ({ data, filter }: getFilteredToolsProps): ToolInfoStatus[] => {
    if (!data) return [];

    const { searchValue } = filter;

    const searchResults = searchValue ? data.filter(tool => normalizeSearchValue(tool, searchValue)) : data;

    const statusResult = searchResults.reduce((filteredTools: ToolInfoStatus[], tool: ToolInfoStatus) => {
        const toolStatusGroup = getStatusFromGroup(tool.toolStatus?.activeToolStatus);

        const searchGroup = filter.selectedStatusGroup?.find(({ value }) => value === toolStatusGroup);

        if (searchGroup) return [...filteredTools, tool];

        return filteredTools;
    }, []);

    return statusResult;
};

export default getToolsBySearchValue;
