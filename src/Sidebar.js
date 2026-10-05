

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

// import DifferenceIcon from '@mui/icons-material/Difference';
// import SummarizeIcon from '@mui/icons-material/Summarize';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

// import { useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleSidebar } from './store/actions/toggleSidebar';
// import { upComingDueBills } from './utils/DueBillHelper';


// import './Sidebar.css';
// import drawerbg from './Images/sidebarimg.jpg'
// import logo from './Images/vvcmclogo.jpg';
// // import sidebarBg from './Images/sidebarBg.png';

// // import sidebarBg from './Images/GlossyBlueNavbar.png';
// import sidebarBg from './Images/IcyPeriwinklesSidebar.png';



// // import navheaderBg from './Images/bannervvcmc.png';

// import navheaderBg from './Images/SubtleWhiteIvoryGNav.png';


// // NEW (3-Oct-2026): navbar header साठी
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Avatar from '@mui/material/Avatar';
// import EngineeringIcon from '@mui/icons-material/Engineering';


// // bannervvcmc.png   // 3-Oct-2026: इथे चुकून राहिलेला text — file compile होत नव्हती म्हणून comment केला

// // NEW (3-Oct-2026): screenshot प्रमाणे menu icons (direct path imports)
// import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// import GroupIcon from '@mui/icons-material/Group';
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
// import ListAltIcon from '@mui/icons-material/ListAlt';
// import EventNoteIcon from '@mui/icons-material/EventNote';
// import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
// import DescriptionIcon from '@mui/icons-material/Description';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import BoltIcon from '@mui/icons-material/Bolt';



// // import { fetchBills } from './store/actions/billActions';  // 3-Oct-2026: खालचा fetchBills useEffect बंद केल्याने import लागत नाही
// const drawerWidth = 240;
// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
  
//   // backgroundImage: `url(${drawerbg})`,
//   // backgroundSize: 'cover',
//   // NEW (3-Oct-2026): sidebarBg.png background
//   backgroundColor: '#FFF4E6',
//   backgroundImage: `url(${sidebarBg})`,
//   backgroundSize: 'cover',
//   backgroundPosition: 'top left',
//   backgroundRepeat: 'no-repeat',
//   overflowX: 'hidden',
// });
// const closedMixin = (theme) => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
//   // backgroundColor: '#FFA534',   // OLD (3-Oct-2026)
//   // backgroundImage: `url(${drawerbg})`,
//   // NEW (3-Oct-2026): बंद sidebar ला सुद्धा तोच background
//   backgroundColor: '#FFF4E6',
//   backgroundImage: `url(${sidebarBg})`,
//   backgroundSize: 'cover',
//   backgroundPosition: 'top left',
//   backgroundRepeat: 'no-repeat',
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



// // NEW (3-Oct-2026): component बाहेर हलवला — एकदाच बनतो, styles अगदी तसेच
// const BlurAppBar = styled(AppBar)({
//   backgroundColor: '#fff',
//   backdropFilter: 'blur(10px)',
//   boxShadow: 'none',
//   boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)',
// });

// export default function Sidebar() {
//   const notificationCount = 5;
//   const theme = useTheme();
//   const isXs = useMediaQuery(theme.breakpoints.down('xs'));
//   const isSm = useMediaQuery(theme.breakpoints.down('sm'));
//   const isMd = useMediaQuery(theme.breakpoints.down('md'));
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
//   const [userMenuAnchor, setUserMenuAnchor] = useState(null); // NEW (3-Oct-2026): header user dropdown
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const open = useSelector((state) => state.sidebar.isOpen);
//   const { bills, loading, error } = useSelector((state) => state.bills);
//   const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
//   const user = useSelector(state => state.auth.user);
//   const today = new Date(); 
  
//   // const dueAlertrows = bills.filter(bill => {
//   //   const dueDate = new Date(bill.dueDate);
//   //   const twoDaysBeforeDue = new Date(dueDate);
//   //   twoDaysBeforeDue.setDate(dueDate.getDate() - 2);
  
//   //   const isDueSoon = today >= twoDaysBeforeDue && today <= dueDate;
//   //   const isUnpaid = bill.paymentStatus === 'unpaid';
  
//   //   if (user?.role === 'Junior Engineer') {
//   //     return isDueSoon && isUnpaid && user?.ward === bill.ward;
//   //   }
//   //   return isDueSoon && isUnpaid;
//   // });
  
//   // const dueAlertCount = dueAlertrows.length;

// // -----------------------------------------------------------
// // const dueAlertrows = bills.filter(bill => {
// //   const dueDate = new Date(bill.dueDate);
// //   dueDate.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

// //   const today = new Date();
// //   today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

// //   // Calculate two days after today
// //   const twoDaysAfter = new Date(today);
// //   twoDaysAfter.setDate(today.getDate() + 2);
// //   twoDaysAfter.setHours(0, 0, 0, 0);

// //   // Check if the due date is between today and two days from now (inclusive)
// //   const isWithinRange = dueDate >= today && dueDate <= twoDaysAfter;

// //   if (user?.role === 'Junior Engineer') {
// //       return isWithinRange && bill.paymentStatus === 'unpaid' && user?.ward === bill?.ward;
// //   }
  
// //   return isWithinRange && bill.paymentStatus === 'unpaid';
// // });

// // const dueAlertCount = dueAlertrows.length;
// // ========================================================
// // const dueAlertrows = bills.filter(bill => {
// //   const dueDate = new Date(bill.dueDate);
// //   dueDate.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

// //   const today = new Date();
// //   today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

// //   // Calculate two days before the due date
// //   const twoDaysBeforeDue = new Date(dueDate);
// //   twoDaysBeforeDue.setDate(dueDate.getDate() - 2);
  
// //   // Check if the bill's due date falls within the range of two days before due date and the due date itself
// //   const isWithinRange = today >= twoDaysBeforeDue && today <= dueDate;

// //   if (user?.role === 'Junior Engineer') {
// //       return isWithinRange && bill.paymentStatus === 'unpaid' && user?.ward === bill?.ward;
// //   }
  
// //   return isWithinRange && bill.paymentStatus === 'unpaid';
// // });
// const dueAlertrows = upComingDueBills(bills, user);

// const dueAlertCount = dueAlertrows.length;






// // --------------------------------------------------------------------

// // const passedDueDateCount = bills.filter(bill => {
// //   const dueDate = new Date(bill?.dueDate); 
// //   return dueDate < today && bill.paymentStatus==='unpaid'
// // }).length;



// const passedDueDateCount = bills.filter(bill => {
//   const dueDate = new Date(bill.dueDate);
//   const isOverdue = dueDate < today;
//   const isUnpaid = bill.paymentStatus === 'unpaid';

//   // if (user?.role === 'Junior Engineer') {
//   //   return isOverdue && isUnpaid && user?.ward === bill.ward;
//   // }
//   if (user?.role === 'Junior Engineer') {
//     if (user.ward === 'Head Office') {
//       // Head Office Junior Engineer - show all wards
//       return isOverdue && isUnpaid;
//     } else {
//       // Other Junior Engineer - show only their ward
//       return isOverdue && isUnpaid && user.ward === bill.ward;
//     }
//   }
//   return isOverdue && isUnpaid;
// }).length;



// const overdueAlertCount = bills.filter(bill => bill.overdueAlert === true).length;

//   // OLD (3-Oct-2026 पर्यंत): App.js सुद्धा mount वर हाच fetchBills() करतो → एकाच वेळी दोन वेळा 10,000 bills.
//   // Sidebar ला लागणारे bills App.js च्या fetch मधूनच Redux मध्ये येतात, म्हणून हे बंद केले.
//   // useEffect(() => {
//   //   dispatch(fetchBills());
//   // }, [dispatch]);

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


//   // OLD (3-Oct-2026 पर्यंत): component च्या आत styled() → प्रत्येक render ला नवीन component बनत होता
//   // आणि पूर्ण AppBar पुन्हा mount होत होता. आता हा Sidebar component च्या वर (बाहेर) आहे — दिसणे अगदी तसेच.
//   // const BlurAppBar = styled(AppBar)({
//   //   backgroundColor: '#fff',
//   //   backdropFilter: 'blur(10px)',
//   //   boxShadow: 'none',
//   //   boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)',
//   // });


//   // ===== NEW (3-Oct-2026): Sidebar menu config — role conditions, paths आणि badge counts
//   // जुन्या JSX मधून अगदी तसेच घेतले आहेत (फक्त UI बदलला) =====
//   const isStaffRole =
//     user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer';
//   const isAdminOrHOJE =
//     user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' ||
//     (user?.role === 'Junior Engineer' && user?.ward === 'Head Office');

//   const sidebarMenuItems = [
//     { label: 'Home',               path: '/',                          icon: <HomeRoundedIcon />, show: isStaffRole },
//     { label: 'Roles',              path: '/rolemaster',                icon: <GroupIcon />,       show: isAdminOrHOJE },
//     { label: 'Users',              path: '/users',                     icon: <PeopleAltIcon />,   show: isAdminOrHOJE },
//     { label: 'Consumers',          path: '/consumercomponent',         icon: <Person />,          show: isStaffRole },
//     { label: 'Consumer Bills',     path: '/bills',                     icon: <ListAltIcon />,     show: isStaffRole },
//     { label: 'Upcoming Due Bills', path: '/usersupcomingduebills',     icon: <EventNoteIcon />,   show: isStaffRole, badge: dueAlertCount },
//     { label: 'Overdue Bills',      path: '/overduebills',              icon: <AccessAlarmIcon />, show: isStaffRole, badge: passedDueDateCount },
//     { label: 'Form 120 Report',    path: '/formonetwentynew',          icon: <DescriptionIcon />, show: isStaffRole },
//     { label: 'Billing Anomalies',  path: '/billinganomaly',            icon: <BarChartIcon />,    show: isStaffRole },
//     { label: 'Energy Expenditure', path: '/regionalenergyexpenditure', icon: <BoltIcon />,        show: true },
//   ];

//   // exact match (उदा. '/users' आणि '/usersupcomingduebills' वेगळे राहावेत)
//   const isMenuActive = (path) =>
//     location.pathname === path || (path !== '/' && location.pathname.startsWith(path + '/'));

//   const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
//   return (
//     <Box sx={{ display: 'flex', backgroundColor: isAuthPage ? 'transparent' : 'white'}} >
//       <CssBaseline />

//       {/* ===== NEW NAVBAR HEADER (3-Oct-2026) — screenshot प्रमाणे: bannervvcmc.png background,
//           गोल logo, हिरवे title, orange subtitle + underline, उजवीकडे role/ward user card.
//           Menu button, title text, role/ward, logout (आता user card च्या dropdown मध्ये),
//           Login/Signup buttons — सगळे पूर्वीसारखेच. जुना AppBar JSX file च्या शेवटी comment आहे. ===== */}
//       {!isAuthPage && (
//         <BlurAppBar
//           position="fixed"
//           open={open}
//           sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             height: 'auto',
//             backgroundColor: '#FFF8F0',
//             backgroundImage: `url(${navheaderBg})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center right',
//             backgroundRepeat: 'no-repeat',
//             borderBottom: '1px solid rgba(240, 138, 0, 0.12)',
//             boxShadow: '0 4px 18px rgba(15, 23, 42, 0.06)',
//           }}
//         >
//           <Toolbar sx={{ minHeight: { xs: 72, md: 92 }, px: { xs: 1.5, md: 3 }, gap: { xs: 1, md: 2 } }}>
//             {/* Drawer उघडण्याचे बटण (पूर्वीसारखे — sidebar बंद असताना) */}
//             <MenuButton
//               color="#757575"
//               aria-label="open drawer"
//               onClick={handleDrawerToggle}
//               edge="start"
//               sx={{
//                 mr: { xs: 0, sm: 1 },
//                 boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
//                 ...(open && { display: 'none' }),
//               }}
//             >
//               <MenuIcon sx={{ color: '#475569' }} />
//             </MenuButton>

//             {/* Logo (गोल) */}
//             {/* <Box
//               sx={{
//                 display: { xs: 'none', sm: 'flex' }, */}
//             {/* Logo (गोल) — 3-Oct-2026: फक्त sidebar बंद (toggle close) असताना दिसतो */}
//             <Box
//               sx={{
//                 // display: { xs: 'none', sm: 'flex' },   // OLD (3-Oct-2026)
//                 display: open ? 'none' : { xs: 'none', sm: 'flex' },
//                 animation: 'logoFadeIn 0.3s ease',
//                 '@keyframes logoFadeIn': {
//                   from: { opacity: 0, transform: 'scale(0.9)' },
//                   to: { opacity: 1, transform: 'scale(1)' },
//                 },


//                 flexShrink: 0,
//                 width: { sm: 60, md: 72 },
//                 height: { sm: 60, md: 72 },
//                 borderRadius: '50%',
//                 backgroundColor: '#fff',
//                 boxShadow: '0 6px 18px rgba(240, 138, 0, 0.18)',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 overflow: 'hidden',
//                 p: '5px',
//               }}
//             >
//               <img src={logo} alt="VVCMC" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
//             </Box>

//             {/* Title + subtitle */}
//             <Box sx={{ minWidth: 0, flex: 1, display: isSm && open ? 'none' : 'block', ml: { sm: 1 } }}>
//               <Typography
//                 className="logo-title"
//                 noWrap
//                 sx={{
//                   color: '#0B7A3B',
//                   fontWeight: 800,
//                   fontSize: { xs: '13px', sm: '17px', md: '20px', lg: '22px', xl: '26px' },
//                   letterSpacing: '0.2px',
//                   lineHeight: 1.2,
//                   textTransform: 'uppercase',
//                 }}
//               >
//                 Vasai Virar City Municipal Corporation
//               </Typography>
//               <Typography
//                 className="title-lightbill"
//                 noWrap
//                 component="div"
//                 sx={{
//                   color: '#F07C00',
//                   fontWeight: 700,
//                   fontSize: { xs: '11px', sm: '13px', md: '15px', lg: '17px', xl: '19px' },
//                   letterSpacing: '0.3px',
//                   lineHeight: 1.3,
//                   mt: 0.3,
//                 }}
//               >
//                 LIGHT BILL MANAGEMENT SYSTEM
//               </Typography>
//               <Box
//                 sx={{
//                   display: { xs: 'none', md: 'block' },
//                   mt: 0.8,
//                   width: 240,
//                   height: 4,
//                   borderRadius: 2,
//                   background: 'linear-gradient(90deg, #F07C00 0%, #F07C00 30%, rgba(240,124,0,0.15) 100%)',
//                 }}
//               />
//             </Box>

//             {/* उजवीकडे: user card (role + ward) → dropdown मध्ये Logout */}
//             {isAuthenticated ? (
//               <>
//                 <Box
//                   role="button"
//                   tabIndex={0}
//                   aria-haspopup="true"
//                   aria-controls={userMenuAnchor ? 'header-user-menu' : undefined}
//                   onClick={(e) => setUserMenuAnchor(e.currentTarget)}
//                   onKeyDown={(e) => {
//                     if (e.key === 'Enter' || e.key === ' ') {
//                       e.preventDefault();
//                       setUserMenuAnchor(e.currentTarget);
//                     }
//                   }}
//                   sx={{
//                     display: isSm && open ? 'none' : 'flex',
//                     alignItems: 'center',
//                     gap: { xs: 1, md: 1.5 },
//                     flexShrink: 0,
//                     ml: 'auto',
//                     px: { xs: 1, md: 1.75 },
//                     py: { xs: 0.75, md: 1 },
//                     borderRadius: '16px',
//                     backgroundColor: 'rgba(255,255,255,0.92)',
//                     backdropFilter: 'blur(6px)',
//                     boxShadow: '0 6px 20px rgba(15, 23, 42, 0.10)',
//                     cursor: 'pointer',
//                     outline: 'none',
//                     transition: 'box-shadow 0.2s ease, transform 0.2s ease',
//                     '&:hover, &:focus-visible': {
//                       boxShadow: '0 8px 24px rgba(240, 138, 0, 0.22)',
//                       transform: 'translateY(-1px)',
//                     },
//                   }}
//                 >
//                   <Avatar
//                     sx={{
//                       width: { xs: 36, md: 44 },
//                       height: { xs: 36, md: 44 },
//                       background: 'linear-gradient(135deg, #FFE7C7 0%, #FFD29A 100%)',
//                     }}
//                   >
//                     <EngineeringIcon sx={{ color: '#E07B00', fontSize: { xs: 22, md: 26 } }} />
//                   </Avatar>
//                   <Box sx={{ minWidth: 0, display: { xs: 'none', sm: 'block' } }}>
//                     <Typography noWrap sx={{ fontSize: { sm: '14px', md: '16px' }, fontWeight: 700, color: '#0F172A', lineHeight: 1.25 }}>
//                       {user?.role}
//                     </Typography>
//                     <Typography noWrap sx={{ fontSize: { sm: '12px', md: '14px' }, color: '#475569', lineHeight: 1.3 }}>
//                       {user?.ward}
//                     </Typography>
//                   </Box>
//                   <ExpandMoreIcon
//                     sx={{
//                       color: '#0F172A',
//                       transition: 'transform 0.2s ease',
//                       transform: userMenuAnchor ? 'rotate(180deg)' : 'none',
//                     }}
//                   />
//                 </Box>

//                 <Menu
//                   id="header-user-menu"
//                   anchorEl={userMenuAnchor}
//                   open={Boolean(userMenuAnchor)}
//                   onClose={() => setUserMenuAnchor(null)}
//                   anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//                   transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//                   PaperProps={{ sx: { mt: 1, borderRadius: '12px', minWidth: 200, boxShadow: '0 10px 30px rgba(15,23,42,0.15)' } }}
//                 >
//                   {/* लहान screen वर card मध्ये role/ward दिसत नाही — इथे दाखवतो */}
//                   <Box sx={{ px: 2, py: 1, display: { xs: 'block', sm: 'none' } }}>
//                     <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>{user?.role}</Typography>
//                     <Typography sx={{ fontSize: '12px', color: '#475569' }}>{user?.ward}</Typography>
//                   </Box>
//                   <MenuItem
//                     onClick={() => {
//                       setUserMenuAnchor(null);
//                       handleLogout();
//                     }}
//                     sx={{ color: '#FB404B', fontWeight: 600, py: 1.2 }}
//                   >
//                     <ListItemIcon sx={{ color: '#FB404B', minWidth: 34 }}>
//                       <PowerSettingsNewIcon fontSize="small" />
//                     </ListItemIcon>
//                     Logout
//                   </MenuItem>
//                 </Menu>
//               </>
//             ) : (
//               <Box sx={{ ml: 'auto' }}>
//                 <Button sx={{ color: '#0d2136' }} onClick={() => navigate("/login")}>Login</Button>
//                 <Button sx={{ color: '#0d2136' }} onClick={() => navigate("/register")}>Signup</Button>
//               </Box>
//             )}

//             {/* लहान screen + sidebar उघडा असताना — पूर्वीसारखे थेट logout बटण */}
//             <IconButton sx={{ color: '#0d2136', display: isSm && open ? 'flex' : 'none', ml: 'auto' }} onClick={handleLogout}>
//               <PowerSettingsNewIcon />
//             </IconButton>
//           </Toolbar>
//         </BlurAppBar>
//       )}
      
      
//       {/* ===== NEW DRAWER UI (3-Oct-2026) — screenshot प्रमाणे: sidebarBg.png background, गोल logo,
//           VVCMC title, गडद text/icons, active item ला orange pill, लाल "99+" badge.
//           Menu items, role conditions, navigate paths, badge counts, profile toggle — सगळे पूर्वीसारखेच.
//           जुना Drawer JSX या file च्या शेवटी comment करून ठेवला आहे. ===== */}
//       {location.pathname !== '/login' && location.pathname !== '/register' && (
//         <Drawer
//           style={{ position: 'relative' }}
//           className='drawerst'
//           variant="permanent"
//           open={open}
//           PaperProps={{
//             sx: {
//               display: 'flex',
//               flexDirection: 'column',
//               borderRight: '1px solid rgba(255,255,255,0.85)',
//               borderTopRightRadius: '22px',
//               borderBottomRightRadius: '22px',
//               boxShadow: '4px 0 24px rgba(255, 138, 0, 0.12)',
//             },
//           }}
//         >
//           {/* ── Header: logo + VVCMC + subtitle + collapse button ── */}
//           <DrawerHeader
//             sx={{
//               position: 'relative',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               flexShrink: 0,
//               pt: open ? 3 : 0,
//               pb: open ? 2 : 0,
//             }}
//           >
//             {open && (
//               <>
//                 <IconButton
//                   size="small"
//                   onClick={handleDrawerToggle}
//                   sx={{
//                     position: 'absolute',
//                     top: 14,
//                     right: 12,
//                     width: 32,
//                     height: 32,
//                     backgroundColor: '#fff',
//                     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
//                     zIndex: theme.zIndex.drawer + 2,
//                     '&:hover': {
//                       backgroundColor: '#fff',
//                       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.18)',
//                     },
//                   }}
//                 >
//                   {theme.direction === 'rtl'
//                     ? <ChevronRightIcon sx={{ color: '#334155', fontSize: 20 }} />
//                     : <ChevronLeftIcon sx={{ color: '#334155', fontSize: 20 }} />}
//                 </IconButton>

//                 <Box
//                   sx={{
//                     width: 84,
//                     height: 84,
//                     borderRadius: '50%',
//                     backgroundColor: '#fff',
//                     boxShadow: '0 6px 18px rgba(0, 0, 0, 0.12)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     overflow: 'hidden',
//                     p: '6px',
//                   }}
//                 >
//                   <img
//                     src={logo}
//                     alt="VVCMC"
//                     style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }}
//                   />
//                 </Box>

//                 <Typography
//                   sx={{
//                     mt: 1.5,
//                     fontSize: '19px',
//                     fontWeight: 800,
//                     color: '#1E293B',
//                     letterSpacing: '0.5px',
//                     lineHeight: 1.2,
//                   }}
//                 >
//                   VVCMC
//                 </Typography>
//                 <Typography sx={{ mt: 0.3, fontSize: '12.5px', fontWeight: 500, color: '#64748B' }}>
//                   Light Bill Management System
//                 </Typography>
//               </>
//             )}
//           </DrawerHeader>

//           {/* ── Menu ── */}
//           <Box
//             className="custom-scrollbar"
//             sx={{
//               flex: 1,
//               overflowX: 'hidden',
//               overflowY: 'auto',
//               zIndex: 1,
//               px: open ? 1 : 0.75,
//               pb: 1,
//               '&::-webkit-scrollbar': { width: '5px !important' },
//               '&::-webkit-scrollbar-track': { background: 'transparent' },
//               '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(255, 138, 0, 0.35)', borderRadius: '10px' },
//               '&::-webkit-scrollbar-thumb:hover': { backgroundColor: 'rgba(255, 138, 0, 0.55)' },
//             }}
//           >
//             {/* बंद sidebar मध्ये वरचा AppBar पहिल्या item ला झाकू नये म्हणून जास्त top padding */}
//             <List sx={{ pt: open ? 1 : 5 }}>
//               {sidebarMenuItems.filter((item) => item.show).map((item) => {
//                 const active = isMenuActive(item.path);
//                 return (
//                   <ListItem
//                     key={item.path}
//                     disablePadding
//                     sx={{ display: 'block', mb: 0.4 }}
//                     onClick={() => navigate(item.path)}
//                   >
//                     <ListItemButton
//                       sx={{
//                         minHeight: 44,
//                         borderRadius: '14px',
//                         px: open ? 1.25 : 1.5,
//                         justifyContent: open ? 'initial' : 'center',
//                         background: active
//                           ? 'linear-gradient(90deg, #FF8A00 0%, #FFA94D 100%)'
//                           : 'transparent',
//                         boxShadow: active ? '0 6px 16px rgba(255, 138, 0, 0.35)' : 'none',
//                         transition: 'background 0.2s ease, box-shadow 0.2s ease',
//                         '&:hover': {
//                           background: active
//                             ? 'linear-gradient(90deg, #FF8A00 0%, #FFA94D 100%)'
//                             : 'rgba(255, 255, 255, 0.6)',
//                         },
//                       }}
//                     >
//                       <ListItemIcon
//                         sx={{
//                           minWidth: 0,
//                           mr: open ? 1.5 : 'auto',
//                           justifyContent: 'center',
//                           color: active ? '#fff' : '#334155',
//                           '& svg': { fontSize: 22 },
//                         }}
//                       >
//                         {item.icon}
//                       </ListItemIcon>
//                       <ListItemText
//                         primary={item.label}
//                         primaryTypographyProps={{
//                           fontSize: '13.5px',
//                           fontWeight: active ? 600 : 500,
//                           color: active ? '#fff' : '#1E293B',
//                           noWrap: true,
//                         }}
//                         sx={{ opacity: open ? 1 : 0, my: 0 }}
//                       />
//                       {item.badge > 0 && open && (
//                         <Box
//                           component="span"
//                           sx={{
//                             ml: 0.5,
//                             minWidth: 28,
//                             height: 21,
//                             px: 0.7,
//                             borderRadius: '11px',
//                             background: 'linear-gradient(180deg, #F87171 0%, #EF4444 100%)',
//                             boxShadow: '0 2px 6px rgba(239, 68, 68, 0.4)',
//                             color: '#fff',
//                             fontSize: '11.5px',
//                             fontWeight: 700,
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             flexShrink: 0,
//                           }}
//                         >
//                           {item.badge > 99 ? '99+' : item.badge}
//                         </Box>
//                       )}
//                     </ListItemButton>
//                   </ListItem>
//                 );
//               })}
//             </List>
//           </Box>

//           {/* ── Footer: username + Profile (पूर्वीचा profile toggle, आता खाली) ── */}
//           <Box sx={{ flexShrink: 0, px: open ? 1.5 : 0.75, pb: 1.5, pt: 0.5, borderTop: '1px solid rgba(255,255,255,0.7)', zIndex: 1 }}>
//             {profileMenuOpen && (
//               <ListItem disablePadding sx={{ display: 'block', mb: 0.5 }} onClick={() => navigate("/profile")}>
//                 <ListItemButton
//                   sx={{
//                     minHeight: 42,
//                     borderRadius: '14px',
//                     px: open ? 2 : 1.5,
//                     justifyContent: open ? 'initial' : 'center',
//                     background: isMenuActive('/profile') ? 'linear-gradient(90deg, #FF8A00 0%, #FFA94D 100%)' : 'transparent',
//                     '&:hover': { background: isMenuActive('/profile') ? 'linear-gradient(90deg, #FF8A00 0%, #FFA94D 100%)' : 'rgba(255,255,255,0.6)' },
//                   }}
//                 >
//                   <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center', color: isMenuActive('/profile') ? '#fff' : '#334155' }}>
//                     <AccountCircleIcon />
//                   </ListItemIcon>
//                   <ListItemText
//                     primary="Profile"
//                     primaryTypographyProps={{ fontSize: '14px', fontWeight: 500, color: isMenuActive('/profile') ? '#fff' : '#1E293B' }}
//                     sx={{ opacity: open ? 1 : 0, my: 0 }}
//                   />
//                 </ListItemButton>
//               </ListItem>
//             )}
//             <ListItem disablePadding sx={{ display: 'block' }}>
//               <ListItemButton
//                 onClick={handleProfileToggle}
//                 sx={{
//                   minHeight: 42,
//                   borderRadius: '14px',
//                   px: open ? 2 : 1.5,
//                   justifyContent: open ? 'initial' : 'center',
//                   '&:hover': { background: 'rgba(255,255,255,0.6)' },
//                 }}
//               >
//                 <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center', color: '#334155' }}>
//                   <Person />
//                 </ListItemIcon>
//                 <ListItemText
//                   primary={`${user?.username}`}
//                   primaryTypographyProps={{ fontSize: '14px', fontWeight: 600, color: '#1E293B', noWrap: true }}
//                   sx={{ opacity: open ? 1 : 0, my: 0 }}
//                 />
//                 {open && (
//                   <ExpandMoreIcon
//                     sx={{
//                       color: '#334155',
//                       transition: 'transform 0.2s ease',
//                       transform: profileMenuOpen ? 'rotate(180deg)' : 'none',
//                     }}
//                   />
//                 )}
//               </ListItemButton>
//             </ListItem>
//           </Box>
//         </Drawer>
//       )}
//       <Box component="main" >
//         <DrawerHeader />
//       </Box>
//     </Box>
//   );
// }





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

// import DifferenceIcon from '@mui/icons-material/Difference';
// import SummarizeIcon from '@mui/icons-material/Summarize';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

// import { useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleSidebar } from './store/actions/toggleSidebar';
// import { upComingDueBills } from './utils/DueBillHelper';


// import './Sidebar.css';
// import drawerbg from './Images/sidebarimg.jpg'
// import logo from './Images/vvcmclogo.jpg';
// // import sidebarBg from './Images/sidebarBg.png';

// // import sidebarBg from './Images/GlossyBlueNavbar.png';
// import sidebarBg from './Images/IcyPeriwinklesSidebar.png';



// // import navheaderBg from './Images/bannervvcmc.png';

// import navheaderBg from './Images/SubtleWhiteIvoryGNav.png';


// // NEW (3-Oct-2026): navbar header साठी
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Avatar from '@mui/material/Avatar';
// import EngineeringIcon from '@mui/icons-material/Engineering';


// // bannervvcmc.png   // 3-Oct-2026: इथे चुकून राहिलेला text — file compile होत नव्हती म्हणून comment केला

// // NEW (3-Oct-2026): screenshot प्रमाणे menu icons (direct path imports)
// import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// import GroupIcon from '@mui/icons-material/Group';
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
// import ListAltIcon from '@mui/icons-material/ListAlt';
// import EventNoteIcon from '@mui/icons-material/EventNote';
// import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
// import DescriptionIcon from '@mui/icons-material/Description';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import BoltIcon from '@mui/icons-material/Bolt';



// // import { fetchBills } from './store/actions/billActions';  // 3-Oct-2026: खालचा fetchBills useEffect बंद केल्याने import लागत नाही
// const drawerWidth = 240;

// // NEW (5-Oct-2026): sidebar blue theme — active + hover colors
// const activeGradient = 'linear-gradient(90deg, #3B63F0 0%, #6F94FF 100%)';
// const activeShadow   = '0 8px 18px rgba(59, 99, 240, 0.38)';
// const hoverBg        = 'linear-gradient(90deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.45) 100%)';
// const hoverShadow    = '0 4px 14px rgba(59, 99, 240, 0.20), inset 0 0 0 1px rgba(255,255,255,0.9)';

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
  
//   // backgroundImage: `url(${drawerbg})`,
//   // backgroundSize: 'cover',
//   // NEW (3-Oct-2026): sidebarBg.png background
//   backgroundColor: '#FFF4E6',
//   backgroundImage: `url(${sidebarBg})`,
//   backgroundSize: 'cover',
//   backgroundPosition: 'top left',
//   backgroundRepeat: 'no-repeat',
//   overflowX: 'hidden',
// });
// const closedMixin = (theme) => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
//   // backgroundColor: '#FFA534',   // OLD (3-Oct-2026)
//   // backgroundImage: `url(${drawerbg})`,
//   // NEW (3-Oct-2026): बंद sidebar ला सुद्धा तोच background
//   backgroundColor: '#FFF4E6',
//   backgroundImage: `url(${sidebarBg})`,
//   backgroundSize: 'cover',
//   backgroundPosition: 'top left',
//   backgroundRepeat: 'no-repeat',
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



// // NEW (3-Oct-2026): component बाहेर हलवला — एकदाच बनतो, styles अगदी तसेच
// const BlurAppBar = styled(AppBar)({
//   backgroundColor: '#fff',
//   backdropFilter: 'blur(10px)',
//   boxShadow: 'none',
//   boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)',
// });

// export default function Sidebar() {
//   const notificationCount = 5;
//   const theme = useTheme();
//   const isXs = useMediaQuery(theme.breakpoints.down('xs'));
//   const isSm = useMediaQuery(theme.breakpoints.down('sm'));
//   const isMd = useMediaQuery(theme.breakpoints.down('md'));
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
//   const [userMenuAnchor, setUserMenuAnchor] = useState(null); // NEW (3-Oct-2026): header user dropdown
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const open = useSelector((state) => state.sidebar.isOpen);
//   const { bills, loading, error } = useSelector((state) => state.bills);
//   const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
//   const user = useSelector(state => state.auth.user);
//   const today = new Date(); 
  
//   // const dueAlertrows = bills.filter(bill => {
//   //   const dueDate = new Date(bill.dueDate);
//   //   const twoDaysBeforeDue = new Date(dueDate);
//   //   twoDaysBeforeDue.setDate(dueDate.getDate() - 2);
  
//   //   const isDueSoon = today >= twoDaysBeforeDue && today <= dueDate;
//   //   const isUnpaid = bill.paymentStatus === 'unpaid';
  
//   //   if (user?.role === 'Junior Engineer') {
//   //     return isDueSoon && isUnpaid && user?.ward === bill.ward;
//   //   }
//   //   return isDueSoon && isUnpaid;
//   // });
  
//   // const dueAlertCount = dueAlertrows.length;

// // -----------------------------------------------------------
// // const dueAlertrows = bills.filter(bill => {
// //   const dueDate = new Date(bill.dueDate);
// //   dueDate.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

// //   const today = new Date();
// //   today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

// //   // Calculate two days after today
// //   const twoDaysAfter = new Date(today);
// //   twoDaysAfter.setDate(today.getDate() + 2);
// //   twoDaysAfter.setHours(0, 0, 0, 0);

// //   // Check if the due date is between today and two days from now (inclusive)
// //   const isWithinRange = dueDate >= today && dueDate <= twoDaysAfter;

// //   if (user?.role === 'Junior Engineer') {
// //       return isWithinRange && bill.paymentStatus === 'unpaid' && user?.ward === bill?.ward;
// //   }
  
// //   return isWithinRange && bill.paymentStatus === 'unpaid';
// // });

// // const dueAlertCount = dueAlertrows.length;
// // ========================================================
// // const dueAlertrows = bills.filter(bill => {
// //   const dueDate = new Date(bill.dueDate);
// //   dueDate.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

// //   const today = new Date();
// //   today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

// //   // Calculate two days before the due date
// //   const twoDaysBeforeDue = new Date(dueDate);
// //   twoDaysBeforeDue.setDate(dueDate.getDate() - 2);
  
// //   // Check if the bill's due date falls within the range of two days before due date and the due date itself
// //   const isWithinRange = today >= twoDaysBeforeDue && today <= dueDate;

// //   if (user?.role === 'Junior Engineer') {
// //       return isWithinRange && bill.paymentStatus === 'unpaid' && user?.ward === bill?.ward;
// //   }
  
// //   return isWithinRange && bill.paymentStatus === 'unpaid';
// // });
// const dueAlertrows = upComingDueBills(bills, user);

// const dueAlertCount = dueAlertrows.length;






// // --------------------------------------------------------------------

// // const passedDueDateCount = bills.filter(bill => {
// //   const dueDate = new Date(bill?.dueDate); 
// //   return dueDate < today && bill.paymentStatus==='unpaid'
// // }).length;



// const passedDueDateCount = bills.filter(bill => {
//   const dueDate = new Date(bill.dueDate);
//   const isOverdue = dueDate < today;
//   const isUnpaid = bill.paymentStatus === 'unpaid';

//   // if (user?.role === 'Junior Engineer') {
//   //   return isOverdue && isUnpaid && user?.ward === bill.ward;
//   // }
//   if (user?.role === 'Junior Engineer') {
//     if (user.ward === 'Head Office') {
//       // Head Office Junior Engineer - show all wards
//       return isOverdue && isUnpaid;
//     } else {
//       // Other Junior Engineer - show only their ward
//       return isOverdue && isUnpaid && user.ward === bill.ward;
//     }
//   }
//   return isOverdue && isUnpaid;
// }).length;



// const overdueAlertCount = bills.filter(bill => bill.overdueAlert === true).length;

//   // OLD (3-Oct-2026 पर्यंत): App.js सुद्धा mount वर हाच fetchBills() करतो → एकाच वेळी दोन वेळा 10,000 bills.
//   // Sidebar ला लागणारे bills App.js च्या fetch मधूनच Redux मध्ये येतात, म्हणून हे बंद केले.
//   // useEffect(() => {
//   //   dispatch(fetchBills());
//   // }, [dispatch]);

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


//   // OLD (3-Oct-2026 पर्यंत): component च्या आत styled() → प्रत्येक render ला नवीन component बनत होता
//   // आणि पूर्ण AppBar पुन्हा mount होत होता. आता हा Sidebar component च्या वर (बाहेर) आहे — दिसणे अगदी तसेच.
//   // const BlurAppBar = styled(AppBar)({
//   //   backgroundColor: '#fff',
//   //   backdropFilter: 'blur(10px)',
//   //   boxShadow: 'none',
//   //   boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)',
//   // });


//   // ===== NEW (3-Oct-2026): Sidebar menu config — role conditions, paths आणि badge counts
//   // जुन्या JSX मधून अगदी तसेच घेतले आहेत (फक्त UI बदलला) =====
//   const isStaffRole =
//     user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer';
//   const isAdminOrHOJE =
//     user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' ||
//     (user?.role === 'Junior Engineer' && user?.ward === 'Head Office');

//   const sidebarMenuItems = [
//     { label: 'Home',               path: '/',                          icon: <HomeRoundedIcon />, show: isStaffRole },
//     { label: 'Roles',              path: '/rolemaster',                icon: <GroupIcon />,       show: isAdminOrHOJE },
//     { label: 'Users',              path: '/users',                     icon: <PeopleAltIcon />,   show: isAdminOrHOJE },
//     { label: 'Consumers',          path: '/consumercomponent',         icon: <Person />,          show: isStaffRole },
//     { label: 'Consumer Bills',     path: '/bills',                     icon: <ListAltIcon />,     show: isStaffRole },
//     { label: 'Upcoming Due Bills', path: '/usersupcomingduebills',     icon: <EventNoteIcon />,   show: isStaffRole, badge: dueAlertCount },
//     { label: 'Overdue Bills',      path: '/overduebills',              icon: <AccessAlarmIcon />, show: isStaffRole, badge: passedDueDateCount },
//     { label: 'Form 120 Report',    path: '/formonetwentynew',          icon: <DescriptionIcon />, show: isStaffRole },
//     { label: 'Billing Anomalies',  path: '/billinganomaly',            icon: <BarChartIcon />,    show: isStaffRole },
//     { label: 'Energy Expenditure', path: '/regionalenergyexpenditure', icon: <BoltIcon />,        show: true },
//   ];

//   // exact match (उदा. '/users' आणि '/usersupcomingduebills' वेगळे राहावेत)
//   const isMenuActive = (path) =>
//     location.pathname === path || (path !== '/' && location.pathname.startsWith(path + '/'));

//   const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
//   return (
//     <Box sx={{ display: 'flex', backgroundColor: isAuthPage ? 'transparent' : 'white'}} >
//       <CssBaseline />

//       {/* ===== NEW NAVBAR HEADER (3-Oct-2026) — screenshot प्रमाणे: bannervvcmc.png background,
//           गोल logo, हिरवे title, orange subtitle + underline, उजवीकडे role/ward user card.
//           Menu button, title text, role/ward, logout (आता user card च्या dropdown मध्ये),
//           Login/Signup buttons — सगळे पूर्वीसारखेच. जुना AppBar JSX file च्या शेवटी comment आहे. ===== */}
//       {!isAuthPage && (
//         <BlurAppBar
//           position="fixed"
//           open={open}
//           sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             height: 'auto',
//             backgroundColor: '#FFF8F0',
//             backgroundImage: `url(${navheaderBg})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center right',
//             backgroundRepeat: 'no-repeat',
//             borderBottom: '1px solid rgba(240, 138, 0, 0.12)',
//             boxShadow: '0 4px 18px rgba(15, 23, 42, 0.06)',
//           }}
//         >
//           <Toolbar sx={{ minHeight: { xs: 72, md: 92 }, px: { xs: 1.5, md: 3 }, gap: { xs: 1, md: 2 } }}>
//             {/* Drawer उघडण्याचे बटण (पूर्वीसारखे — sidebar बंद असताना) */}
//             <MenuButton
//               color="#757575"
//               aria-label="open drawer"
//               onClick={handleDrawerToggle}
//               edge="start"
//               sx={{
//                 mr: { xs: 0, sm: 1 },
//                 boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
//                 ...(open && { display: 'none' }),
//               }}
//             >
//               <MenuIcon sx={{ color: '#475569' }} />
//             </MenuButton>

//             {/* Logo (गोल) */}
//             {/* <Box
//               sx={{
//                 display: { xs: 'none', sm: 'flex' }, */}
//             {/* Logo (गोल) — 3-Oct-2026: फक्त sidebar बंद (toggle close) असताना दिसतो */}
//             <Box
//               sx={{
//                 // display: { xs: 'none', sm: 'flex' },   // OLD (3-Oct-2026)
//                 display: open ? 'none' : { xs: 'none', sm: 'flex' },
//                 animation: 'logoFadeIn 0.3s ease',
//                 '@keyframes logoFadeIn': {
//                   from: { opacity: 0, transform: 'scale(0.9)' },
//                   to: { opacity: 1, transform: 'scale(1)' },
//                 },


//                 flexShrink: 0,
//                 width: { sm: 60, md: 72 },
//                 height: { sm: 60, md: 72 },
//                 borderRadius: '50%',
//                 backgroundColor: '#fff',
//                 boxShadow: '0 6px 18px rgba(240, 138, 0, 0.18)',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 overflow: 'hidden',
//                 p: '5px',
//               }}
//             >
//               <img src={logo} alt="VVCMC" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
//             </Box>

//             {/* Title + subtitle */}
//             <Box sx={{ minWidth: 0, flex: 1, display: isSm && open ? 'none' : 'block', ml: { sm: 1 } }}>
//               <Typography
//                 className="logo-title"
//                 noWrap
//                 sx={{
//                   color: '#0B7A3B',
//                   fontWeight: 800,
//                   fontSize: { xs: '13px', sm: '17px', md: '20px', lg: '22px', xl: '26px' },
//                   letterSpacing: '0.2px',
//                   lineHeight: 1.2,
//                   textTransform: 'uppercase',
//                 }}
//               >
//                 Vasai Virar City Municipal Corporation
//               </Typography>
//               <Typography
//                 className="title-lightbill"
//                 noWrap
//                 component="div"
//                 sx={{
//                   // color: '#F07C00',
//                   display: 'inline-block',
// maxWidth: '100%',
// background: 'linear-gradient(90deg, #3B63F0 0%, #6F94FF 100%)',
// WebkitBackgroundClip: 'text',
// backgroundClip: 'text',
// WebkitTextFillColor: 'transparent',
//                   fontWeight: 700,
//                   fontSize: { xs: '11px', sm: '13px', md: '15px', lg: '17px', xl: '19px' },
//                   letterSpacing: '0.3px',
//                   lineHeight: 1.3,
//                   mt: 0.3,
//                 }}
//               >
//                 LIGHT BILL MANAGEMENT SYSTEM
//               </Typography>
//               <Box
//                 sx={{
//                   display: { xs: 'none', md: 'block' },
//                   mt: 0.8,
//                   width: 240,
//                   height: 4,
//                   borderRadius: 2,
//                   // background: 'linear-gradient(90deg, #F07C00 0%, #F07C00 30%, rgba(240,124,0,0.15) 100%)',
//                   background: 'linear-gradient(90deg, #3B63F0 0%, #6F94FF 45%, rgba(111,148,255,0.15) 100%)',
//                 }}
//               />
//             </Box>

//             {/* उजवीकडे: user card (role + ward) → dropdown मध्ये Logout */}
//             {isAuthenticated ? (
//               <>
//                 <Box
//                   role="button"
//                   tabIndex={0}
//                   aria-haspopup="true"
//                   aria-controls={userMenuAnchor ? 'header-user-menu' : undefined}
//                   onClick={(e) => setUserMenuAnchor(e.currentTarget)}
//                   onKeyDown={(e) => {
//                     if (e.key === 'Enter' || e.key === ' ') {
//                       e.preventDefault();
//                       setUserMenuAnchor(e.currentTarget);
//                     }
//                   }}
//                   sx={{
//                     display: isSm && open ? 'none' : 'flex',
//                     alignItems: 'center',
//                     gap: { xs: 1, md: 1.5 },
//                     flexShrink: 0,
//                     ml: 'auto',
//                     px: { xs: 1, md: 1.75 },
//                     py: { xs: 0.75, md: 1 },
//                     borderRadius: '16px',
//                     backgroundColor: 'rgba(255,255,255,0.92)',
//                     backdropFilter: 'blur(6px)',
//                     boxShadow: '0 6px 20px rgba(15, 23, 42, 0.10)',
//                     cursor: 'pointer',
//                     outline: 'none',
//                     transition: 'box-shadow 0.2s ease, transform 0.2s ease',
//                     '&:hover, &:focus-visible': {
//                       boxShadow: '0 8px 24px rgba(240, 138, 0, 0.22)',
//                       transform: 'translateY(-1px)',
//                     },
//                   }}
//                 >
//                   <Avatar
//                     sx={{
//                       width: { xs: 36, md: 44 },
//                       height: { xs: 36, md: 44 },
//                       background: 'linear-gradient(135deg, #FFE7C7 0%, #FFD29A 100%)',
//                     }}
//                   >
//                     <EngineeringIcon sx={{ color: '#E07B00', fontSize: { xs: 22, md: 26 } }} />
//                   </Avatar>
//                   <Box sx={{ minWidth: 0, display: { xs: 'none', sm: 'block' } }}>
//                     <Typography noWrap sx={{ fontSize: { sm: '14px', md: '16px' }, fontWeight: 700, color: '#0F172A', lineHeight: 1.25 }}>
//                       {user?.role}
//                     </Typography>
//                     <Typography noWrap sx={{ fontSize: { sm: '12px', md: '14px' }, color: '#475569', lineHeight: 1.3 }}>
//                       {user?.ward}
//                     </Typography>
//                   </Box>
//                   <ExpandMoreIcon
//                     sx={{
//                       color: '#0F172A',
//                       transition: 'transform 0.2s ease',
//                       transform: userMenuAnchor ? 'rotate(180deg)' : 'none',
//                     }}
//                   />
//                 </Box>

//                 <Menu
//                   id="header-user-menu"
//                   anchorEl={userMenuAnchor}
//                   open={Boolean(userMenuAnchor)}
//                   onClose={() => setUserMenuAnchor(null)}
//                   anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//                   transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//                   PaperProps={{ sx: { mt: 1, borderRadius: '12px', minWidth: 200, boxShadow: '0 10px 30px rgba(15,23,42,0.15)' } }}
//                 >
//                   {/* लहान screen वर card मध्ये role/ward दिसत नाही — इथे दाखवतो */}
//                   <Box sx={{ px: 2, py: 1, display: { xs: 'block', sm: 'none' } }}>
//                     <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>{user?.role}</Typography>
//                     <Typography sx={{ fontSize: '12px', color: '#475569' }}>{user?.ward}</Typography>
//                   </Box>
//                   <MenuItem
//                     onClick={() => {
//                       setUserMenuAnchor(null);
//                       handleLogout();
//                     }}
//                     sx={{ color: '#FB404B', fontWeight: 600, py: 1.2 }}
//                   >
//                     <ListItemIcon sx={{ color: '#FB404B', minWidth: 34 }}>
//                       <PowerSettingsNewIcon fontSize="small" />
//                     </ListItemIcon>
//                     Logout
//                   </MenuItem>
//                 </Menu>
//               </>
//             ) : (
//               <Box sx={{ ml: 'auto' }}>
//                 <Button sx={{ color: '#0d2136' }} onClick={() => navigate("/login")}>Login</Button>
//                 <Button sx={{ color: '#0d2136' }} onClick={() => navigate("/register")}>Signup</Button>
//               </Box>
//             )}

//             {/* लहान screen + sidebar उघडा असताना — पूर्वीसारखे थेट logout बटण */}
//             <IconButton sx={{ color: '#0d2136', display: isSm && open ? 'flex' : 'none', ml: 'auto' }} onClick={handleLogout}>
//               <PowerSettingsNewIcon />
//             </IconButton>
//           </Toolbar>
//         </BlurAppBar>
//       )}
      
      
//       {/* ===== NEW DRAWER UI (3-Oct-2026) — screenshot प्रमाणे: sidebarBg.png background, गोल logo,
//           VVCMC title, गडद text/icons, active item ला pill, लाल "99+" badge.
//           Menu items, role conditions, navigate paths, badge counts, profile toggle — सगळे पूर्वीसारखेच.
//           5-Oct-2026: active/hover colors blue theme मध्ये बदलले. ===== */}
//       {location.pathname !== '/login' && location.pathname !== '/register' && (
//         <Drawer
//           style={{ position: 'relative' }}
//           className='drawerst'
//           variant="permanent"
//           open={open}
//           PaperProps={{
//             sx: {
//               display: 'flex',
//               flexDirection: 'column',
//               borderRight: '1px solid rgba(255,255,255,0.85)',
//               borderTopRightRadius: '22px',
//               borderBottomRightRadius: '22px',
//               // OLD: boxShadow: '4px 0 24px rgba(255, 138, 0, 0.12)',
//               boxShadow: '4px 0 24px rgba(59, 99, 240, 0.18)', // NEW (5-Oct-2026)
//             },
//           }}
//         >
//           {/* ── Header: logo + VVCMC + subtitle + collapse button ── */}
//           <DrawerHeader
//             sx={{
//               position: 'relative',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               flexShrink: 0,
//               pt: open ? 3 : 0,
//               pb: open ? 2 : 0,
//             }}
//           >
//             {open && (
//               <>
//                 <IconButton
//                   size="small"
//                   onClick={handleDrawerToggle}
//                   sx={{
//                     position: 'absolute',
//                     top: 14,
//                     right: 12,
//                     width: 32,
//                     height: 32,
//                     backgroundColor: '#fff',
//                     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
//                     zIndex: theme.zIndex.drawer + 2,
//                     '&:hover': {
//                       backgroundColor: '#fff',
//                       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.18)',
//                     },
//                   }}
//                 >
//                   {theme.direction === 'rtl'
//                     ? <ChevronRightIcon sx={{ color: '#334155', fontSize: 20 }} />
//                     : <ChevronLeftIcon sx={{ color: '#334155', fontSize: 20 }} />}
//                 </IconButton>

//                 <Box
//                   sx={{
//                     width: 84,
//                     height: 84,
//                     borderRadius: '50%',
//                     backgroundColor: '#fff',
//                     boxShadow: '0 6px 18px rgba(0, 0, 0, 0.12)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     overflow: 'hidden',
//                     p: '6px',
//                   }}
//                 >
//                   <img
//                     src={logo}
//                     alt="VVCMC"
//                     style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }}
//                   />
//                 </Box>

//                 <Typography
//                   sx={{
//                     mt: 1.5,
//                     fontSize: '19px',
//                     fontWeight: 800,
//                     color: '#1E293B',
//                     letterSpacing: '0.5px',
//                     lineHeight: 1.2,
//                   }}
//                 >
//                   VVCMC
//                 </Typography>
//                 <Typography sx={{ mt: 0.3, fontSize: '12.5px', fontWeight: 500, color: '#64748B' }}>
//                   Light Bill Management System
//                 </Typography>
//               </>
//             )}
//           </DrawerHeader>

//           {/* ── Menu ── */}
//           <Box
//             className="custom-scrollbar"
//             sx={{
//               flex: 1,
//               overflowX: 'hidden',
//               overflowY: 'auto',
//               zIndex: 1,
//               px: open ? 1 : 0.75,
//               pb: 1,
//               '&::-webkit-scrollbar': { width: '5px !important' },
//               '&::-webkit-scrollbar-track': { background: 'transparent' },
//               // OLD: rgba(255, 138, 0, 0.35) / 0.55
//               '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(59, 99, 240, 0.35)', borderRadius: '10px' },
//               '&::-webkit-scrollbar-thumb:hover': { backgroundColor: 'rgba(59, 99, 240, 0.55)' },
//             }}
//           >
//             {/* बंद sidebar मध्ये वरचा AppBar पहिल्या item ला झाकू नये म्हणून जास्त top padding */}
//             <List sx={{ pt: open ? 1 : 5 }}>
//               {sidebarMenuItems.filter((item) => item.show).map((item) => {
//                 const active = isMenuActive(item.path);
//                 return (
//                   <ListItem
//                     key={item.path}
//                     disablePadding
//                     sx={{ display: 'block', mb: 0.4 }}
//                     onClick={() => navigate(item.path)}
//                   >
//                     <ListItemButton
//                       sx={{
//                         minHeight: 44,
//                         borderRadius: '14px',
//                         px: open ? 1.25 : 1.5,
//                         justifyContent: open ? 'initial' : 'center',
//                         background: active ? activeGradient : 'transparent',
//                         boxShadow: active ? activeShadow : 'none',
//                         transition: 'all 0.25s ease',
//                         '&:hover': {
//                           background: active ? activeGradient : hoverBg,
//                           boxShadow: active ? activeShadow : hoverShadow,
//                           transform: 'translateX(4px)',
//                         },
//                         '&:hover .MuiListItemIcon-root': {
//                           color: active ? '#fff' : '#3B63F0',
//                         },
//                       }}
//                     >
//                       <ListItemIcon
//                         sx={{
//                           minWidth: 0,
//                           mr: open ? 1.5 : 'auto',
//                           justifyContent: 'center',
//                           color: active ? '#fff' : '#334155',
//                           '& svg': { fontSize: 22 },
//                         }}
//                       >
//                         {item.icon}
//                       </ListItemIcon>
//                       <ListItemText
//                         primary={item.label}
//                         primaryTypographyProps={{
//                           fontSize: '13.5px',
//                           fontWeight: active ? 600 : 500,
//                           color: active ? '#fff' : '#1E293B',
//                           noWrap: true,
//                         }}
//                         sx={{ opacity: open ? 1 : 0, my: 0 }}
//                       />
//                       {item.badge > 0 && open && (
//                         <Box
//                           component="span"
//                           sx={{
//                             ml: 0.5,
//                             minWidth: 28,
//                             height: 21,
//                             px: 0.7,
//                             borderRadius: '11px',
//                             background: 'linear-gradient(180deg, #F87171 0%, #EF4444 100%)',
//                             boxShadow: '0 2px 6px rgba(239, 68, 68, 0.4)',
//                             color: '#fff',
//                             fontSize: '11.5px',
//                             fontWeight: 700,
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             flexShrink: 0,
//                           }}
//                         >
//                           {item.badge > 99 ? '99+' : item.badge}
//                         </Box>
//                       )}
//                     </ListItemButton>
//                   </ListItem>
//                 );
//               })}
//             </List>
//           </Box>

//           {/* ── Footer: username + Profile (पूर्वीचा profile toggle, आता खाली) ── */}
//           <Box sx={{ flexShrink: 0, px: open ? 1.5 : 0.75, pb: 1.5, pt: 0.5, borderTop: '1px solid rgba(255,255,255,0.7)', zIndex: 1 }}>
//             {profileMenuOpen && (
//               <ListItem disablePadding sx={{ display: 'block', mb: 0.5 }} onClick={() => navigate("/profile")}>
//                 <ListItemButton
//                   sx={{
//                     minHeight: 42,
//                     borderRadius: '14px',
//                     px: open ? 2 : 1.5,
//                     justifyContent: open ? 'initial' : 'center',
//                     background: isMenuActive('/profile') ? activeGradient : 'transparent',
//                     boxShadow: isMenuActive('/profile') ? activeShadow : 'none',
//                     transition: 'all 0.25s ease',
//                     '&:hover': {
//                       background: isMenuActive('/profile') ? activeGradient : hoverBg,
//                       boxShadow: isMenuActive('/profile') ? activeShadow : hoverShadow,
//                     },
//                   }}
//                 >
//                   <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center', color: isMenuActive('/profile') ? '#fff' : '#334155' }}>
//                     <AccountCircleIcon />
//                   </ListItemIcon>
//                   <ListItemText
//                     primary="Profile"
//                     primaryTypographyProps={{ fontSize: '14px', fontWeight: 500, color: isMenuActive('/profile') ? '#fff' : '#1E293B' }}
//                     sx={{ opacity: open ? 1 : 0, my: 0 }}
//                   />
//                 </ListItemButton>
//               </ListItem>
//             )}
//             <ListItem disablePadding sx={{ display: 'block' }}>
//               <ListItemButton
//                 onClick={handleProfileToggle}
//                 sx={{
//                   minHeight: 42,
//                   borderRadius: '14px',
//                   px: open ? 2 : 1.5,
//                   justifyContent: open ? 'initial' : 'center',
//                   transition: 'all 0.25s ease',
//                   '&:hover': { background: hoverBg, boxShadow: hoverShadow },
//                 }}
//               >
//                 <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center', color: '#334155' }}>
//                   <Person />
//                 </ListItemIcon>
//                 <ListItemText
//                   primary={`${user?.username}`}
//                   primaryTypographyProps={{ fontSize: '14px', fontWeight: 600, color: '#1E293B', noWrap: true }}
//                   sx={{ opacity: open ? 1 : 0, my: 0 }}
//                 />
//                 {open && (
//                   <ExpandMoreIcon
//                     sx={{
//                       color: '#334155',
//                       transition: 'transform 0.2s ease',
//                       transform: profileMenuOpen ? 'rotate(180deg)' : 'none',
//                     }}
//                   />
//                 )}
//               </ListItemButton>
//             </ListItem>
//           </Box>
//         </Drawer>
//       )}
//       <Box component="main" >
//         <DrawerHeader />
//       </Box>
//     </Box>
//   );
// }



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
// import sidebarBg from './Images/sidebarBg.png';

// import sidebarBg from './Images/GlossyBlueNavbar.png';
import sidebarBg from './Images/IcyPeriwinklesSidebar.png';



// import navheaderBg from './Images/bannervvcmc.png';

import navheaderBg from './Images/SubtleWhiteIvoryGNav.png';
// import billsWatermark from './Images/lightbillsCircular2.png'; // NEW (5-Oct-2026): navbar watermark

import billsWatermark from './Images/lightbillsCircular4.png'; // NEW (5-Oct-2026): navbar watermark



// NEW (3-Oct-2026): navbar header साठी
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import EngineeringIcon from '@mui/icons-material/Engineering';


// bannervvcmc.png   // 3-Oct-2026: इथे चुकून राहिलेला text — file compile होत नव्हती म्हणून comment केला

// NEW (3-Oct-2026): screenshot प्रमाणे menu icons (direct path imports)
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import GroupIcon from '@mui/icons-material/Group';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ListAltIcon from '@mui/icons-material/ListAlt';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import DescriptionIcon from '@mui/icons-material/Description';
import BarChartIcon from '@mui/icons-material/BarChart';
import BoltIcon from '@mui/icons-material/Bolt';



// import { fetchBills } from './store/actions/billActions';  // 3-Oct-2026: खालचा fetchBills useEffect बंद केल्याने import लागत नाही
const drawerWidth = 240;

// NEW (5-Oct-2026): sidebar blue theme — active + hover colors
const activeGradient = 'linear-gradient(90deg, #3B63F0 0%, #6F94FF 100%)';
const activeShadow   = '0 8px 18px rgba(59, 99, 240, 0.38)';
const hoverBg        = 'linear-gradient(90deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.45) 100%)';
const hoverShadow    = '0 4px 14px rgba(59, 99, 240, 0.20), inset 0 0 0 1px rgba(255,255,255,0.9)';

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  
  // backgroundImage: `url(${drawerbg})`,
  // backgroundSize: 'cover',
  // NEW (3-Oct-2026): sidebarBg.png background
  backgroundColor: '#FFF4E6',
  backgroundImage: `url(${sidebarBg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'top left',
  backgroundRepeat: 'no-repeat',
  overflowX: 'hidden',
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  // backgroundColor: '#FFA534',   // OLD (3-Oct-2026)
  // backgroundImage: `url(${drawerbg})`,
  // NEW (3-Oct-2026): बंद sidebar ला सुद्धा तोच background
  backgroundColor: '#FFF4E6',
  backgroundImage: `url(${sidebarBg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'top left',
  backgroundRepeat: 'no-repeat',
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



// NEW (3-Oct-2026): component बाहेर हलवला — एकदाच बनतो, styles अगदी तसेच
const BlurAppBar = styled(AppBar)({
  backgroundColor: '#fff',
  backdropFilter: 'blur(10px)',
  boxShadow: 'none',
  boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)',
});

export default function Sidebar() {
  const notificationCount = 5;
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null); // NEW (3-Oct-2026): header user dropdown
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const open = useSelector((state) => state.sidebar.isOpen);
  const { bills, loading, error } = useSelector((state) => state.bills);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const today = new Date(); 
  
  // const dueAlertrows = bills.filter(bill => {
  //   const dueDate = new Date(bill.dueDate);
  //   const twoDaysBeforeDue = new Date(dueDate);
  //   twoDaysBeforeDue.setDate(dueDate.getDate() - 2);
  
  //   const isDueSoon = today >= twoDaysBeforeDue && today <= dueDate;
  //   const isUnpaid = bill.paymentStatus === 'unpaid';
  
  //   if (user?.role === 'Junior Engineer') {
  //     return isDueSoon && isUnpaid && user?.ward === bill.ward;
  //   }
  //   return isDueSoon && isUnpaid;
  // });
  
  // const dueAlertCount = dueAlertrows.length;

// -----------------------------------------------------------
// const dueAlertrows = bills.filter(bill => {
//   const dueDate = new Date(bill.dueDate);
//   dueDate.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

//   const today = new Date();
//   today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

//   // Calculate two days after today
//   const twoDaysAfter = new Date(today);
//   twoDaysAfter.setDate(today.getDate() + 2);
//   twoDaysAfter.setHours(0, 0, 0, 0);

//   // Check if the due date is between today and two days from now (inclusive)
//   const isWithinRange = dueDate >= today && dueDate <= twoDaysAfter;

//   if (user?.role === 'Junior Engineer') {
//       return isWithinRange && bill.paymentStatus === 'unpaid' && user?.ward === bill?.ward;
//   }
  
//   return isWithinRange && bill.paymentStatus === 'unpaid';
// });

// const dueAlertCount = dueAlertrows.length;
// ========================================================
// const dueAlertrows = bills.filter(bill => {
//   const dueDate = new Date(bill.dueDate);
//   dueDate.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

//   const today = new Date();
//   today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

//   // Calculate two days before the due date
//   const twoDaysBeforeDue = new Date(dueDate);
//   twoDaysBeforeDue.setDate(dueDate.getDate() - 2);
  
//   // Check if the bill's due date falls within the range of two days before due date and the due date itself
//   const isWithinRange = today >= twoDaysBeforeDue && today <= dueDate;

//   if (user?.role === 'Junior Engineer') {
//       return isWithinRange && bill.paymentStatus === 'unpaid' && user?.ward === bill?.ward;
//   }
  
//   return isWithinRange && bill.paymentStatus === 'unpaid';
// });
const dueAlertrows = upComingDueBills(bills, user);

const dueAlertCount = dueAlertrows.length;






// --------------------------------------------------------------------

// const passedDueDateCount = bills.filter(bill => {
//   const dueDate = new Date(bill?.dueDate); 
//   return dueDate < today && bill.paymentStatus==='unpaid'
// }).length;



const passedDueDateCount = bills.filter(bill => {
  const dueDate = new Date(bill.dueDate);
  const isOverdue = dueDate < today;
  const isUnpaid = bill.paymentStatus === 'unpaid';

  // if (user?.role === 'Junior Engineer') {
  //   return isOverdue && isUnpaid && user?.ward === bill.ward;
  // }
  if (user?.role === 'Junior Engineer') {
    if (user.ward === 'Head Office') {
      // Head Office Junior Engineer - show all wards
      return isOverdue && isUnpaid;
    } else {
      // Other Junior Engineer - show only their ward
      return isOverdue && isUnpaid && user.ward === bill.ward;
    }
  }
  return isOverdue && isUnpaid;
}).length;



const overdueAlertCount = bills.filter(bill => bill.overdueAlert === true).length;

  // OLD (3-Oct-2026 पर्यंत): App.js सुद्धा mount वर हाच fetchBills() करतो → एकाच वेळी दोन वेळा 10,000 bills.
  // Sidebar ला लागणारे bills App.js च्या fetch मधूनच Redux मध्ये येतात, म्हणून हे बंद केले.
  // useEffect(() => {
  //   dispatch(fetchBills());
  // }, [dispatch]);

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


  // OLD (3-Oct-2026 पर्यंत): component च्या आत styled() → प्रत्येक render ला नवीन component बनत होता
  // आणि पूर्ण AppBar पुन्हा mount होत होता. आता हा Sidebar component च्या वर (बाहेर) आहे — दिसणे अगदी तसेच.
  // const BlurAppBar = styled(AppBar)({
  //   backgroundColor: '#fff',
  //   backdropFilter: 'blur(10px)',
  //   boxShadow: 'none',
  //   boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)',
  // });


  // ===== NEW (3-Oct-2026): Sidebar menu config — role conditions, paths आणि badge counts
  // जुन्या JSX मधून अगदी तसेच घेतले आहेत (फक्त UI बदलला) =====
  const isStaffRole =
    user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer';
  const isAdminOrHOJE =
    user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' ||
    (user?.role === 'Junior Engineer' && user?.ward === 'Head Office');

  const sidebarMenuItems = [
    { label: 'Home',               path: '/',                          icon: <HomeRoundedIcon />, show: isStaffRole },
    { label: 'Roles',              path: '/rolemaster',                icon: <GroupIcon />,       show: isAdminOrHOJE },
    { label: 'Users',              path: '/users',                     icon: <PeopleAltIcon />,   show: isAdminOrHOJE },
    { label: 'Consumers',          path: '/consumercomponent',         icon: <Person />,          show: isStaffRole },
    { label: 'Consumer Bills',     path: '/bills',                     icon: <ListAltIcon />,     show: isStaffRole },
    { label: 'Upcoming Due Bills', path: '/usersupcomingduebills',     icon: <EventNoteIcon />,   show: isStaffRole, badge: dueAlertCount },
    { label: 'Overdue Bills',      path: '/overduebills',              icon: <AccessAlarmIcon />, show: isStaffRole, badge: passedDueDateCount },
    { label: 'Form 120 Report',    path: '/formonetwentynew',          icon: <DescriptionIcon />, show: isStaffRole },
    { label: 'Billing Anomalies',  path: '/billinganomaly',            icon: <BarChartIcon />,    show: isStaffRole },
    { label: 'Energy Expenditure', path: '/regionalenergyexpenditure', icon: <BoltIcon />,        show: true },
  ];

  // exact match (उदा. '/users' आणि '/usersupcomingduebills' वेगळे राहावेत)
  const isMenuActive = (path) =>
    location.pathname === path || (path !== '/' && location.pathname.startsWith(path + '/'));

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  return (
    <Box sx={{ display: 'flex', backgroundColor: isAuthPage ? 'transparent' : 'white'}} >
      <CssBaseline />

      {/* ===== NEW NAVBAR HEADER (3-Oct-2026) — screenshot प्रमाणे: bannervvcmc.png background,
          गोल logo, हिरवे title, orange subtitle + underline, उजवीकडे role/ward user card.
          Menu button, title text, role/ward, logout (आता user card च्या dropdown मध्ये),
          Login/Signup buttons — सगळे पूर्वीसारखेच. जुना AppBar JSX file च्या शेवटी comment आहे. ===== */}
      {!isAuthPage && (
        <BlurAppBar
          position="fixed"
          open={open}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            height: 'auto',
            backgroundColor: '#FFF8F0',
            backgroundImage: `url(${navheaderBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            backgroundRepeat: 'no-repeat',
            borderBottom: '1px solid rgba(240, 138, 0, 0.12)',
            boxShadow: '0 4px 18px rgba(15, 23, 42, 0.06)',
          }}
        >
          {/* NEW (5-Oct-2026): light bills watermark — title ani user card chya madhe */}
          <Box
            component="img"
            src={billsWatermark}
            alt=""
            aria-hidden="true"
            sx={{
              display: { xs: 'none', lg: 'block' },
              position: 'absolute',
              top: '50%',
              left: '65%',
              transform: 'translate(-50%, -50%)',
              // width: 120,
              // height: 120,
              // objectFit: 'contain',
              // opacity: 0.2,


                            width: 220,
              height: 120,
              objectFit: 'contain',
              opacity: 0.45,
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 0,
            }}
          />
          <Toolbar sx={{ position: 'relative', zIndex: 1, minHeight: { xs: 72, md: 92 }, px: { xs: 1.5, md: 3 }, gap: { xs: 1, md: 2 } }}>
            {/* Drawer उघडण्याचे बटण (पूर्वीसारखे — sidebar बंद असताना) */}
            <MenuButton
              color="#757575"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{
                mr: { xs: 0, sm: 1 },
                boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon sx={{ color: '#475569' }} />
            </MenuButton>

            {/* Logo (गोल) */}
            {/* <Box
              sx={{
                display: { xs: 'none', sm: 'flex' }, */}
            {/* Logo (गोल) — 3-Oct-2026: फक्त sidebar बंद (toggle close) असताना दिसतो */}
            <Box
              sx={{
                // display: { xs: 'none', sm: 'flex' },   // OLD (3-Oct-2026)
                display: open ? 'none' : { xs: 'none', sm: 'flex' },
                animation: 'logoFadeIn 0.3s ease',
                '@keyframes logoFadeIn': {
                  from: { opacity: 0, transform: 'scale(0.9)' },
                  to: { opacity: 1, transform: 'scale(1)' },
                },


                flexShrink: 0,
                width: { sm: 60, md: 72 },
                height: { sm: 60, md: 72 },
                borderRadius: '50%',
                backgroundColor: '#fff',
                boxShadow: '0 6px 18px rgba(240, 138, 0, 0.18)',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                p: '5px',
              }}
            >
              <img src={logo} alt="VVCMC" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
            </Box>

            {/* Title + subtitle */}
            <Box sx={{ minWidth: 0, flex: 1, display: isSm && open ? 'none' : 'block', ml: { sm: 1 } }}>
              <Typography
                className="logo-title"
                noWrap
                sx={{
                  // color: '#0B7A3B',
                  color: '#E07B00',
                  fontWeight: 800,
                  fontSize: { xs: '13px', sm: '17px', md: '20px', lg: '22px', xl: '26px' },
                  letterSpacing: '0.2px',
                  lineHeight: 1.2,
                  textTransform: 'uppercase',
                }}
              >
                Vasai Virar City Municipal Corporation
              </Typography>
              <Typography
                className="title-lightbill"
                noWrap
                component="div"
                sx={{
                  // color: '#F07C00',
                  display: 'inline-block',
                  maxWidth: '100%',
                  background: 'linear-gradient(90deg, #3B63F0 0%, #6F94FF 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 700,
                  fontSize: { xs: '11px', sm: '13px', md: '15px', lg: '17px', xl: '19px' },
                  letterSpacing: '0.3px',
                  lineHeight: 1.3,
                  mt: 0.3,
                }}
              >
                LIGHT BILL MANAGEMENT SYSTEM
              </Typography>
              <Box
                sx={{
                  display: { xs: 'none', md: 'block' },
                  mt: 0.8,
                  width: 240,
                  height: 4,
                  borderRadius: 2,
                  // background: 'linear-gradient(90deg, #F07C00 0%, #F07C00 30%, rgba(240,124,0,0.15) 100%)',
                  background: 'linear-gradient(90deg, #3B63F0 0%, #6F94FF 45%, rgba(111,148,255,0.15) 100%)',
                }}
              />
            </Box>

            {/* उजवीकडे: user card (role + ward) → dropdown मध्ये Logout */}
            {isAuthenticated ? (
              <>
                <Box
                  role="button"
                  tabIndex={0}
                  aria-haspopup="true"
                  aria-controls={userMenuAnchor ? 'header-user-menu' : undefined}
                  onClick={(e) => setUserMenuAnchor(e.currentTarget)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setUserMenuAnchor(e.currentTarget);
                    }
                  }}
                  sx={{
                    display: isSm && open ? 'none' : 'flex',
                    alignItems: 'center',
                    gap: { xs: 1, md: 1.5 },
                    flexShrink: 0,
                    ml: 'auto',
                    px: { xs: 1, md: 1.75 },
                    py: { xs: 0.75, md: 1 },
                    borderRadius: '16px',
                    backgroundColor: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(6px)',
                    boxShadow: '0 6px 20px rgba(15, 23, 42, 0.10)',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                    '&:hover, &:focus-visible': {
                      boxShadow: '0 8px 24px rgba(240, 138, 0, 0.22)',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: { xs: 36, md: 44 },
                      height: { xs: 36, md: 44 },
                      background: 'linear-gradient(135deg, #FFE7C7 0%, #FFD29A 100%)',
                    }}
                  >
                    <EngineeringIcon sx={{ color: '#E07B00', fontSize: { xs: 22, md: 26 } }} />
                  </Avatar>
                  <Box sx={{ minWidth: 0, display: { xs: 'none', sm: 'block' } }}>
                    <Typography noWrap sx={{ fontSize: { sm: '14px', md: '16px' }, fontWeight: 700, color: '#0F172A', lineHeight: 1.25 }}>
                      {user?.role}
                    </Typography>
                    <Typography noWrap sx={{ fontSize: { sm: '12px', md: '14px' }, color: '#475569', lineHeight: 1.3 }}>
                      {user?.ward}
                    </Typography>
                  </Box>
                  <ExpandMoreIcon
                    sx={{
                      color: '#0F172A',
                      transition: 'transform 0.2s ease',
                      transform: userMenuAnchor ? 'rotate(180deg)' : 'none',
                    }}
                  />
                </Box>

                <Menu
                  id="header-user-menu"
                  anchorEl={userMenuAnchor}
                  open={Boolean(userMenuAnchor)}
                  onClose={() => setUserMenuAnchor(null)}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  PaperProps={{ sx: { mt: 1, borderRadius: '12px', minWidth: 200, boxShadow: '0 10px 30px rgba(15,23,42,0.15)' } }}
                >
                  {/* लहान screen वर card मध्ये role/ward दिसत नाही — इथे दाखवतो */}
                  <Box sx={{ px: 2, py: 1, display: { xs: 'block', sm: 'none' } }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>{user?.role}</Typography>
                    <Typography sx={{ fontSize: '12px', color: '#475569' }}>{user?.ward}</Typography>
                  </Box>
                  <MenuItem
                    onClick={() => {
                      setUserMenuAnchor(null);
                      handleLogout();
                    }}
                    sx={{ color: '#FB404B', fontWeight: 600, py: 1.2 }}
                  >
                    <ListItemIcon sx={{ color: '#FB404B', minWidth: 34 }}>
                      <PowerSettingsNewIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ ml: 'auto' }}>
                <Button sx={{ color: '#0d2136' }} onClick={() => navigate("/login")}>Login</Button>
                <Button sx={{ color: '#0d2136' }} onClick={() => navigate("/register")}>Signup</Button>
              </Box>
            )}

            {/* लहान screen + sidebar उघडा असताना — पूर्वीसारखे थेट logout बटण */}
            <IconButton sx={{ color: '#0d2136', display: isSm && open ? 'flex' : 'none', ml: 'auto' }} onClick={handleLogout}>
              <PowerSettingsNewIcon />
            </IconButton>
          </Toolbar>
        </BlurAppBar>
      )}
      
      
      {/* ===== NEW DRAWER UI (3-Oct-2026) — screenshot प्रमाणे: sidebarBg.png background, गोल logo,
          VVCMC title, गडद text/icons, active item ला pill, लाल "99+" badge.
          Menu items, role conditions, navigate paths, badge counts, profile toggle — सगळे पूर्वीसारखेच.
          5-Oct-2026: active/hover colors blue theme मध्ये बदलले. ===== */}
      {location.pathname !== '/login' && location.pathname !== '/register' && (
        <Drawer
          style={{ position: 'relative' }}
          className='drawerst'
          variant="permanent"
          open={open}
          PaperProps={{
            sx: {
              display: 'flex',
              flexDirection: 'column',
              borderRight: '1px solid rgba(255,255,255,0.85)',
              borderTopRightRadius: '22px',
              borderBottomRightRadius: '22px',
              // OLD: boxShadow: '4px 0 24px rgba(255, 138, 0, 0.12)',
              boxShadow: '4px 0 24px rgba(59, 99, 240, 0.18)', // NEW (5-Oct-2026)
            },
          }}
        >
          {/* ── Header: logo + VVCMC + subtitle + collapse button ── */}
          <DrawerHeader
            sx={{
              position: 'relative',
              flexDirection: 'column',
              justifyContent: 'center',
              flexShrink: 0,
              pt: open ? 3 : 0,
              pb: open ? 2 : 0,
            }}
          >
            {open && (
              <>
                <IconButton
                  size="small"
                  onClick={handleDrawerToggle}
                  sx={{
                    position: 'absolute',
                    top: 14,
                    right: 12,
                    width: 32,
                    height: 32,
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
                    zIndex: theme.zIndex.drawer + 2,
                    '&:hover': {
                      backgroundColor: '#fff',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.18)',
                    },
                  }}
                >
                  {theme.direction === 'rtl'
                    ? <ChevronRightIcon sx={{ color: '#334155', fontSize: 20 }} />
                    : <ChevronLeftIcon sx={{ color: '#334155', fontSize: 20 }} />}
                </IconButton>

                <Box
                  sx={{
                    width: 84,
                    height: 84,
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    p: '6px',
                  }}
                >
                  <img
                    src={logo}
                    alt="VVCMC"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }}
                  />
                </Box>

                <Typography
                  sx={{
                    mt: 1.5,
                    fontSize: '19px',
                    fontWeight: 800,
                    color: '#1E293B',
                    letterSpacing: '0.5px',
                    lineHeight: 1.2,
                  }}
                >
                  VVCMC
                </Typography>
                <Typography sx={{ mt: 0.3, fontSize: '12.5px', fontWeight: 500, color: '#64748B' }}>
                  Light Bill Management System
                </Typography>
              </>
            )}
          </DrawerHeader>

          {/* ── Menu ── */}
          <Box
            className="custom-scrollbar"
            sx={{
              flex: 1,
              overflowX: 'hidden',
              overflowY: 'auto',
              zIndex: 1,
              px: open ? 1 : 0.75,
              pb: 1,
              '&::-webkit-scrollbar': { width: '5px !important' },
              '&::-webkit-scrollbar-track': { background: 'transparent' },
              // OLD: rgba(255, 138, 0, 0.35) / 0.55
              '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(59, 99, 240, 0.35)', borderRadius: '10px' },
              '&::-webkit-scrollbar-thumb:hover': { backgroundColor: 'rgba(59, 99, 240, 0.55)' },
            }}
          >
            {/* बंद sidebar मध्ये वरचा AppBar पहिल्या item ला झाकू नये म्हणून जास्त top padding */}
            <List sx={{ pt: open ? 1 : 5 }}>
              {sidebarMenuItems.filter((item) => item.show).map((item) => {
                const active = isMenuActive(item.path);
                return (
                  <ListItem
                    key={item.path}
                    disablePadding
                    sx={{ display: 'block', mb: 0.4 }}
                    onClick={() => navigate(item.path)}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 44,
                        borderRadius: '14px',
                        px: open ? 1.25 : 1.5,
                        justifyContent: open ? 'initial' : 'center',
                        background: active ? activeGradient : 'transparent',
                        boxShadow: active ? activeShadow : 'none',
                        transition: 'all 0.25s ease',
                        '&:hover': {
                          background: active ? activeGradient : hoverBg,
                          boxShadow: active ? activeShadow : hoverShadow,
                          transform: 'translateX(4px)',
                        },
                        '&:hover .MuiListItemIcon-root': {
                          color: active ? '#fff' : '#3B63F0',
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 1.5 : 'auto',
                          justifyContent: 'center',
                          color: active ? '#fff' : '#334155',
                          '& svg': { fontSize: 22 },
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: '13.5px',
                          fontWeight: active ? 600 : 500,
                          color: active ? '#fff' : '#1E293B',
                          noWrap: true,
                        }}
                        sx={{ opacity: open ? 1 : 0, my: 0 }}
                      />
                      {item.badge > 0 && open && (
                        <Box
                          component="span"
                          sx={{
                            ml: 0.5,
                            minWidth: 28,
                            height: 21,
                            px: 0.7,
                            borderRadius: '11px',
                            background: 'linear-gradient(180deg, #F87171 0%, #EF4444 100%)',
                            boxShadow: '0 2px 6px rgba(239, 68, 68, 0.4)',
                            color: '#fff',
                            fontSize: '11.5px',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {item.badge > 99 ? '99+' : item.badge}
                        </Box>
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {/* ── Footer: username + Profile (पूर्वीचा profile toggle, आता खाली) ── */}
          <Box sx={{ flexShrink: 0, px: open ? 1.5 : 0.75, pb: 1.5, pt: 0.5, borderTop: '1px solid rgba(255,255,255,0.7)', zIndex: 1 }}>
            {profileMenuOpen && (
              <ListItem disablePadding sx={{ display: 'block', mb: 0.5 }} onClick={() => navigate("/profile")}>
                <ListItemButton
                  sx={{
                    minHeight: 42,
                    borderRadius: '14px',
                    px: open ? 2 : 1.5,
                    justifyContent: open ? 'initial' : 'center',
                    background: isMenuActive('/profile') ? activeGradient : 'transparent',
                    boxShadow: isMenuActive('/profile') ? activeShadow : 'none',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      background: isMenuActive('/profile') ? activeGradient : hoverBg,
                      boxShadow: isMenuActive('/profile') ? activeShadow : hoverShadow,
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center', color: isMenuActive('/profile') ? '#fff' : '#334155' }}>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Profile"
                    primaryTypographyProps={{ fontSize: '14px', fontWeight: 500, color: isMenuActive('/profile') ? '#fff' : '#1E293B' }}
                    sx={{ opacity: open ? 1 : 0, my: 0 }}
                  />
                </ListItemButton>
              </ListItem>
            )}
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={handleProfileToggle}
                sx={{
                  minHeight: 42,
                  borderRadius: '14px',
                  px: open ? 2 : 1.5,
                  justifyContent: open ? 'initial' : 'center',
                  transition: 'all 0.25s ease',
                  '&:hover': { background: hoverBg, boxShadow: hoverShadow },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center', color: '#334155' }}>
                  <Person />
                </ListItemIcon>
                <ListItemText
                  primary={`${user?.username}`}
                  primaryTypographyProps={{ fontSize: '14px', fontWeight: 600, color: '#1E293B', noWrap: true }}
                  sx={{ opacity: open ? 1 : 0, my: 0 }}
                />
                {open && (
                  <ExpandMoreIcon
                    sx={{
                      color: '#334155',
                      transition: 'transform 0.2s ease',
                      transform: profileMenuOpen ? 'rotate(180deg)' : 'none',
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          </Box>
        </Drawer>
      )}
      <Box component="main" >
        <DrawerHeader />
      </Box>
    </Box>
  );
}