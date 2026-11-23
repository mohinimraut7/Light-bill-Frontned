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
// import BillDatePicker from '../components/BillDatePicker'; // Same as ConsumerBill
// import html2pdf from 'html2pdf.js';
// import { styled } from '@mui/material/styles';

// const Formonetwentynew = () => {
//   const dispatch = useDispatch();
//   const { bills: serverBills, loading, error } = useSelector((state) => state.bills);
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const user = useSelector(state => state.auth.user);

//   // Filters - Same as ConsumerBill
//   const [cnId, setCnId] = useState('');
//   const [wardName, setWardName] = useState('');
//   const [selectedMonthYear, setSelectedMonthYear] = useState(''); // "NOV-2025"
//   const [allBills, setAllBills] = useState([]);

//   // Modal
//   const [billOpen, setBillOpen] = useState(false);
//   const [currentBill, setCurrentBill] = useState(null);

//   // Pagination
//   const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 25 });

//   // Fetch bills when filters change
//   useEffect(() => {
//     const filters = {};
//     if (cnId) filters.consumerNumber = cnId;
//     if (wardName) filters.wardName = wardName;
//     if (selectedMonthYear) filters.selectedMonthYear = selectedMonthYear;

//     dispatch(fetchBills(1, 50000, filters, true));
//   }, [dispatch, cnId, wardName, selectedMonthYear]);

//   useEffect(() => {
//     if (serverBills && Array.isArray(serverBills)) {
//       setAllBills(serverBills);
//     }
//   }, [serverBills]);

//   // Role-based filtering
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
//     { field: 'dueDateMonth', headerName: 'महिना व वर्ष', width: 140 },
//     { field: 'consumerNumber', headerName: 'ग्राहक क्र.', width: 140 },
//     { field: 'meterNumber', headerName: 'मीटर क्र.', width: 140 },
//     { field: 'ward', headerName: 'प्रभाग', width: 130 },
//     { field: 'contactNumber', headerName: 'संपर्क', width: 140 },
//     { field: 'totalConsumption', headerName: 'एकूण युनिट', width: 120 },
//     { field: 'previousReading', headerName: 'मागील', width: 110 },
//     { field: 'currentReading', headerName: 'चालू', width: 110 },
//     { field: 'netBillAmount', headerName: 'देय रक्कम', width: 130 },
//     { field: 'dueDate', headerName: 'देय तारीख', width: 130 },
//     { field: 'paidAmount', headerName: 'भरणा', width: 110 },
//     {
//       field: 'actions',
//       headerName: 'संपादन',
//       width: 90,
//       sortable: false,
//       renderCell: (params) => (
//         <IconButton
//           color="primary"
//           size="small"
//           onClick={() => handleEditBill(params.row)}
//           disabled={user?.role === 'Junior Engineer' &&
//             ['PendingForExecutiveEngineer', 'PendingForAdmin', 'PendingForSuperAdmin', 'Done'].includes(params.row.approvedStatus)}
//         >
//           <EditIcon fontSize="small" />
//         </IconButton>
//       ),
//     },
//   ];

//   const handleEditBill = (bill) => {
//     setCurrentBill(bill);
//     setBillOpen(true);
//   };

//   const handleClose = () => {
//     setBillOpen(false);
//     setCurrentBill(null);
//   };

//   // Excel Download
//   const handleDownloadExcel = async () => {
//     const workbook = new ExcelJS.Workbook();
//     const sheet = workbook.addWorksheet('Form 120');

//     ['नमुना नं १२०', '(नियम १४७)(२) पहा )', 'वसई - विरार शहर महानगरपालिका', '२०-२० या वर्षांची विद्युत शक्तीच्या खपाची मीटर नोंद']
//       .forEach((t, i) => {
//         const row = sheet.getRow(i + 1);
//         row.getCell(1).value = t;
//         sheet.mergeCells(i + 1, 1, i + 1, 15);
//         row.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
//         row.height = t.includes('महानगरपालिका') ? 40 : 30;
//         row.getCell(1).font = { bold: true, size: t.includes('महानगरपालिका') ? 18 : 14 };
//       });

//     sheet.addRow([]);
//     sheet.addRow(['क्र.म.', 'महिना व वर्ष', 'ग्राहक क्र.', 'मीटर क्र.', 'प्रभाग', 'संपर्क', 'एकूण युनिट', 'मागील', 'चालू', 'देय रक्कम', 'देय तारीख', 'भरणा रक्कम'])
//       .font = { bold: true };

//     displayBills.forEach((b, i) => {
//       sheet.addRow([
//         i + 1,
//         b.currentReadingDate ? new Date(b.currentReadingDate).toLocaleString('en-US', { month: 'long', year: 'numeric' }) : '-',
//         b.consumerNumber || '-', b.meterNumber || '-', b.ward || '-', b.contactNumber || '-',
//         b.totalConsumption || 0, b.previousReading || '-', b.currentReading || '-',
//         b.netBillAmount || 0,
//         b.dueDate ? new Date(b.dueDate).toLocaleDateString('en-GB') : '-',
//         b.paidAmount || 0
//       ]);
//     });

//     const buffer = await workbook.xlsx.writeBuffer();
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(new Blob([buffer]));
//     link.download = `Form120_${selectedMonthYear || 'All'}_${wardName || 'All'}.xlsx`;
//     link.click();
//   };

//   // PDF Download - FULLY WORKING
//   const handleDownloadPDF = () => {
//     const content = `
//       <div style="font-family: Arial; padding: 20px; direction: ltr;">
//         <h1 style="text-align:center;">नमुना नं १२०</h1>
//         <h2 style="text-align:center;">(नियम १४७)(२) पहा )</h2>
//         <h1 style="text-align:center;">वसई - विरार शहर महानगरपालिका</h1>
//         <h2 style="text-align:center;">२०-२० या वर्षांची विद्युत शक्तीच्या खपाची मीटर नोंद</h2>
//         <h3 style="text-align:center; margin:20px 0;">महिना: ${selectedMonthYear || 'सर्व'}</h3>
//         <table border="1" style="width:100%; border-collapse:collapse; font-size:12px; margin-top:20px;">
//           <thead style="background:#f0f0f0;">
//             <tr>
//               <th>क्र.म.</th><th>महिना व वर्ष</th><th>ग्राहक क्र.</th><th>मीटर क्र.</th><th>प्रभाग</th>
//               <th>एकूण युनिट</th><th>मागील</th><th>चालू</th><th>देय रक्कम</th><th>देय तारीख</th><th>भरणा</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${displayBills.map((b, i) => `
//               <tr>
//                 <td>${i + 1}</td>
//                 <td>${b.currentReadingDate ? new Date(b.currentReadingDate).toLocaleString('en-US', { month: 'long', year: 'numeric' }) : '-'}</td>
//                 <td>${b.consumerNumber || '-'}</td>
//                 <td>${b.meterNumber || '-'}</td>
//                 <td>${b.ward || '-'}</td>
//                 <td>${b.totalConsumption || 0}</td>
//                 <td>${b.previousReading || '-'}</td>
//                 <td>${b.currentReading || '-'}</td>
//                 <td>${b.netBillAmount || 0}</td>
//                 <td>${b.dueDate ? new Date(b.dueDate).toLocaleDateString('en-GB') : '-'}</td>
//                 <td>${b.paidAmount || 0}</td>
//               </tr>
//             `).join('')}
//           </tbody>
//         </table>
//       </div>`;

//     const element = document.createElement('div');
//     element.innerHTML = content;
//     document.body.appendChild(element);

//     html2pdf()
//       .set({
//         margin: 10,
//         filename: `Form120_${selectedMonthYear || 'All'}.pdf`,
//         jsPDF: { format: 'a4', orientation: 'landscape' }
//       })
//       .from(element)
//       .save()
//       .then(() => document.body.removeChild(element));
//   };

//   if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div style={{ width: isSidebarOpen ? '80%' : '90%', marginLeft: isSidebarOpen ? '19%' : '7%', padding: '20px 0' }}>
//       <Box textAlign="center" mb={4}>
//         <Typography variant="h5" fontWeight="bold">नमुना नं १२०</Typography>
//         <Typography>(नियम १४७)(२) पहा )</Typography>
//         <Typography variant="h4" fontWeight="bold" my={1}>वसई - विरार शहर महानगरपालिका</Typography>
//         <Typography variant="h6">२०-२० या वर्षांची विद्युत शक्तीच्या खपाची मीटर नोंद</Typography>
//       </Box>

//       <Box border="1px solid #eee" borderRadius={2} p={3} bgcolor="#fafafa">


//         {/* <Box display="flex" flexWrap="wrap" gap={2} mb={3} alignItems="center">
         
//           <BillDatePicker
//             selectedMonthYear={selectedMonthYear}
//             onChange={setSelectedMonthYear}
//             size="small"
//             sx={{ width: 180}}
//           />

          
//           {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' ||
//             (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
//             <FormControl size="small" sx={{ minWidth: 160 }}>
//               <InputLabel>प्रभाग</InputLabel>
//               <Select value={wardName} onChange={(e) => setWardName(e.target.value)} label="प्रभाग">
//                 <MenuItem value="">सर्व</MenuItem>
//                 {wardDataAtoI.map(w => <MenuItem key={w.ward} value={w.ward}>{w.ward}</MenuItem>)}
//               </Select>
//             </FormControl>
//           )}

         
//           <TextField
//             size="small"
//             placeholder="ग्राहक क्र."
//             value={cnId}
//             onChange={(e) => setCnId(e.target.value)}
//             InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
//             sx={{ width: 200 }}
//           />

         
//           <Button variant="outlined" size="large"  startIcon={<DownloadIcon /> } onClick={handleDownloadExcel} style={{color:"#737373",borderColor:"#737373"}}>
//             Excel
//           </Button>
//           <Button variant="outlined" size="large" startIcon={<DownloadIcon />} onClick={handleDownloadPDF} style={{color:"#737373",borderColor:"#737373"}}>
//             PDF डाउनलोड
//           </Button>
//         </Box> */}


// <Box
//   display="flex"
//   alignItems="center"
//   gap={2}
//   mb={3}
//   sx={{
//     flexWrap: "nowrap",           // कधीच wrap होणार नाही
//     overflowX: "auto",            // जर screen छोटी झाली तर horizontal scroll येईल
//     pb: 1,                        // scroll बार साठी थोडी जागा
//     "&::-webkit-scrollbar": {
//       height: "6px",
//     },
//     "&::-webkit-scrollbar-thumb": {
//       backgroundColor: "#c1c1c1",
//       borderRadius: "3px",
//     },
//   }}
// >
//   {/* 1. Bill Date Picker - आता सर्वात डावीकडे */}
//   <BillDatePicker
//     selectedMonthYear={selectedMonthYear}
//     onChange={setSelectedMonthYear}
//     size="small"
//     sx={{ width: 180, flexShrink: 0 }}   // shrink होऊ देणार नाही
//   />

//   {/* 2. Ward Filter - फक्त ज्यांना दाखवायचा आहे त्यांनाच */}
//   {(user?.role === 'Super Admin' || 
//     user?.role === 'Admin' || 
//     user?.role === 'Executive Engineer' ||
//     (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
//     <FormControl size="small" sx={{ minWidth: 160, flexShrink: 0 }}>
//       <InputLabel>प्रभाग</InputLabel>
//       <Select 
//         value={wardName} 
//         onChange={(e) => setWardName(e.target.value)} 
//         label="प्रभाग"
//       >
//         <MenuItem value="">सर्व</MenuItem>
//         {wardDataAtoI.map(w => (
//           <MenuItem key={w.ward} value={w.ward}>{w.ward}</MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   )}

//   {/* 3. Consumer Search */}
//   <TextField
//     size="small"
//     placeholder="ग्राहक क्र."
//     value={cnId}
//     onChange={(e) => setCnId(e.target.value)}
//     InputProps={{
//       startAdornment: (
//         <InputAdornment position="start">
//           <SearchIcon />
//         </InputAdornment>
//       ),
//     }}
//     sx={{ width: 200, flexShrink: 0 }}
//   />

//   {/* 4. Excel Button */}
//   <Button
//     variant="outlined"
//     startIcon={<DownloadIcon />}
//     onClick={handleDownloadExcel}
//     sx={{
//       color: "#737373",
//       borderColor: "#737373",
//       flexShrink: 0,
//       minWidth: "fit-content",
//       whiteSpace: "nowrap",
//     }}
//   >
//     Excel
//   </Button>

//   {/* 5. PDF Button */}
//   <Button
//     variant="outlined"
//     startIcon={<DownloadIcon />}
//     onClick={handleDownloadPDF}
//     sx={{
//       color: "#737373",
//       borderColor: "#737373",
//       flexShrink: 0,
//       minWidth: "fit-content",
//       whiteSpace: "nowrap",
//     }}
//   >
//     PDF डाउनलोड
//   </Button>
// </Box>



//         {/* <Typography fontWeight="bold" mb={2} color="primary">
//           एकूण नोंदी: {displayBills.length}
//         </Typography> */}

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

//         <Modal open={billOpen} onClose={handleClose}>
//           <AddReceiptModal
//             open={billOpen}
//             handleClose={handleClose}
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




// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchBills, editBill } from '../store/actions/billActions';
// import { DataGrid } from '@mui/x-data-grid';
// import {
//   Typography, Box, Button, Modal, TextField,
//   Select, MenuItem, InputLabel, FormControl, InputAdornment
// } from '@mui/material';
// // UI-only imports (redesign)
// import { Paper, Chip, Breadcrumbs, Tooltip } from '@mui/material';
// import DownloadIcon from '@mui/icons-material/Download';
// import EditIcon from '@mui/icons-material/Edit';
// import IconButton from '@mui/material/IconButton';
// import SearchIcon from '@mui/icons-material/Search';
// // UI-only icons (redesign)
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import ListAltIcon from '@mui/icons-material/ListAlt';
// import BoltIcon from '@mui/icons-material/Bolt';
// import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
// import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
// import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
// import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import ExcelJS from 'exceljs';
// import { CircularProgress } from '@mui/material';
// import { AddReceiptModal } from '../components/modals/AddReceipt';
// import wardDataAtoI from '../data/warddataAtoI';
// import BillDatePicker from '../components/BillDatePicker'; // Same as ConsumerBill
// import html2pdf from 'html2pdf.js';
// import { styled } from '@mui/material/styles';

// /* ================================================================== */
// /* UI ONLY — theme tokens & presentational helpers (no business logic) */
// /* ================================================================== */
// const T = {
//   primary: '#4F72F5',
//   primary2: '#668AFB',
//   primarySurface: '#EEF4FF',
//   primaryBorder: '#D9E5FF',
//   orange: '#F28C00',
//   orangeSurface: '#FFF5E8',
//   green: '#22B568',
//   greenSurface: '#EAF8F0',
//   red: '#F04444',
//   redSurface: '#FFF0F0',
//   bg: '#F7F9FC',
//   card: '#FFFFFF',
//   text: '#172033',
//   text2: '#71809A',
//   border: '#E5EAF2',
//   font: "'Montserrat', 'Noto Sans Devanagari', 'Mukta', sans-serif",
// };

// const TONES = {
//   blue: { fg: T.primary, bg: T.primarySurface, border: T.primaryBorder },
//   orange: { fg: T.orange, bg: T.orangeSurface, border: '#FBE1BF' },
//   green: { fg: T.green, bg: T.greenSurface, border: '#CDEFDC' },
// };

// // Display-only formatting. Row data, Excel & PDF still use the raw values.
// const formatINR = (v) => {
//   if (v === null || v === undefined || v === '' || v === '-') return '-';
//   const n = Number(v);
//   if (Number.isNaN(n)) return v;
//   return `₹ ${n.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
// };

// const formatNum = (v) => {
//   if (v === null || v === undefined || v === '' || v === '-') return '-';
//   const n = Number(v);
//   if (Number.isNaN(n)) return v;
//   return n.toLocaleString('en-IN');
// };

// const StatCard = ({ icon, label, sub, value, tone = 'blue', tooltip }) => {
//   const c = TONES[tone];
//   return (
//     <Tooltip title={tooltip || ''} placement="top" arrow disableHoverListener={!tooltip}>
//       <Paper
//         elevation={0}
//         sx={{
//           p: 1.75,
//           borderRadius: '12px',
//           border: `1px solid ${T.border}`,
//           backgroundColor: T.card,
//           display: 'flex',
//           alignItems: 'center',
//           gap: 1.5,
//           minWidth: 0,
//           boxShadow: '0 1px 2px rgba(23, 32, 51, 0.04)',
//           transition: 'box-shadow .2s ease, border-color .2s ease',
//           '&:hover': { borderColor: c.border, boxShadow: '0 6px 16px rgba(79, 114, 245, 0.08)' },
//         }}
//       >
//         <Box sx={{
//           width: 42, height: 42, flexShrink: 0, borderRadius: '10px',
//           display: 'grid', placeItems: 'center',
//           color: c.fg, backgroundColor: c.bg, '& svg': { fontSize: 22 },
//         }}>
//           {icon}
//         </Box>
//         <Box sx={{ minWidth: 0 }}>
//           <Typography sx={{ fontFamily: T.font, fontSize: 13, fontWeight: 600, color: T.text2, lineHeight: 1.5 }}>
//             {label} <Box component="span" sx={{ fontWeight: 500, fontSize: 11.5, color: '#9AA6BA' }}>· {sub}</Box>
//           </Typography>
//           <Typography sx={{ fontFamily: T.font, fontSize: 21, fontWeight: 700, color: T.text, lineHeight: 1.25, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//             {value}
//           </Typography>
//         </Box>
//       </Paper>
//     </Tooltip>
//   );
// };

// const NoRowsOverlay = () => (
//   <Box sx={{ height: '100%', minHeight: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1, color: T.text2 }}>
//     <Box sx={{ width: 52, height: 52, borderRadius: '14px', display: 'grid', placeItems: 'center', backgroundColor: T.primarySurface, color: T.primary }}>
//       <ReceiptLongIcon />
//     </Box>
//     <Typography sx={{ fontFamily: T.font, fontWeight: 700, color: T.text, fontSize: 14.5 }}>कोणत्याही नोंदी आढळल्या नाहीत</Typography>
//     <Typography sx={{ fontFamily: T.font, fontSize: 12.5 }}>महिना, प्रभाग किंवा ग्राहक क्र. बदलून पुन्हा शोधा.</Typography>
//   </Box>
// );

// const fieldSx = {
//   '& .MuiOutlinedInput-root': {
//     height: 40,
//     borderRadius: '10px',
//     backgroundColor: T.card,
//     fontFamily: T.font,
//     fontSize: 14,
//     '& fieldset': { borderColor: T.border },
//     '&:hover fieldset': { borderColor: T.primaryBorder },
//     '&.Mui-focused fieldset': { borderColor: T.primary, borderWidth: 1.5 },
//   },
//   '& .MuiInputLabel-root': { fontFamily: T.font, fontSize: 14, color: T.text2 },
//   '& .MuiInputLabel-root.Mui-focused': { color: T.primary },
// };

// const btnBase = {
//   textTransform: 'none',
//   fontFamily: T.font,
//   fontWeight: 600,
//   fontSize: 13.5,
//   borderRadius: '10px',
//   px: 2,
//   height: 40,
//   flexShrink: 0,
//   minWidth: 'fit-content',
//   whiteSpace: 'nowrap',
//   boxShadow: 'none',
// };
// /* ======================= end UI-only helpers ======================= */

// const Formonetwentynew = () => {
//   const dispatch = useDispatch();
//   const { bills: serverBills, loading, error } = useSelector((state) => state.bills);
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const user = useSelector(state => state.auth.user);

//   // Filters - Same as ConsumerBill
//   const [cnId, setCnId] = useState('');
//   const [wardName, setWardName] = useState('');
//   const [selectedMonthYear, setSelectedMonthYear] = useState(''); // "NOV-2025"
//   const [allBills, setAllBills] = useState([]);

//   // Modal
//   const [billOpen, setBillOpen] = useState(false);
//   const [currentBill, setCurrentBill] = useState(null);

//   // Pagination
//   const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 25 });

//   // Fetch bills when filters change
//   useEffect(() => {
//     const filters = {};
//     if (cnId) filters.consumerNumber = cnId;
//     if (wardName) filters.wardName = wardName;
//     if (selectedMonthYear) filters.selectedMonthYear = selectedMonthYear;

//     dispatch(fetchBills(1, 50000, filters, true));
//   }, [dispatch, cnId, wardName, selectedMonthYear]);

//   useEffect(() => {
//     if (serverBills && Array.isArray(serverBills)) {
//       setAllBills(serverBills);
//     }
//   }, [serverBills]);

//   // Role-based filtering
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
//     { field: 'id', headerName: 'क्र.म.', width: 80, sortable: false, renderCell: (params) => <span style={{ color: T.text2 }}>{params.value}</span> },
//     { field: 'dueDateMonth', headerName: 'महिना व वर्ष', width: 150 },
//     { field: 'consumerNumber', headerName: 'ग्राहक क्र.', width: 145, cellClassName: 'cell-strong' },
//     { field: 'meterNumber', headerName: 'मीटर क्र.', width: 140 },
//     {
//       field: 'ward', headerName: 'प्रभाग', width: 130,
//       renderCell: (params) => (
//         <Box component="span" sx={{ px: 1.1, py: 0.25, borderRadius: '6px', fontSize: 12.5, fontWeight: 600, color: T.primary, backgroundColor: T.primarySurface, border: `1px solid ${T.primaryBorder}` }}>
//           {params.value}
//         </Box>
//       ),
//     },
//     { field: 'contactNumber', headerName: 'संपर्क', width: 140 },
//     { field: 'totalConsumption', headerName: 'एकूण युनिट', width: 120, headerAlign: 'right', align: 'right', cellClassName: 'cell-num', renderCell: (params) => formatNum(params.value) },
//     { field: 'previousReading', headerName: 'मागील', width: 110, headerAlign: 'right', align: 'right', cellClassName: 'cell-num', renderCell: (params) => formatNum(params.value) },
//     { field: 'currentReading', headerName: 'चालू', width: 110, headerAlign: 'right', align: 'right', cellClassName: 'cell-num', renderCell: (params) => formatNum(params.value) },
//     { field: 'netBillAmount', headerName: 'देय रक्कम', width: 140, headerAlign: 'right', align: 'right', cellClassName: 'cell-num cell-strong', renderCell: (params) => formatINR(params.value) },
//     { field: 'dueDate', headerName: 'देय तारीख', width: 130, headerAlign: 'center', align: 'center' },
//     {
//       field: 'paidAmount', headerName: 'भरणा', width: 125, headerAlign: 'right', align: 'right', cellClassName: 'cell-num',
//       renderCell: (params) => (
//         <span style={{ color: Number(params.value) > 0 ? T.green : T.text2, fontWeight: Number(params.value) > 0 ? 600 : 400 }}>
//           {formatINR(params.value)}
//         </span>
//       ),
//     },
//     {
//       field: 'actions',
//       headerName: 'संपादन',
//       width: 90,
//       sortable: false,
//       headerAlign: 'center',
//       align: 'center',
//       renderCell: (params) => (
//         <IconButton
//           color="primary"
//           size="small"
//           onClick={() => handleEditBill(params.row)}
//           disabled={user?.role === 'Junior Engineer' &&
//             ['PendingForExecutiveEngineer', 'PendingForAdmin', 'PendingForSuperAdmin', 'Done'].includes(params.row.approvedStatus)}
//           sx={{
//             width: 32, height: 32, borderRadius: '8px',
//             color: T.primary, backgroundColor: T.primarySurface, border: `1px solid ${T.primaryBorder}`,
//             '&:hover': { backgroundColor: '#E1EAFF' },
//             '&.Mui-disabled': { color: '#B4BFD2', backgroundColor: '#F3F5F9', borderColor: T.border },
//           }}
//         >
//           <EditIcon fontSize="small" />
//         </IconButton>
//       ),
//     },
//   ];

//   const handleEditBill = (bill) => {
//     setCurrentBill(bill);
//     setBillOpen(true);
//   };

//   const handleClose = () => {
//     setBillOpen(false);
//     setCurrentBill(null);
//   };

//   // Excel Download
//   const handleDownloadExcel = async () => {
//     const workbook = new ExcelJS.Workbook();
//     const sheet = workbook.addWorksheet('Form 120');

//     ['नमुना नं १२०', '(नियम १४७)(२) पहा )', 'वसई - विरार शहर महानगरपालिका', '२०-२० या वर्षांची विद्युत शक्तीच्या खपाची मीटर नोंद']
//       .forEach((t, i) => {
//         const row = sheet.getRow(i + 1);
//         row.getCell(1).value = t;
//         sheet.mergeCells(i + 1, 1, i + 1, 15);
//         row.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
//         row.height = t.includes('महानगरपालिका') ? 40 : 30;
//         row.getCell(1).font = { bold: true, size: t.includes('महानगरपालिका') ? 18 : 14 };
//       });

//     sheet.addRow([]);
//     sheet.addRow(['क्र.म.', 'महिना व वर्ष', 'ग्राहक क्र.', 'मीटर क्र.', 'प्रभाग', 'संपर्क', 'एकूण युनिट', 'मागील', 'चालू', 'देय रक्कम', 'देय तारीख', 'भरणा रक्कम'])
//       .font = { bold: true };

//     displayBills.forEach((b, i) => {
//       sheet.addRow([
//         i + 1,
//         b.currentReadingDate ? new Date(b.currentReadingDate).toLocaleString('en-US', { month: 'long', year: 'numeric' }) : '-',
//         b.consumerNumber || '-', b.meterNumber || '-', b.ward || '-', b.contactNumber || '-',
//         b.totalConsumption || 0, b.previousReading || '-', b.currentReading || '-',
//         b.netBillAmount || 0,
//         b.dueDate ? new Date(b.dueDate).toLocaleDateString('en-GB') : '-',
//         b.paidAmount || 0
//       ]);
//     });

//     const buffer = await workbook.xlsx.writeBuffer();
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(new Blob([buffer]));
//     link.download = `Form120_${selectedMonthYear || 'All'}_${wardName || 'All'}.xlsx`;
//     link.click();
//   };

//   // PDF Download - FULLY WORKING
//   const handleDownloadPDF = () => {
//     const content = `
//       <div style="font-family: Arial; padding: 20px; direction: ltr;">
//         <h1 style="text-align:center;">नमुना नं १२०</h1>
//         <h2 style="text-align:center;">(नियम १४७)(२) पहा )</h2>
//         <h1 style="text-align:center;">वसई - विरार शहर महानगरपालिका</h1>
//         <h2 style="text-align:center;">२०-२० या वर्षांची विद्युत शक्तीच्या खपाची मीटर नोंद</h2>
//         <h3 style="text-align:center; margin:20px 0;">महिना: ${selectedMonthYear || 'सर्व'}</h3>
//         <table border="1" style="width:100%; border-collapse:collapse; font-size:12px; margin-top:20px;">
//           <thead style="background:#f0f0f0;">
//             <tr>
//               <th>क्र.म.</th><th>महिना व वर्ष</th><th>ग्राहक क्र.</th><th>मीटर क्र.</th><th>प्रभाग</th>
//               <th>एकूण युनिट</th><th>मागील</th><th>चालू</th><th>देय रक्कम</th><th>देय तारीख</th><th>भरणा</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${displayBills.map((b, i) => `
//               <tr>
//                 <td>${i + 1}</td>
//                 <td>${b.currentReadingDate ? new Date(b.currentReadingDate).toLocaleString('en-US', { month: 'long', year: 'numeric' }) : '-'}</td>
//                 <td>${b.consumerNumber || '-'}</td>
//                 <td>${b.meterNumber || '-'}</td>
//                 <td>${b.ward || '-'}</td>
//                 <td>${b.totalConsumption || 0}</td>
//                 <td>${b.previousReading || '-'}</td>
//                 <td>${b.currentReading || '-'}</td>
//                 <td>${b.netBillAmount || 0}</td>
//                 <td>${b.dueDate ? new Date(b.dueDate).toLocaleDateString('en-GB') : '-'}</td>
//                 <td>${b.paidAmount || 0}</td>
//               </tr>
//             `).join('')}
//           </tbody>
//         </table>
//       </div>`;

//     const element = document.createElement('div');
//     element.innerHTML = content;
//     document.body.appendChild(element);

//     html2pdf()
//       .set({
//         margin: 10,
//         filename: `Form120_${selectedMonthYear || 'All'}.pdf`,
//         jsPDF: { format: 'a4', orientation: 'landscape' }
//       })
//       .from(element)
//       .save()
//       .then(() => document.body.removeChild(element));
//   };

//   if (loading) return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//       <CircularProgress sx={{ color: T.primary }} />
//       <Typography sx={{ fontFamily: T.font, fontSize: 13, color: T.text2 }}>नोंदी लोड होत आहेत…</Typography>
//     </Box>
//   );
//   if (error) return (
//     <Box sx={{
//       width: isSidebarOpen ? '80%' : '90%', ml: isSidebarOpen ? '19%' : '7%', mt: 6, p: 3,
//       borderRadius: '12px', border: '1px solid #FAD4D4', backgroundColor: T.redSurface,
//       display: 'flex', alignItems: 'center', gap: 1.5,
//     }}>
//       <ErrorOutlineIcon sx={{ color: T.red }} />
//       <Typography component="p" sx={{ fontFamily: T.font, fontSize: 14, fontWeight: 600, color: T.text }}>Error: {error}</Typography>
//     </Box>
//   );

//   // UI-only derived display values (computed from the same displayBills used by Excel/PDF)
//   const canPickWard =
//     user?.role === 'Super Admin' ||
//     user?.role === 'Admin' ||
//     user?.role === 'Executive Engineer' ||
//     (user?.role === 'Junior Engineer' && user?.ward === 'Head Office');
//   const isWardLocked = user?.role === 'Junior Engineer' && user?.ward !== 'Head Office';
//   const totalUnits = displayBills.reduce((sum, b) => sum + (Number(b.totalConsumption) || 0), 0);
//   const totalDue = displayBills.reduce((sum, b) => sum + (Number(b.netBillAmount) || 0), 0);
//   const filterChipSx = { fontFamily: T.font, fontSize: 12, color: T.primary, backgroundColor: T.primarySurface, border: `1px solid ${T.primaryBorder}` };

//   return (
//     <div style={{ width: isSidebarOpen ? '80%' : '90%', marginLeft: isSidebarOpen ? '19%' : '7%', padding: '20px 0', fontFamily: T.font }}>
//       {/* ================= PAGE HEADER ================= */}
//       <Paper
//         elevation={0}
//         sx={{
//           mb: 2,
//           p: { xs: 2, md: 2.5 },
//           borderRadius: '14px',
//           border: `1px solid ${T.border}`,
//           backgroundColor: T.card,
//           display: 'flex',
//           flexDirection: { xs: 'column', md: 'row' },
//           alignItems: { xs: 'flex-start', md: 'center' },
//           justifyContent: 'space-between',
//           gap: 2,
//           position: 'relative',
//           overflow: 'hidden',
//           '&::before': { content: '""', position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, backgroundColor: T.orange },
//         }}
//       >
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75, minWidth: 0 }}>
//           <Box sx={{
//             width: 52, height: 52, borderRadius: '12px', flexShrink: 0,
//             display: 'grid', placeItems: 'center',
//             color: T.orange, backgroundColor: T.orangeSurface, border: '1px solid #FBE1BF',
//           }}>
//             <ReceiptLongIcon />
//           </Box>
//           <Box sx={{ minWidth: 0 }}>
//             <Breadcrumbs separator="/" sx={{ '& .MuiBreadcrumbs-separator': { mx: 0.75, color: '#B4BFD2' } }}>
//               <Typography sx={{ fontFamily: T.font, fontSize: 12, color: T.text2 }}>Home</Typography>
//               <Typography sx={{ fontFamily: T.font, fontSize: 12, color: T.text2 }}>Reports</Typography>
//               <Typography sx={{ fontFamily: T.font, fontSize: 12, color: T.primary, fontWeight: 600 }}>Form 120</Typography>
//             </Breadcrumbs>
//             <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, flexWrap: 'wrap' }}>
//               <Typography sx={{ fontFamily: T.font, fontSize: { xs: 19, md: 22 }, fontWeight: 700, color: T.text, lineHeight: 1.4 }}>नमुना नं १२०</Typography>
//               <Typography sx={{ fontFamily: T.font, fontSize: 13.5, fontWeight: 600, color: T.orange }}>(नियम १४७)(२) पहा )</Typography>
//             </Box>
//             <Typography sx={{ fontFamily: T.font, fontSize: 15, fontWeight: 700, color: T.primary, lineHeight: 1.5 }}>वसई - विरार शहर महानगरपालिका</Typography>
//             <Typography sx={{ fontFamily: T.font, fontSize: 13, color: T.text2, lineHeight: 1.6 }}>२०-२० या वर्षांची विद्युत शक्तीच्या खपाची मीटर नोंद</Typography>
//           </Box>
//         </Box>

//         <Chip
//           label={`${formatNum(displayBills.length)} नोंदी`}
//           sx={{ fontFamily: T.font, fontWeight: 700, fontSize: 12.5, height: 28, color: T.orange, backgroundColor: T.orangeSurface, border: '1px solid #FBE1BF' }}
//         />
//       </Paper>

//       {/* ================= SUMMARY CARDS (derived from loaded data only) ================= */}
//       <Box sx={{ mb: 2, display: 'grid', gap: 1.5, gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0,1fr))' } }}>
//         <StatCard tone="blue" icon={<ListAltIcon />} label="एकूण नोंदी" sub="Total Records" value={formatNum(displayBills.length)} tooltip="सध्याच्या फिल्टरनुसार नोंदी" />
//         <StatCard tone="orange" icon={<BoltIcon />} label="एकूण युनिट" sub="Total Consumption" value={formatNum(totalUnits)} tooltip="सध्याच्या फिल्टरनुसार एकूण युनिट" />
//         <StatCard tone="green" icon={<CurrencyRupeeIcon />} label="एकूण देय रक्कम" sub="Total Due" value={formatINR(totalDue)} tooltip="सध्याच्या फिल्टरनुसार एकूण देय रक्कम" />
//       </Box>

//       <Box border={`1px solid ${T.border}`} borderRadius="14px" p={{ xs: 1.5, md: 2.5 }} bgcolor={T.card} sx={{ boxShadow: '0 1px 2px rgba(23, 32, 51, 0.04)' }}>


//         {/* <Box display="flex" flexWrap="wrap" gap={2} mb={3} alignItems="center">

//           <BillDatePicker
//             selectedMonthYear={selectedMonthYear}
//             onChange={setSelectedMonthYear}
//             size="small"
//             sx={{ width: 180}}
//           />


//           {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' ||
//             (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
//             <FormControl size="small" sx={{ minWidth: 160 }}>
//               <InputLabel>प्रभाग</InputLabel>
//               <Select value={wardName} onChange={(e) => setWardName(e.target.value)} label="प्रभाग">
//                 <MenuItem value="">सर्व</MenuItem>
//                 {wardDataAtoI.map(w => <MenuItem key={w.ward} value={w.ward}>{w.ward}</MenuItem>)}
//               </Select>
//             </FormControl>
//           )}


//           <TextField
//             size="small"
//             placeholder="ग्राहक क्र."
//             value={cnId}
//             onChange={(e) => setCnId(e.target.value)}
//             InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
//             sx={{ width: 200 }}
//           />


//           <Button variant="outlined" size="large"  startIcon={<DownloadIcon /> } onClick={handleDownloadExcel} style={{color:"#737373",borderColor:"#737373"}}>
//             Excel
//           </Button>
//           <Button variant="outlined" size="large" startIcon={<DownloadIcon />} onClick={handleDownloadPDF} style={{color:"#737373",borderColor:"#737373"}}>
//             PDF डाउनलोड
//           </Button>
//         </Box> */}


// <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
//   <FilterAltOutlinedIcon sx={{ fontSize: 19, color: T.primary }} />
//   <Typography sx={{ fontFamily: T.font, fontWeight: 700, fontSize: 14, color: T.text }}>फिल्टर व रिपोर्ट</Typography>
// </Box>

// <Box
//   display="flex"
//   alignItems="center"
//   gap={1.5}
//   mb={1.5}
//   sx={{
//     flexWrap: "nowrap",           // कधीच wrap होणार नाही
//     overflowX: "auto",            // जर screen छोटी झाली तर horizontal scroll येईल
//     pb: 1,                        // scroll बार साठी थोडी जागा
//     "&::-webkit-scrollbar": {
//       height: "6px",
//     },
//     "&::-webkit-scrollbar-thumb": {
//       backgroundColor: "#c1c1c1",
//       borderRadius: "3px",
//     },
//   }}
// >
//   {/* 1. Bill Date Picker - आता सर्वात डावीकडे */}
//   <Box sx={{ ...fieldSx, flexShrink: 0 }}>
//   <BillDatePicker
//     selectedMonthYear={selectedMonthYear}
//     onChange={setSelectedMonthYear}
//     size="small"
//     sx={{ width: 180, flexShrink: 0 }}   // shrink होऊ देणार नाही
//   />
//   </Box>

//   {/* 2. Ward Filter - फक्त ज्यांना दाखवायचा आहे त्यांनाच */}
//   {(user?.role === 'Super Admin' ||
//     user?.role === 'Admin' ||
//     user?.role === 'Executive Engineer' ||
//     (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
//     <FormControl size="small" sx={{ ...fieldSx, minWidth: 160, flexShrink: 0 }}>
//       <InputLabel>प्रभाग</InputLabel>
//       <Select
//         value={wardName}
//         onChange={(e) => setWardName(e.target.value)}
//         label="प्रभाग"
//         MenuProps={{ PaperProps: { sx: { borderRadius: '10px', mt: 0.5 } } }}
//       >
//         <MenuItem value="" sx={{ fontFamily: T.font }}>सर्व</MenuItem>
//         {wardDataAtoI.map(w => (
//           <MenuItem key={w.ward} value={w.ward} sx={{ fontFamily: T.font }}>{w.ward}</MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   )}

//   {/* 3. Consumer Search */}
//   <TextField
//     size="small"
//     placeholder="ग्राहक क्र."
//     value={cnId}
//     onChange={(e) => setCnId(e.target.value)}
//     InputProps={{
//       startAdornment: (
//         <InputAdornment position="start">
//           <SearchIcon sx={{ fontSize: 19, color: T.text2 }} />
//         </InputAdornment>
//       ),
//     }}
//     sx={{ ...fieldSx, width: 200, flexShrink: 0 }}
//   />

//   <Box sx={{ flex: 1, minWidth: 8 }} />

//   {/* 4. Excel Button */}
//   <Button
//     variant="outlined"
//     startIcon={<TableChartOutlinedIcon />}
//     onClick={handleDownloadExcel}
//     sx={{
//       ...btnBase,
//       color: T.green,
//       borderColor: '#BFE8D2',
//       backgroundColor: T.greenSurface,
//       '&:hover': { borderColor: T.green, backgroundColor: '#DDF4E7' },
//     }}
//   >
//     Excel
//   </Button>

//   {/* 5. PDF Button */}
//   <Button
//     variant="contained"
//     startIcon={<PictureAsPdfOutlinedIcon />}
//     onClick={handleDownloadPDF}
//     sx={{
//       ...btnBase,
//       backgroundColor: T.primary,
//       '&:hover': { backgroundColor: '#3F61E0', boxShadow: '0 4px 12px rgba(79,114,245,.25)' },
//     }}
//   >
//     PDF डाउनलोड
//   </Button>
// </Box>

// {(selectedMonthYear || cnId || (canPickWard && wardName) || isWardLocked) && (
//   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 2 }}>
//     <Typography sx={{ fontFamily: T.font, fontSize: 12, color: T.text2, mr: 0.5 }}>सक्रिय फिल्टर:</Typography>
//     {selectedMonthYear && <Chip size="small" label={`महिना: ${selectedMonthYear}`} sx={filterChipSx} />}
//     {canPickWard && wardName && <Chip size="small" label={`प्रभाग: ${wardName}`} sx={filterChipSx} />}
//     {cnId && <Chip size="small" label={`ग्राहक क्र.: ${cnId}`} sx={filterChipSx} />}
//     {isWardLocked && (
//       <Chip
//         size="small"
//         icon={<LockOutlinedIcon sx={{ fontSize: 14 }} />}
//         label={`प्रभाग: ${user?.ward}`}
//         sx={{ fontFamily: T.font, fontSize: 12, color: T.orange, backgroundColor: T.orangeSurface, border: '1px solid #FBE1BF', '& .MuiChip-icon': { color: T.orange } }}
//       />
//     )}
//   </Box>
// )}



//         {/* <Typography fontWeight="bold" mb={2} color="primary">
//           एकूण नोंदी: {displayBills.length}
//         </Typography> */}

//         <StyledDataGrid
//           rows={rows}
//           columns={columns}
//           paginationModel={paginationModel}
//           onPaginationModelChange={setPaginationModel}
//           pageSizeOptions={[25, 50, 100]}
//           rowCount={displayBills.length}
//           paginationMode="client"
//           disableRowSelectionOnClick
//           rowHeight={48}
//           columnHeaderHeight={48}
//           slots={{ noRowsOverlay: NoRowsOverlay }}
//           sx={{ minHeight: 600 }}
//         />

//         <Modal open={billOpen} onClose={handleClose}>
//           <AddReceiptModal
//             open={billOpen}
//             handleClose={handleClose}
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
//   // UI-only table styling
//   border: `1px solid ${T.border}`,
//   borderRadius: 12,
//   backgroundColor: T.card,
//   fontFamily: T.font,
//   fontSize: 13.5,
//   color: T.text,
//   '& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeader': { backgroundColor: '#F3F6FC' },
//   '& .MuiDataGrid-columnHeaders': { borderBottom: `1px solid ${T.border}` },
//   '& .MuiDataGrid-columnHeaderTitle, & .MuiDataGrid-columnHeaderTitleContainer': {
//     fontSize: 13,
//     color: '#3E4C69',
//     lineHeight: 1.6,
//     overflow: 'visible',
//   },
//   '& .MuiDataGrid-columnSeparator': { color: T.border },
//   '& .MuiDataGrid-cell': {
//     padding: theme.spacing(0, 1.25),
//     borderBottom: `1px solid ${T.border}`,
//     display: 'flex',
//     alignItems: 'center',
//     lineHeight: 1.6,
//   },
//   '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
//     outline: 'none',
//   },
//   '& .MuiDataGrid-row': {
//     '&:nth-of-type(odd)': { backgroundColor: '#FAFBFE' },
//     '&:nth-of-type(even)': { backgroundColor: T.card },
//     '&:hover': { backgroundColor: T.primarySurface },
//   },
//   '& .MuiDataGrid-footerContainer': { borderTop: `1px solid ${T.border}`, backgroundColor: '#FBFCFE' },
//   '& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
//     fontFamily: T.font,
//     fontSize: 13,
//     color: T.text2,
//   },
//   '& .cell-num': { justifyContent: 'flex-end', fontVariantNumeric: 'tabular-nums' },
//   '& .cell-strong': { fontWeight: 600 },
// }));

// export default Formonetwentynew;





import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBills, editBill } from '../store/actions/billActions';
import { DataGrid } from '@mui/x-data-grid';
import {
  Typography, Box, Button, Modal, TextField,
  Select, MenuItem, InputLabel, FormControl, InputAdornment
} from '@mui/material';
// UI-only imports (redesign) — no logic
import { Paper, Chip, Breadcrumbs } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BoltIcon from '@mui/icons-material/Bolt';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
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
  green: '#22B568',
  greenSurface: '#EAF8F0',
  red: '#F04444',
  redSurface: '#FFF0F0',
  bg: '#F7F9FC',
  card: '#FFFFFF',
  text: '#172033',
  text2: '#71809A',
  border: '#E5EAF2',
  font: "'Montserrat', 'Noto Sans Devanagari', 'Mukta', sans-serif",
};

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

  if (loading) return <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress sx={{ color: T.primary }} /><Typography sx={{ fontFamily: T.font, fontSize: 13, color: T.text2 }}>नोंदी लोड होत आहेत…</Typography></Box>;
  if (error) return <Box sx={{ width: isSidebarOpen ? '80%' : '90%', ml: isSidebarOpen ? '19%' : '7%', mt: 6, p: 3, borderRadius: '12px', border: '1px solid #FAD4D4', backgroundColor: T.redSurface, display: 'flex', alignItems: 'center', gap: 1.5 }}><ErrorOutlineIcon sx={{ color: T.red }} /><Typography component="p" sx={{ fontFamily: T.font, fontSize: 14, fontWeight: 600, color: T.text }}>Error: {error}</Typography></Box>;

  // UI-only display values (read-only, computed from the same displayBills used by Excel/PDF)
  const uiTotalUnits = displayBills.reduce((sum, b) => sum + (Number(b.totalConsumption) || 0), 0);
  const uiTotalDue = displayBills.reduce((sum, b) => sum + (Number(b.netBillAmount) || 0), 0);
  const uiCards = [
    { label: 'एकूण नोंदी', sub: 'Total Records', value: displayBills.length.toLocaleString('en-IN'), icon: <ListAltIcon />, fg: T.primary, bg: T.primarySurface },
    { label: 'एकूण युनिट', sub: 'Total Consumption', value: uiTotalUnits.toLocaleString('en-IN'), icon: <BoltIcon />, fg: T.orange, bg: T.orangeSurface },
    { label: 'एकूण देय रक्कम', sub: 'Total Due', value: `₹ ${uiTotalDue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`, icon: <CurrencyRupeeIcon />, fg: T.green, bg: T.greenSurface },
  ];

  return (
    <div style={{ width: isSidebarOpen ? '80%' : '90%', marginLeft: isSidebarOpen ? '19%' : '7%', padding: '20px 0', fontFamily: T.font }}>
      {/* ================= PAGE HEADER (UI only) ================= */}
      <Paper
        elevation={0}
        sx={{
          mb: 2,
          p: { xs: 2, md: 2.5 },
          borderRadius: '14px',
          border: `1px solid ${T.border}`,
          backgroundColor: T.card,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          gap: 2,
          position: 'relative',
          overflow: 'hidden',
          '&::before': { content: '""', position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, backgroundColor: T.orange },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75, minWidth: 0 }}>
          <Box sx={{ width: 52, height: 52, borderRadius: '12px', flexShrink: 0, display: 'grid', placeItems: 'center', color: T.orange, backgroundColor: T.orangeSurface, border: '1px solid #FBE1BF' }}>
            <ReceiptLongIcon />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Breadcrumbs separator="/" sx={{ '& .MuiBreadcrumbs-separator': { mx: 0.75, color: '#B4BFD2' } }}>
              <Typography sx={{ fontFamily: T.font, fontSize: 12, color: T.text2 }}>Home</Typography>
              <Typography sx={{ fontFamily: T.font, fontSize: 12, color: T.text2 }}>Reports</Typography>
              <Typography sx={{ fontFamily: T.font, fontSize: 12, color: T.primary, fontWeight: 600 }}>Form 120</Typography>
            </Breadcrumbs>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="h5" fontWeight="bold" sx={{ fontFamily: T.font, fontSize: { xs: 19, md: 22 }, color: T.text, lineHeight: 1.4 }}>नमुना नं १२०</Typography>
              <Typography sx={{ fontFamily: T.font, fontSize: 13.5, fontWeight: 600, color: T.orange }}>(नियम १४७)(२) पहा )</Typography>
            </Box>
            <Typography variant="h4" fontWeight="bold" sx={{ fontFamily: T.font, fontSize: 15, color: T.primary, lineHeight: 1.5 }}>वसई - विरार शहर महानगरपालिका</Typography>
            <Typography variant="h6" sx={{ fontFamily: T.font, fontSize: 13, fontWeight: 400, color: T.text2, lineHeight: 1.6 }}>२०-२० या वर्षांची विद्युत शक्तीच्या खपाची मीटर नोंद</Typography>
          </Box>
        </Box>
        <Chip
          label={`${displayBills.length.toLocaleString('en-IN')} नोंदी`}
          sx={{ fontFamily: T.font, fontWeight: 700, fontSize: 12.5, height: 28, color: T.orange, backgroundColor: T.orangeSurface, border: '1px solid #FBE1BF' }}
        />
      </Paper>

      {/* ================= SUMMARY CARDS (UI only, read-only) ================= */}
      <Box sx={{ mb: 2, display: 'grid', gap: 1.5, gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0,1fr))' } }}>
        {uiCards.map((c) => (
          <Paper
            key={c.sub}
            elevation={0}
            sx={{
              p: 1.75, borderRadius: '12px', border: `1px solid ${T.border}`, backgroundColor: T.card,
              display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0,
              boxShadow: '0 1px 2px rgba(23, 32, 51, 0.04)',
              transition: 'box-shadow .2s ease', '&:hover': { boxShadow: '0 6px 16px rgba(79, 114, 245, 0.08)' },
            }}
          >
            <Box sx={{ width: 42, height: 42, flexShrink: 0, borderRadius: '10px', display: 'grid', placeItems: 'center', color: c.fg, backgroundColor: c.bg, '& svg': { fontSize: 22 } }}>
              {c.icon}
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontFamily: T.font, fontSize: 13, fontWeight: 600, color: T.text2, lineHeight: 1.5 }}>
                {c.label} <Box component="span" sx={{ fontWeight: 500, fontSize: 11.5, color: '#9AA6BA' }}>· {c.sub}</Box>
              </Typography>
              <Typography sx={{ fontFamily: T.font, fontSize: 21, fontWeight: 700, color: T.text, lineHeight: 1.25, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {c.value}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      <Box border={`1px solid ${T.border}`} borderRadius="14px" p={3} bgcolor={T.card} sx={{ boxShadow: '0 1px 2px rgba(23, 32, 51, 0.04)' }}>


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


<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
  <FilterAltOutlinedIcon sx={{ fontSize: 19, color: T.primary }} />
  <Typography sx={{ fontFamily: T.font, fontWeight: 700, fontSize: 14, color: T.text }}>फिल्टर व रिपोर्ट</Typography>
</Box>

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
    // UI only: same look for date picker, ward select & search field
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      backgroundColor: T.card,
      fontFamily: T.font,
    },
    "& .MuiOutlinedInput-root fieldset": { borderColor: T.border },
    "& .MuiOutlinedInput-root:hover fieldset": { borderColor: T.primaryBorder },
    "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: T.primary },
    "& .MuiInputLabel-root": { fontFamily: T.font, color: T.text2 },
    "& .MuiInputLabel-root.Mui-focused": { color: T.primary },
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
          <SearchIcon sx={{ color: T.text2 }} />
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
      color: T.green,
      borderColor: "#BFE8D2",
      backgroundColor: T.greenSurface,
      borderRadius: "10px",
      textTransform: "none",
      fontFamily: T.font,
      fontWeight: 600,
      height: 40,
      px: 2,
      "&:hover": { borderColor: T.green, backgroundColor: "#DDF4E7" },
      flexShrink: 0,
      minWidth: "fit-content",
      whiteSpace: "nowrap",
    }}
  >
    Excel
  </Button>

  {/* 5. PDF Button */}
  <Button
    variant="contained"
    startIcon={<DownloadIcon />}
    onClick={handleDownloadPDF}
    sx={{
      color: "#FFFFFF",
      backgroundColor: T.primary,
      borderRadius: "10px",
      textTransform: "none",
      fontFamily: T.font,
      fontWeight: 600,
      height: 40,
      px: 2,
      boxShadow: "none",
      "&:hover": { backgroundColor: "#3F61E0", boxShadow: "0 4px 12px rgba(79,114,245,.25)" },
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
  // ---- UI only (CSS styling, no behaviour change) ----
  border: `1px solid ${T.border}`,
  borderRadius: 12,
  backgroundColor: T.card,
  fontFamily: T.font,
  color: T.text,
  '& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeader': { backgroundColor: '#F3F6FC' },
  '& .MuiDataGrid-columnHeaders': { borderBottom: `1px solid ${T.border}` },
  '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 'bold', color: '#3E4C69', fontSize: 13.5 },
  '& .MuiDataGrid-columnSeparator': { color: T.border },
  '& .MuiDataGrid-cell': { borderBottom: `1px solid ${T.border}` },
  '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': { outline: 'none' },
  '& .MuiDataGrid-row:nth-of-type(odd)': { backgroundColor: '#FAFBFE' },
  '& .MuiDataGrid-row:hover': { backgroundColor: T.primarySurface },
  '& .MuiDataGrid-cell[data-field="consumerNumber"]': { fontWeight: 600 },
  '& .MuiDataGrid-cell[data-field="netBillAmount"]': { fontWeight: 600 },
  '& .MuiDataGrid-cell[data-field="paidAmount"]': { color: T.green, fontWeight: 600 },
  '& .MuiDataGrid-cell[data-field="actions"] .MuiIconButton-root:not(.Mui-disabled)': { backgroundColor: T.primarySurface, borderRadius: 8 },
  '& .MuiDataGrid-footerContainer': { borderTop: `1px solid ${T.border}`, backgroundColor: '#FBFCFE' },
  '& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': { fontFamily: T.font, color: T.text2 },
}));

export default Formonetwentynew;