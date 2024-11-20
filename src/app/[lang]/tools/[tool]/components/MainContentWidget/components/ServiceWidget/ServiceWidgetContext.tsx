import React, { createContext, useContext, useState, ReactNode } from "react";
import { useFetchToolDataQuery, useFetchToolMaintenanceDataQuery } from "@/redux/slices/apiSlice";
import { pollingInterval } from "@/config";
import { MaintenanceTask, ToolInfo } from "@/services/openApi/api";
import useToolId from "@/hooks/useToolId";

interface ServiceWidgetContextType {
    toolData: ToolInfo;
    maintenanceData: MaintenanceTask[];
    loading: boolean;
    setLoading: (state: boolean) => void;
    selectedRows: string[];
    setSelectedRows: (ids: string[]) => void;
    filters: { [key: string]: any };
    setFilters: (newFilters: { [key: string]: any }) => void;
}

const ServiceWidgetContext = createContext<ServiceWidgetContextType | undefined>(undefined);

interface ServiceWidgetProviderProps {
    children: ReactNode;
}

export type ServiceFilters = {
    dateFilter: string[];
};

export const ServiceWidgetProvider: React.FC<ServiceWidgetProviderProps> = ({ children }) => {
    const { toolId } = useToolId();
    const { data: maintenanceData = [], isLoading } = useFetchToolMaintenanceDataQuery(toolId, {
        skip: !toolId,
        pollingInterval
    });
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState<{ [key: string]: any }>({});

    const { data: toolData = {} } = useFetchToolDataQuery(toolId, {
        skip: !toolId,
        pollingInterval
    });

    const contextValue: ServiceWidgetContextType = {
        toolData,
        maintenanceData,
        loading: isLoading || loading,
        setLoading,
        selectedRows,
        setSelectedRows,
        filters,
        setFilters
    };

    return <ServiceWidgetContext.Provider value={contextValue}>{children}</ServiceWidgetContext.Provider>;
};

export const useServiceWidget = () => {
    const context = useContext(ServiceWidgetContext);
    if (!context) {
        throw new Error("useServiceWidget must be used within a ServiceWidgetProvider");
    }
    return context;
};

const withServiceWidgetProvider = <P extends object>(Component: React.ComponentType<P>) => {
    return function WrappedComponent(props: P) {
        return (
            <ServiceWidgetProvider>
                <Component {...props} />
            </ServiceWidgetProvider>
        );
    };
};

export default withServiceWidgetProvider;
