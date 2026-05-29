import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  { field: 'age', headerName: 'Age', type: 'number', width: 110 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column combines first and last name.',
    sortable: false,
    width: 180,
    renderCell: (params) => `${params.row?.firstName || ''} ${params.row?.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const reportCategories = [
  { id: 0, value: 35, label: 'Sales' },
  { id: 1, value: 25, label: 'Users' },
  { id: 2, value: 20, label: 'Inventory' },
  { id: 3, value: 20, label: 'Finance' },
];

const monthlyData = [
  { label: 'Jan', generated: 18, completed: 14 },
  { label: 'Feb', generated: 22, completed: 18 },
  { label: 'Mar', generated: 20, completed: 16 },
  { label: 'Apr', generated: 24, completed: 21 },
];

export function ReportsPage() {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank', 'width=1200,height=900');
    if (!printWindow) return;

    const headMarkup = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((node) => node.outerHTML)
      .join('');

    const exportedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Reports Summary</title>
        ${headMarkup}
        <style>
          body { font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 24px; color: #111; background: #fff; }
          h1 { margin-top: 0; }
          .section { margin-bottom: 24px; }
          .card { border: 1px solid #ddd; padding: 18px; margin-bottom: 18px; border-radius: 12px; }
        </style>
      </head>
      <body>
        <main>
          <h1>Reports Summary</h1>
          <p>Prepared on ${exportedAt}</p>
          <div class="section">
            ${printContent.innerHTML}
          </div>
        </main>
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Reports
          </Typography>
          <Typography variant="body1" color="text.primary">
            Analytics summary and export-ready report overview.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} sx={{ flexWrap: 'wrap' }}>
          <Button variant="contained">Generate</Button>
          <Button variant="outlined" onClick={handlePrint}>
            Export
          </Button>
          <Button variant="outlined">Filter</Button>
        </Stack>
      </Stack>

      <Stack ref={printRef} spacing={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Report Category Share
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ mb: 3 }}>
                  Visual breakdown of report categories for the current cycle.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <PieChart series={[{ data: reportCategories }]} width={320} height={320} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Monthly Activity
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ mb: 3 }}>
                  Generated vs. completed reports over the last four months.
                </Typography>
                <Box sx={{ height: 320, width: '100%' }}>
                  <BarChart
                    series={[
                      { data: monthlyData.map((item) => item.generated), label: 'Generated' },
                      { data: monthlyData.map((item) => item.completed), label: 'Completed' },
                    ]}
                    xAxis={[{ data: monthlyData.map((item) => item.label), scaleType: 'band' }]}
                    height={320}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Report Activity
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
              Latest entries from the reporting dashboard.
            </Typography>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
