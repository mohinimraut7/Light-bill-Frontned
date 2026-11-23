// import React, { useEffect, useState, useRef, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchOverdueBills, updateBillStatusAction, deleteBill, editBill } from '../store/actions/billActions';
// import { DataGrid } from '@mui/x-data-grid';
// import { Typography, Box, Button, Modal, Checkbox, CircularProgress } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { styled } from '@mui/material/styles';
// import dayjs from "dayjs";
// import BillDatePicker from '../components/BillDatePicker';
// import OverduebillDatePicker from '../components/OverduebillDatePicker';



// const OverdueBills = () => {
//   const dispatch = useDispatch();
//   const { bills, loading, error, pagination } = useSelector((state) => state.bills);
//   const isSidebarOpen = useSelector((state) => state.sidebar?.isOpen || false);
//   const user = useSelector(state => state.auth?.user);
  
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [selectedMonthYear, setSelectedMonthYear] = useState("");
//   const [paginationModel, setPaginationModel] = useState({
//     page: 0,
//     pageSize: 10,
//   });

//   useEffect(() => {
//     const page = paginationModel.page + 1; // Convert to 1-based indexing for backend
//     const limit = paginationModel.pageSize;
//     dispatch(fetchOverdueBills(page, limit, selectedMonthYear));
//   }, [dispatch, paginationModel, selectedMonthYear]);

//   const handlePaginationModelChange = (newModel) => {
//     setPaginationModel(newModel);
//   };

//   const formatDate = (dateString) => {
//     const options = { day: '2-digit', month: 'long', year: 'numeric' };
//     return new Date(dateString).toLocaleDateString('en-US', options);
//   };

//   const getFilteredBills = () => {
//     console.log("bills.paymentStatus", bills);
//     if (!bills) return [];
    
//     if (user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) {
//       return bills;
//     } else if (user?.role?.startsWith('Junior Engineer')) {
//       const specificWard = user?.ward;
//       return bills.filter((bill) => bill.ward === specificWard);
//     }
//     return [];
//   };

//   const filteredBills = getFilteredBills();

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return <Typography color="error">Error: {error}</Typography>;
//   }

//   // Fixed filtering logic - removed date comparison since backend already returns overdue bills
//   const rows = filteredBills
//     .filter(bill => 
//       // If no month is selected, include all bills
//       // If a month is selected, include only matching bills
//       !selectedMonthYear || bill.monthAndYear === selectedMonthYear
//     )
//     .map((bill, index) => ({
//       id: paginationModel.page * paginationModel.pageSize + index + 1,
//       _id: bill._id,
//       consumerNumber: bill.consumerNumber,
//       email: bill?.email || '-',
//       username: bill.username || '-',
//       contactNumber: bill?.contactNumber,
//       monthAndYear: bill.monthAndYear,
//       meterNumber: bill?.meterNumber || '-',
//       totalConsumption: bill.totalConsumption,
//       meterStatus: bill.meterStatus,
//       previousReadingDate: formatDate(bill.previousReadingDate),
//       previousReading: bill.previousReading,
//       currentReadingDate: formatDate(bill.currentReadingDate),
//       currentReading: bill.currentReading,
//       billDate: formatDate(bill.billDate),
//       currentBillAmount: bill.currentBillAmount,
//       totalArrears: bill.totalArrears,
//       netBillAmount: bill.netBillAmount,
//       roundedBillAmount: bill.roundedBillAmount,
//       ward: bill?.ward,
//       paymentStatus: bill.paymentStatus
//         ? bill.paymentStatus.charAt(0).toUpperCase() + bill.paymentStatus.slice(1)
//         : '-',
//       approvedStatus: bill.approvedStatus || '-',
//       lastReceiptAmount: bill.lastReceiptAmount ? bill.lastReceiptAmount : 0,
//       overDueAmount: bill.overDueAmount,
//       pendingAmount: bill.lastReceiptAmount ? bill.roundedBillAmount - bill.lastReceiptAmount : bill.roundedBillAmount,
//       promptPaymentDate: formatDate(bill.promptPaymentDate),
//       promptPaymentAmount: bill.promptPaymentAmount,
//       dueDate: formatDate(bill.dueDate),
//       netBillAmountWithDPC: bill.netBillAmountWithDPC,
//       forwardForGeneration: bill.forwardForGeneration,
//     }));

//   const handleSelectAll = (event) => {
//     if (event.target.checked) {
//       setSelectedItems(rows);
//     } else {
//       setSelectedItems([]);
//     }
//   };

//   const handleCheckboxChange = (event, row) => {
//     if (event.target.checked) {
//       setSelectedItems((prev) => [...prev, row]);
//     } else {
//       setSelectedItems((prev) => prev.filter((item) => item.id !== row.id));
//     }
//   };

//   const handleDeleteBill = (billId) => {
//     dispatch(deleteBill(billId));
//   };

//   const handleEditBill = (bill) => {
//     // Handle edit logic here
//     console.log('Edit bill:', bill);
//   };

//   const handleDateChange = (value) => {
//     const formattedValue = dayjs(value).format("MMM-YYYY").toUpperCase();
//     setSelectedMonthYear(formattedValue);
//   };

//   const columns = [
//     {
//       field: 'checkbox',
//       headerName: '',
//       width: 50,
//       headerClassName: 'data-grid-checkbox-header',
//       renderHeader: () => {
//         const allRowsChecked = rows.every(row =>
//           selectedItems.some(item => item.id === row.id)
//         );
//         const someRowsChecked = rows.some(row =>
//           selectedItems.some(item => item.id === row.id)
//         );
//         return (
//           <Checkbox
//             checked={allRowsChecked}
//             indeterminate={someRowsChecked && !allRowsChecked}
//             onChange={handleSelectAll}
//           />
//         );
//       },
//       renderCell: (params) => (
//         <Checkbox
//           checked={selectedItems.some((item) => item.id === params.row.id)}
//           onChange={(event) => handleCheckboxChange(event, params.row)}
//           disabled={params.row.forwardForGeneration === 'Yes'}
//         />
//       ),
//     },
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'consumerNumber', headerName: 'CONSUMER NO.', width: 130 },
//     { field: 'contactNumber', headerName: 'CONTACT NUMBER', width: 130 },
//     { field: 'monthAndYear', headerName: 'BILL MONTH', width: 130 },
//     { field: 'ward', headerName: 'WARD', width: 130 },
//     { field: 'meterNumber', headerName: 'METER NUMBER', width: 130 },
//     { field: 'totalConsumption', headerName: 'TOTAL CONSUMPTION', width: 130 },
//     { field: 'meterStatus', headerName: 'METER STATUS', width: 130 },
//     { field: 'previousReadingDate', headerName: 'PREVIOUS READING DATE', width: 180 },
//     { field: 'previousReading', headerName: 'PREVIOUS READING', width: 130 },
//     { field: 'currentReadingDate', headerName: 'CURRENT READING DATE', width: 180 },
//     { field: 'currentReading', headerName: 'CURRENT READING', width: 130 },
//     { field: 'billDate', headerName: 'BILL DATE', width: 130 },
//     { field: 'netBillAmount', headerName: 'NET BILL AMOUNT', width: 130 },
//     { field: 'promptPaymentDate', headerName: 'PROMPT PAYMENT DATE', width: 180 },
//     { field: 'promptPaymentAmount', headerName: 'PROMPT PAYMENT AMOUNT', width: 180 },
//     { field: 'dueDate', headerName: 'DUE DATE', width: 130 },
//     { field: 'netBillAmountWithDPC', headerName: 'NET BILL AMOUNT WITH DPC', width: 200 },
//     { field: 'paymentStatus', headerName: 'PAYMENT STATUS', width: 130 },
//     { field: 'lastReceiptAmount', headerName: 'LAST RECEIPT AMOUNT', width: 180 },
//     { field: 'approvedStatus', headerName: 'APPROVED STATUS', width: 130 },
//   ];

//   const getPadding = () => {
//     const width = window.innerWidth;
//     if (width <= 480) return '80px 20px';
//     else if (width <= 600) return '80px 10px';
//     else if (width <= 900) return '60px 10px';
//     else return '30px 10px';
//   };

//   const gridStyle = {
//     height: 'auto',
//     width: isSidebarOpen ? '80%' : '90%',
//     marginLeft: isSidebarOpen ? '19%' : '7%',
//     transition: 'margin-left 0.3s',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: '30px 0px',
//     paddingLeft: '10px',
//   };

//   const innerDivStyle = {
//     border: '1px solid #F7F7F8',
//     width: '99%',
//     padding: getPadding(),
//   };

//   const rowColors = ['#F7F9FB', 'white'];
//   const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
//     '& .MuiDataGrid-cell': {
//       padding: theme.spacing(1),
//     },
//     '& .MuiDataGrid-row': {
//       '&:nth-of-type(odd)': {
//         backgroundColor: rowColors[0],
//       },
//       '&:nth-of-type(even)': {
//         backgroundColor: rowColors[1],
//       },
//     },
//   }));

//   return (
//     <div style={gridStyle}>
//       <Box sx={innerDivStyle}>
//         <Box sx={{ 
//           width: '100%', 
//           display: 'flex', 
//           justifyContent: 'space-between', 
//           mb: 2,
//           flexDirection: {
//             lg: 'row',
//             md: 'row',
//             sm: 'column',
//             xs: 'column'
//           } 
//         }}>
//           <Typography sx={{ 
//             paddingLeft: {
//               xs: 1,
//               sm: '5px',
//               md: '10px',
//               lg: '20px'
//             },
//             color: '#0d2136',
//             fontSize: {
//               sm: '15px',
//               xs: '15px',
//               md: '15px',
//               lg: '20px'
//             },
//           }} className="title-2">
//             Users with Overdue Bills
//           </Typography>
//         </Box>

//         <Box sx={{width:{lg:'20%',xl:'20%',md:'80%',sm:'80%',xs:'100%'},mb:2}}>
//           {/* <BillDatePicker selectedMonthYear={selectedMonthYear} onChange={handleDateChange} /> */}
//           <OverduebillDatePicker selectedMonthYear={selectedMonthYear} onChange={handleDateChange} />

          
//         </Box>

//         <StyledDataGrid 
//           rows={rows}
//           columns={columns}
//           pageSizeOptions={[5, 10, 15, 25, 35, 45, 55]}
//           sx={{ paddingRight: 0.5, paddingLeft: 0.5 }}
//           paginationMode="server"
//           rowCount={pagination?.totalBills || 0}
//           paginationModel={paginationModel}
//           onPaginationModelChange={handlePaginationModelChange}
//           loading={loading}
//           autoHeight={false}
//           disableVirtualization={false}
//           rowHeight={52}
//           getRowId={(row) => row.id}
//         />
//       </Box>
//     </div>
//   );
// };

// export default OverdueBills;




import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOverdueBills, updateBillStatusAction, deleteBill, editBill } from '../store/actions/billActions';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box, Button, Modal, Checkbox, CircularProgress } from '@mui/material';
// UI-only imports (redesign) — no logic
import { Paper, Chip, Breadcrumbs } from '@mui/material';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from '@mui/material/styles';
import dayjs from "dayjs";
import BillDatePicker from '../components/BillDatePicker';
import OverduebillDatePicker from '../components/OverduebillDatePicker';

/* ============================================================ */
/* UI ONLY — theme colours (Dashboard palette). No logic here.   */
/* ============================================================ */
const T = {
  primary: '#4F72F5',
  primary2: '#668AFB',
  primarySurface: '#EEF4FF',
  primaryBorder: '#D9E5FF',
  orange: '#F28C00',
  orangeSurface: '#FFF5E8',
  red: '#F04444',
  redDark: '#C92A2A',
  redSurface: '#FFF0F0',
  green: '#22B568',
  greenDark: '#178A4E',
  greenSurface: '#EAF8F0',
  bg: '#F7F9FC',
  card: '#FFFFFF',
  text: '#172033',
  text2: '#71809A',
  border: '#E5EAF2',
  font: "'Montserrat', 'Noto Sans Devanagari', sans-serif",
};

// UI-only: maps an existing cell value to a CSS class (value itself is never changed)
const uiStatusClass = (field, value) => {
  const v = String(value || '').toUpperCase();
  if (field === 'paymentStatus') {
    if (v === 'PAID') return 'ui-chip ui-chip-green';
    if (v === 'UNPAID') return 'ui-chip ui-chip-orange';
    if (v === 'OVERDUE') return 'ui-chip ui-chip-red';
  }
  if (field === 'meterStatus') {
    if (v === 'NORMAL') return 'ui-chip ui-chip-green';
    if (v === 'FAULTY') return 'ui-chip ui-chip-red';
    if (v === 'AVERAGE') return 'ui-chip ui-chip-orange';
  }
  if (field === 'dueDate') return 'ui-overdue-date';
  if (['netBillAmount', 'promptPaymentAmount', 'netBillAmountWithDPC', 'lastReceiptAmount', 'totalConsumption', 'previousReading', 'currentReading'].includes(field)) return 'ui-num';
  if (field === 'consumerNumber') return 'ui-strong';
  return '';
};



const OverdueBills = () => {
  const dispatch = useDispatch();
  const { bills, loading, error, pagination } = useSelector((state) => state.bills);
  const isSidebarOpen = useSelector((state) => state.sidebar?.isOpen || false);
  const user = useSelector(state => state.auth?.user);

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedMonthYear, setSelectedMonthYear] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const page = paginationModel.page + 1; // Convert to 1-based indexing for backend
    const limit = paginationModel.pageSize;
    dispatch(fetchOverdueBills(page, limit, selectedMonthYear));
  }, [dispatch, paginationModel, selectedMonthYear]);

  const handlePaginationModelChange = (newModel) => {
    setPaginationModel(newModel);
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getFilteredBills = () => {
    console.log("bills.paymentStatus", bills);
    if (!bills) return [];

    if (user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) {
      return bills;
    } else if (user?.role?.startsWith('Junior Engineer')) {
      const specificWard = user?.ward;
      return bills.filter((bill) => bill.ward === specificWard);
    }
    return [];
  };

  const filteredBills = getFilteredBills();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress sx={{ color: T.primary }} />
        <Typography sx={{ fontFamily: T.font, fontSize: 13, color: T.text2 }}>Loading overdue bills…</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ width: isSidebarOpen ? '80%' : '90%', ml: isSidebarOpen ? '19%' : '7%', mt: 6, p: 3, borderRadius: '12px', border: '1px solid #FAD4D4', backgroundColor: T.redSurface, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <ErrorOutlineIcon sx={{ color: T.red }} />
        <Typography color="error" sx={{ fontFamily: T.font, fontWeight: 600 }}>Error: {error}</Typography>
      </Box>
    );
  }

  // Fixed filtering logic - removed date comparison since backend already returns overdue bills
  const rows = filteredBills
    .filter(bill =>
      // If no month is selected, include all bills
      // If a month is selected, include only matching bills
      !selectedMonthYear || bill.monthAndYear === selectedMonthYear
    )
    .map((bill, index) => ({
      id: paginationModel.page * paginationModel.pageSize + index + 1,
      _id: bill._id,
      consumerNumber: bill.consumerNumber,
      email: bill?.email || '-',
      username: bill.username || '-',
      contactNumber: bill?.contactNumber,
      monthAndYear: bill.monthAndYear,
      meterNumber: bill?.meterNumber || '-',
      totalConsumption: bill.totalConsumption,
      meterStatus: bill.meterStatus,
      previousReadingDate: formatDate(bill.previousReadingDate),
      previousReading: bill.previousReading,
      currentReadingDate: formatDate(bill.currentReadingDate),
      currentReading: bill.currentReading,
      billDate: formatDate(bill.billDate),
      currentBillAmount: bill.currentBillAmount,
      totalArrears: bill.totalArrears,
      netBillAmount: bill.netBillAmount,
      roundedBillAmount: bill.roundedBillAmount,
      ward: bill?.ward,
      paymentStatus: bill.paymentStatus
        ? bill.paymentStatus.charAt(0).toUpperCase() + bill.paymentStatus.slice(1)
        : '-',
      approvedStatus: bill.approvedStatus || '-',
      lastReceiptAmount: bill.lastReceiptAmount ? bill.lastReceiptAmount : 0,
      overDueAmount: bill.overDueAmount,
      pendingAmount: bill.lastReceiptAmount ? bill.roundedBillAmount - bill.lastReceiptAmount : bill.roundedBillAmount,
      promptPaymentDate: formatDate(bill.promptPaymentDate),
      promptPaymentAmount: bill.promptPaymentAmount,
      dueDate: formatDate(bill.dueDate),
      netBillAmountWithDPC: bill.netBillAmountWithDPC,
      forwardForGeneration: bill.forwardForGeneration,
    }));

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(rows);
    } else {
      setSelectedItems([]);
    }
  };

  const handleCheckboxChange = (event, row) => {
    if (event.target.checked) {
      setSelectedItems((prev) => [...prev, row]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item.id !== row.id));
    }
  };

  const handleDeleteBill = (billId) => {
    dispatch(deleteBill(billId));
  };

  const handleEditBill = (bill) => {
    // Handle edit logic here
    console.log('Edit bill:', bill);
  };

  const handleDateChange = (value) => {
    const formattedValue = dayjs(value).format("MMM-YYYY").toUpperCase();
    setSelectedMonthYear(formattedValue);
  };

  const columns = [
    {
      field: 'checkbox',
      headerName: '',
      width: 50,
      headerClassName: 'data-grid-checkbox-header',
      renderHeader: () => {
        const allRowsChecked = rows.every(row =>
          selectedItems.some(item => item.id === row.id)
        );
        const someRowsChecked = rows.some(row =>
          selectedItems.some(item => item.id === row.id)
        );
        return (
          <Checkbox
            checked={allRowsChecked}
            indeterminate={someRowsChecked && !allRowsChecked}
            onChange={handleSelectAll}
          />
        );
      },
      renderCell: (params) => (
        <Checkbox
          checked={selectedItems.some((item) => item.id === params.row.id)}
          onChange={(event) => handleCheckboxChange(event, params.row)}
          disabled={params.row.forwardForGeneration === 'Yes'}
        />
      ),
    },
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'consumerNumber', headerName: 'CONSUMER NO.', width: 130 },
    { field: 'contactNumber', headerName: 'CONTACT NUMBER', width: 130 },
    { field: 'monthAndYear', headerName: 'BILL MONTH', width: 130 },
    { field: 'ward', headerName: 'WARD', width: 130 },
    { field: 'meterNumber', headerName: 'METER NUMBER', width: 130 },
    { field: 'totalConsumption', headerName: 'TOTAL CONSUMPTION', width: 130 },
    { field: 'meterStatus', headerName: 'METER STATUS', width: 130 },
    { field: 'previousReadingDate', headerName: 'PREVIOUS READING DATE', width: 180 },
    { field: 'previousReading', headerName: 'PREVIOUS READING', width: 130 },
    { field: 'currentReadingDate', headerName: 'CURRENT READING DATE', width: 180 },
    { field: 'currentReading', headerName: 'CURRENT READING', width: 130 },
    { field: 'billDate', headerName: 'BILL DATE', width: 130 },
    { field: 'netBillAmount', headerName: 'NET BILL AMOUNT', width: 130 },
    { field: 'promptPaymentDate', headerName: 'PROMPT PAYMENT DATE', width: 180 },
    { field: 'promptPaymentAmount', headerName: 'PROMPT PAYMENT AMOUNT', width: 180 },
    { field: 'dueDate', headerName: 'DUE DATE', width: 130 },
    { field: 'netBillAmountWithDPC', headerName: 'NET BILL AMOUNT WITH DPC', width: 200 },
    { field: 'paymentStatus', headerName: 'PAYMENT STATUS', width: 130 },
    { field: 'lastReceiptAmount', headerName: 'LAST RECEIPT AMOUNT', width: 180 },
    { field: 'approvedStatus', headerName: 'APPROVED STATUS', width: 130 },
  ];

  const getPadding = () => {
    const width = window.innerWidth;
    if (width <= 480) return '80px 20px';
    else if (width <= 600) return '80px 10px';
    else if (width <= 900) return '60px 10px';
    else return '30px 10px';
  };

  const gridStyle = {
    height: 'auto',
    width: isSidebarOpen ? '80%' : '90%',
    marginLeft: isSidebarOpen ? '19%' : '7%',
    transition: 'margin-left 0.3s',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px 0px',
    paddingLeft: '10px',
    fontFamily: T.font,
  };

  const innerDivStyle = {
    border: `1px solid ${T.border}`,
    borderRadius: '14px',
    backgroundColor: T.card,
    boxShadow: '0 1px 2px rgba(23, 32, 51, 0.04)',
    width: '99%',
    padding: getPadding(),
  };

  const rowColors = ['#FAFBFE', 'white'];
  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .MuiDataGrid-cell': {
      padding: theme.spacing(1),
    },
    '& .MuiDataGrid-row': {
      '&:nth-of-type(odd)': {
        backgroundColor: rowColors[0],
      },
      '&:nth-of-type(even)': {
        backgroundColor: rowColors[1],
      },
    },
    // ---- UI only (CSS styling, no behaviour change) ----
    border: `1px solid ${T.border}`,
    borderRadius: 12,
    backgroundColor: T.card,
    fontFamily: T.font,
    fontSize: 13,
    color: T.text,
    '& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeader': { backgroundColor: '#F3F6FC' },
    '& .MuiDataGrid-columnHeaders': { borderBottom: `1px solid ${T.border}` },
    '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 600, fontSize: 12, color: '#4A5875', letterSpacing: 0.2 },
    '& .MuiDataGrid-columnSeparator': { color: T.border },
    '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': { outline: 'none' },
    '& .MuiDataGrid-cell': { borderBottom: `1px solid ${T.border}` },
    '& .MuiDataGrid-row:hover': { backgroundColor: `${T.primarySurface} !important` },
    '& .MuiDataGrid-row.ui-row-selected': { backgroundColor: `${T.primarySurface} !important`, boxShadow: `inset 3px 0 0 ${T.primary}` },
    '& .MuiCheckbox-root.Mui-checked, & .MuiCheckbox-root.MuiCheckbox-indeterminate': { color: T.primary },
    '& .MuiDataGrid-footerContainer': { borderTop: `1px solid ${T.border}`, backgroundColor: '#FBFCFE' },
    '& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': { fontFamily: T.font, fontSize: 13, color: T.text2 },
    '& .ui-strong': { fontWeight: 600 },
    '& .ui-num': { fontVariantNumeric: 'tabular-nums' },
    '& .ui-overdue-date': { color: T.redDark, fontWeight: 600 },
    '& .ui-chip': { fontWeight: 600, fontSize: 12 },
    '& .ui-chip::before': { content: '""', display: 'inline-block', width: 7, height: 7, borderRadius: '50%', marginRight: 6, flexShrink: 0 },
    '& .ui-chip-green': { color: T.greenDark },
    '& .ui-chip-green::before': { backgroundColor: T.green },
    '& .ui-chip-orange': { color: '#B86A00' },
    '& .ui-chip-orange::before': { backgroundColor: T.orange },
    '& .ui-chip-red': { color: T.redDark },
    '& .ui-chip-red::before': { backgroundColor: T.red },
  }));

  // UI-only display values (read-only; existing data only — no new API calls)
  const uiTotalOverdue = pagination?.totalBills || 0;
  const uiCards = [
    { label: 'Total Overdue Bills', value: uiTotalOverdue.toLocaleString('en-IN'), icon: <ReceiptLongIcon />, fg: T.red, bg: T.redSurface, border: '#FAD4D4' },
    { label: 'Showing on this page', value: rows.length.toLocaleString('en-IN'), icon: <CalendarMonthOutlinedIcon />, fg: T.primary, bg: T.primarySurface, border: T.primaryBorder },
    { label: 'Selected Bills', value: selectedItems.length.toLocaleString('en-IN'), icon: <PlaylistAddCheckIcon />, fg: T.orange, bg: T.orangeSurface, border: '#FBE1BF' },
  ];

  return (
    <div style={gridStyle}>
      <Box sx={innerDivStyle}>
        <Box sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2,
          gap: 2,
          alignItems: { lg: 'center', md: 'center', sm: 'flex-start', xs: 'flex-start' },
          flexDirection: {
            lg: 'row',
            md: 'row',
            sm: 'column',
            xs: 'column'
          }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75, minWidth: 0, pl: { xs: 1, sm: '5px', md: '10px', lg: '20px' } }}>
            <Box sx={{ width: 48, height: 48, borderRadius: '12px', flexShrink: 0, display: 'grid', placeItems: 'center', color: T.red, backgroundColor: T.redSurface, border: '1px solid #FAD4D4' }}>
              <EventBusyIcon />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Breadcrumbs separator="/" sx={{ '& .MuiBreadcrumbs-separator': { mx: 0.75, color: '#B4BFD2' } }}>
                <Typography sx={{ fontFamily: T.font, fontSize: 12, color: T.text2 }}>Home</Typography>
                <Typography sx={{ fontFamily: T.font, fontSize: 12, color: T.text2 }}>Billing</Typography>
                <Typography sx={{ fontFamily: T.font, fontSize: 12, color: T.primary, fontWeight: 600 }}>Overdue Bills</Typography>
              </Breadcrumbs>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 4, height: 22, borderRadius: 2, backgroundColor: T.orange, flexShrink: 0 }} />
                <Typography sx={{
                  color: T.text,
                  fontFamily: T.font,
                  fontWeight: 700,
                  fontSize: {
                    sm: '15px',
                    xs: '15px',
                    md: '15px',
                    lg: '20px'
                  },
                }} className="title-2">
                  Users with Overdue Bills
                </Typography>
              </Box>
              <Typography sx={{ fontFamily: T.font, fontSize: 13, color: T.text2, mt: 0.25 }}>
                Review and monitor electricity bills past their due date.
              </Typography>
            </Box>
          </Box>
          <Chip
            label={`${uiTotalOverdue.toLocaleString('en-IN')} overdue records`}
            sx={{ fontFamily: T.font, fontWeight: 700, fontSize: 12.5, height: 28, color: T.redDark, backgroundColor: T.redSurface, border: '1px solid #FAD4D4' }}
          />
        </Box>

        {/* ================= SUMMARY CARDS (UI only, read-only) ================= */}
        <Box sx={{ mb: 2, display: 'grid', gap: 1.5, gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0,1fr))' } }}>
          {uiCards.map((c) => (
            <Paper
              key={c.label}
              elevation={0}
              sx={{
                p: 1.5, borderRadius: '12px', border: `1px solid ${T.border}`, backgroundColor: T.card,
                display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0,
                boxShadow: '0 1px 2px rgba(23, 32, 51, 0.04)',
                transition: 'border-color .2s ease', '&:hover': { borderColor: c.border },
              }}
            >
              <Box sx={{ width: 40, height: 40, flexShrink: 0, borderRadius: '10px', display: 'grid', placeItems: 'center', color: c.fg, backgroundColor: c.bg, '& svg': { fontSize: 21 } }}>
                {c.icon}
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontFamily: T.font, fontSize: 12, fontWeight: 500, color: T.text2 }}>{c.label}</Typography>
                <Typography sx={{ fontFamily: T.font, fontSize: 20, fontWeight: 700, color: T.text, lineHeight: 1.25 }}>{c.value}</Typography>
              </Box>
            </Paper>
          ))}
        </Box>

        {/* ================= MONTH FILTER TOOLBAR ================= */}
        <Box sx={{
          mb: 2, p: 1.5, borderRadius: '12px', border: `1px solid ${T.border}`, backgroundColor: T.bg,
          display: 'flex', alignItems: { md: 'center', xs: 'stretch' }, gap: 1.5,
          flexDirection: { md: 'row', xs: 'column' },
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
            <CalendarMonthOutlinedIcon sx={{ fontSize: 19, color: T.primary }} />
            <Typography sx={{ fontFamily: T.font, fontWeight: 600, fontSize: 13.5, color: T.text }}>Month / Year</Typography>
          </Box>
        <Box sx={{
          width:{lg:'20%',xl:'20%',md:'80%',sm:'80%',xs:'100%'},
          // UI only: input look
          '& .MuiOutlinedInput-root': { borderRadius: '10px', backgroundColor: T.card, fontFamily: T.font },
          '& .MuiOutlinedInput-root fieldset': { borderColor: T.primaryBorder },
          '& .MuiOutlinedInput-root:hover fieldset': { borderColor: T.primary2 },
          '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: T.primary },
          '& .MuiInputLabel-root': { fontFamily: T.font, color: T.text2 },
          '& .MuiInputLabel-root.Mui-focused': { color: T.primary },
        }}>
          {/* <BillDatePicker selectedMonthYear={selectedMonthYear} onChange={handleDateChange} /> */}
          <OverduebillDatePicker selectedMonthYear={selectedMonthYear} onChange={handleDateChange} />


        </Box>
          <Box sx={{ flex: 1 }} />
          {selectedMonthYear && (
            <Chip size="small" label={`Month: ${selectedMonthYear}`} sx={{ fontFamily: T.font, fontSize: 12, alignSelf: { xs: 'flex-start', md: 'center' }, color: T.primary, backgroundColor: T.primarySurface, border: `1px solid ${T.primaryBorder}` }} />
          )}
        </Box>

        <StyledDataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 15, 25, 35, 45, 55]}
          sx={{ paddingRight: 0.5, paddingLeft: 0.5 }}
          paginationMode="server"
          rowCount={pagination?.totalBills || 0}
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationModelChange}
          loading={loading}
          autoHeight={false}
          disableVirtualization={false}
          rowHeight={52}
          getRowId={(row) => row.id}
          getCellClassName={(params) => uiStatusClass(params.field, params.value)}
          getRowClassName={(params) => (selectedItems.some((item) => item.id === params.row.id) ? 'ui-row-selected' : '')}
        />
      </Box>
    </div>
  );
};

export default OverdueBills;