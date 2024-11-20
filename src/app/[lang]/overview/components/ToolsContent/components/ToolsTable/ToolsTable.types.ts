import { CustomDragEvent } from "../../ToolsContent.types";

/* eslint-disable no-unused-vars */
export interface ToolsTableProps {
    headData: string[];
    contentData: string[][];
    type?: "default" | "checkbox" | "status";
    handleDragStart: (event: CustomDragEvent, id: string) => void;
    handleDragOver: (event: CustomDragEvent, index: number) => void;
    handleDrop: (event: CustomDragEvent, destination_id: string) => void;
    handleDragEnd: () => void;
    location: DragLocation;
    dragId: string;
    dragOverIndex: number;
}

export enum StatusTableColumns {
    STATUS_COLOR = 0,
    NAME = 1,
    STATUS = 2,
    SECGEM = 3,
    ERROR_MSG = 4,
    ID = 5
}

export enum DragLocation {
    BEFORE = "BEFORE",
    AFTER = "AFTER",
    UNDEFINED = "UNDEFINED"
}

// ToolsTableCell
export interface ToolsTableCellProps {
    cellIndex: number;
    cell: string;
    id: string;
    dragged: boolean;
}
