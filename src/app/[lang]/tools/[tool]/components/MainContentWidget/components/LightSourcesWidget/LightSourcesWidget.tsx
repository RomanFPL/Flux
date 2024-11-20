"use client";
import { pollingInterval } from "@/config";
import useToolId from "@/hooks/useToolId";
import { useFetchPredictToolDataQuery, useFetchToolDataQuery } from "@/redux/slices/apiSlice";
import { Grid } from "@mui/material";
import LightSource from "../LightSource/LightSource";
import { GridStyled, RootStyled } from "./LightSourcesWidget.styled";
import { extractLights } from "./helper";

const MAX_ITEMS = 12;

const LightSourcesWidget = () => {
    const { toolId } = useToolId();
    const { data: tool = {} } = useFetchToolDataQuery(toolId, {
        skip: !toolId,
        pollingInterval
    });

    const { data: lightsPrediction = [] } = useFetchPredictToolDataQuery(toolId, {
        skip: !toolId,
        pollingInterval
    });

    const preparedLights = extractLights(tool.cameras, lightsPrediction, {
        maxLength: MAX_ITEMS
    });
    const isCentered = preparedLights.length > 9;
    const isFullWidth = false; // TODO - UPDATE ACCORDING TO LAYOUT

    return (
        <RootStyled isCentered={isCentered}>
            <GridStyled isCentered={isCentered} isFullWidth={isFullWidth}>
                {preparedLights.map((item, index) => {
                    return (
                        <Grid justifySelf={"center"} item key={index}>
                            <LightSource {...item}></LightSource>
                        </Grid>
                    );
                })}
            </GridStyled>
        </RootStyled>
    );
};

export default LightSourcesWidget;
