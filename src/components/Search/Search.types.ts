import { ChangeEventHandler } from "react";
import { RegisterOptions } from "react-hook-form";

export interface SearchProps {
    name?: string;
    disabled?: boolean;
    defaultName: string;
    searchValue: string;
    // setSearchValue: (value: string) => void;
    rules?: RegisterOptions;
    reset?: () => void;
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export interface Item {
    value: any;
    text: string;
}

export interface StylesSelectProps {
    width?: string;
    bordercolor?: string;
    isOpen?: boolean;
}
