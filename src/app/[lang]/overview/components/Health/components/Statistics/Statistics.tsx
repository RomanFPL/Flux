import { Toggle } from "@/components";
import { timeLabels, TimeToggleOptions } from "@/types/TimeToggleType";
import { Divider } from "@mui/material";
import { useTranslations } from "next-intl";
import StatisticItem from "../StatisticItem/StatisticItem";
import { StyledBoxColumn, StyledBoxRow } from "./Statistics.styled";
import { StatisticProps } from "./Statistics.types";

const Statistics = ({ dateFilter, errors, predictions }: StatisticProps) => {
    const t = useTranslations();
    const time = t(timeLabels[dateFilter]);

    const statistic = [
        {
            title: `${t("previous")} `,
            timeMarker: dateFilter ? t("time`s_data", { time }) : "-",
            items: errors
        },
        {
            title: `${t("next")} `,
            timeMarker: dateFilter ? t("time`s_data", { time }) : "-",
            items: predictions,
            isRow: true
        }
    ];

    return (
        <StyledBoxColumn>
            {/* TODO SHIR 
            We do not need it here items={Object.values(TimeToggleOptions)}
            this logic should be inside Toggle, that is code duplication
            and if we leave it as it is later we need pass this prop everywhere, but as I see this component 
            does not have other values except this TimeToggleOptions. So it should be inside 
            also it will make our form handling more universal, so we can handle all behavior 
            in the top level component */}
            <Toggle.withController name="selectedTimeFilter" items={Object.values(TimeToggleOptions)} />
            <StyledBoxRow>
                <StatisticItem {...statistic[0]} />
                <Divider orientation="vertical" flexItem />
                <StatisticItem {...statistic[1]} />
            </StyledBoxRow>
        </StyledBoxColumn>
    );
};

export default Statistics;
