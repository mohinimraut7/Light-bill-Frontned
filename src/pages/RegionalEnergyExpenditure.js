// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchBills, addBill,deleteBill, editBill } from '../store/actions/billActions';
// import { DataGrid } from '@mui/x-data-grid';
// import { Typography, Box,Modal,Button,TextField,MenuItem, Select, InputLabel, FormControl} from '@mui/material';
// import AddBill from '../components/modals/AddBill';
// import AddPayment from '../components/modals/AddPayment';
// import BillDatePicker from '../components/BillDatePicker';
// import wardDataAtoI from '../data/warddataAtoI';
// import meterPurposeData from '../data/meterpurpose';
// import dayjs from "dayjs";
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import {loadDevanagariFont,notoserifbase} from '../fonts/NotoSerifbase';

// import "react-toastify/dist/ReactToastify.css";
// import './ConsumerBill.css';
// import { styled } from '@mui/material/styles';
// import DownloadIcon from '@mui/icons-material/Download';
// import * as XLSX from 'xlsx';
// import { CircularProgress} from '@mui/material';
// import { baseUrl } from '../config/config';
// import axios from 'axios';

// const RegionalEnergyExpenditure = () => {
//   const dispatch = useDispatch();
//   // const { bills, loading, error } = useSelector((state) => state.bills);
//   const [bills, setBills] = useState([]);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState(null);

//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
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
//   const [meterPurposeName, setMeterPurposeName] = useState('');
//   const user = useSelector(state => state.auth.user);
//   const [data, setData] = useState([]);
//   const [selectedMonthYear, setSelectedMonthYear] = useState("");

//   // useEffect(() => {
//   //   dispatch(fetchBills());
//   // }, [dispatch, data]);


//   useEffect(() => {
//     const fetchBills = async () => {
//       try {
//         const { data } = await axios.get(`${baseUrl}/getBillsWithMeterPurpose`); // Direct API call
//         setBills(data);
//       } catch (err) {
//         console.error("Error fetching bills:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchBills();
//   }, [data]); // Dependency
  

//  const getFilteredBills = () => {
//     if (user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer') {
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

//   const handleDownloadPDF = () => {
//     try {
//       const doc = new jsPDF({ orientation: 'landscape' });
  
//       doc.addFileToVFS("NotoSerifDevanagari.ttf", notoserifbase);
//       doc.addFont("NotoSerifDevanagari.ttf", "NotoSerifDevanagari", "normal");
//       loadDevanagariFont(doc);
   
  
//           loadDevanagariFont(doc); 
//           console.log(doc.getFontList())
  
  
  
//           doc.setFont("NotoSerifDevanagari", "normal");
  
//           doc.setFontSize(16);
//       doc.setFont("NotoSerifDevanagari");
//         let yPos = 10;
//         let rowCount = 0;
  
        
//         doc.setFontSize(16);
       
//         doc.text("Namuna No. 120", 140, yPos);
//         yPos += 10;
      
//         doc.text("(Rule 147) (2) Look )", 140, yPos);
//         yPos += 10;
//         doc.setFontSize(18);
        
//         doc.text("Vasai Virar City Municipal Corporation", 110, yPos);
//         yPos += 15;
  
//         const tableHeaders = [
//             "ग्राहक क्रमांक", "मीटर क्रमांक", "ग्राहक संपर्क क्रमांक",
//             "मीटरची स्थिती", "मंजूर भार", "फेज प्रकार"
//         ];
  
//         const tableData = rows.map(row => [
//             row.consumerNumber || 'N/A',
//             row.meterNumber || 'N/A',
//             row.contactNumber || 'N/A',
//             row.meterStatus || 'N/A',
//             row.sanctionedLoad || 'N/A',
//             row.phaseType || 'N/A'
//         ]);
  
//         const groupedRows = rows.reduce((acc, row) => {
//             const year = new Date(row.currentReadingDate).getFullYear();
//             if (!acc[year]) {
//                 acc[year] = [];
//             }
//             acc[year].push(row);
//             return acc;
//         }, {});
  
//         Object.keys(groupedRows).forEach((year) => {
//             if (rowCount >= 50) {
//                 doc.addPage();
//                 yPos = 10;
//                 rowCount = 0;
//             }
  
//             doc.setFontSize(14);
//             // doc.text(`वर्ष: ${year}`, 140, yPos);
//             doc.text(`Year: ${year}`, 140, yPos);
//             yPos += 10;
  
//             // const yearlyTableHeaders = [
//             //     "महिना", "एकूण युनिट", "मागील रीडिंग दिनांक", "मागील रीडिंग",
//             //     "चालू रीडिंग दिनांक", "चालू रीडिंग", "देयकाची रक्कम",
//             //     "देयकाची अंतिम तारीख", "बिल भरणा तारीख", "एकूण भार"
//             // ];
//             const yearlyTableHeaders = [
//               "Consumer Number", "Consumer Address", "Bill Month", "Ward", "Netbill Amount", "Due Date"
//           ];
  
//             const yearlyTableData = groupedRows[year].map(row => [
//                 row.consumerNumber || 'N/A',
//                 row.consumerAddress || 'N/A',
//                 row.monthAndYear || 'N/A',
//                 row.ward || 'N/A',
//                 row.netBillAmount || 'N/A',
//                 row.dueDate || 'N/A',
//             ]);
  
//             doc.autoTable({
//                 head: [yearlyTableHeaders],
//                 body: yearlyTableData,
//                 startY: yPos,
//                 margin: { top: 20 },
//                 styles: { fontSize: 10 }
//             });
  
//             yPos = doc.autoTable.previous.finalY + 10;
//             rowCount += yearlyTableData.length;
//         });
  
//         doc.save('ConsumerBills.pdf');
//     } catch (error) {
//         console.error('Error generating PDF:', error);
//     }
//   };
  
// const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const json = XLSX.utils.sheet_to_json(worksheet);
//       setData(json);
//       console.log('Imported Data:', json);
//       data.forEach((bill) => {
//         dispatch(addBill(bill));
//       });
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const handleChangeWard = (event) => {
//     setWardName(event.target.value);
//   };
  
//   const handleChangMeterPurpose = (event) => {
//     setMeterPurposeName(event.target.value);
//   };
  
 
//   const rows = filteredBills
//   .filter((bill) => 
//     (!selectedMonthYear || bill.monthAndYear === selectedMonthYear) &&
//     (!wardName || bill.ward === wardName) &&
//     (!meterPurposeName || bill.meterPurpose === meterPurposeName)
//   ).map((bill, index) => ({
//     _id: bill._id,
//     id: index + 1,
//     consumerNumber:bill.consumerNumber,
//     consumerAddress:bill.consumerAddress,
//     ward: bill?.ward,
//     monthAndYear: bill?.monthAndYear,
//     meterPurpose: bill?.meterPurpose,
//     netBillAmount: bill.netBillAmount,
//     dueDate: formatDate(bill.dueDate),
//   }));
// const columns = () => [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'consumerNumber', headerName: 'CONSUMER NO.', width: 200 },
//     { field: 'consumerAddress', headerName: 'CONSUMER ADDRESS', width: 130 },
//     { field: 'monthAndYear', headerName: 'BILL MONTH', width: 130 },
//     { field: 'meterPurpose', headerName: 'METER P', width: 130 },
//     { field: 'ward', headerName: 'WARD', width: 130 },
//    { field: 'netBillAmount', headerName: 'NET BILL AMOUNT', width: 200 },
//    { field: 'dueDate', headerName: 'DUE DATE', width: 130 },
//   ];
//   const getPadding = () => {
//     const width = window.innerWidth;
    
//     if (width <= 480) { 
//       return '80px 20px';
//     } else if (width <= 600) { 
//       return '80px 10px';
//     } else if (width <= 900) { 
//       return '60px 10px';
//     } else {
//       return '30px 10px';
//     }
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

//   const handleDeleteBill = (billId) => {
//     dispatch(deleteBill(billId));
//   };

//   const handleEditBill = (bill) => {
//     setCurrentBill(bill);
//     setBillOpen(true);
//   };
//   const handleDateChange = (value) => {
//     const formattedValue = dayjs(value).format("MMM-YYYY").toUpperCase();
// console.log("formattedValue>>>>",formattedValue); // "FEB-2025"

//     setSelectedMonthYear(formattedValue);
//   };

 
//   return (
//     <div style={gridStyle}>

//       <Box sx={innerDivStyle}>


        
//         <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mb: 2,flexDirection:{
//           lg:'row',
//           md:'row',
//           sm:'column',
//           xs:'column'
//         } }}>
//           <Typography sx={{ 
//             paddingLeft:{
//               xs:'3px',
//               sm:'5px',
//               md:'10px',
//               lg:'20px'
//             },
//           color: '#0d2136',
//           fontSize:{
//             sm:'10px',
//             xs:'10px',
//             md:'15px',
//             lg:'20px'
//           },
          
//            }} className="title-2">
//             Energy Expenditure
//           </Typography>
//           <Box sx={{ display: 'flex', width: '250px', justifyContent: {
//             xs:'space-around',
//             sm:'space-around',
//             md:'space-between',
//             lg:'space-between'
            
//             } }}>
//             <input
//               type="file"
//               accept=".xlsx, .xls"
//               onChange={handleFileChange}
//               style={{ display: 'none' }}
//               id="fileInput"
//             />

//           </Box>
//         </Box>




//         <Box sx={{display:'flex',flexDirection:{
//             xl:'row',lg:'row',md:'row',sm:'column',xs:'column'
//         },justifyContent:{md:'space-between',lg:'flex-start'}
//         }}>
//         <Box sx={{width:{lg:'20%',xl:'20%',md:'30%',sm:'100%',xs:'100%'},mb:{sm:1,xs:1}}}>
//         <BillDatePicker selectedMonthYear={selectedMonthYear} onChange={handleDateChange} />
//         </Box>

//     {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer') && (
//                       <FormControl
//                       fullWidth
//                       size="small"
//                       variant="outlined"
//                       sx={{
                        
                    
//                         width: {
//                           xl:isSidebarOpen ? '12%' : '10%',
//                           lg:isSidebarOpen ? '15%' : '15%',
//                           md: '30%',
//                           sm: '100%',
//                           xs: '100%',
//                         },
//                         mt: { sm: 1,md:0,lg:0,xl:0 }, 
//                         mb: { xs:1,sm: 1,lg:0,xl:0 }, 
//                         ml:{
//                           xl:1,
//                           lg:1,
//                           md:0,
//                           sm:0
//                         }
//                       }}
//                     >
//                       <InputLabel id="ward-label">Search Ward</InputLabel>
//                       <Select
//                         labelId="ward-label"
//                         id="ward"
//                         name="ward"
//                         value={wardName}
//                         onChange={handleChangeWard}
//                         label="Search Ward"
//                       >
//                         {wardDataAtoI.length > 0 ? (
//                           wardDataAtoI.map((ward, index) => (
//                             <MenuItem key={index} value={ward.ward}>
//                               {ward.ward}
//                             </MenuItem>
//                           ))
//                         ) : (
//                           <MenuItem disabled>No Wards Available</MenuItem>
//                         )}
//                       </Select>
//                     </FormControl>
//                     )}


// {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer') && (
//                       <FormControl
//                       fullWidth
//                       size="small"
//                       variant="outlined"
//                       sx={{
                        
                    
//                         width: {
//                           xl:isSidebarOpen ? '12%' : '10%',
//                           lg:isSidebarOpen ? '15%' : '15%',
//                           md: '30%',
//                           sm: '100%',
//                           xs: '100%',
//                         },
//                         mt: { sm: 1,md:0,lg:0,xl:0 }, 
//                         mb: { xs:1,sm: 1,lg:0,xl:0 }, 
//                         ml:{
//                           xl:1,
//                           lg:1,
//                           md:0,
//                           sm:0
//                         }
//                       }}
//                     >
//                       <InputLabel id="ward-label">Search Meter Purpose</InputLabel>
//                       <Select
//                         labelId="ward-label"
//                         id="meterPurpose"
//                         name="meterPurpose"
//                         value={meterPurposeName}
//                         onChange={handleChangMeterPurpose}
//                         label="Search Meter Purpose"
//                       >
//                         {meterPurposeData.length > 0 ? (
//                           meterPurposeData.map((meterdata, index) => (
//                             <MenuItem key={index} value={meterdata.purpose}>
//                               {meterdata.purpose}
//                             </MenuItem>
//                           ))
//                         ) : (
//                           <MenuItem disabled>No Meter Purpose Available</MenuItem>
//                         )}
//                       </Select>
//                     </FormControl>
//                     )}


//      <Button
//               sx={{
//                 color: '#757575',
//                 border: '0.1px solid #757575',
//                 cursor: 'pointer',
//                 textTransform: 'none',
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 // width: getResponsiveWidth(),
//                 width: {
//                   xl:isSidebarOpen ? '12%' : '10%',
//                   lg:isSidebarOpen ? '15%' : '15%',
//                   md: '30%',
//                   sm: '100%',
//                   xs: '100%',
//                 },
//                 ml:{
//                     xl:1,
//                     lg:1,
//                     md:0,
//                     sm:0
//                   },
//                 height: '65%',
                
//               }}
//               onClick={handleDownloadPDF}
//             >
//               <DownloadIcon />
//               <Typography sx={{
//                 fontSize: isSidebarOpen ? '12.2px' : '14px'
//               }}>Download PDF</Typography>
//             </Button>
//             </Box>

//         <StyledDataGrid rows={rows}
//           columns={columns(handleDeleteBill, handleEditBill)}
//           initialState={{
//             pagination: {
//               paginationModel: { page: 0, pageSize: 5 },
//             },
//           }}
//           pageSizeOptions={[5,10,20,30,40,50,60,70,100]}
//           sx={{ paddingRight: 0.5, paddingLeft: 0.5 }}
//         />
//         <Modal open={billOpen} onClose={handleAddBillClose}>
//           <AddBill open={billOpen} handleClose={handleAddBillClose} handleAddBill={handleAddBill}
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
// export default RegionalEnergyExpenditure;

// ==========================================================

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



import { fetchBills, addBill,deleteBill, editBill } from '../store/actions/billActions';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box,Modal,Button,TextField,MenuItem, Select, InputLabel, FormControl} from '@mui/material';
import AddBill from '../components/modals/AddBill';
import AddPayment from '../components/modals/AddPayment';
import BillDatePicker from '../components/BillDatePicker';
import wardDataAtoI from '../data/warddataAtoI';
import meterPurposeData from '../data/meterpurpose';
import dayjs from "dayjs";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {loadDevanagariFont,notoserifbase} from '../fonts/NotoSerifbase';

import "react-toastify/dist/ReactToastify.css";
import './ConsumerBill.css';
import { styled } from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';
import * as XLSX from 'xlsx';
import { CircularProgress} from '@mui/material';
import { baseUrl } from '../config/config';
import axios from 'axios';





import 'jspdf-autotable';









import { fetchConsumers } from '../store/actions/consumerActions';

const rowColors = ['#F7F9FB', 'white'];

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
  '& .total-row': {
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    color: '#1976d2',
  },
}));

const RegionalEnergyExpenditure = () => {
  const dispatch = useDispatch();
  const { bills, loading, error } = useSelector((state) => state.bills);
  const { consumers } = useSelector((state) => state.consumers);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const user = useSelector(state => state.auth.user);

  const [billOpen, setBillOpen] = useState(false);
  const [currentBill, setCurrentBill] = useState(null);
  const [addPaymentOpen, setAddPaymentOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [wardName, setWardName] = useState('');
  const [meterPurposeName, setMeterPurposeName] = useState('');
  const [selectedMonthYear, setSelectedMonthYear] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(fetchBills());
    dispatch(fetchConsumers());
  }, [dispatch, data]);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getFilteredBills = () => {
    if (!bills || !consumers) return [];

    const consumerMap = new Map(
      consumers.map(consumer => [consumer.consumerNumber, consumer])
    );

    let filteredBills = bills;

    if (user?.role.startsWith('Junior Engineer')) {
      const specificWard = user?.ward;
      filteredBills = bills.filter((bill) => bill.ward === specificWard);
    }

    return filteredBills.map(bill => ({
      ...bill,
      meterPurpose: consumerMap.get(bill.consumerNumber)?.meterPurpose || 'N/A'
    }));
  };

  const handleAddBillClose = () => setBillOpen(false);
  const handleAddPaymentClose = () => setAddPaymentOpen(false);
  
  const handleAddBill = (billData) => {
    dispatch(addBill(billData));
    handleAddBillClose();
  };

  const handleChangeWard = (event) => setWardName(event.target.value);
  const handleChangeMeterPurpose = (event) => setMeterPurposeName(event.target.value);
  
  const handleDateChange = (value) => {
    const formattedValue = dayjs(value).format("MMM-YYYY").toUpperCase();
    setSelectedMonthYear(formattedValue);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      setData(json);
      json.forEach((bill) => {
        dispatch(addBill(bill));
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF('landscape');
    
    // doc.setFontSize(16);
    // doc.text("Energy Expenditure Report", 140, 20, { align: "center" });
  
    // Ensure rows array is not empty before accessing its values
    const meterPurpose = rows.length > 0 ? rows[0].meterPurpose : "N/A";
    const ward = rows.length > 0 ? rows[0].ward : "N/A";
    const monthYear = rows.length > 0 ? rows[0].monthAndYear : "N/A";
  
    doc.setFontSize(14);
    const lineHeight = 10; // Space between lines
    let yPosition = 20; // Initial Y position
  
    doc.text(`Meter Purpose: ${meterPurpose}`, 140, yPosition, { align: "center" });
    yPosition += lineHeight; // Move down
    doc.text(`Ward: ${ward}`, 140, yPosition, { align: "center" });
    yPosition += lineHeight; // Move down
    doc.text(`Month & Year: ${monthYear}`, 140, yPosition, { align: "center" });
  
  
    const tableData = rows.map(row => [
      row.consumerNumber,
      row.consumerAddress,
      row.monthAndYear,
      row.ward,
      row.meterPurpose,
      row.netBillAmount,
      row.dueDate
    ]);

    doc.autoTable({
      head: [['Consumer No.', 'Address', 'Month', 'Ward', 'Meter Purpose', 'Amount', 'Due Date']],
      body: tableData,
      startY: 50,
    });

    doc.save('energy-expenditure-report.pdf');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  const filteredBills = getFilteredBills();

  const rows = [
    ...filteredBills
      .filter((bill) => 
        (!selectedMonthYear || bill.monthAndYear === selectedMonthYear) &&
        (!wardName || bill.ward === wardName) &&
        (!meterPurposeName || bill.meterPurpose === meterPurposeName)
      )
      .map((bill, index) => ({
        _id: bill._id,
        id: index + 1,
        consumerNumber: bill.consumerNumber,
        consumerAddress: bill.consumerAddress,
        ward: bill?.ward,
        monthAndYear: bill?.monthAndYear,
        meterPurpose: bill?.meterPurpose,
        netBillAmount: bill.netBillAmount,
        dueDate: formatDate(bill.dueDate),
      })),
    {
      id: 'total',
      consumerNumber: '',
      consumerAddress: '',
      ward: '',
      monthAndYear: '',
      meterPurpose: 'Total',
      netBillAmount: filteredBills
        .filter((bill) => 
          (!selectedMonthYear || bill.monthAndYear === selectedMonthYear) &&
          (!wardName || bill.ward === wardName) &&
          (!meterPurposeName || bill.meterPurpose === meterPurposeName)
        )
        .reduce((sum, bill) => sum + (Number(bill.netBillAmount) || 0), 0),
      dueDate: '',
    }
  ];

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'consumerNumber', headerName: 'CONSUMER NO.', width: 200 },
    { field: 'consumerAddress', headerName: 'CONSUMER ADDRESS', width: 130 },
    { field: 'monthAndYear', headerName: 'BILL MONTH', width: 130 },
    { field: 'meterPurpose', headerName: 'METER PURPOSE', width: 130 },
    { field: 'ward', headerName: 'WARD', width: 130 },
    { 
      field: 'netBillAmount', 
      headerName: 'NET BILL AMOUNT', 
      width: 200,
      cellClassName: (params) => {
        if (params.id === 'total') {
          return 'total-row';
        }
        return '';
      }
    },
    { field: 'dueDate', headerName: 'DUE DATE', width: 130 },
  ];

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
  };

  const innerDivStyle = {
    border: '1px solid #F7F7F8',
    width: '99%',
    padding: window.innerWidth <= 480 ? '80px 20px' : 
            window.innerWidth <= 600 ? '80px 10px' : 
            window.innerWidth <= 900 ? '60px 10px' : '30px 10px',
  };

  return (
    <div style={gridStyle}>
      <Box sx={innerDivStyle}>
        <Box sx={{ 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'space-between', 
          mb: 2,
          flexDirection: {
            lg: 'row',
            md: 'row',
            sm: 'column',
            xs: 'column'
          }
        }}>
          <Typography sx={{ 
            paddingLeft: {
              xs: '3px',
              sm: '5px',
              md: '10px',
              lg: '20px'
            },
            color: '#0d2136',
            fontSize: {
              sm: '10px',
              xs: '10px',
              md: '15px',
              lg: '20px'
            },
          }}>
            Energy Expenditure
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            width: '250px', 
            justifyContent: {
              xs: 'space-around',
              sm: 'space-around',
              md: 'space-between',
              lg: 'space-between'
            } 
          }}>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="fileInput"
            />
          </Box>
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: {
            xl: 'row',
            lg: 'row',
            md: 'row',
            sm: 'column',
            xs: 'column'
          },
          justifyContent: {
            md: 'space-between',
            lg: 'flex-start'
          }
        }}>
          <Box sx={{
            width: {
              lg: '20%',
              xl: '20%',
              md: '30%',
              sm: '100%',
              xs: '100%'
            },
            mb: {
              sm: 1,
              xs: 1
            }
          }}>
            <BillDatePicker 
              selectedMonthYear={selectedMonthYear} 
              onChange={handleDateChange} 
            />
          </Box>

          {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer') && (
            <>
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                sx={{
                  width: {
                    xl: isSidebarOpen ? '12%' : '10%',
                    lg: isSidebarOpen ? '15%' : '15%',
                    md: '30%',
                    sm: '100%',
                    xs: '100%',
                  },
                  mt: { sm: 1, md: 0, lg: 0, xl: 0 },
                  mb: { xs: 1, sm: 1, lg: 0, xl: 0 },
                  ml: {
                    xl: 1,
                    lg: 1,
                    md: 0,
                    sm: 0
                  }
                }}
              >
                <InputLabel id="ward-label">Search Ward</InputLabel>
                <Select
                  labelId="ward-label"
                  id="ward"
                  name="ward"
                  value={wardName}
                  onChange={handleChangeWard}
                  label="Search Ward"
                >
                  {wardDataAtoI.map((ward, index) => (
                    <MenuItem key={index} value={ward.ward}>
                      {ward.ward}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                sx={{
                  width: {
                    xl: isSidebarOpen ? '20%' : '20%',
                    lg: isSidebarOpen ? '17%' : '17%',
                    md: '30%',
                    sm: '100%',
                    xs: '100%',
                  },
                  mt: { sm: 1, md: 0, lg: 0, xl: 0 },
                  mb: { xs: 1, sm: 1, lg: 0, xl: 0 },
                  ml: {
                    xl: 1,
                    lg: 1,
                    md: 0,
                    sm: 0
                  }
                }}
              >
                <InputLabel id="meter-purpose-label">Search Meter Purpose</InputLabel>
                <Select
                  labelId="meter-purpose-label"
                  id="meterPurpose"
                  name="meterPurpose"
                  value={meterPurposeName}
                  onChange={handleChangeMeterPurpose}
                  label="Search Meter Purpose"
                >
                  {meterPurposeData.map((meterdata, index) => (
                    <MenuItem key={index} value={meterdata.purpose}>
                      {meterdata.purpose}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}

          <Button
            sx={{
              color: '#757575',
              border: '0.1px solid #757575',
              cursor: 'pointer',
              textTransform: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              width: {
                xl: isSidebarOpen ? '12%' : '10%',
                lg: isSidebarOpen ? '15%' : '15%',
                md: '30%',
                sm: '100%',
                xs: '100%',
              },
              ml: {
                xl: 1,
                lg: 1,
                md: 0,
                sm: 0
              },
              height: '65%',
            }}
            onClick={handleDownloadPDF}
          >
            <DownloadIcon />
            <Typography sx={{
              fontSize: isSidebarOpen ? '12.2px' : '14px'
            }}>
              Download PDF
            </Typography>
          </Button>
        </Box>

        <StyledDataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 30, 40, 50, 60, 70, 100]}
          sx={{ paddingRight: 0.5, paddingLeft: 0.5 }}
        />

        <Modal open={billOpen} onClose={handleAddBillClose}>
          <AddBill
            open={billOpen}
            handleClose={handleAddBillClose}
            handleAddBill={handleAddBill}
            currentBill={currentBill}
            editBill={(billId, billData) => {
              dispatch(editBill(billId, billData));
              dispatch(fetchBills());
            }}
          />
        </Modal>

        <Modal open={addPaymentOpen} onClose={handleAddPaymentClose}>
          <AddPayment
            open={addPaymentOpen}
            handleClose={handleAddPaymentClose}
            selectedBill={selectedBill}
          />
        </Modal>
      </Box>
    </div>
  );
};

export default RegionalEnergyExpenditure;