import { SelectProps } from "@mui/material";

export interface AppBarProps {
    pageName?: string;
    accountName?: string;
    accountImage?: string;
    isToolPage?: boolean;
}

export type StyledSelectProps = SelectProps & {
    widthVariant?: "large" | "middle";
};

export interface MinimizeFormData {
    health: boolean;
    reports: boolean;
}

export interface MinimizeToolFormData {
    warnings: boolean;
    warningsMax: boolean;
    reports: boolean;
}

export type CombinedFormData = MinimizeToolFormData | MinimizeFormData;

export interface UserFormData {
    view: string;
}
