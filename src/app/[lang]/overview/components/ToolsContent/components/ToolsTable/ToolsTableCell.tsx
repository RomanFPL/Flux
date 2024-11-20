/* eslint-disable react-hooks/exhaustive-deps */
import { SecgemIcon } from "@/icons";
import { TableCell, Tooltip } from "@mui/material";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { StyledSecGemBox, StyledStatus } from "./ToolsTable.styled";
import { StatusTableColumns, ToolsTableCellProps } from "./ToolsTable.types";
import { Layouts } from "../../../../page.types";
import useGridPlate from "@/hooks/useGridPlate";

const ToolsTableCell = ({ cellIndex, cell, id, dragged }: ToolsTableCellProps) => {
    const colWidth = ["5%", "15%", "15%", "15%", "50%"];
    const [isTooltip, setIsTooltip] = useState(false);
    const cellRef = useRef<HTMLInputElement | null>(null);
    // TODO later we should move it to separate function everywhere
    const grid = useGridPlate();
    const isToolsExpand = Layouts.health_tools === grid || Layouts.tools === grid;

    // create state for adding timeout, make sure tooltip will be hidden on drag stop
    const [dragHelper, setDragHelper] = useState<boolean>(false);

    const compareSize = () => {
        const element = cellRef.current;
        if (element) {
            const isTooltip = element.scrollWidth > element.clientWidth;
            setIsTooltip(isTooltip && !dragged);
        }
    };

    // Remove tooltip on drag
    useEffect(() => {
        if (dragged) {
            setDragHelper(true);
        } else {
            setTimeout(() => {
                setDragHelper(false);
                setIsTooltip(false);
            }, 10);
        }
    }, [dragged]);

    // Check whether to display tooltip on name when section resize
    useEffect(() => {
        compareSize();
    }, [isToolsExpand]);

    // Check whether to display tooltip on name on reload and on resize
    useEffect(() => {
        compareSize();
        window.addEventListener("resize", compareSize);
        return () => {
            window.removeEventListener("resize", compareSize);
        };
    }, []);

    return (
        <Tooltip placement="right" title={dragHelper ? "" : cell} disableHoverListener={!isTooltip}>
            <TableCell
                onMouseEnter={compareSize}
                ref={cellRef}
                style={{
                    width: colWidth[cellIndex],
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden"
                }}
            >
                <Link href={`tools/${id}` || ""} passHref legacyBehavior>
                    <a style={{ textDecoration: "none", color: "inherit" }}>
                        {cellIndex === StatusTableColumns.STATUS_COLOR ? (
                            <StyledStatus color={cell} />
                        ) : cellIndex === StatusTableColumns.SECGEM ? (
                            <StyledSecGemBox direction="row">
                                <SecgemIcon color={cell.split(",")[1]} />
                                {cell.split(",")[0]}
                            </StyledSecGemBox>
                        ) : (
                            cell
                        )}
                    </a>
                </Link>
            </TableCell>
        </Tooltip>
    );
};

export default ToolsTableCell;
