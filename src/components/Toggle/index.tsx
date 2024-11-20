import ToggleRoot from "./Toggle";
import { ToggleProps } from "./Toggle.types";
import ToggleControllerWrapper from "./ToggleControllerWrapper";

const Toggle = <T extends string>(props: ToggleProps<T>) => {
    return <ToggleRoot {...props} />;
};

Toggle.withController = ToggleControllerWrapper;

export default Toggle;
