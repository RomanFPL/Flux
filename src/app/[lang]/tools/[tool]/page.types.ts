import { ToolLayouts } from "@/types/slices.types";

export interface ToolsProps {
    params: { tool: string; lang?: string };
}

export interface LayoutBoxProps {
    selectedLayout: ToolLayouts;
}
