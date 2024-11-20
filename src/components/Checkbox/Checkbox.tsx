import React from "react";
import CustomCheckbox from "./Checkbox.styled";
import { CheckboxProps } from "@mui/material";

const Checkbox: React.FC<CheckboxProps> = props => {
    return <CustomCheckbox {...props} />;
};

export default Checkbox;
