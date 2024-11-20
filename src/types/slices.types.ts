export interface baseFetch {
    loading: boolean;
    error: any;
}

export const initHealthData = {
    totalTools: 0,
    toolsInProduction: 0,
    toolsInMaintenance: 0,
    toolsDown: 0,
    alignmentErrors: 0,
    scanErrors: 0,
    scan2DErrors: 0,
    scan3DErrors: 0,
    killAOICount: 0,
    alignmentErrorsMaxNormal: 0,
    scanErrorsMaxNormal: 0,
    scan2DErrorsMaxNormal: 0,
    scan3DErrorsMaxNormal: 0,
    killAOICountMaxNormal: 0,
    toolsLightsExpiredCount: 0,
    highDegradationRateToolsCount: 0
};

/* eslint-disable no-unused-vars */
export enum Layouts {
    default = "default",
    health_tools = "health_tools",
    reports_tools = "reports_tools",
    tools = "tools"
}

/* eslint-disable no-unused-vars */
export enum ToolLayouts {
    default = "default",
    main_warnings = "main_warnings",
    main_reports = "main_reports",
    warnings = "warnings",
    main = "main",
    lcc = "lcc"
}
