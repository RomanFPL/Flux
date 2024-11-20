import React from "react";
import SelectRoot from "./Select";
import SelectControllerWrapper from "./SelectControllerWrapper";

const Select = (props: React.ComponentProps<typeof SelectRoot>) => {
    return <SelectRoot {...props} />;
};

Select.withController = SelectControllerWrapper;

export default Select;
