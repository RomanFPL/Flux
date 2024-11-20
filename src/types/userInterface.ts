import { HealthState } from "../redux/slices/healthSlice";
import { ReportState } from "../redux/slices/reportsSlice";
import { ToolsState } from "../redux/slices/toolsSlice";

export interface IUserView {
    name: string;
    tools: ToolsState;
    health: HealthState;
    reports: ReportState;
}
