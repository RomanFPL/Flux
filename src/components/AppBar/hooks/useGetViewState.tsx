import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

/**
 * This hook retrieves the current state of the application from the Redux store,
 *
 * @returns {object} An object containing:
 * - getCurrentView: A function that generates a new view object with the current
 *   health, tools, and reports state, along with the provided view name.
 *
 * @example
 * const { getCurrentView } = useGetViewState();
 * const newView = getCurrentView("My Custom View");
 */
const useGetViewState = () => {
    const health = useSelector((state: RootState) => state.health);
    const tools = useSelector((state: RootState) => state.tools);
    const reports = useSelector((state: RootState) => state.reports);

    const getCurrentView = (name: string) => ({ name, health, tools, reports });

    return { getCurrentView };
};

export default useGetViewState;
