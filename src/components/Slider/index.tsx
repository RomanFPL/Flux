import React from "react";
import SliderRoot from "./Slider";
import SliderControllerWrapper from "./SliderControllerWrapper";

const Slider = (props: React.ComponentProps<typeof SliderRoot>) => {
    return <SliderRoot {...props} />;
};

Slider.withController = SliderControllerWrapper;

export default Slider;
