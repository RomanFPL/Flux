export interface StatisticProps {
    data?: {
        name: string;
        color: string;
        icon: React.FC<React.SVGProps<SVGSVGElement>>;
        value?: number;
        isValid?: boolean;
    };
}

export interface StyledBoxSymbolProps {
    color?: string;
}

export interface StyledTypographyProps {
    isvalid?: boolean;
}
