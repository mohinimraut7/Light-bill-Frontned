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
// ---------------------------------------------------------

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
  Checkbox,
  OutlinedInput,
  Tabs,
  Tab,
  CircularProgress
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

  // Sort bills by monthAndYear
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

  // Check anomaly across all months per consumer
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
      case 0:
        return zeroConsumptionBills;
      case 1:
        return highBills;
      case 2:
        return lowBills;
      default:
        return [];
    }
  };

  return (
    <Box sx={{ width: '90%', marginLeft: isSidebarOpen ? '250px' : '100px', paddingTop: isSidebarOpen ? '20px' : '50px' }}>
      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
        <Tab label="Zero Consumption Bills" />
        <Tab label="High Anomaly Bills" />
        <Tab label="Low Anomaly Bills" />
      </Tabs>

      <Box sx={{ display: 'flex', mt: 3 }}>
        <Box sx={{ mt: 1 }}>
          <Button sx={{ width: '100%' }} onClick={downloadAllTypsOfReport} startIcon={<DownloadIcon />}>
            Download Reports
          </Button>
        </Box>

        {(user?.role === 'Super Admin' ||
          user?.role === 'Admin' ||
          user?.role === 'Executive Engineer' ||
          user?.role === 'Junior Engineer' ||
          user?.role === 'Lipik' ||
          user?.role === 'Accountant' ||
          user?.role === 'Assistant Municipal Commissioner' ||
          user?.role === 'Dy.Municipal Commissioner') && (
          <Box
            sx={{
              width: {
                lg: '20%',
                xl: '20%',
                md: '30%',
                sm: '100%',
                xs: '100%',
              },
              mb: {
                sm: 1,
                xs: 1,
              },
            }}
          >
            <BillDatePicker selectedMonthYear={selectedMonthYear} onChange={handleDateChange} />
          </Box>
        )}

        {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role==='Junior Engineer'&& user?.ward==='Head Office')) && (
          <FormControl
            fullWidth
            size="small"
            variant="outlined"
            sx={{
              width: {
                xl: '30%',
                lg: '30%',
                md: '30%',
                sm: '40%',
                xs: '100%',
              },
              ml: {
                xl: 1,
                lg: 1,
                md: 1,
                sm: 1,
              },
            }}
          >
            <InputLabel id="ward-label">Search Ward</InputLabel>
            <Select labelId="ward-label" id="ward" name="ward" value={wardName} onChange={handleChangeWard} label="Search Ward">
              {wardDataAtoI.length > 0 ? (
                wardDataAtoI.map((ward, index) => (
                  <MenuItem key={index} value={ward.ward}>
                    {ward.ward}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No Wards Available</MenuItem>
              )}
            </Select>
          </FormControl>
        )}
      </Box>

      <Box sx={{ marginTop: '20px', border: '1px solid #F7F7F8', padding: '20px' }}>
        <DataGrid
          rows={getRows()
            .filter((bill) => (!selectedMonthYear || bill.monthAndYear === selectedMonthYear) && (!wardName || bill.ward === wardName))
            .map((bill, index) => ({ id: index + 1, ...bill }))}
          columns={columns}
          pageSize={5}
        />
      </Box>
    </Box>
  );
};

export default BillingAnomaly;
