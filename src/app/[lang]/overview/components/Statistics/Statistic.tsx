import { NonValidIcon, ValidIcon } from "@/icons";
import { Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import {
    StyledBoxData,
    StyledBoxNameData,
    StyledBoxOuter,
    StyledBoxSymbol,
    StyledSpan,
    StyledTypography
} from "./Statistic.styled";
import { StatisticProps } from "./Statistic.types";

const Statistic = (props: StatisticProps) => {
    const t = useTranslations();
    const theme = useTheme();

    const {
        data: {
            // default data
            name = "Statistic",
            color = theme.palette.errors.alignment,
            icon: Icon,
            value = 0,
            isValid
        } = {}
    } = props;

    return (
        <StyledBoxOuter>
            {/*-------Rectangle + Icon -------*/}
            <StyledBoxSymbol color={color}>{Icon && <Icon />}</StyledBoxSymbol>
            <StyledBoxNameData>
                {/*-------Valid/ invalid icon + Value-------*/}
                <StyledBoxData>
                    {isValid !== undefined ? isValid ? <ValidIcon /> : <NonValidIcon></NonValidIcon> : <></>}
                    <StyledTypography variant="h2">
                        {value} {isValid === undefined && <StyledSpan>{t("tools")}</StyledSpan>}
                    </StyledTypography>
                </StyledBoxData>
                {/*-------Name-------*/}
                <Typography>{name}</Typography>
            </StyledBoxNameData>
        </StyledBoxOuter>
    );
};

export default Statistic;
