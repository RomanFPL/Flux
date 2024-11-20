/* eslint-disable no-unused-vars */
export enum Layouts {
    default = "default",
    health_tools = "health_tools",
    reports_tools = "reports_tools",
    tools = "tools"
}

export interface LayoutBoxProps {
    selectedLayout: Layouts;
}
