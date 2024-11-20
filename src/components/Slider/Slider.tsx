import { SliderProps as MuiSliderProps } from "@mui/material";
import { CustomSlider, StyledSliderContainer } from "./Slider.styled";
import Thumb from "./components/Thumb";

const Slider = ({ ...props }: MuiSliderProps) => {
    const { onChange, valueLabelFormat, value, min, max, step } = props;
    return (
        <StyledSliderContainer>
            <CustomSlider
                slots={{
                    thumb: Thumb
                }}
                valueLabelFormat={valueLabelFormat}
                onChange={onChange}
                value={value}
                min={min}
                max={max}
                step={step}
                valueLabelDisplay="on"
            ></CustomSlider>
        </StyledSliderContainer>
    );
};

export default Slider;
