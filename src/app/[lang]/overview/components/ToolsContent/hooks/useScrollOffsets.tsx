import { useEffect, useRef, useState } from "react";
import { Layouts } from "@/types/slices.types";

export const useScrollOffsets = (isGridView: boolean, selectedLayout: Layouts) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const tableRef = useRef<HTMLTableSectionElement>(null);
    const containerRef = isGridView ? gridRef : tableRef;
    const [offsetHeight, setOffsetHeight] = useState(0);
    const [offsetTop, setOffsetTop] = useState(0);

    const getOffset = () => {
        const containerScrollTop = containerRef?.current?.scrollTop || 0;
        const offsetValue = (containerRef?.current?.offsetHeight || 0) + containerScrollTop;
        return Math.round(offsetValue);
    };

    const handleScroll = () => {
        setOffsetTop(containerRef?.current?.scrollTop || 0);
        setOffsetHeight(getOffset());
    };

    useEffect(() => {
        if (!offsetHeight && !offsetTop) {
            setOffsetTop(containerRef?.current?.scrollTop || 0);
            setOffsetHeight(getOffset());
        }
        if (containerRef.current) {
            containerRef.current.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (containerRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                containerRef.current.removeEventListener("scroll", handleScroll);
            }
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [!!containerRef?.current, gridRef?.current, tableRef?.current, isGridView, selectedLayout]);

    // Scroll bar moves to top of view change
    useEffect(() => {
        setOffsetTop(0);
        setOffsetHeight(0);
    }, [isGridView]);

    useEffect(() => {
        handleScroll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedLayout]);

    return { gridRef, tableRef, offsetHeight, offsetTop };
};
