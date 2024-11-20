import React from "react";
import { ContextMainMenu } from "./components/index";
import DefaultSelectMenu from "./components/DefaultSelectMenu/DefaultSelectMenu";
import { isContextMenuProps, isDefaultSelectMenuProps, isFormSelectProps, SelectProps } from "./Select.types";
import FormSelectField from "./components/FormSelectField/FormSelectField";

const Select = (props: SelectProps) => {
    if (isContextMenuProps(props)) {
        return <ContextMainMenu {...props} />;
    }

    if (isDefaultSelectMenuProps(props)) {
        return <DefaultSelectMenu {...props} />;
    }

    if (isFormSelectProps(props)) {
        return <FormSelectField {...props} />;
    }

    return null;
};

export default Select;
