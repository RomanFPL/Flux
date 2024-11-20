import { StylesBox } from "@/components/IconButton/IconButton.styled";
import useToolId from "@/hooks/useToolId";
import PlusIcon from "@/icons/PlusIcon";
import { dateTime } from "@/types/hours";
import { setMinutesToZero } from "@/utils/setMinutesToZero";
import { SelectChangeEvent, Stack, Typography } from "@mui/material";
import { getHours, setHours } from "date-fns";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import DeleteIcon from "../../../../../../icons/DeleteIcon";
import DatePicker from "../../../../../DatePicker";
import IconButton from "../../../../../IconButton/IconButton";
import { Item } from "../../../../../MultiselectButton/MultiselectButton.types";
import Select from "../../../../../Select";
import TextField from "../../../../../TextField.tsx/index";
import { ActionButton } from "../../../../Dialog.styled";
import { IActivityFields } from "../../AddActivityLog";
import { ActionsGroupExtended } from "../ActionsGroup/ActionsGroup.styled";
import ActivityHeader from "../ActivityHeader/ActivityHeader";
import { LargeContainer, SmallContainer } from "./DateTimeFields.styled";
import { DateTimeFieldsProps } from "./DateTimeFields.types";

export interface IWorkLog {
    startDate: string;
    durationHours: number;
}

const DateTimeFields = ({ onCancel }: DateTimeFieldsProps) => {
    const t = useTranslations();
    const { toolId } = useToolId();

    const { watch, setValue } = useFormContext<IActivityFields>();
    const workLogs = watch("workLogs");

    const [initialWorkLogs, setInitialWorkLogs] = useState(() => JSON.parse(JSON.stringify(workLogs)));

    const [hasInvalidDuration, setHasInvalidDuration] = useState(false);

    const defaultDate: IWorkLog = {
        startDate: setMinutesToZero(new Date().toUTCString()),
        durationHours: 0
    };

    const addWorkLog = () => {
        setValue("workLogs", [...workLogs, defaultDate]);
    };

    const onRemove = (index: number, fields: IWorkLog[]) => {
        const preventRemove = workLogs.length <= 1;
        if (preventRemove) return;
        const newArray = fields.filter((_, idx) => idx !== index);
        setValue("workLogs", newArray);
    };

    const handleTime = (event: SelectChangeEvent<unknown>, index: number, isoDate: string) => {
        const selectedValue = Number(event.target.value);
        const field: `workLogs.${number}.startDate` = `workLogs.${index}.startDate`;
        const date = new Date(isoDate);

        const updatedDate = setHours(date, selectedValue);
        setValue(field, updatedDate.toISOString());
    };

    const getSelectedValue = (dateTime: Item[], field: string) => {
        const date = new Date(field);
        const timeHour = getHours(date);
        const item = dateTime.find(({ value }) => timeHour == value);
        if (!item) return null;
        return item;
    };

    const handleSave = () => {
        const hasInvalid = workLogs.some(log => !Number(log.durationHours));
        setHasInvalidDuration(hasInvalid);

        if (hasInvalid) return;

        setInitialWorkLogs(JSON.parse(JSON.stringify(workLogs)));
        onCancel();
    };

    const handleCancel = () => {
        setValue("workLogs", initialWorkLogs);
        onCancel();
    };

    return (
        <>
            <ActivityHeader handleDefaultView={handleCancel} title={t("date_time")} toolId={toolId} />
            <Stack gap={4} padding={6} height="580px" overflow="auto" mr={2} pt={0}>
                {workLogs.map((field, index, fields) => (
                    <Stack key={index} gap={3} flexDirection="row" alignItems="flex-end">
                        <IconButton
                            disabled={fields.length === 1}
                            onClick={() => onRemove(index, fields)}
                            bgVariant="transparent"
                        >
                            <DeleteIcon />
                        </IconButton>
                        <LargeContainer>
                            <DatePicker.withController
                                name={`workLogs.${index}.startDate`}
                                label="Start Date"
                                required
                            />
                        </LargeContainer>
                        <LargeContainer>
                            <Select
                                type="formField"
                                items={dateTime}
                                label="Start Time"
                                width="100%"
                                handleChange={e => handleTime(e, index, field.startDate)}
                                selectedValue={getSelectedValue(dateTime, field.startDate)}
                                required
                            />
                        </LargeContainer>
                        <SmallContainer>
                            <TextField.withController
                                name={`workLogs[${index}].durationHours`}
                                type="hour"
                                label="Duration"
                                required
                            />
                        </SmallContainer>
                    </Stack>
                ))}
            </Stack>
            <ActionsGroupExtended>
                <StylesBox mr="auto" p={0}>
                    <IconButton onClick={addWorkLog} bgVariant="secondary">
                        <PlusIcon />
                    </IconButton>
                    {hasInvalidDuration && (
                        <Typography ml="10px" color="#C95D63" variant="body2" fontStyle="italic">
                            {t("fill_all_fields")}
                        </Typography>
                    )}
                </StylesBox>

                <ActionButton onClick={handleCancel} variant="contained">
                    {t("cancel")}
                </ActionButton>
                <ActionButton onClick={handleSave} variant="contained" color="info">
                    {t("save")}
                </ActionButton>
            </ActionsGroupExtended>
        </>
    );
};

export default DateTimeFields;
