// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchBills } from '../store/actions/billActions';
// import { DataGrid } from '@mui/x-data-grid';
// import {
//   Box,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Tabs,
//   Tab,
//   CircularProgress,
//   Paper,
//   useMediaQuery,
//   useTheme
// } from '@mui/material';
// import DownloadIcon from '@mui/icons-material/Download';
// import * as XLSX from 'xlsx';
// import BillDatePicker from '../components/BillDatePicker';
// import wardDataAtoI from '../data/warddataAtoI';
// import dayjs from 'dayjs';

// const BillingAnomaly = () => {
//   const dispatch = useDispatch();
//   const { bills: serverBills, loading, error } = useSelector((state) => state.bills);
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const user = useSelector((state) => state.auth.user);

//   const [tabValue, setTabValue] = useState(0);
//   const [wardName, setWardName] = useState('');
//   const [selectedMonthYear, setSelectedMonthYear] = useState('');

//   // Full processed anomaly data (used for filtering + export)
//   const [anomalyData, setAnomalyData] = useState({
//     zeroConsumptionBills: [],
//     highBills: [],
//     lowBills: []
//   });

//   const [paginationModel, setPaginationModel] = useState({
//     page: 0,
//     pageSize: 50,
//   });

//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

//   // Fetch ALL bills (large limit for speed + full data)
//   const fetchAllBills = () => {
//     const filters = {};

//     // Apply ward filter based on role
//     if (wardName && (
//       user?.role === 'Super Admin' ||
//       user?.role === 'Admin' ||
//       user?.role === 'Executive Engineer' ||
//       (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')
//     )) {
//       filters.wardName = wardName;
//     }

//     if (user?.role === 'Junior Engineer' && user?.ward !== 'Head Office') {
//       filters.wardName = user.ward;
//     }

//     // Large safe limit → gets ALL bills in 99.9% cases (fast + complete)
//     dispatch(fetchBills(1, 100000, filters, true));
//   };

//   // Re-fetch when ward changes
//   useEffect(() => {
//     fetchAllBills();
//   }, [wardName, user?.ward, user?.role]);

//   // Process anomalies whenever raw bills change
//   useEffect(() => {
//     if (serverBills && serverBills.length > 0) {
//       processAnomalies(serverBills);
//     } else {
//       setAnomalyData({
//         zeroConsumptionBills: [],
//         highBills: [],
//         lowBills: []
//       });
//     }
//   }, [serverBills]);

//   // Re-apply month filter when month changes
//   useEffect(() => {
//     if (serverBills && serverBills.length > 0) {
//       processAnomalies(serverBills);
//     }
//   }, [selectedMonthYear]);

//   const processAnomalies = (billsData) => {
//     const billMap = new Map();

//     billsData.forEach(bill => {
//       if (!billMap.has(bill.consumerNumber)) {
//         billMap.set(bill.consumerNumber, []);
//       }
//       billMap.get(bill.consumerNumber).push(bill);
//     });

//     const zero = [], high = [], low = [];

//     billMap.forEach(history => {
//       history.sort((a, b) => new Date(a.monthAndYear) - new Date(b.monthAndYear));

//       for (let i = 1; i < history.length; i++) {
//         const prev = history[i - 1];
//         const curr = history[i];
//         const prevAmt = prev.netBillAmount || 0;
//         const currAmt = curr.netBillAmount || 0;

//         if (curr.totalConsumption === 0) {
//           zero.push({ ...curr, prevNetBillAmount: prevAmt });
//         }
//         if (prevAmt > 0) {
//           if (currAmt >= prevAmt * 1.25) {
//             high.push({ ...curr, prevNetBillAmount: prevAmt });
//           }
//           if (currAmt <= prevAmt * 0.75) {
//             low.push({ ...curr, prevNetBillAmount: prevAmt });
//           }
//         }
//       }
//     });

//     // Apply month filter if selected
//     const filterByMonth = (arr) => 
//       selectedMonthYear 
//         ? arr.filter(b => b.monthAndYear === selectedMonthYear)
//         : arr;

//     setAnomalyData({
//       zeroConsumptionBills: filterByMonth(zero),
//       highBills: filterByMonth(high),
//       lowBills: filterByMonth(low)
//     });
//   };

//   const handleDateChange = (value) => {
//     const formatted = value ? dayjs(value).format("MMM-YYYY").toUpperCase() : '';
//     setSelectedMonthYear(formatted);
//     setPaginationModel(prev => ({ ...prev, page: 0 }));
//   };

//   const handleChangeWard = (e) => {
//     setWardName(e.target.value);
//     setPaginationModel({ page: 0, pageSize: 50 });
//   };

//   const handleTabChange = (e, newValue) => {
//     setTabValue(newValue);
//     setPaginationModel({ page: 0, pageSize: paginationModel.pageSize });
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return <Box sx={{ p: 3, color: 'error.main' }}>Error: {error}</Box>;
//   }

//   const getCurrentData = () => {
//     switch (tabValue) {
//       case 0: return anomalyData.zeroConsumptionBills;
//       case 1: return anomalyData.highBills;
//       case 2: return anomalyData.lowBills;
//       default: return [];
//     }
//   };

//   const currentData = getCurrentData();

//   // Client-side paginated rows (only for display)
//   // const paginatedRows = currentData
//   //   .slice(paginationModel.page * paginationModel.pageSize, (paginationModel.page + 1) * paginationModel.pageSize)
//   //   .map((bill, idx) => ({
//   //     id: paginationModel.page * paginationModel.pageSize + idx + 1,
//   //     ...bill
//   //   }));


//   // ✅ ADD THIS (simple & correct)
// const rows = currentData.map((bill, idx) => ({
//   id: idx + 1,
//   ...bill
// }));


//   // Export ALL filtered data
//   const downloadAllTypsOfReport = () => {
//     const data = currentData.map((row, i) => ({
//       'Sr.No': i + 1,
//       'Consumer No.': row.consumerNumber,
//       'Ward': row.ward,
//       'Meter No.': row.meterNumber,
//       'Consumption': row.totalConsumption,
//       'Meter Status': row.meterStatus,
//       'Bill Month': row.monthAndYear,
//       'Previous Amount': Number(row.prevNetBillAmount || 0).toFixed(2),
//       'Current Amount': Number(row.netBillAmount || 0).toFixed(2),
//     }));

//     const ws = XLSX.utils.json_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Report');
//     XLSX.writeFile(wb, `${getTabLabel(tabValue)}_Report_${dayjs().format('DD-MMM-YYYY')}.xlsx`);
//   };

//   const columns = [
//     { field: 'id', headerName: 'ID', width: 80 },
//     { field: 'consumerNumber', headerName: 'CONSUMER NO.', width: 150 },
//     { field: 'ward', headerName: 'WARD', width: 120 },
//     { field: 'meterNumber', headerName: 'METER NO.', width: 140 },
//     { field: 'totalConsumption', headerName: 'CONSUMPTION', width: 130 },
//     { field: 'meterStatus', headerName: 'METER STATUS', width: 130 },
//     { field: 'monthAndYear', headerName: 'BILL MONTH', width: 130 },
//     { field: 'prevNetBillAmount', headerName: 'PREV AMOUNT', width: 140 },
//     { field: 'netBillAmount', headerName: 'CURRENT AMOUNT', width: 150 },
//   ];

//   const getTabLabel = (index) => {
//     switch (index) {
//       case 0: return 'ZERO CONSUMPTION BILLS';
//       case 1: return 'HIGH ANOMALY BILLS';
//       case 2: return 'LOW ANOMALY BILLS';
//       default: return '';
//     }
//   };

//   const controlStyle = {
//     height: 40,
//     width: { xs: '100%', sm: '180px' },
//     '& .MuiInputBase-root': { height: 40, fontSize: '0.875rem' },
//     '& .MuiInputLabel-root': { fontSize: '0.875rem' }
//   };

//   return (
//     <Box sx={{
//       minHeight: '100vh',
//       backgroundColor: '#f5f5f5',
//       ml: { xs: 0, sm: isSidebarOpen ? '250px' : '80px' },
//       transition: 'margin 0.3s',
//       p: { xs: 1, sm: 2, md: 3 }
//     }}>
//       {/* Tabs */}
//       <Paper elevation={0} sx={{ borderRadius: 2, mb: 3, backgroundColor: '#fff' }}>
//         <Tabs
//           value={tabValue}
//           onChange={handleTabChange}
//           variant="fullWidth"
//           sx={{
//             '& .MuiTab-root': {
//               fontWeight: 500,
//               textTransform: 'none',
//               fontSize: { xs: '0.8rem', sm: '0.9rem' },
//               '&.Mui-selected': {
//                 color: '#23CCEF',
//                 fontWeight: 600,
//                 '&::after': {
//                   content: '""',
//                   position: 'absolute',
//                   bottom: 0,
//                   left: '50%',
//                   transform: 'translateX(-50%)',
//                   width: '70%',
//                   height: 3,
//                   bgcolor: '#23CCEF',
//                   borderRadius: 1
//                 }
//               }
//             },
//             '& .MuiTabs-indicator': { display: 'none' }
//           }}
//         >
//           <Tab label={getTabLabel(0)} />
//           <Tab label={getTabLabel(1)} />
//           <Tab label={getTabLabel(2)} />
//         </Tabs>
//       </Paper>

//       {/* Filters + Download */}
//       <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3, alignItems: 'center' }}>
//         <Button
//           variant="contained"
//           startIcon={<DownloadIcon />}
//           onClick={downloadAllTypsOfReport}
//           sx={{
//             ...controlStyle,
//             bgcolor: '#23CCEF',
//             '&:hover': { bgcolor: '#1AB3D1' },
//             borderRadius: 2,
//             textTransform: 'none'
//           }}
//         >
//           Download Report
//         </Button>

//         <Box sx={controlStyle}>
//           <BillDatePicker
//             selectedMonthYear={selectedMonthYear}
//             onChange={handleDateChange}
//           />
//         </Box>

//         {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
//           <FormControl size="small" sx={controlStyle}>
//             <InputLabel>Ward</InputLabel>
//             <Select
//               value={wardName}
//               onChange={handleChangeWard}
//               label="Ward"
//               sx={{ bgcolor: 'white', borderRadius: 2 }}
//             >
//               <MenuItem value="">All Wards</MenuItem>
//               {wardDataAtoI.map((w) => (
//                 <MenuItem key={w.ward} value={w.ward}>{w.ward}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         )}
//       </Box>

//       {/* Data Table */}
//       <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
//         <Box sx={{ height: { xs: 500, md: 700 }, width: '100%' }}>
//           <DataGrid
//             // rows={paginatedRows}
//             rows={rows}
//             columns={columns}
//             pagination
//             paginationMode="client"
//             paginationModel={paginationModel}
//             onPaginationModelChange={setPaginationModel}
//             pageSizeOptions={[10, 25, 50, 100]}
//             // rowCount={currentData.length}
//             loading={loading}
//             disableRowSelectionOnClick
//             sx={{
//               '& .MuiDataGrid-cell': { fontSize: '0.875rem' },
//               '& .MuiDataGrid-columnHeaders': { bgcolor: '#f8f9fa', fontWeight: 600 }
//             }}
//           />
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default BillingAnomaly;




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
// UI-only imports (redesign) — no logic
import { Typography, Breadcrumbs, Chip } from '@mui/material';
import InsightsIcon from '@mui/icons-material/Insights';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DownloadIcon from '@mui/icons-material/Download';
import * as XLSX from 'xlsx';
import BillDatePicker from '../components/BillDatePicker';
import wardDataAtoI from '../data/warddataAtoI';
import dayjs from 'dayjs';

/* ============================================================ */
/* UI ONLY — theme colours (Dashboard palette). No logic here.   */
/* ============================================================ */
const T = {
  primary: '#4F72F5',
  primary2: '#668AFB',
  primarySurface: '#EEF4FF',
  primaryBorder: '#D9E5FF',
  orange: '#F28C00',
  orangeDark: '#B86A00',
  orangeSurface: '#FFF5E8',
  green: '#22B568',
  red: '#F04444',
  redDark: '#C92A2A',
  redSurface: '#FFF0F0',
  bg: '#F7F9FC',
  card: '#FFFFFF',
  text: '#172033',
  text2: '#71809A',
  border: '#E5EAF2',
  font: "'Montserrat', 'Noto Sans Devanagari', sans-serif",
};

// UI-only: one visual config per existing tab index (0 zero, 1 high, 2 low)
const UI_TABS = [
  { icon: <PowerOffIcon />, fg: T.red, bg: T.redSurface, border: '#FAD4D4', title: 'Zero Consumption', sub: 'Bills with zero recorded consumption' },
  { icon: <TrendingUpIcon />, fg: T.orange, bg: T.orangeSurface, border: '#FBE1BF', title: 'High Anomaly', sub: 'Bill amount increased by 25% or more' },
  { icon: <TrendingDownIcon />, fg: T.primary, bg: T.primarySurface, border: T.primaryBorder, title: 'Low Anomaly', sub: 'Bill amount decreased by 25% or more' },
];

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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress sx={{ color: T.primary }} />
        <Typography sx={{ fontFamily: T.font, fontSize: 13, color: T.text2 }}>Analysing bills…</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, color: 'error.main', m: 3, ml: { xs: 3, sm: isSidebarOpen ? '270px' : '100px' }, borderRadius: '12px', border: '1px solid #FAD4D4', backgroundColor: T.redSurface, display: 'flex', alignItems: 'center', gap: 1.5, fontFamily: T.font, fontWeight: 600 }}>
        <ErrorOutlineIcon sx={{ color: T.red }} />
        Error: {error}
      </Box>
    );
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
    '& .MuiInputLabel-root': { fontSize: '0.875rem' },
    // UI only: input look
    '& .MuiOutlinedInput-root': { borderRadius: '10px', backgroundColor: T.card, fontFamily: T.font },
    '& .MuiOutlinedInput-root fieldset': { borderColor: T.border },
    '& .MuiOutlinedInput-root:hover fieldset': { borderColor: T.primaryBorder },
    '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: T.primary },
    '& .MuiInputLabel-root.Mui-focused': { color: T.primary },
  };

  // UI-only display values (read-only, from existing anomaly arrays)
  const uiCounts = [anomalyData.zeroConsumptionBills.length, anomalyData.highBills.length, anomalyData.lowBills.length];
  const uiTab = UI_TABS[tabValue] || UI_TABS[0];
  // UI-only: CSS class per cell (cell values are never changed)
  const uiCellClass = (params) => {
    if (params.field === 'prevNetBillAmount' || params.field === 'netBillAmount') {
      if (params.field === 'netBillAmount' && tabValue === 1) return 'ui-amt ui-amt-up';
      if (params.field === 'netBillAmount' && tabValue === 2) return 'ui-amt ui-amt-down';
      return 'ui-amt';
    }
    if (params.field === 'totalConsumption') return Number(params.value) === 0 ? 'ui-num ui-zero' : 'ui-num';
    if (params.field === 'consumerNumber') return 'ui-strong';
    return '';
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: T.bg,
      ml: { xs: 0, sm: isSidebarOpen ? '250px' : '80px' },
      transition: 'margin 0.3s',
      p: { xs: 1, sm: 2, md: 3 },
      fontFamily: T.font,
    }}>
      {/* ================= PAGE HEADER (UI only) ================= */}
      <Paper elevation={0} sx={{ mb: 2, p: { xs: 2, md: 2.5 }, borderRadius: '14px', border: `1px solid ${T.border}`, backgroundColor: T.card, display: 'flex', alignItems: 'center', gap: 1.75 }}>
        <Box sx={{ width: 48, height: 48, borderRadius: '12px', flexShrink: 0, display: 'grid', placeItems: 'center', color: T.primary, backgroundColor: T.primarySurface, border: `1px solid ${T.primaryBorder}` }}>
          <InsightsIcon />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Breadcrumbs separator="/" sx={{ '& .MuiBreadcrumbs-separator': { mx: 0.75, color: '#B4BFD2' } }}>
            <Typography sx={{ fontFamily: T.font, fontSize: 12, color: T.text2 }}>Home</Typography>
            <Typography sx={{ fontFamily: T.font, fontSize: 12, color: T.primary, fontWeight: 600 }}>Billing Anomalies</Typography>
          </Breadcrumbs>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 4, height: 22, borderRadius: 2, backgroundColor: T.orange, flexShrink: 0 }} />
            <Typography sx={{ fontFamily: T.font, fontSize: { xs: 18, md: 21 }, fontWeight: 700, color: T.text }}>Billing Anomalies</Typography>
          </Box>
          <Typography sx={{ fontFamily: T.font, fontSize: 13, color: T.text2, mt: 0.25 }}>
            Monitor zero consumption, unusually high bills, and unusually low electricity bills.
          </Typography>
        </Box>
      </Paper>

      {/* ================= SUMMARY CARDS (UI only, read-only) ================= */}
      <Box sx={{ mb: 2, display: 'grid', gap: 1.5, gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0,1fr))' } }}>
        {UI_TABS.map((c, i) => (
          <Paper
            key={c.title}
            elevation={0}
            sx={{
              position: 'relative', overflow: 'hidden',
              p: 1.75, borderRadius: '14px', border: `1px solid ${tabValue === i ? c.border : T.border}`, backgroundColor: T.card,
              display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0,
              boxShadow: '0 1px 2px rgba(23, 32, 51, 0.04)',
              transition: 'box-shadow .2s ease, transform .2s ease',
              '&:hover': { boxShadow: '0 6px 16px rgba(23, 32, 51, 0.08)', transform: 'translateY(-1px)' },
              '&::after': { content: '""', position: 'absolute', left: 0, right: 0, bottom: 0, height: 3, backgroundColor: c.fg, opacity: tabValue === i ? 1 : 0.35 },
            }}
          >
            <Box sx={{ width: 42, height: 42, flexShrink: 0, borderRadius: '10px', display: 'grid', placeItems: 'center', color: c.fg, backgroundColor: c.bg, '& svg': { fontSize: 22 } }}>
              {c.icon}
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontFamily: T.font, fontSize: 12.5, fontWeight: 600, color: T.text2 }}>{c.title}</Typography>
              <Typography sx={{ fontFamily: T.font, fontSize: 24, fontWeight: 700, color: T.text, lineHeight: 1.2 }}>{uiCounts[i].toLocaleString('en-IN')}</Typography>
              <Typography sx={{ fontFamily: T.font, fontSize: 11.5, color: T.text2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.sub}</Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Tabs */}
      <Paper elevation={0} sx={{ borderRadius: '14px', mb: 2, backgroundColor: '#fff', border: `1px solid ${T.border}`, p: 0.75 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            minHeight: 44,
            '& .MuiTab-root': {
              fontWeight: 500,
              textTransform: 'none',
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              fontFamily: T.font,
              color: T.text2,
              minHeight: 44,
              borderRadius: '10px',
              transition: 'background-color .2s ease, color .2s ease',
              '&:hover': { backgroundColor: '#F5F7FB' },
              '&.Mui-selected': {
                color: T.primary,
                fontWeight: 600,
                backgroundColor: T.primarySurface,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '70%',
                  height: 3,
                  bgcolor: T.primary,
                  borderRadius: 1
                }
              }
            },
            '& .MuiTabs-indicator': { display: 'none' }
          }}
        >
          {[0, 1, 2].map((i) => (
            <Tab
              key={i}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, '& svg': { fontSize: 18, color: UI_TABS[i].fg } }}>
                  {UI_TABS[i].icon}
                  <span>{getTabLabel(i)}</span>
                  <Box component="span" sx={{ px: 0.9, py: 0.1, borderRadius: '999px', fontSize: 11.5, fontWeight: 700, color: UI_TABS[i].fg, backgroundColor: UI_TABS[i].bg, border: `1px solid ${UI_TABS[i].border}` }}>
                    {uiCounts[i].toLocaleString('en-IN')}
                  </Box>
                </Box>
              }
            />
          ))}
        </Tabs>
      </Paper>

      {/* Filters + Download */}
      <Paper elevation={0} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center', p: 1.5, borderRadius: '14px', border: `1px solid ${T.border}`, backgroundColor: T.card }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <CalendarMonthOutlinedIcon sx={{ fontSize: 19, color: T.primary }} />
          <Typography sx={{ fontFamily: T.font, fontSize: 13.5, fontWeight: 600, color: T.text }}>Filters</Typography>
        </Box>

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
              sx={{ bgcolor: 'white', borderRadius: '10px' }}
            >
              <MenuItem value="">All Wards</MenuItem>
              {wardDataAtoI.map((w) => (
                <MenuItem key={w.ward} value={w.ward}>{w.ward}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <Box sx={{ flex: 1, display: { xs: 'none', sm: 'block' } }} />

        <Chip
          label={`${currentData.length.toLocaleString('en-IN')} records`}
          sx={{ fontFamily: T.font, fontWeight: 600, fontSize: 12, height: 28, color: uiTab.fg, backgroundColor: uiTab.bg, border: `1px solid ${uiTab.border}` }}
        />

        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={downloadAllTypsOfReport}
          sx={{
            ...controlStyle,
            bgcolor: T.primary,
            '&:hover': { bgcolor: '#3F61E0', boxShadow: '0 4px 12px rgba(79,114,245,.25)' },
            borderRadius: '10px',
            textTransform: 'none',
            fontFamily: T.font,
            fontWeight: 600,
            boxShadow: 'none',
          }}
        >
          Download Report
        </Button>
      </Paper>

      {/* Data Table */}
      <Paper elevation={0} sx={{ borderRadius: '14px', overflow: 'hidden', border: `1px solid ${T.border}`, boxShadow: '0 1px 2px rgba(23, 32, 51, 0.04)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1.5, borderBottom: `1px solid ${T.border}`, backgroundColor: T.card }}>
          <Box sx={{ width: 4, height: 18, borderRadius: 2, backgroundColor: uiTab.fg }} />
          <Typography sx={{ fontFamily: T.font, fontWeight: 700, fontSize: 14.5, color: T.text }}>{uiTab.title} Records</Typography>
          {selectedMonthYear && (
            <Chip size="small" label={selectedMonthYear} sx={{ ml: 'auto', fontFamily: T.font, fontSize: 12, color: T.primary, backgroundColor: T.primarySurface, border: `1px solid ${T.primaryBorder}` }} />
          )}
        </Box>
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
            getCellClassName={uiCellClass}
            sx={{
              '& .MuiDataGrid-cell': { fontSize: '0.875rem' },
              '& .MuiDataGrid-columnHeaders': { bgcolor: '#f8f9fa', fontWeight: 600 },
              // ---- UI only (CSS styling, no behaviour change) ----
              border: 'none',
              fontFamily: T.font,
              color: T.text,
              '& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeader': { bgcolor: '#F3F6FC' },
              '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 600, fontSize: 12, color: '#4A5875', letterSpacing: 0.2 },
              '& .MuiDataGrid-columnSeparator': { color: T.border },
              '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': { outline: 'none' },
              '& .MuiDataGrid-row:nth-of-type(odd)': { backgroundColor: '#FAFBFE' },
              '& .MuiDataGrid-row:hover': { backgroundColor: T.primarySurface },
              '& .MuiDataGrid-footerContainer': { borderTop: `1px solid ${T.border}`, backgroundColor: '#FBFCFE' },
              '& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': { fontFamily: T.font, color: T.text2 },
              '& .ui-strong': { fontWeight: 600 },
              '& .ui-num, & .ui-amt': { fontVariantNumeric: 'tabular-nums' },
              '& .ui-amt': { justifyContent: 'flex-end', textAlign: 'right' },
              '& .ui-zero': { color: T.redDark, fontWeight: 700 },
              '& .ui-zero::before': { content: '""', display: 'inline-block', width: 7, height: 7, borderRadius: '50%', backgroundColor: T.red, marginRight: 6 },
              '& .ui-amt-up': { color: T.orangeDark, fontWeight: 700 },
              '& .ui-amt-up::before': { content: '"▲"', fontSize: 10, marginRight: 5 },
              '& .ui-amt-down': { color: T.primary, fontWeight: 700 },
              '& .ui-amt-down::before': { content: '"▼"', fontSize: 10, marginRight: 5 },
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default BillingAnomaly;