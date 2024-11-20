import { useState, useRef, useEffect, RefObject } from "react";

const useHover = <T extends HTMLElement>(): [RefObject<T>, boolean] => {
    const [hovering, setHovering] = useState(false);
    const ref = useRef<T>(null);

    const handleMouseOver = () => setHovering(true);
    const handleMouseOut = () => setHovering(false);

    useEffect(() => {
        const node = ref.current;
        if (node) {
            node.addEventListener("mouseover", handleMouseOver);
            node.addEventListener("mouseout", handleMouseOut);

            return () => {
                node.removeEventListener("mouseover", handleMouseOver);
                node.removeEventListener("mouseout", handleMouseOut);
            };
        }
    }, []);

    return [ref, hovering];
};

export default useHover;
