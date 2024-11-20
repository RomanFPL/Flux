"use client";
import { IconButton, Loading } from "@/components/index";
import useToolGridPlate from "@/hooks/useToolGridPlate";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import MainContentWidget from "./components/MainContentWidget/MainContentWidget";
import ReportWidget from "./components/ReportWidget/ReportWidget";
import WarningsWidget from "./components/WarningsWidget/WarningsWidget";
import {
    InfoSection,
    LayoutBox,
    ReportsSection,
    StyledLink,
    StyledNextBox,
    StyledPrevBox,
    WarningsSection
} from "./page.styled";
import { ToolsProps } from "./page.types";
import useNavigationConfig from "@/hooks/useNavigationConfig";
import { useFetchToolsQuery } from "@/redux/slices/apiSlice";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { NextIcon, PrevIcon } from "@/icons";

const Tools = ({ params: { tool: toolId } }: ToolsProps) => {
    const t = useTranslations();
    const selectedLayout = useToolGridPlate(toolId);
    const { loading } = useSelector((state: RootState) => state.user);

    const { data: tools = [] } = useFetchToolsQuery();

    const path = usePathname();

    const toolsIds = tools.map(({ toolId, machineName }) => ({
        toolId: String(toolId),
        machineName: String(machineName)
    }));

    const navItems = useNavigationConfig({ tools: toolsIds });

    const [toolsItemsList] = navItems.filter(item => item.name === t("tools"));

    const toolsItems = toolsItemsList?.children || [];

    const currentToolIndex = toolsItems.findIndex(item => item.link === path);

    const prevTool = currentToolIndex > 0 ? toolsItems[currentToolIndex - 1] : null;
    const nextTool = currentToolIndex < toolsItems.length - 1 ? toolsItems[currentToolIndex + 1] : null;

    return (
        <Loading loading={loading}>
            <LayoutBox selectedLayout={selectedLayout}>
                <StyledPrevBox>
                    {prevTool && (
                        <StyledLink href={prevTool?.link || ""}>
                            <IconButton bgVariant="navigation">
                                <PrevIcon />
                            </IconButton>
                        </StyledLink>
                    )}
                </StyledPrevBox>
                <InfoSection selectedLayout={selectedLayout}>
                    <MainContentWidget toolId={toolId} />
                </InfoSection>
                <WarningsSection selectedLayout={selectedLayout}>
                    <WarningsWidget toolId={toolId} />
                </WarningsSection>
                <ReportsSection selectedLayout={selectedLayout}>
                    <ReportWidget toolId={toolId} />
                </ReportsSection>
                <StyledNextBox>
                    {nextTool && (
                        <StyledLink href={nextTool?.link || ""}>
                            <IconButton bgVariant="navigation">
                                <NextIcon />
                            </IconButton>
                        </StyledLink>
                    )}
                </StyledNextBox>
            </LayoutBox>
        </Loading>
    );
};

export default Tools;
