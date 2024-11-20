import { NoToolsMatchs } from "@/icons";
import NoToolsFound from "@/icons/NoToolsFound";
import { RootState } from "@/redux";
import { predefinedStatusGroups } from "@/types/statusGroup.types";
import { Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import useGetSubMessage from "../../hooks/useGetSubMessage";
import { NoToolsWrapper } from "./NoTools.styled";
import { NoToolsProps } from "./NoTools.types";

const NoTools = ({ isNoData }: NoToolsProps) => {
    const t = useTranslations();
    const { toolsFilters } = useSelector((state: RootState) => state.tools);
    const { searchValue, selectedStatusGroup } = toolsFilters;
    const isSearch = searchValue !== "";
    const isStatusGroup = selectedStatusGroup.length !== predefinedStatusGroups.length;
    const subMessage = useGetSubMessage(isSearch, isStatusGroup);

    return (
        <NoToolsWrapper>
            <Stack gap={4} alignItems="center">
                {isNoData ? <NoToolsFound /> : <NoToolsMatchs />}
                <Stack gap={2} alignItems="center">
                    <Typography variant="h2">{isNoData ? t("no_tools") : t("no_tools_found")}</Typography>
                    {<Typography variant="body1">{subMessage}</Typography>}
                </Stack>
            </Stack>
        </NoToolsWrapper>
    );
};

export default NoTools;
