import React from "react";
import MultiselectButtonRoot from "./MultiselectButton";
import MultiselectControllerWrapper from "./MultiselectControllerWrapper";

const MultiselectButton = (props: React.ComponentProps<typeof MultiselectButtonRoot>) => {
    return <MultiselectButtonRoot {...props} />;
};

MultiselectButton.withController = MultiselectControllerWrapper;

export default MultiselectButton;
