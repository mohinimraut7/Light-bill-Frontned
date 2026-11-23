// import React, { useEffect, useState } from 'react';
// import AddRole from '../components/modals/AddRole';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useDispatch, useSelector } from 'react-redux';
// import { addRole,fetchRoles,deleteRole,editRole } from '../store/actions/roleActions';
// import { DataGrid } from '@mui/x-data-grid';
// import { Typography } from '@mui/material';
// import './Rolemaster.css';
// import { styled } from '@mui/material/styles';
// import { CircularProgress} from '@mui/material';

// const columns = (handleDeleteRole,handleEditRole)=>[
//   { field: 'id', headerName: 'ID', width: 40 },
//   {
//     field: 'actions',
//     headerName: 'Actions',
//     width: 200,
//     renderCell: (params) => (
//       <>
//         {/* <IconButton sx={{color:'#FFA534'}}  onClick={() => handleDeleteRole(params.row._id)}> */}
//          <IconButton sx={{color: '#F8A63F','&:hover': {color:'#e58e1f'},}}  onClick={() => handleDeleteRole(params.row._id)}>
//           <DeleteIcon />
//         </IconButton>
//         <IconButton sx={{color:'#23CCEF','&:hover':{color:'#1AB3D1' }}}  onClick={() => handleEditRole(params.row)}>
//           <EditIcon />
//         </IconButton>
//       </>
//     ),
//   },
//   { field: 'name', headerName: 'ROLE NAME', width: 220 },
//   // { field: 'username', headerName: 'USER NAME', width: 180 },
//   { field: 'email', headerName: 'EMAIL', width: 220 },
//   // { field: 'contactNumber', headerName: 'CONTACT', width: 150 },
//   { field: 'ward', headerName: 'WARD AUTHORITY', width: 180 },
 
//   {
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) => `${params?.row?.firstName || ''} ${params?.row?.lastName || ''} ${params?.row?.email || ''}`,
//   },
// ];
// const Rolemaster = () => {
//   const dispatch = useDispatch();
//   const { roles, loading, error } = useSelector((state) => state.roles);
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
// const [roleOpen,setRoleOpen]=useState(false);
// const [role, setRole] = useState('');
// const [currentRole, setCurrentRole] = useState(null);
//   useEffect(() => {
//     dispatch(fetchRoles());
//   }, [dispatch]);
//   const handleAddRoleOpen=()=>{
//     setCurrentRole(null);
//     setRoleOpen(true)
//   }
//   const handleAddRoleClose=()=>{
//     setRoleOpen(false)
//   }
//   const handleAddRole = (roleData) => {
//     dispatch(addRole(roleData));
//     handleAddRoleClose();
//   };
//   const handleEditRole = (role) => {
//     setCurrentRole(role); 
//     setRoleOpen(true);
//   };
//   const handleDeleteRole = (roleId) => {
//     dispatch(deleteRole(roleId));
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
//   const rows = roles.map((role,index) => ({
//     id:index+1,
//     _id: role._id||'-',
//     name: role.name||'-',
//     username: role.username||'-',
//     email:role.email||'-',
//     contactNumber: role.contactNumber||'-',
//     password:role.password||'-',
//     ward:role.ward||'-'
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
//   return (
//     <div style={gridStyle}>
//       <Box sx={innerDivStyle}>
//       <Box sx={{   width:'100%',display:'flex',justifyContent:'space-between',mb:2}}>
//         <Typography  style={{color:'#0d2136'}} className='title-2'>ROLE MASTER</Typography>
//         <Button
//         size="small"
//             sx={{
//              backgroundColor:'#23CCEF',
//               border: '0.1px solid #23CCEF',
//               color: '#fff',
//               cursor: 'pointer',
//               textTransform: 'none',
//               display: 'flex',
//               justifyContent: 'space-between',
//               // width: '115px',
//               '&:hover': {
//               backgroundColor: '#1AB3D1',
//            border:'1px solid #1AB3D1',
//            color: '#fff',
//               },
//             }}
//             onClick={handleAddRoleOpen}
//           >
//             <AddIcon fontSize="small"/>
//             <Typography sx={{textTransform:'uppercase',fontSize:'12px'}} onClick={handleAddRoleOpen}>Add Role</Typography>
//           </Button>
//         </Box>
//       <StyledDataGrid
//       autoHeight  
//         rows={rows}
//         columns={columns(handleDeleteRole,handleEditRole)}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5,10,30,40,50]}
//         checkboxSelection
//       />
//       <AddRole
//       open={roleOpen}
//       handleClose={ handleAddRoleClose}
//       handleAddRole={handleAddRole}
//       currentRole={currentRole}
//       editRole={(roleId, roleData) => {
//         dispatch(editRole(roleId, roleData));
//         dispatch(fetchRoles());
//       }}
//       />
//       </Box>
//     </div>
//   );
// };
// export default Rolemaster;



import React, { useEffect, useState } from 'react';
import AddRole from '../components/modals/AddRole';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { addRole,fetchRoles,deleteRole,editRole } from '../store/actions/roleActions';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import './Rolemaster.css';
import { styled } from '@mui/material/styles';
import { CircularProgress} from '@mui/material';
// UI-only imports (redesign) — no logic
import { Paper, Breadcrumbs, Tooltip } from '@mui/material';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

/* ============================================================ */
/* UI ONLY — Dashboard palette. No logic uses these values.      */
/* ============================================================ */
const T = {
  primary: '#4F72F5',
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

const columns = (handleDeleteRole,handleEditRole)=>[
  { field: 'id', headerName: 'ID', width: 40 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    renderCell: (params) => (
      <>
        {/* <IconButton sx={{color:'#FFA534'}}  onClick={() => handleDeleteRole(params.row._id)}> */}
        <Tooltip title="Delete Role" arrow>
         <IconButton size="small" sx={{color: T.red, backgroundColor: T.redSurface, border: `1px solid ${T.redBorder}`, borderRadius: '8px', mr: 1, '&:hover': {color: '#C92A2A', backgroundColor: '#FFE3E3'},}}  onClick={() => handleDeleteRole(params.row._id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
        </Tooltip>
        <Tooltip title="Edit Role" arrow>
        <IconButton size="small" sx={{color: T.primary, backgroundColor: T.primarySurface, border: `1px solid ${T.primaryBorder}`, borderRadius: '8px', '&:hover':{color: T.primaryHover, backgroundColor: '#E1EAFF' }}}  onClick={() => handleEditRole(params.row)}>
          <EditIcon fontSize="small" />
        </IconButton>
        </Tooltip>
      </>
    ),
  },
  { field: 'name', headerName: 'Role Name', width: 220 },
  // { field: 'username', headerName: 'USER NAME', width: 180 },
  { field: 'email', headerName: 'Email', width: 220 },
  // { field: 'contactNumber', headerName: 'CONTACT', width: 150 },
  { field: 'ward', headerName: 'Ward Authority', width: 180 },
 
  {
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) => `${params?.row?.firstName || ''} ${params?.row?.lastName || ''} ${params?.row?.email || ''}`,
  },
];
const Rolemaster = () => {
  const dispatch = useDispatch();
  const { roles, loading, error } = useSelector((state) => state.roles);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
const [roleOpen,setRoleOpen]=useState(false);
const [role, setRole] = useState('');
const [currentRole, setCurrentRole] = useState(null);
  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);
  const handleAddRoleOpen=()=>{
    setCurrentRole(null);
    setRoleOpen(true)
  }
  const handleAddRoleClose=()=>{
    setRoleOpen(false)
  }
  const handleAddRole = (roleData) => {
    dispatch(addRole(roleData));
    handleAddRoleClose();
  };
  const handleEditRole = (role) => {
    setCurrentRole(role); 
    setRoleOpen(true);
  };
  const handleDeleteRole = (roleId) => {
    dispatch(deleteRole(roleId));
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress sx={{ color: T.primary }} />
        <Typography sx={{ fontFamily: T.font, fontSize: 13, color: T.text2 }}>Loading roles…</Typography>
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
  const rows = roles.map((role,index) => ({
    id:index+1,
    _id: role._id||'-',
    name: role.name||'-',
    username: role.username||'-',
    email:role.email||'-',
    contactNumber: role.contactNumber||'-',
    password:role.password||'-',
    ward:role.ward||'-'
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
    '& .MuiDataGrid-cell[data-field="name"]': { fontWeight: 600 },
    '& .MuiDataGrid-footerContainer': { borderTop: `1px solid ${T.border}`, backgroundColor: '#FBFCFE' },
    '& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': { fontFamily: T.font, color: T.text2 },
  }));

  // UI-only display counts (read-only, from the same roles array already loaded)
  const uiCards = [
    { label: 'Total Roles', value: roles.length, icon: <BadgeOutlinedIcon />, fg: T.primary, bg: T.primarySurface, border: T.primaryBorder },
    { label: 'Roles with Email Assigned', value: roles.filter((r) => r.email).length, icon: <MarkEmailReadOutlinedIcon />, fg: T.green, bg: T.greenSurface, border: T.greenBorder },
    { label: 'Roles with Ward Authority', value: roles.filter((r) => r.ward).length, icon: <LocationOnOutlinedIcon />, fg: T.orange, bg: T.orangeSurface, border: T.orangeBorder },
  ];
  return (
    <div style={gridStyle}>
      <Box sx={innerDivStyle}>
      <Box sx={{   width:'100%',display:'flex',justifyContent:'space-between',mb:2, alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75, minWidth: 0 }}>
          <Box sx={{ width: 48, height: 48, borderRadius: '12px', flexShrink: 0, display: 'grid', placeItems: 'center', color: T.primary, backgroundColor: T.primarySurface, border: `1px solid ${T.primaryBorder}` }}>
            <AdminPanelSettingsOutlinedIcon />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Breadcrumbs separator="/" sx={{ '& .MuiBreadcrumbs-separator': { mx: 0.75, color: '#B4BFD2' } }}>
              <Typography sx={{ fontFamily: T.font, fontSize: 12, color: T.text2 }}>Home</Typography>
              <Typography sx={{ fontFamily: T.font, fontSize: 12, color: T.text2 }}>Administration</Typography>
              <Typography sx={{ fontFamily: T.font, fontSize: 12, color: T.primary, fontWeight: 600 }}>Role Master</Typography>
            </Breadcrumbs>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 4, height: 22, borderRadius: 2, backgroundColor: T.orange, flexShrink: 0 }} />
              <Typography  style={{color: T.text}} sx={{ fontFamily: T.font, fontWeight: 700, fontSize: { xs: 18, md: 21 } }} className='title-2'>Role Master</Typography>
            </Box>
            <Typography sx={{ fontFamily: T.font, fontSize: 13, color: T.text2, mt: 0.25 }}>
              Manage application roles, email assignments, and ward authorities.
            </Typography>
          </Box>
        </Box>
        <Button
        size="small"
            sx={{
             backgroundColor: T.primary,
              border: `0.1px solid ${T.primary}`,
              color: '#fff',
              cursor: 'pointer',
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
            onClick={handleAddRoleOpen}
          >
            <AddIcon fontSize="small"/>
            <Typography sx={{textTransform:'uppercase',fontSize:'12px', fontFamily: T.font, fontWeight: 600, letterSpacing: 0.3}} onClick={handleAddRoleOpen}>Add Role</Typography>
          </Button>
        </Box>

      {/* ================= SUMMARY CARDS (UI only, read-only) ================= */}
      <Box sx={{ mb: 2, display: 'grid', gap: 1.5, gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0,1fr))' } }}>
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
      autoHeight  
        rows={rows}
        columns={columns(handleDeleteRole,handleEditRole)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5,10,30,40,50]}
        checkboxSelection
      />
      <AddRole
      open={roleOpen}
      handleClose={ handleAddRoleClose}
      handleAddRole={handleAddRole}
      currentRole={currentRole}
      editRole={(roleId, roleData) => {
        dispatch(editRole(roleId, roleData));
        dispatch(fetchRoles());
      }}
      />
      </Box>
    </div>
  );
};
export default Rolemaster;
