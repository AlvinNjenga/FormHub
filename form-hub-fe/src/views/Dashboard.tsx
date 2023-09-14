import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { SubmissionsQuery } from '../gql/graphql';
import { startCase, uniq } from 'lodash';

const Dashboard: React.FC = () => {
    const { data, error, loading } = useQuery<SubmissionsQuery>(gql`
        query Submissions {
            submissions {
                id, submittedAt, data
            }
        }
    `);

    if (error)
        return <div>Error loading submissions</div>

    if (loading)
        return <div>Loading...</div>

    const { submissions } = data!;

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'submittedAt', headerName: 'Submitted At', width: 200 },
        ...uniq(submissions.flatMap(s => Object.keys(s.data))).map(field => ({
            field,
            headerName: startCase(field),
            width: 200,
            valueGetter: (params: { row: { data: { [x: string]: any; }; }; }) => params.row.data[field]
        })),
    ];

    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex'
            }}
        >
            <DataGrid
                rows={submissions}
                columns={columns}
                autoHeight
            />
        </Box>
    )
}

export default Dashboard