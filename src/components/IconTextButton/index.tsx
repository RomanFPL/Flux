import React from "react";
import IconTextButtonRoot from "./IconTextButton";
import IconTextButtonControllerWrapper from "./IconTextButtonControllerWrapper";

const IconTextButton = (props: React.ComponentProps<typeof IconTextButtonRoot>) => {
    return <IconTextButtonRoot {...props} />;
};

IconTextButton.withController = IconTextButtonControllerWrapper;

export default IconTextButton;
