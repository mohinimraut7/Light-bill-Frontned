// import React, { useState, useEffect } from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import { Box, Button, useMediaQuery } from '@mui/material';
// import MuiDrawer from '@mui/material/Drawer';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import CssBaseline from '@mui/material/CssBaseline';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import HomeIcon from '@mui/icons-material/Home';
// import Person from '@mui/icons-material/Person';
// import PaymentIcon from '@mui/icons-material/Payment';
// import AccessibilityIcon from '@mui/icons-material/Accessibility';
// import NotificationsIcon from '@mui/icons-material/Notifications';

// import VerifiedIcon from '@mui/icons-material/Verified';
// import UpcomingIcon from '@mui/icons-material/Upcoming';
// import ReportIcon from '@mui/icons-material/Report';

// import Badge from '@mui/material/Badge';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleSidebar } from './store/actions/toggleSidebar';
// import { upComingDueBills } from './utils/DueBillHelper';


// import './Sidebar.css';
// import drawerbg from './Images/sidebarimg.jpg'
// import logo from './Images/vvcmclogo.jpg';
// import { fetchBills } from './store/actions/billActions';
// const drawerWidth = 240;
// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
  
//   backgroundImage: `url(${drawerbg})`,
//   backgroundSize: 'cover',
  
// });
// const closedMixin = (theme) => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
//   backgroundColor: '#FFA534',
//   overflowX: 'hidden',
//   backgroundImage: `url(${drawerbg})`,
//   backgroundSize: 'cover',
//   overflowX: 'hidden',
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up('sm')]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });
// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));
// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   backgroundColor: '#FFA534',
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));
// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//       ...openedMixin(theme),
//       '& .MuiDrawer-paper': openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       '& .MuiDrawer-paper': closedMixin(theme),
//     }),
//   }),
// );
// const MenuButton = styled(IconButton)(({ theme }) => ({
//   backgroundColor: '#fff',
//   '&:hover': {
//     backgroundColor: '#fff',
//   },
// }));



// export default function Sidebar() {
//   const notificationCount = 5;
//   const theme = useTheme();
//   const isXs = useMediaQuery(theme.breakpoints.down('xs'));
//   const isSm = useMediaQuery(theme.breakpoints.down('sm'));
//   const isMd = useMediaQuery(theme.breakpoints.down('md'));
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const open = useSelector((state) => state.sidebar.isOpen);
//   const { bills, loading, error } = useSelector((state) => state.bills);
//   const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
//   const user = useSelector(state => state.auth.user);
//   const today = new Date(); 
  
//   const dueAlertrows = upComingDueBills(bills, user);

// const dueAlertCount = dueAlertrows.length;


// const passedDueDateCount = bills.filter(bill => {
//   const dueDate = new Date(bill.dueDate);
//   const isOverdue = dueDate < today;
//   const isUnpaid = bill.paymentStatus === 'unpaid';

 
//   if (user?.role === 'Junior Engineer') {
//     if (user.ward === 'Head Office') {
    
//       return isOverdue && isUnpaid;
//     } else {
   
//       return isOverdue && isUnpaid && user.ward === bill.ward;
//     }
//   }
//   return isOverdue && isUnpaid;
// }).length;



// const overdueAlertCount = bills.filter(bill => bill.overdueAlert === true).length;

//   useEffect(() => {
//     dispatch(fetchBills());
//   }, [dispatch]);

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleProfileMenuClose = () => {
//     setAnchorEl(null);
//   };
//   const handleProfileToggle = () => {
//     setProfileMenuOpen(!profileMenuOpen);
//   };
//   const handleDrawerToggle = () => {
//     dispatch(toggleSidebar());
//   };
//   const handleLogout = () => {
//     localStorage.removeItem('resdata');
//     dispatch({ type: 'LOGOUT' });
//     navigate('/login');
//   };


//   const BlurAppBar = styled(AppBar)({
//     backgroundColor: '#fff',
//     backdropFilter: 'blur(10px)',
//     boxShadow: 'none',
//     boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)',
//   });


//   const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
//   return (
//     <Box sx={{ display: 'flex', backgroundColor: isAuthPage ? 'transparent' : 'white'}} >
//       <CssBaseline />

//       {!isAuthPage && <BlurAppBar position="fixed" open={open} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: isAuthPage ? 'transparent' : 'white', height: open ? 'auto' : '16%' }} >
//         <Toolbar>
//           {location.pathname !== '/login' && location.pathname !== '/register' && (
//             <MenuButton
//               color="#757575"
//               aria-label="open drawer"
//               onClick={handleDrawerToggle}
//               edge="start"
//               sx={{
//                 // marginRight: 5,
//                 marginRight:{
//                   lg:5,
//                   md:5,
//                   sm:5,
//                   xs:0

//                 },
//                 ...(open && { display: 'none' }),
//               }}
//             >
//               <MenuIcon sx={{ color:'#475569'}} />
//             </MenuButton>
//           )}
//           {!open &&
//             <Box sx={{ width: '100px', height: '100%', mr: 2, display: isSm && 'none' }}><img src={logo} height='100%' width='100%' /></Box>}

//           <Box sx={{
         
//             width: '100%',
//             display: isSm && open ? 'none' : 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             flexDirection: isSm ? 'column' : 'row',
             
//           }}
//           >
//             {location.pathname !== '/login' && location.pathname !== '/register' &&
//               <Box sx={{
//                 display: 'flex', width: {
//                   lg: '100%',
//                   md: '100%',
//                   sm: '100%',
//                   xs: '100%'
//                 }
//               }}>
//                 <Box sx={{
//                   width:{
//                     lg:'59%',
//                     xl:'59%',
//                     md:'78%',
//                     sm:'100%',
//                     xs:'100%'
//                   }
//                 }}>
//                   <Typography
//                     className='logo-title'
//                     sx={{
//                        color: location.pathname === '/login' || location.pathname === '/register' ? '#F0F0F0' : '#16A34A',
//                       display: 'flex', alignItems: 'center', justifyContent: {
//                         xs: 'flex-start',
//                         sm: 'flex-start',
//                         md:'flex-start',
//                         lg:'flex-start',
//                         xl:'flex-start'
                        
//                       },
//                       fontSize: {
//                         sm: '20px',
//                         xs: '12px',
//                         md: '20px',
//                         lg: '18px'
//                       },
//                       width:{
//                      sx:'100%',
                     
//                       },

//                       letterSpacing: location.pathname === '/login' || location.pathname === '/register' ? '1px' : '0px',
//                       textTransform: 'uppercase'
//                     }}>Vasai Virar City Municipal Corporation</Typography>
//                   <Typography 
//                   className='title-lightbill'
//                   sx={{
//                      color: location.pathname === '/login' || location.pathname === '/register' ? '#BB981A' : '#F8A63F',
//                     fontSize: { xs: '11px', sm: '12px', md: '', lg: '', fontWeight: '500' },
//                     display: 'flex', alignItems: 'center', justifyContent: {
//                       xs: 'flex-start',
//                       sm: 'flex-start',
//                       md: 'flex-start',
//                       lg: 'flex-start'
//                     }
//                   }} noWrap component="div">
//                     LIGHT BILL MANAGEMENT SYSTEM
//                   </Typography>
//                 </Box>
//               </Box>
//             }
//             <Box sx={{
//               display: {
//                 xs: 'flex',
//                 md: 'flex',
//                 sm: 'flex', lg: 'flex'
//               }, alignItems: 
//               {
//                 lg:'center',
//                 md:'center',
//                 sm:'center',
//                 xs:'center'
//               },
//               justifyContent: { xs: 'space-between', sm: 'center', md: 'flex-end', lg: 'flex-end' },
//               width: {
//                 xs: user?.role === 'Super Admin' ? '100%' : user?.role === 'Executive Engineer' ? '280px' : user?.role === 'Admin' ? '180px' : '260px',
//                 sm: user?.role === 'Super Admin' ? '100%' : user?.role === 'Executive Engineer' ? '280px' : user?.role === 'Admin' ? '180px' : '260px',
//                 md: user?.role === 'Super Admin' ? '85%' : user?.role === 'Executive Engineer' ? '280px' : user?.role === 'Admin' ? '180px' : '260px',
//                 lg: user?.role === 'Super Admin' ? '85%' : user?.role === 'Executive Engineer' ? '280px' : user?.role === 'Admin' ? '180px' : '260px',
//               },
//             }}>
//               <Box
//                 sx={{
//                   color: '#FB404B',
//                   alignItems:'center',display:'flex',justifyContent:
//                   {
//                     lg:'center',
//                     md:'center',
//                     sm:'space-between',
//                     xs:'flex-start'
//                   },
//                   mr: {
//                     lg: 2,
//                     md: 2,
//                   },
//                   fontSize: {
//                     sm: '15px',
//                     xs: '15px',
//                     md: '15px',
//                     lg: '15px'
//                   },
//                   width:{
//                     lg:'800px',
//                     xl:'800px',
//                     md:'600px',
//                     sm:'100%',
//                     xs:'100%'
//                   }
//                 }}><span style={{marginRight:'10px'}}>{user?.role}</span> {" "}<span style={{fontSize:'15px'}}>{user?.ward}</span> 
//               </Box>
//               <Box>
//                 {isAuthenticated ? (
//                   <Box>
//                       <IconButton sx={{ color: '#FB404B' }} onClick={handleLogout}>
//                         <PowerSettingsNewIcon />
//                       </IconButton>
//                   </Box>
//                 ) : (
//                   <>
//                     <Button sx={{ color: location.pathname === '/login' || location.pathname === '/register' ? '#F0F0F0' : '#0d2136' }} onClick={() => navigate("/login")}>Login</Button>
//                     <Button sx={{ color: location.pathname === '/login' || location.pathname === '/register' ? '#F0F0F0' : '#0d2136' }} onClick={() => navigate("/register")}>Signup</Button>
//                   </>
//                 )}
//               </Box>
//             </Box>
//           </Box>
//           <IconButton sx={{ color: '#0d2136', display: isSm && open ? 'flex' : 'none', }} onClick={handleLogout}>
//             <PowerSettingsNewIcon />
//           </IconButton>
//         </Toolbar>
//       </BlurAppBar>}
//       {location.pathname !== '/login' && location.pathname !== '/register' && (
//         <Drawer style={{ position: 'relative' }} className='drawerst' variant="permanent" open={open}>
//           <div style={{ position: 'absolute',
//             backgroundColor: '#F8A63F',
//               width: '100%', height: '100%', opacity: '0.9' }}></div>
//           <DrawerHeader>
//             {open && <Box sx={{ width: '100%', height: '185px', display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
//               <Box sx={{ zIndex: 10, height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', top: 10 }} >
//                 <img src={logo} height="65%" width="60%" className="imglogoopen" sx={{ objectFit: 'contain', borderRadius: '15px' }} />
//               </Box>
//               <IconButton size="small"  
//   sx={{
//     position: 'absolute',
//     top: 50,
//     right: 0,
//     backgroundColor: '#F8A63F',
//     zIndex: theme.zIndex.drawer + 2,
//     '&:hover': {
//       backgroundColor: '#F8A63F',
//       boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)',
//       transform: 'translateY(-2px)',
//     },
//   }}
//    onClick={handleDrawerToggle}>
//                 {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon sx={{ color: '#fff' }} />}
//               </IconButton>
//             </Box>}
//           </DrawerHeader>
//           <Box className="custom-scrollbar"
//             sx={
//               user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer'?
//               {
//               height: '80%',
//               overflowX: 'hidden',
//               zIndex: 1,
//               overflowY: 'scroll', 
//               padding: 0.4,
//               '&::-webkit-scrollbar': {
//                 width: '6px !important',
//               },
//               '&::-webkit-scrollbar-track': {
//                 background: '#F8A63F',
//                 borderRadius: '10px',
//                 width:'0px !important'
//               },
//               '&::-webkit-scrollbar-thumb': {
//                 backgroundColor: '#F8A63F',
//                 borderRadius: '10px',
//               },
//               '&::-webkit-scrollbar-thumb:hover': {
//                  backgroundColor: ' #FFB65A',
//               },
//             }:{}}
//           >
//             <List>
//               <ListItem disablePadding sx={{ display: open===false && 'block' }}>
//                 <ListItemText className='S-M-Item' primary={`${user?.username}`} 
//                  primaryTypographyProps={{
//                       fontSize: '14px',
//                       textTransform: 'uppercase',
//                      color: '#fff',
//                      fontWeight:'bold'
//                     }}
//                 sx={{ opacity: open ? 1 : 0,ml:2.9,color: '#fff' }} />
//                 <ListItemButton onClick={handleProfileToggle}>
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 0 : 'auto',
//                       color: '#fff',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       '&:focus': {
//                         boxShadow: 'none',
//                       },
//                     }}
//                   >
//                     <ExpandMoreIcon />
//                   </ListItemIcon>
//                 </ListItemButton>
//               </ListItem>
//               {profileMenuOpen && (
//                 <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/profile")}>
//                   <ListItemButton>
//                     <ListItemIcon
//                       sx={{
//                         minWidth: 0,
//                         mr: open ? 0.2 : 'auto',
//                         justifyContent: 'center',
//                         color: '#fff'
//                       }}
//                     >
//                       <AccessibilityIcon />
//                     </ListItemIcon>
//                     <ListItemText className='S-M-Item' primary="Profile" 
//                      primaryTypographyProps={{
//                       fontSize: '14px',
//                       textTransform: 'uppercase',
//                      color: '#fff',
//                      fontWeight:'bold'
//                     }}
//                     sx={{ opacity: open ? 1 : 0,color: '#000' }} />
//                   </ListItemButton>
//                 </ListItem>
//               )}
//  {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer') &&(
//   <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/")}>
//                 <ListItemButton
//                   sx={{
//                     minHeight: 48,
//                     justifyContent: open ? 'initial' : 'center',
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 0.2 : 'auto',
//                       justifyContent: 'center',
//                        color: '#fff',
//                     }}
//                   >
//                     <HomeIcon />
//                   </ListItemIcon>
//                   <ListItemText className='S-M-Item' primary="Home" 
//                    primaryTypographyProps={{
//                       fontSize: '14px',
//                       textTransform: 'uppercase',
//                       color: '#fff',
//                      fontWeight:'bold'
//                     }}
//                   sx={{ opacity: open ? 1 : 0,
//                    color: '#fff',
//                   }} />
//                 </ListItemButton>
//               </ListItem>
//  )}
//               {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
//                 <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/rolemaster")}>
//                   <ListItemButton
//                     sx={{
//                       justifyContent: open ? 'initial' : 'center',
//                     }}
//                   >
//                     <ListItemIcon
//                       sx={{
//                         minWidth: 0,
//                         mr: open ? 0.2 : 'auto',
//                         justifyContent: 'center',
//                          color: '#fff',
//                       }}
//                     >
//                       <AccessibilityIcon />
//                     </ListItemIcon>
//                     <ListItemText primary="Role" 
//                      primaryTypographyProps={{
//                       fontSize: '14px',
//                       textTransform: 'uppercase',
//                      color: '#fff',
//                      fontWeight:'bold'
//                     }}
//                     sx={{ opacity: open ? 1 : 0}} />
//                   </ListItemButton>
//                 </ListItem>
//               )}
//               {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || 
//               (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
//                 <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/users")}>
//                   <ListItemButton
//                     sx={{
//                       minHeight: 48,
//                       justifyContent: open ? 'initial' : 'center',
//                       // px: 2.5,
//                     }}
//                   >
//                     <ListItemIcon
//                       sx={{
//                         minWidth: 0,
//                         mr: open ? 0.2 : 'auto',
//                         justifyContent: 'center',
//                          color: '#fff',
//                       }}
//                     >
//                       <Person />
//                     </ListItemIcon>
//                     <ListItemText  primary="User" 
//                      primaryTypographyProps={{
//                       fontSize: '14px',
//                       textTransform: 'uppercase',
//                      color: '#fff',
//                      fontWeight:'bold'
//                     }}
//                     sx={{ opacity: open ? 1 : 0,
//                      color: '#fff',
//                      }} />
//                   </ListItemButton>
//                 </ListItem>
//               )}
// {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer'|| user?.role === 'Junior Engineer') && (
//                 <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/consumercomponent")}>
//                   <ListItemButton
//                     sx={{
//                       minHeight: 48,
//                       justifyContent: open ? 'initial' : 'center',
//                     }}
//                   >
//                     <ListItemIcon
//                       sx={{
//                         minWidth: 0,
//                         mr: open ? 0.2 : 'auto',
//                         justifyContent: 'center',
//                          color: '#fff',
//                       }}
//                     >
//                       <Person />
//                     </ListItemIcon>
//                     <ListItemText className='S-M-Item' primary="Consumer" 
//                      primaryTypographyProps={{
//                       fontSize: '14px',
//                       textTransform: 'uppercase',
//                      color: '#fff',
//                      fontWeight:'bold'
//                     }}
//                     sx={{ opacity: open ? 1 : 0,
//                      color: '#fff',
//                     }} />
//                   </ListItemButton>
//                 </ListItem>
//               )}    
// {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer') && (
// <ListItem disablePadding sx={{ display: 'block'}} onClick={() => navigate("/bills")}>
//                   <ListItemButton
//                     sx={{
//                       minHeight: 48,
//                       justifyContent: open ? 'initial' : 'center',
//                     }}
//                   >
//                     <ListItemIcon
//                       sx={{
//                         minWidth: 0,
//                         mr: open ? 0.2 : 'auto',
//                         justifyContent: 'center',
//                         color: '#fff',
//                       }}
//                     >
//                       <PaymentIcon />
//                     </ListItemIcon>
//                     <ListItemText className='S-M-Item' primary="Consumer Bills"
//                      primaryTypographyProps={{
//                       fontSize: '14px',
//                       textTransform: 'uppercase',
//                      color: '#fff',
//                      fontWeight:'bold'
//                     }}
//                     sx={{ opacity: open ? 1 : 0 ,textAlign:'left',
//                      color: '#fff',
//                     }} />
//                   </ListItemButton>
//                 </ListItem>
// )}
// {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer') && (
//                 <ListItem disablePadding 
//                  primaryTypographyProps={{
//                       fontSize: '14px',
//                       textTransform: 'uppercase',
//                      color: '#fff',
//                      fontWeight:'bold'
//                     }}
//                 sx={{ display: 'block'}} 
//                 onClick={() => navigate("/usersupcomingduebills")}>
//                   <ListItemButton
//                     sx={{
//                       minHeight: 48,
//                       justifyContent: open ? 'initial' : 'center',
//                     }}
//                   >
//                     <ListItemIcon
//                       sx={{
//                         minWidth: 0,
//                         mr: open ? 0.2 : 'auto',
//                         justifyContent: 'center',
//                          color: '#fff',
//                       }}
//                     >
//                       <UpcomingIcon />
//                     </ListItemIcon>
//                     <ListItemText className='S-M-Item' primary="Upcoming Due Bills"
//                      primaryTypographyProps={{
//                       fontSize: '14px',
//                       textTransform: 'uppercase',
//                      color: '#fff',
//                      fontWeight:'bold'
//                     }}
//                     sx={{ opacity: open ? 1 : 0,
//                      color: '#fff',
//                     }} />
//                     {dueAlertCount > 0 && open && (
//                       <Badge className='badgeupcomingdue' badgeContent={dueAlertCount} color="primary">
//                         <NotificationsIcon sx={{ color: 'white' }} />
//                       </Badge>
//                     )}
//                   </ListItemButton>
//                 </ListItem>
//               )}
// {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer' || (user?.role === 'Junior Engineer' && user.ward=='Head Office')) && (
//                 <ListItem disablePadding 
//                    primaryTypographyProps={{
//                       fontSize: '14px',
//                       textTransform: 'uppercase',
//                      color: '#fff',
//                      fontWeight:'bold'
//                     }}
//                 sx={{ display: 'block'}} 
//                 onClick={() => navigate("/overduebills")}>
//                   <ListItemButton
//                     sx={{
//                       minHeight: 48,
//                       justifyContent: open ? 'initial' : 'center',
//                     }}
//                   >
//                     <ListItemIcon
//                       sx={{
//                         minWidth: 0,
//                         mr: open ? 0.2 : 'auto',
//                         justifyContent: 'center',
//                          color: '#fff',
//                       }}
//                     >
//                       <PaymentIcon />
//                     </ListItemIcon>
//                     <ListItemText className='S-M-Item' primary="Overdue Bills"
//                     primaryTypographyProps={{
//                       fontSize: '14px',
//                       textTransform: 'uppercase',
//                      color: '#fff',
//                      fontWeight:'bold'
//                     }}
//                     sx={{ opacity: open ? 1 : 0,
//                      color: '#fff',
//                     }} />
//                     {passedDueDateCount > 0 && open && (
//                       <Badge className='badgeupcomingdue' badgeContent={passedDueDateCount} color="primary">
//                         <NotificationsIcon sx={{ color: 'white' }} />
//                       </Badge>
//                     )}
//                   </ListItemButton>
//                 </ListItem>
//               )}
// {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer') 
// &&
// (
//               <ListItem disablePadding sx={{ display: 'block'}} 
//                primaryTypographyProps={{
//                       fontSize: '14px',
//                       textTransform: 'uppercase',
//                      color: '#fff',
//                      fontWeight:'bold'
//                     }}
//               onClick={() => navigate("/formonetwentynew")}>
//                 <ListItemButton
//                   sx={{
//                     minHeight: 48,
//                     justifyContent: open ? 'initial' : 'center',
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 0.2 : 'auto',
//                       justifyContent: 'center',
//                        color: '#fff',
//                     }}
//                   >
//                     <ReportIcon />
//                   </ListItemIcon>
//                   <ListItemText className='S-M-Item' primary="Form 120 report" 
//                    primaryTypographyProps={{
//                       fontSize: '14px',
//                       textTransform: 'uppercase',
//                      color: '#fff',
//                      fontWeight:'bold'
//                     }}
//                   sx={{ opacity: open ? 1 : 0,
//                    color: '#fff',
//                   }} />
//                 </ListItemButton>
//               </ListItem>
// )}
// {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer') 
// &&
// (
//   <ListItem disablePadding sx={{ display: 'block'}} 
//     primaryTypographyProps={{
//                       fontSize: '14px',
//                       textTransform: 'uppercase',
//                     //  color: '#000',
//                      color: '#fff',
//                      fontWeight:'bold'
//                     }}
//   onClick={() => navigate("/billinganomaly")}>
//   <ListItemButton
//     sx={{
//       minHeight: 48,
//       justifyContent: open ? 'initial' : 'center',
//     }}
//   >
//     <ListItemIcon
//       sx={{
//         minWidth: 0,
//         mr: open ? 0.2 : 'auto',
//         justifyContent: 'center',
//        color: '#fff',
//       }}
//     >
//       <ReportIcon />
//     </ListItemIcon>
//     <ListItemText className='S-M-Item' primary="Billing Anomaly" 
//      primaryTypographyProps={{
//                       fontSize: '14px',
//                       textTransform: 'uppercase',
//                      color: '#fff',
//                      fontWeight:'bold'
//                     }}
//     sx={{ opacity: open ? 1 : 0,color: '#000' }} />
//   </ListItemButton>
// </ListItem>
// )}
//               <ListItem disablePadding sx={{ display: 'block'}} onClick={() => navigate("/regionalenergyexpenditure")}>
//                 <ListItemButton
//                   sx={{
//                     minHeight: 48,
//                     justifyContent: open ? 'initial' : 'center',
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 0.2 : 'auto',
//                       justifyContent: 'center',
//                      color: '#fff',
//                     }}
//                   >
//                     <ReportIcon />
//                   </ListItemIcon>
//                   <ListItemText className='S-M-Item' primary="Energy Expenditure" 
//                    primaryTypographyProps={{
//                       fontSize: '14px',
//                       textTransform: 'uppercase',
//                      color: '#fff',
//                      fontWeight:'bold'
//                     }}
//                   sx={{ opacity: open ? 1 : 0,color: '#000' }} />
//                 </ListItemButton>
//               </ListItem>
//             </List>
//           </Box>
//         </Drawer>
//       )}
//       <Box component="main" >
//         <DrawerHeader />
//       </Box>
//     </Box>
//   );
// }

// =================================================================

import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, useMediaQuery, Badge } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import Person from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import NotificationsIcon from '@mui/icons-material/Notifications';
import VerifiedIcon from '@mui/icons-material/Verified';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import ReportIcon from '@mui/icons-material/Report';
import './App.css';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  backgroundImage: `linear-gradient(135deg, #FFA534 0%, #FF8C00 100%)`,
  backgroundSize: 'cover',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: 'transparent',
  backdropFilter: 'blur(10px)',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#FFA534',
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const MenuButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#fff',
  '&:hover': {
    backgroundColor: '#fff',
  },
}));

const BlurAppBar = styled(AppBar)({
  backgroundColor: '#fff',
  backdropFilter: 'blur(10px)',
  boxShadow: 'none',
  boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)',
});

function Sidebar() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Mock user data
  const user = {
    username: 'Admin User',
    role: 'Super Admin',
    ward: 'Head Office'
  };

  // Mock notification counts
  const dueAlertCount = 5;
  const passedDueDateCount = 3;
  const overdueAlertCount = 2;

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleProfileToggle = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const menuItems = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: <HomeIcon />, 
      roles: ['Super Admin', 'Admin', 'Executive Engineer', 'Junior Engineer'] 
    },
    { 
      id: 'role', 
      label: 'Role', 
      icon: <AccessibilityIcon />, 
      roles: ['Super Admin', 'Admin', 'Executive Engineer'] 
    },
    { 
      id: 'users', 
      label: 'User', 
      icon: <Person />, 
      roles: ['Super Admin', 'Admin', 'Executive Engineer'] 
    },
    { 
      id: 'consumer', 
      label: 'Consumer', 
      icon: <Person />, 
      roles: ['Super Admin', 'Admin', 'Executive Engineer', 'Junior Engineer'] 
    },
    { 
      id: 'bills', 
      label: 'Consumer Bills', 
      icon: <PaymentIcon />, 
      roles: ['Super Admin', 'Admin', 'Executive Engineer', 'Junior Engineer'] 
    },
    { 
      id: 'upcoming', 
      label: 'Upcoming Due Bills', 
      icon: <UpcomingIcon />, 
      roles: ['Super Admin', 'Admin', 'Executive Engineer', 'Junior Engineer'],
      badgeCount: dueAlertCount 
    },
    { 
      id: 'overdue', 
      label: 'Overdue Bills', 
      icon: <PaymentIcon />, 
      roles: ['Super Admin', 'Admin', 'Executive Engineer', 'Junior Engineer'],
      badgeCount: passedDueDateCount 
    },
    { 
      id: 'form120', 
      label: 'Form 120 Report', 
      icon: <ReportIcon />, 
      roles: ['Super Admin', 'Admin', 'Executive Engineer', 'Junior Engineer'] 
    },
    { 
      id: 'billing', 
      label: 'Billing Anomaly', 
      icon: <ReportIcon />, 
      roles: ['Super Admin', 'Admin', 'Executive Engineer', 'Junior Engineer'] 
    },
    { 
      id: 'energy', 
      label: 'Energy Expenditure', 
      icon: <ReportIcon />, 
      roles: ['Super Admin', 'Admin', 'Executive Engineer', 'Junior Engineer'] 
    },
  ];

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Welcome to VVCMC Light Bill Management System
            </Typography>
            <Typography variant="body1">
              This is the home page of the Light Bill Management System for Vasai Virar City Municipal Corporation.
            </Typography>
          </Box>
        );
      case 'profile':
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Profile
            </Typography>
            <Typography variant="body1">
              User: {user.username}<br/>
              Role: {user.role}<br/>
              Ward: {user.ward}
            </Typography>
          </Box>
        );
      default:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              {menuItems.find(item => item.id === currentPage)?.label || 'Page'}
            </Typography>
            <Typography variant="body1">
              This is the {menuItems.find(item => item.id === currentPage)?.label || 'selected'} page content.
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: 'white' }}>
      <CssBaseline />
      
      <BlurAppBar position="fixed" open={open} sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        backgroundColor: 'white', 
        height: open ? 'auto' : '16%' 
      }}>
        <Toolbar>
          <MenuButton
            color="#757575"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              marginRight: {
                lg: 5,
                md: 5,
                sm: 5,
                xs: 0
              },
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon sx={{ color: '#475569' }} />
          </MenuButton>
          
          {!open && (
            <Box sx={{ width: '100px', height: '100%', mr: 2, display: isSm && 'none' }}>
              <Box sx={{ width: '60px', height: '60px', backgroundColor: '#FFA534', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
                  VVCMC
                </Typography>
              </Box>
            </Box>
          )}

          <Box sx={{
            width: '100%',
            display: isSm && open ? 'none' : 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: isSm ? 'column' : 'row',
          }}>
            <Box sx={{
              display: 'flex', 
              width: {
                lg: '100%',
                md: '100%',
                sm: '100%',
                xs: '100%'
              }
            }}>
              <Box sx={{
                width: {
                  lg: '59%',
                  xl: '59%',
                  md: '78%',
                  sm: '100%',
                  xs: '100%'
                }
              }}>
                <Typography
                  sx={{
                    color: '#16A34A',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: {
                      xs: 'flex-start',
                      sm: 'flex-start',
                      md: 'flex-start',
                      lg: 'flex-start',
                      xl: 'flex-start'
                    },
                    fontSize: {
                      sm: '20px',
                      xs: '12px',
                      md: '20px',
                      lg: '18px'
                    },
                    width: {
                      sx: '100%',
                    },
                    letterSpacing: '0px',
                    textTransform: 'uppercase'
                  }}
                >
                  Vasai Virar City Municipal Corporation
                </Typography>
                <Typography 
                  sx={{
                    color: '#F8A63F',
                    fontSize: { xs: '11px', sm: '12px', md: '', lg: '', fontWeight: '500' },
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: {
                      xs: 'flex-start',
                      sm: 'flex-start',
                      md: 'flex-start',
                      lg: 'flex-start'
                    }
                  }} 
                  noWrap 
                  component="div"
                >
                  LIGHT BILL MANAGEMENT SYSTEM
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{
              display: {
                xs: 'flex',
                md: 'flex',
                sm: 'flex', 
                lg: 'flex'
              }, 
              alignItems: {
                lg: 'center',
                md: 'center',
                sm: 'center',
                xs: 'center'
              },
              justifyContent: { xs: 'space-between', sm: 'center', md: 'flex-end', lg: 'flex-end' },
              width: {
                xs: '280px',
                sm: '280px',
                md: '280px',
                lg: '280px',
              },
            }}>
              <Box sx={{
                color: '#FB404B',
                alignItems: 'center',
                display: 'flex',
                justifyContent: {
                  lg: 'center',
                  md: 'center',
                  sm: 'space-between',
                  xs: 'flex-start'
                },
                mr: {
                  lg: 2,
                  md: 2,
                },
                fontSize: {
                  sm: '15px',
                  xs: '15px',
                  md: '15px',
                  lg: '15px'
                },
                width: {
                  lg: '800px',
                  xl: '800px',
                  md: '600px',
                  sm: '100%',
                  xs: '100%'
                }
              }}>
                <span style={{ marginRight: '10px' }}>{user?.role}</span>
                <span style={{ fontSize: '15px' }}>{user?.ward}</span>
              </Box>
              <Box>
                <IconButton sx={{ color: '#FB404B' }} onClick={handleLogout}>
                  <PowerSettingsNewIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </BlurAppBar>

      <Drawer style={{ position: 'relative' }} variant="permanent" open={open}>
        {open && (
          <div style={{ 
            position: 'absolute',
            backgroundColor: '#F8A63F',
            width: '100%', 
            height: '100%', 
            opacity: '0.9' 
          }}></div>
        )}
        
        <DrawerHeader>
          {open && (
            <Box sx={{ 
              width: '100%', 
              height: '185px', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              alignContent: 'center' 
            }}>
              <Box sx={{ 
                zIndex: 10, 
                height: '100%', 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                position: 'relative', 
                top: 10 
              }}>
                <Box sx={{ 
                  width: '120px', 
                  height: '120px', 
                  backgroundColor: '#FFA534', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <Typography sx={{ 
                    color: 'white', 
                    fontWeight: 'bold', 
                    fontSize: '16px',
                    textAlign: 'center'
                  }}>
                    VVCMC
                  </Typography>
                </Box>
              </Box>
              <IconButton 
                size="small"  
                sx={{
                  position: 'absolute',
                  top: 50,
                  right: 0,
                  backgroundColor: '#F8A63F',
                  zIndex: theme.zIndex.drawer + 2,
                  '&:hover': {
                    backgroundColor: '#F8A63F',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)',
                    transform: 'translateY(-2px)',
                  },
                }}
                onClick={handleDrawerToggle}
              >
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon sx={{ color: '#fff' }} />}
              </IconButton>
            </Box>
          )}
        </DrawerHeader>
        
        <Box sx={{
          height: '80%',
          overflowX: 'hidden',
          zIndex: 1,
          overflowY: 'scroll', 
          padding: 0.4,
          '&::-webkit-scrollbar': {
            width: '6px !important',
          },
          '&::-webkit-scrollbar-track': {
            background: open ? '#F8A63F' : 'transparent',
            borderRadius: '10px',
            width: '0px !important'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: open ? '#F8A63F' : 'transparent',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: open ? '#FFB65A' : 'transparent',
          },
        }}>
          <List>
            <ListItem disablePadding sx={{ display: open === false && 'block' }}>
              <ListItemText 
                primary={`${user?.username}`} 
                primaryTypographyProps={{
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  color: '#fff',
                  fontWeight: 'bold'
                }}
                sx={{ opacity: open ? 1 : 0, ml: 2.9, color: '#fff' }} 
              />
              <ListItemButton onClick={handleProfileToggle}>
                <ListItemIcon sx={{
                  minWidth: 0,
                  mr: open ? 0 : 'auto',
                  color: open ? '#fff' : '#FFA534',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:focus': {
                    boxShadow: 'none',
                  },
                }}>
                  <ExpandMoreIcon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            
            {profileMenuOpen && (
              <ListItem disablePadding sx={{ display: 'block' }} onClick={() => handleNavigation('profile')}>
                <ListItemButton>
                  <ListItemIcon sx={{
                    minWidth: 0,
                    mr: open ? 0.2 : 'auto',
                    justifyContent: 'center',
                    color: open ? '#fff' : '#FFA534'
                  }}>
                    <AccessibilityIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Profile" 
                    primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      color: '#fff',
                      fontWeight: 'bold'
                    }}
                    sx={{ opacity: open ? 1 : 0, color: '#000' }} 
                  />
                </ListItemButton>
              </ListItem>
            )}

            {menuItems.map((item) => (
              <ListItem key={item.id} disablePadding sx={{ display: 'block' }} onClick={() => handleNavigation(item.id)}>
                <ListItemButton sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                }}>
                  <ListItemIcon sx={{
                    minWidth: 0,
                    mr: open ? 0.2 : 'auto',
                    justifyContent: 'center',
                    color: open ? '#fff' : '#FFA534',
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label} 
                    primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      color: '#fff',
                      fontWeight: 'bold'
                    }}
                    sx={{ opacity: open ? 1 : 0, color: '#fff' }} 
                  />
                  {item.badgeCount && item.badgeCount > 0 && open && (
                    <Badge badgeContent={item.badgeCount} color="primary">
                      <NotificationsIcon sx={{ color: 'white' }} />
                    </Badge>
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {renderContent()}
      </Box>
    </Box>
  );
}

export default Sidebar;

// ==========================================================================================================================
// 17 July 2025
// ---------------------------------------------------

import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, useMediaQuery } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import Person from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import NotificationsIcon from '@mui/icons-material/Notifications';

import VerifiedIcon from '@mui/icons-material/Verified';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import ReportIcon from '@mui/icons-material/Report';

import Badge from '@mui/material/Badge';

import DifferenceIcon from '@mui/icons-material/Difference';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from './store/actions/toggleSidebar';
import { upComingDueBills } from './utils/DueBillHelper';


import './Sidebar.css';
import drawerbg from './Images/sidebarimg.jpg'
import logo from './Images/vvcmclogo.jpg';
import { fetchBills } from './store/actions/billActions';
const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  
  backgroundImage: `url(${drawerbg})`,
  backgroundSize: 'cover',
  
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#FFA534',
  overflowX: 'hidden',
  backgroundImage: `url(${drawerbg})`,
  backgroundSize: 'cover',
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#FFA534',
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
const MenuButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#fff',
  '&:hover': {
    backgroundColor: '#fff',
  },
}));
export default function Sidebar() {
  const notificationCount = 5;
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const open = useSelector((state) => state.sidebar.isOpen);
  const { bills, loading, error } = useSelector((state) => state.bills);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const today = new Date(); 
  
  
const dueAlertrows = upComingDueBills(bills, user);

const dueAlertCount = dueAlertrows.length;

const passedDueDateCount = bills.filter(bill => {
  const dueDate = new Date(bill.dueDate);
  const isOverdue = dueDate < today;
  const isUnpaid = bill.paymentStatus === 'unpaid';
  if (user?.role === 'Junior Engineer') {
    if (user.ward === 'Head Office') {
   
      return isOverdue && isUnpaid;
    } else {
     
      return isOverdue && isUnpaid && user.ward === bill.ward;
    }
  }
  return isOverdue && isUnpaid;
}).length;

const overdueAlertCount = bills.filter(bill => bill.overdueAlert === true).length;

  useEffect(() => {
    dispatch(fetchBills());
  }, [dispatch]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  const handleProfileToggle = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };
  const handleDrawerToggle = () => {
    dispatch(toggleSidebar());
  };
  const handleLogout = () => {
    localStorage.removeItem('resdata');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };


  const BlurAppBar = styled(AppBar)({
    backgroundColor: '#fff',
    backdropFilter: 'blur(10px)',
    boxShadow: 'none',
    boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)',
  });


  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  return (
    <Box sx={{ display: 'flex', backgroundColor: isAuthPage ? 'transparent' : 'white'}} >
      <CssBaseline />

      {!isAuthPage && <BlurAppBar position="fixed" open={open} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: isAuthPage ? 'transparent' : 'white',height: {
      xs: 'auto',   // mobile/small screen: content grow hoil
      sm: 'auto',   // small screen paryant auto
      md:'auto',
      lg:'auto',
      // lg: open ? 'auto' : '16%', // md ani upersathi: 16% jari open=false asel
    }, }} >
        <Toolbar>
          {location.pathname !== '/login' && location.pathname !== '/register' && (
            <MenuButton
              color="#757575"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{
                // marginRight: 5,
                marginRight:{
                  lg:5,
                  md:5,
                  sm:5,
                  xs:0

                },
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon sx={{ color:'#475569'}} />
            </MenuButton>
          )}
          {!open &&
            <Box sx={{ width: '100px', height: '100%', mr: 2, display: isSm && 'none' }}><img src={logo} height='100%' width='100%' /></Box>}

          <Box sx={{
        //  border:'2px solid red',
            width: '100%',
            display: isSm && open ? 'none' : 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: isSm ? 'column' : 'row',
             
          }}
          >
            {location.pathname !== '/login' && location.pathname !== '/register' &&
              <Box sx={{
                display: 'flex', width: {
                  lg: '100%',
                  md: '100%',
                  sm: '100%',
                  xs: '100%'
                }
              }}>
                <Box sx={{
                  width:{
                    lg:'59%',
                    xl:'59%',
                    md:'78%',
                    sm:'100%',
                    xs:'100%'

                  }
                }}>
                  <Typography
                    className='logo-title'
                    sx={{
                       color: location.pathname === '/login' || location.pathname === '/register' ? '#F0F0F0' : '#16A34A',
                      display: 'flex', alignItems: 'center', justifyContent: {
                        xs: 'flex-start',
                        sm: 'flex-start',
                        md:'flex-start',
                        lg:'flex-start',
                        xl:'flex-start'
                        
                      },
                      fontSize: {
                        sm: '20px',
                        xs: '12px',
                        md: '20px',
                        lg: '18px'
                      },
                      width:{
                     sx:'100%',
                     
                      },

                      letterSpacing: location.pathname === '/login' || location.pathname === '/register' ? '1px' : '0px',
                      textTransform: 'uppercase'
                    }}>Vasai Virar City Municipal Corporation</Typography>
                  <Typography 
                  className='title-lightbill'
                  sx={{
                     color: location.pathname === '/login' || location.pathname === '/register' ? '#BB981A' : '#F8A63F',
                    fontSize: { xs: '11px', sm: '12px', md: '', lg: '', fontWeight: '500' },
                    display: 'flex', alignItems: 'center', justifyContent: {
                      xs: 'flex-start',
                      sm: 'flex-start',
                      md: 'flex-start',
                      lg: 'flex-start'
                    }
                  }} noWrap component="div">
                    LIGHT BILL MANAGEMENT SYSTEM
                  </Typography>
                </Box>
              </Box>
            }
            <Box sx={{
              display: {
                xs: 'flex',
                md: 'flex',
                sm: 'flex', lg: 'flex'
              }, alignItems: 
              {
                lg:'center',
                md:'center',
                sm:'center',
                xs:'center'
              },
              justifyContent: { xs: 'space-between', sm: 'center', md: 'flex-end', lg: 'flex-end' },
              width: {
                xs: user?.role === 'Super Admin' ? '100%' : user?.role === 'Executive Engineer' ? '280px' : user?.role === 'Admin' ? '180px' : '260px',
                sm: user?.role === 'Super Admin' ? '100%' : user?.role === 'Executive Engineer' ? '280px' : user?.role === 'Admin' ? '180px' : '260px',
                md: user?.role === 'Super Admin' ? '85%' : user?.role === 'Executive Engineer' ? '280px' : user?.role === 'Admin' ? '180px' : '260px',
                lg: user?.role === 'Super Admin' ? '85%' : user?.role === 'Executive Engineer' ? '280px' : user?.role === 'Admin' ? '180px' : '260px',
              },
            }}>
              <Box
                sx={{
                  color: '#FB404B',
                  alignItems:'center',display:'flex',justifyContent:
                  {
                    lg:'center',
                    md:'center',
                    sm:'space-between',
                    xs:'flex-start'
                  },
                  mr: {
                    lg: 2,
                    md: 2,
                  },
                  fontSize: {
                    sm: '15px',
                    xs: '15px',
                    md: '15px',
                    lg: '15px'
                  },
                  width:{
                    lg:'800px',
                    xl:'800px',
                    md:'600px',
                    sm:'100%',
                    xs:'100%'
                  }
                }}><span style={{marginRight:'10px'}}>{user?.role}</span> {" "}<span style={{fontSize:'15px'}}>{user?.ward}</span> 
              </Box>
              <Box>
                {isAuthenticated ? (
                  <Box>
                      <IconButton sx={{ color: '#FB404B' }} onClick={handleLogout}>
                        <PowerSettingsNewIcon />
                      </IconButton>
                  </Box>
                ) : (
                  <>
                    <Button sx={{ color: location.pathname === '/login' || location.pathname === '/register' ? '#F0F0F0' : '#0d2136' }} onClick={() => navigate("/login")}>Login</Button>
                    <Button sx={{ color: location.pathname === '/login' || location.pathname === '/register' ? '#F0F0F0' : '#0d2136' }} onClick={() => navigate("/register")}>Signup</Button>
                  </>
                )}
              </Box>
            </Box>
          </Box>
          <IconButton sx={{ color: '#0d2136', display: isSm && open ? 'flex' : 'none', }} onClick={handleLogout}>
            <PowerSettingsNewIcon />
          </IconButton>
        </Toolbar>
      </BlurAppBar>}
      {location.pathname !== '/login' && location.pathname !== '/register' && (
        <Drawer style={{ position: 'relative'}} className='drawerst' variant="permanent" open={open}>
          <div style={{ position: 'absolute',
            backgroundColor: '#F8A63F',
            //  backgroundColor:'#475569',
              width: '100%', height: '100%', opacity: '0.9' }}></div>
          <DrawerHeader>
            {open && <Box sx={{ width: '100%', height: '185px', display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
              <Box sx={{ zIndex: 10, height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', top: 10 }} >
                <img src={logo} height="65%" width="60%" className="imglogoopen" sx={{ objectFit: 'contain', borderRadius: '15px' }} />
              </Box>
              <IconButton size="small"  
  sx={{
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: '#F8A63F',
    zIndex: theme.zIndex.drawer + 2,
    '&:hover': {
      backgroundColor: '#F8A63F',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)',
      transform: 'translateY(-2px)',
    },
  }}
   onClick={handleDrawerToggle}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon sx={{ color: '#fff' }} />}
              </IconButton>
            </Box>}
          </DrawerHeader>
          <Box className="custom-scrollbar"
            sx={
              user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer'?
              {
              height: '80%',
              overflowX: 'hidden',
              zIndex: 1,
              overflowY: 'scroll', 
              padding: 0.4,
              '&::-webkit-scrollbar': {
                width: '6px !important',
              },
              '&::-webkit-scrollbar-track': {
                background: '#F8A63F',
                borderRadius: '10px',
                width:'0px !important'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#F8A63F',
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                 backgroundColor: ' #FFB65A',
              },
            }:{}}
          >
            <List>
            {/* *** */}
              <ListItem disablePadding sx={{ display: open===false && 'block',mt:open?1:3 }}>
                <ListItemText className='S-M-Item' primary={`${user?.username}`} 
                 primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                     color: '#fff',
                     fontWeight:'bold'
                    }}
                sx={{ opacity: open ? 1 : 0,ml:2.9,color: '#fff' }} />
                <ListItemButton onClick={handleProfileToggle}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 0 : 'auto',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:focus': {
                        boxShadow: 'none',
                      },
                    }}
                  >
                    <ExpandMoreIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              {profileMenuOpen && (
                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/profile")}>
                  <ListItemButton>
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 0.2 : 'auto',
                        justifyContent: 'center',
                        color: '#fff'
                      }}
                    >
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText className='S-M-Item' primary="Profile" 
                     primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                     color: '#fff',
                     fontWeight:'bold'
                    }}
                    sx={{ opacity: open ? 1 : 0,color: '#000' }} />
                  </ListItemButton>
                </ListItem>
              )}
 {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer') &&(
  <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/")}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 0.2 : 'auto',
                      justifyContent: 'center',
                       color: '#fff',
                    }}
                  >
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText className='S-M-Item' primary="Home" 
                   primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      color: '#fff',
                     fontWeight:'bold'
                    }}
                  sx={{ opacity: open ? 1 : 0,
                   color: '#fff',
                  }} />
                </ListItemButton>
              </ListItem>
 )}
              

              {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/rolemaster")}>
                  <ListItemButton
                    sx={{
                      justifyContent: open ? 'initial' : 'center',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 0.2 : 'auto',
                        justifyContent: 'center',
                         color: '#fff',
                      }}
                    >
                      <AccessibilityIcon />
                    </ListItemIcon>
                    <ListItemText primary="Roles" 
                     primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                     color: '#fff',
                     fontWeight:'bold'
                    }}
                    sx={{ opacity: open ? 1 : 0}} />
                  </ListItemButton>
                </ListItem>
              )}
              {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || 
              (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/users")}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 0.2 : 'auto',
                        justifyContent: 'center',
                         color: '#fff',
                      }}
                    >
                      <ManageAccountsIcon />
                    </ListItemIcon>
                    <ListItemText  primary="Users" 
                     primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                     color: '#fff',
                     fontWeight:'bold'
                    }}
                    sx={{ opacity: open ? 1 : 0,
                     color: '#fff',
                     }} />
                  </ListItemButton>
                </ListItem>
              )}
{(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer'|| user?.role === 'Junior Engineer') && (
                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/consumercomponent")}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 0.2 : 'auto',
                        justifyContent: 'center',
                         color: '#fff',
                      }}
                    >
                      <Person />
                    </ListItemIcon>
                    <ListItemText className='S-M-Item' primary="Consumers" 
                     primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                     color: '#fff',
                     fontWeight:'bold'
                    }}
                    sx={{ opacity: open ? 1 : 0,
                     color: '#fff',
                    }} />
                  </ListItemButton>
                </ListItem>
              )}    
{(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer') && (
<ListItem disablePadding sx={{ display: 'block'}} onClick={() => navigate("/bills")}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 0.2 : 'auto',
                        justifyContent: 'center',
                        color: '#fff',
                      }}
                    >
                      <PaymentIcon />
                    </ListItemIcon>
                    <ListItemText className='S-M-Item' primary="Consumer Bills"
                     primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                     color: '#fff',
                     fontWeight:'bold'
                    }}
                    sx={{ opacity: open ? 1 : 0 ,textAlign:'left',
                     color: '#fff',
                    }} />
                  </ListItemButton>
                </ListItem>
)}

              {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer') && (
                <ListItem disablePadding 
                 primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                     color: '#fff',
                     fontWeight:'bold'
                    }}
                sx={{ display: 'block'}} 
                onClick={() => navigate("/usersupcomingduebills")}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 0.2 : 'auto',
                        justifyContent: 'center',
                         color: '#fff',
                      }}
                    >
                      <UpcomingIcon />
                    </ListItemIcon>
                    <ListItemText className='S-M-Item' primary="Upcoming Due Bills"
                     primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                     color: '#fff',
                     fontWeight:'bold'
                    }}
                    sx={{ opacity: open ? 1 : 0,
                     color: '#fff',
                    }} />
                    {dueAlertCount > 0 && open && (
                      <Badge className='badgeupcomingdue' badgeContent={dueAlertCount} color="primary">
                        <NotificationsIcon sx={{ color: 'white' }} />
                      </Badge>
                    )}
                  </ListItemButton>
                </ListItem>
              )}
{(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer' || (user?.role === 'Junior Engineer' && user.ward=='Head Office')) && (
                <ListItem disablePadding 
                   primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                     color: '#fff',
                     fontWeight:'bold'
                    }}
                sx={{ display: 'block'}} 
                onClick={() => navigate("/overduebills")}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 0.2 : 'auto',
                        justifyContent: 'center',
                         color: '#fff',
                      }}
                    >
                      <PaymentIcon />
                    </ListItemIcon>
                    <ListItemText className='S-M-Item' primary="Overdue Bills"
                    primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                     color: '#fff',
                     fontWeight:'bold'
                    }}
                    sx={{ opacity: open ? 1 : 0,
                     color: '#fff',
                    }} />
                    {passedDueDateCount > 0 && open && (
                      <Badge className='badgeupcomingdue' badgeContent={passedDueDateCount} color="primary">
                        <NotificationsIcon sx={{ color: 'white' }} />
                      </Badge>
                    )}
                  </ListItemButton>
                </ListItem>
              )}
{(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer') 
&&
(
              <ListItem disablePadding sx={{ display: 'block'}} 
               primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                     color: '#fff',
                     fontWeight:'bold'
                    }}
              onClick={() => navigate("/formonetwentynew")}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 0.2 : 'auto',
                      justifyContent: 'center',
                       color: '#fff',
                    }}
                  >
                    <SummarizeIcon/>
                  </ListItemIcon>
                  <ListItemText className='S-M-Item' primary="Form 120 report" 
                   primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                     color: '#fff',
                     fontWeight:'bold'
                    }}
                  sx={{ opacity: open ? 1 : 0,
                   color: '#fff',
                  }} />
                </ListItemButton>
              </ListItem>
)}
{(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer') 
&&
(
  <ListItem disablePadding sx={{ display: 'block'}} 
  
    primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                     color: '#fff',
                     fontWeight:'bold'
                    }}
  onClick={() => navigate("/billinganomaly")}>
  <ListItemButton
    sx={{
      minHeight: 48,
      justifyContent: open ? 'initial' : 'center',
    }}
  >
    <ListItemIcon
      sx={{
        minWidth: 0,
        mr: open ? 0.2 : 'auto',
        justifyContent: 'center',
       color: '#fff',
      }}
    >
      <DifferenceIcon/>
    </ListItemIcon>
    <ListItemText className='S-M-Item' primary="Billing Anomalies" 
     primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                     color: '#fff',
                     fontWeight:'bold'
                    }}
    sx={{ opacity: open ? 1 : 0,color: '#000' }} />
  </ListItemButton>
</ListItem>
)}
              <ListItem disablePadding sx={{ display: 'block'}} onClick={() => navigate("/regionalenergyexpenditure")}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 0.2 : 'auto',
                      justifyContent: 'center',
                     color: '#fff',
                    }}
                  >
                    <ReportIcon />
                  </ListItemIcon>
                  <ListItemText className='S-M-Item' primary="Energy Expenditure" 
                   primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                     color: '#fff',
                     fontWeight:'bold'
                    }}
                  sx={{ opacity: open ? 1 : 0,color: '#000' }} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      )}
      <Box component="main" >
        <DrawerHeader />
      </Box>
    </Box>
  );
}
