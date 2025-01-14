import React, { useEffect, useState } from 'react';
import AddMeter from '../components/modals/AddMeter';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { addMeter,fetchMeters,deleteMeter,editMeter } from '../store/actions/meterActions';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import './Rolemaster.css';
import { styled } from '@mui/material/styles';
import { CircularProgress} from '@mui/material';

const columns = (handleDeleteMeter,handleEditMeter)=>[
  { field: 'id', headerName: 'ID', width: 40 },
  { field: '_id', headerName: 'RefereceId', width: 40 },
  { field: 'cn', headerName: 'CONSUMER NUMBER', width: 220 },
  { field: 'meterNumber', headerName: 'METER NUMBER', width: 180 },
  { field: 'meterPurpose', headerName: 'METER PURPOSE', width: 220 },
  { field: 'phaseType', headerName: 'PHASE TYPE', width: 150 },
  { field: 'tariffType', headerName: 'TARIFF TYPE', width: 180 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    renderCell: (params) => (
      <>
        <IconButton sx={{color:'#FFA534'}}  onClick={() => handleDeleteMeter(params.row._id)}>
          <DeleteIcon />
        </IconButton>
        <IconButton sx={{color:'#23CCEF'}}  onClick={() => handleEditMeter(params.row)}>
          <EditIcon />
        </IconButton>
      </>
    ),
  },
 
];
const MeterComponent = () => {
  const dispatch = useDispatch();
  const { meters, loading, error } = useSelector((state) => state.meters);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
const [meterOpen,setMeterOpen]=useState(false);
const [meter, setMeter] = useState('');
const [currentMeter, setCurrentMeter] = useState(null);
  useEffect(() => {
    dispatch(fetchMeters());
  }, [dispatch]);
  const handleAddMeterOpen=()=>{
    setCurrentMeter(null);
    setMeterOpen(true)
  }
  const handleAddMeterClose=()=>{
    setMeterOpen(false)
  }
  const handleAddMeter = (meterData) => {
    dispatch(addMeter(meterData));
    handleAddMeterClose();
  };
  const handleEditMeter = (meter) => {
    setCurrentMeter(meter); 
    setMeterOpen(true);
  };
  const handleDeleteMeter = (meterId) => {
    dispatch(deleteMeter(meterId));
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
  const rows = meters.map((meter,index) => ({
    id:index+1,

    _id:meter?._id||'-',
    cn: meter?.cn||'-',
    meterNumber: meter?.meterNumber||'-',
    meterPurpose:meter?.meterPurpose||'-',
    phaseType: meter?.phaseType||'-',
    tariffType:meter?.tariffType||'-',
     }));
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
        <Typography  style={{paddingLeft:'20px',color:'#0d2136'}} className='title-2'>METER MASTER</Typography>
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
            onClick={handleAddMeterOpen}
          >
            <AddIcon sx={{ marginLeft: '2px' }} />
            <Typography onClick={handleAddMeterOpen}>Add Meter</Typography>
          </Button>
        </Box>
      <StyledDataGrid
      autoHeight  
        rows={rows}
        columns={columns(handleDeleteMeter,handleEditMeter)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      <AddMeter
      open={meterOpen}
      handleClose={ handleAddMeterClose}
      handleAddMeter={handleAddMeter}
      currentMeter={currentMeter}
      editMeter={(meterId, meterData) => {
        dispatch(editMeter(meterId, meterData));
        dispatch(fetchMeters());
      }}
      />
      </Box>
    </div>
  );
};
export default MeterComponent;