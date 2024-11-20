import React, { useState } from "react";
import { Dialog } from "@mui/material";
import FormWrapper from "../../../FormWrapper/FormWrapper";
import ActivityFields from "./components/ActivityFields/ActivityFields";
import { paperDialogExtended } from "./AddActivityLog.styled";
import { MaintenanceTask, PMSeverity, ServiceType } from "@/services/openApi/api";
import useToolId from "@/hooks/useToolId";
import { DialogTypesMap } from "../../Dialog.types";
import DateTimeFields from "./components/DateTimeFields";
import { IWorkLog } from "./components/DateTimeFields/DateTimeFields";
import { setMinutesToZero } from "@/utils/setMinutesToZero";

export type IActivityFields = {
    notificationReference: string;
    partReplaced: string;
    type: ServiceType;
    severity: PMSeverity;
    engineer: string;
    actionTaken: string;
    description: string;
    workLogs: IWorkLog[];
};

const defaultValues: IActivityFields = {
    notificationReference: "",
    partReplaced: "NO",
    type: "Regular",
    severity: "Normal",
    engineer: "",
    actionTaken: "T&M",
    description: "",
    workLogs: [
        {
            startDate: setMinutesToZero(new Date().toUTCString()),
            durationHours: 0
        }
    ]
};

const AddActivityLog = ({
    id,
    open,
    onClose,
    onSave,
    predefinedValues = defaultValues
}: DialogTypesMap["save_active_log"]) => {
    const [activeView, setActiveView] = useState<"default" | "date">("default");
    const { toolId: toolID } = useToolId();

    const moveToDate = () => setActiveView("date");
    const moveToDefault = () => setActiveView("default");

    const onSubmit = (data: IActivityFields) => {
        const extendedData: MaintenanceTask = {
            toolID,
            createdDate: new Date().toISOString(),
            workLogs: data.workLogs.map(log => ({
                startDate: new Date(log.startDate).toISOString(),
                durationHours: Number(log.durationHours) || 0
            })),
            partsReplaced: data.partReplaced === "YES",
            serviceType: data.type,
            severity: data.severity,
            done: true,
            engineer: data.engineer || "",
            description: data.description || "",
            description2: "",
            actionTaken: data.actionTaken || "",
            notificationReference: data.notificationReference || ""
        };

        onSave(extendedData);
    };

    return (
        <Dialog open={open} onClose={onClose} PaperProps={paperDialogExtended}>
            <FormWrapper<IActivityFields> defaultValues={predefinedValues} onSubmit={onSubmit} mode="onSubmit">
                {activeView === "default" && <ActivityFields onClose={onClose} handleTimeView={moveToDate} id={id} />}
                {activeView === "date" && <DateTimeFields onCancel={moveToDefault} />}
            </FormWrapper>
        </Dialog>
    );
};

export default AddActivityLog;
