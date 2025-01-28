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
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import VerifiedIcon from '@mui/icons-material/Verified';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import ReportIcon from '@mui/icons-material/Report';
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
import Badge from '@mui/material/Badge';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from './store/actions/toggleSidebar';
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

  const dueAlertrows = bills.filter(bill => {
    if (user?.role === 'Junior Engineer') {
      return bill.dueAlert === true && user.ward === bill.ward;
    }
    return bill.dueAlert === true;
  });
  const dueAlertCount = dueAlertrows.length;

  const today = new Date(); 
const passedDueDateCount = bills.filter(bill => {
  const dueDate = new Date(bill.dueDate); 
  return dueDate < today
}).length;
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

      {!isAuthPage && <BlurAppBar position="fixed" open={open} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: isAuthPage ? 'transparent' : 'white', height: open ? 'auto' : '16%' }} >
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
              <MenuIcon sx={{ color: '#F2A23E' }} />
            </MenuButton>
          )}
          {!open &&
            <Box sx={{ width: '100px', height: '100%', mr: 2, display: isSm && 'none' }}><img src={logo} height='100%' width='100%' /></Box>}

          <Box sx={{
         
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
                    lg:'78%',
                    md:'78%',
                    sm:'100%',
                    xs:'100%'

                  }
                }}>
                  <Typography
                    className='logo-title'
                    sx={{
                      color: location.pathname === '/login' || location.pathname === '/register' ? '#F0F0F0' : 'green',
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
                    color: location.pathname === '/login' || location.pathname === '/register' ? '#BB981A' : '#BB981A',
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
              
              width: '100%',
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
                    lg:'135px',
                    md:'135px',
                    sm:'100%',
                    xs:'100%'
                  }
                }}>{user?.role}
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
          <div style={{ position: 'absolute', backgroundColor: '#FFA534', width: '100%', height: '100%', opacity: '0.9' }}></div>
          <DrawerHeader>
            {open && <Box sx={{ width: '100%', height: '185px', display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
              <Box sx={{ zIndex: 10, height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', top: 10 }} >
                <img src={logo} height="65%" width="60%" className="imglogoopen" sx={{ objectFit: 'contain', borderRadius: '15px' }} />
              </Box>
              <IconButton sx={{ backgroundColor: '#F4A43F', width: '10px', height: '10px' }} onClick={handleDrawerToggle}>
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
                background: '#FDB457',
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
              <ListItem disablePadding sx={{ display: open===false && 'block' }}>
                <ListItemText primary={`${user?.username}`} sx={{ opacity: open ? 1 : 0, color: 'white',ml:2.9 }} />
                <ListItemButton onClick={handleProfileToggle}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
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
                      <AccessibilityIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" sx={{ opacity: open ? 1 : 0, color: 'white' }} />
                  </ListItemButton>
                </ListItem>
              )}

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
                      color: '#fff'
                    }}
                  >
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0, color: 'white' }} />
                </ListItemButton>
              </ListItem>

              {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer') && (
                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/rolemaster")}>
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
                      <AccessibilityIcon />
                    </ListItemIcon>
                    <ListItemText primary="Role" sx={{ opacity: open ? 1 : 0, color: 'white' }} />
                  </ListItemButton>
                </ListItem>
              )}
              {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer') && (
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
                        color: '#fff'
                      }}
                    >
                      <Person />
                    </ListItemIcon>
                    <ListItemText primary="User" sx={{ opacity: open ? 1 : 0, color: 'white' }} />
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
                        color: '#fff'
                      }}
                    >
                      <PaymentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Consumer Bills" sx={{ opacity: open ? 1 : 0, color: 'white' ,textAlign:'left'}} />
                  </ListItemButton>
                </ListItem>
)}

             

              {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer') && (
                <ListItem disablePadding sx={{ display: 'block'}} onClick={() => navigate("/usersupcomingduebills")}>
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
                        color: '#fff',
                        
                      }}
                    >
                      <UpcomingIcon />
                    </ListItemIcon>
                    <ListItemText primary="Upcoming Due Bills" sx={{ opacity: open ? 1 : 0, color: 'white'}} />


                    {dueAlertCount > 0 && open && (
                      <Badge className='badgeupcomingdue' badgeContent={dueAlertCount} color="primary">
                        <NotificationsIcon sx={{ color: 'white' }} />
                      </Badge>
                    )}

                  </ListItemButton>
                </ListItem>
              )}

{(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer') && (
                <ListItem disablePadding sx={{ display: 'block'}} onClick={() => navigate("/overduebills")}>
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
                        color: '#fff',
                      }}
                    >
                      <PaymentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Overdue Bills" sx={{ opacity: open ? 1 : 0, color: 'white'}} />


                    {passedDueDateCount > 0 && open && (
                      <Badge className='badgeupcomingdue' badgeContent={passedDueDateCount} color="primary">
                        <NotificationsIcon sx={{ color: 'white' }} />
                      </Badge>
                    )}

                  </ListItemButton>
                </ListItem>
              )}

              {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.role === 'Junior Engineer') && (
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
              )}

              <ListItem disablePadding sx={{ display: 'block'}} onClick={() => navigate("/specificconsumerbills")}>
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
