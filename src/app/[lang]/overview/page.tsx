"use client";
import { useSelector } from "react-redux";
import { Loading } from "../../../components/index";
import Health from "./components/Health/Health";
import ReportWidget from "./components/ReportWidget/ReportWidget";
import ToolsWidget from "./components/ToolsWidget/ToolsWidget";
import { HealthSection, LayoutBox, ReportsSection, ToolsSection } from "./page.styled";
import useGridPlate from "@/hooks/useGridPlate";
import { RootState } from "@/redux/store";

const Overview = () => {
    const selectedLayout = useGridPlate();
    const { loading } = useSelector((state: RootState) => state.user);

    return (
        <Loading loading={loading}>
            <LayoutBox selectedLayout={selectedLayout}>
                <HealthSection selectedLayout={selectedLayout}>
                    <Health />
                </HealthSection>
                <ToolsSection selectedLayout={selectedLayout}>
                    <ToolsWidget />
                </ToolsSection>
                <ReportsSection selectedLayout={selectedLayout}>
                    <ReportWidget />
                </ReportsSection>
            </LayoutBox>
        </Loading>
    );
};

export default Overview;
