export interface TextFieldProps {
    label: string;
    setValue: (value: string) => void;
    value: string;
    required?: boolean;
    type?: "default" | "hour";
    error?: string | null;
}

export interface TextFieldControllerWrapperProps extends Omit<TextFieldProps, "value" | "setValue"> {
    name: string;
}
