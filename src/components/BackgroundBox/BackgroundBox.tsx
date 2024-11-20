import React from "react";
import { BackgroundBoxProps } from "./BackgroundBox.types";
import { StyledBox, StyledPopper } from "./BackgroundBox.styled";

const BackgroundBox = ({ isVisible, handler }: BackgroundBoxProps) => {
    const container = typeof document !== "undefined" ? document.body : null;
    const anchorEl = typeof document !== "undefined" ? document.body : null;
    return (
        <StyledPopper open={isVisible} container={container} anchorEl={anchorEl}>
            <StyledBox onClick={handler} />
        </StyledPopper>
    );
};

export default BackgroundBox;
