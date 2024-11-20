export interface StyledSelectButtonProps {
    name?: string;
    defaultName: string;
    items?: Item[];
    selectedItems: Item[];
    setSelectedItems: (items: Item[]) => void;
    width?: string;
    bordercolor?: string;
    disabled?: boolean;
    maxSelection?: MaxSelectionProps;
    type?: Array<"search" | "mark" | "default">;
    budge?: boolean;
    markedItems?: string[];
}

export interface MaxSelectionProps {
    value: number;
    type: "warning" | "disabled";
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

export interface MenuItemWrapperProps {
    disabled?: boolean;
}
export interface MultiselectControllerWrapperProps
    extends Omit<StyledSelectButtonProps, "selectedItems" | "setSelectedItems"> {
    name: string;
}
