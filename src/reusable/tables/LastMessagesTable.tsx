import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { getLastMessagesColumns } from './useLastMessageTable';

export const LastMessagesTable = () => {

    const [rows, setRows] = useState<GridRowsProp>([]);
    const [columns, setColumns] = useState<GridColDef[]>([]);

    useEffect(() => {
        const getColumns = async () => {
            const columns = await getLastMessagesColumns();
            setColumns(columns);
        };
        getColumns();
    }, []);

    useEffect(() => {
        const getRows = async () => {
            const rows = await getLastMessagesColumns();
            setRows(rows);
        };
        getRows();
    }, []);

    return (
        <div className='LastMessagesTableRoot'>
            <div className='content'>
                <DataGrid rows={rows} columns={columns}  />

            </div>
        </div>
    );
};