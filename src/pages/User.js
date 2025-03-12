
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate,Link} from 'react-router-dom';
import { addUser, fetchUsers, deleteUser, editUser } from '../store/actions/userActions';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import { Typography, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddUser from '../components/modals/AddUser';
import { CircularProgress} from '@mui/material';
import { styled } from '@mui/material/styles';
const columns = (handleDeleteUser, handleEditUser) => [
  { field: 'id', headerName: 'ID', width: 70 },

  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    renderCell: (params) => (
      <>
        <IconButton sx={{ color: '#FFA534' }} onClick={() => handleDeleteUser(params.row._id)}>
          <DeleteIcon />
        </IconButton>
        <IconButton sx={{ color: '#23CCEF' }} onClick={() => handleEditUser(params.row)}>
          <EditIcon />
        </IconButton>
      </>
    ),
  },
  // { field: 'cn', headerName: 'CONSUMER NO.', width: 130 },

  

  // {
  //   field: 'username',
  //   headerName: 'USER NAME',
  //   width: 130,
  //   renderCell: (params) => (
  //     <Link 
  //       to={`/consumer-bill-details/${params.row.cn}`} 
  //       state={{ consumerData: params.row }} 
  //       style={{ textDecoration: 'none', color: '#23CCEF' }}
  //     >
  //       {params.row.username}
  //     </Link>
  //   ),
  // },

  { field: 'username', headerName: 'USER NAME', width: 200 },

  { field: 'email', headerName: 'EMAIL', width: 200 },


  // { field: 'username', headerName: 'USER NAME', width: 130 },



  { field: 'contactNumber', headerName: 'CONTACT NUMBER', width: 130 },
  { field: 'address', headerName: 'ADDRESS', width: 130 },
  // { field: 'roleSupervisor', headerName: 'ROLE SUPERVISOR', width: 130 },
  { field: 'ward', headerName: 'Ward', width: 130 },
 
  
];
const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.users);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const [userOpen, setUserOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
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
  // const rows = users.filter((user)=>(user?.role !== "Super Admin" && user?.role !== "Admin"  && user?.role !== "Executive Engineer" && user?.role !== "Junior Engineer")).map((user, index) => ({
    const rows = users.map((user,index) => ({
    id: index + 1,
    _id: user?._id,
    // cn: user.cn,
    username: user?.username,
    email: user?.email,
    role: user?.role || '-',
    roleSupervisor: user?.roleSupervisor || '-',
    contactNumber: user?.contactNumber,
    address: user?.address || '-',
    ward: user?.ward || '-'

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
  const handleAddUserOpen = () => {
    setCurrentUser(null);
    setUserOpen(true)
  }
  const handleAddUserClose = () => {
    setUserOpen(false)
  }
  const handleAddUser = (userData) => {
    dispatch(addUser(userData));
    handleAddUserClose();
  };
  const handleEditUser = (user) => {
    setCurrentUser(user);
    setUserOpen(true);
  };
  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };
  return (
    <div style={gridStyle}>
      <Box sx={innerDivStyle}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography style={{ paddingLeft: '20px', color: '#0d2136' }} className="title-2">
            USER MASTER
          </Typography>
          <Button
            sx={{
              color: '#23CCEF',
              border: '0.1px solid #23CCEF',
              cursor: 'pointer',
              textTransform: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              width: '115px',
            }}
            onClick={handleAddUserOpen}
          >
            <AddIcon sx={{ marginLeft: '2px' }} />
            <Typography onClick={handleAddUserOpen}>Add User</Typography>
          </Button>
        </Box>
        <StyledDataGrid
          rows={rows}
          columns={columns(handleDeleteUser, handleEditUser)}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5,10,20,30]}
          checkboxSelection
        />
        <AddUser
          open={userOpen}
          handleClose={handleAddUserClose}
          handleAddUser={handleAddUser}
          currentUser={currentUser}
          editUser={(userId, userData) => {
            dispatch(editUser(userId, userData));
            dispatch(fetchUsers());
          }}
        />
      </Box>
    </div>
  );
};
export default User;
