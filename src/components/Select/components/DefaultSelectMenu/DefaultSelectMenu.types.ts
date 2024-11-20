import { SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";

interface Item {
    value: string | Date;
    text: string;
}

export interface DefaultSelectMenuProps {
    type: "default";
    name?: string;
    items?: Item[];
    selectedValue: Item | null;
    handleChange?: (event: SelectChangeEvent<unknown>, child: ReactNode) => void;
    disabled?: boolean;
    children?: React.ReactNode;
    width?: string;
    borderColor?: string;
}
