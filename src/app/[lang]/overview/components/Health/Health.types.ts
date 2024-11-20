export interface Item {
    name: string;
    color: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    value?: number;
    isValid?: boolean;
}
