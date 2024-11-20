import { SliderProps as MuiSliderProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import Slider from "./Slider";

interface SliderControllerWrapperProps extends MuiSliderProps {
    name: string;
}

const SliderControllerWrapper = ({ name, ...props }: SliderControllerWrapperProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return <Slider {...props} />;
            }}
        />
    );
};

export default SliderControllerWrapper;
