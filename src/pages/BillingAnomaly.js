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
//                 sx={{
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

    const worksheet = XLSX.utils.json_to_sheet(
      rows.map((row, index) => ({
        'ID': index + 1,
        'Consumer No.': row.consumerNumber,
        'Ward': row.ward,
        'Meter Number': row.meterNumber,
        'Total Consumption': row.totalConsumption,
        'Meter Status': row.meterStatus,
        'billMonth': row.monthAndYear,
        'previousBillAmount': row.prevNetBillAmount,
        'Net Bill Amount': row.netBillAmount,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Bills');
    XLSX.writeFile(workbook, 'ConsumerBills.xlsx');
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
    width: {
      xs: '100%',
      sm: '180px'
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
      <Paper elevation={0} sx={{ backgroundColor: '#fff', borderRadius: '8px', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={(e, newValue) => setTabValue(newValue)}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              fontWeight: 500,
              py: 2,
              textTransform: 'none',
              '&.Mui-selected': { color: '#2196f3', fontWeight: 600 }
            },
            '& .MuiTabs-indicator': { backgroundColor: '#2196f3', height: 3 }
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
        mb: 3
      }}>
        <Button 
          variant="contained" 
          startIcon={<DownloadIcon />} 
          onClick={downloadAllTypsOfReport}
          sx={{
            ...smallControlStyles,
            backgroundColor: '#2196f3',
            '&:hover': { backgroundColor: '#1976d2' },
            borderRadius: '6px',
            textTransform: 'none',
            fontSize: '0.75rem',
            px: 2
          }}
        >
          DOWNLOAD REPORTS
        </Button>

        <Box sx={smallControlStyles}>
          <BillDatePicker 
            selectedMonthYear={selectedMonthYear} 
            onChange={handleDateChange}
            sx={{
              '& .MuiTextField-root': {
                backgroundColor: '#fff',
                borderRadius: '6px',
                height: '40px'
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
