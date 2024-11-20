import { SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";

interface Item {
    value: string | Date | number;
    text: string;
}

export interface FormSelectFieldProps {
    type: "formField";
    name?: string;
    label?: string;
    items?: Item[];
    selectedValue: Item | null;
    handleChange?: (event: SelectChangeEvent<unknown>, child: ReactNode) => void;
    disabled?: boolean;
    children?: React.ReactNode;
    width?: string;
    borderColor?: string;
    required?: boolean;
}
