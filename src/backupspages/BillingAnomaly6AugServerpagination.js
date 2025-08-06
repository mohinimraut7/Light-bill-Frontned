import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBills } from '../store/actions/billActions';
import { DataGrid } from '@mui/x-data-grid';
import {
  Typography,
  Box,
  Modal,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Tabs,
  Tab,
  CircularProgress,
  Paper,
  useMediaQuery, 
  useTheme
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import * as XLSX from 'xlsx';
import ConsumerButton from '../components/ConsumerButton';
import BillDatePicker from '../components/BillDatePicker';
import wardDataAtoI from '../data/warddataAtoI';
import dayjs from 'dayjs';

const BillingAnomaly = () => {
  const dispatch = useDispatch();
  const { bills, loading, error, pagination } = useSelector((state) => state.bills);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const [tabValue, setTabValue] = useState(0);
  const [wardName, setWardName] = useState('');
  const [selectedMonthYear, setSelectedMonthYear] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const user = useSelector((state) => state.auth.user);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Function to fetch bills with server-side pagination and filters
  const fetchBillsWithFilters = (page = 1, limit = 10) => {
    const filters = {};

    // Use selectedMonthYear to match backend API
    if (selectedMonthYear) {
      filters.selectedMonthYear = selectedMonthYear;
    }

    if (wardName && (
      user?.role === 'Super Admin' ||
      user?.role === 'Admin' ||
      user?.role === 'Executive Engineer' ||
      (user?.role === 'Junior Engineer' && user.ward === 'Head Office')
    )) {
      filters.wardName = wardName;
    }

    // For Junior Engineers not at Head Office, restrict to their own ward only
    if (user?.role === 'Junior Engineer' && user?.ward !== 'Head Office') {
      filters.wardName = user.ward;
    }

    // Add anomaly type filter based on current tab
    const anomalyTypes = ['zero_consumption', 'high_anomaly', 'low_anomaly'];
    filters.anomalyType = anomalyTypes[tabValue];

    dispatch(fetchBills(page, limit, filters));
  };

  useEffect(() => {
    fetchBillsWithFilters(currentPage, pageSize);
  }, [dispatch, currentPage, pageSize]);

  // Refetch when filters change
  useEffect(() => {
    setCurrentPage(1);
    setPaginationModel({ ...paginationModel, page: 0 });
    fetchBillsWithFilters(1, pageSize);
  }, [selectedMonthYear, wardName, tabValue]);

  // Handle pagination change
  const handlePaginationModelChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel);
    const newPage = newPaginationModel.page + 1; // MUI DataGrid uses 0-based indexing
    const newPageSize = newPaginationModel.pageSize;

    if (newPage !== currentPage || newPageSize !== pageSize) {
      setCurrentPage(newPage);
      setPageSize(newPageSize);
      fetchBillsWithFilters(newPage, newPageSize);
    }
  };

  const handleDateChange = (value) => {
    const formattedValue = dayjs(value).format("MMM-YYYY").toUpperCase();
    setSelectedMonthYear(formattedValue);
  };

  const handleChangeWard = (event) => setWardName(event.target.value);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Client-side anomaly calculation logic (keeping original logic)
  // Process bills based on server response and add dummy previous bill amount for display
  const processedBills = bills.map(bill => ({
    ...bill,
    prevNetBillAmount: bill.netBillAmount * 0.8 // Dummy calculation for display
  }));

  // Separate bills by anomaly type based on current tab and server data
  const zeroConsumptionBills = processedBills.filter(bill => bill.totalConsumption === 0);
  const highBills = processedBills.filter(bill => {
    // High anomaly logic - bills that are 25% higher than previous
    const prevAmount = bill.prevNetBillAmount;
    const currAmount = bill.netBillAmount;
    const highThreshold = prevAmount + prevAmount * 0.25;
    return currAmount >= highThreshold;
  });
  const lowBills = processedBills.filter(bill => {
    // Low anomaly logic - bills that are 25% lower than previous
    const prevAmount = bill.prevNetBillAmount;
    const currAmount = bill.netBillAmount;
    const lowThreshold = prevAmount - prevAmount * 0.25;
    return currAmount <= lowThreshold;
  });

  const downloadAllTypsOfReport = () => {
    // Use server-provided bills data but apply client-side filtering
    const rows = getRows().filter(
      bill =>
        (!selectedMonthYear || bill.monthAndYear === selectedMonthYear) &&
        (!wardName || bill.ward === wardName)
    );

    // Prepare data rows for the sheet
    const dataRows = rows.map((row, index) => ({
      'ID': index + 1,
      'Consumer No.': row.consumerNumber,
      'Ward': row.ward,
      'Meter Number': row.meterNumber,
      'Total Consumption': row.totalConsumption,
      'Meter Status': row.meterStatus,
      'Bill Month': row.monthAndYear,
      'Previous Bill Amount': row.prevNetBillAmount,
      'Net Bill Amount': row.netBillAmount,
    }));

    // Insert the heading row at the top of the data array
    const heading = [[getTabLabel(tabValue) + ' - REPORT']];
    const worksheet = XLSX.utils.aoa_to_sheet(heading);

    // Add the data rows starting from the third row
    XLSX.utils.sheet_add_json(worksheet, dataRows, { origin: 'A3' });

    // Merge the heading cell across all columns
    const numColumns = Object.keys(dataRows[0] || {}).length;
    worksheet['!merges'] = [
      {
        s: { r: 0, c: 0 }, // start at row 0, col 0
        e: { r: 0, c: numColumns - 1 } // end at row 0, last column
      }
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Bills');
    XLSX.writeFile(workbook, `${getTabLabel(tabValue)}_REPORT.xlsx`);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'consumerNumber', headerName: 'CONSUMER NUMBER', width: 140 },
    { field: 'ward', headerName: 'WARD', width: 130 },
    { field: 'meterNumber', headerName: 'METER NUMBER', width: 130 },
    { field: 'totalConsumption', headerName: 'TOTAL CONSUMPTION', width: 130 },
    { field: 'meterStatus', headerName: 'METER STATUS', width: 130 },
    { field: 'monthAndYear', headerName: 'BILL MONTH', width: 130 },
    { field: 'prevNetBillAmount', headerName: 'PREVIOUS BILL AMOUNT', width: 150 },
    { field: 'netBillAmount', headerName: 'NET BILL AMOUNT', width: 150 },
  ];

  const getRows = () => {
    // Since server is already filtering by anomaly type, return all bills from server
    return processedBills;
  };

  const getTabLabel = (index) => {
    switch (index) {
      case 0: return 'ZERO CONSUMPTION BILLS';
      case 1: return 'HIGH ANOMALY BILLS';
      case 2: return 'LOW ANOMALY BILLS';
      default: return '';
    }
  };

  const smallControlStyles = {
    height: '40px',
    minHeight: '40px',
    display: 'flex',
    width: {
      xs: '85%',
      sm: '85%',
      md: '180px'
    },
    ml: {
      xs: 5,
      sm: 5,
      md: 0
    },
    '& .MuiInputBase-root': {
      height: '40px',
      fontSize: '0.875rem'
    },
    '& .MuiOutlinedInput-root': {
      height: '40px',
      fontSize: '0.875rem'
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.875rem'
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      marginLeft: { xs: 0, sm: isSidebarOpen ? '250px' : '100px' },
      padding: { xs: '10px', sm: '15px', md: '20px' },
      width: {
        xs: '100%',
        sm: isSidebarOpen ? 'calc(100% - 250px)' : 'calc(100% - 100px)'
      }
    }}>
      {/* Tabs */}
      <Paper elevation={0}
        sx={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          mb: 3,
          mt: isSidebarOpen ? 0 : 5
        }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          variant="fullWidth"
          orientation={isSmallScreen ? 'vertical' : 'horizontal'}
          sx={{
            display: 'flex',
            '& .MuiTab-root': {
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              fontWeight: 500,
              py: 2,
              textTransform: 'none',
              position: 'relative',
              '&.Mui-selected': {
                color: '#23CCEF',
                fontWeight: 600,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 'fit-content',
                  minWidth: '60%',
                  height: '3px',
                  backgroundColor: '#23CCEF',
                  borderRadius: '2px'
                }
              }
            },
            '& .MuiTabs-indicator': {
              display: 'none' // Hide default indicator
            }
          }}
        >
          <Tab label={getTabLabel(0)} />
          <Tab label={getTabLabel(1)} />
          <Tab label={getTabLabel(2)} />
        </Tabs>
      </Paper>

      {/* Filter Row (Download + Date + Ward) */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        alignItems: { xs: 'stretch', sm: 'center' },
        flexWrap: 'wrap',
        mb: 3,
      }}>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={downloadAllTypsOfReport}
          sx={{
            ...smallControlStyles,
            backgroundColor: '#23CCEF',
            '&:hover': { backgroundColor: '#1AB3D1' },
            borderRadius: '6px',
            textTransform: 'none',
            fontSize: '0.75rem',
            px: 2,
          }}
        >
          REPORTS
        </Button>

        <Box sx={smallControlStyles}>
          <BillDatePicker
            selectedMonthYear={selectedMonthYear}
            onChange={handleDateChange}
            sx={{
              '& .MuiTextField-root': {
                backgroundColor: '#fff',
                borderRadius: '6px',
                height: '40px',
              }
            }}
          />
        </Box>

        {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
          <FormControl variant="outlined" size="small" sx={smallControlStyles}>
            <InputLabel id="ward-label">Search Ward</InputLabel>
            <Select
              labelId="ward-label"
              value={wardName}
              onChange={handleChangeWard}
              label="Search Ward"
              sx={{ backgroundColor: '#fff', borderRadius: '6px' }}
            >
              {wardDataAtoI.length > 0 ? (
                wardDataAtoI.map((ward, index) => (
                  <MenuItem key={index} value={ward.ward}>{ward.ward}</MenuItem>
                ))
              ) : (
                <MenuItem disabled>No Wards Available</MenuItem>
              )}
            </Select>
          </FormControl>
        )}
      </Box>

      {/* Data Table */}
      <Paper elevation={2} sx={{ backgroundColor: '#fff', borderRadius: '8px' }}>
        <Box sx={{ height: { xs: 400, sm: 500, md: 600 }, width: '100%' }}>
          <DataGrid
            rows={getRows()
              .filter((bill) =>
                (!selectedMonthYear || bill.monthAndYear === selectedMonthYear) &&
                (!wardName || bill.ward === wardName)
              )
              .map((bill, index) => ({ id: paginationModel.page * paginationModel.pageSize + index + 1, ...bill }))}

            columns={columns}
            pagination
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
            pageSizeOptions={[10, 25, 50, 100]}
            rowCount={pagination?.totalBills || 0}
            loading={loading}
            disableSelectionOnClick

            sx={{
              border: 'none',
              '& .MuiDataGrid-cell': {
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f8f9fa',
                fontWeight: 600,
                color: '#333'
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#f8f9fa'
              }
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default BillingAnomaly;