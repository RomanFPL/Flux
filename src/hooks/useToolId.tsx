import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useToolId = () => {
    const path = usePathname();
    const [toolId, setToolId] = useState<string>("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const pathParts = path.split("/");
            const toolIdIndex = pathParts.indexOf("tools") + 1;
            const extractedToolId = pathParts[toolIdIndex] || "";
            setToolId(extractedToolId);
        }
    }, [path]);

    return { toolId };
};

export default useToolId;
