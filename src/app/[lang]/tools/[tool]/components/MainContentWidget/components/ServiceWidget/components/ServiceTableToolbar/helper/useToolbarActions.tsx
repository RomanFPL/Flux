import { getActiveLogPreviewData } from "./getActiveLogPreviewData";
import { useDispatch } from "react-redux";
import { DialogType, DialogTypeAndProps } from "@/components/Dialog/Dialog.types";
import { closeDialog, openDialog as setDialog } from "@/redux/slices/dialogSlice";
import { getPredefinedFields } from "./getPredefinedFields";
import { useAddToolMaintenanceDataMutation, useDeleteToolMaintenanceDataMutation } from "@/redux/slices/apiSlice";
import { useServiceWidget } from "../../../ServiceWidgetContext";
import { getMaintenanceById } from "./getMaintenanceById";
import useToolId from "@/hooks/useToolId";
import { MaintenanceTask } from "@/services/openApi/api";
import { useTranslations } from "next-intl";

const useToolbarActions = () => {
    const { toolId } = useToolId();
    const t = useTranslations();
    const { selectedRows, setSelectedRows, maintenanceData, setLoading, setFilters } = useServiceWidget();

    const [addToolMaintenance] = useAddToolMaintenanceDataMutation();
    const [deleteToolMaintenance] = useDeleteToolMaintenanceDataMutation();

    const dispatch = useDispatch();
    const openDialog = (dialog: DialogTypeAndProps) => dispatch(setDialog(dialog));
    const onClose = () => dispatch(closeDialog());

    const maintenanceInfo = getMaintenanceById(selectedRows, maintenanceData);
    const data = getActiveLogPreviewData(maintenanceInfo, t);
    const predefinedValues = getPredefinedFields(maintenanceInfo);

    const deleteSelectedItems = async () => {
        setLoading(true);
        onClose();
        try {
            await Promise.all(selectedRows.map(taskId => deleteToolMaintenance({ toolId, taskId: Number(taskId) })));
        } catch (error) {
            console.error("Error deleting tasks:", error);
        }
        setSelectedRows([]);
        setLoading(false);
    };

    const onAddClick = () =>
        openDialog({
            type: DialogType.SaveActiveLog,
            open: true,
            onClose,
            onSave: async (formData: MaintenanceTask) => {
                setLoading(true);
                onClose();
                await addToolMaintenance(formData);
                setLoading(false);
            }
        });

    const onEditClick = () =>
        openDialog({
            type: DialogType.SaveActiveLog,
            id: maintenanceInfo?.id,
            open: true,
            onClose,
            predefinedValues,
            onSave: async (formData: MaintenanceTask) => {
                setLoading(true);
                onClose();
                await addToolMaintenance({ ...formData, id: maintenanceInfo.id });
                setLoading(false);
            }
        });

    const onOpenClick = () =>
        openDialog({
            type: DialogType.PreviewActiveLog,
            open: true,
            onClose,
            data,
            onDelete: onDeleteClick,
            onEdit: onEditClick
        });

    const onPreviewClick = (event: React.MouseEvent<HTMLTableCellElement | HTMLTableRowElement>, id: string) => {
        const maintenanceInfo = getMaintenanceById([id], maintenanceData);
        const data = getActiveLogPreviewData(maintenanceInfo, t);
        openDialog({
            type: DialogType.PreviewActiveLog,
            open: true,
            onClose,
            data
        });
        event.stopPropagation();
    };

    const onDeleteClick = () =>
        openDialog({
            type: DialogType.DeleteActiveLog,
            open: true,
            onClose,
            onDelete: deleteSelectedItems,
            viewName: String(data.id)
        });

    const onClearFilters = () => {
        setFilters({});
    };

    return { onAddClick, onEditClick, onOpenClick, onDeleteClick, onPreviewClick, onClearFilters };
};

export default useToolbarActions;
