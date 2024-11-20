import { MaintenanceTask } from "../../services/openApi/api";
import { IActivityFields } from "./components/AddActivityLog/AddActivityLog";
import { ContentProps, DateTimeProps } from "./components/PreviewActiveLog/PreviewActiveLog.types";

/* eslint-disable no-unused-vars */
export enum DialogType {
    Delete = "delete",
    UnsavedChanges = "unsavedChanges",
    SaveAs = "saveAs",
    Override = "override",
    NotificationError = "notification_error",
    NotificationSuccess = "notification_success",
    Paper = "paper",
    SaveActiveLog = "save_active_log",
    PreviewActiveLog = "preview_active_log",
    DeleteActiveLog = "delete_active_log"
}

interface CommonDialogProps {
    open: boolean;
    onClose: () => void;
}

interface DeleteDialogProps extends CommonDialogProps {
    onDelete: () => void;
    viewName?: string;
}

interface UnsavedChangesDialogProps extends CommonDialogProps {
    onDiscard: () => void;
    onSave: () => void;
}

interface SaveAsDialogProps extends CommonDialogProps {
    onSave: (name: string, onError: (error: string) => void) => void;
}

interface OverrideDialogProps extends CommonDialogProps {
    onOverride: () => void;
    viewName?: string;
}

interface NotificationDialogProps extends CommonDialogProps {
    message: string;
}

interface AddActiveLogDialogProps extends CommonDialogProps {
    predefinedValues?: IActivityFields;
    onSave: (data: MaintenanceTask) => void;
    id?: string | number;
}

interface ActiveLogPreviewDialogProps extends CommonDialogProps {
    open: boolean;
    onClose: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    data: { dateTime?: DateTimeProps[]; general: ContentProps[]; id: string | number };
}

export type DialogTypesMap = {
    [DialogType.Delete]: DeleteDialogProps;
    [DialogType.UnsavedChanges]: UnsavedChangesDialogProps;
    [DialogType.SaveAs]: SaveAsDialogProps;
    [DialogType.Override]: OverrideDialogProps;
    [DialogType.NotificationSuccess]: NotificationDialogProps;
    [DialogType.NotificationError]: NotificationDialogProps;
    [DialogType.SaveActiveLog]: AddActiveLogDialogProps;
    [DialogType.PreviewActiveLog]: ActiveLogPreviewDialogProps;
    [DialogType.DeleteActiveLog]: DeleteDialogProps;
    [DialogType.Paper]: CommonDialogProps;
};

export type DialogTypeAndProps = {
    type: keyof DialogTypesMap;
} & DialogTypesMap[keyof DialogTypesMap];

export const isDialogOfType = <T extends keyof DialogTypesMap>(
    dialog: DialogTypeAndProps,
    type: T
): dialog is { type: T } & DialogTypesMap[T] => {
    return dialog.type === type;
};
