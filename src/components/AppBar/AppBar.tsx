import { IconButton } from "@/components";
import Select from "@/components/Select";
import useToolId from "@/hooks/useToolId";
import { ExportIcon } from "@/icons";
import { useFetchToolDataQuery } from "@/redux/slices/apiSlice";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import FormWrapper from "../FormWrapper/FormWrapper";
import { StyledAccountWrapper, StyledAppBar, StyledDivider, StyledToolbar } from "./AppBar.styled";
import { AppBarProps } from "./AppBar.types";
import AccountWrapper from "./components/AccountWrapper/AccountWrapper";
import AppBarLeft from "./components/AppBarLeft/AppBarLeft";
import Avatar from "./components/Avatar/Avatar";
import ViewSelector from "./components/ViewSelector/ViewSelector";
import useExpandWidgetState from "./hooks/useExpandWidgetState";
import useUIViewState from "./hooks/useUIViewState";

const AppBar = ({ pageName, accountName, accountImage, isToolPage }: AppBarProps) => {
    const t = useTranslations();
    const { loading } = useSelector((state: RootState) => state.user);

    const { toolId } = useToolId();
    const { data: tool = {} } = useFetchToolDataQuery(toolId, {
        skip: !toolId
    });

    const departments = [{ value: "WATD", text: t("WATD") }];

    const { defaultUI, onSubmitUIView } = useUIViewState();
    const { items, defaultWidgetsVisibility, onSubmitWidgetsVisibility } = useExpandWidgetState(isToolPage);

    if (loading) return null;

    return (
        <StyledAppBar>
            <StyledToolbar>
                <FormWrapper
                    defaultValues={defaultWidgetsVisibility}
                    onSubmit={onSubmitWidgetsVisibility}
                    mode="onChange"
                >
                    <AppBarLeft pageName={pageName} items={items} />
                </FormWrapper>
                <StyledAccountWrapper>
                    {isToolPage && <AccountWrapper tool={tool} />}
                    <FormWrapper defaultValues={defaultUI} onSubmit={onSubmitUIView} mode="onChange">
                        <ViewSelector />
                    </FormWrapper>
                    <Select
                        type="default"
                        width="125px"
                        selectedValue={departments[0]}
                        items={departments}
                        borderColor="transparent"
                        name="departments"
                    />
                    <IconButton tooltipText={t("export")} bgVariant="navigation">
                        <ExportIcon />
                    </IconButton>
                    <StyledDivider />
                    <Avatar {...{ accountName, accountImage }} />
                </StyledAccountWrapper>
            </StyledToolbar>
        </StyledAppBar>
    );
};

export default AppBar;
