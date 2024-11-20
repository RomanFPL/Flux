export interface LegendLabel {
    text: string;
    color: string;
    isMarked?: boolean;
}

export interface CustomLegendProps {
    labels: LegendLabel[];
    withDivider?: boolean;
    // markedItems?: string[];
}
