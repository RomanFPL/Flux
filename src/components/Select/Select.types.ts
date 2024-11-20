import { ContextMainMenuProps } from "./components/ContextMainMenu/ContextMainMenu.types";
import { DefaultSelectMenuProps } from "./components/DefaultSelectMenu/DefaultSelectMenu.types";
import { FormSelectFieldProps } from "./components/FormSelectField/FormSelectField.types";

export interface StylesSelectProps {
    width?: string;
    borderColor?: string;
    isOpen?: boolean;
    noHover?: boolean;
}

export type SelectProps = ContextMainMenuProps | DefaultSelectMenuProps | FormSelectFieldProps;

export function isContextMenuProps(props: SelectProps): props is ContextMainMenuProps {
    return props.type === "contextMenu";
}

export function isDefaultSelectMenuProps(props: SelectProps): props is DefaultSelectMenuProps {
    return props.type === "default";
}

export function isFormSelectProps(props: SelectProps): props is FormSelectFieldProps {
    return props.type === "formField";
}

type ControllerProps<T> = Omit<T, "selectedValue" | "handleChange"> & {
    name: string;
};

type ContextMenuControllerProps = ControllerProps<ContextMainMenuProps>;
type SelectMenuControllerProps = ControllerProps<DefaultSelectMenuProps>;
type FormSelectControllerProps = ControllerProps<FormSelectFieldProps>;

export type SelectControllerWrapperProps =
    | ContextMenuControllerProps
    | SelectMenuControllerProps
    | FormSelectControllerProps;

export function isContextMenuPropsWithController(
    props: SelectControllerWrapperProps
): props is ContextMenuControllerProps {
    return props.type === "contextMenu";
}

export function isDefaultSelectMenuPropsWithController(
    props: SelectControllerWrapperProps
): props is SelectMenuControllerProps {
    return props.type === "default";
}

export function isFormSelectPropsWithController(
    props: SelectControllerWrapperProps
): props is FormSelectControllerProps {
    return props.type === "formField";
}
