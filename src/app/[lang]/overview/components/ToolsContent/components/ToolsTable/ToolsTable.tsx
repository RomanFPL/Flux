import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { forwardRef } from "react";
import {
    StatusTable,
    StyledDragTableRow,
    StyledDropZoneAfter,
    StyledDropZoneBefore,
    StyledStatusTableContainer
} from "./ToolsTable.styled";
import { DragLocation, StatusTableColumns, ToolsTableProps } from "./ToolsTable.types";
import ToolsTableCell from "./ToolsTableCell";

const ToolsTable = forwardRef<HTMLTableSectionElement, ToolsTableProps>(
    (
        {
            headData,
            contentData,
            handleDragStart,
            handleDragOver,
            handleDrop,
            handleDragEnd,
            location,
            dragId,
            dragOverIndex
        },
        ref
    ) => {
        const colWidth = ["5%", "15%", "15%", "15%", "50%"];

        return (
            <StyledStatusTableContainer>
                <StatusTable>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            {headData.map((headCell, index) => (
                                <TableCell
                                    style={{
                                        width: colWidth[index + 1]
                                    }}
                                    key={index}
                                >
                                    {headCell}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody ref={ref}>
                        {contentData.map((row, rowIndex) => (
                            <StyledDragTableRow
                                key={rowIndex}
                                draggable
                                onDragEnd={handleDragEnd}
                                onDragStart={event => handleDragStart(event, row[StatusTableColumns.ID])}
                                onDragOver={event => handleDragOver(event, rowIndex)}
                                onDrop={event => handleDrop(event, row[StatusTableColumns.ID])}
                                dragged={row[StatusTableColumns.ID] === dragId}
                            >
                                {row.map((cell, cellIndex) => {
                                    if (cellIndex === StatusTableColumns.ID) return;
                                    return (
                                        <ToolsTableCell
                                            key={cellIndex}
                                            cellIndex={cellIndex}
                                            cell={cell}
                                            id={row[StatusTableColumns.ID]}
                                            dragged={"" !== dragId} // some element is being dragged
                                        />
                                    );
                                })}
                                {DragLocation.BEFORE === location && rowIndex === dragOverIndex && (
                                    <TableCell>
                                        <StyledDropZoneBefore />
                                    </TableCell>
                                )}
                                {DragLocation.AFTER === location && rowIndex === dragOverIndex && (
                                    <TableCell>
                                        <StyledDropZoneAfter />
                                    </TableCell>
                                )}
                            </StyledDragTableRow>
                        ))}
                    </TableBody>
                </StatusTable>
            </StyledStatusTableContainer>
        );
    }
);

ToolsTable.displayName = "ToolsTable";

export default ToolsTable;
