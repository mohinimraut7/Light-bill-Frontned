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
                // ****
                // border:'2px solid green',
                display: 'flex', width: {
                  lg: '100%',
                  md: '100%',
                  sm: '100%',
                  xs: '100%'
                }
              }}>
                <Box sx={{
                  
                  // border:'2px solid red',
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
                      // color: location.pathname === '/login' || location.pathname === '/register' ? '#F0F0F0' : 'green',
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
                    // color: location.pathname === '/login' || location.pathname === '/register' ? '#BB981A' : '#BB981A',
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
              // border:'2px solid red',
              // width: '100%',
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
                  // border:'1px solid green',
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
        <Drawer style={{ position: 'relative' }} className='drawerst' variant="permanent" open={open}>

          
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
  //             sx={{
  //   backgroundColor: '#475569',
  //   transition: 'all 0.3s ease',
  //   '&:hover': {
  //     backgroundColor: '#475569', // हवे असल्यास रंग बदलू शकता
  //     boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)',
  //     transform: 'translateY(-2px)',
  //   },
  // }}

  sx={{
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: '#F8A63F',
    //  backgroundColor: '#475569',
    zIndex: theme.zIndex.drawer + 2,
    '&:hover': {
      backgroundColor: '#F8A63F',
      //  backgroundColor: '#475569',
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
                // background: '#FDB457',
                background: '#F8A63F',
                  // background: '#475569',
                
                borderRadius: '10px',
                width:'0px !important'
              },
              '&::-webkit-scrollbar-thumb': {
                
                backgroundColor: '#F8A63F',
                // backgroundColor: '#475569',
                //  backgroundColor: ' #85BCE3',
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                 backgroundColor: ' #FFB65A',
                  //backgroundColor: ' #85BCE3',

               
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
                    //  color: '#000',
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
                      // color: '#475569',
                      // color: '#000',
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
                        // color: '#475569'
                        // color: '#000'
                        color: '#fff'
                      }}
                    >
                      <AccessibilityIcon />
                    </ListItemIcon>
                    <ListItemText className='S-M-Item' primary="Profile" 
                     primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                    //  color: '#000',
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
                      // color: '#475569'
                      //  color: '#000'
                       color: '#fff',
                    }}
                  >
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText className='S-M-Item' primary="Home" 
                   primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                    //  color: '#000',
                      color: '#fff',
                     fontWeight:'bold'
                    }}
                  sx={{ opacity: open ? 1 : 0,
                  
                  // color:'#000' 
                   color: '#fff',
                  }} />
                </ListItemButton>
              </ListItem>
 )}
              

              {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/rolemaster")}>
                  <ListItemButton
                    sx={{
                      // minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      // px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 0.2 : 'auto',
                        justifyContent: 'center',
                        // color: '#000'
                         color: '#fff',
                      }}
                    >
                      <AccessibilityIcon />
                    </ListItemIcon>
                    <ListItemText primary="Role" 
                     primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                    //  color: '#000',
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
                      // px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 0.2 : 'auto',
                        justifyContent: 'center',
                      //  color: '#475569',
                        // color: '#000'
                         color: '#fff',
                      }}
                    >
                      <Person />
                    </ListItemIcon>
                    <ListItemText  primary="User" 
                     primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                    //  color: '#000',
                     color: '#fff',
                     fontWeight:'bold'
                    }}
                    sx={{ opacity: open ? 1 : 0,
                    // color: '#000'
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
                      // px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 0.2 : 'auto',
                        justifyContent: 'center',
                        // color: '#475569'
                        // color: '#000'
                         color: '#fff',
                      }}
                    >
                      <Person />
                    </ListItemIcon>
                    <ListItemText className='S-M-Item' primary="Consumer" 
                     primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                    //  color: '#000',
                     color: '#fff',
                     fontWeight:'bold'
                    }}
                    sx={{ opacity: open ? 1 : 0,
                    // color: '#000'
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
                      // px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 0.2 : 'auto',
                        justifyContent: 'center',
                       //  color: '#475569'
                      //  color: '#000'
                        color: '#fff',
                      }}
                    >
                      <PaymentIcon />
                    </ListItemIcon>
                    <ListItemText className='S-M-Item' primary="Consumer Bills"
                     primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                    //  color: '#000',
                     color: '#fff',
                     fontWeight:'bold'
                    }}
                    sx={{ opacity: open ? 1 : 0 ,textAlign:'left',
                    // color: '#000'
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
                    //  color: '#000',
                     color: '#fff',
                     fontWeight:'bold'
                    }}
                 

                sx={{ display: 'block'}} 
                
                onClick={() => navigate("/usersupcomingduebills")}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      // px: 2.5,
                      
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 0.2 : 'auto',
                        justifyContent: 'center',
                        // color: '#475569'
                        // color: '#000'
                         color: '#fff',
                        
                      }}
                    >
                      <UpcomingIcon />
                    </ListItemIcon>
                    <ListItemText className='S-M-Item' primary="Upcoming Due Bills"
                     primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                    //  color: '#000',
                     color: '#fff',
                     fontWeight:'bold'
                    }}
                    sx={{ opacity: open ? 1 : 0,
                    // color: '#000'
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
                    //  color: '#000',
                     color: '#fff',
                     fontWeight:'bold'
                    }}

                sx={{ display: 'block'}} 
                onClick={() => navigate("/overduebills")}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      // px: 2.5,
                      
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 0.2 : 'auto',
                        justifyContent: 'center',
                        // color: '#475569'
                        // color: '#000'
                         color: '#fff',
                      }}
                    >
                      <PaymentIcon />
                    </ListItemIcon>
                    <ListItemText className='S-M-Item' primary="Overdue Bills"
                    primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                    //  color: '#000',
                     color: '#fff',
                     fontWeight:'bold'
                    }}
                    sx={{ opacity: open ? 1 : 0,
                    // color: '#000'
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
{/* -------------------------------------------------------------------------------- */}

              {/* {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer') && (
                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/pendingapprovals")}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      // px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 0.2 : 'auto',
                        justifyContent: 'center',
                        color: '#fff'
                      }}
                    >
                      <VerifiedIcon />
                      
                    </ListItemIcon>
                    <ListItemText primary="Pending Approvals" sx={{ opacity: open ? 1 : 0, color: 'white' }} />
                  </ListItemButton>
                </ListItem>
              )} */}

              {/* --------------------------------------------------- */}

              {/* <ListItem disablePadding sx={{ display: 'block'}} onClick={() => navigate("/specificconsumerbills")}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    // px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 0.2 : 'auto',
                      justifyContent: 'center',
                      color: '#fff'
                    }}
                  >
                    <ReportIcon />
                  </ListItemIcon>
                  <ListItemText primary="Form 120 report" sx={{ opacity: open ? 1 : 0, color: 'white' }} />
                </ListItemButton>
              </ListItem> */}

{(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer') 
&&
(
              <ListItem disablePadding sx={{ display: 'block'}} 
               primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                    //  color: '#000',
                     color: '#fff',
                     fontWeight:'bold'
                    }}
              
              onClick={() => navigate("/formonetwentynew")}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    // px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 0.2 : 'auto',
                      justifyContent: 'center',
                      // color: '#475569'
                      // color: '#000'
                       color: '#fff',
                    }}
                  >
                    <ReportIcon />
                  </ListItemIcon>
                  <ListItemText className='S-M-Item' primary="Form 120 report" 
                   primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                    //  color: '#000',
                     color: '#fff',
                     fontWeight:'bold'
                    }}
                  
                  sx={{ opacity: open ? 1 : 0,
                  // color: '#000'
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
                    //  color: '#000',
                     color: '#fff',
                     fontWeight:'bold'
                    }}
  onClick={() => navigate("/billinganomaly")}>
  <ListItemButton
    sx={{
      minHeight: 48,
      justifyContent: open ? 'initial' : 'center',
      // px: 2.5,
    }}
  >
    <ListItemIcon
      sx={{
        minWidth: 0,
        mr: open ? 0.2 : 'auto',
        justifyContent: 'center',
      //  color: '#475569'
      // color: '#000'
       color: '#fff',
      }}
    >
      <ReportIcon />
    </ListItemIcon>
    <ListItemText className='S-M-Item' primary="Billing Anomaly" 
     primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                    //  color: '#000',
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
                    // px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 0.2 : 'auto',
                      justifyContent: 'center',
                    //  color: '#475569'
                    // color: '#000'
                     color: '#fff',
                    }}
                  >
                    <ReportIcon />
                  </ListItemIcon>
                  <ListItemText className='S-M-Item' primary="Energy Expenditure" 
                   primaryTypographyProps={{
                      fontSize: '14px',
                      textTransform: 'uppercase',
                    //  color: '#000',
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
