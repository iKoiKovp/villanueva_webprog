import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid'; // Your working import path!

// Material Icons
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import CakeIcon from '@mui/icons-material/Cake';
import ShieldIcon from '@mui/icons-material/Shield';

// Service API layer
import { fetchUsers } from '../../services/UserService';

export function DashboardPage() {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    averageAge: 0,
    activeUsers: 0,
    adminCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const calculateMetrics = async () => {
      try {
        setLoading(true);
        const response = await fetchUsers();
        const userList = response.data.users || [];

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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>Dashboard Overview</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Real-time metrics calculated from your live MongoDB database collection.
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {/* Grid container specifies row properties */}
      <Grid container spacing={3}>
        
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
    </Box>
  );
}