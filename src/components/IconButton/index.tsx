import React from "react";
import IconButtonRoot from "./IconButton";
import IconButtonControllerWrapper from "./IconButtonControllerWrapper";

const IconButton = (props: React.ComponentProps<typeof IconButtonRoot>) => {
    return <IconButtonRoot {...props} />;
};

IconButton.withController = IconButtonControllerWrapper;

export default IconButton;
