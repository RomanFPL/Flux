import useGridPlate from "@/hooks/useGridPlate";
import { Layouts } from "../../../../page.types";
import Statistic from "../../../Statistics/Statistic";
import { Item } from "../../Health.types";
import {
    StyledBoxColumn17,
    StyledBoxFlexExpand,
    StyledBoxGrid,
    StyledBoxGridRow,
    StyledTitleInnerSpan,
    StyledTitleOuterTypography
} from "./StatisticItem.styled";
import { StatisticItemProps } from "./StatisticItem.types";

const StatisticItem = ({ items, title, timeMarker, isRow }: StatisticItemProps) => {
    // TODO later we should move it to separate function everywhere
    const grid = useGridPlate();
    const isHealthExpand = Layouts.health_tools === grid;
    const ItemList = isHealthExpand ? StyledBoxFlexExpand : isRow ? StyledBoxGridRow : StyledBoxGrid;
    return (
        <StyledBoxColumn17>
            <StyledTitleOuterTypography>
                <StyledTitleInnerSpan>{`${title} `}</StyledTitleInnerSpan>
                {timeMarker}
            </StyledTitleOuterTypography>
            <ItemList>
                {items.map((item: Item, index: number) => (
                    <Statistic key={index} data={item} />
                ))}
            </ItemList>
        </StyledBoxColumn17>
    );
};

export default StatisticItem;
