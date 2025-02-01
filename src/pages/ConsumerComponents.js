import React, { useEffect, useState } from 'react';
import AddConsumer from '../components/modals/AddConsumer';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { addConsumer,fetchConsumers,deleteConsumer,editConsumer } from '../store/actions/consumerActions';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import './Rolemaster.css';
import { styled } from '@mui/material/styles';
import { CircularProgress} from '@mui/material';

const columns = (handleDeleteConsumer,handleEditConsumer)=>[
  { field: 'id', headerName: 'ID', width: 40 },

  { field: 'consumerNumber', headerName: 'CONSUMER NUMBER', width: 220 },
  { field: 'consumerAddress', headerName: 'CONSUMER ADDRESS', width: 180 },
  { field: 'ward', headerName: 'WARD', width: 180 },
  { field: 'meterPurpose', headerName: 'METER PURPOSE', width: 220 },
  { field: 'phaseType', headerName: 'PHASE TYPE', width: 150 },
 
  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    renderCell: (params) => (
      <>
        <IconButton sx={{color:'#FFA534'}}  onClick={() => handleDeleteConsumer(params.row._id)}>
          <DeleteIcon />
        </IconButton>
        <IconButton sx={{color:'#23CCEF'}}  onClick={() => handleEditConsumer(params.row)}>
          <EditIcon />
        </IconButton>
      </>
    ),
  },
 
];
const ConsumerComponent = () => {
  const dispatch = useDispatch();
  const { consumers, loading, error } = useSelector((state) => state?.consumers);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
const [consumerOpen,setConsumerOpen]=useState(false);
const [consumer, setConsumer] = useState('');
const [currentConsumer, setCurrentConsumer] = useState(null);
  useEffect(() => {
    dispatch(fetchConsumers());
  }, [dispatch]);
  const handleAddConsumerOpen=()=>{
    setCurrentConsumer(null);
    setConsumerOpen(true)
  }
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
  const rows = consumers?.map((consumer,index) => ({
    id:index+1,
    _id:consumer._id,
    
    consumerNumber:consumer?.consumerNumber||'-',
    consumerAddress: consumer?.consumerAddress||'-',
    ward:consumer?.ward||'-',
    meterPurpose:consumer?.meterPurpose||'-',
    phaseType: consumer?.phaseType||'-',
    
     }));
  const gridStyle = {
    height: 'auto',
    width: isSidebarOpen ? '80%' : '90%',
    marginLeft: isSidebarOpen ? '19%' : '7%',
    transition: 'margin-rleft 0.3s',
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
  return (
    <div style={gridStyle}>
      <Box sx={innerDivStyle}>
      <Box sx={{   width:'100%',display:'flex',justifyContent:'space-between',mb:2}}>
        <Typography  style={{paddingLeft:'20px',color:'#0d2136'}} className='title-2'>CONSUMER MASTER</Typography>
        <Button
            sx={{
              color: '#23CCEF',
              border: '0.1px solid #23CCEF',
              cursor: 'pointer',
              textTransform: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              width: 'auto',
            }}
            onClick={handleAddConsumerOpen}
          >
            <AddIcon sx={{ marginLeft: '2px' }} />
            <Typography onClick={handleAddConsumerOpen}>Add Consumer</Typography>
          </Button>
        </Box>
      <StyledDataGrid
      autoHeight  
        rows={rows}
        columns={columns(handleDeleteConsumer,handleEditConsumer)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      <AddConsumer
      open={consumerOpen}
      handleClose={ handleAddConsumerClose}
      handleAddConsumer={handleAddConsumer}
      currentConsumer={currentConsumer}
      editConsumer={(consumerId, consumerData) => {
        dispatch(editConsumer(consumerId, consumerData));
        dispatch(fetchConsumers());
      }}
      />
      </Box>
    </div>
  );
};
export default ConsumerComponent;