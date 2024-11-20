import { useEffect } from "react";

const useClickOutside = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
    const handleClick = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, callback]);
};

export default useClickOutside;
