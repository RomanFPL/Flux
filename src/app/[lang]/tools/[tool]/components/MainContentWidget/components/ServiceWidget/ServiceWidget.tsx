import { Loading, Table } from "@/components";
import { Stack } from "@mui/material";
import ServiceTableToolbar from "./components/ServiceTableToolbar/ServiceTableToolbar";
import { getDateRangeFromData, getUniqueServiceTypes, transformData, useTableHeadData } from "./helper";
import { StyledTableContainer } from "./ServiceWidget.styled";
import withServiceWidgetProvider, { useServiceWidget } from "./ServiceWidgetContext";
import ServiceTabInformation from "./components/ServiceTabInformation/ServiceTabInformation";
import useToolbarActions from "./components/ServiceTableToolbar/helper/useToolbarActions";

const ServiceWidget = () => {
    const { maintenanceData, loading, selectedRows, setSelectedRows, filters, setFilters } = useServiceWidget();

    const headData = useTableHeadData();
    const contentData = transformData(maintenanceData);
    const { onPreviewClick } = useToolbarActions();

    const filtersData = {
        dateRange: !!maintenanceData.length ? getDateRangeFromData(maintenanceData) : (["", ""] as [string, string]),
        types: !!maintenanceData.length ? getUniqueServiceTypes(maintenanceData) : []
    };

    return (
        <Stack mt={3} spacing={3}>
            <ServiceTabInformation />
            <StyledTableContainer>
                <Loading loading={loading} height="100px">
                    <ServiceTableToolbar />
                    <Table
                        onPreviewClick={onPreviewClick}
                        selectedRows={selectedRows}
                        handleSelectedRows={setSelectedRows}
                        headData={headData}
                        contentData={contentData}
                        filtersData={filtersData}
                        type="checkbox"
                        filters={filters}
                        setFilters={setFilters}
                    />
                </Loading>
            </StyledTableContainer>
        </Stack>
    );
};

export default withServiceWidgetProvider(ServiceWidget);
