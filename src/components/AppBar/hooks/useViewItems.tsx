import { DialogType, DialogTypeAndProps } from "../../Dialog/Dialog.types";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog, openDialog as setDialog } from "@/redux/slices/dialogSlice";
import useContextAction from "./useContextAction";
import { useViewChange } from ".";
import { RootState } from "../../../redux/store";
import { ContextItem, MenuItemProps } from "../../Select/components/ContextMainMenu/ContextMainMenu.types";

const open = true;

/**
 * This function is used for handling logic related to the main menu for selecting the current view.
 * It provides functionality for managing views, including saving, deleting, and updating etc...
 * !!! IMPORTANT it depends of form context
 */
const useMenuItems = () => {
    const dispatch = useDispatch();
    const { availableInterfaces } = useSelector((state: RootState) => state.user);

    const openDialog = (dialog: DialogTypeAndProps) => dispatch(setDialog(dialog));
    const onClose = () => dispatch(closeDialog());
    const { isMutated } = useViewChange();

    const { handleSaveAs, handleSave, handleReset, handleDeleteView, handleRename, selectedView } = useContextAction();

    const viewsMenu: ContextItem[] = availableInterfaces.map(props => {
        const isCurrentEdit = isMutated && selectedView === props.name;

        const contextMenu: MenuItemProps[] = [];

        const isDefaultView = props.name === "default";
        const isCustomView = props.name !== "default";

        if (isDefaultView) {
            if (isCurrentEdit) {
                contextMenu.push({
                    name: "Save As",
                    action: () =>
                        openDialog({
                            type: DialogType.SaveAs,
                            open,
                            onClose,
                            onSave: handleSaveAs
                        })
                });
                contextMenu.push({
                    name: "Reset",
                    action: name => handleReset(name)
                });
            }
        }

        if (isCustomView) {
            if (isCurrentEdit) {
                contextMenu.push({
                    name: "Save",
                    action: () => handleSave(props.name)
                });
                contextMenu.push({
                    name: "Save As",
                    action: () =>
                        openDialog({
                            type: DialogType.SaveAs,
                            open,
                            onClose,
                            onSave: handleSaveAs
                        })
                });
                contextMenu.push({
                    name: "Reset",
                    action: handleReset
                });
                contextMenu.push({ name: "divider" });
            }

            if (!isCurrentEdit) {
                contextMenu.push({
                    name: "Rename",
                    action: (name?: string) =>
                        openDialog({
                            type: DialogType.SaveAs,
                            open,
                            onClose,
                            onSave: (newName: string, onError) => handleRename(name, newName, onError)
                        })
                });
            }

            contextMenu.push({
                name: "Delete",
                action: (name?: string) =>
                    openDialog({
                        type: DialogType.Delete,
                        open,
                        onClose,
                        viewName: name,
                        onDelete: () => handleDeleteView(name)
                    })
            });
        }

        return {
            value: props.name,
            text: props.name,
            context: contextMenu,
            edited: isCurrentEdit
        };
    });

    return { viewsMenu };
};

export default useMenuItems;
