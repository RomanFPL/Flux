import React from "react";
import CustomDateButtonRoot from "./CustomDateButton";
import CustomDateButtonControllerWrapper from "./CustomDateButtonControllerWrapper";

const CustomDateButton = (props: React.ComponentProps<typeof CustomDateButtonRoot>) => {
    return <CustomDateButtonRoot {...props} />;
};

CustomDateButton.withController = CustomDateButtonControllerWrapper;

export default CustomDateButton;
