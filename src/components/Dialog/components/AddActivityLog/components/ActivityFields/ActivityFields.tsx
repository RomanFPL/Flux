import { Divider, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import Select from "../../../../../Select/index";
import TextArea from "../../../../../TextArea/index";
import TextField from "../../../../../TextField.tsx";
import Toggle from "../../../../../Toggle/index";
import { IActivityFields } from "../../AddActivityLog.jsx";
import ActionsGroup from "../ActionsGroup/ActionsGroup";
import ActivityHeader from "../ActivityHeader/ActivityHeader";
import DurationInfo from "../DurationInfo/DurationInfo";
import TimeSelectGroup from "../TimeSelectGroup/TimeSelectGroup";
// import { useFormContext } from "react-hook-form";
// import { IActivityFields } from "../../AddActivityLog.jsx";

interface ActivityFieldsProps {
    onClose: () => void;
    handleTimeView: () => void;
    id?: string | number;
    toolId?: string;
}

const ActivityFields = ({ onClose, handleTimeView, toolId = "", id }: ActivityFieldsProps) => {
    const t = useTranslations();

    const { watch } = useFormContext<IActivityFields>();
    const workLogs = watch("workLogs");

    const totalDuration = workLogs.reduce((acc, log) => acc + Number(log.durationHours || 0), 0);

    const servicesType = [
        { value: "Regular", text: "Regular" },
        // { value: "Service", text: "Service" },
        { value: "PM", text: "PM" }
        // { value: "Application", text: "Application" }
    ];

    const servicesSeverity = [
        { value: "Normal", text: "Normal" },
        { value: "High", text: "High" }
    ];

    const serviceActivity = [
        { value: "T&M", text: "T&M" },
        { value: "Warranty", text: "Warranty" },
        { value: "Acceptance", text: "Acceptance" }
    ];

    const headerTitle = id ? t("edit_log", { id }) : t("add_new_log");
    const actionBtnName = id ? t("save") : t("add_button");

    return (
        <>
            <ActivityHeader title={headerTitle} toolId={toolId} />
            <Stack gap={4} padding={6} height="580px" overflow="auto" mr={2} pt={0}>
                <DurationInfo hours={totalDuration} />
                <TimeSelectGroup {...{ handleTimeView }} />
                <Divider />
                <TextField.withController name="notificationReference" label="Service Notification" required />
                <Toggle.withController name="partReplaced" label="Part Replaced" items={["YES", "NO"]} />
                <Select.withController name="type" type="formField" items={servicesType} label="Type" />
                <Select.withController name="severity" type="formField" items={servicesSeverity} label="Severity" />
                <TextField.withController name="engineer" label="Engineer" required />
                <Select.withController
                    name="actionTaken"
                    type="formField"
                    items={serviceActivity}
                    label="Activity Type"
                />
                <TextArea.withController name="description" label="Description" />
            </Stack>
            <ActionsGroup actionBtnName={actionBtnName} {...{ onClose }} />
        </>
    );
};

export default ActivityFields;
