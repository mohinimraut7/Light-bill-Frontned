import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBills, updateBillStatusAction, updateFlagStatus,editBill,addBill } from '../store/actions/billActions'; 
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box,Modal } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import UndoIcon from '@mui/icons-material/Undo';
// import AddBill from '../components/modals/AddBill';
import AddPayment from '../components/modals/AddPayment';
import ForwardIcon from '@mui/icons-material/Forward';
import './ConsumerBill.css';
import { styled } from '@mui/material/styles';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
// import { AddRemark } from '../components/modals/AddRemark';
import { AddRemarkModal } from '../components/modals/AddRemark';
import CustomWidthTooltip from '../components/CustomWidthTooltip';
import { Tooltip } from "@mui/material"; 
const ApprovedStatusRecord = () => {
  const dispatch = useDispatch();
  const { bills, loading, error } = useSelector((state) => state.bills);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const user = useSelector(state => state.auth.user);
  const [billOpen, setBillOpen] = useState(false);
  const [addPaymentOpen, setAddPaymentOpen] = useState(false);
    const [currentBill, setCurrentBill] = useState(null);
  
  const [selectedBill, setSelectedBill] = useState(null);
  const [cBillAmount,setCBillAmount]=useState(0);
  const [tArrears,setArrears]=useState(0);
  const [nBillAmount,setNBillAmount]=useState(0);
  const [rBillAmount,setRBillAmount]=useState(0);
  const [paidBefore,setPaidBefore]=useState(0);
  const [paidAfter,setPaidAfter]=useState(0);

  useEffect(() => {
    dispatch(fetchBills());
  }, [dispatch]);

  useEffect(()=>{
    setCBillAmount(bills?.currentBillAmount)
    // setArrears(bills?.totalArrears)
    // setNBillAmount(bills?.netBillAmount)
    setRBillAmount(bills?.roundedBillAmount)
    setPaidAfter(bills?.netBillAmountWithDPC)
    setPaidBefore(bills?.promptPaymentAmount)
  },[])

  const getFilteredBills = () => {
    // if (user?.role === 'Junior Engineer') {
    //   return bills.filter(bill => bill.approvedStatus === 'PendingForJuniorEngineer'|| bill.approvedStatus === 'PendingForExecutiveEngineer');
    // }
    if (user?.role === 'Junior Engineer') {
      return bills.filter(bill => 
          bill.ward === user.ward && 
          (bill.approvedStatus === 'PendingForJuniorEngineer' || bill.approvedStatus === 'PendingForExecutiveEngineer')
      );
  }
    else if (user?.role === 'Executive Engineer') {
      return bills.filter(bill => bill.approvedStatus === 'PendingForExecutiveEngineer' || bill.approvedStatus === 'PendingForAdmin');
    } else if (user?.role === 'Admin') {
      return bills.filter(bill => bill.approvedStatus === 'PendingForAdmin'|| bill.approvedStatus === 'PendingForSuperAdmin');
    } else if (user?.role === 'Super Admin') {
      return bills.filter(bill => bill.approvedStatus === 'PendingForSuperAdmin' || bill.approvedStatus === 'Done');
    }
    return [];
  };

  const filteredBills = getFilteredBills();
  // if (loading) {
  //   return <p>Loading...</p>;
  // } 


  const handleAddBill = (billData) => {
      dispatch(addBill(billData));
      handleAddBillClose();
    };

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
  const handleAddBillOpen = () => setBillOpen(true);
  const handleAddBillClose = () => setBillOpen(false);
  const handleAddPaymentClose = () => setAddPaymentOpen(false);
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  let remark;

  let filteredRemarks = [];

  // filteredBills.forEach(bill => {
  //   switch (user?.role) {
  //     case "Junior Engineer":
  //       filteredRemarks = bill.remarks?.filter(r => r.role === "Junior Engineer") || [];
  //       break;
  
  //     case "Executive Engineer":
  //       filteredRemarks = bill.remarks?.filter(r => 
  //         r.role === "Junior Engineer" || r.role === "Executive Engineer"
  //       ) || [];
  //       break;
  
  //     case "Admin":
  //       filteredRemarks = bill.remarks?.filter(r => 
  //         r.role === "Junior Engineer" || r.role === "Executive Engineer" || r.role === "Admin"
  //       ) || [];
  //       break;
  
  //     case "Super Admin":
  //       filteredRemarks = bill.remarks || []; // Show all remarks for Super Admin
  //       break;
  
  //     default:
  //       filteredRemarks = [];
  //   }
  // });
  

  const rows = filteredBills.map((bill, index) => ({
    _id: bill._id,
    id: index + 1,
    
    consumerNumber: bill.consumerNumber,
    consumerId:bill?.cn,
    email: bill?.email||'-',
    username: bill.username || '-',
    contactNumber: bill?.contactNumber,
    meterNumber: bill?.meterNumber || '-',
    totalConsumption: bill.totalConsumption,
    meterStatus: bill.meterStatus,
    currentReading: bill.currentReading,
    previousReading: bill.previousReading,
    currentBillAmount: bill.currentBillAmount,
    totalArrears: bill.totalArrears,
    netBillAmount: bill.netBillAmount,
    roundedBillAmount: bill.roundedBillAmount,
    ward: bill?.ward,
    paymentStatus: bill.paymentStatus || '-',
    approvedStatus: bill.approvedStatus || '-',
    lastReceiptAmount:bill.lastReceiptAmount?bill.lastReceiptAmount:0,
    lastReceiptDate:bill.lastReceiptDate,
    promptPaymentDate: bill.promptPaymentDate,
    dueDate: formatDate(bill.dueDate),
    netBillAmountWithDPC: bill.netBillAmountWithDPC,
    remark:bill.remark,
    remarks: bill.remarks,
    flagStatus: bill.flagStatus,
  }));


const handleApproveClick = (bill, yesno) => {
  console.log("bill",bill)
  let approvedStatus;
  let paymentStatus;
  // if (!bill || !bill._id) {
  //   console.error("Bill or Bill _id is missing");
  //   return;
  // }
  if (user?.role === 'Junior Engineer') {
    if (yesno === 'No') {
      approvedStatus = 'PendingForJuniorEngineer';
      paymentStatus = 'unpaid';
    } else {
      approvedStatus = 'PendingForExecutiveEngineer';
      paymentStatus = 'unpaid';
    }
  }
  else if (user?.role === 'Executive Engineer') {
   if(yesno==='Yes' && bill.paymentStatus==='unpaid'){
    approvedStatus='PendingForAdmin';
    paymentStatus='unpaid'
   }else if(yesno==='No' && bill.paymentStatus==='unpaid'&& bill.approvedStatus==='PendingForAdmin'){
    approvedStatus='PendingForExecutiveEngineer';
    paymentStatus='unpaid'
   }else if(yesno==='Yes' && bill.paymentStatus==='unpaid' && bill.approvedStatus==='PendingForExecutiveEngineer' && bill.pendingAmount>0 && bill.paidAmount<bill.roundedBillAmount && bill.pendingAmount!==0){
    approvedStatus='PendingForAdmin';
    paymentStatus='unpaid'
   }else if(yesno==='Yes' && bill.paymentStatus==='unpaid'&& bill.approvedStatus==='PendingForExecutiveEngineer' && bill.pendingAmount===bill.roundedBillAmount && bill.paidAmount===0 && bill.pendingAmount!==0){
    approvedStatus='PendingForAdmin';
    paymentStatus='unpaid';
   }else if(yesno==='Yes' && bill.paymentStatus==='unpaid'&& bill.approvedStatus==='PendingForExecutiveEngineer'){
    approvedStatus='PendingForAdmin';
    paymentStatus='unpaid';
   }else if(yesno==='No' && bill.paymentStatus==='unpaid'&& bill.approvedStatus==='PendingForAdmin'){
    approvedStatus='PendingForExecutiveEngineer';
    paymentStatus='unpaid';
   }
   else{
    approvedStatus='PendingForAdmin';
    paymentStatus='unpaid'
   }
  }
  else if (user?.role === 'Admin') {
    if (yesno === 'No' && bill.approvedStatus === 'PendingForSuperAdmin' && bill.paymentStatus==='unpaid') {
      approvedStatus = 'PendingForAdmin';
      paymentStatus = 'unpaid';
      toast.info('Bill sent back to Admin for review');
    }else if(yesno === 'Yes' && bill.approvedStatus === 'PendingForAdmin' && bill.paymentStatus==='paid') {
      // approvedStatus = 'PendingSuperForAdmin';
      approvedStatus = 'PendingForAdmin';

      paymentStatus = 'paid';
      toast.info('Bill sent back to Admin for review');
    }
    else if(yesno === 'No' && bill.approvedStatus === 'PendingForSuperAdmin' && bill.paymentStatus==='paid') {
      approvedStatus = 'PendingForAdmin';
      paymentStatus = 'paid';
      toast.info('Bill sent back to Admin for review');
    }
    else if(yesno==='Yes' && bill.paymentStatus==='unpaid'&& bill.approvedStatus==='PendingForAdmin'){
      // approvedStatus='PendingForSuperAdmin';
      approvedStatus = 'PendingForAdmin';
      paymentStatus='unpaid';
     }else if(yesno==='No' && bill.paymentStatus==='unpaid'&& bill.approvedStatus==='PendingForSuperAdmin'){
      approvedStatus='PendingForAdmin';
      paymentStatus='unpaid';
      toast.info('Bill sent back to Admin for review');
     }
    else {
      approvedStatus = 'PendingForAdmin';
      // approvedStatus = 'PendingForSuperAdmin';
      paymentStatus = 'unpaid';
      // toast.success('Record forwarded to Super Admin');
      toast.success('Record forwarded to Admin');
    }
  }
  else if (user?.role === 'Super Admin') {
    if (yesno === 'No' && bill.approvedStatus === 'Done'&& bill.paymentStatus === 'paid') {
      approvedStatus = 'Done';
      paymentStatus = 'paid';
      toast.info('Paid bill cannot be reversed.');
    }  else if (yesno === 'Yes' && bill.approvedStatus === 'PendingForSuperAdmin'&&(bill.paymentStatus === 'unpaid' )  && bill.pendingAmount==0) {
      approvedStatus = 'PendingForSuperAdmin';
      paymentStatus = 'unpaid';
      toast.info('Please complete the payment before proceeding.');
    }
    else if (yesno === 'Yes' && bill.approvedStatus === 'PendingForSuperAdmin'&& bill.paymentStatus === 'unpaid') {
      approvedStatus = 'PendingForSuperAdmin';
      paymentStatus = 'unpaid';
      toast.info('Please complete the payment before proceeding.');
    }
    else if(yesno==='Yes' && bill.paymentStatus === 'unpaid'){
      approvedStatus = 'PendingForSuperAdmin';
      paymentStatus = 'unpaid';
      toast.info('Please complete the payment before proceeding.');
    }
    else {
      if (bill.paidAmount === 0) {
        toast.error('You need to pay the bill first');
        return;
      }
      approvedStatus = 'Done';
      paymentStatus = 'paid';
      toast.success('Bill approved successfully!');
    }
  }
  console.log(`Updating bill status for bill id: ${bill._id} to ${approvedStatus}`);
  dispatch(updateBillStatusAction(bill._id, approvedStatus, paymentStatus, yesno ));
};
const flagChange = (billId, flagStatus) => {
  dispatch(updateFlagStatus(billId, flagStatus));
};

const handleEditBill = (bill) => {
  console.log("ahshashahshas>>>>>>>>",bill)
  setCurrentBill(bill);
  setBillOpen(true);
};
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
   
    { field: 'consumerNumber', headerName: 'CONSUMER ID', width: 140 },
   
    // { field: 'email', headerName: 'EMAIL', width: 130 },
    { field: 'contactNumber', headerName: 'CONTACT NUMBER', width: 130 },
    
    { field: 'ward', headerName: 'WARD', width: 70 },
    { field: 'meterNumber', headerName: 'METER NO.', width: 130 },
    { field: 'totalConsumption', headerName: 'TOTAL CONSUMPTION', width: 130 },
    { field: 'meterStatus', headerName: 'METER STATUS', width: 130 },
    { field: 'currentReading', headerName: 'CURRENT READING', width: 130 },
    { field: 'previousReading', headerName: 'PREVIOUS READING', width: 130 },
    // { field: 'currentBillAmount', headerName: 'CURRENT BILL AMOUNT', width: 130 },
  
    { field: 'netBillAmount', headerName: 'NET BILL AMOUNT', width: 130 },
    // { field: 'roundedBillAmount', headerName: 'ROUNDED BILL AMOUNT', width: 130 },
    { field: 'promptPaymentDate', headerName: 'PROMPT PAYMENT DATE', width: 130 },
    { field: 'dueDate', headerName: 'DUE DATE', width: 130 },
    { field: 'netBillAmountWithDPC', headerName: 'NET BILL AMOUNT WITH DPC', width: 130 },
    { field: 'paymentStatus', headerName: 'PAYMENT STATUS', width: 130 },
    { field: 'approvedStatus', headerName: 'APPROVED STATUS', width: 130 },
    { field: 'lastReceiptDate', headerName: 'LAST RECEIPT DATE', width: 130 },
    { field: 'lastReceiptAmount', headerName: 'LAST RECEIPT AMOUNT', width: 130 },
    // { field: 'remark', headerName: 'REMARK', width: 130 },
    // { field: 'remarks', headerName: 'REMARKS', width: 130 },
    // ------------------------------------------------------------------------
    // { 
    //   field: "remarks", 
    //   headerName: "Remarks", 
    //   width: 400, 
    //   renderCell: (params) => {
    //     if (Array.isArray(params.value) && params.value.length > 0) {
    //       return params.value.map(remark =>`${remark.role}: ${remark.remark},`)
    //     }
    //     return "No Remarks";
    //   }
    // },
 
// --------------------------------------------------
// {
//   field: "remarks",
//   headerName: "Remarks",
//   width: 400,
//   renderCell: (params) => {
//     if (Array.isArray(params.value) && params.value.length > 0) {
//       const remarksText = params.value.map(remark => `${remark.role}: ${remark.remark}`).join("\n"); // Join with new line

//       return (
//         <Tooltip title={<span style={{ whiteSpace: "pre-line"}}>{remarksText}</span>} arrow>
//           <div style={{ display: "flex", flexDirection: "column", cursor: "pointer" }}>
//             {params.value.map((remark, index) => (
//               <span key={index}>{remark.role}: {remark.remark}</span>
//             ))}
//           </div>
//         </Tooltip>
//       );
//     }
//     return "No Remarks";
//   }
// },
// -------------------------------------------------------------------
// {
//   field: "remarks",
//   headerName: "Remarks",
//   width: 400,
//   renderCell: (params) => {
//     if (Array.isArray(params.value) && params.value.length > 0) {
//       return (
//         <Tooltip 
//           title={
//             <div style={{ maxWidth: 400 }}>
//               {params.value.map((remark, index) => (
//                 <div key={index} style={{ marginBottom: '10px' }}>
//                   <div><strong>{remark.role}:</strong> {remark.remark}</div>
//                   {remark.signature && (
//                     <div style={{ marginTop: '5px' }}>
//                       <img 
//                         src={remark.signature} 
//                         alt={`${remark.role}'s signature`}
//                         style={{ 
//                           maxWidth: '200px',
//                           maxHeight: '50px',
//                           border: '1px solid #ddd',
//                           borderRadius: '4px',
//                           backgroundColor: 'white'
//                         }}
//                       />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           } 
//           arrow
//           placement="right"
//         >
//           <div style={{ 
//             display: "flex", 
//             flexDirection: "column", 
//             cursor: "pointer",
//             maxHeight: '100%',
//             overflow: 'hidden'
//           }}>
//             {params.value.map((remark, index) => (
//               <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                 <span>{remark.role}: {remark.remark}</span>
//                 {remark.signature && (
//                   <img 
//                     src={remark.signature}
//                     alt="Signature"
//                     style={{ 
//                       width: '20px',
//                       height: '20px',
//                       objectFit: 'contain'
//                     }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         </Tooltip>
//       );
//     }
//     return "No Remarks";
//   }
// },
//  ------------------------------------------------   
// {
//   field: "remarks",
//   headerName: "Remarks",
//   width: 400,
//   renderCell: (params) => {
//     if (Array.isArray(params.value) && params.value.length > 0) {
//       return (
//         <Tooltip
//           title={
//             <div className="bg-white rounded-lg p-4 max-w-[400px]">
//               {params.value.map((remark, index) => (
//                 <div 
//                   key={index}
//                   className="flex items-center gap-4 p-3 border-b last:border-b-0"
//                 >
//                   <div className="flex-grow">
//                     <div className="font-semibold text-gray-800">{remark.role}</div>
//                     <div className="text-gray-600">{remark.remark}</div>
//                   </div>
//                   {remark.signature && (
//                     <img
//                       src={remark.signature}
//                       alt={`${remark.role}'s signature`}
//                       className="w-[100px] h-[30px] object-contain border border-gray-200 rounded"
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           }
//           arrow
//           placement="right"
//           componentsProps={{
//             tooltip: {
//               sx: {
//                 bgcolor: 'white',
//                 color: 'rgba(0, 0, 0, 0.87)',
//                 boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//                 '& .MuiTooltip-arrow': {
//                   color: 'white'
//                 }
//               }
//             }
//           }}
//         >
//           <div className="cursor-pointer">
//             {params.value.map((remark, index) => (
//               <div 
//                 key={index} 
//                 className="flex items-center gap-2 py-1"
//               >
//                 <span className="text-sm">
//                   {remark.role}: {remark.remark}
//                 </span>
//                 {remark.signature && (
//                   <img
//                     src={remark.signature}
//                     alt="Signature"
//                     className="w-5 h-5 object-contain"
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         </Tooltip>
//       );
//     }
//     return <span>No Remarks</span>;
//   }
// },
    // ------------------------------------------------------------------------------------------
    // {
    //   field: "remarks",
    //   headerName: "Remarks",
    //   width: 400,
    //   renderCell: (params) => {
    //     if (Array.isArray(params.value) && params.value.length > 0) {
    //       return (
    //         <Tooltip
    //           title={
    //             <div className="bg-white rounded-lg p-4 max-w-[400px] space-y-2">
    //               {params.value.map((remark, index) => (
    //                 <div 
    //                   key={index}
    //                   className="flex flex-col gap-1 border-b last:border-b-0 pb-2"
    //                 >
    //                   <div className="font-semibold text-gray-800">{remark.role}</div>
    //                   <div className="flex items-center justify-between">
    //                     <span className="text-gray-600">{remark.remark}</span>
    //                     {remark.signature && (
    //                       <img
    //                         src={remark.signature}
    //                         alt={`${remark.role}'s signature`}
    //                         className="w-[100px] h-[30px] object-contain border border-gray-200 rounded"
    //                       />
    //                     )}
    //                   </div>
    //                 </div>
    //               ))}
    //             </div>
    //           }
    //           arrow
    //           placement="right"
    //           componentsProps={{
    //             tooltip: {
    //               sx: {
    //                 bgcolor: 'white',
    //                 color: 'rgba(0, 0, 0, 0.87)',
    //                 boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    //                 '& .MuiTooltip-arrow': {
    //                   color: 'white'
    //                 }
    //               }
    //             }
    //           }}
    //         >
    //           <div className="cursor-pointer space-y-1">
    //             {params.value.map((remark, index) => (
    //               <div 
    //                 key={index} 
    //                 className="flex flex-col"
    //               >
    //                 <span className="text-sm font-semibold">{remark.role}</span>
    //                 <div className="flex items-center justify-between">
    //                   <span className="text-gray-600">{remark.remark}</span>
    //                   {remark.signature && (
    //                     <img
    //                       src={remark.signature}
    //                       alt="Signature"
    //                       className="w-5 h-5 object-contain"
    //                     />
    //                   )}
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         </Tooltip>
    //       );
    //     }
    //     return <span>No Remarks</span>;
    //   }
    // },
//  ---------------------------------------------------------------   

// {
//   field: "remarks",
//   headerName: "Remarks",
//   width: 200,
//   renderCell: (params) => {
//     if (Array.isArray(params.value) && params.value.length > 0) {
//       return (
//         <Tooltip
//           title={
//             <Box
//               sx={{
//                 bgcolor: "white",
//                 borderRadius: 2,
//                 // p: 2,
//                 maxWidth: { xs: 300, sm: 400, md: 500, lg: 600, xl: 700 }, // Responsive width
//                 // boxShadow: 3,
//               }}
//             >
//               {params.value.map((remark, index) => (
//                 <Box
//                   key={index}
//                   sx={{
//                     borderBottom: index !== params.value.length - 1 ? "1px solid #ddd" : "none",
//                     pb: 1,
//                     mb: 1,
//                   }}
//                 >
//                   <Typography variant="body2" fontWeight="bold" color="text.primary">
//                     {remark.role}
//                   </Typography>
//                   <Box display="flex" alignItems="center" justifyContent="space-between">
//                     <Typography sx={{width:'900px'}} variant="body2" color="text.secondary">
//                       {remark.remark}
//                     </Typography>
//                     {remark.signature && (
//                       <Box
//                         component="img"
//                         src={remark.signature}
//                         alt={`${remark.role}'s signature`}
//                         sx={{
//                           width: 100,
//                           height: 50,
//                           objectFit: "contain",
//                           border: "1px solid #ddd",
//                           borderRadius: 1,
//                         }}
//                       />
//                     )}
//                   </Box>
//                 </Box>
//               ))}
//             </Box>
//           }
//           arrow
//           placement="top"
//           componentsProps={{
//             tooltip: {
//               sx: {
//                 bgcolor: "white",
//                 color: "rgba(0, 0, 0, 0.87)",
//                 boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//                 "& .MuiTooltip-arrow": {
//                   color: "white",
//                 },
//               },
//             },
//           }}
//         >
//           <Box sx={{ cursor: "pointer" }}>
//             {params.value.map((remark, index) => (
//               <Box key={index} sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
//                 <Typography variant="body2" fontWeight="bold">
//                   {remark.role}
//                 </Typography>
//                 <Box display="flex" alignItems="center" justifyContent="space-between">
//                   <Typography sx={{}} variant="body2" color="text.secondary">
//                     {remark.remark}
//                   </Typography>
//                   {remark.signature && (
//                     <Box
//                       component="img"
//                       src={remark.signature}
//                       alt="Signature"
//                       sx={{
//                         width: 20,
//                         height: 20,
//                         objectFit: "contain",
//                       }}
//                     />
//                   )}
//                 </Box>
//               </Box>
//             ))}
//           </Box>
//         </Tooltip>
//       );
//     }
//     return <Typography variant="body2" color="text.secondary">No Remarks</Typography>;
//   }
// },
// -------------------------------------------------------------------------------------
{
  field: "remarks",
  headerName: "REMARKS",
  width: 200,
  renderCell: (params) => {
    if (Array.isArray(params.value) && params.value.length > 0) {
      // Filter out remarks where role is 'Super Admin'
      const filteredRemarks = params.value.filter(remark => remark.role !== "Super Admin");

      // If all remarks were from 'Super Admin', show "No Remarks"
      if (filteredRemarks.length === 0) {
        return <Typography variant="body2" color="text.secondary">No Remarks</Typography>;
      }

      return (
        <Tooltip
          title={
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: 2,
                maxWidth: { xs: 300, sm: 400, md: 500, lg: 600, xl: 700 }, // Responsive width
              }}
            >
              {filteredRemarks.map((remark, index) => (
                <Box
                  key={index}
                  sx={{
                    borderBottom: index !== filteredRemarks.length - 1 ? "1px solid #ddd" : "none",
                    pb: 1,
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" fontWeight="bold" color="text.primary">
                    {remark.role}
                  </Typography>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography 
                      sx={{ 
                        width: { xs: '900px', lg: '100px', xl: '100px' } 
                      }} 
                      variant="body2" 
                      color="text.secondary"
                    >
                      {remark.remark}
                    </Typography>
                    {remark.signature && (
                      <Box
                        component="img"
                        src={remark.signature}
                        alt={`${remark.role}'s signature`}
                        sx={{
                          width: 100,
                          height: 50,
                          // objectFit: "contain",
                          border: "1px solid #ddd",
                          borderRadius: 1,
                        }}
                      />
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          }
          arrow
          placement="top"
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: "white",
                color: "rgba(0, 0, 0, 0.87)",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                "& .MuiTooltip-arrow": {
                  color: "white",
                },
              },
            },
          }}
        >
          <Box sx={{ cursor: "pointer" }}>
            {filteredRemarks.map((remark, index) => (
              <Box key={index} sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
                <Typography variant="body2" fontWeight="bold">
                  {remark.role}
                </Typography>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography sx={{}} variant="body2" color="text.secondary">
                    {remark.remark}
                  </Typography>
                  {/* {remark.signature && (
                    <Box
                      component="img"
                      src={remark.signature}
                      alt="Signature"
                      sx={{
                        width: 20,
                        height: 20,
                        objectFit: "contain",
                      }}
                    />
                  )} */}
                </Box>
              </Box>
            ))}
          </Box>
        </Tooltip>
      );
    }
    return <Typography variant="body2" color="text.secondary">No Remarks</Typography>;
  }
},

    
        {
        field: 'actions',
        headerName: 'Actions',
        width: 200,
        renderCell: (params) => (
          <>  
          {
  !(
    (user?.role === 'Executive Engineer' && params.row.approvedStatus === 'PendingForAdmin') ||
    (user?.role === 'Admin' && params.row.approvedStatus === 'PendingForSuperAdmin')||
    (user?.role === 'Super Admin' && params.row.approvedStatus === 'Done')
  ) && (
    <IconButton sx={{ color: '#23CCEF' }} onClick={() => handleApproveClick(params.row, 'Yes')}>
      <CheckIcon />
    </IconButton>
  )
}

{
  !(
    (user?.role === 'Executive Engineer' && params.row.approvedStatus === 'PendingForExecutiveEngineer') ||
    (user?.role === 'Admin' && params.row.approvedStatus === 'PendingForAdmin')||
    (user?.role === 'Super Admin' && params.row.approvedStatus === 'PendingForSuperAdmin')
  ) && (
    <IconButton sx={{ color: '#23CCEF' }} onClick={() => handleApproveClick(params.row, 'No')}>
      <UndoIcon />
    </IconButton>
  )
}
{
  (user?.role === 'Super Admin' && params.row.approvedStatus === 'Done' && params.row.paymentStatus==='Paid' && params.row.flagStatus===false)&&(
    <IconButton sx={{ color: '#23CCEF' }} onClick={()=>flagChange(params.row._id,true)}>
    <ForwardIcon />
  </IconButton>
  )
}


 {

  <IconButton sx={{ color: '#23CCEF' }} onClick={() => handleEditBill(params.row)}
  disabled={user.role === 'Junior Engineer' && (params.row.approvedStatus === 'PendingForExecutiveEngineer' || params.row.approvedStatus === 'PendingForAdmin' || params.row.approvedStatus === 'PendingForSuperAdmin' || params.row.approvedStatus === 'Done')}
>
  <EditIcon />
</IconButton>
} 
        </>
        ),
      },
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
    padding: '30px 10px',
  };
  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .MuiDataGrid-cell': {
      padding: theme.spacing(1),
    },
    '& .MuiDataGrid-row': {
      '&:nth-of-type(odd)': {
        backgroundColor: '#F7F9FB',
      },
      '&:nth-of-type(even)': {
        backgroundColor: 'white',
      },
    },
  }));
  return (
    <div style={gridStyle}>
      <Box sx={innerDivStyle}>
        <Typography style={{ paddingLeft: '20px', color: '#0d2136' }} className="title-2">
          APPROVED STATUS RECORD
        </Typography>
        <StyledDataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
        />
        {/* <Modal open={billOpen} onClose={handleAddBillClose}>
          <AddBill open={billOpen} handleClose={handleAddBillClose} />
        </Modal> */}
        <Modal open={billOpen} onClose={handleAddBillClose}>
          <AddRemarkModal open={billOpen} handleClose={handleAddBillClose} handleAddBill={handleAddBill}
            currentBill={currentBill}
            editBill={(billId, billData) => {
              dispatch(editBill(billId, billData));
              dispatch(fetchBills());
            }}
          />
        </Modal>
        {/* <Modal open={addPaymentOpen} onClose={handleAddPaymentClose}>
          <AddPayment open={addPaymentOpen} handleClose={handleAddPaymentClose} selectedBill={selectedBill} />
        </Modal> */}
      </Box>
    </div>
  );
};

export default ApprovedStatusRecord;
