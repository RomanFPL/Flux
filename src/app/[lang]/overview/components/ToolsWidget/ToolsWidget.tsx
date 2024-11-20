/* eslint-disable indent */
import FormWrapper from "@/components/FormWrapper/FormWrapper";
import { pollingInterval } from "@/config";
import { useFetchToolsStatusesQuery } from "@/redux/slices/apiSlice";
import {
    updateExpandView,
    updateSearchValue,
    updateSelectedStatusGroup,
    updateViewType
} from "@/redux/slices/toolsSlice";
import { getToolsFilterInit } from "@/utils/getWidgetInitState";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ToolsContent from "../ToolsContent/ToolsContent";
import WidgetBar from "../WidgetBar/WidgetBar";
import prepareToolBarStatus from "./helper/prepareToolBarStatus";
import { StyledStack } from "./ToolsWidget.styled";
import { ToolsFilterData } from "./ToolsWidget.types";

const ToolsWidget = () => {
    const dispatch = useDispatch();
    const { data: tools = [] } = useFetchToolsStatusesQuery(void 0, {
        pollingInterval
    });

    const [hiddenTools, setHiddenTools] = useState<number>(0);
    const toolbarStatus = prepareToolBarStatus(tools, hiddenTools);

    const { searchValue, selectedStatusGroup, isGridView, isExpandView, changeExpandFlag } = getToolsFilterInit();

    const toolValues = { searchValue, selectedStatusGroup, isGridView, isExpandView, changeExpandFlag };

    const onSubmitFilters = (data: ToolsFilterData) => {
        dispatch(updateSearchValue(data.searchValue));
        dispatch(updateSelectedStatusGroup(data.selectedStatusGroup));
        dispatch(updateViewType(data.isGridView));
        dispatch(updateExpandView(data.isExpandView));
    };

    return (
        <StyledStack>
            <FormWrapper mode="onChange" defaultValues={toolValues} onSubmit={onSubmitFilters}>
                <WidgetBar statusGroupValue={selectedStatusGroup} {...toolbarStatus} />
            </FormWrapper>
            <ToolsContent setHiddenTools={setHiddenTools}></ToolsContent>
        </StyledStack>
    );
};

export default ToolsWidget;
