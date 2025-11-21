// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchBills, addBill, updateBillStatusAction, deleteBill, editBill } from '../store/actions/billActions';
// import { DataGrid } from '@mui/x-data-grid';
// import { Typography, Box, Button, Modal, TextField,MenuItem, Select, InputLabel, FormControl } from '@mui/material';
// import CheckIcon from '@mui/icons-material/Check';
// import AddPayment from '../components/modals/AddPayment';
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import './ConsumerBill.css';
// import { styled } from '@mui/material/styles';
// import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
// import IconButton from '@mui/material/IconButton';
// import DownloadIcon from '@mui/icons-material/Download';
// import autoTable from 'jspdf-autotable';
// import EditIcon from '@mui/icons-material/Edit';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import ExcelJS from 'exceljs';
// import { CircularProgress } from '@mui/material';
// import { useLocation } from 'react-router-dom';
// import { AddReceiptModal } from '../components/modals/AddReceipt';
// import wardDataAtoI from '../data/warddataAtoI';
// import MonthYearPicker from '../components/MonthYearPickerFormoneTwenty';
// import {loadDevanagariFont,notoserifbase} from '../fonts/NotoSerifbase';
// import SearchIcon from '@mui/icons-material/Search';
// import InputAdornment from '@mui/material/InputAdornment';
// import html2pdf from 'html2pdf.js';

// const Formonetwentynew = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const { consumerData = {} } = location?.state || {};
//   const { bills, loading, error } = useSelector((state) => state.bills);
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const [userId, setUserId] = useState('');
//   const [cnId, setCnId] = useState('');
//   const [billOpen, setBillOpen] = useState(false);
//   const [currentBill, setCurrentBill] = useState(null);
//   const [addPaymentOpen, setAddPaymentOpen] = useState(false);
//   const [selectedBill, setSelectedBill] = useState(null);
//   const [selectedValues, setSelectedValues] = useState({});
//   const [normalMeterCount, setNormalMeterCount] = useState(0);
//   const [faultyMeterCount, setFaultyMeterCount] = useState(0);
//   const [averageMeterCount, setAverageMeterCount] = useState(0);
//   const [billPaid, setBillPaid] = useState(0);
//   const [billUnPaid, setBillUnPaid] = useState(0);
//   const [cBillAmount, setCBillAmount] = useState(0);
//   const [tArrears, setArrears] = useState(0);
//   const [nBillAmount, setNBillAmount] = useState(0);
//   const [rBillAmount, setRBillAmount] = useState(0);
//   const [paidBefore, setPaidBefore] = useState(0);
//   const [paidAfter, setPaidAfter] = useState(0);
//   const [wardName, setWardName] = useState('');
//   const user = useSelector(state => state.auth.user);
  
//   const [data, setData] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);
//    const [cRDate, setCRDate] = useState('');
//   const [processBtnEnabled, setProcessBtnEnabled] = useState(false);
//   const [rollbackBtnEnabled, setRollbackBtnEnabled] = useState(false);
//   const [processExeBtnEnabled, setProcessExeBtnEnabled] = useState(false);
//   const [rollbackExeBtnEnabled, setRollbackExeBtnEnabled] = useState(false);
//   const [processAdmBtnEnabled, setProcessAdmBtnEnabled] = useState(false);
//   const [rollbackAdmBtnEnabled, setRollbackAdmBtnEnabled] = useState(false);
//   const [processSuperAdmBtnEnabled, setProcessSuperAdmBtnEnabled] = useState(false);
//   const [rollbackSuperAdmBtnEnabled, setRollbackSuperAdmBtnEnabled] = useState(false);
//   useEffect(() => {
//     dispatch(fetchBills());
//   }, [dispatch]);
//   useEffect(() => {
//     if (bills) {
//       const initialSelectedValues = bills.reduce((acc, bill, index) => {
//         acc[index + 1] = bill.forwardForGeneration ? 'Yes' : 'No';
//         return acc;
//       }, {});
//       setSelectedValues(initialSelectedValues);
//       const normalMeters = bills.filter(bill => bill.meterStatus === 'NORMAL').length;
//       const faultyMeters = bills.filter(bill => bill.meterStatus === 'FAULTY').length;
//       const averageMeters = bills.filter(bill => bill.meterStatus === 'AVERAGE').length;
//       const paid = bills.filter(bill => bill.paymentStatus === 'paid').length;
//       const unpaid = bills.filter(bill => bill.paymentStatus === 'unpaid').length;
//       setNormalMeterCount(normalMeters);
//       setFaultyMeterCount(faultyMeters);
//       setAverageMeterCount(averageMeters);
//       setBillPaid(paid)
//       setBillUnPaid(unpaid)
//     }
//   }, [bills]);

//   useEffect(() => {
//     setCBillAmount(bills?.currentBillAmount)
//     setArrears(bills?.totalArrears)
//     setNBillAmount(bills?.netBillAmount)
//     setRBillAmount(bills?.roundedBillAmount)
//     setPaidAfter(bills?.ifPaidBefore)
//     setPaidBefore(bills?.ifPaidAfter)
//   }, [])

//   useEffect(() => {
//     const checkProcessBtnEnable = () => {
//       if (user.role === 'Junior Engineer') {

//         const pendingForJuniorCount = bills.filter(
//           item => item.approvedStatus === 'PendingForJuniorEngineer'
//         ).length;

//         const pendingForExecutiveCount = bills.filter(
//           item => item.approvedStatus === 'PendingForExecutiveEngineer'
//         ).length;

//         if (pendingForExecutiveCount > pendingForJuniorCount) {
//           setRollbackBtnEnabled(true);
//           setProcessBtnEnabled(false);
//         } else {
//           if (pendingForJuniorCount > 1) {
//             setProcessBtnEnabled(true);
//             setRollbackBtnEnabled(false);
//           } else if (pendingForJuniorCount === 1) {
//             setProcessBtnEnabled(false);
//             setRollbackBtnEnabled(true);
//           } else {
//             setProcessBtnEnabled(false);
//             setRollbackBtnEnabled(true);
//           }
//         }
//       } else if (user.role === 'Executive Engineer') {
//         const pendingForExecutiveCount = bills.filter(
//           item => item.approvedStatus === 'PendingForExecutiveEngineer'
//         ).length;
//         const pendingForAdminCount = bills.filter(
//           item => item.approvedStatus === 'PendingForAdminEngineer'
//         ).length;
//         if (pendingForAdminCount > pendingForExecutiveCount) {
//           setRollbackExeBtnEnabled(true);
//           setProcessExeBtnEnabled(false);
//         } else {
//           setRollbackExeBtnEnabled(false);
//           setProcessExeBtnEnabled(true);
//         }
//       } else if (user.role === 'Admin') {
//         const pendingForAdminCount = bills.filter(
//           item => item.approvedStatus === 'PendingForAdmin'
//         ).length;
//         const pendingForSuperAdminCount = bills.filter(
//           item => item.approvedStatus === 'PendingForSuperAdmin'
//         ).length;
//         if (pendingForSuperAdminCount > pendingForAdminCount) {
//           setRollbackAdmBtnEnabled(true);
//           setProcessAdmBtnEnabled(false);
//         } else {
//           setRollbackAdmBtnEnabled(false);
//           setProcessAdmBtnEnabled(true);
//         }
//       } else if (user.role === 'Super Admin') {
//         const pendingForSuperAdminCount = bills.filter(
//           item => item.approvedStatus === 'PendingForSuperAdmin'
//         ).length;
//         const DoneCount = bills.filter(
//           item => item.approvedStatus === 'Done'
//         ).length;
//         if (DoneCount > pendingForSuperAdminCount) {
//           setRollbackSuperAdmBtnEnabled(true);
//           setProcessSuperAdmBtnEnabled(false);
//         } else {
//           setRollbackSuperAdmBtnEnabled(false);
//           setProcessSuperAdmBtnEnabled(true);
//         }
//       }
//       else {
//         setProcessExeBtnEnabled(false);
//         setRollbackExeBtnEnabled(true);
//       }
//     };
//     checkProcessBtnEnable();
//   }, [bills, user.role]);

//   const getFilteredBills = () => {
//     if (user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user.ward === 'Head Office')) {
//       return bills;
//     } else if (user?.role.startsWith('Junior Engineer')) {
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
//     return <p>Error: {error}</p>;
//   }
//   const handleChange = (event) => {
//     const newValue = event.target.value.trim();
    
//     setCnId(newValue);
// };
//   const handleAddBillOpen = () => {
//     setBillOpen(true);
//   };
//   const handleAddBillClose = () => {
//     setBillOpen(false);
//   };
//   const handleAddBill = (billData) => {
//     dispatch(addBill(billData));
//     handleAddBillClose();
//   };
//   const handleAddPaymentClose = () => {
//     setAddPaymentOpen(false);
//   };
//   const formatDate = (dateString) => {
//     const options = { day: '2-digit', month: 'long', year: 'numeric' };
//     return new Date(dateString).toLocaleDateString('en-US', options);
//   };
//   const formatDateMonth = (dateString) => {
//     const options = { month: 'long' };
//     return new Date(dateString).toLocaleDateString('en-US', options);
//   };
//   const shouldDisplayTextField =
//     location.pathname === '/specificconsumerbills' ||
//     !location.pathname.startsWith('/consumer-bill-details/');

  
//   const combinedData = [...filteredBills];

//   const consumerId = consumerData?.consumerNumber || null;

// let filteredData = cnId || wardName 
//   ? combinedData.filter(bill => 
//       (cnId && bill.consumerNumber?.toString().trim() === cnId.trim()) ||
//       (wardName && bill.ward === wardName)
//     ) 
//   : combinedData;

// if (cRDate) {
 
//   const crDateObj = new Date(cRDate);
//   const cRYear = crDateObj.getFullYear();
//   const cRMonth = crDateObj.getMonth(); 

//   filteredData = filteredData.filter(bill => {
//     if (bill.currentReadingDate) {
//       const [billYear, billMonth] = bill.currentReadingDate.split('-').map(Number);

//       const billDateObj = new Date(bill.currentReadingDate);
     

//       return cRYear === billYear && cRMonth === billMonth - 1; 
//     }
//     return false;
//   });
// }


// const rows = filteredData.map((bill, index) => ({
//       _id: bill._id,
//       id: index + 1,
//       dueDateMonth: formatDateMonth(bill.currentReadingDate),
//       userId: bill.userId,
//       consumerNumber: bill.consumerNumber,
//       email: bill.email,
//       username: bill.username || '-',
//       contactNumber: bill?.contactNumber,
//       meterNumber: bill?.meterNumber || '-',
//       totalConsumption: bill.totalConsumption,
//       meterStatus: bill.meterStatus || '-',
//       phaseType: bill?.phaseType || '-',
//       tariffDescription: bill?.tariffDescription || '-',
//       netLoad: bill.netLoad || '-',
//       sanctionedLoad: bill?.sanctionedLoad || '-',
//       previousReadingDate: formatDate(bill.previousReadingDate) || '-',
//       previousReading: bill.previousReading,
//       currentReadingDate: formatDate(bill.currentReadingDate),
//       currentReading: bill.currentReading,
//       billDate: formatDate(bill.billDate),
//       totalArrears: bill.totalArrears,
//       netBillAmount: bill.netBillAmount,
//       address: bill.address || '-',
//       ward: bill?.ward,
//       paymentStatus: bill.paymentStatus || '-',
//       approvedStatus: bill.approvedStatus || 'PendingForJuniorEngineer',
//       paidAmount: bill.paidAmount ? bill.paidAmount : 0,
//       pendingAmount: bill.paidAmount ? bill.roundedBillAmount - bill.paidAmount : bill.roundedBillAmount,
//       dueDate: formatDate(bill.dueDate),
//       receiptNoBillPayment: bill.receiptNoBillPayment||'-',
//       lastReceiptAmount: bill.lastReceiptAmount ? bill.lastReceiptAmount : 0,
//       promptPaymentDate:bill.promptPaymentDate,
//       promptPaymentAmount:bill.promptPaymentAmount,
//       dueDate:bill.dueDate,
//       netBillAmountWithDPC: bill.netBillAmountWithDPC||'-',
//       phaseType:bill?.phaseType||'-',
     
//       billPaymentDate: bill.billPaymentDate||'-',
//       paidAmount:bill.paidAmount||'-',
//       forwardForGeneration: bill.forwardForGeneration,
//       juniorEngineerContactNumber: bill.juniorEngineerContactNumber
//     }));

//   const handleApproveClick = (bill, yesno) => {
//     let approvedStatus;
//     let currentBillAmount;
//     let ifPaidBefore;
//     let ifPaidAfter;
//     let totalArrears;
//     let netBillAmount;
//     let roundedBillAmount;
//     if (!bill || !bill._id) {
//       return;
//     }
//     let paymentStatus = bill.paymentStatus || 'unpaid';
//     if (user?.role === 'Junior Engineer') {
//       if (yesno === 'No') {
//         approvedStatus = 'PendingForJuniorEngineer';
//         paymentStatus = bill.paymentStatus ? bill.paymentStatus : 'unpaid';
//         toast.info('Bill sent back to Junior Engineer for review');
//       } else if (yesno === 'Yes' && paymentStatus === bill.paymentStatus ? bill.paymentStatus : 'unpaid') {
//         approvedStatus = 'PendingForExecutiveEngineer';
//         paymentStatus =bill.paymentStatus ? bill.paymentStatus : 'unpaid';
//         toast.success('Record forwarded to Executive Engineer');
//       }
//       else {
//         approvedStatus = 'PendingForExecutiveEngineer';
//         paymentStatus =bill.paymentStatus ? bill.paymentStatus : 'unpaid';
//         toast.success('Record forwarded to Executive Engineer');
//       }
//     } else if (user?.role === 'Executive Engineer') {
//       approvedStatus = 'PendingForAdmin';
//       paymentStatus = bill.paymentStatus ? bill.paymentStatus : 'unpaid';
//     } else if (user?.role === 'Admin') {
//       approvedStatus = 'PendingForSuperAdmin';
//       paymentStatus = bill.paymentStatus ? bill.paymentStatus : 'unpaid';
//     } else if (user?.role === 'Super Admin' && yesno === 'Yes') {
//       approvedStatus = 'Done';
//       paymentStatus = bill.paymentStatus ? bill.paymentStatus : 'unpaid';
//     } else if (user?.role === 'Super Admin' && yesno === 'No') {
//       approvedStatus = 'PendingForSuperAdmin';
//       paymentStatus = bill.paymentStatus ? bill.paymentStatus : 'unpaid';
//       currentBillAmount = tArrears;
//       ifPaidBefore = paidBefore;
//       ifPaidAfter = paidAfter;
//       totalArrears = tArrears
//       netBillAmount = nBillAmount;
//       roundedBillAmount = rBillAmount;
//     }
//     dispatch(updateBillStatusAction(bill._id, approvedStatus, paymentStatus, yesno, currentBillAmount, totalArrears, netBillAmount, roundedBillAmount, ifPaidBefore, ifPaidAfter));
//   };
//   const columns = (handleDeleteBill) => [

//     { field: 'dueDateMonth', headerName: 'महिना', width: 130 },
//     { field: 'consumerNumber', headerName: 'ग्राहक क्रमांक', width: 130 },
//     { field: 'meterNumber', headerName: 'मीटर क्रमांक', width: 130 },
//     { field: 'ward', headerName: 'प्रभाग समिती', width: 130 },
//     { field: 'contactNumber', headerName: 'ग्राहक संपर्क क्रमांक', width: 130 },
//     { field: 'totalConsumption', headerName: 'एकूण वापर युनिट संख्या', width: 130 },
//     { field: 'previousReadingDate', headerName: 'मागील रीडिंग दिनांक', width: 130 },
//     { field: 'previousReading', headerName: 'मागील रीडिंग', width: 130 },
//     { field: 'currentReadingDate', headerName: 'चालू रीडिंग दिनांक', width: 130 },
//     { field: 'currentReading', headerName: 'चालू रीडिंग', width: 130 },
//     { field: 'netBillAmount', headerName: 'देयकाची रक्कम', width: 130 },
//     { field: 'dueDate', headerName: 'देयकाची अंतिम तारीख ', width: 130 },
//     { field: 'meterStatus', headerName: 'मीटरची स्थिती', width: 130 },
//     { field: 'netLoad', headerName: 'एकूण भार', width: 130 },
//     { field: 'sanctionedLoad', headerName: 'मंजूर भार', width: 130 },
//     { field: 'phaseType', headerName: 'फेज प्रकार', width: 130 },
//     { field: 'tariffDescription', headerName: 'टॅरिफ डिस्क्रिप्शन', width: 130 },
//     { field: 'receiptNoBillPayment', headerName: 'पावती क्रमांक ', width: 130 },
//     // { field: 'lastReceiptDate', headerName: 'बिल भरणा तारीख', width: 130 },
//     { field: 'billPaymentDate', headerName: 'बिल भरणा तारीख', width: 130 },
//     { field: 'paidAmount', headerName: 'भरणा रक्कम', width: 130 },

//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 200,
//       renderCell: (params) => (
//         <>
//           <IconButton sx={{ color: '#23CCEF' }} onClick={() => handleEditBill(params.row)}
//             disabled={user.role === 'Junior Engineer' && (params.row.approvedStatus === 'PendingForExecutiveEngineer' || params.row.approvedStatus === 'PendingForAdmin' || params.row.approvedStatus === 'PendingForSuperAdmin' || params.row.approvedStatus === 'Done')}
//           >
//             <EditIcon />
//           </IconButton>
//         </>
//       ),
//     },
//     ...(!user?.role === 'Junior Engineer'
//       ? [
//         {
//           field: 'actions',
//           headerName: 'Actions',
//           width: 200,
//           renderCell: (params) => (
//             <>
//               <IconButton sx={{ color: '#23CCEF' }} onClick={() => handleApproveClick(params.row)}>
//                 <CheckIcon />
//               </IconButton>
//             </>
//           ),
//         },
//       ]
//       : []),
//   ];
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
//     marginTop: '1vh'
//   };
//   const innerDivStyle = {
//     border: '1px solid #F7F7F8',
//     width: '99%',
//     padding: '30px 10px',
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
//      '& .MuiDataGrid-columnHeaderTitle': {
//     fontWeight: 'bold', // ✅ Make header bold
//     fontSize: '14px',
//   },
//   }));
//   const CustomWidthTooltip = styled(({ className, ...props }) => (
//     <Tooltip {...props} classes={{ popper: className }} />
//   ))({
//     [`& .${tooltipClasses.tooltip}`]: {
//       maxWidth: 500,
//       backgroundColor: '#FB404B',
//       color: 'white',
//       fontSize: '14px',
//       padding: '10px 15px',
//       borderRadius: '4px',
//     },
//     [`& .${tooltipClasses.arrow}`]: {
//       color: '#FB404B',
//     },
//   });

//   const handleDownloadReport = async () => {
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Bills');

//     const titles = [
//       'नमुना नं १२०',
//       '(नियम १४७) (२) पहा )',
//       'वसई - विरार शहर महानगरपालिका',
//       '२०-२० या वर्षांची विद्युत शक्तीच्या खपाची मीटर नोंद'
//     ];

//     titles.forEach((title, index) => {
//       const row = worksheet.getRow(index + 1);
//       row.getCell(1).value = title;


//       row.getCell(1).alignment = { horizontal: 'center', vertical: 'center' };


//       if (title === 'वसई - विरार शहर महानगरपालिका') {
//         row.getCell(1).font = { bold: true, size: 20 };
//         row.height = 42;
//       } else if (title === 'नमुना नं १२०') {
//         row.getCell(1).font = { bold: false, size: 18 };
//         row.height = 32;
//       } else {
//         row.getCell(1).font = { bold: true };
//         row.height = 32;
//       }

//       row.getCell(1).border = {
//         top: { style: "thin" },
//         left: { style: "thin" },
//         bottom: { style: "thin" },
//         right: { style: "thin" }
//       };

//       worksheet.mergeCells(index + 1, 1, index + 1, 16);
//     });
//     const headers = [
//       'मीटर क्रमांक','ग्राहक संपर्क क्रमांक', 'महिना','एकूण युनिट', 'मागील रीडिंग दिनांक',
//       'मागील रीडिंग', 'चालू रीडिंग दिनांक',
//       'चालू रीडिंग', 'देयकाची रक्कम', 'देयकाची अंतिम तारीख ',
//       'मीटरची स्थिती', 'एकूण भार', 'मंजूर भार','फेज प्रकार','पावती क्रमांक',
//       'बिल भरणा तारीख',
//     ];
//     worksheet.addRow([]);
//     worksheet.addRow(headers).font = { bold: true };
//     rows.forEach(rowData => {
//       worksheet.addRow([
//         rowData?.meterNumber || 'N/A',
//         rowData.contactNumber || 'N/A',
//         rowData.dueDateMonth || 'N/A',
//         rowData.totalConsumption || 'N/A',
//         rowData.previousReadingDate || 'N/A',
//         rowData.previousReading || 'N/A',
//         rowData.currentReadingDate || 'N/A',
//         rowData.currentReading || 'N/A',
//         rowData.netBillAmount || 'N/A',
//         rowData.dueDate || 'N/A',
//         rowData.meterStatus || 'N/A',
//         rowData.netLoad || 'N/A',
//         rowData.sanctionedLoad || 'N/A',
//         rowData.phaseType || 'N/A',
//         rowData.receiptNoBillPayment || 'N/A',
//         rowData.lastReceiptDate || 'N/A',
//       ]);
//     });
//     const buffer = await workbook.xlsx.writeBuffer();
//     const blob = new Blob([buffer], { type: 'application/octet-stream' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'ConsumerBills.xlsx';
//     link.click();
//   };

  



// // const handleDownloadPDF = () => {
// //   try {
// //     const doc = new jsPDF({ orientation: 'landscape' });

// //     doc.addFileToVFS("NotoSerifDevanagari.ttf", notoserifbase);
// //     doc.addFont("NotoSerifDevanagari.ttf", "NotoSerifDevanagari", "normal");
// //     loadDevanagariFont(doc);
    

// //         loadDevanagariFont(doc); 
    



// //         doc.setFont("NotoSerifDevanagari", "normal");

// //         doc.setFontSize(16);
// //     doc.setFont("NotoSerifDevanagari");
// //       let yPos = 10;
// //       let rowCount = 0;

    
// //       doc.setFontSize(16);
      
// //       doc.text("Namuna No. 120", 140, yPos);
// //       yPos += 10;
    
// //       doc.text("(Rule 147) (2) Look )", 140, yPos);
// //       yPos += 10;
// //       doc.setFontSize(18);
      
// //       doc.text("Vasai Virar City Municipal Corporation", 110, yPos);
// //       yPos += 15;

// //       const tableHeaders = [
// //           "ग्राहक क्रमांक", "मीटर क्रमांक", "ग्राहक संपर्क क्रमांक",
// //           "मीटरची स्थिती", "मंजूर भार", "फेज प्रकार"
// //       ];

// //       const tableData = rows.map(row => [
// //           row.consumerNumber || 'N/A',
// //           row.meterNumber || 'N/A',
// //           row.contactNumber || 'N/A',
// //           row.meterStatus || 'N/A',
// //           row.sanctionedLoad || 'N/A',
// //           row.phaseType || 'N/A'
// //       ]);

// //       const groupedRows = rows.reduce((acc, row) => {
// //           const year = new Date(row.currentReadingDate).getFullYear();
// //           if (!acc[year]) {
// //               acc[year] = [];
// //           }
// //           acc[year].push(row);
// //           return acc;
// //       }, {});

// //       Object.keys(groupedRows).forEach((year) => {
// //           if (rowCount >= 50) {
// //               doc.addPage();
// //               yPos = 10;
// //               rowCount = 0;
// //           }

// //           doc.setFontSize(14);
         
// //           doc.text(`Year: ${year}`, 140, yPos);
// //           yPos += 10;

         
// //           const yearlyTableHeaders = [
// //             "Month", "Total Consumption", "Previous Reading Date", "Previous Reading",
// //             "Current Reading Date", "Current Reading", "Netbill Amount",
// //             "Due Date", "Last Receipt Date", "Net Load"
// //         ];

// //           const yearlyTableData = groupedRows[year].map(row => [
// //               row.dueDateMonth || 'N/A',
// //               row.totalConsumption || 'N/A',
// //               row.previousReadingDate || 'N/A',
// //               row.previousReading || 'N/A',
// //               row.currentReadingDate || 'N/A',
// //               row.currentReading || 'N/A',
// //               row.netBillAmount || 'N/A',
// //               row.dueDate || 'N/A',
// //               row.lastReceiptDate || 'N/A',
// //               row.netLoad || 'N/A'
// //           ]);

// //           doc.autoTable({
// //               head: [yearlyTableHeaders],
// //               body: yearlyTableData,
// //               startY: yPos,
// //               margin: { top: 20 },
// //               styles: { fontSize: 10 }
// //           });

// //           yPos = doc.autoTable.previous.finalY + 10;
// //           rowCount += yearlyTableData.length;
// //       });

// //       doc.save('ConsumerBills.pdf');
// //   } catch (error) {
// //       console.error('Error generating PDF:', error);
// //   }
// // };

// // ---------------------------------

// const handleDownloadPDF = () => {
//   try {
//     // Create a temporary container
//     const container = document.createElement('div');
//     container.id = 'pdf-content';
    
//     // Group rows by year
//     const groupedRows = rows.reduce((acc, row) => {
//       const year = new Date(row.currentReadingDate).getFullYear();
//       if (!acc[year]) {
//         acc[year] = [];
//       }
//       acc[year].push(row);
//       return acc;
//     }, {});

//     // Create HTML content using innerHTML
//     container.innerHTML = `
//       <div style="font-family: Arial, sans-serif; padding: 20px; font-size: 16px;">
//         <!-- Header Section -->
//         <div style="text-align: center; margin-bottom: 30px;">
//           <div style="font-size: 18px; margin-bottom: 8px;">नमुना नं १२०</div>
//           <div style="font-size: 16px; margin-bottom: 8px;">(नियम १४७) (२) पहा )</div>
//           <div style="font-size: 20px; font-weight: bold; margin-bottom: 8px;">वसई - विरार शहर महानगरपालिका</div>
//           <div style="font-size: 16px; font-weight: bold; margin-bottom: 20px;">२०-२० या वर्षांची विद्युत शक्तीच्या खपाची मीटर नोंद</div>
//         </div>

//         <!-- Consumer Basic Info Table -->
       
//         <!-- Yearly Data -->
//         ${Object.keys(groupedRows).map(year => `
//           <div style="margin-bottom: 40px; page-break-inside: avoid;">
//             <h3 style="margin-bottom: 15px; color: #333; background-color: #f0f0f0; padding: 10px; border-left: 4px solid #007bff;">
//               वर्ष: ${year}
//             </h3>
//             <table style="width: 100%; border-collapse: collapse; font-size: 16px;">
//               <thead>
//                 <tr style="background-color: #f5f5f5;">
//                   <th style="border: 1px solid #ddd; padding: 6px; text-align: left; min-width: 60px;">महिना</th>
//                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">ग्राहक क्रमांक</th>
//                 <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">मीटर क्रमांक</th>
//                 <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">प्रभाग समिती</th>
//                   <th style="border: 1px solid #ddd; padding: 6px; text-align: left; min-width: 80px;">एकूण वापर युनिट संख्या</th>
//                   <th style="border: 1px solid #ddd; padding: 6px; text-align: left; min-width: 80px;">मागील रीडिंग दिनांक</th>
//                   <th style="border: 1px solid #ddd; padding: 6px; text-align: left; min-width: 60px;">मागील रीडिंग</th>
//                   <th style="border: 1px solid #ddd; padding: 6px; text-align: left; min-width: 80px;">चालू रीडिंग दिनांक</th>
//                   <th style="border: 1px solid #ddd; padding: 6px; text-align: left; min-width: 60px;">चालू रीडिंग</th>
//                   <th style="border: 1px solid #ddd; padding: 6px; text-align: left; min-width: 60px;">देयकाची रक्कम</th>
//                   <th style="border: 1px solid #ddd; padding: 6px; text-align: left; min-width: 80px;">देयकाची अंतिम तारीख</th>
//                   <th style="border: 1px solid #ddd; padding: 6px; text-align: left; min-width: 60px;">एकूण भार</th>
//                   <th style="border: 1px solid #ddd; padding: 6px; text-align: left; min-width: 80px;">पावती क्रमांक</th>
//                   <th style="border: 1px solid #ddd; padding: 6px; text-align: left; min-width: 80px;">बिल भरणा तारीख</th>
//                   <th style="border: 1px solid #ddd; padding: 6px; text-align: left; min-width: 60px;">भरणा रक्कम</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 ${groupedRows[year].map(row => `
//                   <tr>
//                     <td style="border: 1px solid #ddd; padding: 6px;">${row.dueDateMonth || 'N/A'}</td>
//                      <td style="border: 1px solid #ddd; padding: 8px;">${row.consumerNumber || 'N/A'}</td>
//                   <td style="border: 1px solid #ddd; padding: 8px;">${row.meterNumber || 'N/A'}</td>
//                   <td style="border: 1px solid #ddd; padding: 8px;">${row.ward || 'N/A'}</td>
//                     <td style="border: 1px solid #ddd; padding: 6px;">${row.totalConsumption || 'N/A'}</td>
//                     <td style="border: 1px solid #ddd; padding: 6px;">${row.previousReadingDate || 'N/A'}</td>
//                     <td style="border: 1px solid #ddd; padding: 6px;">${row.previousReading || 'N/A'}</td>
//                     <td style="border: 1px solid #ddd; padding: 6px;">${row.currentReadingDate || 'N/A'}</td>
//                     <td style="border: 1px solid #ddd; padding: 6px;">${row.currentReading || 'N/A'}</td>
//                     <td style="border: 1px solid #ddd; padding: 6px;">${row.netBillAmount || 'N/A'}</td>
//                     <td style="border: 1px solid #ddd; padding: 6px;">${row.dueDate || 'N/A'}</td>
//                     <td style="border: 1px solid #ddd; padding: 6px;">${row.netLoad || 'N/A'}</td>
//                     <td style="border: 1px solid #ddd; padding: 6px;">${row.receiptNoBillPayment || 'N/A'}</td>
//                     <td style="border: 1px solid #ddd; padding: 6px;">${row.billPaymentDate || 'N/A'}</td>
//                     <td style="border: 1px solid #ddd; padding: 6px;">${row.paidAmount || 'N/A'}</td>
//                   </tr>
//                 `).join('')}
//               </tbody>
//             </table>
//           </div>
//         `).join('')}
//       </div>
//     `;

//     // Append to body temporarily
//     document.body.appendChild(container);

//     // PDF options
//     const options = {
//       margin: [10, 10, 10, 10],
//       filename: 'ConsumerBills.pdf',
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { 
//         scale: 2,
//         useCORS: true,
//         letterRendering: true
//       },
//       jsPDF: { 
//         unit: 'mm', 
//         format: 'a3', 
//         orientation: 'landscape' 
//       }
//     };

//     // Generate PDF
//     html2pdf()
//       .set(options)
//       .from(container)
//       .save()
//       .then(() => {
//         // Clean up - remove the temporary container
//         document.body.removeChild(container);
//       })
//       .catch((error) => {
//         console.error('Error generating PDF:', error);
//         // Clean up on error too
//         if (document.body.contains(container)) {
//           document.body.removeChild(container);
//         }
//       });
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//   }
// };





// // ==============================







// const handleChangeWard = (event) => {
//   setWardName(event.target.value);
// };



// const handleCRDChange = (value) => {
  
//   setCRDate(value); 
// };

// const handleDeleteBill = (billId) => {
//     dispatch(deleteBill(billId));
//   };
//   const handleEditBill = (bill) => {
//     setCurrentBill(bill);
//     setBillOpen(true);
//   };
  
  
//   return (
//     <div style={gridStyle}>

//       <Box sx={{
//         width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', flexDirection: 'column',
//         marginTop: {
//           xl: '10px',
//           lg: '10px',
//           md: '10px',
//           sm: '80x',
//           xs: '80px'
//         }
//       }}>
//         <Box><Typography>नमुना  नं  १२०</Typography></Box>
//         <Box><Typography>(नियम १४७)  (२) पहा )</Typography></Box>
//         <Box><Typography
//           variant="h6"
//           sx={{
//             fontSize: { xl: '30px', lg: '30px', md: '20px', sm: '20px', xs: '18px' },
//             fontWeight: 'bold', color: '#000'
//           }}
//         >वसई - विरार शहर महानगरपालिका </Typography></Box>

//         <Box>
//           <Typography sx={{ fontSize: { xl: '17px', lg: '17px', md: '20px', sm: '12px', xs: '12px' }, }}>२०-२० या वर्षांची विद्युत  शक्तीच्या खपाची मीटर नोंद </Typography>
//         </Box>
//       </Box>

//       <Box sx={innerDivStyle}>

//       <Box sx={{
          
//             width:'100%',
//               display: 'flex',
//               justifyContent: { xl: 'flex-start', lg: 'flex-start', md: 'cener', sm: 'center', xs: 'center' }
//             }}>
//               <Typography sx={{
//                 fontSize: {
//                   xl: '16px',
//                   lg: '16px',
//                   md: '15px',
//                   sm: '12px',
//                   xs: '12px'
//                 }
//               }}>प्रत्येक महिन्याचे / वार्षिक मीटर भाडे </Typography>
//             </Box>
//         <Box sx={{
//       //  border:'2px solid red',
//           display: 'flex', width: 
//           {lg:'85%',
//             xl:'85%'
//           }, 
//           justifyContent: 
//           {lg:'space-between',
//            md:'space-between',
          
//           },
//           mt:{lg:1},
//           flexDirection: {
//             xs: 'column',
//             sm: 'column',
//             md: 'row',
//             lg: 'row',
//             xl: 'row'
//           },
//           flexWrap: 'wrap',
          
//         }}>


         

          
                        
// <MonthYearPicker cRDate={cRDate} handleCRDChange={handleCRDChange}  />


// {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user.role==='Junior Engineer' && user.ward==='Head Office')) && (
//               <FormControl
//               fullWidth
//               size="small"
//               variant="outlined"
//               sx={{
                
            
//                 width: {
//                   xl:isSidebarOpen ? '12%' : '10%',
//                   lg:isSidebarOpen ? '15%' : '15%',
//                   md: '45%',
//                   sm: '100%',
//                   xs: '100%',
//                 },
//                 mt: { sm: 1,md:0,lg:0,xl:0 }, 
//                 mb: { xs:1,sm: 1,lg:0,xl:0 }, 
//                 ml:{
//                   xl:1,
//                   lg:1,
//                   md:0,
//                   sm:0
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
//             )}
          
            
          
//               <TextField
//               size="small"
           
//                 id="consumerNumber"
//                 name="consumerNumber"
//                 // label="Search Consumer ID"
//                 value={cnId}
//                 onChange={handleChange}
//                 // variant="outlined"
//                   placeholder="CONSUMER ID" // 👈 This is important to allow the label to behave normally
//                 InputProps={{
//                   startAdornment: (
//       <InputAdornment position="start">
//         <SearchIcon sx={{ color: '#000' }} />
//       </InputAdornment>
//     ),
//                 }}
//                 InputLabelProps={{
//                   sx: {
//                     color: '#000',
//                     textTransform:'uppercase',
//                     fontSize:'12px',
//                     // fontWeight:'bold'
//                   },
//                 }}

//                 sx={{
//                   width: {
//                     xl:isSidebarOpen ? '26%' : '26%',
//                     lg:isSidebarOpen ? '26%' : '26%',
//                     md: '45%',
//                     sm: '100%',
//                     xs: '100%'
                  
//                   }, display: shouldDisplayTextField === false && 'none',

//     '& .MuiOutlinedInput-root': {
//       '& fieldset': {
//         borderColor: '#000', // 🔲 Normal state border
//       },
//       '&:hover fieldset': {
//         borderColor: '#000', // 🖱 Hover state border
//       },
//       '&.Mui-focused fieldset': {
//         borderColor: '#000', // ✏️ Focused state border
//       },},

//        '& input::placeholder': {
//       color: '#000',
//       fontSize: '12px',
//       opacity: 1,
//       textTransform: 'uppercase', // optional
//     },
//                 }}
//               />
          
//             <Button
//               sx={{
//                 color: '#000',
//                 border: '0.1px solid #000',
//                 cursor: 'pointer',
//                 textTransform: 'none',
//                 display: 'flex',
//                 justifyContent: 'space-between',
                
//                 width: {
//                   xl:isSidebarOpen ? '20%' : '20%',
//                   lg:isSidebarOpen ? '21%' : '21%',
//                   md: '45%',
//                   sm: '100%',
//                   xs: '100%',
//                 },
//                 height: '65%',
//                 mt: {
//                   xs: '10px',lg:0,xl:0
//                 },
//                 mb: {
//                   xs: '10px'
//                 },
             
//               }}
//               onClick={handleDownloadReport}
//             >
//               <DownloadIcon sx={{ marginLeft: '1px' }} />
//               <Typography sx={{
//                 fontSize: isSidebarOpen ? '12px' : '12px',
//                  color: '#000',
//                 //  fontWeight :'bold',
//                 textTransform:'uppercase'
//               }} >Download Report</Typography>
//             </Button>
//             <Button
//               sx={{
//                 // color: '#23CCEF',
                
//                 // border: '0.1px solid #23CCEF',
//                   cursor: 'pointer',
//                   border: '0.1px solid #000',
//                   color: '#000',
//                   fontWeight:'bold',
//                 textTransform: 'uppercase',
//                 display: 'flex',
//                 justifyContent: 'space-between',
               
//                 width: {
//                   xl:isSidebarOpen ? '20%' : '20%',
//                   lg:isSidebarOpen ? '20%' : '20%',
//                   md: '45%',
//                   sm: '100%',
//                   xs: '100%',
//                 },
//                 height: '65%',
               
//               }}
//               onClick={handleDownloadPDF}
//             >
//               <DownloadIcon />
//               <Typography sx={{
//                 fontSize: isSidebarOpen ? '12px' : '12px',
//                 // fontWeight:'bold'
//               }}>Download PDF</Typography>
//             </Button>

//         </Box>

//         <StyledDataGrid rows={rows}
//           columns={columns(handleDeleteBill, handleEditBill)}
//           initialState={{
//             pagination: {
//               paginationModel: { page: 0, pageSize: 5 },
//             },
//           }}
//           pageSizeOptions={[5, 10, 15,25,35,45,55,100]}
//           sx={{ paddingRight: 0.5, paddingLeft: 0.5, marginTop: 2 }}
//         />
      
//         <Modal open={billOpen} onClose={handleAddBillClose}>
//           <AddReceiptModal open={billOpen} handleClose={handleAddBillClose} handleAddBill={handleAddBill}
//             currentBill={currentBill}
//             editBill={(billId, billData) => {
//               dispatch(editBill(billId, billData));
//               dispatch(fetchBills());
//             }}
//           />
//         </Modal>
//         <Modal open={addPaymentOpen} onClose={handleAddPaymentClose}>
//           <AddPayment open={addPaymentOpen} handleClose={handleAddPaymentClose} selectedBill={selectedBill} />
//         </Modal>
//       </Box>
//     </div>
//   );
// };
// export default Formonetwentynew;



// ===================================================================================





// =========================================================

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchBills, addBill, updateBillStatusAction, deleteBill, editBill } from '../store/actions/billActions';
// import { DataGrid } from '@mui/x-data-grid';
// import { Typography, Box, Button, Modal, TextField, MenuItem, Select, InputLabel, FormControl, InputAdornment } from '@mui/material';
// import CheckIcon from '@mui/icons-material/Check';
// import AddPayment from '../components/modals/AddPayment';
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import './ConsumerBill.css';
// import { styled } from '@mui/material/styles';
// import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
// import IconButton from '@mui/material/IconButton';
// import DownloadIcon from '@mui/icons-material/Download';
// import EditIcon from '@mui/icons-material/Edit';
// import ExcelJS from 'exceljs';
// import { CircularProgress } from '@mui/material';
// import { AddReceiptModal } from '../components/modals/AddReceipt';
// import wardDataAtoI from '../data/warddataAtoI';
// import MonthYearPicker from '../components/MonthYearPickerFormoneTwenty';
// import SearchIcon from '@mui/icons-material/Search';
// import html2pdf from 'html2pdf.js';

// const Formonetwentynew = () => {
//   const dispatch = useDispatch();
//   const { bills, loading, error } = useSelector((state) => state.bills);
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const user = useSelector(state => state.auth.user);

//   // Filter States
//   const [cnId, setCnId] = useState('');
//   const [wardName, setWardName] = useState('');
//   const [cRDate, setCRDate] = useState('');

//   // Modal States
//   const [billOpen, setBillOpen] = useState(false);
//   const [currentBill, setCurrentBill] = useState(null);
//   const [addPaymentOpen, setAddPaymentOpen] = useState(false);
//   const [selectedBill, setSelectedBill] = useState(null);

//   // Counts (kept for future use)
//   const [normalMeterCount, setNormalMeterCount] = useState(0);
//   const [faultyMeterCount, setFaultyMeterCount] = useState(0);
//   const [averageMeterCount, setAverageMeterCount] = useState(0);
//   const [billPaid, setBillPaid] = useState(0);
//   const [billUnPaid, setBillUnPaid] = useState(0);

//   // Button Enable States (your original logic preserved)
//   const [processBtnEnabled, setProcessBtnEnabled] = useState(false);
//   const [rollbackBtnEnabled, setRollbackBtnEnabled] = useState(false);
//   const [processExeBtnEnabled, setProcessExeBtnEnabled] = useState(false);
//   const [rollbackExeBtnEnabled, setRollbackExeBtnEnabled] = useState(false);
//   const [processAdmBtnEnabled, setProcessAdmBtnEnabled] = useState(false);
//   const [rollbackAdmBtnEnabled, setRollbackAdmBtnEnabled] = useState(false);
//   const [processSuperAdmBtnEnabled, setProcessSuperAdmBtnEnabled] = useState(false);
//   const [rollbackSuperAdmBtnEnabled, setRollbackSuperAdmBtnEnabled] = useState(false);

//   useEffect(() => {
//     dispatch(fetchBills());
//   }, [dispatch]);

//   // Meter & Payment Counts
//   useEffect(() => {
//     if (bills) {
//       setNormalMeterCount(bills.filter(b => b.meterStatus === 'NORMAL').length);
//       setFaultyMeterCount(bills.filter(b => b.meterStatus === 'FAULTY').length);
//       setAverageMeterCount(bills.filter(b => b.meterStatus === 'AVERAGE').length);
//       setBillPaid(bills.filter(b => b.paymentStatus === 'paid').length);
//       setBillUnPaid(bills.filter(b => b.paymentStatus === 'unpaid').length);
//     }
//   }, [bills]);

//   // Role-based Process/Rollback Button Logic (exactly your original logic)
//   useEffect(() => {
//     const checkProcessBtnEnable = () => {
//       if (user.role === 'Junior Engineer') {
//         const pendingForJuniorCount = bills.filter(item => item.approvedStatus === 'PendingForJuniorEngineer').length;
//         const pendingForExecutiveCount = bills.filter(item => item.approvedStatus === 'PendingForExecutiveEngineer').length;

//         if (pendingForExecutiveCount > pendingForJuniorCount) {
//           setRollbackBtnEnabled(true);
//           setProcessBtnEnabled(false);
//         } else {
//           if (pendingForJuniorCount > 1) {
//             setProcessBtnEnabled(true);
//             setRollbackBtnEnabled(false);
//           } else if (pendingForJuniorCount === 1) {
//             setProcessBtnEnabled(false);
//             setRollbackBtnEnabled(true);
//           } else {
//             setProcessBtnEnabled(false);
//             setRollbackBtnEnabled(true);
//           }
//         }
//       } else if (user.role === 'Executive Engineer') {
//         const pendingForExecutiveCount = bills.filter(item => item.approvedStatus === 'PendingForExecutiveEngineer').length;
//         const pendingForAdminCount = bills.filter(item => item.approvedStatus === 'PendingForAdminEngineer').length;
//         if (pendingForAdminCount > pendingForExecutiveCount) {
//           setRollbackExeBtnEnabled(true);
//           setProcessExeBtnEnabled(false);
//         } else {
//           setRollbackExeBtnEnabled(false);
//           setProcessExeBtnEnabled(true);
//         }
//       } else if (user.role === 'Admin') {
//         const pendingForAdminCount = bills.filter(item => item.approvedStatus === 'PendingForAdmin').length;
//         const pendingForSuperAdminCount = bills.filter(item => item.approvedStatus === 'PendingForSuperAdmin').length;
//         if (pendingForSuperAdminCount > pendingForAdminCount) {
//           setRollbackAdmBtnEnabled(true);
//           setProcessAdmBtnEnabled(false);
//         } else {
//           setRollbackAdmBtnEnabled(false);
//           setProcessAdmBtnEnabled(true);
//         }
//       } else if (user.role === 'Super Admin') {
//         const pendingForSuperAdminCount = bills.filter(item => item.approvedStatus === 'PendingForSuperAdmin').length;
//         const DoneCount = bills.filter(item => item.approvedStatus === 'Done').length;
//         if (DoneCount > pendingForSuperAdminCount) {
//           setRollbackSuperAdmBtnEnabled(true);
//           setProcessSuperAdmBtnEnabled(false);
//         } else {
//           setRollbackSuperAdmBtnEnabled(false);
//           setProcessSuperAdmBtnEnabled(true);
//         }
//       }
//     };
//     if (bills && user?.role) checkProcessBtnEnable();
//   }, [bills, user?.role]);

//   // Filter Bills by User Role
//   const getFilteredBills = () => {
//     if (user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user.ward === 'Head Office')) {
//       return bills || [];
//     } else if (user?.role?.startsWith('Junior Engineer')) {
//       return (bills || []).filter(bill => bill.ward === user?.ward);
//     }
//     return [];
//   };

//   const filteredBills = getFilteredBills();

//   // Apply Search Filters: Consumer ID, Ward, Month-Year
//   let displayData = filteredBills;

//   if (cnId) {
//     displayData = displayData.filter(bill => bill.consumerNumber?.toString().trim() === cnId.trim());
//   }
//   if (wardName) {
//     displayData = displayData.filter(bill => bill.ward === wardName);
//   }
//   if (cRDate) {
//     const crDateObj = new Date(cRDate);
//     const cRYear = crDateObj.getFullYear();
//     const cRMonth = crDateObj.getMonth();
//     displayData = displayData.filter(bill => {
//       if (bill.currentReadingDate) {
//         const billDateObj = new Date(bill.currentReadingDate);
//         return billDateObj.getFullYear() === cRYear && billDateObj.getMonth() === cRMonth;
//       }
//       return false;
//     });
//   }

//   // Rows with Serial Number (ID)
//   const rows = displayData.map((bill, index) => ({
//     id: index + 1, // This is your "क्र.म." column
//     _id: bill._id,
//     dueDateMonth: new Date(bill.currentReadingDate).toLocaleString('en-US', { month: 'long' }),
//     consumerNumber: bill.consumerNumber,
//     meterNumber: bill?.meterNumber || '-',
//     ward: bill?.ward || '-',
//     contactNumber: bill?.contactNumber || '-',
//     totalConsumption: bill.totalConsumption || 0,
//     previousReadingDate: bill.previousReadingDate ? new Date(bill.previousReadingDate).toLocaleDateString('en-GB') : '-',
//     previousReading: bill.previousReading || '-',
//     currentReadingDate: bill.currentReadingDate ? new Date(bill.currentReadingDate).toLocaleDateString('en-GB') : '-',
//     currentReading: bill.currentReading || '-',
//     netBillAmount: bill.netBillAmount || 0,
//     dueDate: bill.dueDate ? new Date(bill.dueDate).toLocaleDateString('en-GB') : '-',
//     meterStatus: bill.meterStatus || '-',
//     netLoad: bill.netLoad || '-',
//     sanctionedLoad: bill?.sanctionedLoad || '-',
//     phaseType: bill?.phaseType || '-',
//     receiptNoBillPayment: bill.receiptNoBillPayment || '-',
//     billPaymentDate: bill.billPaymentDate || '-',
//     paidAmount: bill.paidAmount || 0,
//     approvedStatus: bill.approvedStatus || 'PendingForJuniorEngineer',
//     forwardForGeneration: bill.forwardForGeneration,
//   }));

//   // Columns with "क्र.म." as first column
//   const columns = [
//     { field: 'id', headerName: 'क्र.म.', width: 90, sortable: false },
//     { field: 'dueDateMonth', headerName: 'महिना', width: 130 },
//     { field: 'consumerNumber', headerName: 'ग्राहक क्रमांक', width: 140 },
//     { field: 'meterNumber', headerName: 'मीटर क्रमांक', width: 140 },
//     { field: 'ward', headerName: 'प्रभाग समिती', width: 140 },
//     { field: 'contactNumber', headerName: 'ग्राहक संपर्क क्रमांक', width: 150 },
//     { field: 'totalConsumption', headerName: 'एकूण वापर युनिट संख्या', width: 150 },
//     { field: 'previousReadingDate', headerName: 'मागील रीडिंग दिनांक', width: 150 },
//     { field: 'previousReading', headerName: 'मागील रीडिंग', width: 120 },
//     { field: 'currentReadingDate', headerName: 'चालू रीडिंग दिनांक', width: 150 },
//     { field: 'currentReading', headerName: 'चालू रीडिंग', width: 120 },
//     { field: 'netBillAmount', headerName: 'देयकाची रक्कम', width: 140 },
//     { field: 'dueDate', headerName: 'देयकाची अंतिम तारीख', width: 150 },
//     { field: 'meterStatus', headerName: 'मीटरची स्थिती', width: 130 },
//     { field: 'netLoad', headerName: 'एकूण भार', width: 120 },
//     { field: 'sanctionedLoad', headerName: 'मंजूर भार', width: 120 },
//     { field: 'phaseType', headerName: 'फेज प्रकार', width: 120 },
//     { field: 'receiptNoBillPayment', headerName: 'पावती क्रमांक', width: 140 },
//     { field: 'billPaymentDate', headerName: 'बिल भरणा तारीख', width: 150 },
//     { field: 'paidAmount', headerName: 'भरणा रक्कम', width: 130 },

//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 120,
//       sortable: false,
//       renderCell: (params) => (
//         <IconButton
//           sx={{ color: '#23CCEF' }}
//           onClick={() => handleEditBill(params.row)}
//           disabled={user.role === 'Junior Engineer' && ['PendingForExecutiveEngineer', 'PendingForAdmin', 'PendingForSuperAdmin', 'Done'].includes(params.row.approvedStatus)}
//         >
//           <EditIcon />
//         </IconButton>
//       ),
//     },
//   ];

//   // Handlers
//   const handleChange = (e) => setCnId(e.target.value.trim());
//   const handleChangeWard = (e) => setWardName(e.target.value);
//   const handleCRDChange = (value) => setCRDate(value);

//   const handleEditBill = (bill) => {
//     setCurrentBill(bill);
//     setBillOpen(true);
//   };

//   const handleAddBillClose = () => {
//     setBillOpen(false);
//     setCurrentBill(null);
//   };

//   // Excel Download
//   const handleDownloadReport = async () => {
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Bills');

//     const titles = ['नमुना नं १२०', '(नियम १४७) (२) पहा )', 'वसई - विरार शहर महानगरपालिका', '२०-२० या वर्षांची विद्युत शक्तीच्या खपाची मीटर नोंद'];
//     titles.forEach((title, i) => {
//       const row = worksheet.getRow(i + 1);
//       row.getCell(1).value = title;
//       worksheet.mergeCells(i + 1, 1, i + 1, 16);
//       row.getCell(1).alignment = { horizontal: 'center', vertical: 'center' };
//       row.height = title.includes('महानगरपालिका') ? 42 : 32;
//       row.getCell(1).font = { bold: true, size: title.includes('महानगरपालिका') ? 20 : 18 };
//     });

//     worksheet.addRow([]); // empty row
//     const headers = ['मीटर क्रमांक','ग्राहक संपर्क क्रमांक','महिना','एकूण युनिट','मागील रीडिंग दिनांक','मागील रीडिंग','चालू रीडिंग दिनांक','चालू रीडिंग','देयकाची रक्कम','देयकाची अंतिम तारीख','मीटरची स्थिती','एकूण भार','मंजूर भार','फेज प्रकार','पावती क्रमांक','बिल भरणा तारीख'];
//     worksheet.addRow(headers).font = { bold: true };

//     rows.forEach(r => {
//       worksheet.addRow([
//         r.meterNumber, r.contactNumber, r.dueDateMonth, r.totalConsumption,
//         r.previousReadingDate, r.previousReading, r.currentReadingDate, r.currentReading,
//         r.netBillAmount, r.dueDate, r.meterStatus, r.netLoad, r.sanctionedLoad,
//         r.phaseType, r.receiptNoBillPayment, r.billPaymentDate
//       ]);
//     });

//     const buffer = await workbook.xlsx.writeBuffer();
//     const blob = new Blob([buffer], { type: 'application/octet-stream' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'Form120_Report.xlsx';
//     link.click();
//   };

//   // PDF Download (html2pdf - fully working)
//   const handleDownloadPDF = () => {
//     const container = document.createElement('div');
//     container.innerHTML = `
//       <div style="font-family: Arial; padding: 20px;">
//         <div style="text-align: center; margin-bottom: 30px;">
//           <h1>नमुना नं १२०</h1>
//           <h2>(नियम १४७) (२) पहा )</h2>
//           <h1>वसई - विरार शहर महानगरपालिका</h1>
//           <h2>२०-२० या वर्षांची विद्युत शक्तीच्या खपाची मीटर नोंद</h2>
//         </div>
//         ${Object.keys(rows.reduce((acc, r) => {
//           const y = new Date(r.currentReadingDate).getFullYear();
//           acc[y] = acc[y] || []; acc[y].push(r); return acc;
//         }, {})).map(year => `
//           <h3 style="background:#f0f0f0;padding:10px;">वर्ष: ${year}</h3>
//           <table border="1" style="width:100%;border-collapse:collapse;font-size:14px;">
//             <thead><tr style="background:#f5f5f5;">
//               <th>क्र.म.</th><th>महिना</th><th>ग्राहक क्रमांक</th><th>मीटर क्रमांक</th><th>प्रभाग</th>
//               <th>एकूण युनिट</th><th>मागील रीडिंग</th><th>चालू रीडिंग</th><th>देयक रक्कम</th><th>देय तारीख</th>
//               <th>पावती क्र.</th><th>भरणा तारीख</th><th>भरणा रक्कम</th>
//             </tr></thead>
//             <tbody>
//               ${rows.filter(r => new Date(r.currentReadingDate).getFullYear() == year).map(r => `
//                 <tr>
//                   <td>${r.id}</td><td>${r.dueDateMonth}</td><td>${r.consumerNumber}</td><td>${r.meterNumber}</td>
//                   <td>${r.ward}</td><td>${r.totalConsumption}</td><td>${r.previousReading}</td><td>${r.currentReading}</td>
//                   <td>${r.netBillAmount}</td><td>${r.dueDate}</td><td>${r.receiptNoBillPayment}</td>
//                   <td>${r.billPaymentDate}</td><td>${r.paidAmount}</td>
//                 </tr>`).join('')}
//             </tbody>
//           </table><div style="page-break-after:always;"></div>
//         `).join('')}
//       </div>`;

//     document.body.appendChild(container);
//     html2pdf()
//       .set({ margin: 10, filename: 'Form120.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'mm', format: 'a3', orientation: 'landscape' } })
//       .from(container)
//       .save()
//       .then(() => document.body.removeChild(container));
//   };

//   if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div style={{ width: isSidebarOpen ? '80%' : '90%', marginLeft: isSidebarOpen ? '19%' : '7%', transition: 'margin-left 0.3s', padding: '30px 0', marginTop: '1vh' }}>
//       <Box sx={{ textAlign: 'center', mb: 4 }}>
//         <Typography variant="h5">नमुना नं १२०</Typography>
//         <Typography>(नियम १४७) (२) पहा )</Typography>
//         <Typography variant="h4" sx={{ fontWeight: 'bold', my: 1 }}>वसई - विरार शहर महानगरपालिका</Typography>
//         <Typography variant="h6">२०-२० या वर्षांची विद्युत शक्तीच्या खपाची मीटर नोंद</Typography>
//       </Box>

//       <Box sx={{ border: '1px solid #F7F7F8', p: 3 }}>
//         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3, alignItems: 'center' }}>
//           <MonthYearPicker cRDate={cRDate} handleCRDChange={handleCRDChange} />

//           {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
//             <FormControl size="small" sx={{ minWidth: 200 }}>
//               <InputLabel>Search Ward</InputLabel>
//               <Select value={wardName} onChange={handleChangeWard} label="Search Ward">
//                 {wardDataAtoI.map(w => <MenuItem key={w.ward} value={w.ward}>{w.ward}</MenuItem>)}
//               </Select>
//             </FormControl>
//           )}

//           <TextField
//             size="small"
//             placeholder="CONSUMER ID"
//             value={cnId}
//             onChange={handleChange}
//             InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
//             sx={{ width: 220 }}
//           />

//           <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleDownloadReport}>Download Excel</Button>
//           <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownloadPDF}>Download PDF</Button>
//         </Box>

//         <StyledDataGrid
//           rows={rows}
//           columns={columns}
//           pageSizeOptions={[10, 25, 50, 100]}
//           initialState={{ pagination: { paginationModel: { pageSize: 25 } } }}
//           disableRowSelectionOnClick
//         />

//         <Modal open={billOpen} onClose={handleAddBillClose}>
//           <AddReceiptModal
//             open={billOpen}
//             handleClose={handleAddBillClose}
//             handleAddBill={(data) => dispatch(addBill(data))}
//             currentBill={currentBill}
//             editBill={(id, data) => { dispatch(editBill(id, data)); dispatch(fetchBills()); }}
//           />
//         </Modal>
//       </Box>
//     </div>
//   );
// };

// const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
//   '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 'bold', fontSize: '14px' },
// }));

// export default Formonetwentynew;


// ==========================================================


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchBills, editBill } from '../store/actions/billActions';
// import { DataGrid } from '@mui/x-data-grid';
// import {
//   Typography, Box, Button, Modal, TextField,
//   Select, MenuItem, InputLabel, FormControl, InputAdornment
// } from '@mui/material';
// import DownloadIcon from '@mui/icons-material/Download';
// import EditIcon from '@mui/icons-material/Edit';
// import IconButton from '@mui/material/IconButton';
// import SearchIcon from '@mui/icons-material/Search';
// import ExcelJS from 'exceljs';
// import { CircularProgress } from '@mui/material';
// import { AddReceiptModal } from '../components/modals/AddReceipt';
// import wardDataAtoI from '../data/warddataAtoI';
// import BillDatePicker from '../components/BillDatePicker'; // Same picker as ConsumerBill
// import html2pdf from 'html2pdf.js';
// import { styled } from '@mui/material/styles';

// const Formonetwentynew = () => {
//   const dispatch = useDispatch();
//   const { bills: serverBills, loading, error } = useSelector((state) => state.bills);
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const user = useSelector((state) => state.auth.user);

//   // Filters - Exactly like ConsumerBill
//   const [cnId, setCnId] = useState('');
//   const [wardName, setWardName] = useState('');
//   const [selectedMonthYear, setSelectedMonthYear] = useState(''); // e.g. "NOV-2025"
//   const [allBills, setAllBills] = useState([]);

//   // Modal
//   const [billOpen, setBillOpen] = useState(false);
//   const [currentBill, setCurrentBill] = useState(null);

//   // Pagination
//   const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 25 });

//   // Fetch bills whenever filters change (same logic as ConsumerBill)
//   useEffect(() => {
//     const filters = {};
//     if (cnId) filters.consumerNumber = cnId;
//     if (wardName) filters.wardName = wardName;
//     if (selectedMonthYear) filters.selectedMonthYear = selectedMonthYear;

//     dispatch(fetchBills(1, 50000, filters, true)); // fetchAll = true
//   }, [dispatch, cnId, wardName, selectedMonthYear]);

//   // Update local state when server data arrives
//   useEffect(() => {
//     if (serverBills && Array.isArray(serverBills)) {
//       setAllBills(serverBills);
//     }
//   }, [serverBills]);

//   // Role-based filtering (exactly like ConsumerBill)
//   const getRoleFilteredBills = () => {
//     if (!allBills.length) return [];

//     if (['Super Admin', 'Admin', 'Executive Engineer'].includes(user?.role) ||
//         (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) {
//       return allBills;
//     }
//     if (user?.role?.startsWith('Junior Engineer')) {
//       return allBills.filter(bill => bill.ward === user.ward);
//     }
//     return [];
//   };

//   const displayBills = getRoleFilteredBills();

//   // DataGrid rows
//   const rows = displayBills.map((bill, index) => ({
//     id: paginationModel.page * paginationModel.pageSize + index + 1,
//     _id: bill._id,
//     dueDateMonth: bill.currentReadingDate
//       ? new Date(bill.currentReadingDate).toLocaleString('en-US', { month: 'long', year: 'numeric' })
//       : '-',
//     consumerNumber: bill.consumerNumber || '-',
//     meterNumber: bill.meterNumber || '-',
//     ward: bill.ward || '-',
//     contactNumber: bill.contactNumber || '-',
//     totalConsumption: bill.totalConsumption || 0,
//     previousReading: bill.previousReading || '-',
//     currentReading: bill.currentReading || '-',
//     netBillAmount: bill.netBillAmount || 0,
//     dueDate: bill.dueDate ? new Date(bill.dueDate).toLocaleDateString('en-GB') : '-',
//     paidAmount: bill.paidAmount || 0,
//     approvedStatus: bill.approvedStatus || 'PendingForJuniorEngineer',
//   }));

//   const columns = [
//     { field: 'id', headerName: 'क्र.म.', width: 80, sortable: false },
//     { field: 'dueDateMonth', headerName: 'महिना व वर्ष', width: 150 },
//     { field: 'consumerNumber', headerName: 'ग्राहक क्र.', width: 140 },
//     { field: 'meterNumber', headerName: 'मीटर क्र.', width: 140 },
//     { field: 'ward', headerName: 'प्रभाग', width: 130 },
//     { field: 'contactNumber', headerName: 'संपर्क क्र.', width: 140 },
//     { field: 'totalConsumption', headerName: 'एकूण युनिट', width: 130 },
//     { field: 'previousReading', headerName: 'मागील रीडिंग', width: 130 },
//     { field: 'currentReading', headerName: 'चालू रीडिंग', width: 130 },
//     { field: 'netBillAmount', headerName: 'देय रक्कम', width: 130 },
//     { field: 'dueDate', headerName: 'देय तारीख', width: 130 },
//     { field: 'paidAmount', headerName: 'भरणा रक्कम', width: 130 },
//     {
//       field: 'actions',
//       headerName: 'संपादन',
//       width: 100,
//       sortable: false,
//       renderCell: (params) => (
//         <IconButton
//           color="primary"
//           onClick={() => handleEditBill(params.row)}
//           disabled={user?.role === 'Junior Engineer' &&
//             ['PendingForExecutiveEngineer', 'PendingForAdmin', 'PendingForSuperAdmin', 'Done'].includes(params.row.approvedStatus)}
//         >
//           <EditIcon />
//         </IconButton>
//       ),
//     },
//   ];

//   const handleEditBill = (bill) => {
//     setCurrentBill(bill);
//     setBillOpen(true);
//   };

//   const handleCloseModal = () => {
//     setBillOpen(false);
//     setCurrentBill(null);
//   };

//   // Excel Download
//   const handleDownloadExcel = async () => {
//     const workbook = new ExcelJS.Workbook();
//     const sheet = workbook.addWorksheet('Form 120');

//     // Header titles
//     ['नमुना नं १२०', '(नियम १४७)(२) पहा )', 'वसई - विरार शहर महानगरपालिका',
//       '२०-२० या वर्षांची विद्युत शक्तीच्या खपाची मीटर नोंद'].forEach((t, i) => {
//       const row = sheet.getRow(i + 1);
//       row.getCell(1).value = t;
//       sheet.mergeCells(i + 1, 1, i + 1, 15);
//       row.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
//       row.height = t.includes('महानगरपालिका') ? 40 : 30;
//       row.getCell(1).font = { bold: true, size: t.includes('महानगरपालिका') ? 18 : 14 };
//     });

//     sheet.addRow([]);
//     sheet.addRow(['क्र.म.', 'महिना व वर्ष', 'ग्राहक क्र.', 'मीटर क्र.', 'प्रभाग', 'संपर्क',
//       'एकूण युनिट', 'मागील रीडिंग', 'चालू रीडिंग', 'देय रक्कम', 'देय तारीख', 'भरणा रक्कम'])
//       .font = { bold: true };

//     displayBills.forEach((b, i) => {
//       sheet.addRow([
//         i + 1,
//         b.currentReadingDate ? new Date(b.currentReadingDate).toLocaleString('en-US', { month: 'long', year: 'numeric' }) : '-',
//         b.consumerNumber || '-',
//         b.meterNumber || '-',
//         b.ward || '-',
//         b.contactNumber || '-',
//         b.totalConsumption || 0,
//         b.previousReading || '-',
//         b.currentReading || '-',
//         b.netBillAmount || 0,
//         b.dueDate ? new Date(b.dueDate).toLocaleDateString('en-GB') : '-',
//         b.paidAmount || 0,
//       ]);
//     });

//     const buffer = await workbook.xlsx.writeBuffer();
//     const blob = new Blob([buffer]);
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = `Form120_${selectedMonthYear || 'All'}_${wardName || 'All'}.xlsx`;
//     link.click();
//   };

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <div style={{ width: isSidebarOpen ? '80%' : '90%', marginLeft: isSidebarOpen ? '19%' : '7%', padding: '20px 0' }}>
//       <Box textAlign="center" mb={4}>
//         <Typography variant="h5" fontWeight="bold">नमुना नं १२०</Typography>
//         <Typography>(नियम १४७)(२) पहा )</Typography>
//         <Typography variant="h4" fontWeight="bold" my={1}>वसई - विरार शहर महानगरपालिका</Typography>
//         <Typography variant="h6">२०-२० या वर्षांची विद्युत शक्तीच्या खपाची मीटर नोंद</Typography>
//       </Box>

//       <Box border="1px solid #eee" borderRadius={2} p={3} bgcolor="#fafafa">
//         {/* FILTERS - SAME AS CONSUMERBILL */}
//         <Box display="flex" flexWrap="wrap" gap={2} mb={3} alignItems="center">
//           {/* Month & Year Picker (same as ConsumerBill) */}
//           <BillDatePicker
//             selectedMonthYear={selectedMonthYear}
//             onChange={setSelectedMonthYear}
//           />

//           {/* Ward Dropdown for authorized users */}
//           {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' ||
//             (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
//             <FormControl size="small" sx={{ minWidth: 200 }}>
//               <InputLabel>प्रभाग</InputLabel>
//               <Select
//                 value={wardName}
//                 onChange={(e) => setWardName(e.target.value)}
//                 label="प्रभाग"
//               >
//                 <MenuItem value="">सर्व</MenuItem>
//                 {wardDataAtoI.map(w => (
//                   <MenuItem key={w.ward} value={w.ward}>{w.ward}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           )}

//           {/* Consumer Number Search */}
//           <TextField
//             size="small"
//             placeholder="ग्राहक क्रमांक"
//             value={cnId}
//             onChange={(e) => setCnId(e.target.value)}
//             InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
//             sx={{ width: 240 }}
//           />

//           <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleDownloadExcel}>
//             Excel डाउनलोड
//           </Button>
//         </Box>

//         <Typography fontWeight="bold" mb={2}>
//           एकूण नोंदी: {displayBills.length}
//         </Typography>

//         <StyledDataGrid
//           rows={rows}
//           columns={columns}
//           paginationModel={paginationModel}
//           onPaginationModelChange={setPaginationModel}
//           pageSizeOptions={[25, 50, 100]}
//           rowCount={displayBills.length}
//           paginationMode="client"
//           disableRowSelectionOnClick
//           sx={{ minHeight: 600 }}
//         />

//         <Modal open={billOpen} onClose={handleCloseModal}>
//           <AddReceiptModal
//             open={billOpen}
//             handleClose={handleCloseModal}
//             currentBill={currentBill}
//             editBill={(id, data) => {
//               dispatch(editBill(id, data));
//               dispatch(fetchBills(1, 50000, {}, true));
//             }}
//           />
//         </Modal>
//       </Box>
//     </div>
//   );
// };

// const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
//   '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 'bold' },
// }));

// export default Formonetwentynew;


// =================================================================


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBills, editBill } from '../store/actions/billActions';
import { DataGrid } from '@mui/x-data-grid';
import {
  Typography, Box, Button, Modal, TextField,
  Select, MenuItem, InputLabel, FormControl, InputAdornment
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ExcelJS from 'exceljs';
import { CircularProgress } from '@mui/material';
import { AddReceiptModal } from '../components/modals/AddReceipt';
import wardDataAtoI from '../data/warddataAtoI';
import BillDatePicker from '../components/BillDatePicker'; // Same as ConsumerBill
import html2pdf from 'html2pdf.js';
import { styled } from '@mui/material/styles';

const Formonetwentynew = () => {
  const dispatch = useDispatch();
  const { bills: serverBills, loading, error } = useSelector((state) => state.bills);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const user = useSelector(state => state.auth.user);

  // Filters - Same as ConsumerBill
  const [cnId, setCnId] = useState('');
  const [wardName, setWardName] = useState('');
  const [selectedMonthYear, setSelectedMonthYear] = useState(''); // "NOV-2025"
  const [allBills, setAllBills] = useState([]);

  // Modal
  const [billOpen, setBillOpen] = useState(false);
  const [currentBill, setCurrentBill] = useState(null);

  // Pagination
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 25 });

  // Fetch bills when filters change
  useEffect(() => {
    const filters = {};
    if (cnId) filters.consumerNumber = cnId;
    if (wardName) filters.wardName = wardName;
    if (selectedMonthYear) filters.selectedMonthYear = selectedMonthYear;

    dispatch(fetchBills(1, 50000, filters, true));
  }, [dispatch, cnId, wardName, selectedMonthYear]);

  useEffect(() => {
    if (serverBills && Array.isArray(serverBills)) {
      setAllBills(serverBills);
    }
  }, [serverBills]);

  // Role-based filtering
  const getRoleFilteredBills = () => {
    if (!allBills.length) return [];

    if (['Super Admin', 'Admin', 'Executive Engineer'].includes(user?.role) ||
        (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) {
      return allBills;
    }
    if (user?.role?.startsWith('Junior Engineer')) {
      return allBills.filter(bill => bill.ward === user.ward);
    }
    return [];
  };

  const displayBills = getRoleFilteredBills();

  const rows = displayBills.map((bill, index) => ({
    id: paginationModel.page * paginationModel.pageSize + index + 1,
    _id: bill._id,
    dueDateMonth: bill.currentReadingDate
      ? new Date(bill.currentReadingDate).toLocaleString('en-US', { month: 'long', year: 'numeric' })
      : '-',
    consumerNumber: bill.consumerNumber || '-',
    meterNumber: bill.meterNumber || '-',
    ward: bill.ward || '-',
    contactNumber: bill.contactNumber || '-',
    totalConsumption: bill.totalConsumption || 0,
    previousReading: bill.previousReading || '-',
    currentReading: bill.currentReading || '-',
    netBillAmount: bill.netBillAmount || 0,
    dueDate: bill.dueDate ? new Date(bill.dueDate).toLocaleDateString('en-GB') : '-',
    paidAmount: bill.paidAmount || 0,
    approvedStatus: bill.approvedStatus || 'PendingForJuniorEngineer',
  }));

  const columns = [
    { field: 'id', headerName: 'क्र.म.', width: 80, sortable: false },
    { field: 'dueDateMonth', headerName: 'महिना व वर्ष', width: 140 },
    { field: 'consumerNumber', headerName: 'ग्राहक क्र.', width: 140 },
    { field: 'meterNumber', headerName: 'मीटर क्र.', width: 140 },
    { field: 'ward', headerName: 'प्रभाग', width: 130 },
    { field: 'contactNumber', headerName: 'संपर्क', width: 140 },
    { field: 'totalConsumption', headerName: 'एकूण युनिट', width: 120 },
    { field: 'previousReading', headerName: 'मागील', width: 110 },
    { field: 'currentReading', headerName: 'चालू', width: 110 },
    { field: 'netBillAmount', headerName: 'देय रक्कम', width: 130 },
    { field: 'dueDate', headerName: 'देय तारीख', width: 130 },
    { field: 'paidAmount', headerName: 'भरणा', width: 110 },
    {
      field: 'actions',
      headerName: 'संपादन',
      width: 90,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          color="primary"
          size="small"
          onClick={() => handleEditBill(params.row)}
          disabled={user?.role === 'Junior Engineer' &&
            ['PendingForExecutiveEngineer', 'PendingForAdmin', 'PendingForSuperAdmin', 'Done'].includes(params.row.approvedStatus)}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  const handleEditBill = (bill) => {
    setCurrentBill(bill);
    setBillOpen(true);
  };

  const handleClose = () => {
    setBillOpen(false);
    setCurrentBill(null);
  };

  // Excel Download
  const handleDownloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Form 120');

    ['नमुना नं १२०', '(नियम १४७)(२) पहा )', 'वसई - विरार शहर महानगरपालिका', '२०-२० या वर्षांची विद्युत शक्तीच्या खपाची मीटर नोंद']
      .forEach((t, i) => {
        const row = sheet.getRow(i + 1);
        row.getCell(1).value = t;
        sheet.mergeCells(i + 1, 1, i + 1, 15);
        row.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
        row.height = t.includes('महानगरपालिका') ? 40 : 30;
        row.getCell(1).font = { bold: true, size: t.includes('महानगरपालिका') ? 18 : 14 };
      });

    sheet.addRow([]);
    sheet.addRow(['क्र.म.', 'महिना व वर्ष', 'ग्राहक क्र.', 'मीटर क्र.', 'प्रभाग', 'संपर्क', 'एकूण युनिट', 'मागील', 'चालू', 'देय रक्कम', 'देय तारीख', 'भरणा रक्कम'])
      .font = { bold: true };

    displayBills.forEach((b, i) => {
      sheet.addRow([
        i + 1,
        b.currentReadingDate ? new Date(b.currentReadingDate).toLocaleString('en-US', { month: 'long', year: 'numeric' }) : '-',
        b.consumerNumber || '-', b.meterNumber || '-', b.ward || '-', b.contactNumber || '-',
        b.totalConsumption || 0, b.previousReading || '-', b.currentReading || '-',
        b.netBillAmount || 0,
        b.dueDate ? new Date(b.dueDate).toLocaleDateString('en-GB') : '-',
        b.paidAmount || 0
      ]);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([buffer]));
    link.download = `Form120_${selectedMonthYear || 'All'}_${wardName || 'All'}.xlsx`;
    link.click();
  };

  // PDF Download - FULLY WORKING
  const handleDownloadPDF = () => {
    const content = `
      <div style="font-family: Arial; padding: 20px; direction: ltr;">
        <h1 style="text-align:center;">नमुना नं १२०</h1>
        <h2 style="text-align:center;">(नियम १४७)(२) पहा )</h2>
        <h1 style="text-align:center;">वसई - विरार शहर महानगरपालिका</h1>
        <h2 style="text-align:center;">२०-२० या वर्षांची विद्युत शक्तीच्या खपाची मीटर नोंद</h2>
        <h3 style="text-align:center; margin:20px 0;">महिना: ${selectedMonthYear || 'सर्व'}</h3>
        <table border="1" style="width:100%; border-collapse:collapse; font-size:12px; margin-top:20px;">
          <thead style="background:#f0f0f0;">
            <tr>
              <th>क्र.म.</th><th>महिना व वर्ष</th><th>ग्राहक क्र.</th><th>मीटर क्र.</th><th>प्रभाग</th>
              <th>एकूण युनिट</th><th>मागील</th><th>चालू</th><th>देय रक्कम</th><th>देय तारीख</th><th>भरणा</th>
            </tr>
          </thead>
          <tbody>
            ${displayBills.map((b, i) => `
              <tr>
                <td>${i + 1}</td>
                <td>${b.currentReadingDate ? new Date(b.currentReadingDate).toLocaleString('en-US', { month: 'long', year: 'numeric' }) : '-'}</td>
                <td>${b.consumerNumber || '-'}</td>
                <td>${b.meterNumber || '-'}</td>
                <td>${b.ward || '-'}</td>
                <td>${b.totalConsumption || 0}</td>
                <td>${b.previousReading || '-'}</td>
                <td>${b.currentReading || '-'}</td>
                <td>${b.netBillAmount || 0}</td>
                <td>${b.dueDate ? new Date(b.dueDate).toLocaleDateString('en-GB') : '-'}</td>
                <td>${b.paidAmount || 0}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>`;

    const element = document.createElement('div');
    element.innerHTML = content;
    document.body.appendChild(element);

    html2pdf()
      .set({
        margin: 10,
        filename: `Form120_${selectedMonthYear || 'All'}.pdf`,
        jsPDF: { format: 'a4', orientation: 'landscape' }
      })
      .from(element)
      .save()
      .then(() => document.body.removeChild(element));
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ width: isSidebarOpen ? '80%' : '90%', marginLeft: isSidebarOpen ? '19%' : '7%', padding: '20px 0' }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h5" fontWeight="bold">नमुना नं १२०</Typography>
        <Typography>(नियम १४७)(२) पहा )</Typography>
        <Typography variant="h4" fontWeight="bold" my={1}>वसई - विरार शहर महानगरपालिका</Typography>
        <Typography variant="h6">२०-२० या वर्षांची विद्युत शक्तीच्या खपाची मीटर नोंद</Typography>
      </Box>

      <Box border="1px solid #eee" borderRadius={2} p={3} bgcolor="#fafafa">


        {/* <Box display="flex" flexWrap="wrap" gap={2} mb={3} alignItems="center">
         
          <BillDatePicker
            selectedMonthYear={selectedMonthYear}
            onChange={setSelectedMonthYear}
            size="small"
            sx={{ width: 180}}
          />

          
          {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' ||
            (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>प्रभाग</InputLabel>
              <Select value={wardName} onChange={(e) => setWardName(e.target.value)} label="प्रभाग">
                <MenuItem value="">सर्व</MenuItem>
                {wardDataAtoI.map(w => <MenuItem key={w.ward} value={w.ward}>{w.ward}</MenuItem>)}
              </Select>
            </FormControl>
          )}

         
          <TextField
            size="small"
            placeholder="ग्राहक क्र."
            value={cnId}
            onChange={(e) => setCnId(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
            sx={{ width: 200 }}
          />

         
          <Button variant="outlined" size="large"  startIcon={<DownloadIcon /> } onClick={handleDownloadExcel} style={{color:"#737373",borderColor:"#737373"}}>
            Excel
          </Button>
          <Button variant="outlined" size="large" startIcon={<DownloadIcon />} onClick={handleDownloadPDF} style={{color:"#737373",borderColor:"#737373"}}>
            PDF डाउनलोड
          </Button>
        </Box> */}


<Box
  display="flex"
  alignItems="center"
  gap={2}
  mb={3}
  sx={{
    flexWrap: "nowrap",           // कधीच wrap होणार नाही
    overflowX: "auto",            // जर screen छोटी झाली तर horizontal scroll येईल
    pb: 1,                        // scroll बार साठी थोडी जागा
    "&::-webkit-scrollbar": {
      height: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#c1c1c1",
      borderRadius: "3px",
    },
  }}
>
  {/* 1. Bill Date Picker - आता सर्वात डावीकडे */}
  <BillDatePicker
    selectedMonthYear={selectedMonthYear}
    onChange={setSelectedMonthYear}
    size="small"
    sx={{ width: 180, flexShrink: 0 }}   // shrink होऊ देणार नाही
  />

  {/* 2. Ward Filter - फक्त ज्यांना दाखवायचा आहे त्यांनाच */}
  {(user?.role === 'Super Admin' || 
    user?.role === 'Admin' || 
    user?.role === 'Executive Engineer' ||
    (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
    <FormControl size="small" sx={{ minWidth: 160, flexShrink: 0 }}>
      <InputLabel>प्रभाग</InputLabel>
      <Select 
        value={wardName} 
        onChange={(e) => setWardName(e.target.value)} 
        label="प्रभाग"
      >
        <MenuItem value="">सर्व</MenuItem>
        {wardDataAtoI.map(w => (
          <MenuItem key={w.ward} value={w.ward}>{w.ward}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )}

  {/* 3. Consumer Search */}
  <TextField
    size="small"
    placeholder="ग्राहक क्र."
    value={cnId}
    onChange={(e) => setCnId(e.target.value)}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
    sx={{ width: 200, flexShrink: 0 }}
  />

  {/* 4. Excel Button */}
  <Button
    variant="outlined"
    startIcon={<DownloadIcon />}
    onClick={handleDownloadExcel}
    sx={{
      color: "#737373",
      borderColor: "#737373",
      flexShrink: 0,
      minWidth: "fit-content",
      whiteSpace: "nowrap",
    }}
  >
    Excel
  </Button>

  {/* 5. PDF Button */}
  <Button
    variant="outlined"
    startIcon={<DownloadIcon />}
    onClick={handleDownloadPDF}
    sx={{
      color: "#737373",
      borderColor: "#737373",
      flexShrink: 0,
      minWidth: "fit-content",
      whiteSpace: "nowrap",
    }}
  >
    PDF डाउनलोड
  </Button>
</Box>



        {/* <Typography fontWeight="bold" mb={2} color="primary">
          एकूण नोंदी: {displayBills.length}
        </Typography> */}

        <StyledDataGrid
          rows={rows}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[25, 50, 100]}
          rowCount={displayBills.length}
          paginationMode="client"
          disableRowSelectionOnClick
          sx={{ minHeight: 600 }}
        />

        <Modal open={billOpen} onClose={handleClose}>
          <AddReceiptModal
            open={billOpen}
            handleClose={handleClose}
            currentBill={currentBill}
            editBill={(id, data) => {
              dispatch(editBill(id, data));
              dispatch(fetchBills(1, 50000, {}, true));
            }}
          />
        </Modal>
      </Box>
    </div>
  );
};

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 'bold' },
}));

export default Formonetwentynew;

