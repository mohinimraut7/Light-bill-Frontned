

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocation, Link } from 'react-router-dom';
// import { fetchBills, addBill, updateBillStatusAction, deleteBill, editBill, massBillApprovalsAction, massBillRollbackApprovalsAction } from '../store/actions/billActions';
// import { DataGrid } from '@mui/x-data-grid';
// import { Typography, Box, Button, Modal, Checkbox, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import CheckIcon from '@mui/icons-material/Check';
// import AddBill from '../components/modals/AddBill';
// import AddPayment from '../components/modals/AddPayment';
// import ConsumerButton from '../components/ConsumerButton';
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import './ConsumerBill.css';
// import '../App.css';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import { styled } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';
// import DownloadIcon from '@mui/icons-material/Download';
// import * as XLSX from 'xlsx';
// import { CircularProgress } from '@mui/material';
// import MonthYearPicker from '../components/MonthYearPicker';
// import BillDatePicker from '../components/BillDatePicker';
// import BillDatePickerConsumerBill from '../components/BillDatePickerConsumerBill';



// import CustomWidthTooltip from '../components/CustomWidthTooltip';
// import { AddRemarkModal } from '../components/modals/AddRemark';
// import ViewRemarkModal from '../components/modals/ViewRemarkModal';
// import wardDataAtoI from '../data/warddataAtoI';
// import dayjs from 'dayjs';
// const ConsumerBill = () => {
//  const location = useLocation();
//  const dispatch = useDispatch();
//  const { bills, loading, error, pagination } = useSelector((state) => state.bills);
//  const { consumers } = useSelector((state) => state?.consumers);
//  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//  const [billOpen, setBillOpen] = useState(false);
//  const [currentBill, setCurrentBill] = useState(null);
//  const [addPaymentOpen, setAddPaymentOpen] = useState(false);
//  const [selectedBill, setSelectedBill] = useState(null);
//  const [selectedValues, setSelectedValues] = useState({});
//  const [normalMeterCount, setNormalMeterCount] = useState(0);
//  const [faultyMeterCount, setFaultyMeterCount] = useState(0);
//  const [averageMeterCount, setAverageMeterCount] = useState(0);
//  const [billPaid, setBillPaid] = useState(0);
//  const [billUnPaid, setBillUnPaid] = useState(0);
//  const [cBillAmount, setCBillAmount] = useState(0);
//  const [tArrears, setArrears] = useState(0);
//  const [nBillAmount, setNBillAmount] = useState(0);
//  const [rBillAmount, setRBillAmount] = useState(0);
//  const [paidBefore, setPaidBefore] = useState(0);
//  const [paidAfter, setPaidAfter] = useState(0);
//  const user = useSelector(state => state.auth.user);
//  const [data, setData] = useState([]);
//  const [selectedItems, setSelectedItems] = useState([]);
//  const [userId, setUserId] = useState('');
//  const [processBtnEnabled, setProcessBtnEnabled] = useState(false);
//  const [rollbackBtnEnabled, setRollbackBtnEnabled] = useState(false);
//  const [processExeBtnEnabled, setProcessExeBtnEnabled] = useState(false);
//  const [rollbackExeBtnEnabled, setRollbackExeBtnEnabled] = useState(false);
//  const [processAdmBtnEnabled, setProcessAdmBtnEnabled] = useState(false);
//  const [rollbackAdmBtnEnabled, setRollbackAdmBtnEnabled] = useState(false);
//  const [processSuperAdmBtnEnabled, setProcessSuperAdmBtnEnabled] = useState(false);
//  const [rollbackSuperAdmBtnEnabled, setRollbackSuperAdmBtnEnabled] = useState(false);
//  const [cnId, setCnId] = useState('');
//  const [cRDate, setCRDate] = useState('');
//  const [myear, setMyear] = useState('');
//  const [wardFaultyCounts, setWardFaultyCounts] = useState({});
//  const [totalFaultyMeters, setTotalFaultyMeters] = useState(0);
//  const [showCMonthFaultyTable, setShowCMonthFaultyTable] = useState(false);
//  const [isRemarkModalOpen, setIsRemarkModalOpen] = useState(false);
//  const [selectedRemarks, setSelectedRemarks] = useState([]);
//  const [selectedRemarkBillId, setSelectedRemarkBillId] = useState(null); // 3-Oct-2026
//  const [billRemarkOpen, setBillRemarkOpen] = useState(false);
//  const [wardName, setWardName] = useState('');
//  const [selectedMonthYear, setSelectedMonthYear] = useState('');
//  const [allBillsForDownload, setAllBillsForDownload] = useState([]); // New state for full dataset
//  const allWards = ["Ward-A", "Ward-B", "Ward-C", "Ward-D", "Ward-E", "Ward-F", "Ward-G", "Ward-H", "Ward-I"];
//  const [currentPage, setCurrentPage] = useState(1);
//  const [pageSize, setPageSize] = useState(10);
//  const [paginationModel, setPaginationModel] = useState({
//  page: 0,
//  pageSize: 10,
//  });

//  const currentDate = new Date();
//  const currentMonth = currentDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
//  const currentYear = currentDate.getFullYear();
//  const currentMonthYear = `${currentMonth}-${currentYear}`;

//  // Function to fetch bills with pagination and filters
//  const fetchBillsWithFilters = (page = 1, limit = 10, fetchAll = false) => {
//  const filters = {};
//  if (selectedMonthYear) {
//  filters.selectedMonthYear = selectedMonthYear;
//  }
//  if (cnId) {
//  filters.consumerNumber = cnId;
//  }

// //  if (wardName && (
// //  user?.role === 'Super Admin' ||
// //  user?.role === 'Admin' ||
// //  user?.role === 'Executive Engineer' ||
// //  (user?.role === 'Junior Engineer' && user.ward === 'Head Office')
// //  )) {
// //  filters.wardName = wardName;
// //  }



// // ✅ Always enforce ward for ward-wise Junior Engineer
// if (user?.role === 'Junior Engineer' && user?.ward !== 'Head Office') {
//   filters.wardName = user.ward;
// }
// // Existing logic remains same for others
// else if (wardName && (
//   user?.role === 'Super Admin' ||
//   user?.role === 'Admin' ||
//   user?.role === 'Executive Engineer' ||
//   (user?.role === 'Junior Engineer' && user.ward === 'Head Office')
// )) {
//   filters.wardName = wardName;
// }






//  dispatch(fetchBills(page, limit, filters, fetchAll));
//  };

//  useEffect(() => {
//  fetchBillsWithFilters(currentPage, pageSize);
//  }, [dispatch, currentPage, pageSize]);

//  // Fetch all bills for download when filters change
//  useEffect(() => {
//  if (selectedMonthYear || wardName || cnId) {
//  fetchBillsWithFilters(1, 10, true); // Fetch all records for download
//  }
//  }, [selectedMonthYear, cnId, wardName]);

//  // Update allBillsForDownload when bills are fetched
//  useEffect(() => {
//  setAllBillsForDownload(bills);
//  }, [bills]);

//  useEffect(() => {
//  if (bills && user) {
//  const initialSelectedValues = bills.reduce((acc, bill, index) => {
//  acc[index + 1] = bill?.forwardForGeneration ? 'Yes' : 'No';
//  return acc;
//  }, {});
//  setSelectedValues(initialSelectedValues);
//  const filteredBills = bills.filter((bill) =>
//  bill.monthAndYear === currentMonthYear &&
//  (
//  user.role !== "Junior Engineer" ||
//  user.ward === bill.ward ||
//  (user.role === "Junior Engineer" && user.ward === "Head Office")
//  )
//  );
//  const paid = filteredBills.filter(bill => bill?.paymentStatus === 'paid')?.length;
//  const unpaid = filteredBills.filter(bill => bill?.paymentStatus === 'unpaid')?.length;
//  setBillPaid(paid);
//  setBillUnPaid(unpaid);
//  }
//  }, [bills, user]);

//  useEffect(() => {
//  if (!loading && bills.length > 0 && user) {
//  const counts = { FAULTY: 0, NORMAL: 0, AVERAGE: 0 };
//  const wardCounts = bills.reduce((acc, bill) => {
//  if (bill.monthAndYear === currentMonthYear &&
//  (user.role !== "Junior Engineer" || user.ward === bill.ward ||
//  (user.role === "Junior Engineer" && user.ward === "Head Office"))) {
//  counts[bill.meterStatus] = (counts[bill.meterStatus] || 0) + 1;
//  acc[bill.ward] = (acc[bill.ward] || 0) + (bill.meterStatus === "FAULTY" ? 1 : 0);
//  }
//  return acc;
//  }, {});
//  const finalWardCounts = allWards.reduce((acc, ward) => {
//  acc[ward] = wardCounts[ward] || 0;
//  return acc;
//  }, {});
//  setFaultyMeterCount(counts.FAULTY);
//  setNormalMeterCount(counts.NORMAL);
//  setAverageMeterCount(counts.AVERAGE);
//  setWardFaultyCounts(finalWardCounts);
//  setTotalFaultyMeters(counts.FAULTY);
//  }
//  }, [bills, loading, user]);

//  useEffect(() => {
//  setCBillAmount(bills?.currentBillAmount);
//  setArrears(bills?.totalArrears);
//  setNBillAmount(bills?.netBillAmount);
//  setRBillAmount(bills?.roundedBillAmount);
//  setPaidAfter(bills?.ifPaidBefore);
//  setPaidBefore(bills?.ifPaidAfter);
//  }, []);

//  useEffect(() => {
//  const checkProcessBtnEnable = () => {
//  if (user.role === 'Junior Engineer') {
//  const pendingForJuniorCount = bills.filter(
//  item => item?.approvedStatus === 'PendingForJuniorEngineer'
//  )?.length;
//  const pendingForExecutiveCount = bills.filter(
//  item => item?.approvedStatus === 'PendingForExecutiveEngineer'
//  )?.length;
//  if (pendingForExecutiveCount > pendingForJuniorCount) {
//  setRollbackBtnEnabled(true);
//  setProcessBtnEnabled(false);
//  } else {
//  if (pendingForJuniorCount > 1) {
//  setProcessBtnEnabled(true);
//  setRollbackBtnEnabled(false);
//  } else if (pendingForJuniorCount === 1) {
//  setProcessBtnEnabled(false);
//  setRollbackBtnEnabled(true);
//  } else {
//  setProcessBtnEnabled(false);
//  setRollbackBtnEnabled(true);
//  }
//  }
//  } else if (user.role === 'Executive Engineer') {
//  const pendingForExecutiveCount = bills.filter(
//  item => item.approvedStatus === 'PendingForExecutiveEngineer'
//  ).length;
//  const pendingForAdminCount = bills.filter(
//  item => item.approvedStatus === 'PendingForAdminEngineer'
//  ).length;
//  if (pendingForAdminCount > pendingForExecutiveCount) {
//  setRollbackExeBtnEnabled(true);
//  setProcessExeBtnEnabled(false);
//  } else {
//  setRollbackExeBtnEnabled(false);
//  setProcessExeBtnEnabled(true);
//  }
//  } else if (user.role === 'Admin') {
//  const pendingForAdminCount = bills.filter(
//  item => item.approvedStatus === 'PendingForAdmin'
//  ).length;
//  const pendingForSuperAdminCount = bills.filter(
//  item => item.approvedStatus === 'PendingForSuperAdmin'
//  ).length;
//  if (pendingForSuperAdminCount > pendingForAdminCount) {
//  setRollbackAdmBtnEnabled(true);
//  setProcessAdmBtnEnabled(false);
//  } else {
//  setRollbackAdmBtnEnabled(false);
//  setProcessAdmBtnEnabled(true);
//  }
//  } else if (user.role === 'Super Admin') {
//  const pendingForSuperAdminCount = bills.filter(
//  item => item?.approvedStatus === 'PendingForSuperAdmin'
//  )?.length;
//  const DoneCount = bills.filter(
//  item => item?.approvedStatus === 'Done'
//  )?.length;
//  if (DoneCount > pendingForSuperAdminCount) {
//  setRollbackSuperAdmBtnEnabled(true);
//  setProcessSuperAdmBtnEnabled(false);
//  } else {
//  setRollbackSuperAdmBtnEnabled(false);
//  setProcessSuperAdmBtnEnabled(true);
//  }
//  } else {
//  setProcessExeBtnEnabled(false);
//  setRollbackExeBtnEnabled(true);
//  }
//  };
//  checkProcessBtnEnable();
//  }, [bills, user.role]);

//  const handlePaginationModelChange = (newPaginationModel) => {
//  setPaginationModel(newPaginationModel);
//  const newPage = newPaginationModel.page + 1;
//  const newPageSize = newPaginationModel.pageSize;
//  if (newPage !== currentPage || newPageSize !== pageSize) {
//  setCurrentPage(newPage);
//  setPageSize(newPageSize);
//  fetchBillsWithFilters(newPage, newPageSize);
//  }
//  };

//  const handleChangeWard = (event) => {
//  setWardName(event.target.value);
//  };

//  const getFilteredBills = () => {
//  if (
//  user?.role === 'Super Admin' ||
//  user?.role === 'Admin' ||
//  user?.role === 'Executive Engineer' ||
//  (user?.role === 'Junior Engineer' && user.ward === 'Head Office')
//  ) {
//  if (wardName && wardName.trim() !== '') {
//  return allBillsForDownload.filter((bill) => bill?.ward === wardName);
//  }
//  return allBillsForDownload;
//  } else if (user?.role.startsWith('Junior Engineer')) {
//  const specificWard = user?.ward;
//  return allBillsForDownload.filter((bill) => bill?.ward === specificWard);
//  }
//  return [];
//  };

//  const filteredBills = getFilteredBills();

//  if (loading) {
//  return (
//  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//  <CircularProgress />
//  </Box>
//  );
//  }
//  if (error) {
//  return <p>Error: {error}</p>;
//  }

//  const handleAddBillOpen = () => {
//  setBillOpen(true);
//  };
//  const handleAddBillClose = () => {
//  setBillOpen(false);
//  };
//  const handleAddBill = (billData) => {
//  dispatch(addBill(billData));
//  handleAddBillClose();
//  };
//  const handleAddPaymentClose = () => {
//  setAddPaymentOpen(false);
//  };

//  const formatDate = (dateString) => {
//  const date = new Date(dateString);
//  const year = date.getFullYear();
//  const month = date.toLocaleString('default', { month: 'long' });
//  const day = String(date.getDate()).padStart(2, '0');
//  return `${year} , ${month} - ${day}`;
//  };

//  const handleFileChange = (event) => {
//  const file = event.target.files[0];
//  if (!file) return;
//  const reader = new FileReader();
//  reader.onload = (e) => {
//  const data = new Uint8Array(e.target.result);
//  const workbook = XLSX.read(data, { type: 'array' });
//  const sheetName = workbook.SheetNames[0];
//  const worksheet = workbook.Sheets[sheetName];
//  const json = XLSX.utils.sheet_to_json(worksheet);
//  setData(json);
//  data.forEach((bill) => {
//  dispatch(addBill(bill));
//  });
//  };
//  reader.readAsArrayBuffer(file);
//  };

//  const isDisabledForEngineer = (row) => {
//  if (user?.role === 'Junior Engineer') {
//  return (
//  row.approvedStatus === 'PendingForSuperAdmin' ||
//  row.approvedStatus === 'Done' ||
//  row.approvedStatus === 'PendingForAdmin'
//  );
//  } else if (user?.role === 'Executive Engineer') {
//  return (
//  row.approvedStatus === 'PendingForSuperAdmin' ||
//  row.approvedStatus === 'Done' ||
//  row.approvedStatus === 'PendingForJuniorEngineer'
//  );
//  } else if (user?.role === 'Admin') {
//  return (
//  row.approvedStatus === 'PendingForExecutiveEngineer' ||
//  row.approvedStatus === 'Done' ||
//  row.approvedStatus === 'PendingForJuniorEngineer'
//  );
//  } else if (user?.role === 'Super Admin') {
//  return (
//  row.approvedStatus === 'PendingForExecutiveEngineer' ||
//  row.approvedStatus === 'PendingForAdmin' ||
//  row.approvedStatus === 'PendingForJuniorEngineer'
//  );
//  }
//  return false;
//  };

//  const handleSelectAll = (event) => {
//  if (event.target.checked) {
//  const selectableRows = rows.filter((row) => !isDisabledForEngineer(row));
//  setSelectedItems(selectableRows);
//  } else {
//  setSelectedItems([]);
//  }
//  };

//  const handleCheckboxChange = (event, row) => {
//  if (event.target.checked) {
//  setSelectedItems((prev) => [...prev, row]);
//  } else {
//  setSelectedItems((prev) => prev.filter((item) => item.id !== row.id));
//  }
//  };

//  const handleProcessClick = () => {
//  if (selectedItems.length === 0) {
//  toast.warn('No bills selected for processing');
//  return;
//  }
//  dispatch(massBillApprovalsAction(selectedItems));
//  setSelectedItems([]);
//  };

//  const handleReverseApprovals = () => {
//  if (selectedItems.length === 0) {
//  toast.warn('No bills selected for processing');
//  return;
//  }
//  dispatch(massBillRollbackApprovalsAction(selectedItems));
//  setSelectedItems([]);
//  };

//  const generateBillURL = (billType, param1, param2, param3, param4) => {
//  if (!billType || !param1 || !param2 || !param3) {
//  return "#";
//  }
//  let baseURL = "";
//  if (billType === "LT") {
//  baseURL = "https://wss.mahadiscom.in/wss/wss?uiActionName=getPrintBillingDataLink";
//  return `${baseURL}&A=${encodeURIComponent(param1)}&B=${encodeURIComponent(param2)}&C=${encodeURIComponent(param3)}&D=${encodeURIComponent(param4)}`;
//  } else if (billType === "LTIP") {
//  baseURL = "https://wss.mahadiscom.in/wss/wss?uiActionName=getHTEnergyBillLinkPrint";
//  return `${baseURL}&A=${encodeURIComponent(param1)}&B=${encodeURIComponent(param2)}&C=${encodeURIComponent(param3)}`;
//  } else if (billType === "HT") {
//  baseURL = "https://wss.mahadiscom.in/wss/wss?uiActionName=getHTEnergyBillPagePDFPrintLinkEncrypted";
//  return `${baseURL}&A=${encodeURIComponent(param1)}&B=${encodeURIComponent(param2)}&C=${encodeURIComponent(param3)}`;
//  }
//  return "#";
//  };

//  const handleDateChange = (value) => {
//  const formattedValue = dayjs(value).format("MMM-YYYY").toUpperCase();
//  setSelectedMonthYear(formattedValue);
//  };

//  const combinedData = [...filteredBills, ...data];

//  let filteredData = cnId
//  ? combinedData.filter(bill => bill.consumerNumber.includes(cnId))
//  : combinedData;

//  filteredData = filteredData.filter(
//  bill => !selectedMonthYear || bill.monthAndYear.toUpperCase() === selectedMonthYear
//  );

//  const toCapitalized = (text) => {
//  return text
//  ?.toLowerCase()
//  .replace(/\b\w/g, (match) => match.toUpperCase());
//  };

//  const handleEditBillRemark = (bill) => {
//  setCurrentBill(bill);
//  setBillRemarkOpen(true);
//  };

//  const handleAddBillRemark = (billData) => {
//  dispatch(addBill(billData));
//  handleAddBillRemarkClose();
//  };

//  const rows = filteredData.map((bill, index) => ({
//  id: paginationModel.page * paginationModel.pageSize + index + 1,
//  _id: bill._id,
//  consumerNumber: bill?.consumerNumber,
//  consumerName: bill?.consumerName,
//  username: bill.username || '-',
//  billType: bill?.billType,
//  billDisplayParameter1: bill?.billDisplayParameter1,
//  billDisplayParameter2: bill?.billDisplayParameter2,
//  billDisplayParameter3: bill?.billDisplayParameter3,
//  billDisplayParameter4: bill?.billDisplayParameter4,
//  contactNumber: bill?.contactNumber,
//  meterNumber: bill?.meterNumber || '-',
//  place: bill?.place || '-',
//  meterStatus: bill?.meterStatus || '-',
//  phaseType: bill?.phaseType || '-',
//  tariffDescription: bill?.tariffDescription || '-',
//  netLoad: bill.netLoad || '-',
//  sanctionedLoad: bill?.sanctionedLoad || '-',
//  installationDate: bill?.installationDate || '-',
//  totalConsumption: bill.totalConsumption,
//  previousReadingDate: formatDate(bill.previousReadingDate),
//  previousReading: bill.previousReading,
//  monthAndYear: bill.monthAndYear,
//  currentReadingDate: formatDate(bill.currentReadingDate),
//  currentReading: bill.currentReading,
//  billDate: formatDate(bill.billDate),
//  currentBillAmount: bill.currentBillAmount,
//  netBillAmount: bill.netBillAmount,
//  roundedBillAmount: bill.roundedBillAmount,
//  billingUnit: bill.billingUnit,
//  ward: bill?.ward,
//  paymentStatus: bill?.paymentStatus ? toCapitalized(bill.paymentStatus) : '-',
//  approvedStatus: bill?.approvedStatus || 'PendingForJuniorEngineer',
//  lastReceiptAmount: bill.lastReceiptAmount ? bill.lastReceiptAmount : 0,
//  promptPaymentDate: bill.promptPaymentDate,
//  promptPaymentAmount: bill.promptPaymentAmount,
//  dueDate: bill.dueDate,
//  netBillAmountWithDPC: bill.netBillAmountWithDPC || '-',
//  phaseType: bill?.phaseType || '-',
//  receiptNoBillPayment: bill.receiptNoBillPayment || '-',
//  lastReceiptDate: formatDate(bill.lastReceiptDate) || '-',
//  billPaymentDate: bill.billPaymentDate || '-',
//  paidAmount: bill.paidAmount || '-',
//  remark: bill.remark,
//  remarks: bill.remarks,
//  }));

//  const handleApproveClick = (bill, yesno) => {
//  let approvedStatus;
//  let paymentStatus = bill.paymentStatus || 'unpaid';
//  if (!bill || !bill._id) {
//  return;
//  }
//  if (user?.role === 'Junior Engineer') {
//  if (yesno === 'No') {
//  approvedStatus = 'PendingForJuniorEngineer';
//  paymentStatus = bill.paymentStatus ? bill.paymentStatus : 'unpaid';
//  toast.info('Bill sent back to Junior Engineer for review');
//  } else if (yesno === 'Yes' && paymentStatus === 'unpaid') {
//  approvedStatus = 'PendingForExecutiveEngineer';
//  paymentStatus = bill.paymentStatus ? bill.paymentStatus : 'unpaid';
//  toast.success('Record forwarded to Executive Engineer');
//  } else {
//  approvedStatus = 'PendingForExecutiveEngineer';
//  paymentStatus = bill.paymentStatus ? bill.paymentStatus : 'unpaid';
//  toast.success('Record forwarded to Executive Engineer');
//  }
//  } else if (user?.role === 'Executive Engineer') {
//  approvedStatus = 'PendingForAdmin';
//  paymentStatus = bill.paymentStatus ? bill.paymentStatus : 'unpaid';
//  } else if (user?.role === 'Admin') {
//  approvedStatus = 'PendingForAdmin';
//  paymentStatus = bill.paymentStatus ? bill.paymentStatus : 'unpaid';
//  }
//  dispatch(updateBillStatusAction(bill._id, approvedStatus, paymentStatus, yesno));
//  };

//  const handleChange = (event) => {
//  setCnId(event.target.value);
//  };

//  const handleCRDChange = (value) => {
//  setCRDate(value);
//  };

//  const handleAddBillRemarkClose = () => setBillRemarkOpen(false);

//  const columns = (handleDeleteBill) => [
//  {
//  field: 'checkbox',
//  headerClassName: 'view-bill-column',
//  cellClassName: 'view-bill-cell',
//  headerName: '',
//  width: 50,
//  headerClassName: 'data-grid-checkbox-header',
//  renderHeader: (params) => {
//  const allRowsChecked = rows.every(row =>
//  selectedItems.some(item => item.id === row.id)
//  );
//  const someRowsChecked = rows.some(row =>
//  selectedItems.some(item => item.id === row.id)
//  );
//  return (
//  <Checkbox
//  checked={allRowsChecked}
//  indeterminate={someRowsChecked && !allRowsChecked}
//  onChange={handleSelectAll}
//  />
//  );
//  },
//  renderCell: (params) => {
//  const disableCheckbox =
//  (user.role === 'Junior Engineer' &&
//  (
//  params.row.approvedStatus === 'PendingForAdmin' ||
//  params.row.approvedStatus === 'PendingForSuperAdmin' ||
//  params.row.approvedStatus === 'Done'
//  )
//  ) ||
//  (user.role === 'Executive Engineer' &&
//  (
//  params.row.approvedStatus === 'PendingForJuniorEngineer' ||
//  params.row.approvedStatus === 'PendingForSuperAdmin' ||
//  params.row.approvedStatus === 'Done'
//  )
//  ) || (user.role === 'Admin' &&
//  (
//  params.row.approvedStatus === 'PendingForJuniorEngineer' ||
//  params.row.approvedStatus === 'PendingForExecutiveEngineer' ||
//  params.row.approvedStatus === 'Done'
//  )
//  ) ||
//  params.row.forwardForGeneration === 'Yes';
//  return (
//  <Checkbox
//  checked={selectedItems.some((item) => item.id === params.row.id)}
//  onChange={(event) => handleCheckboxChange(event, params.row)}
//  disabled={disableCheckbox}
//  />
//  );
//  },
//  },
//  { field: 'id', headerName: 'ID', width: 40 },
//  {
//  field: 'cont',
//  headerName: 'VIEW BILL',
//  width: 80,
//  renderCell: (params) => {
//  const { billType, billDisplayParameter1, billDisplayParameter2, billDisplayParameter3, billDisplayParameter4 } = params.row;
//  const billURL = generateBillURL(billType, billDisplayParameter1, billDisplayParameter2, billDisplayParameter3, billDisplayParameter4);
//  return (
//  <Link
//  className="eyeconsumer"
//  to={billURL}
//  target="_blank"
//  >
//  <VisibilityIcon />
//  </Link>
//  );
//  }
//  },

// //  {
// //  field: 'consumerNumber',
// //  headerName: 'CONSUMER NO.',
// //  width: 130,
// //  renderCell: (params) => (
// //  <Link
// //  to={`/consumer-bill-details/${params.row.consumerNumber}`}
// //  state={{ consumerData: params.row }}
// //  style={{ textDecoration: 'none', color: '#475569', fontWeight: 'bold' }}
// //  >
// //  {params.row.consumerNumber}
// //  </Link>
// //  ),
// //  },

// { field: 'consumerNumber', headerName: 'CONSUMER NO.', width: 130 },


//  { field: 'contactNumber', headerName: 'CONTACT NO.', width: 130 },
//  { field: 'ward', headerName: 'WARD', width: 80 },
//  { field: 'meterNumber', headerName: 'METER NO.', width: 130 },
//  { field: 'monthAndYear', headerName: 'BILL MONTH', width: 130 },
//  { field: 'consumerName', headerName: 'CONSUMER NAME', width: 130 },
//  { field: 'billingUnit', headerName: 'BILLING UNIT', width: 130 },
//  { field: 'totalConsumption', headerName: 'TOTAL CONSUMPTION', width: 130 },
//  { field: 'meterStatus', headerName: 'METER STATUS', width: 130 },
//  { field: 'phaseType', headerName: 'PHASE TYPE', width: 130 },
//  { field: 'tariffDescription', headerName: 'TARIFF DESCRIPTION', width: 130 },
//  { field: 'netLoad', headerName: 'NET LOAD', width: 130 },
//  { field: 'sanctionedLoad', headerName: 'SANCTIONED LOAD', width: 130 },
//  { field: 'installationDate', headerName: 'INSTALLATION DATE', width: 130 },
//  { field: 'previousReadingDate', headerName: 'PREVIOUS READING DATE', width: 130 },
//  { field: 'previousReading', headerName: 'PREVIOUS READING', width: 130 },
//  { field: 'currentReadingDate', headerName: 'CURRENT READING DATE', width: 130 },
//  { field: 'currentReading', headerName: 'CURRENT READING', width: 130 },
//  { field: 'billDate', headerName: 'BILL DATE', width: 130 },
//  { field: 'netBillAmount', headerName: 'NET BILL AMOUNT', width: 130 },
//  { field: 'promptPaymentDate', headerName: 'PROMPT PAYMENT DATE', width: 130 },
//  { field: 'promptPaymentAmount', headerName: 'PROMPT PAYMENT AMOUNT', width: 130 },
//  { field: 'dueDate', headerName: 'DUE DATE', width: 130 },
//  { field: 'netBillAmountWithDPC', headerName: 'NET BILL AMOUNT WITH DPC', width: 130 },
//  { field: 'paymentStatus', headerName: 'PAYMENT STATUS', width: 130 },
//  { field: 'lastReceiptAmount', headerName: 'LAST RECEIPT AMOUNT', width: 180 },
//  { field: 'lastReceiptDate', headerName: 'LAST RECEIPT DATE', width: 180 },
//  { field: 'billPaymentDate', headerName: 'BILL PAYMENT DATE', width: 165 },
//  { field: 'paidAmount', headerName: 'PAID AMOUNT', width: 130 },
// //  { field: 'approvedStatus', headerName: 'APPROVED STATUS', width: 230 },
// //  {
// //  field: 'actions',
// //  headerName: 'ACTIONS',
// //  width: 250,
// //  renderCell: (params) => (
// //  <>
// //  <Button
// //  size="small"
// //  sx={{ color: '#23CCEF' }}
// //  onClick={() => handleEditBillRemark(params.row)}
// //  disabled={user.role === 'Junior Engineer' && (params.row.approvedStatus === 'PendingForExecutiveEngineer' || params.row.approvedStatus === 'PendingForAdmin' || params.row.approvedStatus === 'PendingForSuperAdmin' || params.row.approvedStatus === 'Done')}
// //  startIcon={<AddIcon size="small" />}
// //  variant='outlined'
// //  >
// //  Remark
// //  </Button>
// //  <Button
// //  size="small"
// //  sx={{ color: '#23CCEF', ml: 1 }}
// //  onClick={() => handleViewRemark(params.row)}
// //  variant='outlined'
// //  startIcon={<VisibilityIcon />}
// //  >
// //  Remark
// //  </Button>
// //  </>
// //  ),
// //  },
//  ];

//  const gridStyle = {
//  height: 'auto',
//  width: isSidebarOpen ? '80%' : '90%',
//  marginLeft: isSidebarOpen ? '19%' : '7%',
//  transition: 'margin-left 0.3s',
//  display: 'flex',
//  flexDirection: 'column',
//  justifyContent: 'center',
//  alignItems: 'center',
//  padding: '0px 0px',
//  paddingLeft: '10px',
//  };

//  const innerDivStyle = {
//  width: '99%',
//  };

//  const rowColors = ['#F7F9FB', 'white'];

//  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
//  '& .MuiDataGrid-cell': {
//  padding: theme.spacing(1),
//  },
//  '& .MuiDataGrid-row': {
//  '&:nth-of-type(odd)': {
//  backgroundColor: rowColors[0],
//  },
//  '&:nth-of-type(even)': {
//  backgroundColor: rowColors[1],
//  },
//  },
//  }));

//  const totalmeters = `${
//  user?.role === 'Super Admin' ||
//  user?.role === 'Admin' ||
//  user?.role === 'Executive Engineer' ||
//  (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')
//  ? consumers.length
//  : consumers.filter((c) => c?.ward === user?.ward).length
//  }`;

// //  const handleDownloadReport = () => {
// //  const filteredRows = filteredData.filter(row => row.meterStatus === 'FAULTY' || row.meterStatus === 'AVERAGE');
// //  const worksheet = XLSX.utils.json_to_sheet(filteredRows?.map(row => ({
// //  'ID': row.id,
// //  'Consumer No.': row.consumerNumber,
// //  'Email': row.email,
// //  'Contact Number': row.contactNumber,
// //  'Ward': row.ward,
// //  'Meter Number': row.meterNumber,
// //  'Total Consumption': row.totalConsumption,
// //  'Meter Status': row.meterStatus,
// //  'Previous Reading Date': row.previousReadingDate,
// //  'Previous Reading': row.previousReading,
// //  'Current Reading Date': row.currentReadingDate,
// //  'Current Reading': row.currentReading,
// //  'billDate': row.billDate,
// //  'Net Bill Amount': row.netBillAmount,
// //  'Prompt Payment Date': row.promptPaymentDate,
// //  'Prompt Payment Amount': row.promptPaymentAmount,
// //  'Due Date': row.dueDate,
// //  'NET BILL AMOUNT WITH DPC': row.netBillAmountWithDPC,
// //  'Last Receipt Amount': row.lastReceiptAmount,
// //  })));
// //  const workbook = XLSX.utils.book_new();
// //  XLSX.utils.book_append_sheet(workbook, worksheet, 'Bills');
// //  XLSX.writeFile(workbook, 'ConsumerBills.xlsx');
// //  };

 



// const handleDownloadReport = () => {
//   // Use FULL DATA from allBillsForDownload (not paginated filteredData)
//   const fullFaultyAverage = allBillsForDownload.filter(bill => 
//     bill.meterStatus === 'FAULTY' || bill.meterStatus === 'AVERAGE'
//   );

//   if (fullFaultyAverage.length === 0) {
//     toast.warn("No Faulty/Average bills found for selected filters");
//     return;
//   }

//   const worksheet = XLSX.utils.json_to_sheet(
//     fullFaultyAverage.map((bill, index) => ({
//       'Sr No.': index + 1,
//       'Consumer No.': bill.consumerNumber,
//       'Consumer Name': bill.consumerName || '-',
//       'Contact No.': bill.contactNumber,
//       'Ward': bill.ward,
//       'Meter No.': bill.meterNumber || '-',
//       'Bill Month': bill.monthAndYear,
//       'Total Consumption': bill.totalConsumption,
//       'Meter Status': bill.meterStatus,
//       'Previous Reading': bill.previousReading,
//       'Previous Reading Date': formatDate(bill.previousReadingDate),
//       'Current Reading': bill.currentReading,
//       'Current Reading Date': formatDate(bill.currentReadingDate),
//       'Bill Date': formatDate(bill.billDate),
//       'Net Bill Amount': bill.netBillAmount,
//       'Prompt Payment Amount': bill.promptPaymentAmount,
//       'Due Date': bill.dueDate,
//       'NET BILL WITH DPC': bill.netBillAmountWithDPC || '-',
//       'Last Receipt Amount': bill.lastReceiptAmount || 0,
//     }))
//   );

//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, 'Faulty_Average_Bills');
  
//   const fileName = `Faulty_Average_Bills_${selectedMonthYear || 'All'}_${wardName || 'All'}.xlsx`;
//   XLSX.writeFile(workbook, fileName);

//   toast.success(`${fullFaultyAverage.length} Faulty/Average bills downloaded!`);
// };




// const downloadAllTypsOfReport = () => {
//  const worksheet = XLSX.utils.json_to_sheet(filteredData?.map(row => ({
//  'ID': row.id,
//  'Consumer No.': row.consumerNumber,
//  'Email': row.email,
//  'Contact Number': row.contactNumber,
//  'Ward': row.ward,
//  'Meter Number': row.meterNumber,
//  'Total Consumption': row.totalConsumption,
//  'Meter Status': row.meterStatus,
//  'Previous Reading Date': row.previousReadingDate,
//  'Previous Reading': row.previousReading,
//  'Current Reading Date': row.currentReadingDate,
//  'Current Reading': row.currentReading,
//  'billDate': row.billDate,
//  'Net Bill Amount': row.netBillAmount,
//  'Prompt Payment Amount': row.promptPaymentAmount,
//  'Due Date': row.dueDate,
//  'NET BILL AMOUNT WITH DPC': row.netBillAmountWithDPC,
//  'Last Receipt Date': row.lastReceiptDate,
//  'paymentStatus': row.paymentStatus
//  })));
//  const workbook = XLSX.utils.book_new();
//  XLSX.utils.book_append_sheet(workbook, worksheet, 'Bills');
//  XLSX.writeFile(workbook, 'ConsumerBills.xlsx');
//  };

//  const handleDeleteBill = (billId) => {
//  dispatch(deleteBill(billId));
//  };

//  const handleEditBill = (bill) => {
//  setCurrentBill(bill);
//  setBillOpen(true);
//  };

//  const handleViewRemark = (row) => {
//  if (Array.isArray(row.remarks)) {
//  setSelectedRemarks(row.remarks);
//  } else {
//  setSelectedRemarks([]);
//  }
//  setSelectedRemarkBillId(row?._id || null); // 3-Oct-2026: signature on-demand fetch साठी
//  setIsRemarkModalOpen(true);
//  };

//  return (
//  <div style={gridStyle}>
//  <Box sx={{
//  width: '100%',
//  display: 'flex',
//  justifyContent: { xl: 'space-between', lg: 'space-between', md: 'space-between', sm: 'space-between', xs: 'center' },
//  flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' },
//  mt: isSidebarOpen === false ? '5%' : '2%',
//  }}>
//  <Box sx={{
//  display: 'flex',
//  justifyContent: { xl: 'center', lg: 'center', md: 'center', sm: 'center', xs: 'center' },
//  alignItems: { xl: 'center', lg: 'center', md: 'center', sm: 'center', xs: 'center' },
//  flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'row', xs: 'row' }
//  }}>
//  <Typography sx={{ color: '#0d2136', fontWeight: 'bold' }} className="title-2">BILL MASTER</Typography>
//  </Box>
//  <Box sx={{
//  display: 'flex',
//  flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' },
//  }}>
//  <CustomWidthTooltip title={`Total Meters : ${totalmeters}`} placement="top">
//  <Button sx={{ color: '#373C5D', '&:hover': { backgroundColor: '#F7F9FB' } }} placement="top">Total Meter</Button>
//  </CustomWidthTooltip>
//  <CustomWidthTooltip title={`Normal Meter: ${normalMeterCount} , Faulty Meter: ${faultyMeterCount} , Average Meter:${averageMeterCount}`} placement="top">
//  <Button sx={{ color: '#373C5D', '&:hover': { backgroundColor: '#F7F9FB' } }}>Meter Status</Button>
//  </CustomWidthTooltip>
//  <CustomWidthTooltip title={`Total Paid Bills:${billPaid} , Total Unpaid Bills:${billUnPaid}`} placement="top">
//  <Button sx={{ color: '#373C5D', '&:hover': { backgroundColor: '#F7F9FB' } }}>Payment Status</Button>
//  </CustomWidthTooltip>
//  </Box>
//  </Box>
//  <Box sx={innerDivStyle}>
//  <Box sx={{
 
//  width: '100%',
//  display: 'flex',
//  justifyContent: { xl: 'space-between', lg: 'space-between', md: 'space-between', sm: 'space-between', xs: 'center' },
//  flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' },
//  mb: 2
//  }}>
//  <Box sx={{

 
//  display: 'flex',
//  width: { xl: '690px', lg: '1000px', md: '100%', sm: '100%', width: '100%' },
//  justifyContent: { lg: 'space-between', xl: 'space-between', md: 'space-between', sm: 'center', xs: 'center' },
//  flexDirection: { lg: 'row', xl: 'row', md: 'column', sm: 'column', xs: 'column' },
//  alignItems: { lg: 'space-between', xl: 'space-between', md: 'space-between', sm: 'center', xs: 'center' },
//  }}>
//  <input
//  type="file"
//  accept=".xlsx, .xls"
//  onChange={handleFileChange}
//  style={{ display: 'none' }}
//  id="fileInput"
//  />
//  </Box>
//  </Box>
//  <Box sx={{

//  display: 'flex',
//  ml: { xl: isSidebarOpen ? 0 : 0, lg: isSidebarOpen ? 0 : 0, md: isSidebarOpen ? 2.5 : 1 },
//  gap: { lg: '5px' },
//  width: { xl: isSidebarOpen ? '100%' : '85%', lg: isSidebarOpen ? '85%' : '80%', md: isSidebarOpen ? '95%' : '100%', sm: '100%', xs: '100%' },
//  justifyContent: { xl: 'flex-start', lg: 'flex-start', md: 'flex-start', sm: 'center', xs: 'center' },
//  alignItems: 'center',
//  mb: 2,
//  flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' }
//  }}>
//  {/* <ConsumerButton
//  onClick={handleProcessClick}
//  disabled={user.role === 'Junior Engineer' && selectedItems.length > 0 &&
//  selectedItems.every(item => item.approvedStatus === 'PendingForExecutiveEngineer')}>
//  Process
//  </ConsumerButton> */}
//  {/* <ConsumerButton
//  onClick={handleReverseApprovals}
//  disabled={user.role === 'Junior Engineer' && selectedItems.length > 0 &&
//  selectedItems.every(item => item.approvedStatus === 'PendingForJuniorEngineer')}>
//  Rollback Approvals
//  </ConsumerButton> */}
//  <ConsumerButton onClick={downloadAllTypsOfReport} startIcon={<DownloadIcon />}>Download Reports</ConsumerButton>
//  <ConsumerButton onClick={handleDownloadReport} startIcon={<DownloadIcon />}>Faulty | Average Bills</ConsumerButton>


//  <Box sx={{
//   // border:'2px solid red',
//  display: 'flex',
//  alignItems: 'center',
// //  justifyContent: { xl: 'space-between', lg: 'space-between', md: 'space-between', sm: 'center', xs: 'center' },
//  width: {
//  xl: user.role === "Super Admin" || user.role === "Admin" || user.role === "Executive Engineer" || (user.role === "Junior Engineer" && user.ward === "Head Office") ? "60%" : "40%",
//  lg: user.role === "Super Admin" || user.role === "Admin" || user.role === "Executive Engineer" || (user.role === "Junior Engineer" && user.ward === "Head Office") ? "60%" : "40%",
//  md: "60%",
//  sm: "100%",
//  xs: "100%",
//  },
// //  gap: { lg: '5px' },
//  flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' },
// //  mb: 5,
//  }}>



//  <Box sx={{
//   // border:'1px solid red',
//  width: {
//  xl: '35%',
//  lg: user.role === "Junior Engineer" ? (user.ward === "Head Office" ? "35%" : "50%") : "35%",
//  md: '48%',
//  sm: '80%',
//  xs: '80%',
//  display:'flex',
//  alignItems:'center',
//  },
//  }}>
//  {/* <BillDatePicker selectedMonthYear={selectedMonthYear} onChange={handleDateChange} /> */}


//   <BillDatePickerConsumerBill selectedMonthYear={selectedMonthYear} onChange={handleDateChange} />

//  </Box>
//  <TextField
//  id="consumerNumber"
//  name="consumerNumber"
//  label="Search Consumer ID"
//  value={cnId}
//  size="small"
//  onChange={handleChange}
//  variant="outlined"
//  InputProps={{ sx: {} }}
//  InputLabelProps={{
//  sx: {
//  color: 'gray',
//  transform: 'translate(14px, 8px)',
//  '&.MuiInputLabel -shrink': { transform: 'translate(14px, -8px) scale(0.75)' },
//  },
//  }}
//  sx={{
//  width: { xl: '48%', lg: user.role === "Junior Engineer" ? (user.ward === "Head Office" ? "35%" : "50%") : "35%", md: '48%', sm: '80%', xs: '80%' },
// //  mt: { xs: 1, sm: 1, md: 0, lg: 0, xl: 1 },
//  ml: { md: 1, lg: 1 }
//  }}
//  />
//  {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
//  <FormControl
//  fullWidth
//  size="small"
//  variant="outlined"
//  sx={{
//  width: { xl: '30%', lg: '30%', md: '30%', sm: '80%', xs: '80%' },
//  mt: { xs: 1, sm: 1, md: 0, lg: 0, xl: 0 },
//  ml: { xl: 1, lg: 1, md: 1, sm: 1 }
//  }}
//  >
//  <InputLabel id="ward-label">Search Ward</InputLabel>
//  <Select
//  labelId="ward-label"
//  id="ward"
//  name="ward"
//  value={wardName}
//  onChange={handleChangeWard}
//  label="Search Ward"
//  >
//  {wardDataAtoI.length > 0 ? (
//  wardDataAtoI.map((ward, index) => (
//  <MenuItem key={index} value={ward.ward}>
//  {ward.ward}
//  </MenuItem>
//  ))
//  ) : (
//  <MenuItem disabled>No Wards Available</MenuItem>
//  )}
//  </Select>
//  </FormControl>
//  )}
//  </Box>

//  </Box>



 


//  <StyledDataGrid
//  rows={rows}
//  columns={columns(handleDeleteBill, handleEditBill)}
//  pagination
//  paginationMode="server"
//  paginationModel={paginationModel}
//  onPaginationModelChange={handlePaginationModelChange}
//  pageSizeOptions={[10, 25, 50, 100]}
//  rowCount={pagination.totalBills || 0}
//  loading={loading}
//  sx={{ paddingRight: 0.5, paddingLeft: 0.5 }}
//  />
//  <Modal open={billOpen} onClose={handleAddBillClose}>
//  <AddBill
//  open={billOpen}
//  handleClose={handleAddBillClose}
//  handleAddBill={handleAddBill}
//  currentBill={currentBill}
//  editBill={(billId, billData) => {
//  dispatch(editBill(billId, billData));
//  dispatch(fetchBills());
//  }}
//  />
//  </Modal>
//  <Modal open={addPaymentOpen} onClose={handleAddPaymentClose}>
//  <AddPayment open={addPaymentOpen} handleClose={handleAddPaymentClose} selectedBill={selectedBill} />
//  </Modal>
//  <Modal open={billRemarkOpen} onClose={handleAddBillRemarkClose}>
//  <AddRemarkModal
//  open={billRemarkOpen}
//  handleClose={handleAddBillRemarkClose}
//  handleAddBill={handleAddBillRemark}
//  currentBill={currentBill}
//  editBill={(billId, billData) => {
//  dispatch(editBill(billId, billData));
//  dispatch(fetchBills());
//  }}
//  />
//  </Modal>
//  <ViewRemarkModal
//  open={isRemarkModalOpen}
//  onClose={() => setIsRemarkModalOpen(false)}
//  remarks={selectedRemarks}
//  billId={selectedRemarkBillId}
//  />
//  </Box>
//  </div>
//  );
// };

// export default ConsumerBill;




import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { fetchBills, addBill, updateBillStatusAction, deleteBill, editBill, massBillApprovalsAction, massBillRollbackApprovalsAction } from '../store/actions/billActions';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box, Button, Modal, Checkbox, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// UI-only imports (redesign)
import { Paper, Chip, Breadcrumbs, InputAdornment, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import AddBill from '../components/modals/AddBill';
import AddPayment from '../components/modals/AddPayment';
import ConsumerButton from '../components/ConsumerButton';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './ConsumerBill.css';
import '../App.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
// UI-only icons (redesign)
import SearchIcon from '@mui/icons-material/Search';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SpeedIcon from '@mui/icons-material/Speed';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PaymentsIcon from '@mui/icons-material/Payments';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import * as XLSX from 'xlsx';
import { CircularProgress } from '@mui/material';
import MonthYearPicker from '../components/MonthYearPicker';
import BillDatePicker from '../components/BillDatePicker';
import BillDatePickerConsumerBill from '../components/BillDatePickerConsumerBill';



import CustomWidthTooltip from '../components/CustomWidthTooltip';
import { AddRemarkModal } from '../components/modals/AddRemark';
import ViewRemarkModal from '../components/modals/ViewRemarkModal';
import wardDataAtoI from '../data/warddataAtoI';
import dayjs from 'dayjs';

/* ================================================================== */
/* UI ONLY — theme tokens & presentational helpers (no business logic) */
/* ================================================================== */
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
  font: "'Montserrat', 'Noto Sans Devanagari', sans-serif",
};

const TONES = {
  blue: { fg: T.primary, bg: T.primarySurface, border: T.primaryBorder },
  green: { fg: T.green, bg: T.greenSurface, border: '#CDEFDC' },
  red: { fg: T.red, bg: T.redSurface, border: '#FAD4D4' },
  orange: { fg: T.orange, bg: T.orangeSurface, border: '#FBE1BF' },
};

// Display-only formatting. Row data & Excel exports still use the raw values.
const formatINR = (v) => {
  if (v === null || v === undefined || v === '' || v === '-') return '-';
  const n = Number(v);
  if (Number.isNaN(n)) return v;
  return `₹ ${n.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
};

const formatNum = (v) => {
  if (v === null || v === undefined || v === '' || v === '-') return '-';
  const n = Number(v);
  if (Number.isNaN(n)) return v;
  return n.toLocaleString('en-IN');
};

const STATUS_TONE = {
  NORMAL: 'green',
  FAULTY: 'red',
  AVERAGE: 'orange',
  PAID: 'green',
  UNPAID: 'orange',
  OVERDUE: 'red',
};

const StatusChip = ({ value }) => {
  if (!value || value === '-') return <span style={{ color: T.text2 }}>-</span>;
  const tone = TONES[STATUS_TONE[String(value).toUpperCase()]];
  if (!tone) return <span>{value}</span>;
  const label = String(value).charAt(0).toUpperCase() + String(value).slice(1).toLowerCase();
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        px: 1.25,
        py: 0.35,
        borderRadius: '999px',
        fontSize: 12,
        fontWeight: 600,
        lineHeight: 1.6,
        color: tone.fg,
        backgroundColor: tone.bg,
        border: `1px solid ${tone.border}`,
      }}
    >
      <Box component="span" sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: tone.fg }} />
      {label}
    </Box>
  );
};

const StatCard = ({ icon, label, value, tone = 'blue', tooltip }) => {
  const c = TONES[tone];
  return (
    <CustomWidthTooltip title={tooltip} placement="top">
      <Paper
        elevation={0}
        sx={{
          p: 1.75,
          borderRadius: '12px',
          border: `1px solid ${T.border}`,
          backgroundColor: T.card,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          minWidth: 0,
          transition: 'box-shadow .2s ease, border-color .2s ease',
          boxShadow: '0 1px 2px rgba(23, 32, 51, 0.04)',
          '&:hover': {
            borderColor: c.border,
            boxShadow: '0 6px 16px rgba(79, 114, 245, 0.08)',
          },
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            flexShrink: 0,
            borderRadius: '10px',
            display: 'grid',
            placeItems: 'center',
            color: c.fg,
            backgroundColor: c.bg,
            '& svg': { fontSize: 22 },
          }}
        >
          {icon}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontFamily: T.font, fontSize: 12, fontWeight: 500, color: T.text2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {label}
          </Typography>
          <Typography sx={{ fontFamily: T.font, fontSize: 22, fontWeight: 700, color: T.text, lineHeight: 1.2, fontVariantNumeric: 'tabular-nums' }}>
            {formatNum(value)}
          </Typography>
        </Box>
      </Paper>
    </CustomWidthTooltip>
  );
};

const NoRowsOverlay = () => (
  <Box sx={{ height: '100%', minHeight: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1, color: T.text2 }}>
    <Box sx={{ width: 52, height: 52, borderRadius: '14px', display: 'grid', placeItems: 'center', backgroundColor: T.primarySurface, color: T.primary }}>
      <ReceiptLongIcon />
    </Box>
    <Typography sx={{ fontFamily: T.font, fontWeight: 600, color: T.text, fontSize: 14 }}>No bills found</Typography>
    <Typography sx={{ fontFamily: T.font, fontSize: 12.5 }}>Try changing the month, consumer number or ward filter.</Typography>
  </Box>
);

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    backgroundColor: T.card,
    fontFamily: T.font,
    fontSize: 14,
    '& fieldset': { borderColor: T.border },
    '&:hover fieldset': { borderColor: T.primaryBorder },
    '&.Mui-focused fieldset': { borderColor: T.primary, borderWidth: 1.5 },
  },
  '& .MuiInputLabel-root': { fontFamily: T.font, fontSize: 14, color: T.text2 },
  '& .MuiInputLabel-root.Mui-focused': { color: T.primary },
};

const primaryBtnSx = {
  textTransform: 'none',
  fontFamily: T.font,
  fontWeight: 600,
  fontSize: 13.5,
  borderRadius: '10px',
  px: 2,
  height: 40,
  boxShadow: 'none',
  backgroundColor: T.primary,
  whiteSpace: 'nowrap',
  '&:hover': { backgroundColor: '#3F61E0', boxShadow: '0 4px 12px rgba(79,114,245,.25)' },
};

const secondaryBtnSx = {
  textTransform: 'none',
  fontFamily: T.font,
  fontWeight: 600,
  fontSize: 13.5,
  borderRadius: '10px',
  px: 2,
  height: 40,
  whiteSpace: 'nowrap',
  color: T.orange,
  borderColor: '#FBD9A8',
  backgroundColor: T.orangeSurface,
  '&:hover': { borderColor: T.orange, backgroundColor: '#FFEDD3' },
};
/* ======================= end UI-only helpers ======================= */

const ConsumerBill = () => {
 const location = useLocation();
 const dispatch = useDispatch();
 const { bills, loading, error, pagination } = useSelector((state) => state.bills);
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
 const [myear, setMyear] = useState('');
 const [wardFaultyCounts, setWardFaultyCounts] = useState({});
 const [totalFaultyMeters, setTotalFaultyMeters] = useState(0);
 const [showCMonthFaultyTable, setShowCMonthFaultyTable] = useState(false);
 const [isRemarkModalOpen, setIsRemarkModalOpen] = useState(false);
 const [selectedRemarks, setSelectedRemarks] = useState([]);
 const [selectedRemarkBillId, setSelectedRemarkBillId] = useState(null); // 3-Oct-2026
 const [billRemarkOpen, setBillRemarkOpen] = useState(false);
 const [wardName, setWardName] = useState('');
 const [selectedMonthYear, setSelectedMonthYear] = useState('');
 const [allBillsForDownload, setAllBillsForDownload] = useState([]); // New state for full dataset
 const allWards = ["Ward-A", "Ward-B", "Ward-C", "Ward-D", "Ward-E", "Ward-F", "Ward-G", "Ward-H", "Ward-I"];
 const [currentPage, setCurrentPage] = useState(1);
 const [pageSize, setPageSize] = useState(10);
 const [paginationModel, setPaginationModel] = useState({
 page: 0,
 pageSize: 10,
 });

 const currentDate = new Date();
 const currentMonth = currentDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
 const currentYear = currentDate.getFullYear();
 const currentMonthYear = `${currentMonth}-${currentYear}`;

 // Function to fetch bills with pagination and filters
 const fetchBillsWithFilters = (page = 1, limit = 10, fetchAll = false) => {
 const filters = {};
 if (selectedMonthYear) {
 filters.selectedMonthYear = selectedMonthYear;
 }
 if (cnId) {
 filters.consumerNumber = cnId;
 }

//  if (wardName && (
//  user?.role === 'Super Admin' ||
//  user?.role === 'Admin' ||
//  user?.role === 'Executive Engineer' ||
//  (user?.role === 'Junior Engineer' && user.ward === 'Head Office')
//  )) {
//  filters.wardName = wardName;
//  }



// ✅ Always enforce ward for ward-wise Junior Engineer
if (user?.role === 'Junior Engineer' && user?.ward !== 'Head Office') {
  filters.wardName = user.ward;
}
// Existing logic remains same for others
else if (wardName && (
  user?.role === 'Super Admin' ||
  user?.role === 'Admin' ||
  user?.role === 'Executive Engineer' ||
  (user?.role === 'Junior Engineer' && user.ward === 'Head Office')
)) {
  filters.wardName = wardName;
}






 dispatch(fetchBills(page, limit, filters, fetchAll));
 };

 useEffect(() => {
 fetchBillsWithFilters(currentPage, pageSize);
 }, [dispatch, currentPage, pageSize]);

 // Fetch all bills for download when filters change
 useEffect(() => {
 if (selectedMonthYear || wardName || cnId) {
 fetchBillsWithFilters(1, 10, true); // Fetch all records for download
 }
 }, [selectedMonthYear, cnId, wardName]);

 // Update allBillsForDownload when bills are fetched
 useEffect(() => {
 setAllBillsForDownload(bills);
 }, [bills]);

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
 (user.role !== "Junior Engineer" || user.ward === bill.ward ||
 (user.role === "Junior Engineer" && user.ward === "Head Office"))) {
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
 setCBillAmount(bills?.currentBillAmount);
 setArrears(bills?.totalArrears);
 setNBillAmount(bills?.netBillAmount);
 setRBillAmount(bills?.roundedBillAmount);
 setPaidAfter(bills?.ifPaidBefore);
 setPaidBefore(bills?.ifPaidAfter);
 }, []);

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
 } else {
 setProcessExeBtnEnabled(false);
 setRollbackExeBtnEnabled(true);
 }
 };
 checkProcessBtnEnable();
 }, [bills, user.role]);

 const handlePaginationModelChange = (newPaginationModel) => {
 setPaginationModel(newPaginationModel);
 const newPage = newPaginationModel.page + 1;
 const newPageSize = newPaginationModel.pageSize;
 if (newPage !== currentPage || newPageSize !== pageSize) {
 setCurrentPage(newPage);
 setPageSize(newPageSize);
 fetchBillsWithFilters(newPage, newPageSize);
 }
 };

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
 return allBillsForDownload.filter((bill) => bill?.ward === wardName);
 }
 return allBillsForDownload;
 } else if (user?.role.startsWith('Junior Engineer')) {
 const specificWard = user?.ward;
 return allBillsForDownload.filter((bill) => bill?.ward === specificWard);
 }
 return [];
 };

 const filteredBills = getFilteredBills();

 if (loading) {
 return (
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
 <CircularProgress sx={{ color: T.primary }} />
 <Typography sx={{ fontFamily: T.font, fontSize: 13, color: T.text2 }}>Loading consumer bills…</Typography>
 </Box>
 );
 }
 if (error) {
 return (
 <Box sx={{
 width: isSidebarOpen ? '80%' : '90%',
 ml: isSidebarOpen ? '19%' : '7%',
 mt: 6,
 p: 3,
 borderRadius: '12px',
 border: '1px solid #FAD4D4',
 backgroundColor: T.redSurface,
 display: 'flex',
 alignItems: 'center',
 gap: 1.5,
 }}>
 <ErrorOutlineIcon sx={{ color: T.red }} />
 <Typography component="p" sx={{ fontFamily: T.font, fontSize: 14, color: T.text, fontWeight: 600 }}>Error: {error}</Typography>
 </Box>
 );
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
 };

 const generateBillURL = (billType, param1, param2, param3, param4) => {
 if (!billType || !param1 || !param2 || !param3) {
 return "#";
 }
 let baseURL = "";
 if (billType === "LT") {
 baseURL = "https://wss.mahadiscom.in/wss/wss?uiActionName=getPrintBillingDataLink";
 return `${baseURL}&A=${encodeURIComponent(param1)}&B=${encodeURIComponent(param2)}&C=${encodeURIComponent(param3)}&D=${encodeURIComponent(param4)}`;
 } else if (billType === "LTIP") {
 baseURL = "https://wss.mahadiscom.in/wss/wss?uiActionName=getHTEnergyBillLinkPrint";
 return `${baseURL}&A=${encodeURIComponent(param1)}&B=${encodeURIComponent(param2)}&C=${encodeURIComponent(param3)}`;
 } else if (billType === "HT") {
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
 setCurrentBill(bill);
 setBillRemarkOpen(true);
 };

 const handleAddBillRemark = (billData) => {
 dispatch(addBill(billData));
 handleAddBillRemarkClose();
 };

 const rows = filteredData.map((bill, index) => ({
 id: paginationModel.page * paginationModel.pageSize + index + 1,
 _id: bill._id,
 consumerNumber: bill?.consumerNumber,
 consumerName: bill?.consumerName,
 username: bill.username || '-',
 billType: bill?.billType,
 billDisplayParameter1: bill?.billDisplayParameter1,
 billDisplayParameter2: bill?.billDisplayParameter2,
 billDisplayParameter3: bill?.billDisplayParameter3,
 billDisplayParameter4: bill?.billDisplayParameter4,
 contactNumber: bill?.contactNumber,
 meterNumber: bill?.meterNumber || '-',
 place: bill?.place || '-',
 meterStatus: bill?.meterStatus || '-',
 phaseType: bill?.phaseType || '-',
 tariffDescription: bill?.tariffDescription || '-',
 netLoad: bill.netLoad || '-',
 sanctionedLoad: bill?.sanctionedLoad || '-',
 installationDate: bill?.installationDate || '-',
 totalConsumption: bill.totalConsumption,
 previousReadingDate: formatDate(bill.previousReadingDate),
 previousReading: bill.previousReading,
 monthAndYear: bill.monthAndYear,
 currentReadingDate: formatDate(bill.currentReadingDate),
 currentReading: bill.currentReading,
 billDate: formatDate(bill.billDate),
 currentBillAmount: bill.currentBillAmount,
 netBillAmount: bill.netBillAmount,
 roundedBillAmount: bill.roundedBillAmount,
 billingUnit: bill.billingUnit,
 ward: bill?.ward,
 paymentStatus: bill?.paymentStatus ? toCapitalized(bill.paymentStatus) : '-',
 approvedStatus: bill?.approvedStatus || 'PendingForJuniorEngineer',
 lastReceiptAmount: bill.lastReceiptAmount ? bill.lastReceiptAmount : 0,
 promptPaymentDate: bill.promptPaymentDate,
 promptPaymentAmount: bill.promptPaymentAmount,
 dueDate: bill.dueDate,
 netBillAmountWithDPC: bill.netBillAmountWithDPC || '-',
 phaseType: bill?.phaseType || '-',
 receiptNoBillPayment: bill.receiptNoBillPayment || '-',
 lastReceiptDate: formatDate(bill.lastReceiptDate) || '-',
 billPaymentDate: bill.billPaymentDate || '-',
 paidAmount: bill.paidAmount || '-',
 remark: bill.remark,
 remarks: bill.remarks,
 }));

 const handleApproveClick = (bill, yesno) => {
 let approvedStatus;
 let paymentStatus = bill.paymentStatus || 'unpaid';
 if (!bill || !bill._id) {
 return;
 }
 if (user?.role === 'Junior Engineer') {
 if (yesno === 'No') {
 approvedStatus = 'PendingForJuniorEngineer';
 paymentStatus = bill.paymentStatus ? bill.paymentStatus : 'unpaid';
 toast.info('Bill sent back to Junior Engineer for review');
 } else if (yesno === 'Yes' && paymentStatus === 'unpaid') {
 approvedStatus = 'PendingForExecutiveEngineer';
 paymentStatus = bill.paymentStatus ? bill.paymentStatus : 'unpaid';
 toast.success('Record forwarded to Executive Engineer');
 } else {
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
 dispatch(updateBillStatusAction(bill._id, approvedStatus, paymentStatus, yesno));
 };

 const handleChange = (event) => {
 setCnId(event.target.value);
 };

 const handleCRDChange = (value) => {
 setCRDate(value);
 };

 const handleAddBillRemarkClose = () => setBillRemarkOpen(false);

 // UI-only column helpers: display formatting only, row values unchanged
 const amountCol = (field, headerName, width = 150) => ({
 field, headerName, width,
 headerAlign: 'right', align: 'right', cellClassName: 'cell-num',
 renderCell: (params) => formatINR(params.value),
 });
 const numCol = (field, headerName, width = 140) => ({
 field, headerName, width,
 headerAlign: 'right', align: 'right', cellClassName: 'cell-num',
 renderCell: (params) => formatNum(params.value),
 });

 const columns = (handleDeleteBill) => [
 {
 field: 'checkbox',
 headerClassName: 'view-bill-column',
 cellClassName: 'view-bill-cell',
 headerName: '',
 width: 52,
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
 size="small"
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
 size="small"
 checked={selectedItems.some((item) => item.id === params.row.id)}
 onChange={(event) => handleCheckboxChange(event, params.row)}
 disabled={disableCheckbox}
 />
 );
 },
 },
 { field: 'id', headerName: 'ID', width: 56, renderCell: (params) => <span style={{ color: T.text2 }}>{params.value}</span> },
 {
 field: 'cont',
 headerName: 'VIEW BILL',
 width: 90,
 align: 'center',
 headerAlign: 'center',
 renderCell: (params) => {
 const { billType, billDisplayParameter1, billDisplayParameter2, billDisplayParameter3, billDisplayParameter4 } = params.row;
 const billURL = generateBillURL(billType, billDisplayParameter1, billDisplayParameter2, billDisplayParameter3, billDisplayParameter4);
 return (
 <Link
 className="eyeconsumer"
 to={billURL}
 target="_blank"
 title="View original bill"
 style={{
 display: 'inline-grid',
 placeItems: 'center',
 width: 30,
 height: 30,
 borderRadius: 8,
 color: T.primary,
 backgroundColor: T.primarySurface,
 border: `1px solid ${T.primaryBorder}`,
 }}
 >
 <VisibilityIcon sx={{ fontSize: 17 }} />
 </Link>
 );
 }
 },

//  {
//  field: 'consumerNumber',
//  headerName: 'CONSUMER NO.',
//  width: 130,
//  renderCell: (params) => (
//  <Link
//  to={`/consumer-bill-details/${params.row.consumerNumber}`}
//  state={{ consumerData: params.row }}
//  style={{ textDecoration: 'none', color: '#475569', fontWeight: 'bold' }}
//  >
//  {params.row.consumerNumber}
//  </Link>
//  ),
//  },

 /* ---- Consumer details ---- */
 { field: 'consumerNumber', headerName: 'Consumer No.', width: 140, cellClassName: 'cell-strong' },
 { field: 'consumerName', headerName: 'Consumer Name', width: 190 },
 { field: 'contactNumber', headerName: 'Contact No.', width: 130 },
 { field: 'ward', headerName: 'Ward', width: 95 },
 { field: 'meterNumber', headerName: 'Meter No.', width: 130 },
 { field: 'monthAndYear', headerName: 'Bill Month', width: 115 },
 { field: 'billingUnit', headerName: 'Billing Unit', width: 115 },

 /* ---- Meter information ---- */
 { field: 'meterStatus', headerName: 'Meter Status', width: 135, renderCell: (params) => <StatusChip value={params.value} /> },
 { field: 'phaseType', headerName: 'Phase Type', width: 115 },
 { field: 'tariffDescription', headerName: 'Tariff Description', width: 180 },
 { field: 'netLoad', headerName: 'Net Load', width: 105 },
 { field: 'sanctionedLoad', headerName: 'Sanctioned Load', width: 140 },
 { field: 'installationDate', headerName: 'Installation Date', width: 150 },

 /* ---- Meter readings ---- */
 numCol('previousReading', 'Previous Reading', 145),
 { field: 'previousReadingDate', headerName: 'Previous Reading Date', width: 190 },
 numCol('currentReading', 'Current Reading', 140),
 { field: 'currentReadingDate', headerName: 'Current Reading Date', width: 190 },
 numCol('totalConsumption', 'Total Consumption', 155),

 /* ---- Billing information ---- */
 { field: 'billDate', headerName: 'Bill Date', width: 180 },
 amountCol('netBillAmount', 'Net Bill Amount', 145),
 { field: 'promptPaymentDate', headerName: 'Prompt Payment Date', width: 175 },
 amountCol('promptPaymentAmount', 'Prompt Payment Amount', 185),
 { field: 'dueDate', headerName: 'Due Date', width: 130 },
 amountCol('netBillAmountWithDPC', 'Net Bill Amount With DPC', 195),

 /* ---- Payment information ---- */
 { field: 'paymentStatus', headerName: 'Payment Status', width: 140, renderCell: (params) => <StatusChip value={params.value} /> },
 amountCol('lastReceiptAmount', 'Last Receipt Amount', 175),
 { field: 'lastReceiptDate', headerName: 'Last Receipt Date', width: 185 },
 { field: 'billPaymentDate', headerName: 'Bill Payment Date', width: 165 },
 amountCol('paidAmount', 'Paid Amount', 140),
//  { field: 'approvedStatus', headerName: 'APPROVED STATUS', width: 230 },
//  {
//  field: 'actions',
//  headerName: 'ACTIONS',
//  width: 250,
//  renderCell: (params) => (
//  <>
//  <Button
//  size="small"
//  sx={{ color: '#23CCEF' }}
//  onClick={() => handleEditBillRemark(params.row)}
//  disabled={user.role === 'Junior Engineer' && (params.row.approvedStatus === 'PendingForExecutiveEngineer' || params.row.approvedStatus === 'PendingForAdmin' || params.row.approvedStatus === 'PendingForSuperAdmin' || params.row.approvedStatus === 'Done')}
//  startIcon={<AddIcon size="small" />}
//  variant='outlined'
//  >
//  Remark
//  </Button>
//  <Button
//  size="small"
//  sx={{ color: '#23CCEF', ml: 1 }}
//  onClick={() => handleViewRemark(params.row)}
//  variant='outlined'
//  startIcon={<VisibilityIcon />}
//  >
//  Remark
//  </Button>
//  </>
//  ),
//  },
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
 paddingBottom: '24px',
 fontFamily: T.font,
 };

 const innerDivStyle = {
 width: '99%',
 };

 const rowColors = ['#FAFBFE', 'white'];

 const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
 border: `1px solid ${T.border}`,
 borderRadius: 12,
 backgroundColor: T.card,
 fontFamily: T.font,
 fontSize: 13,
 color: T.text,
 '& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeader': {
 backgroundColor: '#F3F6FC',
 },
 '& .MuiDataGrid-columnHeaders': {
 borderBottom: `1px solid ${T.border}`,
 },
 '& .MuiDataGrid-columnHeaderTitle': {
 fontWeight: 600,
 fontSize: 12,
 color: '#4A5875',
 letterSpacing: 0.2,
 },
 '& .MuiDataGrid-columnSeparator': { color: T.border },
 '& .MuiDataGrid-cell': {
 padding: theme.spacing(0, 1.25),
 borderBottom: `1px solid ${T.border}`,
 display: 'flex',
 alignItems: 'center',
 },
 '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
 outline: 'none',
 },
 '& .MuiDataGrid-row': {
 '&:nth-of-type(odd)': {
 backgroundColor: rowColors[0],
 },
 '&:nth-of-type(even)': {
 backgroundColor: rowColors[1],
 },
 '&:hover': {
 backgroundColor: T.primarySurface,
 },
 },
 '& .MuiDataGrid-footerContainer': {
 borderTop: `1px solid ${T.border}`,
 backgroundColor: '#FBFCFE',
 },
 '& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
 fontFamily: T.font,
 fontSize: 13,
 color: T.text2,
 },
 '& .MuiCheckbox-root.Mui-checked, & .MuiCheckbox-root.MuiCheckbox-indeterminate': { color: T.primary },
 '& .cell-num': { justifyContent: 'flex-end', fontVariantNumeric: 'tabular-nums' },
 '& .cell-strong': { fontWeight: 600 },
 }));

 const totalmeters = `${
 user?.role === 'Super Admin' ||
 user?.role === 'Admin' ||
 user?.role === 'Executive Engineer' ||
 (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')
 ? consumers.length
 : consumers.filter((c) => c?.ward === user?.ward).length
 }`;

//  const handleDownloadReport = () => {
//  const filteredRows = filteredData.filter(row => row.meterStatus === 'FAULTY' || row.meterStatus === 'AVERAGE');
//  const worksheet = XLSX.utils.json_to_sheet(filteredRows?.map(row => ({
//  'ID': row.id,
//  'Consumer No.': row.consumerNumber,
//  'Email': row.email,
//  'Contact Number': row.contactNumber,
//  'Ward': row.ward,
//  'Meter Number': row.meterNumber,
//  'Total Consumption': row.totalConsumption,
//  'Meter Status': row.meterStatus,
//  'Previous Reading Date': row.previousReadingDate,
//  'Previous Reading': row.previousReading,
//  'Current Reading Date': row.currentReadingDate,
//  'Current Reading': row.currentReading,
//  'billDate': row.billDate,
//  'Net Bill Amount': row.netBillAmount,
//  'Prompt Payment Date': row.promptPaymentDate,
//  'Prompt Payment Amount': row.promptPaymentAmount,
//  'Due Date': row.dueDate,
//  'NET BILL AMOUNT WITH DPC': row.netBillAmountWithDPC,
//  'Last Receipt Amount': row.lastReceiptAmount,
//  })));
//  const workbook = XLSX.utils.book_new();
//  XLSX.utils.book_append_sheet(workbook, worksheet, 'Bills');
//  XLSX.writeFile(workbook, 'ConsumerBills.xlsx');
//  };





const handleDownloadReport = () => {
  // Use FULL DATA from allBillsForDownload (not paginated filteredData)
  const fullFaultyAverage = allBillsForDownload.filter(bill =>
    bill.meterStatus === 'FAULTY' || bill.meterStatus === 'AVERAGE'
  );

  if (fullFaultyAverage.length === 0) {
    toast.warn("No Faulty/Average bills found for selected filters");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(
    fullFaultyAverage.map((bill, index) => ({
      'Sr No.': index + 1,
      'Consumer No.': bill.consumerNumber,
      'Consumer Name': bill.consumerName || '-',
      'Contact No.': bill.contactNumber,
      'Ward': bill.ward,
      'Meter No.': bill.meterNumber || '-',
      'Bill Month': bill.monthAndYear,
      'Total Consumption': bill.totalConsumption,
      'Meter Status': bill.meterStatus,
      'Previous Reading': bill.previousReading,
      'Previous Reading Date': formatDate(bill.previousReadingDate),
      'Current Reading': bill.currentReading,
      'Current Reading Date': formatDate(bill.currentReadingDate),
      'Bill Date': formatDate(bill.billDate),
      'Net Bill Amount': bill.netBillAmount,
      'Prompt Payment Amount': bill.promptPaymentAmount,
      'Due Date': bill.dueDate,
      'NET BILL WITH DPC': bill.netBillAmountWithDPC || '-',
      'Last Receipt Amount': bill.lastReceiptAmount || 0,
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Faulty_Average_Bills');

  const fileName = `Faulty_Average_Bills_${selectedMonthYear || 'All'}_${wardName || 'All'}.xlsx`;
  XLSX.writeFile(workbook, fileName);

  toast.success(`${fullFaultyAverage.length} Faulty/Average bills downloaded!`);
};




const downloadAllTypsOfReport = () => {
 const worksheet = XLSX.utils.json_to_sheet(filteredData?.map(row => ({
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
 'paymentStatus': row.paymentStatus
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
 if (Array.isArray(row.remarks)) {
 setSelectedRemarks(row.remarks);
 } else {
 setSelectedRemarks([]);
 }
 setSelectedRemarkBillId(row?._id || null); // 3-Oct-2026: signature on-demand fetch साठी
 setIsRemarkModalOpen(true);
 };

 // UI-only: same role condition the original JSX used to show the Ward dropdown
 const canPickWard =
 user?.role === 'Super Admin' ||
 user?.role === 'Admin' ||
 user?.role === 'Executive Engineer' ||
 (user?.role === 'Junior Engineer' && user?.ward === 'Head Office');
 const isWardLocked = user?.role === 'Junior Engineer' && user?.ward !== 'Head Office';

 const filterChipSx = { fontFamily: T.font, fontSize: 12, color: T.primary, backgroundColor: T.primarySurface, border: `1px solid ${T.primaryBorder}` };

 return (
 <div style={gridStyle}>
 {/* ================= PAGE HEADER ================= */}
 <Paper
 elevation={0}
 sx={{
 width: '99%',
 mt: isSidebarOpen === false ? '5%' : '2%',
 p: { xs: 2, md: 2.5 },
 borderRadius: '14px',
 border: `1px solid ${T.border}`,
 backgroundColor: T.card,
 display: 'flex',
 flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' },
 alignItems: { md: 'center', sm: 'flex-start', xs: 'flex-start' },
 justifyContent: 'space-between',
 gap: 2,
 }}
 >
 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75, minWidth: 0 }}>
 <Box sx={{
 width: 48, height: 48, borderRadius: '12px', flexShrink: 0,
 display: 'grid', placeItems: 'center',
 color: T.primary, backgroundColor: T.primarySurface, border: `1px solid ${T.primaryBorder}`,
 }}>
 <ReceiptLongIcon />
 </Box>
 <Box sx={{ minWidth: 0 }}>
 <Breadcrumbs separator="/" sx={{ '& .MuiBreadcrumbs-separator': { mx: 0.75, color: '#B4BFD2' } }}>
 <Typography sx={{ fontFamily: T.font, fontSize: 12, color: T.text2 }}>Home</Typography>
 <Typography sx={{ fontFamily: T.font, fontSize: 12, color: T.text2 }}>Consumer Bills</Typography>
 <Typography sx={{ fontFamily: T.font, fontSize: 12, color: T.primary, fontWeight: 600 }}>Bill Master</Typography>
 </Breadcrumbs>
 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexWrap: 'wrap' }}>
 <Typography sx={{ fontFamily: T.font, fontSize: { xs: 19, md: 22 }, fontWeight: 700, color: T.text, lineHeight: 1.3 }} className="title-2">
 Consumer Bill Master
 </Typography>
 <Chip
 size="small"
 label={`${formatNum(pagination?.totalBills || 0)} bills`}
 sx={{ fontFamily: T.font, fontWeight: 600, fontSize: 11.5, height: 22, color: T.orange, backgroundColor: T.orangeSurface, border: '1px solid #FBE1BF' }}
 />
 </Box>
 <Typography sx={{ fontFamily: T.font, fontSize: 13, color: T.text2, mt: 0.25 }}>
 Manage, review, filter and download consumer electricity bills.
 </Typography>
 </Box>
 </Box>

 <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', width: { xs: '100%', sm: '100%', md: 'auto' } }}>
 {/* <ConsumerButton
 onClick={handleProcessClick}
 disabled={user.role === 'Junior Engineer' && selectedItems.length > 0 &&
 selectedItems.every(item => item.approvedStatus === 'PendingForExecutiveEngineer')}>
 Process
 </ConsumerButton> */}
 {/* <ConsumerButton
 onClick={handleReverseApprovals}
 disabled={user.role === 'Junior Engineer' && selectedItems.length > 0 &&
 selectedItems.every(item => item.approvedStatus === 'PendingForJuniorEngineer')}>
 Rollback Approvals
 </ConsumerButton> */}
 <Button variant="contained" onClick={downloadAllTypsOfReport} startIcon={<DownloadIcon />} sx={{ ...primaryBtnSx, flex: { xs: 1, md: 'initial' } }}>
 Download Reports
 </Button>
 <Button variant="outlined" onClick={handleDownloadReport} startIcon={<DownloadIcon />} sx={{ ...secondaryBtnSx, flex: { xs: 1, md: 'initial' } }}>
 Faulty | Average Bills
 </Button>
 </Box>
 </Paper>

 <Box sx={innerDivStyle}>
 {/* Hidden Excel upload input — unchanged, still hidden */}
 <input
 type="file"
 accept=".xlsx, .xls"
 onChange={handleFileChange}
 style={{ display: 'none' }}
 id="fileInput"
 />

 {/* ================= SUMMARY CARDS (same values & tooltips as before) ================= */}
 <Box sx={{
 mt: 2,
 display: 'grid',
 gap: 1.5,
 gridTemplateColumns: { xs: 'repeat(2, minmax(0,1fr))', sm: 'repeat(3, minmax(0,1fr))', lg: 'repeat(6, minmax(0,1fr))' },
 }}>
 <StatCard tone="blue" icon={<SpeedIcon />} label="Total Meters" value={totalmeters} tooltip={`Total Meters : ${totalmeters}`} />
 <StatCard tone="green" icon={<CheckCircleOutlineIcon />} label="Normal Meters" value={normalMeterCount} tooltip={`Normal Meter: ${normalMeterCount} , Faulty Meter: ${faultyMeterCount} , Average Meter:${averageMeterCount}`} />
 <StatCard tone="red" icon={<ErrorOutlineIcon />} label="Faulty Meters" value={faultyMeterCount} tooltip={`Normal Meter: ${normalMeterCount} , Faulty Meter: ${faultyMeterCount} , Average Meter:${averageMeterCount}`} />
 <StatCard tone="orange" icon={<WarningAmberIcon />} label="Average Meters" value={averageMeterCount} tooltip={`Normal Meter: ${normalMeterCount} , Faulty Meter: ${faultyMeterCount} , Average Meter:${averageMeterCount}`} />
 <StatCard tone="green" icon={<PaymentsIcon />} label="Paid Bills" value={billPaid} tooltip={`Total Paid Bills:${billPaid} , Total Unpaid Bills:${billUnPaid}`} />
 <StatCard tone="orange" icon={<PendingActionsIcon />} label="Unpaid Bills" value={billUnPaid} tooltip={`Total Paid Bills:${billPaid} , Total Unpaid Bills:${billUnPaid}`} />
 </Box>

 {/* ================= FILTER TOOLBAR ================= */}
 <Paper
 elevation={0}
 sx={{
 mt: 2,
 mb: 2,
 p: { xs: 1.5, md: 2 },
 borderRadius: '14px',
 border: `1px solid ${T.border}`,
 backgroundColor: T.card,
 }}
 >
 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
 <FilterAltOutlinedIcon sx={{ fontSize: 19, color: T.primary }} />
 <Typography sx={{ fontFamily: T.font, fontWeight: 600, fontSize: 14, color: T.text }}>Filters</Typography>
 </Box>

 <Box sx={{
  // border:'2px solid red',
 display: 'grid',
 gap: 1.5,
 alignItems: 'center',
//  justifyContent: { xl: 'space-between', lg: 'space-between', md: 'space-between', sm: 'center', xs: 'center' },
 gridTemplateColumns: {
 xs: '1fr',
 sm: '1fr 1fr',
 md: canPickWard ? '1fr 1fr 1fr' : '1fr 1fr',
 },
//  gap: { lg: '5px' },
//  mb: 5,
 }}>

 <Box sx={{
  // border:'1px solid red',
 ...fieldSx,
 minWidth: 0,
 display: 'flex',
 alignItems: 'center',
 '& > *': { width: '100%' },
 }}>
 {/* <BillDatePicker selectedMonthYear={selectedMonthYear} onChange={handleDateChange} /> */}


  <BillDatePickerConsumerBill selectedMonthYear={selectedMonthYear} onChange={handleDateChange} />

 </Box>
 <TextField
 id="consumerNumber"
 name="consumerNumber"
 label="Search Consumer ID"
 value={cnId}
 size="small"
 onChange={handleChange}
 variant="outlined"
 fullWidth
 InputProps={{
 startAdornment: (
 <InputAdornment position="start">
 <SearchIcon sx={{ fontSize: 19, color: T.text2 }} />
 </InputAdornment>
 ),
 }}
 sx={{
 ...fieldSx,
//  mt: { xs: 1, sm: 1, md: 0, lg: 0, xl: 1 },
 }}
 />
 {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
 <FormControl
 fullWidth
 size="small"
 variant="outlined"
 sx={fieldSx}
 >
 <InputLabel id="ward-label">Search Ward</InputLabel>
 <Select
 labelId="ward-label"
 id="ward"
 name="ward"
 value={wardName}
 onChange={handleChangeWard}
 label="Search Ward"
 MenuProps={{ PaperProps: { sx: { borderRadius: '10px', mt: 0.5 } } }}
 >
 {wardDataAtoI.length > 0 ? (
 wardDataAtoI.map((ward, index) => (
 <MenuItem key={index} value={ward.ward} sx={{ fontFamily: T.font, fontSize: 14 }}>
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

 {(selectedMonthYear || cnId || (canPickWard && wardName) || isWardLocked) && (
 <>
 <Divider sx={{ my: 1.5, borderColor: T.border }} />
 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
 <Typography sx={{ fontFamily: T.font, fontSize: 12, color: T.text2, mr: 0.5 }}>Active filters:</Typography>
 {selectedMonthYear && <Chip size="small" label={`Month: ${selectedMonthYear}`} sx={filterChipSx} />}
 {cnId && <Chip size="small" label={`Consumer: ${cnId}`} sx={filterChipSx} />}
 {canPickWard && wardName && <Chip size="small" label={`Ward: ${wardName}`} sx={filterChipSx} />}
 {isWardLocked && (
 <Chip
 size="small"
 icon={<LockOutlinedIcon sx={{ fontSize: 14 }} />}
 label={`Ward: ${user?.ward} (assigned)`}
 sx={{ fontFamily: T.font, fontSize: 12, color: T.orange, backgroundColor: T.orangeSurface, border: '1px solid #FBE1BF', '& .MuiChip-icon': { color: T.orange } }}
 />
 )}
 </Box>
 </>
 )}
 </Paper>

 {/* ================= BILLS TABLE ================= */}
 <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, px: 0.5, flexWrap: 'wrap', gap: 1 }}>
 <Typography sx={{ fontFamily: T.font, fontWeight: 700, fontSize: 15, color: T.text }}>Consumer Bills</Typography>
 {selectedItems.length > 0 && (
 <Chip size="small" label={`${selectedItems.length} selected`} sx={{ fontFamily: T.font, fontWeight: 600, fontSize: 12, color: T.primary, backgroundColor: T.primarySurface }} />
 )}
 </Box>

 <StyledDataGrid
 rows={rows}
 columns={columns(handleDeleteBill, handleEditBill)}
 pagination
 paginationMode="server"
 paginationModel={paginationModel}
 onPaginationModelChange={handlePaginationModelChange}
 pageSizeOptions={[10, 25, 50, 100]}
 rowCount={pagination.totalBills || 0}
 loading={loading}
 rowHeight={48}
 columnHeaderHeight={46}
 slots={{ noRowsOverlay: NoRowsOverlay }}
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
 <AddPayment open={addPaymentOpen} handleClose={handleAddPaymentClose} selectedBill={selectedBill} />
 </Modal>
 <Modal open={billRemarkOpen} onClose={handleAddBillRemarkClose}>
 <AddRemarkModal
 open={billRemarkOpen}
 handleClose={handleAddBillRemarkClose}
 handleAddBill={handleAddBillRemark}
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
 billId={selectedRemarkBillId}
 />
 </Box>
 </div>
 );
};

export default ConsumerBill;