import { Stack, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { ColorBox, LegendContainer, LegendItem, StyledDivider } from "./CustomLegend.styled";
import { CustomLegendProps } from "./CustomLegend.types";

const CustomLegend: React.FC<CustomLegendProps> = ({ labels, withDivider }) => {
    const theme = useTheme();
    // const { TPT } = useSelector((state: RootState) => state.reports);
    // const { worstTools } = TPT;
    // const worstToolsIds = worstTools.map(item => {
    //     return item.value;
    // });

    return (
        <LegendContainer>
            {labels.map((label, index) => (
                <React.Fragment key={index}>
                    <LegendItem>
                        <ColorBox color={label.color} />
                        <Stack direction="row" alignItems="center" gap="3px">
                            <Typography variant="body2" color="textPrimary">
                                {label.text}
                            </Typography>
                            {label.isMarked && (
                                <Typography fontWeight="bold" fontSize={"16px"} color={theme.palette.charts.orange}>
                                    {"!"}
                                </Typography>
                            )}
                        </Stack>
                    </LegendItem>
                    {index === 0 && withDivider && <StyledDivider />}
                </React.Fragment>
            ))}
        </LegendContainer>
    );
};

export default CustomLegend;
