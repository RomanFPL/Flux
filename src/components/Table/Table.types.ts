import { ServiceType } from "@/services/openApi";

export type HeadData = {
    name: string;
    filterType?: string;
};

export type FiltersData = {
    dateRange?: [string, string];
    types?: ServiceType[];
};

export interface TableProps {
    headData: HeadData[];
    contentData: string[][];
    type?: "default" | "checkbox" | "status";
    selectedRows?: Array<string>;
    handleSelectedRows?: (ids: Array<string>) => void;
    onPreviewClick?: (event: React.MouseEvent<HTMLTableCellElement | HTMLTableRowElement>, id: string) => void;
    filtersData?: FiltersData;
    filters?: { [key: string]: any };
    setFilters?: (newFilters: { [key: string]: any }) => void;
}
