import { Controller, useFormContext } from "react-hook-form";
import IconButton from "./IconButton";
import { StyledIconButtonProps } from "./IconButton.types";

interface IconButtonControllerWrapperProps extends StyledIconButtonProps {
    name: string;
    onClick?: () => void;
    actionType?: "false" | "true";
}

const IconButtonControllerWrapper = ({ name, onClick, actionType, ...props }: IconButtonControllerWrapperProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                const handleClick = () => {
                    if (onClick) {
                        onClick();
                    } else if (actionType === "false") {
                        field.onChange(false);
                    } else if (actionType === "true") {
                        field.onChange(true);
                    } else {
                        field.onChange(!field.value);
                    }
                };

                return <IconButton onClick={handleClick} {...props} />;
            }}
        />
    );
};

export default IconButtonControllerWrapper;
