import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

// Icons for visual flair
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import CakeIcon from '@mui/icons-material/Cake';

// Import raw data to compute values dynamically
import usersSeed from '../../assets/users.json?raw';

const userRoles = ['admin', 'editor', 'viewer'];

export default function DashboardPage() {
  let parsedUsers = [];
  let totalUsers = 0;
  let averageAge = 0;
  let activeUsers = 0;
  let inactiveUsers = 0;

  try {
    parsedUsers = JSON.parse(usersSeed) || [];
    totalUsers = parsedUsers.length;
    activeUsers = parsedUsers.filter((u) => u.isActive === true).length;
    inactiveUsers = totalUsers - activeUsers;

    const validAges = parsedUsers
      .map((u) => Number(u.age))
      .filter((age) => !Number.isNaN(age) && age > 0);

    if (validAges.length > 0) {
      const sum = validAges.reduce((acc, age) => acc + age, 0);
      averageAge = (sum / validAges.length).toFixed(1);
    }
  } catch (err) {
    console.error('Error computing dynamic metrics:', err);
  }

  const roleCounts = userRoles.map((role) =>
    parsedUsers.filter((user) => String(user.role || '').toLowerCase() === role).length
  );

  const roleSeries = [
    {
      label: 'Users by Role',
      data: roleCounts,
    },
  ];

  const statusSeries = [
    {
      id: 0,
      value: activeUsers,
      label: 'Active',
    },
    {
      id: 1,
      value: inactiveUsers,
      label: 'Inactive',
    },
  ];

  const ageBuckets = [
    { label: '<20', count: parsedUsers.filter((user) => Number(user.age) < 20).length },
    {
      label: '20-29',
      count: parsedUsers.filter((user) => {
        const age = Number(user.age);
        return age >= 20 && age <= 29;
      }).length,
    },
    {
      label: '30-39',
      count: parsedUsers.filter((user) => {
        const age = Number(user.age);
        return age >= 30 && age <= 39;
      }).length,
    },
    { label: '40+', count: parsedUsers.filter((user) => Number(user.age) >= 40).length },
  ];

  const ageSeries = [
    {
      label: 'Age Group',
      data: ageBuckets.map((bucket) => bucket.count),
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
        Dashboard Overview
      </Typography>
      <Typography variant="body1" color="text.primary" sx={{ mb: 4 }}>
        Real-time dynamic summaries computed from your user dataset.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '5px solid #1976d2', boxShadow: 2 }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="text.primary" sx={{ textTransform: 'uppercase' }}>
                    Total Users
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', my: 1 }}>
                    {totalUsers}
                  </Typography>
                </Box>
                <PeopleAltIcon sx={{ fontSize: 40, color: '#1976d2', opacity: 0.8 }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '5px solid #ed6c02', boxShadow: 2 }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="text.primary" sx={{ textTransform: 'uppercase' }}>
                    Average Age
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', my: 1 }}>
                    {averageAge || '—'}
                  </Typography>
                </Box>
                <CakeIcon sx={{ fontSize: 40, color: '#ed6c02', opacity: 0.8 }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '5px solid #2e7d32', boxShadow: 2 }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="text.primary" sx={{ textTransform: 'uppercase' }}>
                    Active Accounts
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', my: 1 }}>
                    {activeUsers}
                  </Typography>
                </Box>
                <ToggleOnIcon sx={{ fontSize: 40, color: '#2e7d32', opacity: 0.8 }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '5px solid #9e9e9e', boxShadow: 2 }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="text.primary" sx={{ textTransform: 'uppercase' }}>
                    Inactive Accounts
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', my: 1 }}>
                    {inactiveUsers}
                  </Typography>
                </Box>
                <ToggleOffIcon sx={{ fontSize: 40, color: '#9e9e9e', opacity: 0.8 }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Users by Role
              </Typography>
              <Typography variant="body2" color="text.primary" sx={{ mb: 3 }}>
                Distribution of dashboard users across roles.
              </Typography>
              <Box sx={{ height: 320, width: '100%' }}>
                <BarChart series={roleSeries} xAxis={[{ data: userRoles, scaleType: 'band' }]} height={320} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Active vs Inactive
              </Typography>
              <Typography variant="body2" color="text.primary" sx={{ mb: 3 }}>
                Current active versus inactive account split.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart series={[{ data: statusSeries }]} width={320} height={320} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 0 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Age Distribution
              </Typography>
              <Typography variant="body2" color="text.primary" sx={{ mb: 3 }}>
                User age groups derived from the same dataset used in summary cards.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Box sx={{ width: '100%', maxWidth: 680, minWidth: 320 }}>
                  <BarChart
                    series={ageSeries}
                    xAxis={[{ data: ageBuckets.map((bucket) => bucket.label), scaleType: 'band' }]}
                    height={320}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
