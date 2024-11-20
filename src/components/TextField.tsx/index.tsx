import React from "react";
import TextFieldRoot from "./TextField";
import TextFieldControllerWrapper from "./TextFieldControllerWrapper";

const TextField = (props: React.ComponentProps<typeof TextFieldRoot>) => {
    return <TextFieldRoot {...props} />;
};

TextField.withController = TextFieldControllerWrapper;

export default TextField;
