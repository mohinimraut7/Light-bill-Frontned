// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchBills } from '../store/actions/billActions';
// import { DataGrid } from '@mui/x-data-grid';
// import { Typography, Box,Modal,Button,TextField,MenuItem, Select, InputLabel, FormControl,Checkbox,OutlinedInput,Tabs, Tab,} from '@mui/material';

// import { CircularProgress } from '@mui/material';
// import DownloadIcon from '@mui/icons-material/Download';
// import * as XLSX from 'xlsx';
// import ConsumerButton from '../components/ConsumerButton';
// import BillDatePicker from '../components/BillDatePicker';
// import wardDataAtoI from '../data/warddataAtoI';

// import dayjs from "dayjs";
// const BillingAnomaly = () => {
//   const dispatch = useDispatch();
//   const { bills, loading, error } = useSelector((state) => state.bills);
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const [tabValue, setTabValue] = useState(0);
//     const [wardName, setWardName] = useState('');
  
//   const [selectedMonthYear, setSelectedMonthYear] = useState('');
//   const user = useSelector(state => state.auth.user);

//   useEffect(() => {
//     dispatch(fetchBills());
//   }, [dispatch]);

//    const handleDateChange = (value) => {
//       const formattedValue = dayjs(value).format("MMM-YYYY").toUpperCase();
//       setSelectedMonthYear(formattedValue);
//     };

//     const handleChangeWard = (event) => setWardName(event.target.value);


//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   // Sort bills by monthAndYear
//   const sortedBills = [...bills].sort((a, b) => new Date(a.monthAndYear) - new Date(b.monthAndYear));
//   const billMap = new Map();
//   sortedBills.forEach((bill) => {
//     if (!billMap.has(bill.consumerNumber)) {
//       billMap.set(bill.consumerNumber, []);
//     }
//     billMap.get(bill.consumerNumber).push(bill);
//   });

//   const highBills = [];
//   const lowBills = [];
//   const zeroConsumptionBills = [];

//   billMap.forEach((billHistory) => {
//     if (billHistory.length < 2) return;
//     const previousBill = billHistory[billHistory.length - 2];
//     const currentBill = billHistory[billHistory.length - 1];
//     const prevAmount = previousBill.netBillAmount;
//     const currAmount = currentBill.netBillAmount;
//     const highThreshold = prevAmount + prevAmount * 0.25;
//     const lowThreshold = prevAmount - prevAmount * 0.25;

//     if (currAmount >= highThreshold) {
//       highBills.push({ ...currentBill, prevNetBillAmount: prevAmount });
//     } else if (currAmount <= lowThreshold) {
//       lowBills.push({ ...currentBill, prevNetBillAmount: prevAmount });
//     }

  
//     if (currentBill.totalConsumption === 0) {
//         zeroConsumptionBills.push({ ...currentBill, prevNetBillAmount: previousBill.netBillAmount || 0 });
//       }
//   });
//   const downloadAllTypsOfReport = () => {
//     // const rows = getRows()
//     // .filter(bill => !selectedMonthYear || bill.monthAndYear === selectedMonthYear)&&(!wardName || bill.ward === wardName);
//     const rows = getRows().filter(
//       bill =>
//         (!selectedMonthYear || bill.monthAndYear === selectedMonthYear) &&
//         (!wardName || bill.ward === wardName)
//     );
    
//       const worksheet = XLSX.utils.json_to_sheet(rows.map((row, index) =>({
//         'ID': index+1,
//         'Consumer No.': row.consumerNumber,
//         'Ward': row.ward,
//         'Meter Number': row.meterNumber,
//         'Total Consumption': row.totalConsumption,
//         'Meter Status': row.meterStatus,
//         'billMonth':row.monthAndYear,
//         'previousBillAmount':row.prevNetBillAmount,
//         'Net Bill Amount': row.netBillAmount,
//       })));
  
//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, worksheet, 'Bills');
//       XLSX.writeFile(workbook, 'ConsumerBills.xlsx');
//     };

//   const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'consumerNumber', headerName: 'CONSUMER NUMBER', width: 140 },
//     { field: 'ward', headerName: 'WARD', width: 130 },
//     { field: 'meterNumber', headerName: 'METER NUMBER', width: 130 },
//     { field: 'totalConsumption', headerName: 'TOTAL CONSUMPTION', width: 130 },
//     { field: 'meterStatus', headerName: 'METER STATUS', width: 130 },
//     { field: 'monthAndYear', headerName: 'BILL MONTH', width: 130 },
//     { field: 'prevNetBillAmount', headerName: 'PREVIOUS BILL AMOUNT', width: 150 },
//     { field: 'netBillAmount', headerName: 'NET BILL AMOUNT', width: 150 },
//   ];

//   const getRows = () => {
//     switch (tabValue) {
//       case 0:
//         return zeroConsumptionBills;
//       case 1:
//         return highBills;
//       case 2:
//         return lowBills;
//       default:
//         return [];
//     }
//   };

//   return (
//     <Box sx={{ width: '90%', marginLeft:isSidebarOpen?'250px':'100px',paddingTop: isSidebarOpen?'20px':'50px' }}>
//       <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
//         <Tab label="Zero Consumption Bills" />
//         <Tab label="High Anomaly Bills" />
//         <Tab label="Low Anomaly Bills" />
//       </Tabs>
//       <Box sx={{display:'flex',mt:3}}>
//       <Box sx={{mt:1}}><Button sx={{width:'100%'}} onClick={downloadAllTypsOfReport} startIcon={<DownloadIcon/>}>Download Reports</Button></Box>

// {
// (user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer'|| user?.role === 'Lipik' || user.role==='Accountant' || user.role==='Assistant Municipal Commissioner' || user.role==='Dy.Municipal Commissioner')
// &&
// (

//     <Box sx={{
//       width: {
//         lg: '20%',
//         xl: '20%',
//         md: '30%',
//         sm: '100%',
//         xs: '100%'
//       },
//       mb: {
//         sm: 1,
//         xs: 1
//       }
//     }}>
//       <BillDatePicker 
//         selectedMonthYear={selectedMonthYear} 
//         onChange={handleDateChange} 
//       />
//     </Box>
// )}


// {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer') && (
//   <FormControl
//   fullWidth
//   size="small"
//   variant="outlined"
//   sx={{
//     width: {
//       xl: '30%',
//       lg: '30%',
//       md: '30%',
//       sm: '40%',
//       xs: '100%',
//     },
//     // mt: { sm: 1 }, 
//     ml:{
//       xl:1,
//       lg:1,
//       md:1,
//       sm:1
//     }
//   }}
// >
//   <InputLabel id="ward-label">Search Ward</InputLabel>
//   <Select
//     labelId="ward-label"
//     id="ward"
//     name="ward"
//     value={wardName}
//     onChange={handleChangeWard}
//     label="Search Ward"
//   >
//     {wardDataAtoI.length > 0 ? (
//       wardDataAtoI.map((ward, index) => (
//         <MenuItem key={index} value={ward.ward}>
//           {ward.ward}
//         </MenuItem>
//       ))
//     ) : (
//       <MenuItem disabled>No Wards Available</MenuItem>
//     )}
//   </Select>
// </FormControl>
// )}

//       </Box>
      
//       <Box sx={{ marginTop: '20px', border: '1px solid #F7F7F8', padding: '20px' }}>
//         <DataGrid 
//        rows={getRows()
//         .filter(
//           bill => 
//             (!selectedMonthYear || bill.monthAndYear === selectedMonthYear )&&
//         (!wardName || bill.ward === wardName)
//     )
//         .map((bill, index) => ({ id: index + 1, ...bill }))
//       }
//         columns={columns} pageSize={5} />
//       </Box>
//     </Box>
//   );
// };

// export default BillingAnomaly;
// =========================================================================
// ---------------------------------------------------------
// 5 July Chnages
// ------------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchBills } from '../store/actions/billActions';
// import { DataGrid } from '@mui/x-data-grid';
// import {
//   Typography,
//   Box,
//   Modal,
//   Button,
//   TextField,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Checkbox,
//   OutlinedInput,
//   Tabs,
//   Tab,
//   CircularProgress
// } from '@mui/material';
// import DownloadIcon from '@mui/icons-material/Download';
// import * as XLSX from 'xlsx';
// import ConsumerButton from '../components/ConsumerButton';
// import BillDatePicker from '../components/BillDatePicker';
// import wardDataAtoI from '../data/warddataAtoI';
// import dayjs from 'dayjs';

// const BillingAnomaly = () => {
//   const dispatch = useDispatch();
//   const { bills, loading, error } = useSelector((state) => state.bills);
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const [tabValue, setTabValue] = useState(0);
//   const [wardName, setWardName] = useState('');
//   const [selectedMonthYear, setSelectedMonthYear] = useState('');
  
//   const user = useSelector((state) => state.auth.user);

//   useEffect(() => {
//     dispatch(fetchBills());
//   }, [dispatch]);

//   const handleDateChange = (value) => {
//     const formattedValue = dayjs(value).format("MMM-YYYY").toUpperCase();
//     setSelectedMonthYear(formattedValue);
//   };

//   const handleChangeWard = (event) => setWardName(event.target.value);

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   // Sort bills by monthAndYear
//   const sortedBills = [...bills].sort((a, b) => new Date(a.monthAndYear) - new Date(b.monthAndYear));
//   const billMap = new Map();
//   sortedBills.forEach((bill) => {
//     if (!billMap.has(bill.consumerNumber)) {
//       billMap.set(bill.consumerNumber, []);
//     }
//     billMap.get(bill.consumerNumber).push(bill);
//   });

//   const highBills = [];
//   const lowBills = [];
//   const zeroConsumptionBills = [];

//   // Check anomaly across all months per consumer
//   billMap.forEach((billHistory) => {
//     billHistory.sort((a, b) => new Date(a.monthAndYear) - new Date(b.monthAndYear));
//     for (let i = 1; i < billHistory.length; i++) {
//       const previousBill = billHistory[i - 1];
//       const currentBill = billHistory[i];
//       const prevAmount = previousBill.netBillAmount;
//       const currAmount = currentBill.netBillAmount;
//       const highThreshold = prevAmount + prevAmount * 0.25;
//       const lowThreshold = prevAmount - prevAmount * 0.25;

//       if (currAmount >= highThreshold) {
//         highBills.push({ ...currentBill, prevNetBillAmount: prevAmount });
//       } else if (currAmount <= lowThreshold) {
//         lowBills.push({ ...currentBill, prevNetBillAmount: prevAmount });
//       }

//       if (currentBill.totalConsumption === 0) {
//         zeroConsumptionBills.push({ ...currentBill, prevNetBillAmount: prevAmount });
//       }
//     }
//   });

//   const downloadAllTypsOfReport = () => {
//     const rows = getRows().filter(
//       bill =>
//         (!selectedMonthYear || bill.monthAndYear === selectedMonthYear) &&
//         (!wardName || bill.ward === wardName)
//     );

//     const worksheet = XLSX.utils.json_to_sheet(
//       rows.map((row, index) => ({
//         'ID': index + 1,
//         'Consumer No.': row.consumerNumber,
//         'Ward': row.ward,
//         'Meter Number': row.meterNumber,
//         'Total Consumption': row.totalConsumption,
//         'Meter Status': row.meterStatus,
//         'billMonth': row.monthAndYear,
//         'previousBillAmount': row.prevNetBillAmount,
//         'Net Bill Amount': row.netBillAmount,
//       }))
//     );

//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Bills');
//     XLSX.writeFile(workbook, 'ConsumerBills.xlsx');
//   };

//   const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'consumerNumber', headerName: 'CONSUMER NUMBER', width: 140 },
//     { field: 'ward', headerName: 'WARD', width: 130 },
//     { field: 'meterNumber', headerName: 'METER NUMBER', width: 130 },
//     { field: 'totalConsumption', headerName: 'TOTAL CONSUMPTION', width: 130 },
//     { field: 'meterStatus', headerName: 'METER STATUS', width: 130 },
//     { field: 'monthAndYear', headerName: 'BILL MONTH', width: 130 },
//     { field: 'prevNetBillAmount', headerName: 'PREVIOUS BILL AMOUNT', width: 150 },
//     { field: 'netBillAmount', headerName: 'NET BILL AMOUNT', width: 150 },
//   ];

//   const getRows = () => {
//     switch (tabValue) {
//       case 0:
//         return zeroConsumptionBills;
//       case 1:
//         return highBills;
//       case 2:
//         return lowBills;
//       default:
//         return [];
//     }
//   };

//   return (
//     <Box sx={{ width: '90%', marginLeft: isSidebarOpen ? '250px' : '100px', paddingTop: isSidebarOpen ? '20px' : '50px' }}>
//       <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
//         <Tab label="Zero Consumption Bills" />
//         <Tab label="High Anomaly Bills" />
//         <Tab label="Low Anomaly Bills" />
//       </Tabs>

//       <Box sx={{ display: 'flex', mt: 3 }}>
//         <Box sx={{ mt: 1 }}>
//           <Button sx={{ width: '100%' }} onClick={downloadAllTypsOfReport} startIcon={<DownloadIcon />}>
//             Download Reports
//           </Button>
//         </Box>

//         {(user?.role === 'Super Admin' ||
//           user?.role === 'Admin' ||
//           user?.role === 'Executive Engineer' ||
//           user?.role === 'Junior Engineer' ||
//           user?.role === 'Lipik' ||
//           user?.role === 'Accountant' ||
//           user?.role === 'Assistant Municipal Commissioner' ||
//           user?.role === 'Dy.Municipal Commissioner') && (
//           <Box
//             sx={{
//               width: {
//                 lg: '20%',
//                 xl: '20%',
//                 md: '30%',
//                 sm: '100%',
//                 xs: '100%',
//               },
//               mb: {
//                 sm: 1,
//                 xs: 1,
//               },
//             }}
//           >
//             <BillDatePicker selectedMonthYear={selectedMonthYear} onChange={handleDateChange} />
//           </Box>
//         )}

//         {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role==='Junior Engineer'&& user?.ward==='Head Office')) && (
//           <FormControl
//             fullWidth
//             size="small"
//             variant="outlined"
//             sx={{
//               width: {
//                 xl: '30%',
//                 lg: '30%',
//                 md: '30%',
//                 sm: '40%',
//                 xs: '100%',
//               },
//               ml: {
//                 xl: 1,
//                 lg: 1,
//                 md: 1,
//                 sm: 1,
//               },
//             }}
//           >
//             <InputLabel id="ward-label">Search Ward</InputLabel>
//             <Select labelId="ward-label" id="ward" name="ward" value={wardName} onChange={handleChangeWard} label="Search Ward">
//               {wardDataAtoI.length > 0 ? (
//                 wardDataAtoI.map((ward, index) => (
//                   <MenuItem key={index} value={ward.ward}>
//                     {ward.ward}
//                   </MenuItem>
//                 ))
//               ) : (
//                 <MenuItem disabled>No Wards Available</MenuItem>
//               )}
//             </Select>
//           </FormControl>
//         )}
//       </Box>

//       <Box sx={{ marginTop: '20px', border: '1px solid #F7F7F8', padding: '20px' }}>
//         <DataGrid
//           rows={getRows()
//             .filter((bill) => (!selectedMonthYear || bill.monthAndYear === selectedMonthYear) && (!wardName || bill.ward === wardName))
//             .map((bill, index) => ({ id: index + 1, ...bill }))}
//           columns={columns}
//           pageSize={5}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default BillingAnomaly;

// -------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchBills } from '../store/actions/billActions';
// import { DataGrid } from '@mui/x-data-grid';
// import {
//   Typography,
//   Box,
//   Modal,
//   Button,
//   TextField,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Checkbox,
//   OutlinedInput,
//   Tabs,
//   Tab,
//   CircularProgress,
//   Container,
//   Paper,
//   Avatar,
//   IconButton
// } from '@mui/material';
// import DownloadIcon from '@mui/icons-material/Download';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import PersonIcon from '@mui/icons-material/Person';
// import PowerIcon from '@mui/icons-material/Power';
// import * as XLSX from 'xlsx';
// import ConsumerButton from '../components/ConsumerButton';
// import BillDatePicker from '../components/BillDatePicker';
// import wardDataAtoI from '../data/warddataAtoI';
// import dayjs from 'dayjs';

// const BillingAnomaly = () => {
//   const dispatch = useDispatch();
//   const { bills, loading, error } = useSelector((state) => state.bills);
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const [tabValue, setTabValue] = useState(0);
//   const [wardName, setWardName] = useState('');
//   const [selectedMonthYear, setSelectedMonthYear] = useState('');
  
//   const user = useSelector((state) => state.auth.user);

//   useEffect(() => {
//     dispatch(fetchBills());
//   }, [dispatch]);

//   const handleDateChange = (value) => {
//     const formattedValue = dayjs(value).format("MMM-YYYY").toUpperCase();
//     setSelectedMonthYear(formattedValue);
//   };

//   const handleChangeWard = (event) => setWardName(event.target.value);

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   // Sort bills by monthAndYear
//   const sortedBills = [...bills].sort((a, b) => new Date(a.monthAndYear) - new Date(b.monthAndYear));
//   const billMap = new Map();
//   sortedBills.forEach((bill) => {
//     if (!billMap.has(bill.consumerNumber)) {
//       billMap.set(bill.consumerNumber, []);
//     }
//     billMap.get(bill.consumerNumber).push(bill);
//   });

//   const highBills = [];
//   const lowBills = [];
//   const zeroConsumptionBills = [];

//   // Check anomaly across all months per consumer
//   billMap.forEach((billHistory) => {
//     billHistory.sort((a, b) => new Date(a.monthAndYear) - new Date(b.monthAndYear));
//     for (let i = 1; i < billHistory.length; i++) {
//       const previousBill = billHistory[i - 1];
//       const currentBill = billHistory[i];
//       const prevAmount = previousBill.netBillAmount;
//       const currAmount = currentBill.netBillAmount;
//       const highThreshold = prevAmount + prevAmount * 0.25;
//       const lowThreshold = prevAmount - prevAmount * 0.25;

//       if (currAmount >= highThreshold) {
//         highBills.push({ ...currentBill, prevNetBillAmount: prevAmount });
//       } else if (currAmount <= lowThreshold) {
//         lowBills.push({ ...currentBill, prevNetBillAmount: prevAmount });
//       }

//       if (currentBill.totalConsumption === 0) {
//         zeroConsumptionBills.push({ ...currentBill, prevNetBillAmount: prevAmount });
//       }
//     }
//   });

//   const downloadAllTypsOfReport = () => {
//     const rows = getRows().filter(
//       bill =>
//         (!selectedMonthYear || bill.monthAndYear === selectedMonthYear) &&
//         (!wardName || bill.ward === wardName)
//     );

//     const worksheet = XLSX.utils.json_to_sheet(
//       rows.map((row, index) => ({
//         'ID': index + 1,
//         'Consumer No.': row.consumerNumber,
//         'Ward': row.ward,
//         'Meter Number': row.meterNumber,
//         'Total Consumption': row.totalConsumption,
//         'Meter Status': row.meterStatus,
//         'billMonth': row.monthAndYear,
//         'previousBillAmount': row.prevNetBillAmount,
//         'Net Bill Amount': row.netBillAmount,
//       }))
//     );

//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Bills');
//     XLSX.writeFile(workbook, 'ConsumerBills.xlsx');
//   };

//   const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'consumerNumber', headerName: 'CONSUMER NUMBER', width: 140 },
//     { field: 'ward', headerName: 'WARD', width: 130 },
//     { field: 'meterNumber', headerName: 'METER NUMBER', width: 130 },
//     { field: 'totalConsumption', headerName: 'TOTAL CONSUMPTION', width: 130 },
//     { field: 'meterStatus', headerName: 'METER STATUS', width: 130 },
//     { field: 'monthAndYear', headerName: 'BILL MONTH', width: 130 },
//     { field: 'prevNetBillAmount', headerName: 'PREVIOUS BILL AMOUNT', width: 150 },
//     { field: 'netBillAmount', headerName: 'NET BILL AMOUNT', width: 150 },
//   ];

//   const getRows = () => {
//     switch (tabValue) {
//       case 0:
//         return zeroConsumptionBills;
//       case 1:
//         return highBills;
//       case 2:
//         return lowBills;
//       default:
//         return [];
//     }
//   };

//   const getTabLabel = (index) => {
//     switch (index) {
//       case 0:
//         return 'ZERO CONSUMPTION BILLS';
//       case 1:
//         return 'HIGH ANOMALY BILLS';
//       case 2:
//         return 'LOW ANOMALY BILLS';
//       default:
//         return '';
//     }
//   };

//   // Small uniform styles for all controls
//   const smallControlStyles = {
//     height: '40px',
//     minHeight: '40px',
//     width: {
//       xs: '100%',
//       sm: '180px',
//       md: '180px',
//       lg: '180px',
//       xl: '180px'
//     },
//     '& .MuiInputBase-root': {
//       height: '40px',
//       minHeight: '40px',
//       fontSize: '0.875rem'
//     },
//     '& .MuiOutlinedInput-root': {
//       height: '40px',
//       minHeight: '40px',
//       fontSize: '0.875rem'
//     },
//     '& .MuiTextField-root': {
//       height: '40px',
//       minHeight: '40px'
//     },
//     '& .MuiInputLabel-root': {
//       fontSize: '0.875rem'
//     }
//   };

//   return (
//     <Box sx={{ 
//       minHeight: '100vh', 
//       backgroundColor: '#f5f5f5',
//       marginLeft: { 
//         xs: 0, 
//         sm: isSidebarOpen ? '250px' : '100px' 
//       },
//       padding: { 
//         xs: '10px', 
//         sm: '15px', 
//         md: '20px' 
//       },
//       width: {
//         xs: '100%',
//         sm: isSidebarOpen ? 'calc(100% - 250px)' : 'calc(100% - 100px)'
//       }
//     }}>
     

//       {/* Tabs with Equal Width and Height */}
//       <Paper elevation={0} sx={{ 
//         backgroundColor: '#fff', 
//         borderRadius: '8px',
//         mb: 3,
//         overflow: 'hidden'
//       }}>
//         <Tabs 
//           value={tabValue} 
//           onChange={(e, newValue) => setTabValue(newValue)}
//           variant="fullWidth"
//           sx={{
//             '& .MuiTabs-root': {
//               minHeight: '60px'
//             },
//             '& .MuiTab-root': {
//               fontSize: { xs: '0.75rem', sm: '0.875rem' },
//               fontWeight: 500,
//               py: 2,
//               px: { xs: 1, sm: 3 },
//               minHeight: '60px',
//               height: '60px',
//               textTransform: 'none',
//               flex: 1,
//               maxWidth: 'none',
//               '&.Mui-selected': {
//                 color: '#2196f3',
//                 fontWeight: 600
//               }
//             },
//             '& .MuiTabs-indicator': {
//               backgroundColor: '#2196f3',
//               height: 3
//             },
//             '& .MuiTabs-flexContainer': {
//               height: '60px'
//             }
//           }}
//         >
//           <Tab label={getTabLabel(0)} />
//           <Tab label={getTabLabel(1)} />
//           <Tab label={getTabLabel(2)} />
//         </Tabs>
//       </Paper>

//       {/* Controls in Two Rows */}
//       <Box sx={{ mb: 3 }}>
//         {/* First Row - Download Reports Button */}
//         <Box sx={{ 
//           display: 'flex', 
//           mb: 2,
//           justifyContent: 'flex-start'
//         }}>
//           <Button 
//             variant="contained" 
//             onClick={downloadAllTypsOfReport} 
//             startIcon={<DownloadIcon />}
//             sx={{
//               ...smallControlStyles,
//               backgroundColor: '#2196f3',
//               '&:hover': {
//                 backgroundColor: '#1976d2'
//               },
//               textTransform: 'none',
//               fontWeight: 500,
//               borderRadius: '6px',
//               fontSize: '0.75rem',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               px: 2
//             }}
//           >
//             DOWNLOAD REPORTS
//           </Button>
//         </Box>

//         {/* Second Row - Month and Year + Search Ward */}
//         <Box sx={{ 
//           display: 'flex', 
//           gap: { xs: 1, sm: 2 }, 
//           flexWrap: 'wrap',
//           alignItems: 'center',
//           flexDirection: { xs: 'column', sm: 'row' }
//         }}>
//           {(user?.role === 'Super Admin' ||
//             user?.role === 'Admin' ||
//             user?.role === 'Executive Engineer' ||
//             user?.role === 'Junior Engineer' ||
//             user?.role === 'Lipik' ||
//             user?.role === 'Accountant' ||
//             user?.role === 'Assistant Municipal Commissioner' ||
//             user?.role === 'Dy.Municipal Commissioner') && (
//             <Box sx={smallControlStyles}>
//               <BillDatePicker 
//                 selectedMonthYear={selectedMonthYear} 
//                 onChange={handleDateChange}
//                 sx={{y
//                   width: '100%',
//                   height: '100%',
//                   '& .MuiTextField-root': {
//                     backgroundColor: '#fff',
//                     borderRadius: '6px',
//                     width: '100%',
//                     height: '40px'
//                   },
//                   '& .MuiInputBase-root': {
//                     height: '40px',
//                     fontSize: '0.875rem'
//                   },
//                   '& .MuiOutlinedInput-root': {
//                     height: '40px',
//                     fontSize: '0.875rem'
//                   },
//                   '& .MuiInputLabel-root': {
//                     fontSize: '0.875rem'
//                   }
//                 }}
//               />
//             </Box>
//           )}

//           {(user?.role === 'Super Admin' || 
//             user?.role === 'Admin' || 
//             user?.role === 'Executive Engineer' || 
//             (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
//             <FormControl 
//               variant="outlined" 
//               size="small"
//               sx={{
//                 ...smallControlStyles,
//                 '& .MuiInputLabel-root': {
//                   fontSize: '0.875rem',
//                   top: '50%',
//                   transform: 'translateY(-50%)',
//                   '&.MuiInputLabel-shrink': {
//                     top: 0,
//                     transform: 'translateY(0) scale(0.75)'
//                   }
//                 }
//               }}
//             >
//               <InputLabel id="ward-label">Search Ward</InputLabel>
//               <Select 
//                 labelId="ward-label" 
//                 id="ward" 
//                 name="ward" 
//                 value={wardName} 
//                 onChange={handleChangeWard} 
//                 label="Search Ward"
//                 sx={{
//                   backgroundColor: '#fff',
//                   borderRadius: '6px',
//                   height: '40px',
//                   fontSize: '0.875rem',
//                   '& .MuiSelect-select': {
//                     height: '40px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     paddingTop: 0,
//                     paddingBottom: 0,
//                     fontSize: '0.875rem'
//                   }
//                 }}
//               >
//                 {wardDataAtoI.length > 0 ? (
//                   wardDataAtoI.map((ward, index) => (
//                     <MenuItem key={index} value={ward.ward}>
//                       {ward.ward}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem disabled>No Wards Available</MenuItem>
//                 )}
//               </Select>
//             </FormControl>
//           )}
//         </Box>
//       </Box>

//       {/* Data Table */}
//       <Paper elevation={2} sx={{ 
//         backgroundColor: '#fff', 
//         borderRadius: '8px',
//         overflow: 'hidden'
//       }}>
//         <Box sx={{ 
//           height: { xs: 400, sm: 500, md: 600 }, 
//           width: '100%' 
//         }}>
//           <DataGrid
//             rows={getRows()
//               .filter((bill) => 
//                 (!selectedMonthYear || bill.monthAndYear === selectedMonthYear) && 
//                 (!wardName || bill.ward === wardName)
//               )
//               .map((bill, index) => ({ id: index + 1, ...bill }))}
//             columns={columns.map(col => ({
//               ...col,
//               width: col.field === 'id' ? 70 : 
//                      col.field === 'consumerNumber' ? 140 :
//                      col.field === 'prevNetBillAmount' ? 150 :
//                      col.field === 'netBillAmount' ? 150 : 130
//             }))}
//             pageSize={10}
//             rowsPerPageOptions={[5, 10, 20]}
//             disableSelectionOnClick
//             sx={{
//               border: 'none',
//               '& .MuiDataGrid-root': {
//                 border: 'none'
//               },
//               '& .MuiDataGrid-cell': {
//                 borderBottom: '1px solid #f0f0f0',
//                 fontSize: { xs: '0.75rem', sm: '0.875rem' },
//                 padding: { xs: '8px 12px', sm: '12px 16px' }
//               },
//               '& .MuiDataGrid-columnHeaders': {
//                 backgroundColor: '#f8f9fa',
//                 fontSize: { xs: '0.75rem', sm: '0.875rem' },
//                 fontWeight: 600,
//                 color: '#333',
//                 borderBottom: '2px solid #e0e0e0'
//               },
//               '& .MuiDataGrid-row': {
//                 '&:hover': {
//                   backgroundColor: '#f8f9fa'
//                 }
//               },
//               '& .MuiDataGrid-columnHeader': {
//                 padding: { xs: '8px 12px', sm: '12px 16px' }
//               },
//               '& .MuiDataGrid-virtualScroller': {
//                 overflowX: 'auto'
//               }
//             }}
//           />
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default BillingAnomaly;
// ===================================



// ======================================================================
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchBills } from '../store/actions/billActions';
// import { DataGrid } from '@mui/x-data-grid';
// import {
//   Typography,
//   Box,
//   Modal,
//   Button,
//   TextField,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Tabs,
//   Tab,
//   CircularProgress,
//   Paper,
//   useMediaQuery, useTheme
// } from '@mui/material';
// import DownloadIcon from '@mui/icons-material/Download';
// import * as XLSX from 'xlsx';
// import ConsumerButton from '../components/ConsumerButton';
// import BillDatePicker from '../components/BillDatePicker';
// import wardDataAtoI from '../data/warddataAtoI';
// import dayjs from 'dayjs';

// const BillingAnomaly = () => {
//   const dispatch = useDispatch();
//   const { bills, loading, error,pagination } = useSelector((state) => state.bills);
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const [tabValue, setTabValue] = useState(0);
//   const [wardName, setWardName] = useState('');
//   const [selectedMonthYear, setSelectedMonthYear] = useState('');
//    const [currentPage, setCurrentPage] = useState(1);
//     const [pageSize, setPageSize] = useState(50);
//     const [paginationModel, setPaginationModel] = useState({
//       page: 0,
//       pageSize: 10,
//     });
  
//   const user = useSelector((state) => state.auth.user);
//  const theme = useTheme();
// const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // ✅ xs & sm

//   // Function to normalize any date format to a comparable format
//   const normalizeDateForComparison = (dateString) => {
//     if (!dateString) return '';
    
//     try {
//       // Try to parse the date using dayjs
//       let date = dayjs(dateString);
      
//       // If direct parsing fails, try different formats
//       if (!date.isValid()) {
//         // Try MMM-YYYY format
//         date = dayjs(dateString, 'MMM-YYYY');
//       }
//       if (!date.isValid()) {
//         // Try MM-YYYY format
//         date = dayjs(dateString, 'MM-YYYY');
//       }
//       if (!date.isValid()) {
//         // Try YYYY-MM format
//         date = dayjs(dateString, 'YYYY-MM');
//       }
//       if (!date.isValid()) {
//         // Try other common formats
//         const formats = ['YYYY-MM-DD', 'DD-MM-YYYY', 'MM/DD/YYYY', 'DD/MM/YYYY'];
//         for (const format of formats) {
//           date = dayjs(dateString, format);
//           if (date.isValid()) break;
//         }
//       }
      
//       // If we have a valid date, return in MMM-YYYY format
//       if (date.isValid()) {
//         return date.format('MMM-YYYY').toUpperCase();
//       }
      
//       // If all parsing fails, return the original string in uppercase
//       return dateString.toString().toUpperCase();
//     } catch (error) {
//       console.warn('Date parsing error:', error);
//       return dateString.toString().toUpperCase();
//     }
//   };

//   // Function to check if two dates match (flexible format handling)
//   const datesMatch = (date1, date2) => {
//     if (!date1 || !date2) return false;
    
//     const normalized1 = normalizeDateForComparison(date1);
//     const normalized2 = normalizeDateForComparison(date2);
    
//     console.log(`Comparing: "${date1}" (${normalized1}) with "${date2}" (${normalized2})`);
    
//     return normalized1 === normalized2;
//   };

//   // Function to normalize date format for comparison
//   const normalizeDateFormat = (dateString) => {
//     if (!dateString) return '';
    
//     // Handle different possible date formats
//     try {
//       // If it's already in MMM-YYYY format, return as is (uppercase)
//       if (dateString.match(/^[A-Za-z]{3}-\d{4}$/)) {
//         return dateString.toUpperCase();
//       }
      
//       // If it's in other formats, convert using dayjs
//       const date = dayjs(dateString);
//       if (date.isValid()) {
//         return date.format('MMM-YYYY').toUpperCase();
//       }
      
//       return dateString.toUpperCase();
//     } catch (error) {
//       console.warn('Date format error:', error);
//       return dateString.toUpperCase();
//     }
//   };

//   // Function to fetch bills with pagination and filters
//   const fetchBillsWithFilters = (page = 1, limit = 10) => {
//     const filters = {};
    
//     if (selectedMonthYear) {
//       filters.selectedMonthYear = selectedMonthYear;
//     }
    
//     if (wardName && (
//       user?.role === 'Super Admin' ||
//       user?.role === 'Admin' ||
//       user?.role === 'Executive Engineer' ||
//       (user?.role === 'Junior Engineer' && user.ward === 'Head Office')
//     )) {
//       filters.wardName = wardName;
//     }

//     // Add anomaly type filter based on current tab
//     const anomalyTypes = ['zero_consumption', 'high_anomaly', 'low_anomaly'];
//     filters.anomalyType = anomalyTypes[tabValue];
    
//     dispatch(fetchBills(page, limit, filters));
//   };

//   useEffect(() => {
//     fetchBillsWithFilters(currentPage, pageSize);
//   }, [dispatch, currentPage, pageSize]);

//   // Refetch when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//     setPaginationModel({ ...paginationModel, page: 0 });
//     fetchBillsWithFilters(1, pageSize);
//   }, [selectedMonthYear, wardName, tabValue]);

//   // Handle pagination change
//   const handlePaginationModelChange = (newPaginationModel) => {
//     setPaginationModel(newPaginationModel);
//     const newPage = newPaginationModel.page + 1; // MUI DataGrid uses 0-based indexing
//     const newPageSize = newPaginationModel.pageSize;
    
//     if (newPage !== currentPage || newPageSize !== pageSize) {
//       setCurrentPage(newPage);
//       setPageSize(newPageSize);
//       fetchBillsWithFilters(newPage, newPageSize);
//     }
//   };

//   const handleDateChange = (value) => {
//     const formattedValue = value ? dayjs(value).format("MMM-YYYY").toUpperCase() : '';
//     console.log('Date changed to:', formattedValue);
//     setSelectedMonthYear(formattedValue);
//   };

//   const handleChangeWard = (event) => setWardName(event.target.value);

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   const sortedBills = [...bills].sort((a, b) => new Date(a.monthAndYear) - new Date(b.monthAndYear));
//   const billMap = new Map();
//   sortedBills.forEach((bill) => {
//     if (!billMap.has(bill.consumerNumber)) {
//       billMap.set(bill.consumerNumber, []);
//     }
//     billMap.get(bill.consumerNumber).push(bill);
//   });

//   const highBills = [];
//   const lowBills = [];
//   const zeroConsumptionBills = [];

//   billMap.forEach((billHistory) => {
//     billHistory.sort((a, b) => new Date(a.monthAndYear) - new Date(b.monthAndYear));
//     for (let i = 1; i < billHistory.length; i++) {
//       const previousBill = billHistory[i - 1];
//       const currentBill = billHistory[i];
//       const prevAmount = previousBill.netBillAmount;
//       const currAmount = currentBill.netBillAmount;
//       const highThreshold = prevAmount + prevAmount * 0.25;
//       const lowThreshold = prevAmount - prevAmount * 0.25;

//       if (currAmount >= highThreshold) {
//         highBills.push({ ...currentBill, prevNetBillAmount: prevAmount });
//       } else if (currAmount <= lowThreshold) {
//         lowBills.push({ ...currentBill, prevNetBillAmount: prevAmount });
//       }

//       if (currentBill.totalConsumption === 0) {
//         zeroConsumptionBills.push({ ...currentBill, prevNetBillAmount: prevAmount });
//       }
//     }
//   });

//   // Enhanced filtering function that works with any date format
//   const getFilteredRows = () => {
//     console.log('Current selectedMonthYear:', selectedMonthYear);
//     console.log('Current wardName:', wardName);
    
//     const rows = getRows();
//     console.log('Total rows before filtering:', rows.length);
    
//     const filteredRows = rows.filter((bill) => {
//       // Month/Year filter
//       const monthYearMatch = !selectedMonthYear || datesMatch(bill.monthAndYear, selectedMonthYear);
      
//       // Ward filter
//       const wardMatch = !wardName || bill.ward === wardName;
      
//       const shouldInclude = monthYearMatch && wardMatch;
      
//       if (selectedMonthYear && !monthYearMatch) {
//         console.log(`Filtered out: ${bill.consumerNumber} - ${bill.monthAndYear} (doesn't match ${selectedMonthYear})`);
//       }
      
//       return shouldInclude;
//     });
    
//     console.log('Filtered rows count:', filteredRows.length);
//     return filteredRows;
//   };

//   const downloadAllTypsOfReport = () => {
//     const rows = getFilteredRows();

//     // Prepare data rows for the sheet
//     const dataRows = rows.map((row, index) => ({
//       'ID': index + 1,
//       'Consumer No.': row.consumerNumber,
//       'Ward': row.ward,
//       'Meter Number': row.meterNumber,
//       'Total Consumption': row.totalConsumption,
//       'Meter Status': row.meterStatus,
//       'Bill Month': row.monthAndYear,
//       'Previous Bill Amount': row.prevNetBillAmount,
//       'Net Bill Amount': row.netBillAmount,
//     }));

//     // Insert the heading row at the top of the data array
//     const heading = [[getTabLabel(tabValue) + ' - REPORT']]; // heading text
//     const worksheet = XLSX.utils.aoa_to_sheet(heading);

//     // Add the data rows starting from the third row (so you leave one blank line below the heading)
//     XLSX.utils.sheet_add_json(worksheet, dataRows, { origin: 'A3' });

//     // Merge the heading cell across all columns
//     const numColumns = Object.keys(dataRows[0] || {}).length;
//     worksheet['!merges'] = [
//       {
//         s: { r: 0, c: 0 }, // start at row 0, col 0
//         e: { r: 0, c: numColumns - 1 } // end at row 0, last column
//       }
//     ];

//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Bills');
//     XLSX.writeFile(workbook, `${getTabLabel(tabValue)}_REPORT.xlsx`);
//   };

//   const getReportFileName = (tabIndex) => {
//     switch (tabIndex) {
//       case 0: return 'ZERO_CONSUMPTION_BILLS.xlsx';
//       case 1: return 'HIGH_ANOMALY_BILLS.xlsx';
//       case 2: return 'LOW_ANOMALY_BILLS.xlsx';
//       default: return 'Anomaly_Report.xlsx';
//     }
//   };
  
//   const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'consumerNumber', headerName: 'CONSUMER NUMBER', width: 140 },
//     { field: 'ward', headerName: 'WARD', width: 130 },
//     { field: 'meterNumber', headerName: 'METER NUMBER', width: 130 },
//     { field: 'totalConsumption', headerName: 'TOTAL CONSUMPTION', width: 130 },
//     { field: 'meterStatus', headerName: 'METER STATUS', width: 130 },
//     { field: 'monthAndYear', headerName: 'BILL MONTH', width: 130 },
//     { field: 'prevNetBillAmount', headerName: 'PREVIOUS BILL AMOUNT', width: 150 },
//     { field: 'netBillAmount', headerName: 'NET BILL AMOUNT', width: 150 },
//   ];

//   const getRows = () => {
//     switch (tabValue) {
//       case 0: return zeroConsumptionBills;
//       case 1: return highBills;
//       case 2: return lowBills;
//       default: return [];
//     }
//   };

//   const getTabLabel = (index) => {
//     switch (index) {
//       case 0: return 'ZERO CONSUMPTION BILLS';
//       case 1: return 'HIGH ANOMALY BILLS';
//       case 2: return 'LOW ANOMALY BILLS';
//       default: return '';
//     } 
//   };

//   const smallControlStyles = {
//     // border:'1px solid red',
//     height: '40px',
//     minHeight: '40px',
//     display:'flex',
    
//     width: {
//       xs: '85%',
//       sm:'85%',
//       md: '180px'
//     },
//     ml:{
//        xs:5,
//       sm:5,
//       md:0
//     },
//     '& .MuiInputBase-root': {
//       height: '40px',
//       fontSize: '0.875rem'
//     },
//     '& .MuiOutlinedInput-root': {
//       height: '40px',
//       fontSize: '0.875rem'
//     },
//     '& .MuiInputLabel-root': {
//       fontSize: '0.875rem'
//     }
//   };

 
//   return (
//     <Box sx={{ 
//       minHeight: '100vh', 
//       backgroundColor: '#f5f5f5',
//       marginLeft: { xs: 0, sm: isSidebarOpen ? '250px' : '100px' },
//       padding: { xs: '10px', sm: '15px', md: '20px' },
//       width: {
//         xs: '100%',
//         sm: isSidebarOpen ? 'calc(100% - 250px)' : 'calc(100% - 100px)'
//       }
//     }}>
//       {/* Tabs */}
//       <Paper elevation={0} 
//       sx={{ backgroundColor: '#fff',
//        borderRadius: '8px',
//         mb: 3,
//         mt:isSidebarOpen?0:5
        
//         }}>
//         <Tabs 
//           value={tabValue} 
//           onChange={(e, newValue) => setTabValue(newValue)}
//           variant="fullWidth"
//           orientation={isSmallScreen ? 'vertical' : 'horizontal'} // ✅ responsive orientation
//           sx={{
//             // border:'2px solid red',
//             display:'flex',
//               '& .MuiTab-root': {
//             fontSize: { xs: '0.75rem', sm: '0.875rem' },
//             fontWeight: 500,
//             py: 2,
//             textTransform: 'none',
//             position: 'relative',
//             '&.Mui-selected': { 
//               color: '#23CCEF', 
//               fontWeight: 600,
//               '&::after': {
//                 content: '""',
//                 position: 'absolute',
//                 bottom: 0,
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 width: 'fit-content',
//                 minWidth: '60%',
//                 height: '3px',
//                 backgroundColor: '#23CCEF',
//                 borderRadius: '2px'
//               }
//             }
//           },
//           '& .MuiTabs-indicator': { 
//             display: 'none' // Hide default indicator
//           }
//           }}
//         >
//           <Tab label={getTabLabel(0)} />
//           <Tab label={getTabLabel(1)} />
//           <Tab label={getTabLabel(2)} />
//         </Tabs>
//       </Paper>

//       {/* Filter Row (Download + Date + Ward) */}
//       <Box sx={{ 
//         // border:'1px solid red',

//         display: 'flex',
//         flexDirection: { xs: 'column', sm: 'row' },
//         gap: 2,
//         alignItems: { xs: 'stretch', sm: 'center' },
//         flexWrap: 'wrap',
//         mb: 3,
//       }}>
//         <Button 
//         // size="small"
//           variant="contained" 
//           startIcon={<DownloadIcon />} 
//           onClick={downloadAllTypsOfReport}
//           sx={{
//             ...smallControlStyles,
//             backgroundColor: '#23CCEF',
//             '&:hover': { backgroundColor: '#1AB3D1' },
//             borderRadius: '6px',
//             textTransform: 'none',
//             fontSize: '0.75rem',
//             px: 2,
//           }}
//         >
// REPORTS
//         </Button>

//         <Box sx={smallControlStyles}>
//           <BillDatePicker 
//             selectedMonthYear={selectedMonthYear} 
//             onChange={handleDateChange}
//             sx={{
//               '& .MuiTextField-root': {
//                 backgroundColor: '#fff',
//                 borderRadius: '6px',
//                 height: '40px',
//               }
//             }}
//           />
//         </Box>

//         {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
//           <FormControl variant="outlined" size="small" sx={smallControlStyles}>
//             <InputLabel id="ward-label">Search Ward</InputLabel>
//             <Select
//               labelId="ward-label"
//               value={wardName}
//               onChange={handleChangeWard}
//               label="Search Ward"
//               sx={{ backgroundColor: '#fff', borderRadius: '6px' }}
//             >
//               {wardDataAtoI.length > 0 ? (
//                 wardDataAtoI.map((ward, index) => (
//                   <MenuItem key={index} value={ward.ward}>{ward.ward}</MenuItem>
//                 ))
//               ) : (
//                 <MenuItem disabled>No Wards Available</MenuItem>
//               )}
//             </Select>
//           </FormControl>
//         )}
//       </Box>

//       {/* Data Table */}
//       <Paper elevation={2} sx={{ backgroundColor: '#fff', borderRadius: '8px' }}>
//         <Box sx={{ height: { xs: 400, sm: 500, md: 600 }, width: '100%' }}>
//           <DataGrid
//             rows={getFilteredRows().map((bill, index) => ({ 
//               id: index + 1, 
//               ...bill 
//             }))}
           
//                columns={columns}
//             pagination={true}
//             paginationMode="client"
//             paginationModel={paginationModel}
//             onPaginationModelChange={setPaginationModel}
//             pageSizeOptions={[10, 25, 50, 100]}
//             // rowCount is automatically handled in client mode
//             loading={loading}
//             disableSelectionOnClick

//             sx={{
//               border: 'none',
//               '& .MuiDataGrid-cell': {
//                 fontSize: { xs: '0.75rem', sm: '0.875rem' }
//               },
//               '& .MuiDataGrid-columnHeaders': {
//                 backgroundColor: '#f8f9fa',
//                 fontWeight: 600,
//                 color: '#333'
//               },
//               '& .MuiDataGrid-row:hover': {
//                 backgroundColor: '#f8f9fa'
//               }
//             }}
//           />
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default BillingAnomaly;



// ================================
// ya madhe server response barobar yeto pan filter response front end madhe disat nahi

// -----------------------------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchBills } from '../store/actions/billActions';
// import { DataGrid } from '@mui/x-data-grid';
// import {
//   Typography,
//   Box,
//   Modal,
//   Button,
//   TextField,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Tabs,
//   Tab,
//   CircularProgress,
//   Paper,
//   useMediaQuery, 
//   useTheme
// } from '@mui/material';
// import DownloadIcon from '@mui/icons-material/Download';
// import * as XLSX from 'xlsx';
// import ConsumerButton from '../components/ConsumerButton';
// import BillDatePicker from '../components/BillDatePicker';
// import wardDataAtoI from '../data/warddataAtoI';
// import dayjs from 'dayjs';

// const BillingAnomaly = () => {
//   const dispatch = useDispatch();
//   const { bills, loading, error, pagination } = useSelector((state) => state.bills);
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const [tabValue, setTabValue] = useState(0);
//   const [wardName, setWardName] = useState('');
//   const [selectedMonthYear, setSelectedMonthYear] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(50);
//   const [paginationModel, setPaginationModel] = useState({
//     page: 0,
//     pageSize: 10,
//   });

//   const user = useSelector((state) => state.auth.user);
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

//   // Function to fetch bills with server-side pagination and filters
//   const fetchBillsWithFilters = (page = 1, limit = 10) => {
//     const filters = {};

//     if (selectedMonthYear) {
//       filters.selectedMonthYear = selectedMonthYear;
//     }

//     if (wardName && (
//       user?.role === 'Super Admin' ||
//       user?.role === 'Admin' ||
//       user?.role === 'Executive Engineer' ||
//       (user?.role === 'Junior Engineer' && user.ward === 'Head Office')
//     )) {
//       filters.wardName = wardName;
//     }

//     // For Junior Engineers not at Head Office, restrict to their own ward only
//     if (user?.role === 'Junior Engineer' && user?.ward !== 'Head Office') {
//       filters.wardName = user.ward;
//     }

//     // Remove server-side anomaly filtering - we'll do this client-side
//     dispatch(fetchBills(page, limit, filters));
//   };

//   useEffect(() => {
//     fetchBillsWithFilters(currentPage, pageSize);
//   }, [dispatch, currentPage, pageSize]);

//   // Refetch when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//     setPaginationModel({ ...paginationModel, page: 0 });
//     fetchBillsWithFilters(1, pageSize);
//   }, [selectedMonthYear, wardName, tabValue]);

//   // Handle pagination change
//   const handlePaginationModelChange = (newPaginationModel) => {
//     setPaginationModel(newPaginationModel);
//     const newPage = newPaginationModel.page + 1; // MUI DataGrid uses 0-based indexing
//     const newPageSize = newPaginationModel.pageSize;

//     if (newPage !== currentPage || newPageSize !== pageSize) {
//       setCurrentPage(newPage);
//       setPageSize(newPageSize);
//       fetchBillsWithFilters(newPage, newPageSize);
//     }
//   };

//   const handleDateChange = (value) => {
//     const formattedValue = dayjs(value).format("MMM-YYYY").toUpperCase();
//     setSelectedMonthYear(formattedValue);
//   };

//   const handleChangeWard = (event) => setWardName(event.target.value);

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   // Client-side anomaly calculation logic for proper display and filtering
//   const sortedBills = [...bills].sort((a, b) => new Date(a.monthAndYear) - new Date(b.monthAndYear));
//   const billMap = new Map();
//   sortedBills.forEach((bill) => {
//     if (!billMap.has(bill.consumerNumber)) {
//       billMap.set(bill.consumerNumber, []);
//     }
//     billMap.get(bill.consumerNumber).push(bill);
//   });

//   const highBills = [];
//   const lowBills = [];
//   const zeroConsumptionBills = [];

//   billMap.forEach((billHistory) => {
//     billHistory.sort((a, b) => new Date(a.monthAndYear) - new Date(b.monthAndYear));
//     for (let i = 1; i < billHistory.length; i++) {
//       const previousBill = billHistory[i - 1];
//       const currentBill = billHistory[i];
//       const prevAmount = previousBill.netBillAmount;
//       const currAmount = currentBill.netBillAmount;
//       const highThreshold = prevAmount + prevAmount * 0.25;
//       const lowThreshold = prevAmount - prevAmount * 0.25;

//       if (currAmount >= highThreshold) {
//         highBills.push({ ...currentBill, prevNetBillAmount: prevAmount });
//       } else if (currAmount <= lowThreshold) {
//         lowBills.push({ ...currentBill, prevNetBillAmount: prevAmount });
//       }

//       if (currentBill.totalConsumption === 0) {
//         zeroConsumptionBills.push({ ...currentBill, prevNetBillAmount: prevAmount });
//       }
//     }
//   });

//   const downloadAllTypsOfReport = () => {
//     const rows = getRows().filter(
//       bill =>
//         (!selectedMonthYear || bill.monthAndYear === selectedMonthYear) &&
//         (!wardName || bill.ward === wardName)
//     );

//     // Prepare data rows for the sheet
//     const dataRows = rows.map((row, index) => ({
//       'ID': index + 1,
//       'Consumer No.': row.consumerNumber,
//       'Ward': row.ward,
//       'Meter Number': row.meterNumber,
//       'Total Consumption': row.totalConsumption,
//       'Meter Status': row.meterStatus,
//       'Bill Month': row.monthAndYear,
//       'Previous Bill Amount': row.prevNetBillAmount,
//       'Net Bill Amount': row.netBillAmount,
//     }));

//     // Insert the heading row at the top of the data array
//     const heading = [[getTabLabel(tabValue) + ' - REPORT']];
//     const worksheet = XLSX.utils.aoa_to_sheet(heading);

//     // Add the data rows starting from the third row
//     XLSX.utils.sheet_add_json(worksheet, dataRows, { origin: 'A3' });

//     // Merge the heading cell across all columns
//     const numColumns = Object.keys(dataRows[0] || {}).length;
//     worksheet['!merges'] = [
//       {
//         s: { r: 0, c: 0 }, // start at row 0, col 0
//         e: { r: 0, c: numColumns - 1 } // end at row 0, last column
//       }
//     ];

//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Bills');
//     XLSX.writeFile(workbook, `${getTabLabel(tabValue)}_REPORT.xlsx`);
//   };

//   const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'consumerNumber', headerName: 'CONSUMER NUMBER', width: 140 },
//     { field: 'ward', headerName: 'WARD', width: 130 },
//     { field: 'meterNumber', headerName: 'METER NUMBER', width: 130 },
//     { field: 'totalConsumption', headerName: 'TOTAL CONSUMPTION', width: 130 },
//     { field: 'meterStatus', headerName: 'METER STATUS', width: 130 },
//     { field: 'monthAndYear', headerName: 'BILL MONTH', width: 130 },
//     { field: 'prevNetBillAmount', headerName: 'PREVIOUS BILL AMOUNT', width: 150 },
//     { field: 'netBillAmount', headerName: 'NET BILL AMOUNT', width: 150 },
//   ];

//   const getRows = () => {
//     switch (tabValue) {
//       case 0: return zeroConsumptionBills;
//       case 1: return highBills;
//       case 2: return lowBills;
//       default: return [];
//     }
//   };

//   const getTabLabel = (index) => {
//     switch (index) {
//       case 0: return 'ZERO CONSUMPTION BILLS';
//       case 1: return 'HIGH ANOMALY BILLS';
//       case 2: return 'LOW ANOMALY BILLS';
//       default: return '';
//     }
//   };

//   const smallControlStyles = {
//     height: '40px',
//     minHeight: '40px',
//     display: 'flex',
//     width: {
//       xs: '85%',
//       sm: '85%',
//       md: '180px'
//     },
//     ml: {
//       xs: 5,
//       sm: 5,
//       md: 0
//     },
//     '& .MuiInputBase-root': {
//       height: '40px',
//       fontSize: '0.875rem'
//     },
//     '& .MuiOutlinedInput-root': {
//       height: '40px',
//       fontSize: '0.875rem'
//     },
//     '& .MuiInputLabel-root': {
//       fontSize: '0.875rem'
//     }
//   };

//   return (
//     <Box sx={{
//       minHeight: '100vh',
//       backgroundColor: '#f5f5f5',
//       marginLeft: { xs: 0, sm: isSidebarOpen ? '250px' : '100px' },
//       padding: { xs: '10px', sm: '15px', md: '20px' },
//       width: {
//         xs: '100%',
//         sm: isSidebarOpen ? 'calc(100% - 250px)' : 'calc(100% - 100px)'
//       }
//     }}>
//       {/* Tabs */}
//       <Paper elevation={0}
//         sx={{
//           backgroundColor: '#fff',
//           borderRadius: '8px',
//           mb: 3,
//           mt: isSidebarOpen ? 0 : 5
//         }}>
//         <Tabs
//           value={tabValue}
//           onChange={(e, newValue) => setTabValue(newValue)}
//           variant="fullWidth"
//           orientation={isSmallScreen ? 'vertical' : 'horizontal'}
//           sx={{
//             display: 'flex',
//             '& .MuiTab-root': {
//               fontSize: { xs: '0.75rem', sm: '0.875rem' },
//               fontWeight: 500,
//               py: 2,
//               textTransform: 'none',
//               position: 'relative',
//               '&.Mui-selected': {
//                 color: '#23CCEF',
//                 fontWeight: 600,
//                 '&::after': {
//                   content: '""',
//                   position: 'absolute',
//                   bottom: 0,
//                   left: '50%',
//                   transform: 'translateX(-50%)',
//                   width: 'fit-content',
//                   minWidth: '60%',
//                   height: '3px',
//                   backgroundColor: '#23CCEF',
//                   borderRadius: '2px'
//                 }
//               }
//             },
//             '& .MuiTabs-indicator': {
//               display: 'none' // Hide default indicator
//             }
//           }}
//         >
//           <Tab label={getTabLabel(0)} />
//           <Tab label={getTabLabel(1)} />
//           <Tab label={getTabLabel(2)} />
//         </Tabs>
//       </Paper>

//       {/* Filter Row (Download + Date + Ward) */}
//       <Box sx={{
//         display: 'flex',
//         flexDirection: { xs: 'column', sm: 'row' },
//         gap: 2,
//         alignItems: { xs: 'stretch', sm: 'center' },
//         flexWrap: 'wrap',
//         mb: 3,
//       }}>
//         <Button
//           variant="contained"
//           startIcon={<DownloadIcon />}
//           onClick={downloadAllTypsOfReport}
//           sx={{
//             ...smallControlStyles,
//             backgroundColor: '#23CCEF',
//             '&:hover': { backgroundColor: '#1AB3D1' },
//             borderRadius: '6px',
//             textTransform: 'none',
//             fontSize: '0.75rem',
//             px: 2,
//           }}
//         >
//           REPORTS
//         </Button>

//         <Box sx={smallControlStyles}>
//           <BillDatePicker
//             selectedMonthYear={selectedMonthYear}
//             onChange={handleDateChange}
//             sx={{
//               '& .MuiTextField-root': {
//                 backgroundColor: '#fff',
//                 borderRadius: '6px',
//                 height: '40px',
//               }
//             }}
//           />
//         </Box>

//         {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
//           <FormControl variant="outlined" size="small" sx={smallControlStyles}>
//             <InputLabel id="ward-label">Search Ward</InputLabel>
//             <Select
//               labelId="ward-label"
//               value={wardName}
//               onChange={handleChangeWard}
//               label="Search Ward"
//               sx={{ backgroundColor: '#fff', borderRadius: '6px' }}
//             >
//               {wardDataAtoI.length > 0 ? (
//                 wardDataAtoI.map((ward, index) => (
//                   <MenuItem key={index} value={ward.ward}>{ward.ward}</MenuItem>
//                 ))
//               ) : (
//                 <MenuItem disabled>No Wards Available</MenuItem>
//               )}
//             </Select>
//           </FormControl>
//         )}
//       </Box>

//       {/* Data Table */}
//       <Paper elevation={2} sx={{ backgroundColor: '#fff', borderRadius: '8px' }}>
//         <Box sx={{ height: { xs: 400, sm: 500, md: 600 }, width: '100%' }}>
//           <DataGrid
//             rows={getRows()
//               .filter((bill) =>
//                 (!selectedMonthYear || bill.monthAndYear === selectedMonthYear) &&
//                 (!wardName || bill.ward === wardName)
//               )
//               .map((bill, index) => ({ id: paginationModel.page * paginationModel.pageSize + index + 1, ...bill }))}

//             columns={columns}
//             pagination
//             paginationMode="server"
//             paginationModel={paginationModel}
//             onPaginationModelChange={handlePaginationModelChange}
//             pageSizeOptions={[10, 25, 50, 100]}
//             rowCount={pagination?.totalBills || 0}
//             loading={loading}
//             disableSelectionOnClick

//             sx={{
//               border: 'none',
//               '& .MuiDataGrid-cell': {
//                 fontSize: { xs: '0.75rem', sm: '0.875rem' }
//               },
//               '& .MuiDataGrid-columnHeaders': {
//                 backgroundColor: '#f8f9fa',
//                 fontWeight: 600,
//                 color: '#333'
//               },
//               '& .MuiDataGrid-row:hover': {
//                 backgroundColor: '#f8f9fa'
//               }
//             }}
//           />
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default BillingAnomaly;


// ========================================================


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
  const { bills, loading, error,pagination } = useSelector((state) => state.bills);
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
const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // ✅ xs & sm
  // useEffect(() => {
  //   dispatch(fetchBills());
  // }, [dispatch]);



  // Function to fetch bills with pagination and filters
  // const fetchBillsWithFilters = (page = 1, limit = 10) => {
  //   const filters = {};
    
  //   if (selectedMonthYear) {
  //     filters.monthAndYear = selectedMonthYear;
  //   }
    
  //   if (wardName && (
  //     user?.role === 'Super Admin' ||
  //     user?.role === 'Admin' ||
  //     user?.role === 'Executive Engineer' ||
  //     (user?.role === 'Junior Engineer' && user.ward === 'Head Office')
  //   )) {
  //     filters.wardName = wardName;
  //   }

  //   // Add anomaly type filter based on current tab
  //   const anomalyTypes = ['zero_consumption', 'high_anomaly', 'low_anomaly'];
  //   filters.anomalyType = anomalyTypes[tabValue];
    
  //   dispatch(fetchBills(page, limit, filters));
  // };


  const fetchBillsWithFilters = (page = 1, limit = 10) => {
    const filters = {};
    
    if (selectedMonthYear) {
      filters.monthAndYear = selectedMonthYear;
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

  // const downloadAllTypsOfReport = () => {
  //   const rows = getRows().filter(
  //     bill =>
  //       (!selectedMonthYear || bill.monthAndYear === selectedMonthYear) &&
  //       (!wardName || bill.ward === wardName)
  //   );

  //   const worksheet = XLSX.utils.json_to_sheet(
  //     rows.map((row, index) => ({
  //       'ID': index + 1,
  //       'Consumer No.': row.consumerNumber,
  //       'Ward': row.ward,
  //       'Meter Number': row.meterNumber,
  //       'Total Consumption': row.totalConsumption,
  //       'Meter Status': row.meterStatus,
  //       'billMonth': row.monthAndYear,
  //       'previousBillAmount': row.prevNetBillAmount,
  //       'Net Bill Amount': row.netBillAmount,
  //     }))
  //   );

  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Bills');
  //   XLSX.writeFile(workbook, 'Anomaly_Report.xlsx');
  // };

  // ---------------------------------------------------------

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

  // Insert the heading row at the top of the data array
  const heading = [[getTabLabel(tabValue) + ' - REPORT']]; // heading text
  const worksheet = XLSX.utils.aoa_to_sheet(heading);

  // Add the data rows starting from the third row (so you leave one blank line below the heading)
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

  
  
//   const downloadAllTypsOfReport = () => {
//   const rows = getRows().filter(
//     bill =>
//       (!selectedMonthYear || bill.monthAndYear === selectedMonthYear) &&
//       (!wardName || bill.ward === wardName)
//   );

//   const worksheet = XLSX.utils.json_to_sheet(
//     rows.map((row, index) => ({
//       'ID': index + 1,
//       'Consumer No.': row.consumerNumber,
//       'Ward': row.ward,
//       'Meter Number': row.meterNumber,
//       'Total Consumption': row.totalConsumption,
//       'Meter Status': row.meterStatus,
//       'billMonth': row.monthAndYear,
//       'previousBillAmount': row.prevNetBillAmount,
//       'Net Bill Amount': row.netBillAmount,
//     }))
//   );

//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, 'Bills');

//   const reportName = getReportFileName(tabValue); // Dynamic file name
//   XLSX.writeFile(workbook, reportName);
// };





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
    // border:'1px solid red',
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
            // '& .MuiTab-root': {
            //   fontSize: { xs: '0.75rem', sm: '0.875rem' },
            //   fontWeight: 500,
            //   py: 2,
            //   textTransform: 'none',
            //   '&.Mui-selected': { color: '#23CCEF', fontWeight: 600 }
            // },
            // '& .MuiTabs-indicator': { backgroundColor: '#23CCEF', height: 3 }
            // border:'2px solid red',
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

      {/* Filter Row (Download + Date + Ward) */}
      <Box sx={{ 
        // border:'1px solid red',

        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        alignItems: { xs: 'stretch', sm: 'center' },
        flexWrap: 'wrap',
        mb: 3,
      }}>
        <Button 
        // size="small"
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
            // width:{
            //   xs:'95%',
            //   sm:'95%',
            //   md:'100%'
            // }
          }}
        >
REPORT
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
