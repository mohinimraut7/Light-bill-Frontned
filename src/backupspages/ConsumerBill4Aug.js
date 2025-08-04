import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

import { fetchBills, addBill, updateBillStatusAction, deleteBill, editBill, massBillApprovalsAction, massBillRollbackApprovalsAction } from '../store/actions/billActions';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box, Button, Modal, Checkbox,TextField,FormControl,InputLabel,Select,MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';



import AddBill from '../components/modals/AddBill';
import AddPayment from '../components/modals/AddPayment';

import ConsumerButton from '../components/ConsumerButton';
import { toast } from "react-toastify";

import dayjs from 'dayjs';
import "react-toastify/dist/ReactToastify.css";
import './ConsumerBill.css';
import '../App.css';

import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled } from '@mui/material/styles';

import DownloadIcon from '@mui/icons-material/Download';
import * as XLSX from 'xlsx';
import { CircularProgress} from '@mui/material';

import BillDatePicker from '../components/BillDatePicker';

import CustomWidthTooltip from '../components/CustomWidthTooltip';
import { AddRemarkModal } from '../components/modals/AddRemark';
import ViewRemarkModal from '../components/modals/ViewRemarkModal';
import wardDataAtoI from '../data/warddataAtoI';
const ConsumerBill = () => {
  
  const dispatch = useDispatch();
  const { bills, loading, error } = useSelector((state) => state.bills);
  
    const { consumers } = useSelector((state) => state?.consumers);
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
  const [userId, setUserId] = useState('');
  const [processBtnEnabled, setProcessBtnEnabled] = useState(false);
  const [rollbackBtnEnabled, setRollbackBtnEnabled] = useState(false);
  const [processExeBtnEnabled, setProcessExeBtnEnabled] = useState(false);
  const [rollbackExeBtnEnabled, setRollbackExeBtnEnabled] = useState(false);
  const [processAdmBtnEnabled, setProcessAdmBtnEnabled] = useState(false);
  const [rollbackAdmBtnEnabled, setRollbackAdmBtnEnabled] = useState(false);
  const [processSuperAdmBtnEnabled, setProcessSuperAdmBtnEnabled] = useState(false);
  const [rollbackSuperAdmBtnEnabled, setRollbackSuperAdmBtnEnabled] = useState(false);
  const [cnId, setCnId] = useState('');
  const [cRDate, setCRDate] = useState('');
  const [myear,setMyear]=useState('');
  const [wardFaultyCounts, setWardFaultyCounts] = useState({});
  const [totalFaultyMeters, setTotalFaultyMeters] = useState(0);
  
const [isRemarkModalOpen, setIsRemarkModalOpen] = useState(false);
  const [selectedRemarks, setSelectedRemarks] = useState([]);
  const [billRemarkOpen, setBillRemarkOpen] = useState(false);
const [wardName, setWardName] = useState('');
 const [selectedMonthYear, setSelectedMonthYear] = useState('');
  const allWards = ["Ward-A", "Ward-B", "Ward-C", "Ward-D", "Ward-E", "Ward-F", "Ward-G", "Ward-H", "Ward-I"];
 

  const currentDate = new Date();
const currentMonth = currentDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
const currentYear = currentDate.getFullYear();
const currentMonthYear = `${currentMonth}-${currentYear}`;

  useEffect(() => {
    dispatch(fetchBills());
  }, [dispatch, data]);

  useEffect(() => {
  if (bills && user) {
    const initialSelectedValues = bills.reduce((acc, bill, index) => {
      acc[index + 1] = bill?.forwardForGeneration ? 'Yes' : 'No';
      return acc;
    }, {});
    setSelectedValues(initialSelectedValues);
    
    const filteredBills = bills.filter((bill) =>
      bill.monthAndYear === currentMonthYear &&
      (
        user.role !== "Junior Engineer" ||
        user.ward === bill.ward ||
        (user.role === "Junior Engineer" && user.ward === "Head Office")
      )
    );

    const paid = filteredBills.filter(bill => bill?.paymentStatus === 'paid')?.length;
    const unpaid = filteredBills.filter(bill => bill?.paymentStatus === 'unpaid')?.length;

    setBillPaid(paid);
    setBillUnPaid(unpaid);
  }
}, [bills, user]);


  useEffect(() => {
    if (!loading && bills.length > 0 && user) {
      const counts = { FAULTY: 0, NORMAL: 0, AVERAGE: 0 };
      
      const wardCounts = bills.reduce((acc, bill) => {
        if (bill.monthAndYear === currentMonthYear && 
            (user.role !== "Junior Engineer" || user.ward === bill.ward||
  (user.role === "Junior Engineer" && user.ward === "Head Office") )) {  
          counts[bill.meterStatus] = (counts[bill.meterStatus] || 0) + 1;

          acc[bill.ward] = (acc[bill.ward] || 0) + (bill.meterStatus === "FAULTY" ? 1 : 0);
        }
        return acc;
      }, {});

      
      const finalWardCounts = allWards.reduce((acc, ward) => {
        acc[ward] = wardCounts[ward] || 0;
        return acc;
      }, {});

      setFaultyMeterCount(counts.FAULTY);
      setNormalMeterCount(counts.NORMAL);
      setAverageMeterCount(counts.AVERAGE);
      setWardFaultyCounts(finalWardCounts);
      setTotalFaultyMeters(counts.FAULTY);
    }
}, [bills, loading, user]);


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
          item => item?.approvedStatus === 'PendingForJuniorEngineer'
        )?.length;

        const pendingForExecutiveCount = bills.filter(
          item => item?.approvedStatus === 'PendingForExecutiveEngineer'
        )?.length;
        
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
      } 
      
      else if (user.role === 'Executive Engineer') {
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
          item => item?.approvedStatus === 'PendingForSuperAdmin'
        )?.length;
        const DoneCount = bills.filter(
          item => item?.approvedStatus === 'Done'
        )?.length;
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


  const handleChangeWard = (event) => {
    setWardName(event.target.value);
  };

  const getFilteredBills = () => {
    
       if (
    user?.role === 'Super Admin' ||
    user?.role === 'Admin' ||
    user?.role === 'Executive Engineer' ||
    (user?.role === 'Junior Engineer' && user.ward === 'Head Office')
  ) {
    
    if (wardName && wardName.trim() !== '') {
      return bills.filter((bill) => bill?.ward === wardName);
    }
      
      
      return bills;
    } 
    
    else if (user?.role.startsWith('Junior Engineer')) {
      const specificWard = user?.ward;
      return bills.filter((bill) => bill?.ward === specificWard);
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
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year} , ${month} - ${day}`;
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
        row.approvedStatus === 'PendingForAdmin' 
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
        row.approvedStatus === 'PendingForJuniorEngineer' 
      );
    } else if (user?.role === 'Super Admin') {
      return (
        row.approvedStatus === 'PendingForExecutiveEngineer' ||
        row.approvedStatus === 'PendingForAdmin' ||
        row.approvedStatus === 'PendingForJuniorEngineer' 
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
    console.log("selectedItems----",selectedItems)
    console.log("user checking<<<<<<<<<",user)
    if (selectedItems.length === 0) {
      toast.warn('No bills selected for processing');
      return;
    }
    
    
    console.log("Processing selected bills...");

 
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


  const generateBillURL = (billType, param1, param2, param3, param4) => {
    if (!billType || !param1 || !param2 || !param3) {
      return "#"; 
    }
  
    
    let baseURL = "";
  
    if (billType === "LT") {
      baseURL = "https://wss.mahadiscom.in/wss/wss?uiActionName=getPrintBillingDataLink";
      return `${baseURL}&A=${encodeURIComponent(param1)}&B=${encodeURIComponent(param2)}&C=${encodeURIComponent(param3)}&D=${encodeURIComponent(param4)}`;
    } 
    else if (billType === "LTIP") {
      baseURL = "https://wss.mahadiscom.in/wss/wss?uiActionName=getHTEnergyBillLinkPrint";
      return `${baseURL}&A=${encodeURIComponent(param1)}&B=${encodeURIComponent(param2)}&C=${encodeURIComponent(param3)}`;
    } 
    else if (billType === "HT") {
      baseURL = "https://wss.mahadiscom.in/wss/wss?uiActionName=getHTEnergyBillPagePDFPrintLinkEncrypted";
      return `${baseURL}&A=${encodeURIComponent(param1)}&B=${encodeURIComponent(param2)}&C=${encodeURIComponent(param3)}`;
    }
  
    return "#"; 
  };
  
 const handleDateChange = (value) => {
    const formattedValue = dayjs(value).format("MMM-YYYY").toUpperCase();
    setSelectedMonthYear(formattedValue);
  };

  const combinedData = [...filteredBills, ...data];
  


  let filteredData = cnId
  ? combinedData.filter(bill => bill.consumerNumber.includes(cnId))
  : combinedData;

   
  filteredData = filteredData.filter(
  bill => !selectedMonthYear || bill.monthAndYear.toUpperCase() === selectedMonthYear
);


    const toCapitalized = (text) => {
      return text
        ?.toLowerCase()
        .replace(/\b\w/g, (match) => match.toUpperCase());
    };

    const handleEditBillRemark = (bill) => {
      console.log("ahshashahshas>>>>>>>>",bill)
      setCurrentBill(bill);
      setBillRemarkOpen(true);
    };
    
    const handleAddBillRemark = (billData) => {
          dispatch(addBill(billData));
          handleAddBillRemarkClose();
        };
  const rows = 
    filteredData.map((bill, index) => ({
    _id: bill._id,
    id: index + 1,
    consumerNumber: bill?.consumerNumber,
    consumerName: bill?.consumerName,
    username: bill.username || '-',
    billType:bill?.billType,
    billDisplayParameter1:bill?.billDisplayParameter1,
    billDisplayParameter2:bill?.billDisplayParameter2,
    billDisplayParameter3:bill?.billDisplayParameter3,
    billDisplayParameter4:bill?.billDisplayParameter4,
    contactNumber: bill?.contactNumber,
    meterNumber: bill?.meterNumber || '-',
    place: bill?.place || '-',
    meterStatus: bill?.meterStatus||'-',
    phaseType: bill?.phaseType||'-',
    tariffDescription: bill?.tariffDescription||'-',
    netLoad:bill.netLoad||'-',
    sanctionedLoad:bill?.sanctionedLoad||'-',
    installationDate:bill?.installationDate||'-',
    totalConsumption: bill.totalConsumption,
    previousReadingDate: formatDate(bill.previousReadingDate),
    previousReading: bill.previousReading,
    monthAndYear:bill.monthAndYear,
    currentReadingDate: formatDate(bill.currentReadingDate),
    currentReading: bill.currentReading,
    billDate: formatDate(bill.billDate),
    currentBillAmount: bill.currentBillAmount,
    netBillAmount: bill.netBillAmount,
    roundedBillAmount: bill.roundedBillAmount,
    billingUnit:bill.billingUnit,
    ward: bill?.ward,
    paymentStatus: bill?.paymentStatus ? toCapitalized(bill.paymentStatus) : '-',
    approvedStatus: bill?.approvedStatus || 'PendingForJuniorEngineer',
    lastReceiptAmount: bill.lastReceiptAmount ? bill.lastReceiptAmount : 0,
    promptPaymentDate:bill.promptPaymentDate,
    promptPaymentAmount:bill.promptPaymentAmount,
    dueDate:bill.dueDate,
    netBillAmountWithDPC: bill.netBillAmountWithDPC||'-',
    phaseType:bill?.phaseType||'-',
    receiptNoBillPayment:bill.receiptNoBillPayment||'-',
    lastReceiptDate: formatDate(bill.lastReceiptDate)||'-',
    billPaymentDate:bill.billPaymentDate||'-',
    paidAmount:bill.paidAmount||'-',
    remark:bill.remark,
    remarks: bill.remarks,
    }));

  const handleApproveClick = (bill, yesno) => {
    let approvedStatus;
    let netBillAmount;
    if (!bill || !bill._id) {
      return;
    }
    let paymentStatus = bill.paymentStatus || 'unpaid';
    if (user?.role === 'Junior Engineer') {
      if (yesno === 'No') {
        approvedStatus = 'PendingForJuniorEngineer';
        paymentStatus = bill.paymentStatus ? bill.paymentStatus : 'unpaid';
        toast.info('Bill sent back to Junior Engineer for review');
      } else if (yesno === 'Yes' && paymentStatus === 'unpaid') {
        approvedStatus = 'PendingForExecutiveEngineer';
        paymentStatus =bill.paymentStatus ? bill.paymentStatus : 'unpaid';
        toast.success('Record forwarded to Executive Engineer');
      }
      else {
        approvedStatus = 'PendingForExecutiveEngineer';
        paymentStatus = bill.paymentStatus ? bill.paymentStatus : 'unpaid';
        toast.success('Record forwarded to Executive Engineer');
      }
    } else if (user?.role === 'Executive Engineer') {
      approvedStatus = 'PendingForAdmin';
      paymentStatus = bill.paymentStatus ? bill.paymentStatus : 'unpaid';
    } else if (user?.role === 'Admin') {
      approvedStatus = 'PendingForAdmin';
      paymentStatus = bill.paymentStatus ? bill.paymentStatus : 'unpaid';
    } 
    
    dispatch(updateBillStatusAction(bill._id, approvedStatus, paymentStatus, yesno, netBillAmount));

  };

  const handleChange = (event) => {
    setCnId(event.target.value);
  };
  const handleCRDChange = (value) => {
    console.log("Selected Month-Year:", value);
    setCRDate(value); 
  };
  
  const handleAddBillRemarkClose = () => setBillRemarkOpen(false);
  const columns = (handleDeleteBill) => [
    {
      field: 'checkbox',
      headerClassName: 'view-bill-column',
      cellClassName: 'view-bill-cell',
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
      renderCell: (params) => {
        const disableCheckbox =
          (user.role === 'Junior Engineer' &&
            (
              params.row.approvedStatus === 'PendingForAdmin' ||
              params.row.approvedStatus === 'PendingForSuperAdmin' ||
              params.row.approvedStatus === 'Done' 
            )
          ) ||
          (user.role === 'Executive Engineer' &&
            (
              params.row.approvedStatus === 'PendingForJuniorEngineer' ||
              params.row.approvedStatus === 'PendingForSuperAdmin' ||
              params.row.approvedStatus === 'Done' 
            )
          ) || (user.role === 'Admin' &&
            (
              params.row.approvedStatus === 'PendingForJuniorEngineer' ||
              params.row.approvedStatus === 'PendingForExecutiveEngineer' ||
              params.row.approvedStatus === 'Done' 
            )
          ) ||
          params.row.forwardForGeneration === 'Yes';
        return (
          <Checkbox
            checked={selectedItems.some((item) => item.id === params.row.id)}
            onChange={(event) => handleCheckboxChange(event, params.row)}
            disabled={disableCheckbox}
          />
        );  
      },
    },
   
    { field: 'id', headerName: 'ID', width: 40},




   

    { field: 'cont', headerName: 'VIEW BILL', width: 80,
      renderCell: (params) => {
        const { billType, billDisplayParameter1, billDisplayParameter2, billDisplayParameter3, billDisplayParameter4 } = params.row;
        const billURL = generateBillURL(billType, billDisplayParameter1, billDisplayParameter2, billDisplayParameter3, billDisplayParameter4);
return(
  <Link
  className="eyeconsumer"
  to={billURL}
   target="_blank"
  >
   <VisibilityIcon/>
  </Link>
 
)}

     },
    
    {
      field: 'consumerNumber',
      headerName: 'CONSUMER NO.',
      width: 130,
      
      renderCell: (params) => (
        <Link 
          to={`/consumer-bill-details/${params.row.consumerNumber}`} 
          state={{ consumerData: params.row }} 
          style={{ textDecoration: 'none', color:'#475569',fontWeight:'bold' }}
        >
          {params.row.consumerNumber}
        </Link>
      ),
    },
   
    
    { field: 'contactNumber', headerName: 'CONTACT NO.', width: 130 },
    { field: 'ward', headerName: 'WARD', width: 80 },
    { field: 'meterNumber', headerName: 'METER NO.', width: 130 },
    { field: 'monthAndYear', headerName: 'BILL MONTH', width: 130 },
    { field: 'consumerName', headerName: 'CONSUMER NAME', width: 130 },
    { field: 'billingUnit', headerName: 'BILLING UNIT', width: 130 },
    { field: 'totalConsumption', headerName: 'TOTAL CONSUMPTION', width: 130 },
    { field: 'meterStatus', headerName: 'METER STATUS', width: 130 },
    { field: 'phaseType', headerName: 'PHASE TYPE', width: 130 },
    { field: 'tariffDescription', headerName: 'TARIFF DESCRIPTION', width: 130 },
    { field: 'netLoad', headerName: 'NET LOAD', width: 130 },
    { field: 'sanctionedLoad', headerName: 'SANCTIONED LOAD', width: 130 },
    { field: 'installationDate', headerName: 'INSTALLATION DATE', width: 130 },
    { field: 'previousReadingDate', headerName: 'PREVIOUS READING DATE', width: 130 },
    { field: 'previousReading', headerName: 'PREVIOUS READING', width: 130 },
    { field: 'currentReadingDate', headerName: 'CURRENT READING DATE', width: 130 },
   
    { field: 'currentReading', headerName: 'CURRENT READING', width: 130 },
    { field: 'billDate', headerName: 'BILL DATE', width: 130 },
    { field: 'netBillAmount', headerName: 'NET BILL AMOUNT', width: 130 },
    { field: 'promptPaymentDate', headerName: 'PROMPT PAYMENT DATE', width: 130 },
    { field: 'promptPaymentAmount', headerName: 'PROMPT PAYMENT AMOUNT', width: 130 },
    { field: 'dueDate', headerName: 'DUE DATE', width: 130 },
    { field: 'netBillAmountWithDPC', headerName: 'NET BILL AMOUNT WITH DPC', width: 130 },
    { field: 'paymentStatus', headerName: 'PAYMENT STATUS', width: 130 },
    { field: 'lastReceiptAmount', headerName: 'LAST RECEIPT AMOUNT', width: 180 },
    { field: 'lastReceiptDate', headerName: 'LAST RECEIPT DATE', width: 180 }, 
    { field: 'billPaymentDate', headerName: 'BILL PAYMENT DATE', width: 165 }, 
    { field: 'paidAmount', headerName: 'PAID AMOUNT', width: 130 }, 
    { field: 'approvedStatus', headerName: 'APPROVED STATUS', width: 230 },
    {
      field: 'actions',
      headerName: 'ACTIONS',
      width: 250,
      renderCell: (params) => (
        <>  
{
  <Button size="small" sx={{ color: '#23CCEF'}} onClick={() => handleEditBillRemark(params.row)}
  disabled={user.role === 'Junior Engineer' && (params.row.approvedStatus === 'PendingForExecutiveEngineer' || params.row.approvedStatus === 'PendingForAdmin' || params.row.approvedStatus === 'PendingForSuperAdmin' || params.row.approvedStatus === 'Done')}
  startIcon={<AddIcon size="small"/>}
  variant='outlined'
>
Remark
</Button>
} 

<Button 
size="small" 
sx={{ color: '#23CCEF',ml:1}} 
onClick={() => handleViewRemark(params.row)} // Function to open the View Remark Modal
variant='outlined'
startIcon={  <VisibilityIcon/>}
>
Remark
</Button>
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
    padding: '0px 0px',
    paddingLeft: '10px',
  };
  const innerDivStyle = {
    width: '99%',
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

  const totalmeters = `${
  user?.role === 'Super Admin' ||
  user?.role === 'Admin' ||
  user?.role === 'Executive Engineer' ||
  (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')
    ? consumers.length
    : consumers.filter((c) => c?.ward === user?.ward).length
}`;


  const handleDownloadReport = () => {
    const filteredRows = rows.filter(row => row.meterStatus === 'FAULTY' || row.meterStatus === 'AVERAGE');
    const worksheet = XLSX.utils.json_to_sheet(filteredRows?.map(row => ({
      'ID': row.id,
      'Consumer No.': row.consumerNumber,
      'Email': row.email,
      'Contact Number': row.contactNumber,
      'Ward': row.ward,
      'Meter Number': row.meterNumber,
      'Total Consumption': row.totalConsumption,
      'Meter Status': row.meterStatus,
      'Previous Reading Date': row.previousReadingDate,
      'Previous Reading': row.previousReading,
      'Current Reading Date': row.currentReadingDate,
      'Current Reading': row.currentReading,
      'billDate': row.billDate,
      'Net Bill Amount': row.netBillAmount,
      'Prompt Payment Date': row.promptPaymentDate,
      'Prompt Payment Amount': row.promptPaymentAmount,
      'Due Date': row.dueDate,
      'NET BILL AMOUNT WITH DPC': row.netBillAmountWithDPC,
      'Last Receipt Amount': row.lastReceiptAmount,
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Bills');
    XLSX.writeFile(workbook, 'ConsumerBills.xlsx');
  };
  const downloadAllTypsOfReport = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows?.map(row => ({
      'ID': row.id,
      'Consumer No.': row.consumerNumber,
      'Email': row.email,
      'Contact Number': row.contactNumber,
      'Ward': row.ward,
      'Meter Number': row.meterNumber,
      'Total Consumption': row.totalConsumption,
      'Meter Status': row.meterStatus,
      'Previous Reading Date': row.previousReadingDate,
      'Previous Reading': row.previousReading,
      'Current Reading Date': row.currentReadingDate,
      'Current Reading': row.currentReading,
      'billDate': row.billDate,
      'Net Bill Amount': row.netBillAmount,
      'Prompt Payment Amount': row.promptPaymentAmount,
      'Due Date': row.dueDate,
      'NET BILL AMOUNT WITH DPC': row.netBillAmountWithDPC,
      'Last Receipt Date': row.lastReceiptDate,
      'paymentStatus':row.paymentStatus
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

  const handleViewRemark = (row) => {
    console.log("row",row)
    if (Array.isArray(row.remarks)) {
      setSelectedRemarks(row.remarks);
    } else {
      setSelectedRemarks([]); 
    }
    setIsRemarkModalOpen(true);
  };

  return (
    <div style={gridStyle}>
      <Box>
        
      </Box>
    

      <Box sx={{width:'100%',
   
      width:{xl:'100%',
        lg:'100%',
        md:'92%'
      },
      display:'flex',
   justifyContent:'space-between',

   flexDirection:{
    xl:'row',
    lg:'row',
    md:'row',
    sm:'column',
    xs:'column'
   },

    mt:{
      xl:8,
      lg:8,
      md:8,
      sm:8,
      xs:8
    },
           marginTop: isSidebarOpen === false? '5%' : '2%',
      }}>
        <Box sx={{display:'flex', justifyContent:{xl:'center',lg:'center',md:'center',sm:'center',xs:'center'},alignItems:{xl:'center',lg:'center',md:'center',sm:'center',xs:'center'},
flexDirection:{xl:'row',lg:'row',md:'row',sm:'row',xs:'row',} }}>
  <Typography sx={{color: '#0d2136',fontWeight:'bold'}} className="title-2">BILL MASTER</Typography>
  </Box>
      
      
        <Box sx={{display:'flex',flexDirection:{
    xl:'row',
    lg:'row',
    md:'row',
    sm:'column',
    xs:'column'
   },}}> <CustomWidthTooltip title={`Total Meters : ${totalmeters}`} placement="top">
          <Button sx={{color: '#373C5D','&:hover': { backgroundColor: '#F7F9FB' } }}  placement="top">Total Meter</Button>
        </CustomWidthTooltip>
        <CustomWidthTooltip title={`Normal Meter: ${normalMeterCount} , Faulty Meter: ${faultyMeterCount} , Average Meter:${averageMeterCount}`}  placement="top">
          <Button sx={{ color: '#373C5D', '&:hover': { backgroundColor: '#F7F9FB' } }}>Meter Status</Button>
        </CustomWidthTooltip>
        <CustomWidthTooltip title={`Total Paid Bills:${billPaid} , Total Unpaid Bills:${billUnPaid}`}  placement="top">
          <Button sx={{ color: '#373C5D', '&:hover': { backgroundColor: '#F7F9FB' } }}>Payment Status</Button>
        </CustomWidthTooltip></Box>

       
      </Box>

      <Box sx={innerDivStyle}>

        

        <Box sx={{ width: '100%', display: 'flex', justifyContent: {xl:'space-between',lg:'space-between',md:'space-between',sm:'space-between',xs:'center'},
        flexDirection:{xl:'row',lg:'row',md:'row',sm:'column',xs:'column'},
        mb: 2 }}>
         
          <Box sx={{ display: 'flex', width: {xl:'690px',lg:'1000px',md:'100%',sm:'100%',width:'100%'},
            justifyContent: {lg:'space-between',xl:'space-between',md:'space-between',sm:'center',xs:'center' },
            flexDirection:{
              lg:'row',
              xl:'row',
              md:'column',
              sm:'column',
              xs:'column'
            },
            alignItems: {lg:'space-between',xl:'space-between',md:'space-between',sm:'center',xs:'center' },

            
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

        <Box sx={{display:'flex',
        
        ml: {
          xl: isSidebarOpen ? 0 :0,
          lg: isSidebarOpen ? 0 : 0,
          md: isSidebarOpen ? 2.5 : 1,
         
        },
        gap:{
        lg:'5px'
        },
        width: {
      xl: isSidebarOpen ? '100%' : '85%',
      lg: isSidebarOpen ? '85%' : '80%',
      md: isSidebarOpen ? '95%' : '100%',
      sm: '100%',
      xs: '100%',
    },
        
        justifyContent:{
  xl:'space-between',
  lg:'space-between',
  md:'space-between',
  sm:'center',
  xs:'center'
        },
        
      alignItems:'center',
        
        mb:2,   
          flexDirection:{
            xl:'row',
            lg:'row',
            md:'row',
            sm:'column',
            xs:'column'
          }
        }}>

  <ConsumerButton onClick={handleProcessClick} disabled={user.role === 'Junior Engineer' && selectedItems.length > 0 &&
  selectedItems.every(item => item.approvedStatus === 'PendingForExecutiveEngineer')}>
  Process
</ConsumerButton>

<ConsumerButton onClick={handleReverseApprovals}
              disabled={
                user.role === 'Junior Engineer' &&
                selectedItems.length > 0 &&
                selectedItems.every(item => item.approvedStatus === 'PendingForJuniorEngineer')
              }>Rollback Approvals</ConsumerButton>

                <ConsumerButton  onClick={downloadAllTypsOfReport} startIcon={<DownloadIcon/>}>Download Reports</ConsumerButton>
 <ConsumerButton  onClick={handleDownloadReport} startIcon={<DownloadIcon/>}>Faulty | Average Bills</ConsumerButton>
  
</Box>
        <Box sx={{
          
          display:'flex',alignItems:'center',
          justifyContent:{xl:'space-between',
            lg:'space-between',
            md:'space-between',
            sm:'center',
            xs:'center'
          },

width: {
  xl:
    user.role === "Super Admin" ||
    user.role === "Admin" ||
    user.role === "Executive Engineer" ||
    (user.role === "Junior Engineer" && user.ward === "Head Office")
      ? "60%"
      : "40%",
  lg:
    user.role === "Super Admin" ||
    user.role === "Admin" ||
    user.role === "Executive Engineer" ||
    (user.role === "Junior Engineer" && user.ward === "Head Office")
      ? "60%"
      : "40%",
  md: "60%",
  sm: "100%",
  xs: "100%",
},

          gap:{
          lg:'5px'
          },
         flexDirection:{
          xl:'row',
          lg:'row',
          md:'row',
          sm:'column',
          xs:'column'
         },
          mb:5,}}
          >



<Box sx={{
  width:{xl:'35%',


            lg:user.role === "Junior Engineer"
      ? (user.ward === "Head Office" ? "35%" : "50%")
      : "35%",
        md: '48%',
        sm: '80%',
        xs: '80%',
            md:'35%',
            sm:'80%',
            xs:'80%'
          },
}}>
  <BillDatePicker selectedMonthYear={selectedMonthYear} onChange={handleDateChange} />

</Box>


<TextField
    id="consumerNumber"
    name="consumerNumber"
    label="Search Consumer ID"
    value={cnId}
    size="small"
    onChange={
      handleChange}
    variant="outlined"
    InputProps={{
      sx: {
       
      },
    }}
    InputLabelProps={{
      sx: {
        color: 'gray',
        transform: 'translate(14px, 8px)',
        
        transform: 'translate(14px, 8px)',
        '&.MuiInputLabel-shrink': {
transform: 'translate(14px, -8px) scale(0.75)', 
},
      },
     
    }}
    sx={{
      width: {
        xl: '48%',
        lg:user.role === "Junior Engineer"
      ? (user.ward === "Head Office" ? "35%" : "50%")
      : "35%",
        md: '48%',
        sm: '80%',
        xs: '80%'
      }, 
      mt:{
        xs:1,
        sm:1,
        md:0,
        lg:0,
        xl:1
      },
      ml:{
        md:1,
        lg:1
      }
      
    }}
  />


  {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer'||(user?.role==='Junior Engineer'&& user?.ward==='Head Office')) && (
    <FormControl
    fullWidth
    size="small"
    variant="outlined"
    sx={{
      width: {
        xl: '30%',
        lg: '30%',
        md: '30%',
        sm: '80%',
        xs: '80%',
      },
      mt: { xs:1,sm: 1,md:0,lg:0,xl:0 }, 
      ml:{
        xl:1,
        lg:1,
        md:1,
        sm:1
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
        <StyledDataGrid rows={rows}
          columns={columns(handleDeleteBill, handleEditBill)}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[5, 10, 15,25,35,45,55,100]}
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
        <Modal open={billRemarkOpen} onClose={handleAddBillRemarkClose}>
                  <AddRemarkModal open={billRemarkOpen} handleClose={handleAddBillRemarkClose} handleAddBill={handleAddBillRemark}
                    currentBill={currentBill}
                    editBill={(billId, billData) => {
                      dispatch(editBill(billId, billData));
                      dispatch(fetchBills());
                    }}
                  />
                </Modal>

         <ViewRemarkModal 
          open={isRemarkModalOpen} 
          onClose={() => setIsRemarkModalOpen(false)}   
          remarks={selectedRemarks} 
        />
      </Box>
    </div>
  );
};
export default ConsumerBill;

