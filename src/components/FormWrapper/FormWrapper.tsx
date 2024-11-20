import { useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { FormWrapperProps } from "./FormWrapper.types";

const FormWrapper = <T extends FieldValues>({
    children,
    defaultValues,
    onSubmit,
    mode = "onSubmit"
}: FormWrapperProps<T>) => {
    const methods: UseFormReturn<T> = useForm<T>({
        defaultValues,
        mode: "onSubmit"
    });

    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        if (mode === "onChange") {
            const subscription = methods.watch(() => {
                if (!isFirstRender) {
                    methods.handleSubmit(onSubmit)();
                }
            });
            return () => subscription.unsubscribe();
        }
    }, [methods, onSubmit, mode, isFirstRender]);

    const handleBlur = () => {
        if (!isFirstRender && mode === "onBlur") {
            methods.handleSubmit(onSubmit)();
        }
    };

    useEffect(() => {
        methods.reset(defaultValues);
        setIsFirstRender(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)]);

    return (
        <FormProvider {...methods}>
            <form
                onBlur={mode === "onBlur" ? handleBlur : void 0}
                onSubmit={mode === "onSubmit" ? methods.handleSubmit(onSubmit) : undefined}
            >
                {children}
            </form>
        </FormProvider>
    );
};

export default FormWrapper;
