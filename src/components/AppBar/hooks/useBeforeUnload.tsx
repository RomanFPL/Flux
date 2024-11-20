import { useEffect } from "react";

const useBeforeUnload = (isActive: boolean) => {
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
        };

        if (isActive) {
            window.addEventListener("beforeunload", handleBeforeUnload);
        }

        return () => {
            if (isActive) {
                window.removeEventListener("beforeunload", handleBeforeUnload);
            }
        };
    }, [isActive]);
};

export default useBeforeUnload;
