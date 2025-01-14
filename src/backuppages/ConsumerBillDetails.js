import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBills, addBill, updateBillStatusAction, deleteBill, editBill, massBillApprovalsAction, massBillRollbackApprovalsAction } from '../store/actions/billActions';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box, Button, Modal, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
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
import DownloadIcon from '@mui/icons-material/Download';
import * as XLSX from 'xlsx';
import { CircularProgress} from '@mui/material';
import { useLocation } from 'react-router-dom';
const ConsumerBillDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { consumerData } = location.state;
  const { bills, loading, error } = useSelector((state) => state.bills);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
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
  const [processBtnEnabled, setProcessBtnEnabled] = useState(false);
  const [rollbackBtnEnabled, setRollbackBtnEnabled] = useState(false);
  const [processExeBtnEnabled, setProcessExeBtnEnabled] = useState(false);
  const [rollbackExeBtnEnabled, setRollbackExeBtnEnabled] = useState(false);
  const [processAdmBtnEnabled, setProcessAdmBtnEnabled] = useState(false);
  const [rollbackAdmBtnEnabled, setRollbackAdmBtnEnabled] = useState(false);
  const [processSuperAdmBtnEnabled, setProcessSuperAdmBtnEnabled] = useState(false);
  const [rollbackSuperAdmBtnEnabled, setRollbackSuperAdmBtnEnabled] = useState(false);
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
      const normalMeters = bills.filter(bill => bill.meterStatus === 'Normal').length;
      const faultyMeters = bills.filter(bill => bill.meterStatus === 'Faulty').length;
      const averageMeters = bills.filter(bill => bill.meterStatus === 'Average').length;
      const paid = bills.filter(bill => bill.paymentStatus === 'Paid').length;
      const unpaid = bills.filter(bill => bill.paymentStatus === 'UnPaid').length;
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
  useEffect(() => {
    const checkProcessBtnEnable = () => {
      if (user.role === 'Junior Engineer') {
        
        const pendingForJuniorCount = bills.filter(
          item => item.approvedStatus === 'PendingForJuniorEngineer' || item.approvedStatus === 'Initial'
        ).length;

        const pendingForExecutiveCount = bills.filter(
          item => item.approvedStatus === 'PendingForExecutiveEngineer'
        ).length;
        
        if (pendingForExecutiveCount > pendingForJuniorCount) {
          setRollbackBtnEnabled(true); 
          setProcessBtnEnabled(false); 
        } else {
          if (pendingForJuniorCount > 1) {
            setProcessBtnEnabled(true); 
            setRollbackBtnEnabled(false); 
          } else if (pendingForJuniorCount === 1) {
            setProcessBtnEnabled(false); 
            setRollbackBtnEnabled(true); 
          } else {
            setProcessBtnEnabled(false); 
            setRollbackBtnEnabled(true); 
          }
        }
      } else if (user.role === 'Executive Engineer') {
        const pendingForExecutiveCount = bills.filter(
          item => item.approvedStatus === 'PendingForExecutiveEngineer'
        ).length;
        const pendingForAdminCount = bills.filter(
          item => item.approvedStatus === 'PendingForAdminEngineer'
        ).length;
        if (pendingForAdminCount > pendingForExecutiveCount) {
          setRollbackExeBtnEnabled(true);
          setProcessExeBtnEnabled(false);
        } else {
          setRollbackExeBtnEnabled(false);
          setProcessExeBtnEnabled(true);
        }
      } else if (user.role === 'Admin') {
        const pendingForAdminCount = bills.filter(
          item => item.approvedStatus === 'PendingForAdmin'
        ).length;
        const pendingForSuperAdminCount = bills.filter(
          item => item.approvedStatus === 'PendingForSuperAdmin'
        ).length;
        if (pendingForSuperAdminCount > pendingForAdminCount) {
          setRollbackAdmBtnEnabled(true);
          setProcessAdmBtnEnabled(false);
        } else {
          setRollbackAdmBtnEnabled(false);
          setProcessAdmBtnEnabled(true);
        }
      } else if (user.role === 'Super Admin') {
        const pendingForSuperAdminCount = bills.filter(
          item => item.approvedStatus === 'PendingForSuperAdmin'
        ).length;
        const DoneCount = bills.filter(
          item => item.approvedStatus === 'Done'
        ).length;
        if (DoneCount > pendingForSuperAdminCount) {
          setRollbackSuperAdmBtnEnabled(true);
          setProcessSuperAdmBtnEnabled(false);
        } else {
          setRollbackSuperAdmBtnEnabled(false);
          setProcessSuperAdmBtnEnabled(true);
        }
      }
      else {
        setProcessExeBtnEnabled(false);
        setRollbackExeBtnEnabled(true);
      }
    };
    checkProcessBtnEnable();
  }, [bills, user.role]);
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
  // if (loading) {
  //   return <p>Loading...</p>;
  // }
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
  const formatDateMonth = (dateString) => {
    const options = { month: 'long' }; // Only need the month option
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
      data.forEach((bill) => {
        dispatch(addBill(bill));
      });
    };
    reader.readAsArrayBuffer(file);
  };
  const isDisabledForEngineer = (row) => {
    if (user?.role === 'Junior Engineer') {
      return (
        row.approvedStatus === 'PendingForSuperAdmin' ||
        row.approvedStatus === 'Done' ||
        row.approvedStatus === 'PendingForAdmin' ||
        (processBtnEnabled && row.approvedStatus === 'PendingForExecutiveEngineer')
      );
    } else if (user?.role === 'Executive Engineer') {
      return (
        row.approvedStatus === 'PendingForSuperAdmin' ||
        row.approvedStatus === 'Done' ||
        row.approvedStatus === 'PendingForJuniorEngineer'
      );
    } else if (user?.role === 'Admin') {
      return (
        row.approvedStatus === 'PendingForExecutiveEngineer' ||
        row.approvedStatus === 'Done' ||
        row.approvedStatus === 'PendingForJuniorEngineer' ||
        (processAdmBtnEnabled && row.approvedStatus === 'PendingForSuperAdmin')
      );
    } else if (user?.role === 'Super Admin') {
      return (
        row.approvedStatus === 'PendingForExecutiveEngineer' ||
        row.approvedStatus === 'PendingForAdmin' ||
        row.approvedStatus === 'PendingForJuniorEngineer' ||
        (processSuperAdmBtnEnabled && row.approvedStatus === 'Done') ||
        (rollbackSuperAdmBtnEnabled && row.approvedStatus === 'PendingForSuperAdmin')
      );
    }
    return false;
  };
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const selectableRows = rows.filter((row) => !isDisabledForEngineer(row));
      setSelectedItems(selectableRows);
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

  
  const combinedData = [...filteredBills, ...data];

//   const rows = combinedData.filter(bill => _id.includes(bill.consumerId)).map((bill,index)=>({
  const rows = combinedData.filter(bill => bill.userId === consumerData._id).map((bill, index) => ({
    _id: bill._id,
    id: index + 1,
    dueDateMonth: formatDateMonth(bill.dueDate),
    userId: bill.userId,
    firstName: bill.firstName,
    lastName: bill.lastName,
    email: bill.email,
    username: bill.username || '-',
    contactNumber: bill.contactNumber,
    meterNumber: bill.meterNumber || '-',
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
    address: bill.address || '-',
    ward: bill?.ward,
    paymentStatus: bill.paymentStatus || '-',
    approvedStatus: bill.approvedStatus || 'Initial',
    paidAmount: bill.paidAmount ? bill.paidAmount : 0,
    pendingAmount: bill.paidAmount ? bill.roundedBillAmount - bill.paidAmount : bill.roundedBillAmount,
    ifPaidByThisDate: formatDate(bill.ifPaidByThisDate),
    earlyPaymentAmount: bill.earlyPaymentAmount,
    ifPaidBefore: bill.ifPaidBefore,
    dueDate: formatDate(bill.dueDate),
    ifPaidAfter: bill.ifPaidAfter,
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
      return;
    }
    let paymentStatus;
    if (user?.role === 'Junior Engineer') {
      if (yesno === 'No') {
        approvedStatus = 'Initial';
        paymentStatus = 'UnPaid';
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
      paymentStatus = 'Paid';
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
    dispatch(updateBillStatusAction(bill._id, approvedStatus, paymentStatus, yesno, currentBillAmount, totalArrears, netBillAmount, roundedBillAmount, ifPaidBefore, ifPaidAfter));
  };
  const columns = (handleDeleteBill) => [
    
    { field: 'dueDateMonth', headerName: 'ज्या महिन्याची मीटर नोंद घेण्यात  आली  तो महिना', width: 130 },
    
    { field: 'totalConsumption', headerName: 'एकूण  वापर युनिट संख्या', width: 130 },
    
    { field: 'previousReadingDate', headerName: 'या तारखे पासून मीटर नोंद', width: 130 },
    { field: 'previousReading', headerName: 'वापर झालेल्या युनिट रिडींग क्रमांक पासून', width: 130 },
    { field: 'currentReadingDate', headerName: 'या तारखे पर्यंत मीटर नोंद', width: 130 },
    { field: 'currentReading', headerName: 'वापर झालेल्या युनिट रिडींग क्रमांक पर्यंत ', width: 130 },
    
    { field: 'currentBillAmount', headerName: 'देयकाची रक्कम', width: 130 },
    
    { field: 'dueDate', headerName: 'देयकाची अंतिम तारीख ', width: 130 },
    
    ...(user?.role === 'Junior Engineer'
      ? [
        {
          field: 'forwardForGeneration',
          headerName: 'FORWARD FOR GENERATION',
          width: 200,
          renderCell: (params) => {
            const isJuniorEngineer = user?.role === 'Junior Engineer';
            const isDisabled = params.row.approvedStatus === 'PendingForExecutiveEngineer' || params.row.approvedStatus === "PendingForSuperAdmin" || params.row.approvedStatus === "PendingForAdmin" || params.row.approvedStatus === "Done" || params.row.approvedStatus === "PartialDone";
            if (!isJuniorEngineer) return null;
            return (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 1,
                  height: '100%',
                }}
              >
                <IconButton
                  sx={{ color: '#23CCEF' }}
                  onClick={() => handleApproveClick(params.row, 'Yes')}
                  disabled={params.row.forwardForGeneration === 'Yes' || isDisabled}
                >
                  <Typography>Yes</Typography>
                </IconButton>
                <IconButton
                  sx={{ color: '#23CCEF' }}
                  onClick={() => handleApproveClick(params.row, 'No')}
                  disabled={
                    (params.row.approvedStatus === 'Initial' && params.row.paymentStatus === 'UnPaid' && user?.role === 'Junior Engineer') ||
                    (user?.role === 'Junior Engineer' && ['PendingForAdmin', 'PendingForSuperAdmin', 'Done'].includes(params.row.approvedStatus))
                  }
                >
                  <UndoIcon />
                </IconButton>
              </Box>
            );
          },
        }

      ]
      : []),
    ...(!user?.role === 'Junior Engineer'
      ? [
        {
          field: 'actions',
          headerName: 'Actions',
          width: 200,
          renderCell: (params) => (
            <>
              <IconButton sx={{ color: '#23CCEF' }} onClick={() => handleApproveClick(params.row)}>
                <CheckIcon />
              </IconButton>
            </>
          ),
        },
      ]
      : []),
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
    marginTop:'1vh'
  };
  const innerDivStyle = {
    border: '1px solid #F7F7F8',
    width: '99%',
    padding: '30px 10px',
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
  const handleDownloadReport = () => {
    const filteredRows = rows.filter(row => row.meterStatus === 'Faulty' || row.meterStatus === 'Average');
    const worksheet = XLSX.utils.json_to_sheet(filteredRows?.map(row => ({
      'ID': row.id,
      'Consumer No.': row.userId,
      'Email': row.email,
      'Contact Number': row.contactNumber,
      'Address': row.address,
      'Ward': row.ward,
      'Meter Number': row.meterNumber,
      'Total Consumption': row.totalConsumption,
      'Meter Status': row.meterStatus,
      'Previous Reading Date': row.previousReadingDate,
      'Previous Reading': row.previousReading,
      'Current Reading Date': row.currentReadingDate,
      'Current Reading': row.currentReading,
      'billDate': row.billDate,
      'Current Bill Amount': row.currentBillAmount,
      'Total Arrears': row.totalArrears,
      'Net Bill Amount': row.netBillAmount,
      'Rounded Bill Amount': row.roundedBillAmount,
      'If Paid Before': row.ifPaidBefore,
      'Due Date': row.dueDate,
      'If Paid After': row.ifPaidAfter,
      'OverDue Date': row.overdueDate,
      'Payment Status': row.paymentStatus,
      'Paid Amount': row.paidAmount,
      'Pending Amount': row.pendingAmount,
      'Approved Status': row.approvedStatus,
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Bills');
    XLSX.writeFile(workbook, 'ConsumerBills.xlsx');
  };

  const handleDeleteBill = (billId) => {
    dispatch(deleteBill(billId));
  };

  const handleEditBill = (bill) => {
    setCurrentBill(bill);
    setBillOpen(true);
  };
  return (
    <div style={gridStyle}>
      
      <Box sx={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',alignContent:'center',flexDirection:'column'}}>
      <Box><Typography>नमुना  नं  १२०</Typography></Box>
      <Box><Typography>(नियम १४७)  (२) पहा )</Typography></Box>
        <Box><Typography
         variant="h6" 
        //  '#158049'
         sx={{ fontSize: '30px', fontWeight: 'bold', color: '#000' }}
        >वसई - विरार शहर महानगरपालिका </Typography></Box>
        <Box>
      <Typography>२०-२० या वर्षांची विद्युत  शक्तीच्या खपाची मीटर नोंदवही </Typography>
      </Box>
      </Box>
      
      <Box sx={innerDivStyle}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        </Box>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}> 
        <Box>
            <Box sx={{display:'flex'}}>
            <Typography>मीटर क्रमांक : </Typography>
            <Typography>
      {combinedData
        .filter(bill => bill.userId === consumerData._id)
        .map(bill => bill.meterNumber)[0] || 'No meter number available'} {/* Display the first meterNumber or a fallback message */}
    </Typography>
            </Box>
            <Box>
              <Typography>प्रत्येक महिन्याचे / वार्षिक मीटर भाडे </Typography>
            </Box>
          </Box>

          <Box>
          <Button
              sx={{
                color: '#23CCEF',
                border: '0.1px solid #23CCEF',
                cursor: 'pointer',
                textTransform: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                width: '160px',
              }}
              onClick={handleDownloadReport}
            >
              <DownloadIcon sx={{ marginLeft: '1px' }} />
              <Typography>Downlad Report</Typography>
            </Button>
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
export default ConsumerBillDetails;

