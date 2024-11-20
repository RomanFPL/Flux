import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Checkbox from "../Checkbox/Checkbox";
import { CheckboxTable, StyledTable, StyledTableContainer, StyledTableRow } from "./Table.styled";
import { TableProps } from "./Table.types";
import FilterableTableCell from "./components/FilterableTableCell/FilterableTableCell";

const Table = ({
    headData,
    contentData,
    type = "default",
    selectedRows,
    handleSelectedRows,
    onPreviewClick,
    filtersData,
    filters,
    setFilters
}: TableProps) => {
    const allSelected = contentData.length === selectedRows?.length;

    const handleCheckboxChange = (rowId: string) => {
        if (!selectedRows) return;
        if (selectedRows?.includes(rowId)) {
            const newIds = selectedRows.filter(id => rowId !== id);
            handleSelectedRows?.(newIds);
        } else {
            handleSelectedRows?.([...selectedRows, rowId]);
        }
    };

    const handleHeadCheckboxChange = () => {
        if (allSelected) {
            handleSelectedRows?.([]);
        } else {
            const ids = contentData.map(([id]) => id);
            handleSelectedRows?.(ids);
        }
    };

    const parseDateFromDDMMYYYY = (dateString: string): Date => {
        const [day, month, year] = dateString.split("-").map(Number);
        return new Date(Date.UTC(year, month - 1, day));
    };
    const filteredData = contentData.filter(row => {
        return headData.every((column, colIndex) => {
            if (!column.filterType || !filters?.[column.name]) return true;

            const cellValue = row[colIndex];

            switch (column.filterType) {
                case "date":
                    if (cellValue) {
                        const cellDate = parseDateFromDDMMYYYY(cellValue);
                        const [startDate, endDate] = filters[column.name];
                        return cellDate >= new Date(startDate) && cellDate <= new Date(endDate);
                    }
                    return false;
                case "type":
                    if (Array.isArray(filters[column.name]) && !!filters[column.name]?.length) {
                        return filters[column.name].includes(cellValue);
                    }
                    return true;
                default:
                    return true;
            }
        });
    });

    if (type === "checkbox")
        return (
            <StyledTableContainer>
                <CheckboxTable>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox checked={allSelected} onChange={handleHeadCheckboxChange} />
                            </TableCell>
                            {headData.map((headCell, index) => (
                                <FilterableTableCell
                                    key={index}
                                    cellConfig={headCell}
                                    filtersData={filtersData}
                                    filters={filters}
                                    setFilters={setFilters}
                                />
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((row, rowIndex) => (
                            <StyledTableRow
                                key={rowIndex}
                                selected={selectedRows?.includes(row[0])}
                                onDoubleClick={event => onPreviewClick?.(event, row[0])}
                                onClick={() => handleCheckboxChange(row[0])}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedRows?.includes(row[0])}
                                        onChange={() => handleCheckboxChange(row[0])}
                                    />
                                </TableCell>
                                {row.map((cell, cellIndex) => (
                                    <TableCell
                                        onClick={event => cellIndex === 0 && onPreviewClick?.(event, row[0])}
                                        key={cellIndex}
                                    >
                                        {cell}
                                    </TableCell>
                                ))}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </CheckboxTable>
            </StyledTableContainer>
        );
    return (
        <StyledTable>
            <TableHead>
                <TableRow>
                    {headData.map((headCell, index) => (
                        <FilterableTableCell
                            key={index}
                            cellConfig={headCell}
                            filtersData={filtersData}
                            filters={filters}
                            setFilters={setFilters}
                        />
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {filteredData.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <TableCell
                                onClick={event => cellIndex === 0 && onPreviewClick?.(event, row[0])}
                                key={cellIndex}
                            >
                                {cell}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </StyledTable>
    );
};

export default Table;
