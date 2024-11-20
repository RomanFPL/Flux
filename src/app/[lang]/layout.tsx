"use client";
import { Dashboard } from "@/components";
import { store } from "@/redux";
import theme from "@/styles/theme/theme";
import { ThemeProvider } from "@mui/material";
import dynamic from "next/dynamic";
import { ReactNode, Suspense } from "react";
import { Provider } from "react-redux";
import Loading from "../loading";
import packageJson from "./../../../package.json";
import { MainContent } from "./layout.styled";

interface LangLayoutProps {
    children: ReactNode;
    params: {
        lang: string;
    };
}

const LangLayout = ({ children }: LangLayoutProps) => {
    // Important: We should dynamically load components which use ReduxProvider, ThemeProvider
    const DynamicChildren = dynamic(() => Promise.resolve(() => <>{children}</>), { ssr: false });
    // Important: Trigger to init redux middleware
    store.dispatch({ type: "INITIALIZE_DASHBOARD" });

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Dashboard version={packageJson.version}>
                    <Suspense fallback={<Loading></Loading>}>
                        <MainContent>
                            <DynamicChildren />
                        </MainContent>
                    </Suspense>
                </Dashboard>
            </ThemeProvider>
        </Provider>
    );
};

export default LangLayout;
