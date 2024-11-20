import { TableCell } from "@mui/material";
import DateFilter from "../TableCellDateFilter/DateFilter";
import { FiltersData } from "../../Table.types";
import TypeFilter from "../TypeFilter/TypeFilter";

interface TableColumnConfig {
    name: string;
    filterType?: string;
}

interface FilterableTableCellProps {
    cellConfig: TableColumnConfig;
    filtersData?: FiltersData;
    filters?: { [key: string]: any };
    setFilters?: (newFilters: { [key: string]: any }) => void;
}

const FilterableTableCell = ({ cellConfig, filtersData, setFilters, filters }: FilterableTableCellProps) => {
    const dateRange = !!filtersData?.dateRange?.length ? filtersData?.dateRange : [];
    const types = !!filtersData?.types?.length ? filtersData?.types : [];

    const handleFilterChange = (columnName: string, value: any) => {
        setFilters?.((prevFilters: any) => ({
            ...prevFilters,
            [columnName]: value
        }));
    };

    const isDateRangeDifferent = (filterRange: string[] = []) => {
        if (!filterRange.length) return false;

        const getDateOnly = (dateStr: string) => new Date(dateStr).toISOString().split("T")[0];

        return (
            getDateOnly(filterRange[0]) !== getDateOnly(dateRange[0]) ||
            getDateOnly(filterRange[1]) !== getDateOnly(dateRange[1])
        );
    };

    const isTypeFilterDifferent = (selectedTypes: string[] = []) => {
        if (!selectedTypes.length) return false;

        return types.some(type => !selectedTypes.includes(type)) || selectedTypes.length !== types.length;
    };

    switch (cellConfig.filterType) {
        case "date":
            return (
                <TableCell>
                    {dateRange && (
                        <DateFilter
                            dateRange={filters?.[cellConfig.name] || dateRange}
                            withFilterIcon={isDateRangeDifferent(filters?.[cellConfig.name])}
                            onDateChange={range => handleFilterChange(cellConfig.name, range)}
                        >
                            {cellConfig.name}
                        </DateFilter>
                    )}
                </TableCell>
            );
        case "type":
            return (
                <TableCell sx={{ position: "relative" }}>
                    <TypeFilter
                        items={types.map(type => ({ value: type, text: type }))}
                        withFilterIcon={isTypeFilterDifferent(filters?.[cellConfig.name])}
                        selectedItems={filters?.[cellConfig.name] || []}
                        setSelectedItems={selectedItems => handleFilterChange(cellConfig.name, selectedItems)}
                    >
                        {cellConfig.name}
                    </TypeFilter>
                </TableCell>
            );
        default:
            return <TableCell>{cellConfig.name}</TableCell>;
    }
};

export default FilterableTableCell;
