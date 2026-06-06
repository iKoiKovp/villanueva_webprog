import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DataGrid } from '@mui/x-data-grid';
import { fetchUsers, createUser, updateUser } from '../../services/UserService';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: 'other',
  contactNumber: '',
  email: '',
  type: 'editor', // matches field property name configured in your User.js Model
  username: '',
  password: '',
  address: '',
  isActive: true,
};

export function UsersPage() {
  const userRole = localStorage.getItem('userRole')?.toLowerCase();
  if (!userRole || userRole !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(blankForm);
  const [showPassword, setShowPassword] = useState(false);

  const syncDatabaseGrid = async () => {
    try {
      setLoading(true);
      const response = await fetchUsers();
      // Unpack response mapping backend MongoDB mongo object "_id" into clean UI datagrid "id" fields
      const formattedData = response.data.users.map((user) => ({
        ...user,
        id: user._id
      }));
      setUsers(formattedData);
    } catch (err) {
      setError('An error occurred while synchronizing database collections.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    syncDatabaseGrid();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ENHANCEMENT 3: Connect Frontend fields straight to API Endpoint database routines
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      await createUser(form);
      setModalOpen(false);
      syncDatabaseGrid(); // Reload data grid table instantly
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to successfully push schema record to MongoDB.');
    }
  };

  const handleToggleActive = async (id) => {
    const user = users.find((row) => row.id === id);
    if (!user) return;

    try {
      setError(null);
      const updatedStatus = !user.isActive;
      await updateUser(id, { isActive: updatedStatus });
      setUsers((prevUsers) =>
        prevUsers.map((row) =>
          row.id === id ? { ...row, isActive: updatedStatus } : row
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update account status.');
    }
  };

  const columns = [
    { field: 'username', headerName: 'Username', width: 130 },
    { field: 'firstName', headerName: 'First Name', width: 130 },
    { field: 'lastName', headerName: 'Last Name', width: 130 },
    { field: 'email', headerName: 'Email Address', width: 210 },
    { 
      field: 'type', 
      headerName: 'System Permission', 
      width: 140, 
      renderCell: (params) => (
        <Chip 
          label={params.value.toUpperCase()} 
          color={params.value === 'admin' ? 'error' : 'info'} 
          size="small" 
          variant="outlined" 
        />
      ) 
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip 
          label={params.value ? "Active" : "Disabled"} 
          color={params.value ? "success" : "default"} 
          size="small" 
        />
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          size="small"
          variant="contained"
          color={params.row.isActive ? 'error' : 'success'}
          onClick={() => handleToggleActive(params.row.id)}
        >
          {params.row.isActive ? 'Disable' : 'Enable'}
        </Button>
      )
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Users Management</Typography>
        <Button variant="contained" onClick={() => { setForm(blankForm); setModalOpen(true); }}>
          Add Database User
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Paper sx={{ p: 2 }}>
        <Box sx={{ height: 480, width: '100%' }}>
          <DataGrid
            rows={users}
            columns={columns}
            loading={loading}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10]}
            initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          />
        </Box>
      </Paper>

      {/* Input Creation Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add Account to MongoDB</DialogTitle>
          <DialogContent dividers sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <TextField name="firstName" label="First Name" value={form.firstName} onChange={handleInputChange} fullWidth required />
                <TextField name="lastName" label="Last Name" value={form.lastName} onChange={handleInputChange} fullWidth required />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField name="age" label="Age" type="number" value={form.age} onChange={handleInputChange} fullWidth required />
                <TextField select name="gender" label="Gender" value={form.gender} onChange={handleInputChange} fullWidth required>
                  {genders.map((g) => <MenuItem key={g} value={g}>{g.toUpperCase()}</MenuItem>)}
                </TextField>
              </Stack>
              <TextField name="contactNumber" label="Contact Number" value={form.contactNumber} onChange={handleInputChange} fullWidth required />
              <TextField name="email" label="Email Address" type="email" value={form.email} onChange={handleInputChange} fullWidth required />
              <Stack direction="row" spacing={2}>
                <TextField name="username" label="Username" value={form.username} onChange={handleInputChange} fullWidth required />
                <TextField select name="type" label="System Role" value={form.type} onChange={handleInputChange} fullWidth required>
                  {roles.map((r) => <MenuItem key={r} value={r}>{r.toUpperCase()}</MenuItem>)}
                </TextField>
              </Stack>
              <TextField
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleInputChange}
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField name="address" label="Home Address" value={form.address} onChange={handleInputChange} multiline rows={2} fullWidth required />
              <FormControlLabel
                control={<Switch checked={form.isActive} onChange={(e) => setForm({...form, isActive: e.target.checked})} color="success" />}
                label="Set Account Status as Active"
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Save User</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}