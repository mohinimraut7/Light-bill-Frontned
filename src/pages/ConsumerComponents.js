import React, { useEffect, useState } from 'react';
import AddConsumer from '../components/modals/AddConsumer';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { addConsumer, fetchConsumers, deleteConsumer, editConsumer } from '../store/actions/consumerActions';
import { DataGrid } from '@mui/x-data-grid';
import './Rolemaster.css';
import { styled } from '@mui/material/styles';
import { CircularProgress, Box, Typography, MenuItem, Select, InputLabel, FormControl, Paper } from '@mui/material';
import * as XLSX from 'xlsx';
import { baseUrl } from '../config/config';
import DownloadIcon from '@mui/icons-material/Download';
import { toast } from "react-toastify";
import wardDataAtoI from '../data/warddataAtoI';
import dayjs from 'dayjs';               // YE LINE ADD KAR DO



const columns = (handleEditConsumer) => [
  { field: 'id', headerName: 'ID', width: 80 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 100,
    renderCell: (params) => (
      <IconButton sx={{ color: '#23CCEF' }} onClick={() => handleEditConsumer(params.row)}>
        <EditIcon />
      </IconButton>
    ),
  },
  { field: 'consumerNumber', headerName: 'CONSUMER NUMBER', width: 180 },
  { field: 'meterNumber', headerName: 'METER NUMBER', width: 180 },
  { field: 'consumerPlace', headerName: 'CONSUMER PLACE', width: 200 },
  { field: 'ward', headerName: 'WARD', width: 130 },
  { field: 'meterPurpose', headerName: 'METER PURPOSE', width: 180 },
  { field: 'consumerAddress', headerName: 'CONSUMER ADDRESS', width: 220 },
  { field: 'phaseType', headerName: 'PHASE TYPE', width: 130 },
];

const ConsumerComponent = () => {
  const dispatch = useDispatch();
  const { consumers: serverConsumers, loading, error } = useSelector((state) => state?.consumers || {});
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const user = useSelector(state => state.auth.user);

  const [consumerOpen, setConsumerOpen] = useState(false);
  const [currentConsumer, setCurrentConsumer] = useState(null);
  const [cnId, setCnId] = useState('');
  const [wardName, setWardName] = useState('');

  // This holds FULL data after filtering (for display + export)
  const [allConsumers, setAllConsumers] = useState([]);

  // Client-side pagination (only for display)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 50,
  });

  // Fetch ALL consumers with current filters (no limit)
  const fetchAllConsumers = () => {
    const filters = {};
    if (cnId) filters.consumerNumber = cnId;
    if (wardName) {
      if (user?.role === 'Junior Engineer' && user?.ward !== 'Head Office') {
        filters.wardName = user.ward;
      } else {
        filters.wardName = wardName;
      }
    } else if (user?.role === 'Junior Engineer' && user?.ward !== 'Head Office') {
      filters.wardName = user.ward;
    }

    // Fetch large number → gets ALL records
    dispatch(fetchConsumers(1, 100000, filters.consumerNumber || '', filters.wardName || ''));
  };

  // Re-fetch when filters change
  useEffect(() => {
    fetchAllConsumers();
  }, [cnId, wardName, user?.ward, user?.role]);

  // Update local full list when server data changes
  useEffect(() => {
    if (serverConsumers && Array.isArray(serverConsumers)) {
      const mapped = serverConsumers.map((c, idx) => ({
        id: idx + 1,
        _id: c._id,
        consumerNumber: c.consumerNumber || '-',
        meterNumber: c.meterNumber || '-',
        consumerPlace: c.consumerPlace || '-',
        consumerAddress: c.consumerAddress || '-',
        ward: c.ward || '-',
        meterPurpose: c.meterPurpose || '-',
        phaseType: c.phaseType || '-',
      }));
      setAllConsumers(mapped);
    } else {
      setAllConsumers([]);
    }
  }, [serverConsumers]);

  const handleAddConsumerOpen = () => {
    setCurrentConsumer(null);
    setConsumerOpen(true);
  };

  const handleAddConsumerClose = () => setConsumerOpen(false);

  const handleAddConsumer = (consumerData) => {
    dispatch(addConsumer(consumerData)).then(() => {
      fetchAllConsumers();
      handleAddConsumerClose();
    });
  };

  const handleEditConsumer = (consumer) => {
    setCurrentConsumer(consumer);
    setConsumerOpen(true);
  };

  const handleChange = (e) => setCnId(e.target.value);
  const handleChangeWard = (e) => {
    setWardName(e.target.value);
    setPaginationModel(prev => ({ ...prev, page: 0 })); // Reset page
  };

  // Export ALL filtered data
  const downloadAllTypsOfReport = () => {
    const data = allConsumers.map((row, i) => ({
      'Sr.No': i + 1,
      'Consumer No.': row.consumerNumber,
      'Meter No.': row.meterNumber,
      'Ward': row.ward,
      'Consumer Place': row.consumerPlace,
      'Consumer Address': row.consumerAddress,
      'Meter Purpose': row.meterPurpose,
      'Phase Type': row.phaseType,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Consumers');
    XLSX.writeFile(wb, `Consumers_${wardName || 'All'}_${dayjs().format('DD-MMM-YYYY')}.xlsx`);
  };

  if (loading && allConsumers.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <Typography color="error">Error: {error}</Typography>;

  // Client-side paginated rows (only for display)
  const paginatedRows = allConsumers.slice(
    paginationModel.page * paginationModel.pageSize,
    (paginationModel.page + 1) * paginationModel.pageSize
  );

  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .MuiDataGrid-row': {
      '&:nth-of-type(odd)': { backgroundColor: '#F7F9FB' },
      '&:hover': { backgroundColor: '#f0f8ff' },
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#f8f9fa',
      fontWeight: 600,
      color: '#333',
    },
    border: 'none',
  }));

  const smallControlStyles = {
    height: '40px',
    width: { xs: '100%', sm: '180px' },
    '& .MuiInputBase-root': { height: '40px', fontSize: '0.875rem' },
    '& .MuiInputLabel-root': { fontSize: '0.875rem' },
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      ml: { xs: 0, sm: isSidebarOpen ? '250px' : '100px' },
      p: { xs: 2, md: 3 },
      width: { xs: '100%', sm: isSidebarOpen ? 'calc(100% - 250px)' : 'calc(100% - 100px)' }
    }}>
      <Paper elevation={2} sx={{ borderRadius: 2, p: { xs: 2, sm: 3 } }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h5" fontWeight="bold" color="#0d2136">
            CONSUMER MASTER
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
            size="small"
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={downloadAllTypsOfReport}
              sx={{ ...smallControlStyles, bgcolor: '#23CCEF', '&:hover': { bgcolor: '#1AB3D1' } }}
            >
              Download Consumers
            </Button>
            <Button
             size="small"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddConsumerOpen}
              sx={{ ...smallControlStyles, bgcolor: '#23CCEF', '&:hover': { bgcolor: '#1AB3D1' } }}
            >
              Add Consumer
            </Button>
          </Box>
        </Box>

        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            label="Search Consumer ID"
            value={cnId}
            onChange={handleChange}
            size="small"
            sx={smallControlStyles}
          />

          {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
            <FormControl size="small" sx={smallControlStyles}>
              <InputLabel>Ward</InputLabel>
              <Select value={wardName} onChange={handleChangeWard} label="Ward">
                <MenuItem value="">All Wards</MenuItem>
                {wardDataAtoI.map((w) => (
                  <MenuItem key={w.ward} value={w.ward}>{w.ward}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>

        {/* DataGrid - Client-side Pagination */}
        <Box sx={{ height: { xs: 500, md: 650 }, width: '100%' }}>
          <StyledDataGrid
            rows={paginatedRows}
            columns={columns(handleEditConsumer)}
            pagination
            paginationMode="client"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[10, 25, 50, 100]}
            rowCount={allConsumers.length}
            loading={loading}
            disableRowSelectionOnClick
          />
        </Box>
      </Paper>

      <AddConsumer
        open={consumerOpen}
        handleClose={handleAddConsumerClose}
        handleAddConsumer={handleAddConsumer}
        currentConsumer={currentConsumer}
        editConsumer={(id, data) => {
          dispatch(editConsumer(id, data)).then(() => {
            fetchAllConsumers();
            handleAddConsumerClose();
          });
        }}
      />
    </Box>
  );
};

export default ConsumerComponent;