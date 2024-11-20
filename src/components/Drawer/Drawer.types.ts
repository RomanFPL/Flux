import { ExtendedNavigationItemProps } from "../NavigationItem/NavigationItem.types";

export interface DrawerProps {
    version?: string;
    selectedItem?: string;
    navItems: ExtendedNavigationItemProps[];
}
