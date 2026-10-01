import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBills } from '../store/actions/billActions';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  CircularProgress,
  Paper,
  useMediaQuery,
  useTheme
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import * as XLSX from 'xlsx';
import BillDatePicker from '../components/BillDatePicker';
import wardDataAtoI from '../data/warddataAtoI';
import dayjs from 'dayjs';

const BillingAnomaly = () => {
  const dispatch = useDispatch();
  const { bills: serverBills, loading, error } = useSelector((state) => state.bills);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const user = useSelector((state) => state.auth.user);

  const [tabValue, setTabValue] = useState(0);
  const [wardName, setWardName] = useState('');
  const [selectedMonthYear, setSelectedMonthYear] = useState('');

  // Full processed anomaly data (used for filtering + export)
  const [anomalyData, setAnomalyData] = useState({
    zeroConsumptionBills: [],
    highBills: [],
    lowBills: []
  });

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 50,
  });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Fetch ALL bills (large limit for speed + full data)
  const fetchAllBills = () => {
    const filters = {};

    // Apply ward filter based on role
    if (wardName && (
      user?.role === 'Super Admin' ||
      user?.role === 'Admin' ||
      user?.role === 'Executive Engineer' ||
      (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')
    )) {
      filters.wardName = wardName;
    }

    if (user?.role === 'Junior Engineer' && user?.ward !== 'Head Office') {
      filters.wardName = user.ward;
    }

    // Large safe limit → gets ALL bills in 99.9% cases (fast + complete)
    dispatch(fetchBills(1, 100000, filters, true));
  };

  // Re-fetch when ward changes
  useEffect(() => {
    fetchAllBills();
  }, [wardName, user?.ward, user?.role]);

  // Process anomalies whenever raw bills change
  useEffect(() => {
    if (serverBills && serverBills.length > 0) {
      processAnomalies(serverBills);
    } else {
      setAnomalyData({
        zeroConsumptionBills: [],
        highBills: [],
        lowBills: []
      });
    }
  }, [serverBills]);

  // Re-apply month filter when month changes
  useEffect(() => {
    if (serverBills && serverBills.length > 0) {
      processAnomalies(serverBills);
    }
  }, [selectedMonthYear]);

  const processAnomalies = (billsData) => {
    const billMap = new Map();

    billsData.forEach(bill => {
      if (!billMap.has(bill.consumerNumber)) {
        billMap.set(bill.consumerNumber, []);
      }
      billMap.get(bill.consumerNumber).push(bill);
    });

    const zero = [], high = [], low = [];

    billMap.forEach(history => {
      history.sort((a, b) => new Date(a.monthAndYear) - new Date(b.monthAndYear));

      for (let i = 1; i < history.length; i++) {
        const prev = history[i - 1];
        const curr = history[i];
        const prevAmt = prev.netBillAmount || 0;
        const currAmt = curr.netBillAmount || 0;

        if (curr.totalConsumption === 0) {
          zero.push({ ...curr, prevNetBillAmount: prevAmt });
        }
        if (prevAmt > 0) {
          if (currAmt >= prevAmt * 1.25) {
            high.push({ ...curr, prevNetBillAmount: prevAmt });
          }
          if (currAmt <= prevAmt * 0.75) {
            low.push({ ...curr, prevNetBillAmount: prevAmt });
          }
        }
      }
    });

    // Apply month filter if selected
    const filterByMonth = (arr) => 
      selectedMonthYear 
        ? arr.filter(b => b.monthAndYear === selectedMonthYear)
        : arr;

    setAnomalyData({
      zeroConsumptionBills: filterByMonth(zero),
      highBills: filterByMonth(high),
      lowBills: filterByMonth(low)
    });
  };

  const handleDateChange = (value) => {
    const formatted = value ? dayjs(value).format("MMM-YYYY").toUpperCase() : '';
    setSelectedMonthYear(formatted);
    setPaginationModel(prev => ({ ...prev, page: 0 }));
  };

  const handleChangeWard = (e) => {
    setWardName(e.target.value);
    setPaginationModel({ page: 0, pageSize: 50 });
  };

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
    setPaginationModel({ page: 0, pageSize: paginationModel.pageSize });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Box sx={{ p: 3, color: 'error.main' }}>Error: {error}</Box>;
  }

  const getCurrentData = () => {
    switch (tabValue) {
      case 0: return anomalyData.zeroConsumptionBills;
      case 1: return anomalyData.highBills;
      case 2: return anomalyData.lowBills;
      default: return [];
    }
  };

  const currentData = getCurrentData();

  // Client-side paginated rows (only for display)
  // const paginatedRows = currentData
  //   .slice(paginationModel.page * paginationModel.pageSize, (paginationModel.page + 1) * paginationModel.pageSize)
  //   .map((bill, idx) => ({
  //     id: paginationModel.page * paginationModel.pageSize + idx + 1,
  //     ...bill
  //   }));


  // ✅ ADD THIS (simple & correct)
const rows = currentData.map((bill, idx) => ({
  id: idx + 1,
  ...bill
}));


  // Export ALL filtered data
  const downloadAllTypsOfReport = () => {
    const data = currentData.map((row, i) => ({
      'Sr.No': i + 1,
      'Consumer No.': row.consumerNumber,
      'Ward': row.ward,
      'Meter No.': row.meterNumber,
      'Consumption': row.totalConsumption,
      'Meter Status': row.meterStatus,
      'Bill Month': row.monthAndYear,
      'Previous Amount': Number(row.prevNetBillAmount || 0).toFixed(2),
      'Current Amount': Number(row.netBillAmount || 0).toFixed(2),
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    XLSX.writeFile(wb, `${getTabLabel(tabValue)}_Report_${dayjs().format('DD-MMM-YYYY')}.xlsx`);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'consumerNumber', headerName: 'CONSUMER NO.', width: 150 },
    { field: 'ward', headerName: 'WARD', width: 120 },
    { field: 'meterNumber', headerName: 'METER NO.', width: 140 },
    { field: 'totalConsumption', headerName: 'CONSUMPTION', width: 130 },
    { field: 'meterStatus', headerName: 'METER STATUS', width: 130 },
    { field: 'monthAndYear', headerName: 'BILL MONTH', width: 130 },
    { field: 'prevNetBillAmount', headerName: 'PREV AMOUNT', width: 140 },
    { field: 'netBillAmount', headerName: 'CURRENT AMOUNT', width: 150 },
  ];

  const getTabLabel = (index) => {
    switch (index) {
      case 0: return 'ZERO CONSUMPTION BILLS';
      case 1: return 'HIGH ANOMALY BILLS';
      case 2: return 'LOW ANOMALY BILLS';
      default: return '';
    }
  };

  const controlStyle = {
    height: 40,
    width: { xs: '100%', sm: '180px' },
    '& .MuiInputBase-root': { height: 40, fontSize: '0.875rem' },
    '& .MuiInputLabel-root': { fontSize: '0.875rem' }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      ml: { xs: 0, sm: isSidebarOpen ? '250px' : '80px' },
      transition: 'margin 0.3s',
      p: { xs: 1, sm: 2, md: 3 }
    }}>
      {/* Tabs */}
      <Paper elevation={0} sx={{ borderRadius: 2, mb: 3, backgroundColor: '#fff' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              fontWeight: 500,
              textTransform: 'none',
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              '&.Mui-selected': {
                color: '#23CCEF',
                fontWeight: 600,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '70%',
                  height: 3,
                  bgcolor: '#23CCEF',
                  borderRadius: 1
                }
              }
            },
            '& .MuiTabs-indicator': { display: 'none' }
          }}
        >
          <Tab label={getTabLabel(0)} />
          <Tab label={getTabLabel(1)} />
          <Tab label={getTabLabel(2)} />
        </Tabs>
      </Paper>

      {/* Filters + Download */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3, alignItems: 'center' }}>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={downloadAllTypsOfReport}
          sx={{
            ...controlStyle,
            bgcolor: '#23CCEF',
            '&:hover': { bgcolor: '#1AB3D1' },
            borderRadius: 2,
            textTransform: 'none'
          }}
        >
          Download Report
        </Button>

        <Box sx={controlStyle}>
          <BillDatePicker
            selectedMonthYear={selectedMonthYear}
            onChange={handleDateChange}
          />
        </Box>

        {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
          <FormControl size="small" sx={controlStyle}>
            <InputLabel>Ward</InputLabel>
            <Select
              value={wardName}
              onChange={handleChangeWard}
              label="Ward"
              sx={{ bgcolor: 'white', borderRadius: 2 }}
            >
              <MenuItem value="">All Wards</MenuItem>
              {wardDataAtoI.map((w) => (
                <MenuItem key={w.ward} value={w.ward}>{w.ward}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>

      {/* Data Table */}
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ height: { xs: 500, md: 700 }, width: '100%' }}>
          <DataGrid
            // rows={paginatedRows}
            rows={rows}
            columns={columns}
            pagination
            paginationMode="client"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[10, 25, 50, 100]}
            // rowCount={currentData.length}
            loading={loading}
            disableRowSelectionOnClick
            sx={{
              '& .MuiDataGrid-cell': { fontSize: '0.875rem' },
              '& .MuiDataGrid-columnHeaders': { bgcolor: '#f8f9fa', fontWeight: 600 }
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default BillingAnomaly;