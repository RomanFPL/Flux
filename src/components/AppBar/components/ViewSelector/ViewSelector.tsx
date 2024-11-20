import React from "react";
import Select from "../../../Select";
import { useViewChange, useViewItems } from "../../hooks";
import { useFormContext } from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";
import useContextAction from "../../hooks/useContextAction";
import { usePathname } from "next/navigation";
import useBeforeUnload from "../../hooks/useBeforeUnload";

const ViewSelector: React.FC = () => {
    const { setValue } = useFormContext();

    const { isMutated } = useViewChange();

    const { handleUnsavedView, selectedView } = useContextAction();

    const path = usePathname();

    const { viewsMenu } = useViewItems();

    useBeforeUnload(isMutated);

    const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
        event.preventDefault();
        event.stopPropagation();
        if (isMutated) handleUnsavedView(String(event.target.value));
        if (!isMutated) setValue("view", event.target.value);
    };

    const selected = viewsMenu?.find(({ value }) => value === selectedView) || null;
    const isDisabled = !path.endsWith("overview");

    return (
        <Select
            type="contextMenu"
            width="145px"
            selectedValue={selected}
            handleChange={handleSelectChange}
            items={viewsMenu}
            borderColor="transparent"
            listName="VIEWS"
            disabled={isDisabled}
        />
    );
};

export default ViewSelector;
