import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { UserFormData } from "../AppBar.types";
import { RootState } from "../../../redux/store";
import updateView from "./useUpdateView";

/**
 * This hook provides default values for the UI form and handles the `onSubmit` logic.
 * It also interacts with LocalStorage to retrieve the last selected view and here is handled initial logic.
 */
const useUIViewState = () => {
    const discard = useDispatch();
    const [activeView, setActiveView] = useLocalStorage<string>("activeView", "default");
    const { availableInterfaces } = useSelector((state: RootState) => state.user);

    const onSubmitUIView = ({ view }: UserFormData) => {
        const activeWidget = availableInterfaces.find(({ name }) => name === view);
        setActiveView(view);
        updateView(discard, activeWidget);
    };

    const defaultUI = { view: activeView };

    return { onSubmitUIView, defaultUI, isAvailable: !!availableInterfaces.length, setActiveView };
};

export default useUIViewState;
