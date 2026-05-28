import React, { useState } from 'react';
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
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DataGrid } from '@mui/x-data-grid';
import usersSeed from '../../assets/users.json?raw';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  role: 'editor',
  username: '',
  password: '',
  address: '',
  isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const loadUsers = () => {
  try {
    return {
      users: JSON.parse(usersSeed).map((user, index) => ({
        id: Number(user.id) || index + 1,
        firstName: String(user.firstName ?? '').trim(),
        lastName: String(user.lastName ?? '').trim(),
        age: String(user.age ?? '').trim(),
        gender: genders.includes(String(user.gender ?? '').trim().toLowerCase())
          ? String(user.gender ?? '').trim().toLowerCase()
          : 'other',
        contactNumber: String(user.contactNumber ?? '').trim(),
        email: String(user.email ?? '').trim().toLowerCase(),
        role: roles.includes(String(user.role ?? '').trim().toLowerCase())
          ? String(user.role ?? '').trim().toLowerCase()
          : 'editor',
        username: String(user.username ?? '').trim().toLowerCase(),
        password: String(user.password ?? ''),
        address: String(user.address ?? '').trim(),
        isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
      })),
      error: null,
    };
  } catch {
    return {
      users: [],
      error: 'Unable to read users from src/assets/users.json.',
    };
  }
};

const seed = loadUsers();

export default function UsersPage() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [users, setUsers] = useState(seed.users);
  const [error, setError] = useState(seed.error);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(blankForm);
  const [showPassword, setShowPassword] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleOpenModal = () => {
    setForm(blankForm);
    setFormErrors({});
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const errors = {};

    if (!form.firstName.trim()) errors.firstName = 'First name is required';
    if (!form.lastName.trim()) errors.lastName = 'Last name is required';
    if (!form.email.trim()) errors.email = 'Email is required';
    if (!form.username.trim()) errors.username = 'Username is required';
    if (/\s/.test(form.username)) {
      errors.username = 'Username may not contain spaces';
    }
    if (!form.password || form.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    if (!/^[0-9]+$/.test(form.contactNumber) || form.contactNumber.length !== 11) {
      errors.contactNumber = 'Contact number must be 11 digits';
    }
    if (!/^[0-9]+$/.test(form.age)) {
      errors.age = 'Age must be a number';
    }
    if (!form.gender) errors.gender = 'Gender is required';
    if (!roles.includes(form.role)) errors.role = 'Role is required';

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length) {
      setFormErrors(newErrors);
      return;
    }

    const newUser = { ...form, id: users.length + 1 };
    setUsers((prev) => [...prev, newUser]);
    handleCloseModal();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First Name', width: 130 },
    { field: 'lastName', headerName: 'Last Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 220 },
    { field: 'role', headerName: 'Role', width: 120, renderCell: (params) => labelize(params.value) },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Active' : 'Inactive'}
          color={params.value ? 'success' : 'default'}
          size="small"
        />
      ),
    },
  ];

  const filteredUsers = users.filter((user) => {
    const normalizedSearch = searchText.trim().toLowerCase();
    const searchMatch =
      !normalizedSearch ||
      [user.firstName, user.lastName, user.email, user.username].some((value) =>
        String(value).toLowerCase().includes(normalizedSearch)
      );
    const roleMatch = !roleFilter || user.role === roleFilter;
    const genderMatch = !genderFilter || user.gender === genderFilter;
    const statusMatch =
      !statusFilter ||
      (statusFilter === 'active' ? user.isActive === true : user.isActive === false);

    return searchMatch && roleMatch && genderMatch && statusMatch;
  });

  const fieldProps = (name, label) => ({
    name,
    label,
    value: form[name],
    onChange: handleInputChange,
    fullWidth: true,
    required: true,
    error: !!formErrors[name],
    helperText: formErrors[name] ?? '',
  });

  return (
    <Box sx={{ width: '100%', maxWwidth: '100%' }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="h4">Users Management</Typography>
        <Button variant="contained" onClick={handleOpenModal} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          Add User
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="Search users"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by name, email, or username"
          fullWidth
        />
        <TextField
          select
          label="Role"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">All roles</MenuItem>
          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {labelize(role)}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Gender"
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">All genders</MenuItem>
          {genders.map((gender) => (
            <MenuItem key={gender} value={gender}>
              {labelize(gender)}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="">All statuses</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
      </Stack>

      <Paper sx={{ p: 2, overflow: 'hidden' }}>
        {filteredUsers.length > 0 ? (
          <Box sx={{ height: { xs: 400, sm: 520 }, width: '100%' }}>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5, page: 0 },
                },
              }}
              sx={{
                border: 0,
                '& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus': {
                  outline: 'none',
                },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info">No users found. Use Add User to create your first record.</Alert>
        )}
      </Paper>

      <Dialog open={modalOpen} onClose={handleCloseModal} fullScreen={fullScreen} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{form.id ? 'Edit User' : 'Add User'}</DialogTitle>
          <DialogContent dividers sx={{ p: 3 }}>
            <Stack spacing={2.5}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('firstName', 'First Name')} />
                <TextField {...fieldProps('lastName', 'Last Name')} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('age', 'Age')} type="number" />
                <TextField
                  select
                  name="gender"
                  label="Gender"
                  value={form.gender}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  error={!!formErrors.gender}
                  helperText={formErrors.gender ?? ''}
                >
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {labelize(gender)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('contactNumber', 'Contact Number')} />
                <TextField {...fieldProps('email', 'Email Address')} type="email" />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  select
                  name="role"
                  label="Role"
                  value={form.role}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  error={!!formErrors.role}
                  helperText={formErrors.role ?? ''}
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField {...fieldProps('username', 'Username')} />
              </Stack>
              <TextField
                name="password"
                label="Password"
                value={form.password}
                onChange={handleInputChange}
                fullWidth
                required
                type={showPassword ? 'text' : 'password'}
                error={!!formErrors.password}
                helperText={formErrors.password ?? ''}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((prev) => !prev)}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField {...fieldProps('address', 'Address')} multiline rows={3} required={false} />
              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleToggleChange}
                    color="success"
                  />
                }
                label={`User status: ${form.isActive ? 'Active' : 'Inactive'}`}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              {form.id ? 'Update User' : 'Save User'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
