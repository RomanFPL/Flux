import { IconButton, MultiselectButton, Search } from "@/components";
import { CollapseAllIcon, ExpandAllIcon, GridLayoutIcon, ListIcon } from "@/icons";
import theme from "@/styles/theme/theme";
import { Divider } from "@mui/material";
import { useTranslations } from "next-intl";

import { useFormContext } from "react-hook-form";

import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import {
    StatusBox,
    StatusText,
    StyledDescription,
    StyledStatusBox,
    StyledToolBar,
    ToolBarActions
} from "./WidgetBar.styled";
import { ToolBarProps } from "./WidgetBar.types";

const WidgetBar = ({
    toolCount = 0,
    toolsUp = 0,
    toolsDown = 0,
    toolsMain = 0,
    hiddenDownTools = 0,
    unknownTools = 0,
    statusGroupValue = []
}: ToolBarProps) => {
    const t = useTranslations();

    const { toolsFilters } = useSelector((state: RootState) => state.tools);
    const { getValues } = useFormContext();
    const maxStatusGroups = getValues("selectedStatusGroup").length === statusGroupValue.length;
    const { isGridView } = toolsFilters;

    return (
        <StyledToolBar>
            <StatusBox>
                <StyledStatusBox>
                    <StatusText statusColor={theme.palette.text.primary} opacity={0.5} pr={1} textTransform="uppercase">
                        {t("totalTools", { count: toolCount })}
                    </StatusText>
                    {!!hiddenDownTools && (
                        <StyledDescription>
                            {t("out_of_sight", {
                                elementsAmount: hiddenDownTools
                            })}
                        </StyledDescription>
                    )}
                </StyledStatusBox>
                <StyledStatusBox pt={0.4}>
                    <StatusText statusColor={theme.palette.status.toolUp}>
                        {t("toolsCountUp", { count: toolsUp })}
                    </StatusText>
                    <Divider />
                    <StatusText statusColor={theme.palette.status.toolDown}>
                        {t("toolsCountDown", { count: toolsDown })}
                    </StatusText>
                    <Divider />
                    <StatusText statusColor={theme.palette.status.maintenance}>
                        {t("toolsCountMaint", { count: toolsMain })}
                    </StatusText>
                    <Divider />
                    <StatusText statusColor={theme.palette.status.unknown}>
                        {t("toolsCountUnavailable", {
                            count: unknownTools
                        })}
                    </StatusText>
                </StyledStatusBox>
            </StatusBox>
            <ToolBarActions>
                <IconButton.withController
                    name="isExpandView"
                    disabled={0 === toolCount || !isGridView}
                    tooltipText={t("collapse_all")}
                    actionType="false"
                >
                    <CollapseAllIcon />
                </IconButton.withController>
                <IconButton.withController
                    name="isExpandView"
                    disabled={0 === toolCount || !isGridView}
                    tooltipText={t("expand_all")}
                    actionType="true"
                >
                    <ExpandAllIcon />
                </IconButton.withController>
                <Divider orientation="vertical" flexItem />
                <Search.withController
                    name="searchValue"
                    rules={{
                        pattern: {
                            value: /^[a-zA-Z0-9 ]*$/,
                            message: ""
                        }
                    }}
                    // /[^a-zA-Z0-9 ]/g // TODO!!!!!! - THIS IS USED FOR REPLACING STRINGS ON TYPING
                    defaultName={t("searchPlaceholder")}
                    disabled={!toolCount}
                />
                <MultiselectButton.withController
                    defaultName={t("status")}
                    width={"137px"}
                    items={statusGroupValue}
                    name="selectedStatusGroup"
                    budge={!maxStatusGroups}
                    disabled={!toolCount}
                />
                <IconButton.withController
                    name="isGridView"
                    tooltipText={isGridView ? t("list_layout") : t("grid_layout")}
                >
                    {isGridView ? <ListIcon /> : <GridLayoutIcon />}
                </IconButton.withController>
            </ToolBarActions>
        </StyledToolBar>
    );
};

export default WidgetBar;
