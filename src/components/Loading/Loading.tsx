import React from "react";
import { CircularProgress, Stack } from "@mui/material";

interface LoadingProps {
    loading: boolean;
    children?: React.ReactNode;
    height?: string;
}

const Loading: React.FC<LoadingProps> = ({ loading, children, height = "100%" }) => {
    if (loading) {
        return (
            <Stack direction="column" alignItems="center" justifyContent="center" height={height} minHeight="50px">
                <CircularProgress />
            </Stack>
        );
    }

    return <>{children}</>;
};

export default Loading;
