import { ToolInfoStatus } from "@/services/openApi";

export interface ToolCardProps {
    id: number;
    title: string;
    status: string;
    detail?: string;
    statusColor: string;
    count?: number;
    //Remove when logic will be created
    withIcon?: boolean;
}

export interface ToolCardPropsNew {
    toolInfoStatus: ToolInfoStatus;
    isExpand: boolean;
    changeExpandFlag: boolean;
    dragged: boolean;
}
