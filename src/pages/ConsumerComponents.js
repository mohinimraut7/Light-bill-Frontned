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
// import { Modal, Box, Typography, MenuItem, Select, InputLabel, FormControl,} from '@mui/material';

// import * as XLSX from 'xlsx';
// import { baseUrl } from '../config/config';
// import DownloadIcon from '@mui/icons-material/Download';

// import { toast } from "react-toastify";
// import ConsumerButton from '../components/ConsumerButton';
// import wardDataAtoI from '../data/warddataAtoI';


// const columns = (handleDeleteConsumer,handleEditConsumer)=>[
//   { field: 'id', headerName: 'ID', width: 40 },
//   {
//     field: 'actions',
//     headerName: 'Actions',
//     width: 200,
//     renderCell: (params) => (
//       <>
//         {/* <IconButton sx={{color:'#FFA534'}}  onClick={() => handleDeleteConsumer(params.row._id)}>
//           <DeleteIcon />
//         </IconButton> */}
//         <IconButton 
//         sx={{color:'#23CCEF'}}
//           onClick={() => handleEditConsumer(params.row)}>
//           <EditIcon />
//         </IconButton>
//       </>
//     ),
//   },
//   { field: 'consumerNumber', headerName: 'CONSUMER NUMBER', width: 220 },
//   { field: 'consumerPlace', headerName: 'CONSUMER PLACE', width: 220 },
//   { field: 'ward', headerName: 'WARD', width: 180 },
//   { field: 'meterPurpose', headerName: 'METER PURPOSE', width: 220 },
//   { field: 'consumerAddress', headerName: 'CONSUMER ADDRESS', width: 180 },
//   { field: 'phaseType', headerName: 'PHASE TYPE', width: 150 },
 
  
 
// ];
// const ConsumerComponent = () => {
//   const dispatch = useDispatch();
//   const { consumers, loading, error } = useSelector((state) => state?.consumers);
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//       const user = useSelector(state => state.auth.user);
  
// const [consumerOpen,setConsumerOpen]=useState(false);
// const [consumer, setConsumer] = useState('');
// const [cnId, setCnId] = useState('');
// const [wardName, setWardName] = useState('');

// const [currentConsumer, setCurrentConsumer] = useState(null);
// const [isImporting, setIsImporting] = useState(false); 
//   useEffect(() => {
//     dispatch(fetchConsumers());
//   }, [dispatch]);
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
//     dispatch(fetchConsumers());
//     toast.success("Consumer data has been successfully imported.");
//   };

//   reader.readAsArrayBuffer(file);
// };
  

// const downloadAllTypsOfReport = () => {
//     const worksheet = XLSX.utils.json_to_sheet(rows?.map(row => ({
//       'ID': row.id,
//       'Consumer No.': row.consumerNumber,
//       'Ward': row.ward
//     })));

//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Bills');
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

//   let filteredData = consumers?.filter(consumer => {
//     const matchesConsumerNumber = cnId ? consumer.consumerNumber.includes(cnId) : true;
//     const matchesCNByWard = wardName ? consumer.ward.includes(wardName) : true;
//     const matchesWard = user?.role === 'Junior Engineer' ?user.ward === 'Head Office' ||consumer.ward === user.ward : true;
//   //   const matchesWard = user?.role === 'Junior Engineer' 
//   // ? user?.ward !== 'Head Office' && consumer.ward === user.ward 
//   // : true;
//     return matchesConsumerNumber && matchesWard && matchesCNByWard;
//   });
  


//   const rows = filteredData?.map((consumer,index) => ({
//     // const rows = consumers?.map((consumer,index) => ({
//     id:index+1,
//     _id:consumer._id,
//     consumerNumber:consumer?.consumerNumber||'-',
//     consumerPlace:consumer?.consumerPlace||'-',
//     consumerAddress: consumer?.consumerAddress||'-',
//     ward:consumer?.ward||'-',
//     meterPurpose:consumer?.meterPurpose||'-',
//     phaseType: consumer?.phaseType||'-',
    
//      }));
//   const gridStyle = {
//     height: 'auto',
//     width: isSidebarOpen ? '80%' : '90%',
//     marginLeft: isSidebarOpen ? '19%' : '7%',
//     transition: 'margin-rleft 0.3s',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: '30px 0px',
//     paddingLeft: '10px',
//   };
//   const innerDivStyle = {
//     border: '1px solid #F7F7F8',
//     width: '99%',
//     padding: '30px 10px',
//   };
//   const rowColors = ['#F7F9FB', 'white'];
//   const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
//     '& .MuiDataGrid-cell': {
//       padding: theme.spacing(1),
//     },
//     '& .MuiDataGrid-row': {
//       '&:nth-of-type(odd)': {
//         backgroundColor: rowColors[0],
//       },
//       '&:nth-of-type(even)': {
//         backgroundColor: rowColors[1],
//       },
//     },
//   }));

//   return (
//     <div style={gridStyle}>
//       <Box sx={innerDivStyle}>
//       <Box sx={{   width:'100%',display:'flex',justifyContent:{
//         xl:'space-between',
//         lg:'space-between',
//         md:'space-between',
//         sm:'center',
//         xs:'center'
//       },
//       alignItems:{
//         xl:'flex-start',
//         lg:'flex-start',
//         md:'flex-start',
//       sm:'center',
//       xs:'center'
//       },
      
//       mb:2,flexDirection:{
//       lg:'row',
//       xl:'row',
//       md:'row',
//       sm:'column',
//       xs:'column'
//     }}}>

// <Box sx={{
//   mb:{
//         lg:1,
//       }
//       }}><Typography  sx={{color:'#0d2136',
     
//       }} className='title-2'>CONSUMER MASTER</Typography></Box>

// <Box sx={{display:'flex',
// width:{
//   xl:'28%',
//   lg:'24.5%',
//   md:'60%',
//   sm:'100%',
//   xs:'100%'
// },
// alignmentCenter:{
//   xs:'center',
// },
// justifyContent:{
//   xs:'center',
//   sm:'center',
//   md:'space-between',
//   lg:'space-between',
//   xl:'space-between'
// }, flexDirection:{
//       lg:'row',
//       xl:'row',
//       md:'row',
//       sm:'row',
//       xs:'column'
//     }}}>
      
// {/* <Button
// size="small"
//   component="label"
//   sx={{
//     color: '#23CCEF',
//     border: '0.1px solid #23CCEF',
//     cursor: 'pointer',
//     textTransform: 'none',
//     display: 'flex',
//     justifyContent: 'space-between',
//     width: 'auto',
   
//   }}
//   onClick={deleteAllConsumers}
// >
//   <AddIcon />
//   <Typography>Delete All</Typography>

// </Button> */}



// {/* <ConsumerButton  onClick={downloadAllTypsOfReport} startIcon={<DownloadIcon/>}>Consumers</ConsumerButton> */}
//             <Button
//              size="small"
//              sx={{
//               backgroundColor:'#23CCEF',
//               color: '#fff',
//               border: '0.1px solid #23CCEF',
//               cursor: 'pointer',
//               textTransform: 'uppercase',
//               ml:{
//                 xs:2,
//                 sm:5,
//                 md:0,
//                 lg:0,
//                 xl:0
//                     },
//               '&:hover': {
//               backgroundColor: '#1AB3D1',
//            border:'1px solid #1AB3D1',
//            color: '#fff',
//               },
//             }}
//             onClick={downloadAllTypsOfReport}
//           >
//             <DownloadIcon fontSize='small' />
//             <Typography sx={{
//             textTransform:'uppercase',fontSize:'12px',fontWeight:'bold'
//             }}>Consumers</Typography>
// </Button>

// <Button
//   component="label"
//   sx={{
//     color: '#23CCEF',
//     border: '0.1px solid #23CCEF',
//     cursor: 'pointer',
//     textTransform: 'none',
//     display: 'flex',
//     justifyContent: 'space-between',
//     width: 'auto',
   
//    mb:{
//     md:0,
//     lg:0,
//     xl:0,
//     xs:1,
//     sm:0,
//    },
//    mt:{
//     md:0,
//     lg:0,
//     xl:0,
//     xs:1,
//     sm:0,
//    },
//    ml:{
//     xs:2,
//     sm:5,
//     md:0,
//     lg:0,
//     xl:0
//         },
   
//   }}
// >
//   <AddIcon sx={{ marginLeft: '2px' }} />
//   <Typography>Import Excel</Typography>
//   <input type="file" hidden onChange={importExcel} accept=".xlsx, .xls" />
// </Button>


//       <Button
//            size="small"
//             sx={{
//               backgroundColor:'#23CCEF',
//               color: '#fff',
//               border: '0.1px solid #23CCEF',
//               cursor: 'pointer',
//               textTransform: 'uppercase',
//               cursor: 'pointer',
//               textTransform: 'none',
//               display: 'flex',
//               justifyContent: 'space-between',
//               width: 'auto',
//                '&:hover': {
//               backgroundColor: '#1AB3D1',
//               border:'1px solid #1AB3D1',
//               color: '#fff',
//               },
//               ml:{
//                 xs:2,
//                 sm:5,
//                 md:0,
//                 lg:0,
//                 xl:0
//                     },
//                     mt:{
//                       xs:1,
//                       sm:0,
//                       md:0,
//                       lg:0,
//                       xl:0

//                     },
                    
//             }}
//             onClick={handleAddConsumerOpen}
//           >
//             <AddIcon fontSize='small'/>
//             <Typography sx={{
//                fontSize:{
//                   lg:'12px',
//                   fontWeight:'bold',
//                  textTransform: 'uppercase',
//               }
//             }}>Add Consumer</Typography>
// </Button>

// </Box>

// </Box>

// <Box sx={{
//   // border:'1px solid red',
//    display:'flex',
//    flexDirection:{
//     xs:'column',
//      sm:'row',
//      md:'row',
//      lg:'row',
//      xl:'row'
//    },
//    justifyContent:{
//      xs:'center',
//      sm:'center',
//      md:'flex-start',
//      lg:'flex-start',
//      xl:'flex-start'
   
//    }
// }}>
  

// {/* <Box sx={{
//           display:'flex',
//           justifyContent:{
//             xs:'center',
//             sm:'center',
//             md:'flex-start',
//             lg:'flex-start',
//             xl:'flex-start'
          
//           }
//         }}> */}



// <TextField
//     id="consumerNumber"
//     name="consumerNumber"
//     label="Search Consumer ID"
//     value={cnId}
//     onChange={
//       handleChange}
//     variant="outlined"
//     InputProps={{
//       sx: {
//         height: '40px',
//         mb:1
//       },
//     }}
//     InputLabelProps={{
//       sx: {
//         color: 'gray',
//         transform: 'translate(14px, 8px)',
//         fontSize:'17px',
//         transform: 'translate(14px, 8px)',
//         '&.MuiInputLabel-shrink': {
// transform: 'translate(14px, -8px) scale(0.75)', 
// },
//       },
     
//     }}
//     sx={{
//       width: {
//         xl: '30%',
//         lg: '30%',
//         md: '30%',
//         sm: '40%',
//         xs: '100%'
//       }, 
//       mt:{
//         sm:1
//       }
      
//     }}
//   />


// {/* </Box> */}



// {/* {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer') && (


// <Box sx={{
//           display:'flex',
//           justifyContent:{
//             xs:'center',
//             sm:'center',
//             md:'flex-start',
//             lg:'flex-start',
//             xl:'flex-start'
          
//           }
//         }}> */}


// {/* <TextField
//     id="ward"
//     name="ward"
//     label="Search Ward"
//     value={wardName}
//     onChange={
//       handleChangeWard}
//     variant="outlined"
//     InputProps={{
//       sx: {
//         height: '40px',
//         mb:1
//       },
//     }}
//     InputLabelProps={{
//       sx: {
//         color: 'gray',
//         transform: 'translate(14px, 8px)',
//         fontSize:'17px',
//         transform: 'translate(14px, 8px)',
//         '&.MuiInputLabel-shrink': {
// transform: 'translate(14px, -8px) scale(0.75)', 
// },
//       },
     
//     }}
//     sx={{
//       width: {
//         xl: '30%',
//         lg: '30%',
//         md: '80%',
//         sm: '80%',
//         xs: '80%'
//       }, 
//       mt:{
//         sm:1
//       }
      
//     }}
//   /> */}

// {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer'||(user?.role==='Junior Engineer'&& user?.ward==='Head Office')) && (
//   <FormControl
//   fullWidth
//   size="small"
//   variant="outlined"
//   sx={{
//     width: {
//       xl: '30%',
//       lg: '30%',
//       md: '30%',
//       sm: '40%',
//       xs: '100%',
//     },
//     mt: { sm: 1 }, 
//     ml:{
//       xl:1,
//       lg:1,
//       md:1,
//       sm:1
//     }
//   }}
// >
//   <InputLabel id="ward-label">Search Ward</InputLabel>
//   <Select
//     labelId="ward-label"
//     id="ward"
//     name="ward"
//     value={wardName}
//     onChange={handleChangeWard}
//     label="Search Ward"
//   >
//     {wardDataAtoI.length > 0 ? (
//       wardDataAtoI.map((ward, index) => (
//         <MenuItem key={index} value={ward.ward}>
//           {ward.ward}
//         </MenuItem>
//       ))
//     ) : (
//       <MenuItem disabled>No Wards Available</MenuItem>
//     )}
//   </Select>
// </FormControl>
// )}


// {/* </Box>
// )} */}



// </Box>




// <StyledDataGrid
// autoHeight  
//   rows={rows}
//   columns={columns(handleDeleteConsumer,handleEditConsumer)}
//   initialState={{
//     pagination: {
//       paginationModel: { page: 0, pageSize: 5 },
//     },
//   }}
//   pageSizeOptions={[5, 10,15,20,25,100]}
//   checkboxSelection
//   loading={isImporting} 
//   components={{
//     NoRowsOverlay: () => (
//       isImporting ? <CircularProgress /> : <Typography>No Rows</Typography>
//     ),
//   }}
// />
// {/* } */}


      
//       <AddConsumer
//       open={consumerOpen}
//       handleClose={ handleAddConsumerClose}
//       handleAddConsumer={handleAddConsumer}
//       currentConsumer={currentConsumer}
//       editConsumer={(consumerId, consumerData) => {
//         dispatch(editConsumer(consumerId, consumerData));
//         dispatch(fetchConsumers());
//       }}
//       />
//       </Box>
//     </div>
//   );
// };
// export default ConsumerComponent;


// ==========================================


import React, { useEffect, useState } from 'react';
import AddConsumer from '../components/modals/AddConsumer';
import Button from '@mui/material/Button';
import {TextField} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { addConsumer,fetchConsumers,deleteConsumer,editConsumer } from '../store/actions/consumerActions';
import { DataGrid } from '@mui/x-data-grid';

import './Rolemaster.css';
import { styled } from '@mui/material/styles';
import { CircularProgress} from '@mui/material';
import { Modal, Box, Typography, MenuItem, Select, InputLabel, FormControl, Paper, Avatar} from '@mui/material';

import * as XLSX from 'xlsx';
import { baseUrl } from '../config/config';
import DownloadIcon from '@mui/icons-material/Download';
import PowerIcon from '@mui/icons-material/Power';

import { toast } from "react-toastify";
import ConsumerButton from '../components/ConsumerButton';
import wardDataAtoI from '../data/warddataAtoI';

const columns = (handleDeleteConsumer,handleEditConsumer)=>[
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 120,
    renderCell: (params) => (
      <>
        <IconButton 
        sx={{color:'#23CCEF'}}
          onClick={() => handleEditConsumer(params.row)}>
          <EditIcon />
        </IconButton>
      </>
    ),
  },
  { field: 'consumerNumber', headerName: 'CONSUMER NUMBER', width: 180 },
  { field: 'consumerPlace', headerName: 'CONSUMER PLACE', width: 200 },
  { field: 'ward', headerName: 'WARD', width: 130 },
  { field: 'meterPurpose', headerName: 'METER PURPOSE', width: 180 },
  { field: 'consumerAddress', headerName: 'CONSUMER ADDRESS', width: 200 },
  { field: 'phaseType', headerName: 'PHASE TYPE', width: 130 },
];

const ConsumerComponent = () => {
  const dispatch = useDispatch();
  const { consumers, loading, error } = useSelector((state) => state?.consumers);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const user = useSelector(state => state.auth.user);
  
const [consumerOpen,setConsumerOpen]=useState(false);
const [consumer, setConsumer] = useState('');
const [cnId, setCnId] = useState('');
const [wardName, setWardName] = useState('');

const [currentConsumer, setCurrentConsumer] = useState(null);
const [isImporting, setIsImporting] = useState(false); 

  useEffect(() => {
    dispatch(fetchConsumers());
  }, [dispatch]);
  
  const handleAddConsumerOpen=()=>{
    setCurrentConsumer(null);
    setConsumerOpen(true)
  }

const importExcel = async (event) => {
  const file = event.target.files[0]; 
  if (!file) return;
  setIsImporting(true);

  const reader = new FileReader();
  reader.onload = async (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(sheet);

    const cleanedData = jsonData.map(item => ({
      consumerNumber: item.consumerNumber || '',
      consumerPlace: item.consumerPlace || '',
      consumerAddress: item.consumerAddress || '',
      ward: item.ward || '',
      meterPurpose: item.meterPurpose || '',
      phaseType: item.phaseType || '',
    }));

    console.log("Total Records:", cleanedData.length);

    const chunkSize = 100;
    for (let i = 0; i < cleanedData.length; i += chunkSize) {
      const chunk = cleanedData.slice(i, i + chunkSize);

      try {
        const response = await fetch(`${baseUrl}/import-excel`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(chunk),
        });

        const result = await response.json();
        console.log(`Batch ${i / chunkSize + 1} imported successfully:`, result);
      } catch (error) {
        console.error(`Error importing batch ${i / chunkSize + 1}:`, error);
      }
    }
    setIsImporting(false);
    dispatch(fetchConsumers());
    toast.success("Consumer data has been successfully imported.");
  };

  reader.readAsArrayBuffer(file);
};

const downloadAllTypsOfReport = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows?.map(row => ({
      'ID': row.id,
      'Consumer No.': row.consumerNumber,
      'Ward': row.ward,
      'Consumer Place': row.consumerPlace,
      'Consumer Address': row.consumerAddress,
      'Meter Purpose': row.meterPurpose,
      'Phase Type': row.phaseType,
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Consumers');
    XLSX.writeFile(workbook, 'Consumers.xlsx');
  };

  const deleteAllConsumers = () => {
    fetch(`${baseUrl}/deleteAll`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('All consumers deleted:', data);
        alert(data.message); 
      })
      .catch((error) => {
        console.error('Error deleting consumers:', error);
        alert('Error deleting consumers');
      });
  };
  
  const handleAddConsumerClose=()=>{
    setConsumerOpen(false)
  }
  
  const handleAddConsumer = (consumerData) => {
    dispatch(addConsumer(consumerData));
    handleAddConsumerClose();
  };
  
  const handleEditConsumer = (consumer) => {
    setCurrentConsumer(consumer); 
    setConsumerOpen(true);
  };
  
  const handleDeleteConsumer = (consumerId) => {
    dispatch(deleteConsumer(consumerId));
  };

  const handleChange = (event) => {
    setCnId(event.target.value);
  };

  const handleChangeWard = (event) => {
    setWardName(event.target.value);
  };
  
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

  let filteredData = consumers?.filter(consumer => {
    const matchesConsumerNumber = cnId ? consumer.consumerNumber.includes(cnId) : true;
    const matchesCNByWard = wardName ? consumer.ward.includes(wardName) : true;
    const matchesWard = user?.role === 'Junior Engineer' ?user.ward === 'Head Office' ||consumer.ward === user.ward : true;
    return matchesConsumerNumber && matchesWard && matchesCNByWard;
  });

  const rows = filteredData?.map((consumer,index) => ({
    id:index+1,
    _id:consumer._id,
    consumerNumber:consumer?.consumerNumber||'-',
    consumerPlace:consumer?.consumerPlace||'-',
    consumerAddress: consumer?.consumerAddress||'-',
    ward:consumer?.ward||'-',
    meterPurpose:consumer?.meterPurpose||'-',
    phaseType: consumer?.phaseType||'-',
  }));

  const rowColors = ['#F7F9FB', 'white'];
  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .MuiDataGrid-cell': {
      padding: theme.spacing(1),
      fontSize: { xs: '0.75rem', sm: '0.875rem' },
    },
    '& .MuiDataGrid-row': {
      '&:nth-of-type(odd)': {
        backgroundColor: rowColors[0],
      },
      '&:nth-of-type(even)': {
        backgroundColor: rowColors[1],
      },
      '&:hover': {
        backgroundColor: '#f0f8ff',
      },
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#f8f9fa',
      fontSize: { xs: '0.75rem', sm: '0.875rem' },
      fontWeight: 600,
      color: '#333',
      borderBottom: '2px solid #e0e0e0'
    },
    border: 'none',
    '& .MuiDataGrid-virtualScroller': {
      overflowX: 'auto'
    }
  }));

  // Small uniform styles for all controls
  const smallControlStyles = {
    height: '40px',
    minHeight: '40px',
    width: {
      xs: '100%',
      sm: '180px',
      md: '180px',
      lg: '180px',
      xl: '180px'
    },
    '& .MuiInputBase-root': {
      height: '40px',
      minHeight: '40px',
      fontSize: '0.875rem'
    },
    '& .MuiOutlinedInput-root': {
      height: '40px',
      minHeight: '40px',
      fontSize: '0.875rem'
    },
    '& .MuiTextField-root': {
      height: '40px',
      minHeight: '40px'
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.875rem'
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5',
      marginLeft: { 
        xs: 0, 
        sm: isSidebarOpen ? '250px' : '100px' 
      },
      padding: { 
        xs: '10px', 
        sm: '15px', 
        md: '20px' 
      },
      width: {
        xs: '100%',
        sm: isSidebarOpen ? 'calc(100% - 250px)' : 'calc(100% - 100px)'
      }
    }}>
    
     

      {/* Main Content */}
      <Paper elevation={2} sx={{ 
        backgroundColor: '#fff', 
        borderRadius: '8px',
        padding: { xs: '16px', sm: '24px' },
        overflow: 'hidden'
      }}>
        {/* Title and Action Buttons */}
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          mb: 3,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 }
        }}>
          <Typography variant="h5" sx={{
            color: '#0d2136',
            fontWeight: 'bold',
            fontSize: { xs: '1.25rem', sm: '1.5rem' }
          }}>
            CONSUMER MASTER
          </Typography>

          <Box sx={{
            display: 'flex',
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            width: { xs: '100%', sm: 'auto' }
          }}>
            <Button
              size="small"
              sx={{
                ...smallControlStyles,
                backgroundColor: '#23CCEF',
                color: '#fff',
                border: '0.1px solid #23CCEF',
                textTransform: 'uppercase',
                '&:hover': {
                  backgroundColor: '#1AB3D1',
                  border: '1px solid #1AB3D1',
                },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}
              onClick={downloadAllTypsOfReport}
            >
              <DownloadIcon fontSize='small' />
              CONSUMERS
            </Button>

            {/* <Button
  component="label"
  sx={{
    color: '#23CCEF',
    border: '0.1px solid #23CCEF',
    cursor: 'pointer',
    textTransform: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    width: 'auto',
   
   mb:{
    md:0,
    lg:0,
    xl:0,
    xs:1,
    sm:0,
   },
   mt:{
    md:0,
    lg:0,
    xl:0,
    xs:1,
    sm:0,
   },
   ml:{
    xs:2,
    sm:5,
    md:0,
    lg:0,
    xl:0
        },
   
  }}
>
  <AddIcon sx={{ marginLeft: '2px' }} />
  <Typography>Import Excel</Typography>
  <input type="file" hidden onChange={importExcel} accept=".xlsx, .xls" />
</Button> */}

            <Button
              size="small"
              sx={{
                ...smallControlStyles,
                backgroundColor: '#23CCEF',
                color: '#fff',
                border: '0.1px solid #23CCEF',
                textTransform: 'uppercase',
                '&:hover': {
                  backgroundColor: '#1AB3D1',
                  border: '1px solid #1AB3D1',
                },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}
              onClick={handleAddConsumerOpen}
            >
              <AddIcon fontSize='small'/>
              ADD CONSUMER
            </Button>
          </Box>
        </Box>

        {/* Search Controls */}
        <Box sx={{ 
          display: 'flex', 
          gap: { xs: 1, sm: 2 }, 
          mb: 3,
          flexWrap: 'wrap',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          <TextField
            id="consumerNumber"
            name="consumerNumber"
            label="Search Consumer ID"
            value={cnId}
            onChange={handleChange}
            variant="outlined"
            size="small"
            sx={{
              ...smallControlStyles,
              '& .MuiTextField-root': {
                backgroundColor: '#fff',
                borderRadius: '6px'
              }
            }}
          />

          {(user?.role === 'Super Admin' || 
            user?.role === 'Admin' || 
            user?.role === 'Executive Engineer' || 
            (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
            <FormControl 
              variant="outlined" 
              size="small"
              sx={{
                ...smallControlStyles,
                '& .MuiInputLabel-root': {
                  fontSize: '0.875rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  '&.MuiInputLabel-shrink': {
                    top: 0,
                    transform: 'translateY(0) scale(0.75)'
                  }
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
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '6px',
                  height: '40px',
                  fontSize: '0.875rem',
                  '& .MuiSelect-select': {
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    paddingTop: 0,
                    paddingBottom: 0,
                    fontSize: '0.875rem'
                  }
                }}
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

        {/* Data Table */}
        <Box sx={{ 
          height: { xs: 400, sm: 500, md: 600 }, 
          width: '100%' 
        }}>
          <StyledDataGrid
            autoHeight  
            rows={rows}
            columns={columns(handleDeleteConsumer,handleEditConsumer)}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 15, 20, 25, 100]}
            // checkboxSelection
            loading={isImporting} 
            components={{
              NoRowsOverlay: () => (
                isImporting ? <CircularProgress /> : <Typography>No Rows</Typography>
              ),
            }}
            sx={{
              '& .MuiDataGrid-cell': {
                padding: { xs: '8px 12px', sm: '12px 16px' }
              },
              '& .MuiDataGrid-columnHeader': {
                padding: { xs: '8px 12px', sm: '12px 16px' }
              }
            }}
          />
        </Box>
      </Paper>

      <AddConsumer
        open={consumerOpen}
        handleClose={handleAddConsumerClose}
        handleAddConsumer={handleAddConsumer}
        currentConsumer={currentConsumer}
        editConsumer={(consumerId, consumerData) => {
          dispatch(editConsumer(consumerId, consumerData));
          dispatch(fetchConsumers());
        }}
      />
    </Box>
  );
};

export default ConsumerComponent;