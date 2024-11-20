import { DropDownIcon } from "@/icons";
import TableFilterIcon from "@/icons/TableFilterIcon";

interface FilterIconsProps {
    withFilterIcon?: boolean;
}

const FilterIcons: React.FC<FilterIconsProps> = ({ withFilterIcon }) => {
    return (
        <>
            <DropDownIcon />
            {withFilterIcon && <TableFilterIcon />}
        </>
    );
};

export default FilterIcons;
