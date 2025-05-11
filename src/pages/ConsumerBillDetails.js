import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBills, addBill, updateBillStatusAction, deleteBill, editBill } from '../store/actions/billActions';
import { DataGrid } from '@mui/x-data-grid';


import { Typography, Box, Button, Modal, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import AddPayment from '../components/modals/AddPayment';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './ConsumerBill.css';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import ExcelJS from 'exceljs';

import { CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { AddReceiptModal } from '../components/modals/AddReceipt';

import ConsumerButton from '../components/ConsumerButton';

const ConsumerBillDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  console.log("location", location)
  const { consumerData = {} } = location?.state || {};
  console.log("Testing consumerData",consumerData.meterNumber)
  const { bills, loading, error } = useSelector((state) => state.bills);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const [userId, setUserId] = useState('');
  const [cnId, setCnId] = useState('');
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
  console.log("user>>>testing", user)
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
  useEffect(() => {
    const checkProcessBtnEnable = () => {
      if (user.role === 'Junior Engineer') {

        const pendingForJuniorCount = bills.filter(
          item => item.approvedStatus === 'PendingForJuniorEngineer'
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
    if (user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user.role==='Junior Engineer' && user.ward==='Head Office')) {
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
  const handleChange = (event) => {
    setCnId(event.target.value);
  };
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
    const options = { month: 'long' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  const shouldDisplayTextField =
    location.pathname === '/specificconsumerbills' ||
    !location.pathname.startsWith('/consumer-bill-details/');

  console.log("shouldDisplayTextField", shouldDisplayTextField

  )
  const combinedData = [...filteredBills, ...data];
  const consumerId = consumerData?.consumerNumber || null;
  console.log("consumerId testing", consumerId)
  const rows = combinedData
    .filter(bill => {
      return (
        bill.consumerNumber === consumerId ||
        bill.consumerNumber === cnId
      );
    })
    .map((bill, index) => ({
      _id: bill._id,
      id: index + 1,
      dueDateMonth: formatDateMonth(bill.currentReadingDate),
      userId: bill.userId,
      consumerNumber: bill.consumerNumber,
      email: bill.email,
      username: bill.username || '-',
      contactNumber: bill?.contactNumber,
      meterNumber: bill?.meterNumber || '-',
      totalConsumption: bill.totalConsumption,
      meterStatus: bill.meterStatus || '-',
      phaseType: bill?.phaseType || '-',
      tariffDescription: bill?.tariffDescription || '-',
      netLoad: bill.netLoad || '-',
      sanctionedLoad: bill?.sanctionedLoad || '-',
    
      previousReadingDate: formatDate(bill.previousReadingDate) || '-',
      previousReading: bill.previousReading,
      currentReadingDate: formatDate(bill.currentReadingDate),
      currentReading: bill.currentReading,
      billDate: formatDate(bill.billDate),
      // currentBillAmount: bill.currentBillAmount,
      totalArrears: bill.totalArrears,
      netBillAmount: bill.netBillAmount,
      // roundedBillAmount: bill.roundedBillAmount,
      address: bill.address || '-',
      ward: bill?.ward,
      paymentStatus: bill.paymentStatus || '-',
      approvedStatus: bill.approvedStatus || 'PendingForJuniorEngineer',
      paidAmount: bill.paidAmount ? bill.paidAmount : 0,
      pendingAmount: bill.paidAmount ? bill.roundedBillAmount - bill.paidAmount : bill.roundedBillAmount,
      // ifPaidByThisDate: formatDate(bill.ifPaidByThisDate),
      // earlyPaymentAmount: bill.earlyPaymentAmount,
      // ifPaidBefore: bill.ifPaidBefore,
      dueDate: formatDate(bill.dueDate),
      // ifPaidAfter: bill.ifPaidAfter,
      receiptNoBillPayment: bill.receiptNoBillPayment||'-',
      lastReceiptAmount: bill.lastReceiptAmount ? bill.lastReceiptAmount : 0,
      promptPaymentDate:bill.promptPaymentDate,
      promptPaymentAmount:bill.promptPaymentAmount,
      dueDate:bill.dueDate,
      netBillAmountWithDPC: bill.netBillAmountWithDPC||'-',
      phaseType:bill?.phaseType||'-',
    
      lastReceiptDate: formatDate(bill.lastReceiptDate)||'-',
     
      forwardForGeneration: bill.forwardForGeneration,
      juniorEngineerContactNumber: bill.juniorEngineerContactNumber
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
    let paymentStatus = bill.paymentStatus || 'unpaid';
    if (user?.role === 'Junior Engineer') {
      if (yesno === 'No') {
        approvedStatus = 'PendingForJuniorEngineer';
        paymentStatus = bill.paymentStatus ? bill.paymentStatus : 'unpaid';
        toast.info('Bill sent back to Junior Engineer for review');
      } else if (yesno === 'Yes' && paymentStatus === bill.paymentStatus ? bill.paymentStatus : 'unpaid') {
        approvedStatus = 'PendingForExecutiveEngineer';
        paymentStatus =bill.paymentStatus ? bill.paymentStatus : 'unpaid';
        toast.success('Record forwarded to Executive Engineer');
      }
      else {
        approvedStatus = 'PendingForExecutiveEngineer';
        paymentStatus =bill.paymentStatus ? bill.paymentStatus : 'unpaid';
        toast.success('Record forwarded to Executive Engineer');
      }
    } else if (user?.role === 'Executive Engineer') {
      approvedStatus = 'PendingForAdmin';
      paymentStatus = bill.paymentStatus ? bill.paymentStatus : 'unpaid';
    } else if (user?.role === 'Admin') {
      approvedStatus = 'PendingForSuperAdmin';
      paymentStatus = bill.paymentStatus ? bill.paymentStatus : 'unpaid';
    } else if (user?.role === 'Super Admin' && yesno === 'Yes') {
      approvedStatus = 'Done';
      paymentStatus = bill.paymentStatus ? bill.paymentStatus : 'unpaid';
    } else if (user?.role === 'Super Admin' && yesno === 'No') {
      approvedStatus = 'PendingForSuperAdmin';
      paymentStatus = bill.paymentStatus ? bill.paymentStatus : 'unpaid';
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

    { field: 'dueDateMonth', headerName: 'महिना', width: 130 },
    { field: 'consumerNumber', headerName: 'ग्राहक क्रमांक', width: 130 },
    { field: 'meterNumber', headerName: 'मीटर क्रमांक', width: 130 },
    { field: 'ward', headerName: 'प्रभाग समिती', width: 130 },

    { field: 'contactNumber', headerName: 'ग्राहक संपर्क क्रमांक', width: 130 },
    { field: 'totalConsumption', headerName: 'एकूण वापर युनिट संख्या', width: 130 },

    { field: 'previousReadingDate', headerName: 'मागील रीडिंग दिनांक', width: 130 },
    // मागील रीडिंग दिनांक,चालू रीडिंग दिनांक
    { field: 'previousReading', headerName: 'मागील रीडिंग', width: 130 },
    { field: 'currentReadingDate', headerName: 'चालू रीडिंग दिनांक', width: 130 },
    { field: 'currentReading', headerName: 'चालू रीडिंग', width: 130 },
    { field: 'netBillAmount', headerName: 'देयकाची रक्कम', width: 130 },
    { field: 'dueDate', headerName: 'देयकाची अंतिम तारीख ', width: 130 },
    { field: 'meterStatus', headerName: 'मीटरची स्थिती', width: 130 },
    { field: 'netLoad', headerName: 'एकूण भार', width: 130 },
    { field: 'sanctionedLoad', headerName: 'मंजूर भार', width: 130 },
  
    { field: 'phaseType', headerName: 'फेज प्रकार', width: 130 },
    { field: 'tariffDescription', headerName: 'टॅरिफ डिस्क्रिप्शन', width: 130 },
    
    { field: 'receiptNoBillPayment', headerName: 'पावती क्रमांक ', width: 130 },
    { field: 'lastReceiptDate', headerName: 'बिल भरणा तारीख', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton sx={{ color: '#23CCEF' }} onClick={() => handleEditBill(params.row)}
            disabled={user.role === 'Junior Engineer' && (params.row.approvedStatus === 'PendingForExecutiveEngineer' || params.row.approvedStatus === 'PendingForAdmin' || params.row.approvedStatus === 'PendingForSuperAdmin' || params.row.approvedStatus === 'Done')}
          >
            <EditIcon />
          </IconButton>
        </>
      ),
    },
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
    marginTop: '1vh'
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

  const handleDownloadReport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Bills');

    const titles = [
      'नमुना नं १२०',
      '(नियम १४७) (२) पहा )',
      'वसई - विरार शहर महानगरपालिका',
      '२०-२० या वर्षांची विद्युत शक्तीच्या खपाची मीटर नोंद'
    ];

    titles.forEach((title, index) => {
      const row = worksheet.getRow(index + 1);
      row.getCell(1).value = title;


      row.getCell(1).alignment = { horizontal: 'center', vertical: 'center' };


      if (title === 'वसई - विरार शहर महानगरपालिका') {
        row.getCell(1).font = { bold: true, size: 20 };
        row.height = 42;
      } else if (title === 'नमुना नं १२०') {
        row.getCell(1).font = { bold: false, size: 18 };
        row.height = 32;
      } else {
        row.getCell(1).font = { bold: true };
        row.height = 32;
      }

      row.getCell(1).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };

      worksheet.mergeCells(index + 1, 1, index + 1, 16);
    });

    const headers = [
      'मीटर क्रमांक','ग्राहक संपर्क क्रमांक', 'महिना','एकूण युनिट', 'मागील रीडिंग दिनांक',
      'मागील रीडिंग', 'चालू रीडिंग दिनांक',
      'चालू रीडिंग', 'देयकाची रक्कम', 'देयकाची अंतिम तारीख ',
      'मीटरची स्थिती', 'एकूण भार', 'मंजूर भार','फेज प्रकार','पावती क्रमांक',
      'बिल भरणा तारीख',
    ];
    worksheet.addRow([]);
    worksheet.addRow(headers).font = { bold: true };

    
    rows.forEach(rowData => {
      worksheet.addRow([
      
        rowData?.meterNumber || 'N/A',
        rowData.contactNumber || 'N/A',
        rowData.dueDateMonth || 'N/A',
        rowData.totalConsumption || 'N/A',
        rowData.previousReadingDate || 'N/A',
        rowData.previousReading || 'N/A',
        rowData.currentReadingDate || 'N/A',
        rowData.currentReading || 'N/A',
        rowData.netBillAmount || 'N/A',
        rowData.dueDate || 'N/A',
        rowData.meterStatus || 'N/A',
        rowData.netLoad || 'N/A',
        rowData.sanctionedLoad || 'N/A',
        rowData.phaseType || 'N/A',
        rowData.receiptNoBillPayment || 'N/A',
        // rowData.billPaymentDate || 'N/A',
        rowData.lastReceiptDate || 'N/A',

      ]);
    });


    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ConsumerBills.xlsx';
    link.click();
  };

const handleDownloadPDF = () => {
  try {
      const pdfContent = document.createElement('div');
      pdfContent.style.fontFamily = 'NotoSerifDevanagari';
      pdfContent.style.fontSize = '16px';
      pdfContent.style.textAlign = 'center';
      pdfContent.style.position = 'absolute';
      pdfContent.style.left = '-9999px';
      pdfContent.innerHTML = `
          <p><strong>नमुना नं १२०</strong></p>
          <p>(नियम १४७) (२) पहा )</p>
          <p><strong style="font-size: 18px;">वसई विरार शहर महानगरपालिका</strong></p>
          <table style="width: 100%; font-size: 12px; border-collapse: collapse; margin-top: 20px;">
              <thead>
                  <tr>
                      <th>ग्राहक क्रमांक</th>
                      <th>मीटर क्रमांक</th>
                      <th>ग्राहक संपर्क क्रमांक</th>
                      <th>मीटरची स्थिती</th>
                      <th>मंजूर भार</th>
                      <th>फेज प्रकार</th>
                  </tr>
              </thead>
              <tbody id="firstGroupBody"></tbody>
          </table>
      `;

      const firstGroupBody = pdfContent.querySelector("#firstGroupBody");

      
      if (rows.length > 0) {
          const firstRow = rows[0]; 
          const firstGroupData = [
              firstRow.consumerNumber || 'N/A',
              firstRow.meterNumber || 'N/A',
              firstRow.contactNumber || 'N/A',
             
              firstRow.meterStatus || 'N/A',
              firstRow.sanctionedLoad || 'N/A',
              firstRow.phaseType || 'N/A'
          ];

          const firstDataRow = document.createElement('tr');
          firstGroupData.forEach((cellData) => {
              const td = document.createElement('td');
              td.style.border = '1px solid black';
              td.style.padding = '5px';
              td.textContent = cellData;
              firstDataRow.appendChild(td);
          });
          firstGroupBody.appendChild(firstDataRow);
      }
      const groupedRows = rows.reduce((acc, row) => {
          const year = new Date(row.currentReadingDate).getFullYear();
          if (!acc[year]) {
              acc[year] = [];
          }
          acc[year].push(row);
          return acc;
      }, {});
      Object.keys(groupedRows).forEach((year) => {
          const yearHeading = document.createElement('table');
          yearHeading.innerHTML = `
              <thead>
                  <tr>
                      <th colspan="11" style="text-align: center; background-color: #f2f2f2;">वर्ष: ${year}</th>
                  </tr>
                  <tr>
                      <th>महिना</th>
                      <th>एकूण युनिट</th>
                      <th>मागील रीडिंग दिनांक</th>
                      <th>मागील रीडिंग</th>
                      <th>चालू रीडिंग दिनांक</th>
                      <th>चालू रीडिंग</th>
                      <th>देयकाची रक्कम</th>
                      <th>देयकाची अंतिम तारीख</th>
                      <th>बिल भरणा तारीख</th>
                      <th>एकूण भार</th>
                  </tr>
              </thead>
              <tbody></tbody>
          `;
          const yearTableBody = yearHeading.querySelector("tbody");
          groupedRows[year].forEach((row) => {
              const thirdGroupData = [
                  row.dueDateMonth || 'N/A',
                  row.totalConsumption || 'N/A',
                  row.previousReadingDate || 'N/A',
                  row.previousReading || 'N/A',
                  row.currentReadingDate || 'N/A',
                  row.currentReading || 'N/A',
                  row.netBillAmount || 'N/A',
                  row.dueDate || 'N/A',
                  row.lastReceiptDate || 'N/A',
                  row.netLoad || 'N/A'
              ];
              const thirdDataRow = document.createElement('tr');
              thirdGroupData.forEach((cellData) => {
                  const td = document.createElement('td');
                  td.style.border = '1px solid black';
                  td.style.padding = '5px';
                  td.textContent = cellData;
                  thirdDataRow.appendChild(td);
              });
              yearTableBody.appendChild(thirdDataRow);
          });

        
          pdfContent.appendChild(yearHeading);
      });

      document.body.appendChild(pdfContent);

      
      html2canvas(pdfContent).then((canvas) => {
          const doc = new jsPDF({ orientation: 'landscape' });
          const imgData = canvas.toDataURL('image/png');
          const pageWidth = doc.internal.pageSize.getWidth();
          const imgWidth = pageWidth - 20;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
          doc.save('ConsumerBills.pdf');
          document.body.removeChild(pdfContent);
      });
  } catch (error) {
      console.error('Error generating PDF:', error);
  }
};
const handleDeleteBill = (billId) => {
    dispatch(deleteBill(billId));
  };
  const handleEditBill = (bill) => {
    setCurrentBill(bill);
    setBillOpen(true);
  };
  const getResponsiveWidth = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 600) {
      return '100%';
    } else {
      return isSidebarOpen ? '29%' : '28%';
    }
  };
  const responsiveWidth = shouldDisplayTextField === false ? '50%' : '55%';
  return (
    <div style={gridStyle}>
      <Box sx={{
        width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', flexDirection: 'column',
        marginTop: {
          xl: '10px',
          lg: '10px',
          md: '10px',
          sm: '80x',
          xs: '80px'
        }
      }}>
        <Box><Typography>नमुना  नं  १२०</Typography></Box>
        <Box><Typography>(नियम १४७)  (२) पहा )</Typography></Box>
        <Box><Typography
          variant="h6"
          sx={{
            fontSize: { xl: '30px', lg: '30px', md: '20px', sm: '20px', xs: '18px' },
            fontWeight: 'bold', color: '#000'
          }}
        >वसई - विरार शहर महानगरपालिका </Typography></Box>
        <Box>
          <Typography sx={{ fontSize: { xl: '17px', lg: '17px', md: '20px', sm: '12px', xs: '12px' }, }}>२०-२० या वर्षांची विद्युत  शक्तीच्या खपाची मीटर नोंद </Typography>
        </Box>
      </Box>
      <Box sx={innerDivStyle}>
        <Box sx={{
          display: 'flex', width: '100%', justifyContent: 'space-between', flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'column',
            lg: 'row',
            xl: 'row'
          }
        }}>
          <Box>
           {location.pathname.includes('/consumer-bill-details/')&&(
            <>
             <Box sx={{
              display: 'flex',
              justifyContent: { xl: 'flex-start', lg: 'flex-start', md: 'cener', sm: 'center', xs: 'center' }
            }}>
              <Typography sx={{
                fontSize: {
                  xl: '16px',
                  lg: '16px',
                  md: '15px',
                  sm: '12px',
                  xs: '12px'
                }
              }}>मीटर क्रमांक : </Typography>
              <Typography sx={{
                fontSize: {
                  xl: '16px',
                  lg: '16px',
                  md: '15px',
                  sm: '12px',
                  xs: '12px'
                },
              }}>
                
                {consumerData?.meterNumber}
              </Typography>
            </Box>
            </>
           )}
           

            <Box sx={{
              display: 'flex',
              justifyContent: { xl: 'flex-start', lg: 'flex-start', md: 'cener', sm: 'center', xs: 'center' }
            }}>
              <Typography sx={{
                fontSize: {
                  xl: '16px',
                  lg: '16px',
                  md: '15px',
                  sm: '12px',
                  xs: '12px'
                }
              }}>प्रत्येक महिन्याचे / वार्षिक मीटर भाडे </Typography>
            </Box>
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: {
              xs: 'center',
              sm: 'center',
              md: shouldDisplayTextField === false ? 'flex-end' : 'space-between',
              lg: shouldDisplayTextField === false ? 'flex-end' : 'space-between',
              xl: shouldDisplayTextField === false ? 'flex-end' : 'space-between',
            },
            width: {
              xs: '90%',
              sm: '90%',
              md: responsiveWidth,
              lg: responsiveWidth,
              xl: responsiveWidth,
            },
            alignContent: 'center', alignItems: 'center',
            flexDirection: {
              xs: 'column',
              sm: 'column',
              md: 'row',
              lg: 'row',
              xl: 'row'
            }
          }}>
            {shouldDisplayTextField && (
              <TextField
              size="small"
                id="userId"
                name="userId"
                label="Search Consumer ID"
                value={cnId}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  sx: {
                    height: '40px',
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: '#DDDDDD',
                  },
                }}

                sx={{

                  width: {
                    xl: '35%',
                    lg: '35%',
                    md: '35%',
                    sm: '100%',
                    xs: '100%'
                  }, display: shouldDisplayTextField === false && 'none',
                }}
              />

            )}
            
            <Button
              sx={{
                color: '#23CCEF',
                border: '0.1px solid #23CCEF',
                cursor: 'pointer',
                textTransform: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                width: getResponsiveWidth(),
                height: '65%',
                mt: {
                  xs: '10px'
                },
                mb: {
                  xs: '10px'
                },
                marginLeft: {
                  xs: '30px',
                  sm: '30px',
                  md: shouldDisplayTextField === false ? '10px' : '0px',
                  lg: shouldDisplayTextField === false ? '10px' : '0px',
                  xl: shouldDisplayTextField === false ? '10px' : '0px',
                },

              }}
              onClick={handleDownloadReport}
            >
              <DownloadIcon sx={{ marginLeft: '1px' }} />
              <Typography sx={{
                fontSize: isSidebarOpen ? '12.2px' : '14px',

              }} >Download Report</Typography>
            </Button>


            <Button
              sx={{
                color: '#23CCEF',
                border: '0.1px solid #23CCEF',
                cursor: 'pointer',
                textTransform: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                width: getResponsiveWidth(),
                height: '65%',
                marginLeft: {
                  xs: '30px',
                  sm: '30px',
                  md: shouldDisplayTextField === false ? '10px' : '0px',
                  lg: shouldDisplayTextField === false ? '10px' : '0px',
                  xl: shouldDisplayTextField === false ? '10px' : '0px',
                },

              }}
              onClick={handleDownloadPDF}
            >
              <DownloadIcon />
              <Typography sx={{
                fontSize: isSidebarOpen ? '12.2px' : '14px'
              }}>Download PDF</Typography>
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
          sx={{ paddingRight: 0.5, paddingLeft: 0.5, marginTop: 2 }}
        />
      
        <Modal open={billOpen} onClose={handleAddBillClose}>
          <AddReceiptModal open={billOpen} handleClose={handleAddBillClose} handleAddBill={handleAddBill}
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



