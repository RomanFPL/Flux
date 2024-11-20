import useToolWidgetDefault from "@/hooks/useToolWidgetDefault";
import { updateToolWarningsState, WarningToolsState } from "@/redux/slices/toolsWarningSlice";
import { useDispatch } from "react-redux";

interface InitProps {
    toolId: string;
    visible: WarningToolsState["visible"];
    maximize: WarningToolsState["maximize"];
}

// This hook helps replace empty values in redux
// same values should be defined inside default form values
// then redux state sync data from form
const useInitWarnings = ({ toolId, visible, maximize }: InitProps) => {
    const dispatch = useDispatch();
    const { defaultWidget } = useToolWidgetDefault();
    const toolWarnings = defaultWidget?.warnings?.find(tool => tool.id === toolId);

    const reset = () => {
        console.log("reset");
        if (toolWarnings) {
            dispatch(
                updateToolWarningsState({
                    id: toolId,
                    warning: { ...toolWarnings, visible: visible, maximize: maximize }
                })
            );
        }
    };

    return { reset };
};

export default useInitWarnings;
