import { ToolTabs } from "@/types/ToolTabsType";

export interface MainContentToolbarProps {
    activeTab: ToolTabs;
    handleTabChange: (event: React.MouseEvent<HTMLElement>, newValue: ToolTabs | null) => void;
    // tool: string;
    // lang: string;
}
