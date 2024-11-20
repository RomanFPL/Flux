import React, { useEffect } from "react";
import { DialogType, DialogTypeAndProps, isDialogOfType } from "./Dialog.types";
import PreviewActiveLog from "./components/PreviewActiveLog/PreviewActiveLog";
import DeleteView from "./components/DeleteView";
import DeleteActiveLog from "./components/DeleteActiveLog";
import NotificationError from "./components/NotificationError";
import NotificationSuccess from "./components/NotificationSuccess";
import OverrideView from "./components/OverrideView";
import SaveViewAs from "./components/SaveViewAs";
import UnsavedChangesView from "./components/UnsavedChangesView";
import AddActivityLog from "./components/AddActivityLog/AddActivityLog";

const DialogFactory: React.FC<DialogTypeAndProps> = props => {
    useEffect(() => {
        if (
            props.open &&
            (props.type === DialogType.NotificationSuccess || props.type === DialogType.NotificationError)
        ) {
            const timer = setTimeout(() => {
                props.onClose();
            }, 2000);

            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.open, props.onClose, props.type]);

    if (!props.open) return null;

    if (isDialogOfType(props, DialogType.Delete)) return <DeleteView {...props} />;
    if (isDialogOfType(props, DialogType.NotificationError)) return <NotificationError {...props} />;
    if (isDialogOfType(props, DialogType.NotificationSuccess)) return <NotificationSuccess {...props} />;
    if (isDialogOfType(props, DialogType.Override)) return <OverrideView {...props} />;
    if (isDialogOfType(props, DialogType.SaveAs)) return <SaveViewAs {...props} />;
    if (isDialogOfType(props, DialogType.UnsavedChanges)) return <UnsavedChangesView {...props} />;

    if (isDialogOfType(props, DialogType.SaveActiveLog)) return <AddActivityLog {...props} />;
    if (isDialogOfType(props, DialogType.PreviewActiveLog)) return <PreviewActiveLog {...props} />;
    if (isDialogOfType(props, DialogType.DeleteActiveLog)) return <DeleteActiveLog {...props} />;

    return null;
};

export default DialogFactory;
