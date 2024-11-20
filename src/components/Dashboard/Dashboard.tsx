import useMidnightUpdate from "@/hooks/useMidnightUpdate";
import useNavigationConfig from "@/hooks/useNavigationConfig";
import { RootState } from "@/redux";
import { useFetchToolsQuery } from "@/redux/slices/apiSlice";
import CssBaseline from "@mui/material/CssBaseline";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import AppBar from "../AppBar/AppBar";
import DialogFactory from "../Dialog/Dialog";
import Drawer from "../Drawer/Drawer";
import { StyledBox } from "./Dashboard.styled";
import { DashboardProps } from "./Dashboard.types";

const Dashboard = ({ children, version }: DashboardProps) => {
    const { data } = useSelector((state: RootState) => state.user);
    const { data: tools = [] } = useFetchToolsQuery();
    const { dialogConfig } = useSelector((state: RootState) => state.dialog);

    // Trigger datetime update on midnight
    useMidnightUpdate(tools);

    const toolsIds = tools.map(({ toolId, machineName }) => ({
        toolId: String(toolId),
        machineName: String(machineName)
    }));

    const navItems = useNavigationConfig({ tools: toolsIds });
    const path = usePathname();

    //TODO split into separate function
    const pageInfo = navItems.reduce(
        (result, cv) => {
            if (!result.pageName && cv.children) {
                const foundChild = cv.children.find(({ link }) => link === path);
                if (foundChild) {
                    return {
                        pageName: foundChild.name,
                        isToolPage: true
                    };
                }
            }
            if (!result.pageName && cv.link === path) {
                return {
                    pageName: cv.name,
                    isToolPage: false
                };
            }
            return result;
        },
        { pageName: "", isToolPage: false }
    );

    return (
        <StyledBox>
            <CssBaseline />
            <AppBar pageName={pageInfo.pageName} isToolPage={pageInfo.isToolPage} accountName={data.username} />
            <Drawer navItems={navItems} version={version} selectedItem={path} />
            {children}
            {dialogConfig && <DialogFactory {...dialogConfig} />}
        </StyledBox>
    );
};

export default Dashboard;
