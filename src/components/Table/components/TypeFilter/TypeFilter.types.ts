import { Item } from "@/components/MultiselectButton/MultiselectButton.types";

export interface TypeFilterProps {
    items: Item[];
    selectedItems: string[];
    setSelectedItems: (items: string[]) => void;
    children?: React.ReactNode;
    withFilterIcon?: boolean;
}
