import { Theme } from "@mui/material";
import { getLccLightPalateColors, getToolsPalateColors } from "./constants";

interface ToolDataPointsProps {
    toolId: string;
    values: number[];
    labels?: string[];
}

interface LccDataPointsProps {
    lightName: string;
    values: number[];
    labels?: string[];
}

export const getAverageDataPoints = ({
    values,
    label,
    theme,
    isDashed
}: {
    values: number[];
    label?: string;
    theme: Theme;
    isDashed: boolean;
}) => ({
    label: label,
    data: values,
    borderColor: theme.palette.primary.main,
    borderWidth: 3,
    backgroundColor: theme.palette.primary.main,
    borderDash: isDashed ? [] : [10, 4],
    pointRadius: 3
});

export const getGeneralDataPoints = ({ dataRange, theme }: { dataRange: ToolDataPointsProps[]; theme: Theme }) => {
    const toolsColors = getToolsPalateColors(theme);
    return dataRange.map((item, index) => ({
        label: item.toolId,
        data: item.values,
        borderColor: toolsColors[index] || theme.palette.shadow,
        backgroundColor: toolsColors[index] || theme.palette.shadow,
        borderWidth: 3,
        pointRadius: 3,
        isMarked: false
    }));
};

export const getLCCDataPoints = ({ dataRange, theme }: { dataRange: LccDataPointsProps[]; theme: Theme }) => {
    const lightColors = getLccLightPalateColors(theme);
    return dataRange.map((item, index) => ({
        label: item.lightName,
        data: item.values,
        borderColor: lightColors[index] || theme.palette.shadow,
        backgroundColor: lightColors[index] || theme.palette.shadow,
        borderWidth: 3,
        pointRadius: 3,
        isMarked: false
    }));
};
