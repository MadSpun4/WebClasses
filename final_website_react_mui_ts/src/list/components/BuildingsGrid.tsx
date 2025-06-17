import mineralsTableData from "../table";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';

function BuildingsGrid() {
    const rows: GridRowsProp = mineralsTableData;
    const columns: GridColDef[] = [
        { field: 'Название', headerName: 'Название', flex: 0.4},
        { field: 'Агрегатное состояние', flex: 0.4},
        { field: 'Плотность', flex: 0.3},
        { field: 'Теплопроводность', flex: 0.3},
        { field: 'Электропроводность', flex: 0.3},
        { field: 'Горючесть'},
        { field: 'Страна', flex: 0.3},
    ];

    return (
        <Container maxWidth="lg" sx={{height: '700px', mt: '20px'}}>
            <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                rows={rows}
                columns={columns}
                showToolbar={true}
            />
        </Container>
    );
}
export default BuildingsGrid;