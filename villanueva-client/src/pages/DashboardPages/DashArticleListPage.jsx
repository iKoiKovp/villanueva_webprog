import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';

import articles from '../../data/article-content';

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'disabled', label: 'Disabled' },
];

const blankForm = {
  title: '',
  name: '',
  content: '',
  status: 'active',
};

export function DashArticleListPage() {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [rows, setRows] = useState(() =>
    articles.map((article, index) => {
      const previewText = Array.isArray(article.content)
        ? article.content.join(' ').slice(0, 120).replace(/\s+/g, ' ') + '...'
        : '';

      return {
        id: index + 1,
        slug: article.name || `article-${index + 1}`,
        title: article.title || 'Untitled',
        paragraphs: Array.isArray(article.content) ? article.content.length : 0,
        preview: previewText,
        status: 'active',
      };
    })
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(blankForm);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateArticle = (event) => {
    event.preventDefault();
    setError('');

    if (!form.title || !form.name || !form.content) {
      setError('Title, slug, and content are required.');
      return;
    }

    const contentBlocks = form.content
      .split(/\r?\n+/)
      .map((line) => line.trim())
      .filter(Boolean);

    const previewText = contentBlocks.join(' ').slice(0, 120).replace(/\s+/g, ' ') + '...';

    const newArticle = {
      id: rows.length + 1,
      slug: form.name,
      title: form.title,
      paragraphs: contentBlocks.length,
      preview: previewText,
      status: form.status,
    };

    setRows((prevRows) => [newArticle, ...prevRows]);
    setModalOpen(false);
    setForm(blankForm);
  };

  const handleToggleStatus = (id) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? { ...row, status: row.status === 'active' ? 'disabled' : 'active' }
          : row
      )
    );
  };

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesStatus = statusFilter === 'all' || row.status === statusFilter;
      const matchesSearch = searchText
        ? [row.slug, row.title, row.preview]
            .join(' ')
            .toLowerCase()
            .includes(searchText.toLowerCase())
        : true;
      return matchesStatus && matchesSearch;
    });
  }, [rows, searchText, statusFilter]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'slug', headerName: 'Slug', width: 180 },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      minWidth: 280,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'paragraphs',
      headerName: 'Paragraphs',
      width: 140,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'preview',
      headerName: 'Preview',
      flex: 1,
      minWidth: 300,
      renderCell: (params) => (
        <Typography variant="body2" color="text.secondary" noWrap>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value === 'active' ? 'Active' : 'Disabled'}
          color={params.value === 'active' ? 'success' : 'default'}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 190,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button size="small" variant="outlined">
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={params.row.status === 'active' ? 'error' : 'warning'}
            onClick={() => handleToggleStatus(params.row.id)}
          >
            {params.row.status === 'active' ? 'Disable' : 'Enable'}
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ mb: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            Articles
          </Typography>
          <Typography color="text.secondary">
            Manage articles currently published on the public article list page.
          </Typography>
        </Box>
        <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
          Add Article
        </Button>
      </Box>

      <Paper elevation={1} sx={{ p: 2, mb: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: 'center' }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search Articles"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />

        <TextField
          select
          size="small"
          label="Status Filter"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          sx={{ width: { xs: '100%', sm: 220 } }}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Paper>

      <Paper sx={{ p: 1, minHeight: 600, boxShadow: 2 }}>
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSizeOptions={[5, 10, 20]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            disableRowSelectionOnClick
            sx={{
              '.MuiDataGrid-columnHeaders': {
                bgcolor: 'background.default',
              },
              '.MuiDataGrid-footerContainer': {
                borderTop: '1px solid',
                borderColor: 'divider',
              },
            }}
          />
        </Box>
      </Paper>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="sm" fullWidth>
        <form onSubmit={handleCreateArticle}>
          <DialogTitle>Create New Article</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                name="title"
                label="Article Title"
                value={form.title}
                onChange={handleInputChange}
                fullWidth
                required
              />
              <TextField
                name="name"
                label="Slug"
                value={form.name}
                onChange={handleInputChange}
                fullWidth
                required
              />
              <TextField
                name="content"
                label="Content"
                value={form.content}
                onChange={handleInputChange}
                fullWidth
                required
                multiline
                minRows={4}
                helperText="Separate paragraphs with a blank line."
              />
              <TextField
                select
                name="status"
                label="Status"
                value={form.status}
                onChange={handleInputChange}
                fullWidth
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="disabled">Disabled</MenuItem>
              </TextField>
              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Create Article</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
