import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOverdueBills, updateBillStatusAction, deleteBill, editBill } from '../store/actions/billActions';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box, Button, Modal, Checkbox, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from '@mui/material/styles';
import dayjs from "dayjs";
import BillDatePicker from '../components/BillDatePicker';
import OverduebillDatePicker from '../components/OverduebillDatePicker';



const OverdueBills = () => {
  const dispatch = useDispatch();
  const { bills, loading, error, pagination } = useSelector((state) => state.bills);
  const isSidebarOpen = useSelector((state) => state.sidebar?.isOpen || false);
  const user = useSelector(state => state.auth?.user);
  
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedMonthYear, setSelectedMonthYear] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const page = paginationModel.page + 1; // Convert to 1-based indexing for backend
    const limit = paginationModel.pageSize;
    dispatch(fetchOverdueBills(page, limit, selectedMonthYear));
  }, [dispatch, paginationModel, selectedMonthYear]);

  const handlePaginationModelChange = (newModel) => {
    setPaginationModel(newModel);
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getFilteredBills = () => {
    console.log("bills.paymentStatus", bills);
    if (!bills) return [];
    
    if (user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) {
      return bills;
    } else if (user?.role?.startsWith('Junior Engineer')) {
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
    return <Typography color="error">Error: {error}</Typography>;
  }

  // Fixed filtering logic - removed date comparison since backend already returns overdue bills
  const rows = filteredBills
    .filter(bill => 
      // If no month is selected, include all bills
      // If a month is selected, include only matching bills
      !selectedMonthYear || bill.monthAndYear === selectedMonthYear
    )
    .map((bill, index) => ({
      id: paginationModel.page * paginationModel.pageSize + index + 1,
      _id: bill._id,
      consumerNumber: bill.consumerNumber,
      email: bill?.email || '-',
      username: bill.username || '-',
      contactNumber: bill?.contactNumber,
      monthAndYear: bill.monthAndYear,
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
      paymentStatus: bill.paymentStatus
        ? bill.paymentStatus.charAt(0).toUpperCase() + bill.paymentStatus.slice(1)
        : '-',
      approvedStatus: bill.approvedStatus || '-',
      lastReceiptAmount: bill.lastReceiptAmount ? bill.lastReceiptAmount : 0,
      overDueAmount: bill.overDueAmount,
      pendingAmount: bill.lastReceiptAmount ? bill.roundedBillAmount - bill.lastReceiptAmount : bill.roundedBillAmount,
      promptPaymentDate: formatDate(bill.promptPaymentDate),
      promptPaymentAmount: bill.promptPaymentAmount,
      dueDate: formatDate(bill.dueDate),
      netBillAmountWithDPC: bill.netBillAmountWithDPC,
      forwardForGeneration: bill.forwardForGeneration,
    }));

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

  const handleDeleteBill = (billId) => {
    dispatch(deleteBill(billId));
  };

  const handleEditBill = (bill) => {
    // Handle edit logic here
    console.log('Edit bill:', bill);
  };

  const handleDateChange = (value) => {
    const formattedValue = dayjs(value).format("MMM-YYYY").toUpperCase();
    setSelectedMonthYear(formattedValue);
  };

  const columns = [
    {
      field: 'checkbox',
      headerName: '',
      width: 50,
      headerClassName: 'data-grid-checkbox-header',
      renderHeader: () => {
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
          checked={selectedItems.some((item) => item.id === params.row.id)}
          onChange={(event) => handleCheckboxChange(event, params.row)}
          disabled={params.row.forwardForGeneration === 'Yes'}
        />
      ),
    },
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'consumerNumber', headerName: 'CONSUMER NO.', width: 130 },
    { field: 'contactNumber', headerName: 'CONTACT NUMBER', width: 130 },
    { field: 'monthAndYear', headerName: 'BILL MONTH', width: 130 },
    { field: 'ward', headerName: 'WARD', width: 130 },
    { field: 'meterNumber', headerName: 'METER NUMBER', width: 130 },
    { field: 'totalConsumption', headerName: 'TOTAL CONSUMPTION', width: 130 },
    { field: 'meterStatus', headerName: 'METER STATUS', width: 130 },
    { field: 'previousReadingDate', headerName: 'PREVIOUS READING DATE', width: 180 },
    { field: 'previousReading', headerName: 'PREVIOUS READING', width: 130 },
    { field: 'currentReadingDate', headerName: 'CURRENT READING DATE', width: 180 },
    { field: 'currentReading', headerName: 'CURRENT READING', width: 130 },
    { field: 'billDate', headerName: 'BILL DATE', width: 130 },
    { field: 'netBillAmount', headerName: 'NET BILL AMOUNT', width: 130 },
    { field: 'promptPaymentDate', headerName: 'PROMPT PAYMENT DATE', width: 180 },
    { field: 'promptPaymentAmount', headerName: 'PROMPT PAYMENT AMOUNT', width: 180 },
    { field: 'dueDate', headerName: 'DUE DATE', width: 130 },
    { field: 'netBillAmountWithDPC', headerName: 'NET BILL AMOUNT WITH DPC', width: 200 },
    { field: 'paymentStatus', headerName: 'PAYMENT STATUS', width: 130 },
    { field: 'lastReceiptAmount', headerName: 'LAST RECEIPT AMOUNT', width: 180 },
    { field: 'approvedStatus', headerName: 'APPROVED STATUS', width: 130 },
  ];

  const getPadding = () => {
    const width = window.innerWidth;
    if (width <= 480) return '80px 20px';
    else if (width <= 600) return '80px 10px';
    else if (width <= 900) return '60px 10px';
    else return '30px 10px';
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
              xs: 1,
              sm: '5px',
              md: '10px',
              lg: '20px'
            },
            color: '#0d2136',
            fontSize: {
              sm: '15px',
              xs: '15px',
              md: '15px',
              lg: '20px'
            },
          }} className="title-2">
            Users with Overdue Bills
          </Typography>
        </Box>

        <Box sx={{width:{lg:'20%',xl:'20%',md:'80%',sm:'80%',xs:'100%'},mb:2}}>
          {/* <BillDatePicker selectedMonthYear={selectedMonthYear} onChange={handleDateChange} /> */}
          <OverduebillDatePicker selectedMonthYear={selectedMonthYear} onChange={handleDateChange} />

          
        </Box>

        <StyledDataGrid 
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 15, 25, 35, 45, 55]}
          sx={{ paddingRight: 0.5, paddingLeft: 0.5 }}
          paginationMode="server"
          rowCount={pagination?.totalBills || 0}
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationModelChange}
          loading={loading}
          autoHeight={false}
          disableVirtualization={false}
          rowHeight={52}
          getRowId={(row) => row.id}
        />
      </Box>
    </div>
  );
};

export default OverdueBills;