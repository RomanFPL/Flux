import React from "react";
import { BackgroundBoxProps } from "./BackgroundBox.types";
import { StyledBox, StyledPopper } from "./BackgroundBox.styled";

const BackgroundBox = ({ isVisible, handler, zindex }: BackgroundBoxProps) => {
    return (
        <StyledPopper open={isVisible} container={document.body} anchorEl={document.body} zindex={zindex}>
            <StyledBox id="test12" onClick={handler} />
        </StyledPopper>
    );
};

export default BackgroundBox;
