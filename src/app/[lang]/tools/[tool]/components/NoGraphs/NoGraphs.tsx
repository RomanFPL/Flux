import { NoGraphDisplay } from "@/icons";
import { Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { NoGraphsWrapper, TypographyStyled } from "./NoGraphs.styled";
import { NoGraphsProps } from "./NoGraphs.types";

const NoGraphs = ({ numberGraphs }: NoGraphsProps) => {
    const t = useTranslations();

    return (
        <NoGraphsWrapper>
            <Stack gap={4} alignItems="center" direction={"row"}>
                <NoGraphDisplay />
                <TypographyStyled>{numberGraphs > 0 ? t("no_graph") : t("no_graphs")}</TypographyStyled>
            </Stack>
        </NoGraphsWrapper>
    );
};

export default NoGraphs;
