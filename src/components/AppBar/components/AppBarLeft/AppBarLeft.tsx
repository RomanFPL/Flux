import { IconTextButton } from "@/components";
import { ExpandIcon } from "@/icons";
import theme from "@/styles/theme/theme";
import { useTranslations } from "next-intl";
import { StyledDivider } from "../../AppBar.styled";
import { StyledExpandButtons, StyledTypography } from "./AppBarLeft.styled";
import { AppBarLeftProps } from "./AppBarLeft.types";

const AppBarLeft = ({ pageName, items }: AppBarLeftProps) => {
    const t = useTranslations();

    return (
        <StyledExpandButtons direction="row" spacing={theme.spacing(3)}>
            <StyledTypography variant="h4">{pageName}</StyledTypography>
            {items.length > 0 && <StyledDivider />}
            {items.map(widgetName => (
                <IconTextButton.withController
                    key={widgetName}
                    name={widgetName}
                    bgVariant="navigation"
                    icon={<ExpandIcon />}
                >
                    {t(widgetName)}
                </IconTextButton.withController>
            ))}
        </StyledExpandButtons>
    );
};

export default AppBarLeft;
