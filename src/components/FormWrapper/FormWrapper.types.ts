import { ReactNode } from "react";
import { DefaultValues, FieldValues, SubmitHandler } from "react-hook-form";

export interface FormWrapperProps<T extends FieldValues> {
    children: ReactNode;
    defaultValues: DefaultValues<T>;
    onSubmit: SubmitHandler<T>;
    mode?: "onChange" | "onBlur" | "onSubmit";
}
