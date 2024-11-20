import { Controller, useFormContext } from "react-hook-form";
import IconTextButton from "./IconTextButton";
import { StyledIconTextButtonProps } from "./IconTextButton.types";

interface IconTextButtonControllerWrapperProps extends StyledIconTextButtonProps {
    name: string;
    onClick?: () => void;
}

const IconTextButtonControllerWrapper = ({ name, onClick, ...props }: IconTextButtonControllerWrapperProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                const handleClick = () => {
                    if (onClick) {
                        onClick();
                    } else {
                        field.onChange(!field.value);
                    }
                };

                return <IconTextButton onClick={handleClick} {...props} />;
            }}
        />
    );
};

export default IconTextButtonControllerWrapper;
