import { useUpdateUserPreferenceStateMutation } from "@/redux/slices/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { normalizeViews, preparePreferencesData, removeViewByName, replaceViewByName } from "../helper";
import { closeDialog, openDialog as setDialog } from "@/redux/slices/dialogSlice";
import { DialogType, DialogTypeAndProps } from "../../Dialog/Dialog.types";
import { useTranslations } from "next-intl";
import useGetViewState from "./useGetViewState";
import { RootState } from "../../../redux/store";
import { updateAvailableInterfaces } from "../../../redux/slices/userSlice";
import { IUserView } from "../../../types/userInterface";
import updateView from "./useUpdateView";
import useUIViewState from "./useUIViewState";

const open = true;

/**
 * This hook provides logic for handling synchronous operations related to the context menu actions,
 * such as saving, renaming, resetting, and deleting user views.
 *
 * Key Features:
 * - `handleSaveAs`: Saves the current view with a new name.
 * - `handleSave`: Saves updates to the currently selected view.
 * - `handleReset`: Resets the view to its initial state without saving changes.
 * - `handleRename`: Renames the selected view to a new name.
 * - `handleDeleteView`: Deletes the selected view.
 * - `handleUnsavedView`: Prompts the user with unsaved changes options (save or discard).
 *
 * Additional functionality:
 * - Manages updates to the view list and synchronizes changes with the Redux store.
 * - Interacts with the `react-hook-form` context to manage form values and state.
 * - Opens dialogs for success/error notifications and unsaved change warnings.
 *
 * @returns {Object}
 * - Functions to handle various view actions: save, delete, rename, reset, and manage unsaved changes.
 */
const useContextAction = () => {
    const {
        availableInterfaces,
        currentUserInterface,
        data: { id: userID }
    } = useSelector((state: RootState) => state.user);

    const { setActiveView, onSubmitUIView } = useUIViewState();

    if (typeof userID !== "number") throw Error("USER IS NOT DEFINED");
    const [updateUserPreferenceState] = useUpdateUserPreferenceStateMutation();
    const dispatch = useDispatch();
    const t = useTranslations();
    const selectedView = currentUserInterface?.name || "";

    const { getCurrentView } = useGetViewState();

    const openDialog = (dialog: DialogTypeAndProps) => dispatch(setDialog(dialog));
    const onClose = () => dispatch(closeDialog());
    const updateViewList = (newViews: IUserView[]) => dispatch(updateAvailableInterfaces(newViews));

    const handleSaveAs = async (name: string, onError: (error: string) => void) => {
        try {
            const activeView = getCurrentView(name);
            const newViews = [...availableInterfaces, activeView];
            const preparedViews = normalizeViews(newViews);
            const newPreferenceData = preparePreferencesData(userID, preparedViews);

            const duplicateView = availableInterfaces.some(view => view.name.toLowerCase() === name.toLowerCase());

            if (duplicateView) {
                onError(t("view_name_already_exists_error"));
                return;
            }
            await updateUserPreferenceState(newPreferenceData);
            openDialog({
                type: DialogType.NotificationSuccess,
                message: t("saved_view", { view: name }),
                open,
                onClose
            });

            updateViewList(newViews);
            updateView(dispatch, activeView);
        } catch (error) {
            openDialog({
                type: DialogType.NotificationError,
                message: t("unknown_error"),
                open,
                onClose
            });
        }
    };

    const handleSave = async (name: string) => {
        try {
            const activeView = getCurrentView(name);
            const newViews = replaceViewByName(availableInterfaces, activeView);
            const preparedViews = normalizeViews(newViews);
            const newPreferenceData = preparePreferencesData(userID, preparedViews);

            await updateUserPreferenceState(newPreferenceData);
            openDialog({
                type: DialogType.NotificationSuccess,
                message: t("saved_view", { view: name }),
                open,
                onClose
            });

            updateViewList(newViews);
            updateView(dispatch, activeView);
        } catch (error) {
            openDialog({
                type: DialogType.NotificationError,
                message: t("unknown_error"),
                open,
                onClose
            });
        }
    };

    const handleReset = async (name?: string) => {
        if (!name) return;
        const activeView = availableInterfaces.find(view => view.name === name);
        updateView(dispatch, activeView);
    };

    const handleRename = async (name?: string, newName?: string, onError?: (error: string) => void) => {
        if (!name || !newName) return;
        try {
            const duplicateView = availableInterfaces.some(view => view.name.toLowerCase() === newName.toLowerCase());

            const newViews = availableInterfaces.map(view => {
                if (view.name === name) return { ...view, name: newName };
                return view;
            });
            const preparedViews = normalizeViews(newViews);
            const renamedCurrentView = newViews.find(({ name }) => name === newName);
            const newPreferenceData = preparePreferencesData(userID, preparedViews);

            if (duplicateView) {
                onError?.(t("view_name_already_exists_error"));
                return;
            }

            await updateUserPreferenceState(newPreferenceData);
            openDialog({
                type: DialogType.NotificationSuccess,
                message: t("saved_view", { view: name }),
                open,
                onClose
            });

            updateViewList(newViews);
            if (name === selectedView) {
                updateView(dispatch, renamedCurrentView);
                setActiveView(newName);
            }
        } catch (error) {
            openDialog({
                type: DialogType.NotificationError,
                message: t("unknown_error"),
                open,
                onClose
            });
        }
    };

    const handleDeleteView = async (name: string = "") => {
        if (!name) {
            openDialog({
                type: DialogType.NotificationError,
                message: t("not_exist_error"),
                open,
                onClose
            });
        }

        try {
            const newViews = removeViewByName(availableInterfaces, name);
            const newPreferenceData = preparePreferencesData(userID, newViews);
            await updateUserPreferenceState(newPreferenceData);
            openDialog({
                type: DialogType.NotificationSuccess,
                message: t("saved_view", { view: name }),
                open,
                onClose
            });

            updateViewList(newViews);
            if (selectedView === name) {
                onSubmitUIView({ view: "default" });
            }
        } catch (error) {
            openDialog({
                type: DialogType.NotificationError,
                message: t("unknown_error"),
                open,
                onClose
            });
        }
    };

    const onDiscard = (name: string) => {
        onClose();
        onSubmitUIView({ view: name });
    };

    const handleSaveNewChanges = async (name: string) => {
        onClose();
        if (selectedView !== "default") {
            await handleSave(selectedView);
            onSubmitUIView({ view: name });
        } else {
            openDialog({
                type: DialogType.SaveAs,
                open: true,
                onClose,
                onSave: handleSaveAs
            });
        }
    };

    const handleUnsavedView = (name: string = "") => {
        return new Promise<void>((resolve, reject) => {
            openDialog({
                type: DialogType.UnsavedChanges,
                open: true,
                onClose: () => {
                    onClose();
                    reject();
                },
                onDiscard: () => {
                    onDiscard(name);
                    resolve();
                },
                onSave: () => handleSaveNewChanges(name).then(resolve)
            });
        });
    };

    return {
        handleSaveAs,
        handleSave,
        handleReset,
        handleRename,
        handleDeleteView,
        onClose,
        handleUnsavedView,
        selectedView
    };
};

export default useContextAction;
