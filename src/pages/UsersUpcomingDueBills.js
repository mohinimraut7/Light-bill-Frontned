import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBills, addBill, updateBillStatusAction, deleteBill, editBill, massBillApprovalsAction, massBillRollbackApprovalsAction } from '../store/actions/billActions';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box, Button, Modal, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import AddBill from '../components/modals/AddBill';
import AddPayment from '../components/modals/AddPayment';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './ConsumerBill.css';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
// import { upComingDueBills } from './utils/upcomingDueBills';

import { upComingDueBills } from '../utils/DueBillHelper';

import * as XLSX from 'xlsx';
import { CircularProgress} from '@mui/material';
const UsersUpcomingDueBills = () => {
  const dispatch = useDispatch();
  const { bills, loading, error } = useSelector((state) => state.bills);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [billOpen, setBillOpen] = useState(false);
  const [currentBill, setCurrentBill] = useState(null);
  const [addPaymentOpen, setAddPaymentOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [selectedValues, setSelectedValues] = useState({});
  const [normalMeterCount, setNormalMeterCount] = useState(0);
  const [faultyMeterCount, setFaultyMeterCount] = useState(0);
  const [averageMeterCount, setAverageMeterCount] = useState(0);
  const [billPaid, setBillPaid] = useState(0);
  const [billUnPaid, setBillUnPaid] = useState(0);
  const [cBillAmount, setCBillAmount] = useState(0);
  const [tArrears, setArrears] = useState(0);
  const [nBillAmount, setNBillAmount] = useState(0);
  const [rBillAmount, setRBillAmount] = useState(0);
  const [paidBefore, setPaidBefore] = useState(0);
  const [paidAfter, setPaidAfter] = useState(0);
  const user = useSelector(state => state.auth.user);
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const today = new Date();

  useEffect(() => {
    dispatch(fetchBills());
  }, [dispatch, data]);

  useEffect(() => {
    if (bills) {
      const initialSelectedValues = bills.reduce((acc, bill, index) => {
        acc[index + 1] = bill.forwardForGeneration ? 'Yes' : 'No';
        return acc;
      }, {});
      setSelectedValues(initialSelectedValues);
      const normalMeters = bills.filter(bill => bill.meterStatus === 'NORMAL').length;
      const faultyMeters = bills.filter(bill => bill.meterStatus === 'FAULTY').length;
      const averageMeters = bills.filter(bill => bill.meterStatus === 'AVERAGE').length;
      const paid = bills.filter(bill => bill.paymentStatus === 'paid').length;
      const unpaid = bills.filter(bill => bill.paymentStatus === 'unpaid').length;
      setNormalMeterCount(normalMeters);
      setFaultyMeterCount(faultyMeters);
      setAverageMeterCount(averageMeters);
      setBillPaid(paid)
      setBillUnPaid(unpaid)
    }
  }, [bills]);

  useEffect(() => {
    setCBillAmount(bills?.currentBillAmount)
    setArrears(bills?.totalArrears)
    setNBillAmount(bills?.netBillAmount)
    setRBillAmount(bills?.roundedBillAmount)
    setPaidAfter(bills?.ifPaidBefore)
    setPaidBefore(bills?.ifPaidAfter)
  }, [])


// ======================================================================
//   const dueAlertrows = bills.filter(bill => {
//     const dueDate = new Date(bill.dueDate);
//     const twoDaysBeforeDue = new Date(dueDate);
//     twoDaysBeforeDue.setDate(dueDate.getDate() - 2);
//     if (user?.role === 'Junior Engineer') {
//       return today >= twoDaysBeforeDue && today <= dueDate && bill.paymentStatus === 'unpaid'&&user?.ward === bill?.ward;;
//       // return bill?.dueAlert === true && user?.ward === bill?.ward;
//     }
//     // return bill?.dueAlert === true;
//     return today >= twoDaysBeforeDue && today <= dueDate && bill.paymentStatus === 'unpaid'
//   });
//   const dueAlertCount = dueAlertrows.length;

//  =========================================================================

// const dueAlertrows = bills.filter(bill => {
//   const dueDate = new Date(bill.dueDate);
//   dueDate.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

//   const today = new Date();
//   today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

//   // Calculate two days before the due date
//   const twoDaysBeforeDue = new Date(dueDate);
//   twoDaysBeforeDue.setDate(dueDate.getDate() - 2);
  
//   // Check if the bill's due date falls within the range of two days before due date and the due date itself
//   const isWithinRange = today >= twoDaysBeforeDue && today <= dueDate;

//   if (user?.role === 'Junior Engineer') {
//       return isWithinRange && bill.paymentStatus === 'unpaid' && user?.ward === bill?.ward;
//   }
  
//   return isWithinRange && bill.paymentStatus === 'unpaid';
// });

const dueAlertrows = upComingDueBills(bills, user);

const dueAlertCount = dueAlertrows.length;




// =========================================================================

  // useEffect(() => {
  //   if (dueAlertCount > 0 && isAuthenticated) {
  
  //     const notification = new Notification('Pending Light Bills', {
  //       body: `You have a total of ${dueAlertCount} pending light bills. Please ensure that you do not cross the due date, as late payments will incur additional charges.`,
  //       requireInteraction: true, // Stays until user interacts
  //     });
  
    
  //     const timer = setTimeout(() => {
  //       notification.close();
  //     }, 20000);
  
  //     return () => clearTimeout(timer); 
  //   }
  // }, [dueAlertCount, isAuthenticated]);


  useEffect(() => {
    if (dueAlertCount > 0 && isAuthenticated) {
      if (Notification.permission === "granted") {
        new Notification("Pending Light Bills", {
          body: `You have a total of ${dueAlertCount} pending light bills. Please ensure that you do not cross the due date, as late payments will incur additional charges.`,
          requireInteraction: true,
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("Pending Light Bills", {
              body: `You have a total of ${dueAlertCount} pending light bills. Please ensure that you do not cross the due date, as late payments will incur additional charges.`,
              requireInteraction: true,
            });
          }
        });
      }
    }
  }, [dueAlertCount, isAuthenticated]);
  
  

  const getFilteredBills = () => {
    if (user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer') {
      return bills;
    } else if (user?.role.startsWith('Junior Engineer')) {
      const specificWard = user?.ward;
      return bills.filter((bill) => bill.ward === specificWard);
    }
    return [];
  };
  const filteredBills = getFilteredBills();
  
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
  const handleAddBillOpen = () => {
    setBillOpen(true);
  };
  const handleAddBillClose = () => {
    setBillOpen(false);
  };
  const handleAddBill = (billData) => {
    dispatch(addBill(billData));
    handleAddBillClose();
  };
  const handleAddPaymentClose = () => {
    setAddPaymentOpen(false);
  };
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
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
      console.log('Imported Data:', json);
      data.forEach((bill) => {
        dispatch(addBill(bill));
      });
    };
    reader.readAsArrayBuffer(file);
  };
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
  const handleProcessClick = () => {
    if (selectedItems.length === 0) {
      toast.warn('No bills selected for processing');
      return;
    }
    dispatch(massBillApprovalsAction(selectedItems));
    setSelectedItems([]);
  };

  const handleReverseApprovals = () => {
    if (selectedItems.length === 0) {
      toast.warn('No bills selected for processing');
      return;
    }
    dispatch(massBillRollbackApprovalsAction(selectedItems));
    setSelectedItems([]);
  }
  const isEditIconDisabled =
    user?.role === 'Super Admin' ||
    user?.role === 'Admin' ||
    user?.role === 'Executive Engineer' ||
    user?.role === 'Done';
  const combinedData = [...filteredBills, ...data];
  
  // const rows = combinedData.filter(bill => {
  //   const dueDate = new Date(bill.dueDate);
  //   const twoDaysBeforeDue = new Date(dueDate);
  //   twoDaysBeforeDue.setDate(dueDate.getDate() - 2);

  //   return today >= twoDaysBeforeDue && today <= dueDate && bill.paymentStatus === 'unpaid';
  // })
  
  // const rows = combinedData
  // .filter(bill => {
  //   const dueDate = new Date(bill.dueDate);
  //   dueDate.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

  //   // Calculate two days before due date
  //   const twoDaysBeforeDue = new Date(dueDate);
  //   twoDaysBeforeDue.setDate(dueDate.getDate() - 5);

  //   // Condition: Show bills if due date is today OR within the range (2 days before due date)
  //   return (today >= twoDaysBeforeDue && today <= dueDate) && bill.paymentStatus === 'unpaid';
  // })
  
  const rows = upComingDueBills(bills, user)
  .map((bill, index) => ({
    _id: bill._id,
    id: index + 1,
    consumerNumber:bill.consumerNumber,
    // email: bill?.email,
    username: bill.username || '-',
    contactNumber: bill?.contactNumber,
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
    paymentStatus: bill.paymentStatus || '-',
    approvedStatus: bill.approvedStatus || '-',
    lastReceiptAmount: bill.lastReceiptAmount ? bill.lastReceiptAmount : 0,
    pendingAmount: bill.lastReceiptAmount ? bill.roundedBillAmount - bill.lastReceiptAmount : bill.roundedBillAmount,
    promptPaymentDate: formatDate(bill.promptPaymentDate),
    promptPaymentAmount: bill.promptPaymentAmount,
    
    dueDate: formatDate(bill.dueDate),
    netBillAmountWithDPC: bill.netBillAmountWithDPC,
    forwardForGeneration: bill.forwardForGeneration,
  }));
  const handleApproveClick = (bill, yesno) => {
    let approvedStatus;
    let currentBillAmount;
    let ifPaidBefore;
    let ifPaidAfter;
    let totalArrears;
    let netBillAmount;
    let roundedBillAmount;
    if (!bill || !bill._id) {
      console.error("Bill or Bill _id is missing");
      return;
    }
    let paymentStatus;
    if (user?.role === 'Junior Engineer') {
      if (yesno === 'No') {
        approvedStatus = 'Initial';
        paymentStatus = 'unpaid';
        toast.info('Bill sent back to Junior Engineer for review');
      } else if (yesno === 'Yes' && paymentStatus === 'Partial') {
        approvedStatus = 'PendingForExecutiveEngineer';
        paymentStatus = 'Partial';
        toast.success('Record forwarded to Executive Engineer');
      }
      else {
        approvedStatus = 'PendingForExecutiveEngineer';
        paymentStatus = 'Pending';
        toast.success('Record forwarded to Executive Engineer');
      }
    } else if (user?.role === 'Executive Engineer') {
      approvedStatus = 'PendingForAdmin';
      paymentStatus = 'Pending';
    } else if (user?.role === 'Admin') {
      approvedStatus = 'PendingForSuperAdmin';
      paymentStatus = 'Pending';
    } else if (user?.role === 'Super Admin' && yesno === 'Yes') {
      approvedStatus = 'Done';
      paymentStatus = 'paid';
    } else if (user?.role === 'Super Admin' && yesno === 'No') {
      approvedStatus = 'PendingForSuperAdmin';
      paymentStatus = 'Pending';
      currentBillAmount = tArrears;
      ifPaidBefore = paidBefore;
      ifPaidAfter = paidAfter;
      totalArrears = tArrears
      netBillAmount = nBillAmount;
      roundedBillAmount = rBillAmount;
    }
    console.log(`Updating bill status for bill id: ${bill._id} to ${approvedStatus}`);
    dispatch(updateBillStatusAction(bill._id, approvedStatus, paymentStatus, yesno, currentBillAmount, totalArrears, netBillAmount, roundedBillAmount, ifPaidBefore, ifPaidAfter));
  };
  const columns = (handleDeleteBill) => [
    {
      field: 'checkbox',
      headerName: '',
      width: 50,
      headerClassName: 'data-grid-checkbox-header',
      renderHeader: (params) => {
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
          checked={
            selectedItems.some((item) => item.id === params.row.id)
          }
          onChange={(event) => handleCheckboxChange(event, params.row)}
          disabled={params.row.forwardForGeneration === 'Yes'}
        />
      ),
    },
    { field: 'id', headerName: 'ID', width: 70 },
    
    { field: 'consumerNumber', headerName: 'CONSUMER NO.', width: 130 },

    { field: 'contactNumber', headerName: 'CONTACT NUMBER', width: 130 },
    
    { field: 'ward', headerName: 'WARD', width: 130 },
    { field: 'meterNumber', headerName: 'METER NUMBER', width: 130 },
    { field: 'totalConsumption', headerName: 'TOTAL CONSUMPTION', width: 130 },
    { field: 'meterStatus', headerName: 'METER STATUS', width: 130 },
    { field: 'previousReadingDate', headerName: 'PREVIOUS READING DATE', width: 130 },
    { field: 'previousReading', headerName: 'PREVIOUS READING', width: 130 },
    { field: 'currentReadingDate', headerName: 'CURRENT READING DATE', width: 130 },
    { field: 'currentReading', headerName: 'CURRENT READING', width: 130 },
    { field: 'billDate', headerName: 'BILL DATE', width: 130 },
  
    { field: 'netBillAmount', headerName: 'NET BILL AMOUNT', width: 130 },
   
 
    { field: 'promptPaymentDate', headerName: 'PROMPT PAYMENT DATE', width: 130 },
    { field: 'promptPaymentAmount', headerName: 'PROMPT PAYMENT AMOUNT', width: 130 },
    
    { field: 'dueDate', headerName: 'DUE DATE', width: 130 },
    { field: 'netBillAmountWithDPC', headerName: 'NET Bill AMOUNT WITH DPC', width: 130 },
    { field: 'paymentStatus', headerName: 'PAYMENT STATUS', width: 130 },
    { field: 'lastReceiptAmount', headerName: 'LAST RECEIPT AMOUNT', width: 130 },
   
    { field: 'approvedStatus', headerName: 'APPROVED STATUS', width: 130 },
    // {
    //   field: 'actions',
    //   headerName: 'Actions',
    //   width: 200,
    //   renderCell: (params) => (
    //     <>
    //       <IconButton
    //         sx={{ color: '#FFA534' }}
    //         onClick={() => handleDeleteBill(params.row._id)}
    //         disabled={user.role === 'Junior Engineer' && (params.row.approvedStatus === 'PendingForExecutiveEngineer' || params.row.approvedStatus === 'PendingForAdmin' || params.row.approvedStatus === 'PendingForSuperAdmin' || params.row.approvedStatus === 'Done')}
    //       >
    //         <DeleteIcon />
    //       </IconButton>
    //       { }
          
    //     </>
    //   ),
    // },

//     -----------------------------------------
//     // Single approval
//     ...(user?.role === 'Junior Engineer'
//       ? [
//         {
//           field: 'forwardForGeneration',
//           headerName: 'FORWARD FOR GENERATION',
//           width: 200,
//           renderCell: (params) => {
//             const isJuniorEngineer = user?.role === 'Junior Engineer';
//             const isDisabled = params.row.approvedStatus === 'PendingForExecutiveEngineer' || params.row.approvedStatus === "PendingForSuperAdmin" || params.row.approvedStatus === "PendingForAdmin" || params.row.approvedStatus === "Done" || params.row.approvedStatus === "PartialDone";
//             if (!isJuniorEngineer) return null;
//             return (
//               <Box
//                 sx={{
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   gap: 1,
//                   height: '100%',
//                 }}
//               >
//                 <IconButton
//                   sx={{ color: '#23CCEF' }}
//                   onClick={() => handleApproveClick(params.row, 'Yes')}
//                   disabled={params.row.forwardForGeneration === 'Yes' || isDisabled}
//                 >
//                   <Typography>Yes</Typography>
//                 </IconButton>
//                 <IconButton
//                   sx={{ color: '#23CCEF' }}
//                   onClick={() => handleApproveClick(params.row, 'No')}
//                   disabled={
//                     (params.row.approvedStatus === 'Initial' && params.row.paymentStatus === 'unpaid' && user?.role === 'Junior Engineer') ||
//                     (user?.role === 'Junior Engineer' && ['PendingForAdmin', 'PendingForSuperAdmin', 'Done'].includes(params.row.approvedStatus))
//                   }
//                 >
//                   <UndoIcon />
//                 </IconButton>
//               </Box>
//             );
//           },
//         }

//       ]
//       : []),
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
// -------------------------------------------------




  ];
  const getPadding = () => {
    const width = window.innerWidth;
    
    if (width <= 480) { // Extra small screens (xs)
      return '80px 20px';
    } else if (width <= 600) { // Small screens (sm)
      return '80px 10px';
    } else if (width <= 900) { // Medium screens (md)
      return '60px 10px';
    } else { // Large screens (lg)
      return '30px 10px';
    }
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
  };
  const innerDivStyle = {
    border: '1px solid #F7F7F8',
    width: '99%',
    padding: getPadding(), 
  };
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
  }));
  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
      backgroundColor: '#FB404B',
      color: 'white',
      fontSize: '14px',
      padding: '10px 15px',
      borderRadius: '4px',
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: '#FB404B',
    },
  });
  const totalmeters = `${rows.length}`;


  const handleDeleteBill = (billId) => {
    dispatch(deleteBill(billId));
  };

  const handleEditBill = (bill) => {
    setCurrentBill(bill);
    setBillOpen(true);
  };

  const approvedCheck = (data) => {
    console.log("check function click", data)
  }
  
 
  return (
    <div style={gridStyle}>

      <Box sx={innerDivStyle}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mb: 2,flexDirection:{
          lg:'row',
          md:'row',
          sm:'column',
          xs:'column'
        } }}>
          <Typography sx={{ 
            paddingLeft:{
              xs:'3px',
              sm:'5px',
              md:'10px',
              lg:'20px'
            },
          color: '#0d2136',
          fontSize:{
            sm:'10px',
            xs:'10px',
            md:'15px',
            lg:'20px'
          },
          
           }} className="title-2">
            Users with Upcoming Due Bills
          </Typography>
          <Box sx={{ display: 'flex', width: '250px', justifyContent: {
            xs:'space-around',
            sm:'space-around',
            md:'space-between',
            lg:'space-between'
            
            } }}>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="fileInput"
            />
            {/* <Button
              sx={{
                color: '#23CCEF',
                border: '0.1px solid #23CCEF',
                cursor: 'pointer',
                textTransform: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                width: 'auto',
                fontSize:{
                  xs:'10px',
                  sm:'10px',
                  md:'20px',
                  lg:'30px'
                }
              }}
              onClick={handleProcessClick}
              disabled={
                user.role === 'Junior Engineer' &&
                selectedItems.length > 0 &&
                selectedItems.every(item => item.approvedStatus === 'PendingForExecutiveEngineer')
              }
            >
              <Typography>Process</Typography>
            </Button> */}
           
            {/* <Button
              sx={{
                color: '#23CCEF',
                border: '0.1px solid #23CCEF',
                cursor: 'pointer',
                textTransform: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                width: 'auto',
              }}
              onClick={handleReverseApprovals}
              disabled={
                user.role === 'Junior Engineer' &&
                selectedItems.length > 0 &&
                selectedItems.every(item => item.approvedStatus === 'Initial')
              }

            >
              <Typography>Rollback Approvals</Typography>
            </Button> */}


          </Box>
        </Box>
        <StyledDataGrid rows={rows}
          columns={columns(handleDeleteBill, handleEditBill)}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 15]}
          sx={{ paddingRight: 0.5, paddingLeft: 0.5 }}
        />
        <Modal open={billOpen} onClose={handleAddBillClose}>
          <AddBill open={billOpen} handleClose={handleAddBillClose} handleAddBill={handleAddBill}
            currentBill={currentBill}
            editBill={(billId, billData) => {
              dispatch(editBill(billId, billData));
              dispatch(fetchBills());
            }}
          />
        </Modal>
        <Modal open={addPaymentOpen} onClose={handleAddPaymentClose}>
          <AddPayment open={addPaymentOpen} handleClose={handleAddPaymentClose} selectedBill={selectedBill} />
        </Modal>
      </Box>
    </div>
  );
};
export default UsersUpcomingDueBills;

