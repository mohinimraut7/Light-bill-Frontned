
// import React, { useEffect, useState } from 'react';
// import AddConsumer from '../components/modals/AddConsumer';
// import Button from '@mui/material/Button';
// import {TextField} from '@mui/material';

// import IconButton from '@mui/material/IconButton';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useDispatch, useSelector } from 'react-redux';
// import { addConsumer,fetchConsumers,deleteConsumer,editConsumer } from '../store/actions/consumerActions';
// import { DataGrid } from '@mui/x-data-grid';

// import './Rolemaster.css';
// import { styled } from '@mui/material/styles';
// import { CircularProgress} from '@mui/material';
// import { Modal, Box, Typography, MenuItem, Select, InputLabel, FormControl, Paper, Avatar} from '@mui/material';

// import * as XLSX from 'xlsx';
// import { baseUrl } from '../config/config';
// import DownloadIcon from '@mui/icons-material/Download';
// import PowerIcon from '@mui/icons-material/Power';

// import { toast } from "react-toastify";
// import ConsumerButton from '../components/ConsumerButton';
// import wardDataAtoI from '../data/warddataAtoI';

// const columns = (handleDeleteConsumer,handleEditConsumer)=>[
//   { field: 'id', headerName: 'ID', width: 70 },
//   {
//     field: 'actions',
//     headerName: 'Actions',
//     width: 120,
//     renderCell: (params) => (
//       <>
//         <IconButton 
//         sx={{color:'#23CCEF'}}
//           onClick={() => handleEditConsumer(params.row)}>
//           <EditIcon />
//         </IconButton>
//       </>
//     ),
//   },
//   { field: 'consumerNumber', headerName: 'CONSUMER NUMBER', width: 180 },
//   { field: 'meterNumber', headerName: 'METER NUMBER', width: 180 },
//   { field: 'consumerPlace', headerName: 'CONSUMER PLACE', width: 200 },
//   { field: 'ward', headerName: 'WARD', width: 130 },
//   { field: 'meterPurpose', headerName: 'METER PURPOSE', width: 180 },
//   { field: 'consumerAddress', headerName: 'CONSUMER ADDRESS', width: 200 },
//   { field: 'phaseType', headerName: 'PHASE TYPE', width: 130 },
// ];

// const ConsumerComponent = () => {
//   const dispatch = useDispatch();
//   const { consumers, loading, error, pagination } = useSelector((state) => state?.consumers);
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const user = useSelector(state => state.auth.user);
  
// const [consumerOpen,setConsumerOpen]=useState(false);
// const [consumer, setConsumer] = useState('');
// const [cnId, setCnId] = useState('');
// const [wardName, setWardName] = useState('');

// const [currentConsumer, setCurrentConsumer] = useState(null);
// const [isImporting, setIsImporting] = useState(false); 

// const [paginationModel, setPaginationModel] = useState({
//   page: 0,
//   pageSize: 10,
// });

//   // Fetch consumers when component mounts or pagination changes
//   useEffect(() => {
//     const page = paginationModel.page + 1; // Convert to 1-based indexing for backend
//     const limit = paginationModel.pageSize;
//     dispatch(fetchConsumers(page, limit, cnId, wardName));
//   }, [dispatch, paginationModel, cnId, wardName]);

//   const handlePaginationModelChange = (newModel) => {
//     setPaginationModel(newModel);
//   };
  
//   const handleAddConsumerOpen=()=>{
//     setCurrentConsumer(null);
//     setConsumerOpen(true)
//   }

// const importExcel = async (event) => {
//   const file = event.target.files[0]; 
//   if (!file) return;
//   setIsImporting(true);

//   const reader = new FileReader();
//   reader.onload = async (e) => {
//     const data = new Uint8Array(e.target.result);
//     const workbook = XLSX.read(data, { type: 'array' });

//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];

//     const jsonData = XLSX.utils.sheet_to_json(sheet);

//     const cleanedData = jsonData.map(item => ({
//       consumerNumber: item.consumerNumber || '',
//       meterNumber:item.meterNumber||'',
//       consumerPlace: item.consumerPlace || '',
//       consumerAddress: item.consumerAddress || '',
//       ward: item.ward || '',
//       meterPurpose: item.meterPurpose || '',
//       phaseType: item.phaseType || '',
//     }));

//     console.log("Total Records:", cleanedData.length);

//     const chunkSize = 100;
//     for (let i = 0; i < cleanedData.length; i += chunkSize) {
//       const chunk = cleanedData.slice(i, i + chunkSize);

//       try {
//         const response = await fetch(`${baseUrl}/import-excel`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(chunk),
//         });

//         const result = await response.json();
//         console.log(`Batch ${i / chunkSize + 1} imported successfully:`, result);
//       } catch (error) {
//         console.error(`Error importing batch ${i / chunkSize + 1}:`, error);
//       }
//     }
//     setIsImporting(false);
//     dispatch(fetchConsumers(paginationModel.page + 1, paginationModel.pageSize, cnId, wardName));
//     toast.success("Consumer data has been successfully imported.");
//   };

//   reader.readAsArrayBuffer(file);
// };

// const downloadAllTypsOfReport = () => {
//     const worksheet = XLSX.utils.json_to_sheet(rows?.map(row => ({
//       'ID': row.id,
//       'Consumer No.': row.consumerNumber,
//       'Meter No.':row.meterNumber,
//       'Ward': row.ward,
//       'Consumer Place': row.consumerPlace,
//       'Consumer Address': row.consumerAddress,
//       'Meter Purpose': row.meterPurpose,
//       'Phase Type': row.phaseType,
//     })));

//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Consumers');
//     XLSX.writeFile(workbook, 'Consumers.xlsx');
//   };

//   const deleteAllConsumers = () => {
//     fetch(`${baseUrl}/deleteAll`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('All consumers deleted:', data);
//         alert(data.message); 
//       })
//       .catch((error) => {
//         console.error('Error deleting consumers:', error);
//         alert('Error deleting consumers');
//       });
//   };
  
//   const handleAddConsumerClose=()=>{
//     setConsumerOpen(false)
//   }
  
//   const handleAddConsumer = (consumerData) => {
//     dispatch(addConsumer(consumerData));
//     handleAddConsumerClose();
//   };
  
//   const handleEditConsumer = (consumer) => {
//     setCurrentConsumer(consumer); 
//     setConsumerOpen(true);
//   };
  
//   const handleDeleteConsumer = (consumerId) => {
//     dispatch(deleteConsumer(consumerId));
//   };

//   const handleChange = (event) => {
//     setCnId(event.target.value);
//   };

//   const handleChangeWard = (event) => {
//     setWardName(event.target.value);
//   };
  
//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   // Map consumers to rows for DataGrid with server-side data
//   const rows = consumers?.map((consumer, index) => ({
//     id: paginationModel.page * paginationModel.pageSize + index + 1,
//     _id: consumer._id,
//     consumerNumber: consumer?.consumerNumber || '-',
//     meterNumber: consumer?.meterNumber || '-',
//     consumerPlace: consumer?.consumerPlace || '-',
//     consumerAddress: consumer?.consumerAddress || '-',
//     ward: consumer?.ward || '-',
//     meterPurpose: consumer?.meterPurpose || '-',
//     phaseType: consumer?.phaseType || '-',
//   })) || [];

//   const rowColors = ['#F7F9FB', 'white'];
//   const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
//     '& .MuiDataGrid-cell': {
//       padding: theme.spacing(1),
//       fontSize: { xs: '0.75rem', sm: '0.875rem' },
//     },
//     '& .MuiDataGrid-row': {
//       '&:nth-of-type(odd)': {
//         backgroundColor: rowColors[0],
//       },
//       '&:nth-of-type(even)': {
//         backgroundColor: rowColors[1],
//       },
//       '&:hover': {
//         backgroundColor: '#f0f8ff',
//       },
//     },
//     '& .MuiDataGrid-columnHeaders': {
//       backgroundColor: '#f8f9fa',
//       fontSize: { xs: '0.75rem', sm: '0.875rem' },
//       fontWeight: 600,
//       color: '#333',
//       borderBottom: '2px solid #e0e0e0'
//     },
//     border: 'none',
//     '& .MuiDataGrid-virtualScroller': {
//       overflowX: 'auto'
//     }
//   }));

//   // Small uniform styles for all controls
//   const smallControlStyles = {
//     height: '40px',
//     minHeight: '40px',
//     width: {
//       xs: '100%',
//       sm: '180px',
//       md: '180px',
//       lg: '180px',
//       xl: '180px'
//     },
//     '& .MuiInputBase-root': {
//       height: '40px',
//       minHeight: '40px',
//       fontSize: '0.875rem'
//     },
//     '& .MuiOutlinedInput-root': {
//       height: '40px',
//       minHeight: '40px',
//       fontSize: '0.875rem'
//     },
//     '& .MuiTextField-root': {
//       height: '40px',
//       minHeight: '40px'
//     },
//     '& .MuiInputLabel-root': {
//       fontSize: '0.875rem'
//     }
//   };

//   return (
//     <Box sx={{ 
//       minHeight: '100vh', 
//       backgroundColor: '#f5f5f5',
//       marginLeft: { 
//         xs: 0, 
//         sm: isSidebarOpen ? '250px' : '100px' 
//       },
//       padding: { 
//         xs: '10px', 
//         sm: '15px', 
//         md: '20px' 
//       },
//       width: {
//         xs: '100%',
//         sm: isSidebarOpen ? 'calc(100% - 250px)' : 'calc(100% - 100px)'
//       }
//     }}>
    
     

//       {/* Main Content */}
//       <Paper elevation={2} sx={{ 
//         backgroundColor: '#fff', 
//         borderRadius: '8px',
//         padding: { xs: '16px', sm: '24px' },
//         overflow: 'hidden'
//       }}>
//         {/* Title and Action Buttons */}
//         <Box sx={{ 
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: { xs: 'flex-start', sm: 'center' },
//           mb: 3,
//           flexDirection: { xs: 'column', sm: 'row' },
//           gap: { xs: 2, sm: 0 }
//         }}>
//           <Typography variant="h5" sx={{
//             color: '#0d2136',
//             fontWeight: 'bold',
//             fontSize: { xs: '1.25rem', sm: '1.5rem' }
//           }}>
//             CONSUMER MASTER
//           </Typography>

//           <Box sx={{
//             display: 'flex',
//             gap: 2,
//             flexDirection: { xs: 'column', sm: 'row' },
//             width: { xs: '100%', sm: 'auto' }
//           }}>
//             <Button
//               size="small"
//               sx={{
//                 ...smallControlStyles,
//                 backgroundColor: '#23CCEF',
//                 color: '#fff',
//                 border: '0.1px solid #23CCEF',
//                 textTransform: 'uppercase',
//                 '&:hover': {
//                   backgroundColor: '#1AB3D1',
//                   border: '1px solid #1AB3D1',
//                 },
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 gap: 1,
//                 fontSize: '0.75rem',
//                 fontWeight: 'bold'
//               }}
//               onClick={downloadAllTypsOfReport}
//             >
//               <DownloadIcon fontSize='small' />
//               CONSUMERS
//             </Button>

//             <Button
//               size="small"
//               sx={{
//                 ...smallControlStyles,
//                 backgroundColor: '#23CCEF',
//                 color: '#fff',
//                 border: '0.1px solid #23CCEF',
//                 textTransform: 'uppercase',
//                 '&:hover': {
//                   backgroundColor: '#1AB3D1',
//                   border: '1px solid #1AB3D1',
//                 },
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 gap: 1,
//                 fontSize: '0.75rem',
//                 fontWeight: 'bold'
//               }}
//               onClick={handleAddConsumerOpen}
//             >
//               <AddIcon fontSize='small'/>
//               ADD CONSUMER
//             </Button>
//           </Box>
//         </Box>

//         {/* Search Controls */}
//         <Box sx={{ 
//           display: 'flex', 
//           gap: { xs: 1, sm: 2 }, 
//           mb: 3,
//           flexWrap: 'wrap',
//           alignItems: 'center',
//           flexDirection: { xs: 'column', sm: 'row' }
//         }}>
//           <TextField
//             id="consumerNumber"
//             name="consumerNumber"
//             label="Search Consumer ID"
//             value={cnId}
//             onChange={handleChange}
//             variant="outlined"
//             size="small"
//             sx={{
//               ...smallControlStyles,
//               '& .MuiTextField-root': {
//                 backgroundColor: '#fff',
//                 borderRadius: '6px'
//               }
//             }}
//           />

//           {(user?.role === 'Super Admin' || 
//             user?.role === 'Admin' || 
//             user?.role === 'Executive Engineer' || 
//             (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
//             <FormControl 
//               variant="outlined" 
//               size="small"
//               sx={{
//                 ...smallControlStyles,
//                 '& .MuiInputLabel-root': {
//                   fontSize: '0.875rem',
//                   top: '50%',
//                   transform: 'translateY(-50%)',
//                   '&.MuiInputLabel-shrink': {
//                     top: 0,
//                     transform: 'translateY(0) scale(0.75)'
//                   }
//                 }
//               }}
//             >
//               <InputLabel sx={{pl:1.8}} id="ward-label">Search Ward</InputLabel>
//               <Select
//                 labelId="ward-label"
//                 id="ward"
//                 name="ward"
//                 value={wardName}
//                 onChange={handleChangeWard}
//                 label="Search Ward"
//                 sx={{
//                   backgroundColor: '#fff',
//                   borderRadius: '6px',
//                   height: '40px',
//                   fontSize: '0.875rem',
//                   '& .MuiSelect-select': {
//                     height: '40px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     paddingTop: 0,
//                     paddingBottom: 0,
//                     fontSize: '0.875rem'
//                   }
//                 }}
//               >
//                 {wardDataAtoI.length > 0 ? (
//                   wardDataAtoI.map((ward, index) => (
//                     <MenuItem key={index} value={ward.ward}>
//                       {ward.ward}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem disabled>No Wards Available</MenuItem>
//                 )}
//               </Select>
//             </FormControl>
//           )}
//         </Box>

//         {/* Data Table with Server-side Pagination */}
//         <Box sx={{ 
//           height: { xs: 400, sm: 500, md: 600 }, 
//           width: '100%' 
//         }}>
//           <StyledDataGrid
//             rows={rows}
//             columns={columns(handleDeleteConsumer,handleEditConsumer)}
//             pageSizeOptions={[5, 10, 15, 20, 25, 100]}
//             sx={{ paddingRight: 0.5, paddingLeft: 0.5 }}
//             paginationMode="server"
//             rowCount={pagination?.totalConsumers || 0}
//             paginationModel={paginationModel}
//             onPaginationModelChange={handlePaginationModelChange}
//             loading={loading}
//             autoHeight={false}
//             disableVirtualization={false}
//             rowHeight={52}
//             getRowId={(row) => row.id}
//             components={{
//               NoRowsOverlay: () => (
//                 isImporting ? <CircularProgress /> : <Typography>No Rows</Typography>
//               ),
//             }}
//           />
//         </Box>
//       </Paper>

//       <AddConsumer
//         open={consumerOpen}
//         handleClose={handleAddConsumerClose}
//         handleAddConsumer={handleAddConsumer}
//         currentConsumer={currentConsumer}
//         editConsumer={(consumerId, consumerData) => {
//           dispatch(editConsumer(consumerId, consumerData));
//           dispatch(fetchConsumers(paginationModel.page + 1, paginationModel.pageSize, cnId, wardName));
//         }}
//       />
//     </Box>
//   );
// };

// export default ConsumerComponent;




// ===========================================







import React, { useEffect, useState } from 'react';
import AddConsumer from '../components/modals/AddConsumer';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { addConsumer, fetchConsumers, deleteConsumer, editConsumer } from '../store/actions/consumerActions';
import { DataGrid } from '@mui/x-data-grid';
import './Rolemaster.css';
import { styled } from '@mui/material/styles';
import { CircularProgress, Box, Typography, MenuItem, Select, InputLabel, FormControl, Paper } from '@mui/material';
import * as XLSX from 'xlsx';
import { baseUrl } from '../config/config';
import DownloadIcon from '@mui/icons-material/Download';
import { toast } from "react-toastify";
import wardDataAtoI from '../data/warddataAtoI';
import dayjs from 'dayjs';               // YE LINE ADD KAR DO



const columns = (handleEditConsumer) => [
  { field: 'id', headerName: 'ID', width: 80 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 100,
    renderCell: (params) => (
      <IconButton sx={{ color: '#23CCEF' }} onClick={() => handleEditConsumer(params.row)}>
        <EditIcon />
      </IconButton>
    ),
  },
  { field: 'consumerNumber', headerName: 'CONSUMER NUMBER', width: 180 },
  { field: 'meterNumber', headerName: 'METER NUMBER', width: 180 },
  { field: 'consumerPlace', headerName: 'CONSUMER PLACE', width: 200 },
  { field: 'ward', headerName: 'WARD', width: 130 },
  { field: 'meterPurpose', headerName: 'METER PURPOSE', width: 180 },
  { field: 'consumerAddress', headerName: 'CONSUMER ADDRESS', width: 220 },
  { field: 'phaseType', headerName: 'PHASE TYPE', width: 130 },
];

const ConsumerComponent = () => {
  const dispatch = useDispatch();
  const { consumers: serverConsumers, loading, error } = useSelector((state) => state?.consumers || {});
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const user = useSelector(state => state.auth.user);

  const [consumerOpen, setConsumerOpen] = useState(false);
  const [currentConsumer, setCurrentConsumer] = useState(null);
  const [cnId, setCnId] = useState('');
  const [wardName, setWardName] = useState('');

  // This holds FULL data after filtering (for display + export)
  const [allConsumers, setAllConsumers] = useState([]);

  // Client-side pagination (only for display)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 50,
  });

  // Fetch ALL consumers with current filters (no limit)
  const fetchAllConsumers = () => {
    const filters = {};
    if (cnId) filters.consumerNumber = cnId;
    if (wardName) {
      if (user?.role === 'Junior Engineer' && user?.ward !== 'Head Office') {
        filters.wardName = user.ward;
      } else {
        filters.wardName = wardName;
      }
    } else if (user?.role === 'Junior Engineer' && user?.ward !== 'Head Office') {
      filters.wardName = user.ward;
    }

    // Fetch large number → gets ALL records
    dispatch(fetchConsumers(1, 100000, filters.consumerNumber || '', filters.wardName || ''));
  };

  // Re-fetch when filters change
  useEffect(() => {
    fetchAllConsumers();
  }, [cnId, wardName, user?.ward, user?.role]);

  // Update local full list when server data changes
  useEffect(() => {
    if (serverConsumers && Array.isArray(serverConsumers)) {
      const mapped = serverConsumers.map((c, idx) => ({
        id: idx + 1,
        _id: c._id,
        consumerNumber: c.consumerNumber || '-',
        meterNumber: c.meterNumber || '-',
        consumerPlace: c.consumerPlace || '-',
        consumerAddress: c.consumerAddress || '-',
        ward: c.ward || '-',
        meterPurpose: c.meterPurpose || '-',
        phaseType: c.phaseType || '-',
      }));
      setAllConsumers(mapped);
    } else {
      setAllConsumers([]);
    }
  }, [serverConsumers]);

  const handleAddConsumerOpen = () => {
    setCurrentConsumer(null);
    setConsumerOpen(true);
  };

  const handleAddConsumerClose = () => setConsumerOpen(false);

  const handleAddConsumer = (consumerData) => {
    dispatch(addConsumer(consumerData)).then(() => {
      fetchAllConsumers();
      handleAddConsumerClose();
    });
  };

  const handleEditConsumer = (consumer) => {
    setCurrentConsumer(consumer);
    setConsumerOpen(true);
  };

  const handleChange = (e) => setCnId(e.target.value);
  const handleChangeWard = (e) => {
    setWardName(e.target.value);
    setPaginationModel(prev => ({ ...prev, page: 0 })); // Reset page
  };

  // Export ALL filtered data
  const downloadAllTypsOfReport = () => {
    const data = allConsumers.map((row, i) => ({
      'Sr.No': i + 1,
      'Consumer No.': row.consumerNumber,
      'Meter No.': row.meterNumber,
      'Ward': row.ward,
      'Consumer Place': row.consumerPlace,
      'Consumer Address': row.consumerAddress,
      'Meter Purpose': row.meterPurpose,
      'Phase Type': row.phaseType,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Consumers');
    XLSX.writeFile(wb, `Consumers_${wardName || 'All'}_${dayjs().format('DD-MMM-YYYY')}.xlsx`);
  };

  if (loading && allConsumers.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <Typography color="error">Error: {error}</Typography>;

  // Client-side paginated rows (only for display)
  const paginatedRows = allConsumers.slice(
    paginationModel.page * paginationModel.pageSize,
    (paginationModel.page + 1) * paginationModel.pageSize
  );

  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .MuiDataGrid-row': {
      '&:nth-of-type(odd)': { backgroundColor: '#F7F9FB' },
      '&:hover': { backgroundColor: '#f0f8ff' },
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#f8f9fa',
      fontWeight: 600,
      color: '#333',
    },
    border: 'none',
  }));

  const smallControlStyles = {
    height: '40px',
    width: { xs: '100%', sm: '180px' },
    '& .MuiInputBase-root': { height: '40px', fontSize: '0.875rem' },
    '& .MuiInputLabel-root': { fontSize: '0.875rem' },
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      ml: { xs: 0, sm: isSidebarOpen ? '250px' : '100px' },
      p: { xs: 2, md: 3 },
      width: { xs: '100%', sm: isSidebarOpen ? 'calc(100% - 250px)' : 'calc(100% - 100px)' }
    }}>
      <Paper elevation={2} sx={{ borderRadius: 2, p: { xs: 2, sm: 3 } }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h5" fontWeight="bold" color="#0d2136">
            CONSUMER MASTER
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
            size="small"
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={downloadAllTypsOfReport}
              sx={{ ...smallControlStyles, bgcolor: '#23CCEF', '&:hover': { bgcolor: '#1AB3D1' } }}
            >
              Download Consumers
            </Button>
            <Button
             size="small"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddConsumerOpen}
              sx={{ ...smallControlStyles, bgcolor: '#23CCEF', '&:hover': { bgcolor: '#1AB3D1' } }}
            >
              Add Consumer
            </Button>
          </Box>
        </Box>

        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            label="Search Consumer ID"
            value={cnId}
            onChange={handleChange}
            size="small"
            sx={smallControlStyles}
          />

          {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
            <FormControl size="small" sx={smallControlStyles}>
              <InputLabel>Ward</InputLabel>
              <Select value={wardName} onChange={handleChangeWard} label="Ward">
                <MenuItem value="">All Wards</MenuItem>
                {wardDataAtoI.map((w) => (
                  <MenuItem key={w.ward} value={w.ward}>{w.ward}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>

        {/* DataGrid - Client-side Pagination */}
        <Box sx={{ height: { xs: 500, md: 650 }, width: '100%' }}>
          <StyledDataGrid
            rows={paginatedRows}
            columns={columns(handleEditConsumer)}
            pagination
            paginationMode="client"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[10, 25, 50, 100]}
            rowCount={allConsumers.length}
            loading={loading}
            disableRowSelectionOnClick
          />
        </Box>
      </Paper>

      <AddConsumer
        open={consumerOpen}
        handleClose={handleAddConsumerClose}
        handleAddConsumer={handleAddConsumer}
        currentConsumer={currentConsumer}
        editConsumer={(id, data) => {
          dispatch(editConsumer(id, data)).then(() => {
            fetchAllConsumers();
            handleAddConsumerClose();
          });
        }}
      />
    </Box>
  );
};

export default ConsumerComponent;