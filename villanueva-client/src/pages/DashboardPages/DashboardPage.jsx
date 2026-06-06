import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid'; // Your working import path!
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';

// Material Icons
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import CakeIcon from '@mui/icons-material/Cake';
import ShieldIcon from '@mui/icons-material/Shield';

// Service API layer
import { fetchUsers } from '../../services/UserService';

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

const monthlyData = [
  { label: 'Jan', generated: 18, completed: 14 },
  { label: 'Feb', generated: 22, completed: 18 },
  { label: 'Mar', generated: 20, completed: 16 },
  { label: 'Apr', generated: 24, completed: 21 },
];

const generateAgeCategories = (userList) => {
  return Object.entries(
    userList.reduce((counts, row) => {
      const age = Number(row.age);
      if (!Number.isFinite(age) || age <= 0) return counts;
      counts[age] = (counts[age] || 0) + 1;
      return counts;
    }, {})
  )
    .sort(([ageA], [ageB]) => Number(ageA) - Number(ageB))
    .map(([age, count], index) => ({
      id: index,
      value: count,
      label: `Age ${age}`,
    }));
};

export function DashboardPage() {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    averageAge: 0,
    activeUsers: 0,
    adminCount: 0
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const calculateMetrics = async () => {
      try {
        setLoading(true);
        const response = await fetchUsers();
        const userList = response.data.users || [];
        setUsers(userList);

        const total = userList.length;
        const active = userList.filter(u => u.isActive).length;
        const admins = userList.filter(u => u.type === 'admin').length;
        
        // Dynamic age calculation safety filter
        const ages = userList.map(u => Number(u.age)).filter(age => !isNaN(age) && age > 0);
        const average = ages.length > 0 ? (ages.reduce((sum, val) => sum + val, 0) / ages.length).toFixed(1) : 0;

        setMetrics({
          totalUsers: total,
          activeUsers: active,
          adminCount: admins,
          averageAge: average
        });
      } catch (err) {
        setError('Could not establish synchronization with live database metrics.');
      } finally {
        setLoading(false);
      }
    };

    calculateMetrics();
  }, []);

  const ageCategories = generateAgeCategories(users);
  const displayUsers = users.map((user, idx) => ({
    id: user._id || idx,
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
  }));

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>Dashboard Overview</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Real-time metrics calculated from your live MongoDB database collection.
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {/* Grid container specifies row properties */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        
        {/* Metric 1: Total Users */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '5px solid #1976d2', boxShadow: 2 }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">TOTAL USERS</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 1 }}>{metrics.totalUsers}</Typography>
                </Box>
                <PeopleAltIcon sx={{ fontSize: 40, color: '#1976d2', opacity: 0.7 }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Metric 2: Average Age */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '5px solid #ed6c02', boxShadow: 2 }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">AVERAGE AGE</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 1 }}>{metrics.averageAge}</Typography>
                </Box>
                <CakeIcon sx={{ fontSize: 40, color: '#ed6c02', opacity: 0.7 }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Metric 3: Active Status */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '5px solid #2e7d32', boxShadow: 2 }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">ACTIVE ACCOUNTS</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 1 }}>{metrics.activeUsers}</Typography>
                </Box>
                <ToggleOnIcon sx={{ fontSize: 40, color: '#2e7d32', opacity: 0.7 }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Metric 4: Admin Accounts */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '5px solid #d32f2f', boxShadow: 2 }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">ADMINISTRATORS</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 1 }}>{metrics.adminCount}</Typography>
                </Box>
                <ShieldIcon sx={{ fontSize: 40, color: '#d32f2f', opacity: 0.7 }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Age Distribution
              </Typography>
              <Typography variant="body2" color="text.primary" sx={{ mb: 3 }}>
                Distribution of users by age group.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', height: 450 }}>
                {ageCategories.length > 0 ? (
                  <PieChart series={[{ data: ageCategories }]} width={400} height={400} />
                ) : (
                  <Typography color="text.secondary">No age data available</Typography>
                )}
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
              <Box sx={{ height: 450, width: '100%' }}>
                <BarChart
                  series={[
                    { data: monthlyData.map((item) => item.generated), label: 'Generated' },
                    { data: monthlyData.map((item) => item.completed), label: 'Completed' },
                  ]}
                  xAxis={[{ data: monthlyData.map((item) => item.label), scaleType: 'band' }]}
                  height={450}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Centered User Database Table */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Database
              </Typography>
              <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
                All users from the database.
              </Typography>
              <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid
                  rows={displayUsers}
                  columns={columns}
                  initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                  pageSizeOptions={[5]}
                  checkboxSelection
                  disableRowSelectionOnClick
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}