import { IconButton } from "@/components";
import { pollingInterval } from "@/config";
import MinimizeIcon from "@/icons/MinimizeIcon";
import { useFetchHealthQuery } from "@/redux/slices/apiSlice";
import { TimeToggleOptions } from "@/types/TimeToggleType";
import { useTranslations } from "next-intl";
import Statistics from "./components/Statistics/Statistics";
import { StyledIconBox } from "./Health.styled";
import usePrepareHealthRows from "./helper";

const HealthStatistics = ({
    dateFilter,
    dateRange
}: {
    dateFilter: TimeToggleOptions;
    dateRange: [string, string];
}) => {
    const t = useTranslations();
    const [startDate, endDate] = dateRange;

    const { data: health = {} } = useFetchHealthQuery({ startDate, endDate }, { pollingInterval });
    const { errors, predictions } = usePrepareHealthRows(health);

    return (
        <>
            <Statistics {...{ errors, predictions, dateFilter }} />
            <StyledIconBox>
                <IconButton.withController name="visible" actionType="false" tooltipText={t("minimize")}>
                    <MinimizeIcon />
                </IconButton.withController>
            </StyledIconBox>
        </>
    );
};

export default HealthStatistics;
