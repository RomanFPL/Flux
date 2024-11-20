import React from "react";
import TextAreaRoot from "./TextArea";
import TextAreaControllerWrapper from "./TextAreaControllerWrapper";

const TextArea = (props: React.ComponentProps<typeof TextAreaRoot>) => {
    return <TextAreaRoot {...props} />;
};

TextArea.withController = TextAreaControllerWrapper;

export default TextArea;
