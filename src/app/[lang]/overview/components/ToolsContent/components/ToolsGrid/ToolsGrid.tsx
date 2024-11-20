import React from "react";
import { Grid } from "@mui/material";
import { DragLocation } from "../ToolsTable/ToolsTable.types";
import { StyledDropZoneAfter, StyledDropZoneBefore, StyledGridItem } from "./ToolsGrid.styled";
import { ToolCard } from "../../../../../../../components";

interface ToolGridProps {
    sortedFilteredTools: any[];
    isToolsExpand: boolean;
    isExpandView: boolean;
    dragId: string;
    dragOverIndex: number;
    location: DragLocation;
    handleDragStart: (event: React.DragEvent<HTMLDivElement>, id: string) => void;
    handleDragOver: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
    handleDrag: (event: React.DragEvent<HTMLDivElement>) => void;
    handleDrop: (event: React.DragEvent<HTMLDivElement>, destination_id: string) => void;
    handleDragEnd: () => void;
    changeExpandFlag: boolean;
}

const ToolGrid: React.FC<ToolGridProps> = ({
    sortedFilteredTools,
    isToolsExpand,
    isExpandView,
    dragId,
    dragOverIndex,
    location,
    handleDragStart,
    handleDragOver,
    handleDrag,
    handleDrop,
    handleDragEnd,
    changeExpandFlag
}) => (
    <Grid container gap={3} alignItems="flex-start">
        {sortedFilteredTools.map((tool, index) => (
            <StyledGridItem
                item
                key={tool?.identity?.toolId}
                xs={isToolsExpand ? 1.39 : 2.19}
                position="relative"
                draggable
                onDragStart={event => handleDragStart(event, String(tool?.identity?.toolId))}
                onDragOver={event => handleDragOver(event, index)}
                onDrag={event => handleDrag(event)}
                onDrop={event => handleDrop(event, String(tool?.identity?.toolId))}
                onDragEnd={handleDragEnd}
            >
                <ToolCard
                    toolInfoStatus={tool}
                    isExpand={isExpandView}
                    changeExpandFlag={changeExpandFlag}
                    dragged={tool?.identity?.toolId === dragId}
                />
                {DragLocation.BEFORE === location && index === dragOverIndex && <StyledDropZoneBefore />}
                {DragLocation.AFTER === location && index === dragOverIndex && <StyledDropZoneAfter />}
            </StyledGridItem>
        ))}
    </Grid>
);

export default ToolGrid;
