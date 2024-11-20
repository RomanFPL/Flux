export interface TextAreaFieldProps {
    label: string;
    setValue: (value: string) => void;
    value: string;
    required?: boolean;
}

export interface TextAreaControllerWrapperProps extends Omit<TextAreaFieldProps, "value" | "setValue"> {
    name: string;
}
