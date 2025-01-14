import React, { useEffect, useState } from 'react';
import AddTarriff from '../components/modals/AddTarriff';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { addTarriff,fetchTarriffs,deleteTarriff,editTarriff } from '../store/actions/tarriffActions';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import './Rolemaster.css';
import { styled } from '@mui/material/styles';
import { CircularProgress} from '@mui/material';

const columns = (handleDeleteTarriff,handleEditTarriff)=>[
  { field: 'id', headerName: 'ID', width: 40 },
  { field: 'tarriffCode', headerName: 'TARRIFF CODE', width: 220 },
  { field: 'tarriffType', headerName: 'TARRIFF TYPE', width: 310 },
 
  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    renderCell: (params) => (
      <>
        <IconButton sx={{color:'#FFA534'}}  onClick={() => handleDeleteTarriff(params.row._id)}>
          <DeleteIcon />
        </IconButton>
        <IconButton sx={{color:'#23CCEF'}}  onClick={() =>handleEditTarriff(params.row)}>
          <EditIcon />
        </IconButton>
      </>
    ),
  },
 ];
const Tarriffmaster = () => {
  const dispatch = useDispatch();
  const { tarriffs, loading, error } = useSelector((state) => state?.tarriffs);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
const [tarriffOpen,setTarriffOpen]=useState(false);
const [tarriff, setTarriff] = useState('');
const [currentTarriff, setCurrentTarriff] = useState(null);
  useEffect(() => {
    dispatch(fetchTarriffs());
  }, [dispatch]);
  const handleAddTarriffOpen=()=>{
    setCurrentTarriff(null);
    setTarriffOpen(true)
  }
  const handleAddTarriffClose=()=>{
    setTarriffOpen(false)
  }
  const handleAddTarriff = (tarriffData) => {
    dispatch(addTarriff(tarriffData));
    handleAddTarriffClose();
  };
  const handleEditTarriff = (tarriff) => {
    setCurrentTarriff(tarriff); 
    setTarriffOpen(true);
  };
  const handleDeleteTarriff = (tarriffId) => {
    dispatch(deleteTarriff(tarriffId));
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
  const rows = tarriffs.map((tarriff,index) => ({
    id:index+1,
    _id: tarriff?._id||'-',
    tarriffCode: tarriff?.tarriffCode||'-',
    tarriffType: tarriff?.tarriffType||'-',
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
        <Typography  style={{paddingLeft:'20px',color:'#0d2136'}} className='title-2'>TARRIFF MASTER</Typography>
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
            onClick={handleAddTarriffOpen}
          >
            <AddIcon sx={{ marginLeft: '2px' }} />
            <Typography onClick={handleAddTarriffOpen}>Add Tarriff</Typography>
          </Button>
        </Box>
      <StyledDataGrid
      autoHeight  
        rows={rows}
        columns={columns(handleDeleteTarriff,handleEditTarriff)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      <AddTarriff
      open={tarriffOpen}
      handleClose={ handleAddTarriffClose}
      handleAddTarriff={handleAddTarriff}
      currentTarriff={currentTarriff}
      editTarriff={(tarriffId,tarriffData) => {
        dispatch(editTarriff(tarriffId,tarriffData));
        dispatch(fetchTarriffs());
      }}
      />
      </Box>
    </div>
  );
};
export default Tarriffmaster;
