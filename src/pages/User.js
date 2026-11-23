
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector} from 'react-redux';
// import { useNavigate,Link} from 'react-router-dom';
// import { addUser, fetchUsers, deleteUser, editUser } from '../store/actions/userActions';
// import { DataGrid } from '@mui/x-data-grid';
// import IconButton from '@mui/material/IconButton';
// import { Typography, Box, Button } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddUser from '../components/modals/AddUser';
// import { CircularProgress} from '@mui/material';
// import { styled } from '@mui/material/styles';
// const columns = (handleDeleteUser, handleEditUser) => [
//   { field: 'id', headerName: 'ID', width: 70 },

//   {
//     field: 'actions',
//     headerName: 'Actions',
//     width: 200,
//     renderCell: (params) => (
//       <>
//         {/* <IconButton sx={{ color: '#FFA534' }} onClick={() => handleDeleteUser(params.row._id)}> */}
//           <IconButton sx={{ color: '#F8A63F','&:hover': {color:'#e58e1f'}, }} onClick={() => handleDeleteUser(params.row._id)}>
           
//           <DeleteIcon />
//         </IconButton>
//         {/* <IconButton sx={{ color: '#23CCEF' }} onClick={() => handleEditUser(params.row)}> */}
//         <IconButton sx={{ color: '#23CCEF', '&:hover': { color: '#1AB3D1' }, }} onClick={() => handleEditUser(params.row)}>
//           <EditIcon />
//         </IconButton>
//       </>
//     ),
//   },
//   // { field: 'cn', headerName: 'CONSUMER NO.', width: 130 },

  

//   // {
//   //   field: 'username',
//   //   headerName: 'USER NAME',
//   //   width: 130,
//   //   renderCell: (params) => (
//   //     <Link 
//   //       to={`/consumer-bill-details/${params.row.cn}`} 
//   //       state={{ consumerData: params.row }} 
//   //       style={{ textDecoration: 'none', color: '#23CCEF' }}
//   //     >
//   //       {params.row.username}
//   //     </Link>
//   //   ),
//   // },

//   { field: 'username', headerName: 'USER NAME', width: 200 },

//   { field: 'email', headerName: 'EMAIL', width: 200 },


//   // { field: 'username', headerName: 'USER NAME', width: 130 },



//   { field: 'contactNumber', headerName: 'CONTACT NUMBER', width: 130 },
//   { field: 'address', headerName: 'ADDRESS', width: 130 },
//   // { field: 'roleSupervisor', headerName: 'ROLE SUPERVISOR', width: 130 },
//   { field: 'ward', headerName: 'Ward', width: 130 },
 
  
// ];
// const User = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { users, loading, error } = useSelector((state) => state.users);
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const [userOpen, setUserOpen] = useState(false)
//   const [currentUser, setCurrentUser] = useState(null);
  
//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);
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
//   // const rows = users.filter((user)=>(user?.role !== "Super Admin" && user?.role !== "Admin"  && user?.role !== "Executive Engineer" && user?.role !== "Junior Engineer")).map((user, index) => ({
//     const rows = users.map((user,index) => ({
//     id: index + 1,
//     _id: user?._id,
//     // cn: user.cn,
//     username: user?.username,
//     email: user?.email,
//     role: user?.role || '-',
//     roleSupervisor: user?.roleSupervisor || '-',
//     contactNumber: user?.contactNumber,
//     address: user?.address || '-',
//     ward: user?.ward || '-'

//   }));
//   const gridStyle = {
//     height: 'auto',
//     width: isSidebarOpen ? '80%' : '90%',
//     marginLeft: isSidebarOpen ? '19%' : '7%',
//     transition: 'margin-left 0.3s',
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
//   const handleAddUserOpen = () => {
//     setCurrentUser(null);
//     setUserOpen(true)
//   }
//   const handleAddUserClose = () => {
//     setUserOpen(false)
//   }
//   const handleAddUser = (userData) => {
//     dispatch(addUser(userData));
//     handleAddUserClose();
//   };
//   const handleEditUser = (user) => {
//     setCurrentUser(user);
//     setUserOpen(true);
//   };
//   const handleDeleteUser = (userId) => {
//     dispatch(deleteUser(userId));
//   };
//   return (
//     <div style={gridStyle}>
//       <Box sx={innerDivStyle}>
//         <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//           <Typography style={{ paddingLeft: '20px', color: '#0d2136' }} className="title-2">
//             USER MASTER
//           </Typography>
//           <Button
//           size="small"
//             sx={{
//               // backgroundColor:'#2196f3',
//               //  border: '0.1px solid #2196f3',
//               color: '#fff',
             
//               cursor: 'pointer',
              

//               // color: '#23CCEF',
//                border: '0.1px solid #23CCEF',
//                backgroundColor:'#23CCEF',
//               // cursor: 'pointer',
//               textTransform: 'none',
//               display: 'flex',
//               justifyContent: 'space-between',
//               // width: '115px',
//                '&:hover': {
//                backgroundColor: '#1AB3D1',
//                border:'1px solid #1AB3D1',
//                color: '#fff',
//               },
//             }}
//             onClick={handleAddUserOpen}
//           >
//             <AddIcon fontSize="small"/>
//             <Typography sx={{textTransform:'uppercase',fontSize:'12px'}} onClick={handleAddUserOpen}>Add User</Typography>
//           </Button>
//         </Box>
//         <StyledDataGrid
//           rows={rows}
//           columns={columns(handleDeleteUser, handleEditUser)}
//           initialState={{
//             pagination: {
//               paginationModel: { page: 0, pageSize: 5 },
//             },
//           }}
//           pageSizeOptions={[5,10,20,30]}
//           checkboxSelection
//         />
//         <AddUser
//           open={userOpen}
//           handleClose={handleAddUserClose}
//           handleAddUser={handleAddUser}
//           currentUser={currentUser}
//           editUser={(userId, userData) => {
//             dispatch(editUser(userId, userData));
//             dispatch(fetchUsers());
//           }}
//         />
//       </Box>
//     </div>
//   );
// };
// export default User;




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
// UI-only imports (redesign) — no logic
import { Paper, Breadcrumbs, Tooltip } from '@mui/material';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

/* ============================================================ */
/* UI ONLY — Dashboard palette. No logic uses these values.      */
/* ============================================================ */
const T = {
  primary: '#4F72F5',
  primary2: '#668AFB',
  primaryHover: '#3F61E0',
  primarySurface: '#EEF4FF',
  primaryBorder: '#D9E5FF',
  orange: '#F28C00',
  orangeSurface: '#FFF5E8',
  orangeBorder: '#FBE1BF',
  green: '#22B568',
  greenSurface: '#EAF8F0',
  greenBorder: '#CDEFDC',
  red: '#F04444',
  redSurface: '#FFF0F0',
  redBorder: '#FAD4D4',
  bg: '#F7F9FC',
  card: '#FFFFFF',
  text: '#172033',
  text2: '#71809A',
  border: '#E5EAF2',
  font: "'Montserrat', 'Noto Sans Devanagari', sans-serif",
};
const columns = (handleDeleteUser, handleEditUser) => [
  { field: 'id', headerName: 'ID', width: 70 },

  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    renderCell: (params) => (
      <>
        {/* <IconButton sx={{ color: '#FFA534' }} onClick={() => handleDeleteUser(params.row._id)}> */}
        <Tooltip title="Delete User" arrow>
          <IconButton size="small" sx={{ color: T.red, backgroundColor: T.redSurface, border: `1px solid ${T.redBorder}`, borderRadius: '8px', mr: 1, '&:hover': {color: '#C92A2A', backgroundColor: '#FFE3E3'}, }} onClick={() => handleDeleteUser(params.row._id)}>

          <DeleteIcon fontSize="small" />
        </IconButton>
        </Tooltip>
        {/* <IconButton sx={{ color: '#23CCEF' }} onClick={() => handleEditUser(params.row)}> */}
        <Tooltip title="Edit User" arrow>
        <IconButton size="small" sx={{ color: T.primary, backgroundColor: T.primarySurface, border: `1px solid ${T.primaryBorder}`, borderRadius: '8px', '&:hover': { color: T.primaryHover, backgroundColor: '#E1EAFF' }, }} onClick={() => handleEditUser(params.row)}>
          <EditIcon fontSize="small" />
        </IconButton>
        </Tooltip>
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

  { field: 'username', headerName: 'User Name', width: 200 },

  { field: 'email', headerName: 'Email', width: 200 },


  // { field: 'username', headerName: 'USER NAME', width: 130 },



  { field: 'contactNumber', headerName: 'Contact Number', width: 150 },
  { field: 'address', headerName: 'Address', width: 200 },
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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress sx={{ color: T.primary }} />
        <Typography sx={{ fontFamily: T.font, fontSize: 13, color: T.text2 }}>Loading users…</Typography>
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ width: isSidebarOpen ? '80%' : '90%', ml: isSidebarOpen ? '19%' : '7%', mt: 6, p: 3, borderRadius: '12px', border: `1px solid ${T.redBorder}`, backgroundColor: T.redSurface, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <ErrorOutlineIcon sx={{ color: T.red }} />
        <Typography component="p" sx={{ fontFamily: T.font, fontSize: 14, fontWeight: 600, color: T.text }}>Error: {error}</Typography>
      </Box>
    );
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
    // UI only
    borderColor: T.border,
    borderRadius: '14px',
    backgroundColor: T.card,
    boxShadow: '0 1px 2px rgba(23,32,51,0.04)',
    fontFamily: T.font,
  };

  const rowColors = ['#FAFBFE', 'white'];

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
    // ---- UI only (CSS styling, no behaviour change) ----
    border: `1px solid ${T.border}`,
    borderRadius: 12,
    fontFamily: T.font,
    fontSize: 13.5,
    color: T.text,
    '& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeader': { backgroundColor: '#F3F6FC' },
    '& .MuiDataGrid-columnHeaders': { borderBottom: `1px solid ${T.border}` },
    '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 600, fontSize: 12.5, color: '#4A5875', letterSpacing: 0.2 },
    '& .MuiDataGrid-columnSeparator': { color: T.border },
    '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': { outline: 'none' },
    '& .MuiDataGrid-row:hover': { backgroundColor: `${T.primarySurface} !important` },
    '& .MuiDataGrid-row.Mui-selected, & .MuiDataGrid-row.Mui-selected:hover': { backgroundColor: `${T.primarySurface} !important` },
    '& .MuiCheckbox-root.Mui-checked, & .MuiCheckbox-root.MuiCheckbox-indeterminate': { color: T.primary },
    '& .MuiDataGrid-cell[data-field="username"]': { fontWeight: 600 },
    '& .MuiDataGrid-cell[data-field="email"]': { color: T.primary },
    '& .MuiDataGrid-footerContainer': { borderTop: `1px solid ${T.border}`, backgroundColor: '#FBFCFE' },
    '& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': { fontFamily: T.font, color: T.text2 },
  }));

  // UI-only display counts (read-only, from the same users array already loaded)
  const uiCards = [
    { label: 'Total Users', value: users.length, icon: <PeopleAltOutlinedIcon />, fg: T.primary, bg: T.primarySurface, border: T.primaryBorder },
    { label: 'Users with Email', value: users.filter((u) => u?.email).length, icon: <MarkEmailReadOutlinedIcon />, fg: T.green, bg: T.greenSurface, border: T.greenBorder },
    { label: 'Users with Contact Number', value: users.filter((u) => u?.contactNumber).length, icon: <PhoneInTalkOutlinedIcon />, fg: T.orange, bg: T.orangeSurface, border: T.orangeBorder },
    { label: 'Ward-Assigned Users', value: users.filter((u) => u?.ward).length, icon: <LocationOnOutlinedIcon />, fg: T.primary2, bg: T.primarySurface, border: T.primaryBorder },
  ];
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
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75, minWidth: 0, pl: { xs: 0, sm: '10px' } }}>
            <Box sx={{ width: 48, height: 48, borderRadius: '12px', flexShrink: 0, display: 'grid', placeItems: 'center', color: T.primary, backgroundColor: T.primarySurface, border: `1px solid ${T.primaryBorder}` }}>
              <GroupsOutlinedIcon />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Breadcrumbs separator="/" sx={{ '& .MuiBreadcrumbs-separator': { mx: 0.75, color: '#B4BFD2' } }}>
                <Typography sx={{ fontFamily: T.font, fontSize: 12, color: T.text2 }}>Home</Typography>
                <Typography sx={{ fontFamily: T.font, fontSize: 12, color: T.text2 }}>Administration</Typography>
                <Typography sx={{ fontFamily: T.font, fontSize: 12, color: T.primary, fontWeight: 600 }}>User Master</Typography>
              </Breadcrumbs>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 4, height: 22, borderRadius: 2, backgroundColor: T.orange, flexShrink: 0 }} />
                <Typography style={{ color: T.text }} sx={{ fontFamily: T.font, fontWeight: 700, fontSize: { xs: 18, md: 21 } }} className="title-2">
                  User Master
                </Typography>
              </Box>
              <Typography sx={{ fontFamily: T.font, fontSize: 13, color: T.text2, mt: 0.25 }}>
                Manage application users, contact information, and ward assignments.
              </Typography>
            </Box>
          </Box>
          <Button
          size="small"
            sx={{
              // backgroundColor:'#2196f3',
              //  border: '0.1px solid #2196f3',
              color: '#fff',

              cursor: 'pointer',


              // color: '#23CCEF',
               border: `0.1px solid ${T.primary}`,
               backgroundColor: T.primary,
              // cursor: 'pointer',
              textTransform: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              // width: '115px',
              gap: 0.75,
              height: 40,
              px: 2,
              borderRadius: '10px',
              flexShrink: 0,
              boxShadow: 'none',
               '&:hover': {
               backgroundColor: T.primaryHover,
               border:`1px solid ${T.primaryHover}`,
               color: '#fff',
               boxShadow: '0 4px 12px rgba(79,114,245,.25)',
              },
            }}
            onClick={handleAddUserOpen}
          >
            <AddIcon fontSize="small"/>
            <Typography sx={{textTransform:'uppercase',fontSize:'12px', fontFamily: T.font, fontWeight: 600, letterSpacing: 0.3}} onClick={handleAddUserOpen}>Add User</Typography>
          </Button>
        </Box>

        {/* ================= SUMMARY CARDS (UI only, read-only) ================= */}
        <Box sx={{ mb: 2, display: 'grid', gap: 1.5, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0,1fr))', lg: 'repeat(4, minmax(0,1fr))' } }}>
          {uiCards.map((c) => (
            <Paper
              key={c.label}
              elevation={0}
              sx={{
                p: 1.5, borderRadius: '12px', border: `1px solid ${c.border}`, backgroundColor: T.card,
                display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0,
                boxShadow: '0 1px 2px rgba(23,32,51,0.04)',
                transition: 'box-shadow .2s ease', '&:hover': { boxShadow: '0 6px 16px rgba(23,32,51,0.08)' },
              }}
            >
              <Box sx={{ width: 40, height: 40, flexShrink: 0, borderRadius: '10px', display: 'grid', placeItems: 'center', color: c.fg, backgroundColor: c.bg, '& svg': { fontSize: 21 } }}>
                {c.icon}
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontFamily: T.font, fontSize: 12, fontWeight: 500, color: T.text2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.label}</Typography>
                <Typography sx={{ fontFamily: T.font, fontSize: 22, fontWeight: 700, color: T.text, lineHeight: 1.2 }}>{c.value}</Typography>
              </Box>
            </Paper>
          ))}
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
