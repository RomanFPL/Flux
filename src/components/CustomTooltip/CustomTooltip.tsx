import { StyledBoxTooltip, StyledTooltipComponent } from "./CustomTooltip.styled";
import { CustomTooltipProps } from "./CustomTooltip.types";

import React from "react";

const CustomTooltip = ({ children, tailDirection = "top", type = "default", style }: CustomTooltipProps) => {
    if (type === "block") return <StyledBoxTooltip style={style}>{children}</StyledBoxTooltip>;

    return (
        <StyledTooltipComponent style={style} tailDirection={tailDirection}>
            {children}
        </StyledTooltipComponent>
    );
};

export default CustomTooltip;
