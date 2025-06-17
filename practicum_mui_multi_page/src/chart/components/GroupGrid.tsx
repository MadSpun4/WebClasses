import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { ruRU } from "@mui/x-data-grid/locales";
import Container from "@mui/material/Container";
import { tGroup } from "../groupdata";

type GroupProps = {
  data: tGroup;
};

const GroupGrid = ({ data } : GroupProps) => {
    const rows: GridRowsProp = data;

    const columns: GridColDef[] = [
        {
            field: "Группа",
            headerName: "Группа",
            flex: 1,
        },
        {
            field: "Минимальная высота",
            headerName: "Мин. высота, м",
            flex: 1,
            type: "number",
        },
        {
            field: "Максимальная высота",
            headerName: "Макс. высота, м",
            flex: 1,
            type: "number",
        },
        {
            field: "Средняя высота",
            headerName: "Сред. высота, м",
            flex: 1,
            type: "number",
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ height: 600, mt: 4 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[5, 10, 20]}
                showToolbar
                disableRowSelectionOnClick
            />
        </Container>
    );
};

export default GroupGrid;
