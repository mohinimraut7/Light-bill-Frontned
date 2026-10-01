import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBills } from '../store/actions/billActions';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, InputAdornment, CircularProgress } from '@mui/material';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './ConsumerBill.css';
import { styled } from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import * as XLSX from 'xlsx';
import { upComingDueBills } from '../utils/DueBillHelper';
import wardDataAtoI from '../data/warddataAtoI';

const UsersUpcomingDueBills = () => {
  const dispatch = useDispatch();
  const { bills: serverBills, loading } = useSelector((state) => state.bills);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const user = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  // Filters
  const [wardName, setWardName] = useState('');
  const [cnId, setCnId] = useState('');
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  // Full dataset for upcoming due + download
  const [allBills, setAllBills] = useState([]);

  // Fetch full data + paginated data
  const fetchAllData = () => {
    const filters = {};
    if (cnId) filters.consumerNumber = cnId;
    if (wardName) filters.wardName = wardName;

    // Full data for upcoming due logic & download
    dispatch(fetchBills(1, 100000, filters, true));
    // Paginated data for display
    dispatch(fetchBills(paginationModel.page + 1, paginationModel.pageSize, filters, false));
  };

  useEffect(() => {
    fetchAllData();
  }, [cnId, wardName, paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    if (serverBills && Array.isArray(serverBills)) {
      setAllBills(serverBills);
    }
  }, [serverBills]);

  // Role-based + Filter-based full upcoming due bills
  const getFilteredUpcomingBills = () => {
    let filtered = allBills;

    // Role-based ward restriction
    if (user?.role?.startsWith('Junior Engineer') && user?.ward !== 'Head Office') {
      filtered = filtered.filter(bill => bill.ward === user.ward);
    }

    return upComingDueBills(filtered, user);
  };

  const upcomingDueBillsList = getFilteredUpcomingBills();
  const dueAlertCount = upcomingDueBillsList.length;

  // Notification (your original working logic)
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

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit', month: 'long', year: 'numeric'
    });
  };

  const rows = upcomingDueBillsList.map((bill, index) => ({
    _id: bill._id,
    id: index + 1,
    consumerNumber: bill.consumerNumber,
    username: bill.username || '-',
    contactNumber: bill?.contactNumber || '-',
    monthAndYear: bill.monthAndYear,
    meterNumber: bill?.meterNumber || '-',
    totalConsumption: bill.totalConsumption,
    meterStatus: bill.meterStatus,
    previousReadingDate: formatDate(bill.previousReadingDate),
    previousReading: bill.previousReading,
    currentReadingDate: formatDate(bill.currentReadingDate),
    currentReading: bill.currentReading,
    billDate: formatDate(bill.billDate),
    netBillAmount: bill.netBillAmount,
    promptPaymentDate: formatDate(bill.promptPaymentDate),
    promptPaymentAmount: bill.promptPaymentAmount,
    dueDate: formatDate(bill.dueDate),
    netBillAmountWithDPC: bill.netBillAmountWithDPC || '-',
    ward: bill?.ward || '-',
    paymentStatus: bill.paymentStatus
      ? bill.paymentStatus.charAt(0).toUpperCase() + bill.paymentStatus.slice(1)
      : '-',
    lastReceiptAmount: bill.lastReceiptAmount || 0,
    // pendingAmount: bill.lastReceiptAmount 
    //   ? (bill.roundedBillAmount - bill.lastReceiptAmount).toFixed(2)
    //   : bill.roundedBillAmount?.toFixed(2) || bill.netBillAmount?.toFixed(2) || 0,
  }));

  const handleDownloadExcel = () => {
    if (rows.length === 0) {
      toast.warn("No upcoming due bills to download");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(rows.map(r => ({
      'अ.क्र.': r.id,
      'ग्राहक क्र.': r.consumerNumber,
      'संपर्क': r.contactNumber,
      'प्रभाग': r.ward,
      'मीटर क्र.': r.meterNumber,
      'बिल महिना': r.monthAndYear,
      'देय तारीख': r.dueDate,
      'देय रक्कम': r.netBillAmount,
      // 'थकबाकी': r.pendingAmount,
      'स्थिती': r.paymentStatus,
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Upcoming_Due_Bills");
    XLSX.writeFile(wb, `Upcoming_Due_Bills_${new Date().toISOString().split('T')[0]}.xlsx`);
    toast.success(`डाउनलोड झाले: ${rows.length} बिले`);
  };

  const columns = [
    { field: 'id', headerName: 'अ.क्र.', width: 70 },
    { field: 'consumerNumber', headerName: 'ग्राहक क्र.', width: 140 },
    { field: 'contactNumber', headerName: 'संपर्क', width: 130 },
    { field: 'ward', headerName: 'प्रभाग', width: 110 },
    { field: 'meterNumber', headerName: 'मीटर क्र.', width: 130 },
    { field: 'monthAndYear', headerName: 'बिल महिना', width: 130 },
    { field: 'dueDate', headerName: 'देय तारीख', width: 150 },
    { field: 'netBillAmount', headerName: 'देय रक्कम', width: 130 },
    // { field: 'pendingAmount', headerName: 'थकबाकी', width: 130 },
    { field: 'paymentStatus', headerName: 'स्थिती', width: 110 },
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
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff',
  };

  const rowColors = ['#F7F9FB', 'white'];
  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .MuiDataGrid-row': {
      '&:nth-of-type(odd)': { backgroundColor: rowColors[0] },
      '&:nth-of-type(even)': { backgroundColor: rowColors[1] },
    },
  }));

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={gridStyle}>
      <Box sx={innerDivStyle}>
        <Typography variant="h5" sx={{ mb: 3, color: '#0d2136', fontWeight: 'bold', textAlign: 'center' }}>
          येणाऱ्या देय तारखेची बिले ({dueAlertCount})
        </Typography>

        {/* Filter Bar – Exactly like Form120 – One Line, No Wrap */}
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          mb={3}
          sx={{
            flexWrap: "nowrap",
            overflowX: "auto",
            pb: 1,
            "&::-webkit-scrollbar": { height: "6px" },
            "&::-webkit-scrollbar-thumb": { backgroundColor: "#c1c1c1", borderRadius: "3px" },
          }}
        >
          {/* Ward Filter */}
          {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || 
            (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
            <FormControl size="small" sx={{ minWidth: 160, flexShrink: 0 }}>
              <InputLabel>प्रभाग</InputLabel>
              <Select value={wardName} onChange={(e) => setWardName(e.target.value)} label="प्रभाग">
                <MenuItem value="">सर्व</MenuItem>
                {wardDataAtoI.map(w => <MenuItem key={w.ward} value={w.ward}>{w.ward}</MenuItem>)}
              </Select>
            </FormControl>
          )}

          {/* Consumer Search */}
          <TextField
            size="small"
            placeholder="ग्राहक क्र."
            value={cnId}
            onChange={(e) => setCnId(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
            sx={{ width: 200, flexShrink: 0 }}
          />

          {/* Excel Button */}
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadExcel}
            sx={{ color: "#737373", borderColor: "#737373", flexShrink: 0, whiteSpace: "nowrap" }}
          >
            Excel डाउनलोड
          </Button>
        </Box>

        <StyledDataGrid
          rows={rows}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 25, 50, 100]}
          rowCount={dueAlertCount}
          paginationMode="client"
          loading={loading}
          autoHeight
          disableSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default UsersUpcomingDueBills;
