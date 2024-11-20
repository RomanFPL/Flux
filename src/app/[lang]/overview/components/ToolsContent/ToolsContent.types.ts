export interface ToolContentProps {
    setHiddenTools: (value: number) => void;
}

export type CustomDragEvent = React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLTableRowElement>;
