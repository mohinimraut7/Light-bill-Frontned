import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBills, editBill } from '../store/actions/billActions';
import { DataGrid } from '@mui/x-data-grid';
import {
  Typography, Box, Button, Modal, TextField,
  Select, MenuItem, InputLabel, FormControl, InputAdornment
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ExcelJS from 'exceljs';
import { CircularProgress } from '@mui/material';
import { AddReceiptModal } from '../components/modals/AddReceipt';
import wardDataAtoI from '../data/warddataAtoI';
import BillDatePicker from '../components/BillDatePicker'; // Same as ConsumerBill
import html2pdf from 'html2pdf.js';
import { styled } from '@mui/material/styles';

const Formonetwentynew = () => {
  const dispatch = useDispatch();
  const { bills: serverBills, loading, error } = useSelector((state) => state.bills);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const user = useSelector(state => state.auth.user);

  // Filters - Same as ConsumerBill
  const [cnId, setCnId] = useState('');
  const [wardName, setWardName] = useState('');
  const [selectedMonthYear, setSelectedMonthYear] = useState(''); // "NOV-2025"
  const [allBills, setAllBills] = useState([]);

  // Modal
  const [billOpen, setBillOpen] = useState(false);
  const [currentBill, setCurrentBill] = useState(null);

  // Pagination
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 25 });

  // Fetch bills when filters change
  useEffect(() => {
    const filters = {};
    if (cnId) filters.consumerNumber = cnId;
    if (wardName) filters.wardName = wardName;
    if (selectedMonthYear) filters.selectedMonthYear = selectedMonthYear;

    dispatch(fetchBills(1, 50000, filters, true));
  }, [dispatch, cnId, wardName, selectedMonthYear]);

  useEffect(() => {
    if (serverBills && Array.isArray(serverBills)) {
      setAllBills(serverBills);
    }
  }, [serverBills]);

  // Role-based filtering
  const getRoleFilteredBills = () => {
    if (!allBills.length) return [];

    if (['Super Admin', 'Admin', 'Executive Engineer'].includes(user?.role) ||
        (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) {
      return allBills;
    }
    if (user?.role?.startsWith('Junior Engineer')) {
      return allBills.filter(bill => bill.ward === user.ward);
    }
    return [];
  };

  const displayBills = getRoleFilteredBills();

  const rows = displayBills.map((bill, index) => ({
    id: paginationModel.page * paginationModel.pageSize + index + 1,
    _id: bill._id,
    dueDateMonth: bill.currentReadingDate
      ? new Date(bill.currentReadingDate).toLocaleString('en-US', { month: 'long', year: 'numeric' })
      : '-',
    consumerNumber: bill.consumerNumber || '-',
    meterNumber: bill.meterNumber || '-',
    ward: bill.ward || '-',
    contactNumber: bill.contactNumber || '-',
    totalConsumption: bill.totalConsumption || 0,
    previousReading: bill.previousReading || '-',
    currentReading: bill.currentReading || '-',
    netBillAmount: bill.netBillAmount || 0,
    dueDate: bill.dueDate ? new Date(bill.dueDate).toLocaleDateString('en-GB') : '-',
    paidAmount: bill.paidAmount || 0,
    approvedStatus: bill.approvedStatus || 'PendingForJuniorEngineer',
  }));

  const columns = [
    { field: 'id', headerName: 'क्र.म.', width: 80, sortable: false },
    { field: 'dueDateMonth', headerName: 'महिना व वर्ष', width: 140 },
    { field: 'consumerNumber', headerName: 'ग्राहक क्र.', width: 140 },
    { field: 'meterNumber', headerName: 'मीटर क्र.', width: 140 },
    { field: 'ward', headerName: 'प्रभाग', width: 130 },
    { field: 'contactNumber', headerName: 'संपर्क', width: 140 },
    { field: 'totalConsumption', headerName: 'एकूण युनिट', width: 120 },
    { field: 'previousReading', headerName: 'मागील', width: 110 },
    { field: 'currentReading', headerName: 'चालू', width: 110 },
    { field: 'netBillAmount', headerName: 'देय रक्कम', width: 130 },
    { field: 'dueDate', headerName: 'देय तारीख', width: 130 },
    { field: 'paidAmount', headerName: 'भरणा', width: 110 },
    {
      field: 'actions',
      headerName: 'संपादन',
      width: 90,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          color="primary"
          size="small"
          onClick={() => handleEditBill(params.row)}
          disabled={user?.role === 'Junior Engineer' &&
            ['PendingForExecutiveEngineer', 'PendingForAdmin', 'PendingForSuperAdmin', 'Done'].includes(params.row.approvedStatus)}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  const handleEditBill = (bill) => {
    setCurrentBill(bill);
    setBillOpen(true);
  };

  const handleClose = () => {
    setBillOpen(false);
    setCurrentBill(null);
  };

  // Excel Download
  const handleDownloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Form 120');

    ['नमुना नं १२०', '(नियम १४७)(२) पहा )', 'वसई - विरार शहर महानगरपालिका', '२०-२० या वर्षांची विद्युत शक्तीच्या खपाची मीटर नोंद']
      .forEach((t, i) => {
        const row = sheet.getRow(i + 1);
        row.getCell(1).value = t;
        sheet.mergeCells(i + 1, 1, i + 1, 15);
        row.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
        row.height = t.includes('महानगरपालिका') ? 40 : 30;
        row.getCell(1).font = { bold: true, size: t.includes('महानगरपालिका') ? 18 : 14 };
      });

    sheet.addRow([]);
    sheet.addRow(['क्र.म.', 'महिना व वर्ष', 'ग्राहक क्र.', 'मीटर क्र.', 'प्रभाग', 'संपर्क', 'एकूण युनिट', 'मागील', 'चालू', 'देय रक्कम', 'देय तारीख', 'भरणा रक्कम'])
      .font = { bold: true };

    displayBills.forEach((b, i) => {
      sheet.addRow([
        i + 1,
        b.currentReadingDate ? new Date(b.currentReadingDate).toLocaleString('en-US', { month: 'long', year: 'numeric' }) : '-',
        b.consumerNumber || '-', b.meterNumber || '-', b.ward || '-', b.contactNumber || '-',
        b.totalConsumption || 0, b.previousReading || '-', b.currentReading || '-',
        b.netBillAmount || 0,
        b.dueDate ? new Date(b.dueDate).toLocaleDateString('en-GB') : '-',
        b.paidAmount || 0
      ]);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([buffer]));
    link.download = `Form120_${selectedMonthYear || 'All'}_${wardName || 'All'}.xlsx`;
    link.click();
  };

  // PDF Download - FULLY WORKING
  const handleDownloadPDF = () => {
    const content = `
      <div style="font-family: Arial; padding: 20px; direction: ltr;">
        <h1 style="text-align:center;">नमुना नं १२०</h1>
        <h2 style="text-align:center;">(नियम १४७)(२) पहा )</h2>
        <h1 style="text-align:center;">वसई - विरार शहर महानगरपालिका</h1>
        <h2 style="text-align:center;">२०-२० या वर्षांची विद्युत शक्तीच्या खपाची मीटर नोंद</h2>
        <h3 style="text-align:center; margin:20px 0;">महिना: ${selectedMonthYear || 'सर्व'}</h3>
        <table border="1" style="width:100%; border-collapse:collapse; font-size:12px; margin-top:20px;">
          <thead style="background:#f0f0f0;">
            <tr>
              <th>क्र.म.</th><th>महिना व वर्ष</th><th>ग्राहक क्र.</th><th>मीटर क्र.</th><th>प्रभाग</th>
              <th>एकूण युनिट</th><th>मागील</th><th>चालू</th><th>देय रक्कम</th><th>देय तारीख</th><th>भरणा</th>
            </tr>
          </thead>
          <tbody>
            ${displayBills.map((b, i) => `
              <tr>
                <td>${i + 1}</td>
                <td>${b.currentReadingDate ? new Date(b.currentReadingDate).toLocaleString('en-US', { month: 'long', year: 'numeric' }) : '-'}</td>
                <td>${b.consumerNumber || '-'}</td>
                <td>${b.meterNumber || '-'}</td>
                <td>${b.ward || '-'}</td>
                <td>${b.totalConsumption || 0}</td>
                <td>${b.previousReading || '-'}</td>
                <td>${b.currentReading || '-'}</td>
                <td>${b.netBillAmount || 0}</td>
                <td>${b.dueDate ? new Date(b.dueDate).toLocaleDateString('en-GB') : '-'}</td>
                <td>${b.paidAmount || 0}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>`;

    const element = document.createElement('div');
    element.innerHTML = content;
    document.body.appendChild(element);

    html2pdf()
      .set({
        margin: 10,
        filename: `Form120_${selectedMonthYear || 'All'}.pdf`,
        jsPDF: { format: 'a4', orientation: 'landscape' }
      })
      .from(element)
      .save()
      .then(() => document.body.removeChild(element));
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ width: isSidebarOpen ? '80%' : '90%', marginLeft: isSidebarOpen ? '19%' : '7%', padding: '20px 0' }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h5" fontWeight="bold">नमुना नं १२०</Typography>
        <Typography>(नियम १४७)(२) पहा )</Typography>
        <Typography variant="h4" fontWeight="bold" my={1}>वसई - विरार शहर महानगरपालिका</Typography>
        <Typography variant="h6">२०-२० या वर्षांची विद्युत शक्तीच्या खपाची मीटर नोंद</Typography>
      </Box>

      <Box border="1px solid #eee" borderRadius={2} p={3} bgcolor="#fafafa">


        {/* <Box display="flex" flexWrap="wrap" gap={2} mb={3} alignItems="center">
         
          <BillDatePicker
            selectedMonthYear={selectedMonthYear}
            onChange={setSelectedMonthYear}
            size="small"
            sx={{ width: 180}}
          />

          
          {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' ||
            (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>प्रभाग</InputLabel>
              <Select value={wardName} onChange={(e) => setWardName(e.target.value)} label="प्रभाग">
                <MenuItem value="">सर्व</MenuItem>
                {wardDataAtoI.map(w => <MenuItem key={w.ward} value={w.ward}>{w.ward}</MenuItem>)}
              </Select>
            </FormControl>
          )}

         
          <TextField
            size="small"
            placeholder="ग्राहक क्र."
            value={cnId}
            onChange={(e) => setCnId(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
            sx={{ width: 200 }}
          />

         
          <Button variant="outlined" size="large"  startIcon={<DownloadIcon /> } onClick={handleDownloadExcel} style={{color:"#737373",borderColor:"#737373"}}>
            Excel
          </Button>
          <Button variant="outlined" size="large" startIcon={<DownloadIcon />} onClick={handleDownloadPDF} style={{color:"#737373",borderColor:"#737373"}}>
            PDF डाउनलोड
          </Button>
        </Box> */}


<Box
  display="flex"
  alignItems="center"
  gap={2}
  mb={3}
  sx={{
    flexWrap: "nowrap",           // कधीच wrap होणार नाही
    overflowX: "auto",            // जर screen छोटी झाली तर horizontal scroll येईल
    pb: 1,                        // scroll बार साठी थोडी जागा
    "&::-webkit-scrollbar": {
      height: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#c1c1c1",
      borderRadius: "3px",
    },
  }}
>
  {/* 1. Bill Date Picker - आता सर्वात डावीकडे */}
  <BillDatePicker
    selectedMonthYear={selectedMonthYear}
    onChange={setSelectedMonthYear}
    size="small"
    sx={{ width: 180, flexShrink: 0 }}   // shrink होऊ देणार नाही
  />

  {/* 2. Ward Filter - फक्त ज्यांना दाखवायचा आहे त्यांनाच */}
  {(user?.role === 'Super Admin' || 
    user?.role === 'Admin' || 
    user?.role === 'Executive Engineer' ||
    (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
    <FormControl size="small" sx={{ minWidth: 160, flexShrink: 0 }}>
      <InputLabel>प्रभाग</InputLabel>
      <Select 
        value={wardName} 
        onChange={(e) => setWardName(e.target.value)} 
        label="प्रभाग"
      >
        <MenuItem value="">सर्व</MenuItem>
        {wardDataAtoI.map(w => (
          <MenuItem key={w.ward} value={w.ward}>{w.ward}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )}

  {/* 3. Consumer Search */}
  <TextField
    size="small"
    placeholder="ग्राहक क्र."
    value={cnId}
    onChange={(e) => setCnId(e.target.value)}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
    sx={{ width: 200, flexShrink: 0 }}
  />

  {/* 4. Excel Button */}
  <Button
    variant="outlined"
    startIcon={<DownloadIcon />}
    onClick={handleDownloadExcel}
    sx={{
      color: "#737373",
      borderColor: "#737373",
      flexShrink: 0,
      minWidth: "fit-content",
      whiteSpace: "nowrap",
    }}
  >
    Excel
  </Button>

  {/* 5. PDF Button */}
  <Button
    variant="outlined"
    startIcon={<DownloadIcon />}
    onClick={handleDownloadPDF}
    sx={{
      color: "#737373",
      borderColor: "#737373",
      flexShrink: 0,
      minWidth: "fit-content",
      whiteSpace: "nowrap",
    }}
  >
    PDF डाउनलोड
  </Button>
</Box>



        {/* <Typography fontWeight="bold" mb={2} color="primary">
          एकूण नोंदी: {displayBills.length}
        </Typography> */}

        <StyledDataGrid
          rows={rows}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[25, 50, 100]}
          rowCount={displayBills.length}
          paginationMode="client"
          disableRowSelectionOnClick
          sx={{ minHeight: 600 }}
        />

        <Modal open={billOpen} onClose={handleClose}>
          <AddReceiptModal
            open={billOpen}
            handleClose={handleClose}
            currentBill={currentBill}
            editBill={(id, data) => {
              dispatch(editBill(id, data));
              dispatch(fetchBills(1, 50000, {}, true));
            }}
          />
        </Modal>
      </Box>
    </div>
  );
};

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 'bold' },
}));

export default Formonetwentynew;

