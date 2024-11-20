import { Loading } from "@/components";
import { pollingInterval } from "@/config";
import useGridPlate from "@/hooks/useGridPlate";
import { RootState } from "@/redux";
import { useFetchToolsStatusesQuery } from "@/redux/slices/apiSlice";
import { updateToolsSort } from "@/redux/slices/toolsSlice";
import updateSortedTools from "@/utils/updateSortedTools";
import { useTranslations } from "next-intl";
import { DragEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layouts } from "../../page.types";
import NoTools from "./components/NoTools/NoTools";
import ToolGrid from "./components/ToolsGrid/ToolsGrid";
import ToolsTable from "./components/ToolsTable/ToolsTable";
import { DragLocation } from "./components/ToolsTable/ToolsTable.types";
import calculateHiddenTools from "./helper/calculateHiddenTools";
import getSortedTools from "./helper/getSortedTools";
import getToolsBySearchValue from "./helper/getToolsBySearchValue";
import transformData from "./helper/transformData";
import { useScrollOffsets } from "./hooks/useScrollOffsets";
import { ToolsContainer } from "./ToolsContent.styled";
import { ToolContentProps } from "./ToolsContent.types";

// TODO SHIR Please read https://hapy.co/journal/principles-of-coding/,
// and try do some refactor spiting logic into separate functions / hooks.
// Here a lot of logic written in one component. Logic is not pure,
// we need incapsulate any specific module with logic inside hook or function, but not mix it.
// Remove all comments, code should be self-explaining

const ToolsContent = ({ setHiddenTools }: ToolContentProps) => {
    const t = useTranslations();
    const { toolsFilters, sortedTools } = useSelector((state: RootState) => state.tools);

    const { data: tools = [], isLoading } = useFetchToolsStatusesQuery(void 0, {
        pollingInterval
    });
    // TODO later we should move it to separate function everywhere
    const grid = useGridPlate();
    const isToolsExpand = Layouts.health_tools === grid || Layouts.tools === grid;
    const dispatch = useDispatch();

    const { isGridView, isExpandView, changeExpandFlag } = toolsFilters;

    // Filter tools according to search and selected status group
    const filteredTools = getToolsBySearchValue({ data: tools, filter: toolsFilters });
    // Sort filtered tools
    const sortedFilteredTools = getSortedTools(filteredTools, sortedTools);

    // Convert to Table's data for listview display
    const contentData = transformData(sortedFilteredTools, t);
    const headData = [t("tool_name"), t("status"), t("secgem"), t("error_message")];

    const { gridRef: gridContainerRef, tableRef, offsetHeight, offsetTop } = useScrollOffsets(isGridView, grid);

    const numOfColumn = isGridView ? (isToolsExpand ? 8 : 5) : 1;
    const elementHeight = isGridView ? 92 : 41;
    const itemsDown = (offsetHeight / elementHeight) * numOfColumn;
    const itemsTop = (offsetTop / elementHeight) * numOfColumn;
    const hiddenTools = calculateHiddenTools(sortedFilteredTools, itemsTop, itemsDown);

    const [location, setLocation] = useState<DragLocation>(DragLocation.UNDEFINED);
    // Current dragged id
    const [dragId, setDragId] = useState<string>("");
    // Current drag over index for dragzone render
    const [dragOverIndex, setDragOverIndex] = useState<number>(-1);

    useEffect(() => {
        setHiddenTools(hiddenTools);
    }, [setHiddenTools, hiddenTools]);

    // update ordered tools when new tools data arrives
    useEffect(() => {
        if (!tools.length) return;
        const newSortedTools = updateSortedTools(tools, sortedTools);

        if (
            newSortedTools.length === sortedTools.length &&
            newSortedTools.every((value, index) => value === sortedTools[index])
        )
            return;

        dispatch(updateToolsSort(newSortedTools));
    }, [tools, sortedTools, dispatch]);

    const handleToolsSortChanged = (
        id: string,
        destination_id: string,
        location: DragLocation = DragLocation.BEFORE
    ) => {
        // Find indices efficiently
        const fromIndex = sortedTools.indexOf(id);
        const toIndex = sortedTools.indexOf(destination_id);

        // Check if valid indices
        if (fromIndex === -1 || toIndex === -1) return;

        // Update list
        const updatedList = [...sortedTools];
        const [itemToMove] = updatedList.splice(fromIndex, 1);

        let newIndex = toIndex > fromIndex ? toIndex - 1 : toIndex;
        if (location === DragLocation.AFTER) {
            newIndex = toIndex;
        }
        updatedList.splice(newIndex, 0, itemToMove);

        dispatch(updateToolsSort(updatedList));
    };

    const handleDragStart = (event: DragEvent<HTMLDivElement>, id: string) => {
        event.dataTransfer.effectAllowed = "move";

        // Create custom drag image for grid item (row in table is created automaticly)
        // if (isGridView) {
        const dragElement = event.currentTarget.cloneNode(true) as HTMLElement;
        const computedStyle = window.getComputedStyle(event.currentTarget);
        dragElement.style.width = computedStyle.width;
        dragElement.style.position = "absolute";
        dragElement.style.top = "-999px";
        document.body.appendChild(dragElement);
        event.dataTransfer.setDragImage(dragElement, 0, 0);

        // Clean up cloned element
        setTimeout(() => {
            document.body.removeChild(dragElement);
        }, 0);
        // }

        setDragId(id);
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>, index: number) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        if (dragOverIndex !== index) {
            setLocation(DragLocation.UNDEFINED);
            setDragOverIndex(index);
        }

        // update drop location
        if (event.currentTarget) {
            let dropBefore = true;
            const targetRect = event.currentTarget.getBoundingClientRect();
            if (isGridView) {
                dropBefore = event.clientX < targetRect.left + targetRect.width / 2;
            } else {
                dropBefore = event.clientY < targetRect.top + targetRect.height / 2;
            }
            const newLocation = dropBefore ? DragLocation.BEFORE : DragLocation.AFTER;
            if (location !== newLocation) {
                setLocation(newLocation);
            }
        }
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>, destination_id: string) => {
        event.preventDefault();
        if (dragId) {
            handleToolsSortChanged(dragId, destination_id, location);
        }
    };

    const handleDrag = (event: DragEvent<HTMLDivElement>) => {
        const container = gridContainerRef.current;
        if (container) {
            const rect = container.getBoundingClientRect();
            const distanceToBottom = rect.bottom - event.clientY;
            const distanceToTop = event.clientY - rect.top;
            let scrollAmount = 0;

            if (distanceToBottom < 70 && distanceToBottom > 0) {
                scrollAmount = (70 - distanceToBottom) / 5;
                container.scrollTop += scrollAmount;
            } else if (distanceToTop < 70 && distanceToTop > 0) {
                scrollAmount = (70 - distanceToTop) / 5;
                container.scrollTop -= scrollAmount;
            }
        }
    };

    const handleDragEnd = () => {
        setDragOverIndex(-1);
        setDragId("");
        setLocation(DragLocation.UNDEFINED);
    };

    if (!sortedFilteredTools.length || !tools.length) return <NoTools isNoData={!tools.length} />;

    if (isGridView)
        return (
            <Loading loading={isLoading}>
                <ToolsContainer ref={gridContainerRef}>
                    <ToolGrid
                        sortedFilteredTools={sortedFilteredTools}
                        isToolsExpand={isToolsExpand}
                        isExpandView={isExpandView}
                        dragId={dragId}
                        dragOverIndex={dragOverIndex}
                        location={location}
                        handleDragStart={handleDragStart}
                        handleDragOver={handleDragOver}
                        handleDrag={handleDrag}
                        handleDrop={handleDrop}
                        handleDragEnd={handleDragEnd}
                        changeExpandFlag={changeExpandFlag}
                    />
                </ToolsContainer>
            </Loading>
        );

    return (
        <Loading loading={isLoading}>
            <ToolsContainer ref={gridContainerRef}>
                <ToolsTable
                    ref={tableRef}
                    headData={headData}
                    contentData={contentData}
                    handleDragStart={handleDragStart}
                    handleDragOver={handleDragOver}
                    handleDrop={handleDrop}
                    handleDragEnd={handleDragEnd}
                    location={location}
                    dragId={dragId}
                    dragOverIndex={dragOverIndex}
                />
            </ToolsContainer>
        </Loading>
    );
};

export default ToolsContent;
