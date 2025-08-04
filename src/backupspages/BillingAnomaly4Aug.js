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
  useMediaQuery, useTheme
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import * as XLSX from 'xlsx';
import ConsumerButton from '../components/ConsumerButton';
import BillDatePicker from '../components/BillDatePicker';
import wardDataAtoI from '../data/warddataAtoI';
import dayjs from 'dayjs';

const BillingAnomaly = () => {
  const dispatch = useDispatch();
  const { bills, loading, error } = useSelector((state) => state.bills);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const [tabValue, setTabValue] = useState(0);
  const [wardName, setWardName] = useState('');
  const [selectedMonthYear, setSelectedMonthYear] = useState('');
  const user = useSelector((state) => state.auth.user);
 const theme = useTheme();
const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // ✅ xs & sm
  useEffect(() => {
    dispatch(fetchBills());
  }, [dispatch]);

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

  const sortedBills = [...bills].sort((a, b) => new Date(a.monthAndYear) - new Date(b.monthAndYear));
  const billMap = new Map();
  sortedBills.forEach((bill) => {
    if (!billMap.has(bill.consumerNumber)) {
      billMap.set(bill.consumerNumber, []);
    }
    billMap.get(bill.consumerNumber).push(bill);
  });

  const highBills = [];
  const lowBills = [];
  const zeroConsumptionBills = [];

  billMap.forEach((billHistory) => {
    billHistory.sort((a, b) => new Date(a.monthAndYear) - new Date(b.monthAndYear));
    for (let i = 1; i < billHistory.length; i++) {
      const previousBill = billHistory[i - 1];
      const currentBill = billHistory[i];
      const prevAmount = previousBill.netBillAmount;
      const currAmount = currentBill.netBillAmount;
      const highThreshold = prevAmount + prevAmount * 0.25;
      const lowThreshold = prevAmount - prevAmount * 0.25;

      if (currAmount >= highThreshold) {
        highBills.push({ ...currentBill, prevNetBillAmount: prevAmount });
      } else if (currAmount <= lowThreshold) {
        lowBills.push({ ...currentBill, prevNetBillAmount: prevAmount });
      }

      if (currentBill.totalConsumption === 0) {
        zeroConsumptionBills.push({ ...currentBill, prevNetBillAmount: prevAmount });
      }
    }
  });

  
  const downloadAllTypsOfReport = () => {
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

  
  const heading = [[getTabLabel(tabValue) + ' - REPORT']]; 
  const worksheet = XLSX.utils.aoa_to_sheet(heading);

  
  XLSX.utils.sheet_add_json(worksheet, dataRows, { origin: 'A3' });

  
  const numColumns = Object.keys(dataRows[0] || {}).length;
  worksheet['!merges'] = [
    {
      s: { r: 0, c: 0 }, 
      e: { r: 0, c: numColumns - 1 } 
    }
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Bills');
  XLSX.writeFile(workbook, `${getTabLabel(tabValue)}_REPORT.xlsx`);
};



const getReportFileName = (tabIndex) => {
  switch (tabIndex) {
    case 0: return 'ZERO_CONSUMPTION_BILLS.xlsx';
    case 1: return 'HIGH_ANOMALY_BILLS.xlsx';
    case 2: return 'LOW_ANOMALY_BILLS.xlsx';
    default: return 'Anomaly_Report.xlsx';
  }
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
    switch (tabValue) {
      case 0: return zeroConsumptionBills;
      case 1: return highBills;
      case 2: return lowBills;
      default: return [];
    }
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
    display:'flex',
    
    width: {
      xs: '85%',
      sm:'85%',
      md: '180px'
    },
    ml:{
       xs:5,
      sm:5,
      md:0
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
      sx={{ backgroundColor: '#fff',
       borderRadius: '8px',
        mb: 3,
        mt:isSidebarOpen?0:5
        
        }}>
        <Tabs 
          value={tabValue} 
          onChange={(e, newValue) => setTabValue(newValue)}
          variant="fullWidth"
          orientation={isSmallScreen ? 'vertical' : 'horizontal'} // ✅ responsive orientation
          sx={{
            
            display:'flex',
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

      
      <Paper elevation={2} sx={{ backgroundColor: '#fff', borderRadius: '8px' }}>
        <Box sx={{ height: { xs: 400, sm: 500, md: 600 }, width: '100%' }}>
          <DataGrid
            rows={getRows()
              .filter((bill) => 
                (!selectedMonthYear || bill.monthAndYear === selectedMonthYear) && 
                (!wardName || bill.ward === wardName)
              )
              .map((bill, index) => ({ id: index + 1, ...bill }))}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
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
