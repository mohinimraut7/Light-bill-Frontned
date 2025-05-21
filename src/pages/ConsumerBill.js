import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation,Link} from 'react-router-dom';

import { fetchBills, addBill, updateBillStatusAction, deleteBill, editBill, massBillApprovalsAction, massBillRollbackApprovalsAction } from '../store/actions/billActions';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box, Button, Modal, Checkbox,TextField,FormControl,InputLabel,Select,MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


import CheckIcon from '@mui/icons-material/Check';
import AddBill from '../components/modals/AddBill';
import AddPayment from '../components/modals/AddPayment';

import ConsumerButton from '../components/ConsumerButton';
import { toast } from "react-toastify";

import dayjs from 'dayjs';
import "react-toastify/dist/ReactToastify.css";
import './ConsumerBill.css';
import '../App.css';


import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import * as XLSX from 'xlsx';
import { CircularProgress} from '@mui/material';
import MonthYearPicker from '../components/MonthYearPicker';
import BillDatePicker from '../components/BillDatePicker';

import CustomWidthTooltip from '../components/CustomWidthTooltip';
import { AddRemarkModal } from '../components/modals/AddRemark';
import ViewRemarkModal from '../components/modals/ViewRemarkModal';
import wardDataAtoI from '../data/warddataAtoI';
const ConsumerBill = () => {
  const location = useLocation();
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
  const [showCMonthFaultyTable, setShowCMonthFaultyTable] = useState(false);
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

    if (bills) {
      const initialSelectedValues = bills.reduce((acc, bill, index) => {
        acc[index + 1] = bill?.forwardForGeneration ? 'Yes' : 'No';
        return acc;
      }, {});

      setSelectedValues(initialSelectedValues);
     
      const paid = bills.filter(bill => bill?.paymentStatus === 'paid')?.length;
      const unpaid = bills.filter(bill => bill?.paymentStatus === 'unpaid')?.length;
      
      setBillPaid(paid)
      setBillUnPaid(unpaid)
    }
  }, [bills]);



  useEffect(() => {
    if (!loading && bills.length > 0 && user) {
      const counts = { FAULTY: 0, NORMAL: 0, AVERAGE: 0 };
      
      const wardCounts = bills.reduce((acc, bill) => {
        if (bill.monthAndYear === currentMonthYear && 
            (user.role !== "Junior Engineer" || user.ward === bill.ward)) {  // ✅ Junior Engineer restriction
          counts[bill.meterStatus] = (counts[bill.meterStatus] || 0) + 1;

          acc[bill.ward] = (acc[bill.ward] || 0) + (bill.meterStatus === "FAULTY" ? 1 : 0);
        }
        return acc;
      }, {});

      // Ensure all wards have a count (even if zero)
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
    // if (user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user.ward === 'Head Office')) {
       if (
    user?.role === 'Super Admin' ||
    user?.role === 'Admin' ||
    user?.role === 'Executive Engineer' ||
    (user?.role === 'Junior Engineer' && user.ward === 'Head Office')
  ) {
    // If wardName is selected, filter by that ward
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
    
      // सर्व बिल्समध्ये remarks आहेत का?
    // const hasRemarks = selectedItems.every(item => item.remarks && item.remarks.length > 0);
    // if (!hasRemarks) {
    //     toast.error("Please approve before proceeding");
    //     return;
    // }

    // प्रत्येक बिलच्या remarks मध्ये user.role आणि user.signature आहे का तपासा
    // const allHaveUserRoleAndSignature = selectedItems.every(item => 
    //     item.remarks.some(remark => remark.role === user.role && remark.signature === user.signature)
    // );

    // if (!allHaveUserRoleAndSignature) {
    //     toast.error("Your role and signature must be present in remarks before processing");
    //     return;
    // }

    // जर सर्व चेक पास झाले, तर पुढील प्रोसेस सुरु करा
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
  
    // **Dynamic baseURL based on billType**
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
  
    return "#"; // Default return if `billType` does not match
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


//     if (cRDate) {
//       const crDateObj = new Date(cRDate);
// const cRYear = crDateObj.getFullYear();
// const cRMonth = crDateObj.getMonth(); 

   

//       filteredData = filteredData.filter(bill => {
//         if (bill.currentReadingDate) {
//           const billDateObj = new Date(bill.currentReadingDate);
//           const billYear = billDateObj.getFullYear();
//           const billMonth = billDateObj.getMonth(); 
    
          
//           return cRYear === billYear && cRMonth === billMonth;
//         }
//         return false; 
//       });
    
//     }



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
    // paymentStatus: bill?.paymentStatus || '-',
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

    // remark:bill.remark,
    }));

  const handleApproveClick = (bill, yesno) => {
    let approvedStatus;
    // let currentBillAmount;
    // let ifPaidBefore;
    // let ifPaidAfter;
    // let totalArrears;
    let netBillAmount;
    // let roundedBillAmount;
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
      // approvedStatus = 'PendingForSuperAdmin';
      approvedStatus = 'PendingForAdmin';
      paymentStatus = bill.paymentStatus ? bill.paymentStatus : 'unpaid';
    } 
    // else if (user?.role === 'Super Admin' && yesno === 'Yes') {
    //   approvedStatus = 'Done';
    //   paymentStatus = bill.paymentStatus ? bill.paymentStatus : 'unpaid';
    // } 
    // else if (user?.role === 'Super Admin' && yesno === 'No') {
    //   approvedStatus = 'PendingForSuperAdmin';
    //   paymentStatus = bill.paymentStatus ? bill.paymentStatus : 'unpaid';
    //   currentBillAmount = tArrears;
    //   ifPaidBefore = paidBefore;
    //   ifPaidAfter = paidAfter;
    //   totalArrears = tArrears
    //   netBillAmount = nBillAmount;
    //   roundedBillAmount = rBillAmount;
    // }
    // dispatch(updateBillStatusAction(bill._id, approvedStatus, paymentStatus, yesno, currentBillAmount, totalArrears, netBillAmount, roundedBillAmount, ifPaidBefore, ifPaidAfter));
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




    //old
       
    // {
   
    //   headerName: 'VIEW BILL',
    //   width: 80,
     
    //   renderCell: (params) => {
    //     const { billType, billDisplayParameter1, billDisplayParameter2, billDisplayParameter3, billDisplayParameter4 } = params.row;
    
    //     const billURL = generateBillURL(billType, billDisplayParameter1, billDisplayParameter2, billDisplayParameter3, billDisplayParameter4);
    
    //     return (
    //       <Link
    //         to={billURL}
         
    //         // style={{ textDecoration: 'none', color: 'dodgerblue', cursor: 'pointer',display:'flex',alignItems:'center',justifyContent:'center',width:'100%' }}
    //       >
    //         <VisibilityIcon/>
    //       </Link>
    //     );
    //   } 
      
    // },



    // ===========================================
    //new


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
    








// ----------------------------------------------------------
// testing

// { field: 'id', headerName: 'ID', width: 40, headerClassName: 'view-bill-column',
//   cellClassName: 'view-bill-cell', },


// {
//   field: '',
//   headerName: 'VIEW BILL',
//   width: 80,
//   headerClassName: 'view-bill-column',
//   cellClassName: 'view-bill-cell',
//   renderCell: (params) => {
//     const { billType, billDisplayParameter1, billDisplayParameter2, billDisplayParameter3, billDisplayParameter4 } = params.row;

// const billURL = generateBillURL(billType, billDisplayParameter1, billDisplayParameter2, billDisplayParameter3, billDisplayParameter4);

// return (
//       <Link
//         to={billURL}
//         target="_blank"
//         rel="noopener noreferrer"
//         style={{ textDecoration: 'none', color: 'dodgerblue', cursor: 'pointer',display:'flex',alignItems:'center',justifyContent:'center',width:'100%' }}
//       >
//         <VisibilityIcon/>
//       </Link>
//     );
//   } 
// },


// ==============================
    //  {
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
    //       {/* <IconButton sx={{ color: '#23CCEF' }} onClick={() => handleEditBill(params.row)}
    //         disabled={user.role === 'Junior Engineer' && (params.row.approvedStatus === 'PendingForExecutiveEngineer' || params.row.approvedStatus === 'PendingForAdmin' || params.row.approvedStatus === 'PendingForSuperAdmin' || params.row.approvedStatus === 'Done')}
    //       >
    //         <EditIcon />
    //       </IconButton> */}
    //     </>
    //   ),
    // },
    {
      field: 'consumerNumber',
      headerName: 'CONSUMER NO.',
      width: 130,
      
      renderCell: (params) => (
        <Link 
          to={`/consumer-bill-details/${params.row.consumerNumber}`} 
          state={{ consumerData: params.row }} 
          style={{ textDecoration: 'none', color: '#23CCEF' }}
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

    // { field: 'remark', headerName: 'REMARK', width: 130 },
    
      // ...(!user?.role === 'Junior Engineer'
      // ? [
      //   {
      //     field: 'actions',
      //     headerName: 'Actions',
      //     width: 200,
      //     renderCell: (params) => (
      //       <>
      //         <IconButton sx={{ color: '#23CCEF' }} onClick={() => handleApproveClick(params.row)}>
      //           <CheckIcon />
      //         </IconButton>
      //       </>
      //     ),
      //   },
      // ]
      // : []),


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

  const totalmeters = `${consumers.length}`;

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
      setSelectedRemarks([]); // Handle cases where there are no remarks
    }
    setIsRemarkModalOpen(true);
  };

  return (
    <div style={gridStyle}>
      <Box>
        
      </Box>
      {/* <Box sx={{display:'flex',mb:1, 
        mt:{
          xl:0,
          lg:0,
          md:5,
          sm:5,
          xs:5
        },
        justifyContent:{
            xs:'center',
            sm:'center',
            md:'center',
            xl:'flex-start',
            lg:'flex-start'
          },
          alignItems:{
            xs:'center',
            sm:'center',
            md:'center',
            xl:'flex-start',
            lg:'flex-start'
          }}}> <Typography sx={{color: '#0d2136',display:'flex',paddingTop:'20px'
       
          }} className="title-2">
            BILL MASTER
          </Typography></Box> */}

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
        
        width: {
      xl: isSidebarOpen ? '100%' : '85%',
      lg: isSidebarOpen ? '100%' : '100%',
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
  {/* <ConsumerButton  onClick={handleAddBillOpen} startIcon={<AddIcon/>}>Add Bill</ConsumerButton>            */}
</Box>
        <Box sx={{
          display:'flex',alignItems:'center',
          justifyContent:{xl:'space-between',
            lg:'space-between',
            md:'space-between',
            sm:'center',
            xs:'center'
          },
          width:{xl:'60%',
            lg:'60%',
            md:'60%',
            sm:'100%',
            xs:'100%'
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


{/* <MonthYearPicker cRDate={cRDate} handleCRDChange={handleCRDChange}  /> */}
<Box sx={{
  width:{xl:'35%',
            lg:'35%',
            md:'35%',
            sm:'35%',
            xs:'35%'
          },
}}>
  <BillDatePicker selectedMonthYear={selectedMonthYear} onChange={handleDateChange} />

</Box>


<TextField
    id="consumerNumber"
    name="consumerNumber"
    label="Search Consumer ID"
    value={cnId}
    onChange={
      handleChange}
    variant="outlined"
    InputProps={{
      sx: {
        height: '40px',
        mb:1
      },
    }}
    InputLabelProps={{
      sx: {
        color: 'gray',
        transform: 'translate(14px, 8px)',
        fontSize:'17px',
        transform: 'translate(14px, 8px)',
        '&.MuiInputLabel-shrink': {
transform: 'translate(14px, -8px) scale(0.75)', 
},
      },
     
    }}
    sx={{
      width: {
        xl: '48%',
        lg: '48%',
        md: '48%',
        sm: '80%',
        xs: '80%'
      }, 
      mt:{
        xs:1,
        sm:1,
        md:0,
        lg:1,
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
        sm: '40%',
        xs: '100%',
      },
      mt: { sm: 1,md:0,lg:0,xl:0 }, 
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

