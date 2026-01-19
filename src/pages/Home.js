

// import React, { useEffect, useState } from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import { Button, useMediaQuery, Box, Grid, Modal } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUsers } from '../store/actions/userActions';
// import { fetchBills, fetchAllBills } from '../store/actions/billActions';
// import { fetchRoles } from '../store/actions/roleActions';
// import { fetchMeters } from '../store/actions/meterActions';
// import { fetchConsumers } from '../store/actions/consumerActions';
// import { getMasters } from '../store/actions/masterActions';
// import InfoCard from '../components/cards/InfoCard';
// import { CircularProgress } from '@mui/material';
// import ChartComponent from '../components/CharComponent'; 
// import './Home.css';
// import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
// import ElectricMeterOutlinedIcon from '@mui/icons-material/ElectricMeterOutlined';
// import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
// import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
// import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
// import SummarizeIcon from '@mui/icons-material/Summarize';
// import UpcomingIcon from '@mui/icons-material/Upcoming';
// import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
// import PaidIcon from '@mui/icons-material/Paid';
// import FactCheckIcon from '@mui/icons-material/FactCheck';

// import PieChartBills from '../components/PieChartBills';
// import Wardnamecount from '../components/table/Wardnamecount';
// import PaidBillCurrentMonth from '../components/table/PaidBillCurrentMonth';
// import PaidBillPreviousMonth from '../components/table/PaidBillPreviousMonth';
// import AverageMetersCurrentMonth from '../components/table/AverageMetersCurrentMonth';
// import FaultyMetersCurrentMonth from '../components/table/FaultyMetersCurrentMonth';
// import UpcomingDueBillCurrentMonth from '../components/table/UpcomingDueBillCurrenthMonth';
// import { upComingDueBills } from '../utils/DueBillHelper';
// import PaidBillpreviousTwoMonthBefore from '../components/table/PaidBillpreviousTwoMonthBefore';
// import FaultyMetersBeforeTwoMonth from '../components/table/FaultyMetersBeforeTwoMonth';
// import OverdueBillsTable from '../components/table/OverdueBillsTable';
// import { baseUrl } from '../config/config';

// const Home = () => {
//   const dispatch = useDispatch();
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const user = useSelector(state => state.auth.user);
//   const { bills, loading: loadingBills, error: errorBills } = useSelector((state) => state.bills);
//   const { meters, loading: loadingMeters, error: errorUsers } = useSelector((state) => state.meters);
//   const { consumers, loading: loadingConsumers, error: errorConsumers } = useSelector((state) => state.consumers);

//   console.log("consumers>>>>",consumers)
//   const { roles, loading: loadingRoles, error: errorRoles } = useSelector((state) => state.roles);
//   const { masters, loading: loadingMasters, error: errorMasters } = useSelector((state) => state.masters);
  
//   const [showConsumerTable, setShowConsumerTable] = useState(false);
//   const [showCMonthPaidTable, setShowCMonthPaidTable] = useState(false);
//   const [showPMonthPaidTable, setShowPMonthPaidTable] = useState(false);
//   const [showCMonthAvgTable, setShowCMonthAvgTable] = useState(false);
//   const [showCMonthUDueBill, setshowCMonthUDueBill] = useState(false);
//   const [showOverdueBill, setShowOverdueBill] = useState(false);
//   const [showPTwoMonthBeforePaidTable, setShowPTwoMonthBeforePaidTable] = useState(false);
  
//   const allWards = ["Ward-A", "Ward-B", "Ward-C", "Ward-D", "Ward-E", "Ward-F", "Ward-G", "Ward-H", "Ward-I"];
//   const [wardFaultyCounts, setWardFaultyCounts] = useState({});
//   const [totalFaultyMeters, setTotalFaultyMeters] = useState(0);
//   const [showCMonthFaultyTable, setShowCMonthFaultyTable] = useState(false);
//   const [totalFaultyMetersBeforeTwo, setTotalFaultyMetersBeforeTwo] = useState(0);
//   const [showBeforeTwoMonthFaultyTable, setShowBeforeTwoMonthFaultyTable] = useState(false);
//   const [twoMB, setTwoMB] = useState('');
  
//   // State for dashboard counts
//   const [dashboardCounts, setDashboardCounts] = useState({
//     currentMonthPaidCount: 0,
//     previousMonthPaidCount: 0,
//     previousTwoMonthPaidCount: 0,
//     dueAlertCount: 0,
//     passedDueDateCount: 0,
//     totalFaultyCurrentMonth: 0,
//     totalFaultyBeforeTwoMonths: 0,
//     averageMetersCount: 0
//   });

//     // Function to close all tables
//   const closeAllTables = () => {
//     setShowConsumerTable(false);
//     setShowCMonthPaidTable(false);
//     setShowPMonthPaidTable(false);
//     setShowCMonthAvgTable(false);
//     setshowCMonthUDueBill(false);
//     setShowOverdueBill(false);
//     setShowPTwoMonthBeforePaidTable(false);
//     setShowCMonthFaultyTable(false);
//     setShowBeforeTwoMonthFaultyTable(false);
//   };

//   // Function to open only one table at a time
//   const openSingleTable = (tableToShow) => {
//     closeAllTables();
//     switch(tableToShow) {
//       case 'consumer':
//         setShowConsumerTable(true);
//         break;
//       case 'currentPaid':
//         setShowCMonthPaidTable(true);
//         break;
//       case 'previousPaid':
//         setShowPMonthPaidTable(true);
//         break;
//       case 'average':
//         setShowCMonthAvgTable(true);
//         break;
//       case 'faulty':
//         setShowCMonthFaultyTable(true);
//         break;
//       case 'upcoming':
//         setshowCMonthUDueBill(true);
//         break;
//       case 'twoMonthPaid':
//         setShowPTwoMonthBeforePaidTable(true);
//         break;
//       case 'faultyBefore':
//         setShowBeforeTwoMonthFaultyTable(true);
//         break;
//       case 'overdue':
//         setShowOverdueBill(true);
//         break;
//       default:
//         break;
//     }
//   };
  

//   // Function to fetch dashboard counts from all bills
//   const fetchDashboardCounts = async () => {
//     try {
//       // First get total count
//       // const firstResponse = await fetch('https://lightbillbackend.saavi.co.in/api/getBills?page=1&limit=1');
//       const firstResponse = await fetch(`${baseUrl}/getBills?page=1&limit=1`);
//       const firstData = await firstResponse.json();
//       const totalBills = firstData.pagination.totalBills;
      
//       // Fetch all bills in chunks
//       let allBills = [];
//       const chunkSize = 1000;
//       const totalPages = Math.ceil(totalBills / chunkSize);
      
//       for (let page = 1; page <= totalPages; page++) {
//         // const response = await fetch(`https://lightbillbackend.saavi.co.in/api/getBills?page=${page}&limit=${chunkSize}`);

//         const response = await fetch(`${baseUrl}/getBills?page=${page}&limit=${chunkSize}`);
//         const data = await response.json();
//         allBills = [...allBills, ...data.bills];
//       }

//       // Calculate dates
//       const currentDate = new Date();
//       const currentMonth = currentDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
//       const currentYear = currentDate.getFullYear();
//       const currentMonthYear = `${currentMonth}-${currentYear}`;

//       const prevDate = new Date(currentDate);
//       prevDate.setMonth(prevDate.getMonth() - 1);
//       const previousMonth = prevDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
//       const previousMonthCYear = `${previousMonth}-${currentYear}`;

//       const prevDateTwo = new Date(currentDate);
//       prevDateTwo.setMonth(prevDateTwo.getMonth() - 2);
//       const previousTwoMonth = prevDateTwo.toLocaleString('en-US', { month: 'short' }).toUpperCase();
//       const previousTwoMonthCYear = `${previousTwoMonth}-${currentYear}`;

//       // Calculate all counts
//       const currentMonthPaidCount = allBills.filter(bill => 
//         bill.paymentStatus === 'paid' 
//         && bill.monthAndYear === currentMonthYear &&
//         (user.role !== "Junior Engineer" || user.ward === "Head Office" || bill.ward === user.ward) 
//       ).length;

//       const previousMonthPaidCount = allBills.filter(bill => 
//         bill.paymentStatus === 'paid' && bill.monthAndYear === previousMonthCYear &&
//         (user.role !== "Junior Engineer" || user.ward === "Head Office" || bill.ward === user.ward) 
//       ).length;

//       const previousTwoMonthPaidCount = allBills.filter(bill => 
//         bill.paymentStatus === 'paid' && bill.monthAndYear === previousTwoMonthCYear &&
//         (user.role !== "Junior Engineer" || user.ward === "Head Office" || bill.ward === user.ward) 
//       ).length;

//       const today = new Date();
//       const dueAlertrows = upComingDueBills(allBills, user);
//       const dueAlertCount = dueAlertrows.length;

//       const passedDueDateCount = allBills.filter(bill => {
//         const dueDate = new Date(bill.dueDate);
//         const isOverdue = dueDate < today;
//         const isUnpaid = bill.paymentStatus === 'unpaid';

//         if (user?.role === 'Junior Engineer' && user?.ward !== 'Head Office') {
//           return isOverdue && isUnpaid && user?.ward === bill.ward;
//         }
//         return isOverdue && isUnpaid;
//       }).length;

//       // Calculate faulty meters
//       const faultyCurrentMonth = allBills.filter(bill => {
//         return bill.meterStatus === "FAULTY" && 
//           bill.monthAndYear === currentMonthYear && 
//           (user.role !== "Junior Engineer" || bill.ward === user.ward || (user.role === "Junior Engineer" && user.ward === "Head Office"));
//       }).length;

//       const faultyBeforeTwoMonths = allBills.filter(bill => {
//         return bill.meterStatus === "FAULTY" &&
//           bill.monthAndYear === previousTwoMonthCYear &&
//           (user.role !== "Junior Engineer" || bill.ward === user.ward || (user.role === "Junior Engineer" && user.ward === "Head Office"));
//       }).length;

//       // Calculate average meters
//       const uniqueBills = allBills
//         .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)) 
//         .filter((bill, index, self) => {
//           return index === self.findIndex(b => b.cn === bill.cn);
//         });
      
//       const meterStatusCounts = uniqueBills.reduce((acc, bill) => {
//         if (bill.meterStatus === 'Faulty') {
//           acc.Faulty += 1;
//         } else if (bill.meterStatus === 'Average') {
//           acc.Average += 1;
//         }
//         return acc;
//       }, { Faulty: 0, Average: 0 });

//       setDashboardCounts({
//         currentMonthPaidCount,
//         previousMonthPaidCount,
//         previousTwoMonthPaidCount,
//         dueAlertCount,
//         passedDueDateCount,
//         totalFaultyCurrentMonth: faultyCurrentMonth,
//         totalFaultyBeforeTwoMonths: faultyBeforeTwoMonths,
//         averageMetersCount: meterStatusCounts.Average
//       });

//       // Set other states
//       setTwoMB(previousTwoMonthCYear);
//       setTotalFaultyMeters(faultyCurrentMonth);
//       setTotalFaultyMetersBeforeTwo(faultyBeforeTwoMonths);

//     } catch (error) {
//       console.error('Error fetching dashboard counts:', error);
//     }
//   };

//   useEffect(() => {
//     if (!loadingBills && bills.length > 0 && user) {
//       const counts = bills.reduce((acc, bill) => {
//         if (
//           bill.meterStatus === "FAULTY" && 
//           bill.monthAndYear === currentMonthYear && 
//           (user.role !== "Junior Engineer" || bill.ward === user.ward ||(user.role === "Junior Engineer" && user.ward === "Head Office"))
//         ) {
//           const ward = bill.ward;
//           acc[ward] = (acc[ward] || 0) + 1;
//         }
//         return acc;
//       }, {});

//       const finalCounts = allWards.reduce((acc, ward) => {
//         acc[ward] = counts[ward] || 0;
//         return acc;
//       }, {});

//       const totalFaulty = Object.values(finalCounts).reduce((sum, count) => sum + count, 0);
//       setWardFaultyCounts(finalCounts);
//       setTotalFaultyMeters(totalFaulty);

//       const prevDateTMB = new Date();
//       prevDateTMB.setMonth(prevDateTMB.getMonth() - 2);
//       const prevMonthTMB = prevDateTMB.toLocaleString("en-US", { month: "short" }).toUpperCase();
//       const prevTwoMonthYear = `${prevMonthTMB}-${currentYear}`;
//       setTwoMB(prevTwoMonthYear);
      
//       const beforeTwoCounts = bills.reduce((acc, bill) => {
//         if (
//           bill.meterStatus === "FAULTY" &&
//           bill.monthAndYear === prevTwoMonthYear &&
//           (user.role !== "Junior Engineer" || bill.ward === user.ward || (user.role === "Junior Engineer" && user.ward === "Head Office"))
//         ) {
//           const ward = bill.ward;
//           acc[ward] = (acc[ward] || 0) + 1;
//         }
//         return acc;
//       }, {});

//       const totalBeforeTwo = Object.values(beforeTwoCounts).reduce((sum, count) => sum + count, 0);
//       setTotalFaultyMetersBeforeTwo(totalBeforeTwo);
      
//       // Fetch accurate counts for dashboard
//       if (user) {
//         fetchDashboardCounts();
//       }
//     }
//   }, [bills, loadingBills, user]);

//   const uniqueBills = bills
//     .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)) 
//     .filter((bill, index, self) => {
//       return index === self.findIndex(b => b.cn === bill.cn);
//     });
    
//   const meterStatusCounts = uniqueBills.reduce((acc, bill) => {
//       if (bill.meterStatus === 'Faulty') {
//           acc.Faulty += 1;
//       } else if (bill.meterStatus === 'Average') {
//           acc.Average += 1;
//       }
//       return acc;
//   }, { Faulty: 0, Average: 0 });

//   const upcomingOverdueCount = bills.filter(bill => bill.dueAlert === true).length;

//   const filteredConsumers = consumers?.filter(consumer => {
//     return user?.role === 'Junior Engineer' && user?.ward !== 'Head Office' 
//     ? consumer.ward === user.ward 
//     : true;
//   });

//   const today = new Date(); 
//   const dueAlertrows = upComingDueBills(bills, user);
//   const dueAlertCount = dueAlertrows.length;

//   const passedDueDateCount = bills.filter(bill => {
//     const dueDate = new Date(bill.dueDate);
//     const isOverdue = dueDate < today;
//     const isUnpaid = bill.paymentStatus === 'unpaid';

//     if (user?.role === 'Junior Engineer' && user?.ward !== 'Head Office') {
//       return isOverdue && isUnpaid && user?.ward === bill.ward;
//     }
//     return isOverdue && isUnpaid;
//   }).length;

//   const currentDate = new Date();
//   const currentMonth = currentDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
//   const currentYear = currentDate.getFullYear();
//   const currentMonthYear = `${currentMonth}-${currentYear}`;

//   const prevDate = new Date(currentDate);
//   prevDate.setMonth(prevDate.getMonth() - 1);
//   const previousMonth = prevDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
//   const previousYear = prevDate.getFullYear();
//   const previousMonthCYear = `${previousMonth}-${currentYear}`;

//   const prevDateTwo = new Date(currentDate);
//   prevDateTwo.setMonth(prevDateTwo.getMonth() - 2);
//   const previousTwoMonth = prevDateTwo.toLocaleString('en-US', { month: 'short' }).toUpperCase();
//   const previousTwoMonthCYear = `${previousTwoMonth}-${currentYear}`;

//   const currentMonthPaidCount = bills.filter(bill => 
//     bill.paymentStatus === 'paid' 
//     && bill.monthAndYear === currentMonthYear &&
//     (user.role !== "Junior Engineer"|| user.ward === "Head Office" || bill.ward === user.ward) 
//   ).length;

//   const previousMonthPaidCount = bills.filter(bill => 
//     bill.paymentStatus === 'paid' && bill.monthAndYear === previousMonthCYear &&
//     (user.role !== "Junior Engineer"|| user.ward === "Head Office" || bill.ward === user.ward) 
//   ).length;

//   const previousMonthBills = bills.filter(bill => bill.monthAndYear === previousMonthCYear);
//   const previousMonthTotalCount = previousMonthBills.length;

//   const previousTwoMonthPaidCount = bills.filter(bill => 
//     bill.paymentStatus === 'paid' && bill.monthAndYear === previousTwoMonthCYear &&
//     (user.role !== "Junior Engineer"|| user.ward === "Head Office" || bill.ward === user.ward) 
//   ).length;

//   const theme = useTheme();
//   const isXs = useMediaQuery(theme.breakpoints.down('xs'));
//   const isSm = useMediaQuery(theme.breakpoints.down('sm'));
//   const isMd = useMediaQuery(theme.breakpoints.down('md'));
//   const isLg = useMediaQuery(theme.breakpoints.down('lg'));
//   const isXl = useMediaQuery(theme.breakpoints.down('xl'));

//   useEffect(() => {
//     dispatch(fetchUsers());
//     dispatch(fetchBills()); // This will fetch paginated bills for tables
//     dispatch(getMasters());
//     dispatch(fetchRoles());
//     dispatch(fetchMeters());
//     dispatch(fetchConsumers());
//     document.body.classList.add('home-body');
//     return () => {
//       document.body.classList.remove('home-body');
//     };
//   }, [dispatch]);

//   if (loadingRoles) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (errorUsers) {
//     return <p>Error loading users: {errorUsers}</p>;
//   }

//   if (errorRoles) {
//     return <p>Error loading roles: {errorRoles}</p>;
//   }

//   const gridStyle = {
//     // width: isSm || isXs ? '90%' : isSidebarOpen ? '90%' : '90%',
//     // marginLeft: isSm || isXs ? '10%' : '0%'
 
//   };

//   // Modal style for tables
//   // const modalStyle = {
//   //   position: 'absolute',
//   //   top: '50%',
//   //   left: '50%',
//   //   transform: 'translate(-50%, -50%)',
//   //   bgcolor: 'background.paper',
//   //   boxShadow: 24,
//   //   p: 0,
//   //   borderRadius: '10px',
//   //   maxHeight: '90vh',
//   //   overflow: 'auto',
//   //   outline: 'none'
//   // };
//   const modalStyle = {
//   position: 'absolute',
//   top: '8%',
//   left: '50%',
//   transform: 'translateX(-50%)',
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 0,
//   borderRadius: '10px',
//   maxHeight: 'auto',
//   width:'50%',
//   overflow: 'auto',
//   outline: 'none',
// };


//   // Card data array for easier management
//   const cardData = [
//     {
//       IconComponent: ElectricMeterOutlinedIcon,
//       backgroundColor: "#EAEFF5",
//       avatarColor: "#475569",
//       title: "Total Meters",
//       count: filteredConsumers.length,
//       onClick: () => {
//         openSingleTable('consumer');
//         console.log("showConsumerTable:", !showConsumerTable);
//       }
//     },
//     {
//       IconComponent: FactCheckIcon,
//       backgroundColor: "#E7F1FF",
//       avatarColor: "#2563EB",
//       title: `Paid Bills (${currentMonthYear})`,
//       count: dashboardCounts.currentMonthPaidCount,
//       onClick: () => {
//         openSingleTable('currentPaid');
//       }
//     },
//     {
//       IconComponent: FactCheckIcon,
//       backgroundColor: "#E6FCED",
//       avatarColor: "#16A34A",
//       title: `Paid Bills (${previousMonthCYear})`,
//       count: dashboardCounts.previousMonthPaidCount,
//       onClick: () => {
//         openSingleTable('previousPaid');
//       }
//     },
//     {
//       IconComponent: ElectricMeterOutlinedIcon,
//       backgroundColor: "#F6EEFF",
//       avatarColor: "#9333EA",
//       title: "Total Average Meters",
//       count: dashboardCounts.averageMetersCount,
//       onClick: () => {
//         openSingleTable('average');
//       }
//     },
//     {
//       IconComponent: ErrorOutlinedIcon,
//       backgroundColor: "#FEEAEA",
//       avatarColor: "#DC2626",
//       title: "Total Faulty Meters",
//       count: dashboardCounts.totalFaultyCurrentMonth,
//       onClick: () => {
//         openSingleTable('faulty');
//       }
//     },
//     {
//       IconComponent: UpcomingIcon,
//       backgroundColor: "#E8EDFF",
//       avatarColor: "#4F46E5",
//       title: "Upcoming Due Bills",
//       count: dashboardCounts.dueAlertCount,
//       onClick: () => {
//         openSingleTable('upcoming');
//       }
//     },
//     ...(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office') ? [{
//       IconComponent: FactCheckIcon,
//       backgroundColor: "#DCFCF5",
//       avatarColor: "#0D9488",
//       title: `Paid Bills (${previousTwoMonthCYear})`,
//       count: dashboardCounts.previousTwoMonthPaidCount,
//       onClick: () => {
//         openSingleTable('twoMonthPaid');
//       }
//     }] : []),
//     {
//       IconComponent: ErrorOutlinedIcon,
//       backgroundColor: "#FFF7D9",
//       avatarColor: "#FFA534",
//       title: `Faulty Meters ${twoMB}`,
//       count: dashboardCounts.totalFaultyBeforeTwoMonths,
//       onClick: () => {
//         openSingleTable('faultyBefore');
//       }
//     },
//     {
//       IconComponent: AccessTimeFilledIcon,
//       backgroundColor: "#F6F7F8",
//       avatarColor: "#D97706",
//       title: "Overdue Bills",
//       count: dashboardCounts.passedDueDateCount,
//       onClick: () => {
//         openSingleTable('overdue');
//       }
//     },
//     ...(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office') ? [{
//       IconComponent: Person2OutlinedIcon,
//       backgroundColor: "#F6F7F9",
//       avatarColor: "#374151",
//       title: "Total Users",
//       count: roles.length
//     }] : [])
//   ];

//   return (
//     <div style={{
//       ...gridStyle,
//       marginTop: isSidebarOpen ? '1%' : '4%',
//     }} className="containerhome">
      
//       {/* Responsive Cards Grid */}
//       <Grid container spacing={2} className="info-card-container"
//       sx={{
//         pl:{
//           md:isSidebarOpen?'18%':'6%',
//            xs:'20%'
//         },
       
//         // border:'2px solid red'
//       }}
      
//       >
//         {cardData.map((card, index) => (
//           <Grid 
//           sx={{
//             // border:'2px solid red'
//           }}
//             item 
//             key={index}
//             xs={11}  // 1 card per row on extra small screens
//             // sm={12}  // 1 card per row on small screens
//              sm={isSidebarOpen ? 5 : 5}  // 4 cards per row on medium screens
//             md={isSidebarOpen ? 3 : 3}  // 4 cards per row on medium screens
//           lg={isSidebarOpen ? 2.4 : 2.3} // 5 cards per row on large screens
//             xl={isSidebarOpen ? 2.4 : 2.3} // 5 cards per row on extra large screens
//           >
//             <InfoCard 
//               IconComponent={card.IconComponent}
//               backgroundColor={card.backgroundColor}
//               className="container-infocard"
//               avatarColor={card.avatarColor}
//               avatarIcon="M"
//               title={card.title}
//               count={card.count}
//               onClick={card.onClick}
//             />
//           </Grid>
//         ))}
//       </Grid>

//       {/* Modal Tables Section - Only one table shows at a time */}
//       {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer'|| (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
//         <>
//           {/* Consumer Table Modal */}
//           <Modal
//             open={showConsumerTable}
//             onClose={() => setShowConsumerTable(false)}
//             aria-labelledby="consumer-table-modal"
//           >
//             <Box sx={modalStyle}>
//               <Wardnamecount onClose={() => setShowConsumerTable(false)} />
//             </Box>
//           </Modal>

//           {/* Current Month Paid Bills Modal */}
//           <Modal
//             open={showCMonthPaidTable}
//             onClose={() => setShowCMonthPaidTable(false)}
//             aria-labelledby="current-paid-table-modal"
//           >
//             <Box sx={modalStyle}>
//               <PaidBillCurrentMonth onClose={() => setShowCMonthPaidTable(false)} />
//             </Box>
//           </Modal>

//           {/* Previous Month Paid Bills Modal */}
//           <Modal
//             open={showPMonthPaidTable}
//             onClose={() => setShowPMonthPaidTable(false)}
//             aria-labelledby="previous-paid-table-modal"
//           >
//             <Box sx={modalStyle}>
//               <PaidBillPreviousMonth onClose={() => setShowPMonthPaidTable(false)} />
//             </Box>
//           </Modal>

//           {/* Average Meters Modal */}
//           <Modal
//             open={showCMonthAvgTable}
//             onClose={() => setShowCMonthAvgTable(false)}
//             aria-labelledby="average-meters-table-modal"
//           >
//             <Box sx={modalStyle}>
//               <AverageMetersCurrentMonth onClose={() => setShowCMonthAvgTable(false)} />
//             </Box>
//           </Modal>

//           {/* Faulty Meters Modal */}
//           <Modal
//             open={showCMonthFaultyTable}
//             onClose={() => setShowCMonthFaultyTable(false)}
//             aria-labelledby="faulty-meters-table-modal"
//           >
//             <Box sx={modalStyle}>
//               <FaultyMetersCurrentMonth onClose={() => setShowCMonthFaultyTable(false)} />
//             </Box>
//           </Modal>

//           {/* Upcoming Due Bills Modal */}
//           <Modal
//             open={showCMonthUDueBill}
//             onClose={() => setshowCMonthUDueBill(false)}
//             aria-labelledby="upcoming-due-bills-table-modal"
//           >
//             <Box sx={modalStyle}>
//               <UpcomingDueBillCurrentMonth onClose={() => setshowCMonthUDueBill(false)} />
//             </Box>
//           </Modal>

//           {/* Two Month Before Paid Bills Modal */}
//           <Modal
//             open={showPTwoMonthBeforePaidTable}
//             onClose={() => setShowPTwoMonthBeforePaidTable(false)}
//             aria-labelledby="two-month-paid-table-modal"
//           >
//             <Box sx={modalStyle}>
//               <PaidBillpreviousTwoMonthBefore onClose={() => setShowPTwoMonthBeforePaidTable(false)} />
//             </Box>
//           </Modal>

//           {/* Before Two Month Faulty Meters Modal */}
//           <Modal
//             open={showBeforeTwoMonthFaultyTable}
//             onClose={() => setShowBeforeTwoMonthFaultyTable(false)}
//             aria-labelledby="before-two-month-faulty-table-modal"
//           >
//             <Box sx={modalStyle}>
//               <FaultyMetersBeforeTwoMonth onClose={() => setShowBeforeTwoMonthFaultyTable(false)} />
//             </Box>
//           </Modal>

//           {/* Overdue Bills Modal */}
//           <Modal
//             open={showOverdueBill}
//             onClose={() => setShowOverdueBill(false)}
//             aria-labelledby="overdue-bills-table-modal"
//           >
//             <Box sx={modalStyle}>
//               <OverdueBillsTable onClose={() => setShowOverdueBill(false)} />
//             </Box>
//           </Modal>
//         </>
//       )}

//       {/* Charts Section */}
//       <Box sx={{
//         width:{
//           xs:'90%',
//           md:isSidebarOpen?'85%':'96%'
//         },
//         ml:{
//           md:isSidebarOpen?'15%':'4%',
//           xs:'9%'
//         },
//         display: 'flex',
//         justifyContent: 'space-around',
//         flexDirection: { xs: 'column', md: 'row' },
//         mt: 0,
//         gap: { xs: 4, md: 0 },
//         px: { xs: 2, sm: 3, md: 0 }
//       }}>

//         {/* Left Chart */}
//         <Box sx={{
//           width: { xs: '100%', sm: '100%', md: '48%', lg: '48%', xl: '48%' },
//           height: { xs: '400px', md: '80%' },
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           flexDirection: 'column',
//           mx: 0
//         }}>
//           <ChartComponent />
//         </Box>

//         {/* Right Chart */}
//         <Box sx={{
//           width: { xs: '100%', sm: '100%', md: '48%', lg: '48%', xl: '48%' },
//           height: { xs: '400px', md: '80%' },
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           flexDirection: 'column',
//           mx: 0
//         }}>
//           <PieChartBills />
//         </Box>

//       </Box>
//     </div>
//   );
// };

// export default Home;
// // =======================================


import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Button, useMediaQuery, Box, Grid, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/actions/userActions';
import { fetchBills, fetchAllBills } from '../store/actions/billActions';
import { fetchRoles } from '../store/actions/roleActions';
import { fetchMeters } from '../store/actions/meterActions';
import { fetchConsumers } from '../store/actions/consumerActions';
import { getMasters } from '../store/actions/masterActions';
import InfoCard from '../components/cards/InfoCard';
import { CircularProgress } from '@mui/material';
import ChartComponent from '../components/CharComponent';
import './Home.css';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import ElectricMeterOutlinedIcon from '@mui/icons-material/ElectricMeterOutlined';
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import SummarizeIcon from '@mui/icons-material/Summarize';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PaidIcon from '@mui/icons-material/Paid';
import FactCheckIcon from '@mui/icons-material/FactCheck';

import PieChartBills from '../components/PieChartBills';
import Wardnamecount from '../components/table/Wardnamecount';
import PaidBillCurrentMonth from '../components/table/PaidBillCurrentMonth';
import PaidBillPreviousMonth from '../components/table/PaidBillPreviousMonth';
import AverageMetersCurrentMonth from '../components/table/AverageMetersCurrentMonth';
import FaultyMetersCurrentMonth from '../components/table/FaultyMetersCurrentMonth';
import UpcomingDueBillCurrentMonth from '../components/table/UpcomingDueBillCurrenthMonth';
import { upComingDueBills } from '../utils/DueBillHelper';
import PaidBillpreviousTwoMonthBefore from '../components/table/PaidBillpreviousTwoMonthBefore';
import FaultyMetersBeforeTwoMonth from '../components/table/FaultyMetersBeforeTwoMonth';
import OverdueBillsTable from '../components/table/OverdueBillsTable';
import { baseUrl } from '../config/config';

const Home = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const user = useSelector(state => state.auth.user);
  const { bills, loading: loadingBills, error: errorBills } = useSelector((state) => state.bills);
  const { meters, loading: loadingMeters, error: errorUsers } = useSelector((state) => state.meters);
  const { consumers, pagination, loading: loadingConsumers, error: errorConsumers } = useSelector((state) => state.consumers);

  console.log("consumers>>>>",consumers)
  console.log("pagination>>>>",pagination)
  const { roles, loading: loadingRoles, error: errorRoles } = useSelector((state) => state.roles);
  const { masters, loading: loadingMasters, error: errorMasters } = useSelector((state) => state.masters);

  const [showConsumerTable, setShowConsumerTable] = useState(false);
  const [showCMonthPaidTable, setShowCMonthPaidTable] = useState(false);
  const [showPMonthPaidTable, setShowPMonthPaidTable] = useState(false);
  const [showCMonthAvgTable, setShowCMonthAvgTable] = useState(false);
  const [showCMonthUDueBill, setshowCMonthUDueBill] = useState(false);
  const [showOverdueBill, setShowOverdueBill] = useState(false);
  const [showPTwoMonthBeforePaidTable, setShowPTwoMonthBeforePaidTable] = useState(false);

  const allWards = ["Ward-A", "Ward-B", "Ward-C", "Ward-D", "Ward-E", "Ward-F", "Ward-G", "Ward-H", "Ward-I"];
  const [wardFaultyCounts, setWardFaultyCounts] = useState({});
  const [totalFaultyMeters, setTotalFaultyMeters] = useState(0);
  const [showCMonthFaultyTable, setShowCMonthFaultyTable] = useState(false);
  const [totalFaultyMetersBeforeTwo, setTotalFaultyMetersBeforeTwo] = useState(0);
  const [showBeforeTwoMonthFaultyTable, setShowBeforeTwoMonthFaultyTable] = useState(false);
  const [twoMB, setTwoMB] = useState('');
  const [totalConsumersCount, setTotalConsumersCount] = useState(0);

  // State for dashboard counts
  const [dashboardCounts, setDashboardCounts] = useState({
    currentMonthPaidCount: 0,
    previousMonthPaidCount: 0,
    previousTwoMonthPaidCount: 0,
    dueAlertCount: 0,
    passedDueDateCount: 0,
    totalFaultyCurrentMonth: 0,
    totalFaultyBeforeTwoMonths: 0,
    averageMetersCount: 0
  });

    // Function to close all tables
  const closeAllTables = () => {
    setShowConsumerTable(false);
    setShowCMonthPaidTable(false);
    setShowPMonthPaidTable(false);
    setShowCMonthAvgTable(false);
    setshowCMonthUDueBill(false);
    setShowOverdueBill(false);
    setShowPTwoMonthBeforePaidTable(false);
    setShowCMonthFaultyTable(false);
    setShowBeforeTwoMonthFaultyTable(false);
  };

  // Function to open only one table at a time
  const openSingleTable = (tableToShow) => {
    closeAllTables();
    switch(tableToShow) {
      case 'consumer':
        setShowConsumerTable(true);
        break;
      case 'currentPaid':
        setShowCMonthPaidTable(true);
        break;
      case 'previousPaid':
        setShowPMonthPaidTable(true);
        break;
      case 'average':
        setShowCMonthAvgTable(true);
        break;
      case 'faulty':
        setShowCMonthFaultyTable(true);
        break;
      case 'upcoming':
        setshowCMonthUDueBill(true);
        break;
      case 'twoMonthPaid':
        setShowPTwoMonthBeforePaidTable(true);
        break;
      case 'faultyBefore':
        setShowBeforeTwoMonthFaultyTable(true);
        break;
      case 'overdue':
        setShowOverdueBill(true);
        break;
      default:
        break;
    }
  };

  // Function to fetch total consumers count
  const fetchTotalConsumersCount = async () => {
    try {
      const response = await fetch(`${baseUrl}/getConsumers?page=1&limit=1`);
      const data = await response.json();

      // If user is Junior Engineer and not Head Office, filter by ward
      if (user?.role === 'Junior Engineer' && user?.ward !== 'Head Office') {
        const wardResponse = await fetch(`${baseUrl}/getConsumers?page=1&limit=1&ward=${encodeURIComponent(user.ward)}`);
        const wardData = await wardResponse.json();
        setTotalConsumersCount(wardData.pagination.totalConsumers || 0);
      } else {
        setTotalConsumersCount(data.pagination.totalConsumers || 0);
      }
    } catch (error) {
      console.error('Error fetching total consumers count:', error);
      setTotalConsumersCount(0);
    }
  };

  // Function to fetch dashboard counts from all bills
  const fetchDashboardCounts = async () => {
    try {
      // First get total count
      const firstResponse = await fetch(`${baseUrl}/getBills?page=1&limit=1`);
      const firstData = await firstResponse.json();
      const totalBills = firstData.pagination.totalBills;

      // Fetch all bills in chunks
      let allBills = [];
      const chunkSize = 1000;
      const totalPages = Math.ceil(totalBills / chunkSize);

      for (let page = 1; page <= totalPages; page++) {
        const response = await fetch(`${baseUrl}/getBills?page=${page}&limit=${chunkSize}`);
        const data = await response.json();
        allBills = [...allBills, ...data.bills];
      }

      // Calculate dates
      const currentDate = new Date();
      const currentMonth = currentDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  console.log("currentMonth>>>>>",currentMonth)
      const currentYear = currentDate.getFullYear();
    const pYear=currentDate.getFullYear()-1;

    console.log("pYear",pYear)
      const currentMonthYear = `${currentMonth}-${currentYear}`;

       
      const prevDate = new Date(currentDate);
      prevDate.setMonth(prevDate.getMonth() - 1);
      const previousMonth = prevDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();



      const isDecember =
  previousMonth?.toLowerCase() === "dec" ||
  previousMonth?.toLowerCase() === "december";

const previousMonthCYear = `${previousMonth}-${isDecember ? previousYear : currentYear}`;


      // const previousMonthCYear = `${previousMonth}-${currentYear}`;

      const prevDateTwo = new Date(currentDate);
      prevDateTwo.setMonth(prevDateTwo.getMonth() - 2);
      const previousTwoMonth = prevDateTwo.toLocaleString('en-US', { month: 'short' }).toUpperCase();






      // >>>>>>>>


      const lowPrevTwoMon = previousTwoMonth?.toLowerCase();

const isPrevYearPrevTwoMon =
  lowPrevTwoMon === "nov" ||
  lowPrevTwoMon === "november" ||
  lowPrevTwoMon === "dec" ||
  lowPrevTwoMon === "december";


      

      // const previousTwoMonthCYear = `${previousTwoMonth}-${currentYear}`;
      // &&&&&&&&&&

      

      // const previousTwoMonthCYear = `${previousMonth}-${isPrevYearPrevTwoMon ? previousYear : currentYear}`;
      const previousTwoMonthCYear = `${previousTwoMonth}-${isPrevYearPrevTwoMon ? previousYear : currentYear}`;


      // Calculate all counts
      const currentMonthPaidCount = allBills.filter(bill =>
        bill.paymentStatus === 'paid'
        && bill.monthAndYear === currentMonthYear &&
        (user.role !== "Junior Engineer" || user.ward === "Head Office" || bill.ward === user.ward)
      ).length;
// *******
      const previousMonthPaidCount = allBills.filter(bill =>
        bill.paymentStatus === 'paid' && bill.monthAndYear === previousMonthCYear &&
        (user.role !== "Junior Engineer" || user.ward === "Head Office" || bill.ward === user.ward)
      ).length;

      const previousTwoMonthPaidCount = allBills.filter(bill =>
        bill.paymentStatus === 'paid' && bill.monthAndYear === previousTwoMonthCYear &&
        (user.role !== "Junior Engineer" || user.ward === "Head Office" || bill.ward === user.ward)
      ).length;

      // const today = new Date();
      // const dueAlertrows = upComingDueBills(allBills, user);
      // const dueAlertCount = dueAlertrows.length;

      // const passedDueDateCount = allBills.filter(bill => {
      //   const dueDate = new Date(bill.dueDate);
      //   const isOverdue = dueDate < today;
      //   const isUnpaid = bill.paymentStatus === 'unpaid';

      //   if (user?.role === 'Junior Engineer' && user?.ward !== 'Head Office') {
      //     return isOverdue && isUnpaid && user?.ward === bill.ward;
      //   }
      //   return isOverdue && isUnpaid;
      // }).length;



const today = new Date();
const dueAlertrows = upComingDueBills(allBills, user);
const dueAlertCount = dueAlertrows.length;

// 🧩 Calculate current and previous month names (e.g., OCT-2025)
// const currentMonthYear = today.toLocaleString('default', { month: 'short' }).toUpperCase() + '-' + today.getFullYear();
const previousMonthDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
const previousMonthYear = previousMonthDate.toLocaleString('default', { month: 'short' }).toUpperCase() + '-' + previousMonthDate.getFullYear();

// 🧩 Filter overdue bills for current + previous months
const overdueBills = allBills.filter(bill => {
  const dueDate = new Date(bill.dueDate);
  const isOverdue = dueDate < today;
  const isUnpaid = bill.paymentStatus === 'unpaid';
  const isCurrentOrPrevious =
    bill.monthAndYear === currentMonthYear || bill.monthAndYear === previousMonthYear;

  if (user?.role === 'Junior Engineer' && user?.ward !== 'Head Office') {
    return isOverdue && isUnpaid && isCurrentOrPrevious && user?.ward === bill.ward;
  }
  return isOverdue && isUnpaid && isCurrentOrPrevious;
});

// ✅ Final count (only current & previous months)
const passedDueDateCount = overdueBills.length;




      // Calculate faulty meters
      const faultyCurrentMonth = allBills.filter(bill => {
        return bill.meterStatus === "FAULTY" &&
          bill.monthAndYear === currentMonthYear &&
          (user.role !== "Junior Engineer" || bill.ward === user.ward || (user.role === "Junior Engineer" && user.ward === "Head Office"));
      }).length;

      const faultyBeforeTwoMonths = allBills.filter(bill => {
        return bill.meterStatus === "FAULTY" &&
          bill.monthAndYear === previousTwoMonthCYear &&
          (user.role !== "Junior Engineer" || bill.ward === user.ward || (user.role === "Junior Engineer" && user.ward === "Head Office"));
      }).length;

      // Calculate average meters
      const uniqueBills = allBills
        .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
        .filter((bill, index, self) => {
          return index === self.findIndex(b => b.cn === bill.cn);
        });

      const meterStatusCounts = uniqueBills.reduce((acc, bill) => {
        if (bill.meterStatus === 'Faulty') {
          acc.Faulty += 1;
        } else if (bill.meterStatus === 'Average') {
          acc.Average += 1;
        }
        return acc;
      }, { Faulty: 0, Average: 0 });

      setDashboardCounts({
        currentMonthPaidCount,
        previousMonthPaidCount,
        previousTwoMonthPaidCount,
        dueAlertCount,
        passedDueDateCount,
        totalFaultyCurrentMonth: faultyCurrentMonth,
        totalFaultyBeforeTwoMonths: faultyBeforeTwoMonths,
        averageMetersCount: meterStatusCounts.Average
      });

      // Set other states
      setTwoMB(previousTwoMonthCYear);
      setTotalFaultyMeters(faultyCurrentMonth);
      setTotalFaultyMetersBeforeTwo(faultyBeforeTwoMonths);

    } catch (error) {
      console.error('Error fetching dashboard counts:', error);
    }
  };

  useEffect(() => {
    if (!loadingBills && bills.length > 0 && user) {
      const counts = bills.reduce((acc, bill) => {
        if (
          bill.meterStatus === "FAULTY" &&
          bill.monthAndYear === currentMonthYear &&
          (user.role !== "Junior Engineer" || bill.ward === user.ward ||(user.role === "Junior Engineer" && user.ward === "Head Office"))
        ) {
          const ward = bill.ward;
          acc[ward] = (acc[ward] || 0) + 1;
        }
        return acc;
      }, {});

      const finalCounts = allWards.reduce((acc, ward) => {
        acc[ward] = counts[ward] || 0;
        return acc;
      }, {});

      const totalFaulty = Object.values(finalCounts).reduce((sum, count) => sum + count, 0);
      setWardFaultyCounts(finalCounts);
      setTotalFaultyMeters(totalFaulty);

      const prevDateTMB = new Date();
      prevDateTMB.setMonth(prevDateTMB.getMonth() - 2);
      const prevMonthTMB = prevDateTMB.toLocaleString("en-US", { month: "short" }).toUpperCase();
      const prevTwoMonthYear = `${prevMonthTMB}-${currentYear}`;
      setTwoMB(prevTwoMonthYear);

      const beforeTwoCounts = bills.reduce((acc, bill) => {
        if (
          bill.meterStatus === "FAULTY" &&
          bill.monthAndYear === prevTwoMonthYear &&
          (user.role !== "Junior Engineer" || bill.ward === user.ward || (user.role === "Junior Engineer" && user.ward === "Head Office"))
        ) {
          const ward = bill.ward;
          acc[ward] = (acc[ward] || 0) + 1;
        }
        return acc;
      }, {});

      const totalBeforeTwo = Object.values(beforeTwoCounts).reduce((sum, count) => sum + count, 0);
      setTotalFaultyMetersBeforeTwo(totalBeforeTwo);

      // Fetch accurate counts for dashboard
      if (user) {
        fetchDashboardCounts();
        fetchTotalConsumersCount();
      }
    }
  }, [bills, loadingBills, user]);

  const uniqueBills = bills
    .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
    .filter((bill, index, self) => {
      return index === self.findIndex(b => b.cn === bill.cn);
    });

  const meterStatusCounts = uniqueBills.reduce((acc, bill) => {
      if (bill.meterStatus === 'Faulty') {
          acc.Faulty += 1;
      } else if (bill.meterStatus === 'Average') {
          acc.Average += 1;
      }
      return acc;
  }, { Faulty: 0, Average: 0 });

  const upcomingOverdueCount = bills.filter(bill => bill.dueAlert === true).length;

  const filteredConsumers = consumers?.filter(consumer => {
    return user?.role === 'Junior Engineer' && user?.ward !== 'Head Office'
    ? consumer.ward === user.ward
    : true;
  });

  const today = new Date();
  const dueAlertrows = upComingDueBills(bills, user);
  const dueAlertCount = dueAlertrows.length;

  const passedDueDateCount = bills.filter(bill => {
    const dueDate = new Date(bill.dueDate);
    const isOverdue = dueDate < today;
    const isUnpaid = bill.paymentStatus === 'unpaid';

    if (user?.role === 'Junior Engineer' && user?.ward !== 'Head Office') {
      return isOverdue && isUnpaid && user?.ward === bill.ward;
    }
    return isOverdue && isUnpaid;
  }).length;

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const currentYear = currentDate.getFullYear();
  const currentMonthYear = `${currentMonth}-${currentYear}`;

  const prevDate = new Date(currentDate);
  prevDate.setMonth(prevDate.getMonth() - 1);
  const previousMonth = prevDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();

  console.log("previousMonth",previousMonth)
  const previousYear = prevDate.getFullYear(); 
  console.log("previousYear>>>>>>--------",previousYear)
  // const previousMonthCYear = `${previousMonth}-${currentYear}`;

  const isDecember =
  previousMonth?.toLowerCase() === "dec" ||
  previousMonth?.toLowerCase() === "december";

const previousMonthCYear = `${previousMonth}-${isDecember ? previousYear : currentYear}`;

console.log(previousMonthCYear);

  const prevDateTwo = new Date(currentDate);
  prevDateTwo.setMonth(prevDateTwo.getMonth() - 2);
  const previousTwoMonth = prevDateTwo.toLocaleString('en-US', { month: 'short' }).toUpperCase();


const lowerPrevTwoMonth = previousTwoMonth?.toLowerCase();

const isPrevYearForPrevTwoMonth =
  lowerPrevTwoMonth === "nov" ||
  lowerPrevTwoMonth === "november" ||
  lowerPrevTwoMonth === "dec" ||
  lowerPrevTwoMonth === "december";

  
  // const previousTwoMonthCYear = `${previousTwoMonth}-${currentYear}`;

  const previousTwoMonthCYear = `${previousTwoMonth}-${isPrevYearForPrevTwoMonth ? previousYear : currentYear}`;
console.log("previousTwoMonthCYear----home",previousTwoMonthCYear)

  const currentMonthPaidCount = bills.filter(bill =>
    bill.paymentStatus === 'paid'
    && bill.monthAndYear === currentMonthYear &&
    (user.role !== "Junior Engineer"|| user.ward === "Head Office" || bill.ward === user.ward)
  ).length;

  const previousMonthPaidCount = bills.filter(bill =>
    bill.paymentStatus === 'paid' && bill.monthAndYear === previousMonthCYear &&
    (user.role !== "Junior Engineer"|| user.ward === "Head Office" || bill.ward === user.ward)
  ).length;

  const previousMonthBills = bills.filter(bill => bill.monthAndYear === previousMonthCYear);
  const previousMonthTotalCount = previousMonthBills.length;

  const previousTwoMonthPaidCount = bills.filter(bill =>
    bill.paymentStatus === 'paid' && bill.monthAndYear === previousTwoMonthCYear &&
    (user.role !== "Junior Engineer"|| user.ward === "Head Office" || bill.ward === user.ward)
  ).length;

  console.log("previousTwoMonthPaidCount>>>>",previousTwoMonthPaidCount)

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isLg = useMediaQuery(theme.breakpoints.down('lg'));
  const isXl = useMediaQuery(theme.breakpoints.down('xl'));

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchBills());
    dispatch(getMasters());
    dispatch(fetchRoles());
    dispatch(fetchMeters());
    dispatch(fetchConsumers());
    document.body.classList.add('home-body');
    return () => {
      document.body.classList.remove('home-body');
    };
  }, [dispatch]);

  if (loadingRoles) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (errorUsers) {
    return <p>Error loading users: {errorUsers}</p>;
  }

  if (errorRoles) {
    return <p>Error loading roles: {errorRoles}</p>;
  }

  const gridStyle = {

  };

  const modalStyle = {
  position: 'absolute',
  top: '8%',
  left: '50%',
  transform: 'translateX(-50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0,
  borderRadius: '10px',
  maxHeight: 'auto',
  width:'50%',
  overflow: 'auto',
  outline: 'none',
};


  // Card data array for easier management
  const cardData = [
    {
      IconComponent: ElectricMeterOutlinedIcon,
      backgroundColor: "#EAEFF5",
      avatarColor: "#475569",
      title: "Total Meters",
      count: totalConsumersCount,
      onClick: () => {
        openSingleTable('consumer');
        console.log("showConsumerTable:", !showConsumerTable);
      }
    },
    {
      IconComponent: FactCheckIcon,
      backgroundColor: "#E7F1FF",
      avatarColor: "#2563EB",
      title: `Paid Bills (${currentMonthYear})`,
      count: dashboardCounts.currentMonthPaidCount,
      onClick: () => {
        openSingleTable('currentPaid');
      }
    },
    {
      IconComponent: FactCheckIcon,
      backgroundColor: "#E6FCED",
      avatarColor: "#16A34A",
      title: `Paid Bills (${previousMonthCYear})`,
      count: dashboardCounts.previousMonthPaidCount,
      onClick: () => {
        openSingleTable('previousPaid');
      }
    },
    {
      IconComponent: ElectricMeterOutlinedIcon,
      backgroundColor: "#F6EEFF",
      avatarColor: "#9333EA",
      title: "Total Average Meters",
      count: dashboardCounts.averageMetersCount,
      onClick: () => {
        openSingleTable('average');
      }
    },
    {
      IconComponent: ErrorOutlinedIcon,
      backgroundColor: "#FEEAEA",
      avatarColor: "#DC2626",
      title: "Total Faulty Meters",
      count: dashboardCounts.totalFaultyCurrentMonth,
      onClick: () => {
        openSingleTable('faulty');
      }
    },
    {
      IconComponent: UpcomingIcon,
      backgroundColor: "#E8EDFF",
      avatarColor: "#4F46E5",
      title: "Upcoming Due Bills",
      count: dashboardCounts.dueAlertCount,
      onClick: () => {
        openSingleTable('upcoming');
      }
    },
    ...(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office') ? [{
      IconComponent: FactCheckIcon,
      backgroundColor: "#DCFCF5",
      avatarColor: "#0D9488",
      

      // ----------
      title: `Paid Bills (${previousTwoMonthCYear})`,
      count: dashboardCounts.previousTwoMonthPaidCount,
      onClick: () => {
        openSingleTable('twoMonthPaid');
      }
    }] : []),
    {
      IconComponent: ErrorOutlinedIcon,
      backgroundColor: "#FFF7D9",
      avatarColor: "#FFA534",
      title: `Faulty Meters ${twoMB}`,
      count: dashboardCounts.totalFaultyBeforeTwoMonths,
      onClick: () => {
        openSingleTable('faultyBefore');
      }
    },
    {
      IconComponent: AccessTimeFilledIcon,
      backgroundColor: "#F6F7F8",
      avatarColor: "#D97706",
      // title: "Overdue Bills",
      title: `Overdue Bills (${currentMonthYear} & ${previousMonthCYear})`,
      count: dashboardCounts.passedDueDateCount,
      onClick: () => {
        openSingleTable('overdue');
      }
    },
    ...(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office') ? [{
      IconComponent: Person2OutlinedIcon,
      backgroundColor: "#F6F7F9",
      avatarColor: "#374151",
      title: "Total Users",
      count: roles.length
    }] : [])
  ];

  return (
    <div style={{
      ...gridStyle,
      marginTop: isSidebarOpen ? '1%' : '4%',
    }} className="containerhome">

      {/* Responsive Cards Grid */}
      <Grid container spacing={2} className="info-card-container"
      sx={{
        pl:{
          md:isSidebarOpen?'18%':'6%',
           xs:'20%'
        },
      }}

      >
        {cardData.map((card, index) => (
          <Grid
          sx={{
          }}
            item
            key={index}
            xs={11}
             sm={isSidebarOpen ? 5 : 5}
            md={isSidebarOpen ? 3 : 3}
          lg={isSidebarOpen ? 2.4 : 2.3}
            xl={isSidebarOpen ? 2.4 : 2.3}
          >
            <InfoCard
              IconComponent={card.IconComponent}
              backgroundColor={card.backgroundColor}
              className="container-infocard"
              avatarColor={card.avatarColor}
              avatarIcon="M"
              title={card.title}
              count={card.count}
              onClick={card.onClick}
            />
          </Grid>
        ))}
      </Grid>

      {/* Modal Tables Section - Only one table shows at a time */}
      {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer'|| (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
        <>
          {/* Consumer Table Modal */}
          <Modal
            open={showConsumerTable}
            onClose={() => setShowConsumerTable(false)}
            aria-labelledby="consumer-table-modal"
          >
            <Box sx={modalStyle}>
              <Wardnamecount onClose={() => setShowConsumerTable(false)} />
            </Box>
          </Modal>

          {/* Current Month Paid Bills Modal */}
          <Modal
            open={showCMonthPaidTable}
            onClose={() => setShowCMonthPaidTable(false)}
            aria-labelledby="current-paid-table-modal"
          >
            <Box sx={modalStyle}>
              <PaidBillCurrentMonth onClose={() => setShowCMonthPaidTable(false)} />
            </Box>
          </Modal>

          {/* Previous Month Paid Bills Modal */}
          <Modal
            open={showPMonthPaidTable}
            onClose={() => setShowPMonthPaidTable(false)}
            aria-labelledby="previous-paid-table-modal"
          >
            <Box sx={modalStyle}>
              <PaidBillPreviousMonth onClose={() => setShowPMonthPaidTable(false)} />
            </Box>
          </Modal>

          {/* Average Meters Modal */}
          <Modal
            open={showCMonthAvgTable}
            onClose={() => setShowCMonthAvgTable(false)}
            aria-labelledby="average-meters-table-modal"
          >
            <Box sx={modalStyle}>
              <AverageMetersCurrentMonth onClose={() => setShowCMonthAvgTable(false)} />
            </Box>
          </Modal>

          {/* Faulty Meters Modal */}
          <Modal
            open={showCMonthFaultyTable}
            onClose={() => setShowCMonthFaultyTable(false)}
            aria-labelledby="faulty-meters-table-modal"
          >
            <Box sx={modalStyle}>
              <FaultyMetersCurrentMonth onClose={() => setShowCMonthFaultyTable(false)} />
            </Box>
          </Modal>

          {/* Upcoming Due Bills Modal */}
          <Modal
            open={showCMonthUDueBill}
            onClose={() => setshowCMonthUDueBill(false)}
            aria-labelledby="upcoming-due-bills-table-modal"
          >
            <Box sx={modalStyle}>
              <UpcomingDueBillCurrentMonth onClose={() => setshowCMonthUDueBill(false)} />
            </Box>
          </Modal>

          {/* Two Month Before Paid Bills Modal */}
          <Modal
            open={showPTwoMonthBeforePaidTable}
            onClose={() => setShowPTwoMonthBeforePaidTable(false)}
            aria-labelledby="two-month-paid-table-modal"
          >
            <Box sx={modalStyle}>
              <PaidBillpreviousTwoMonthBefore onClose={() => setShowPTwoMonthBeforePaidTable(false)} />
            </Box>
          </Modal>

          {/* Before Two Month Faulty Meters Modal */}
          <Modal
            open={showBeforeTwoMonthFaultyTable}
            onClose={() => setShowBeforeTwoMonthFaultyTable(false)}
            aria-labelledby="before-two-month-faulty-table-modal"
          >
            <Box sx={modalStyle}>
              <FaultyMetersBeforeTwoMonth onClose={() => setShowBeforeTwoMonthFaultyTable(false)} />
            </Box>
          </Modal>

          {/* Overdue Bills Modal */}
          <Modal
            open={showOverdueBill}
            onClose={() => setShowOverdueBill(false)}
            aria-labelledby="overdue-bills-table-modal"
          >
            <Box sx={modalStyle}>
              <OverdueBillsTable onClose={() => setShowOverdueBill(false)} />
            </Box>
          </Modal>
        </>
      )}

      {/* Charts Section */}
      <Box sx={{
        width:{
          xs:'90%',
          md:isSidebarOpen?'85%':'96%'
        },
        ml:{
          md:isSidebarOpen?'15%':'4%',
          xs:'9%'
        },
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: { xs: 'column', md: 'row' },
        mt: 0,
        gap: { xs: 4, md: 0 },
        px: { xs: 2, sm: 3, md: 0 }
      }}>

        {/* Left Chart */}
        <Box sx={{
          width: { xs: '100%', sm: '100%', md: '48%', lg: '48%', xl: '48%' },
          height: { xs: '400px', md: '80%' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          mx: 0
        }}>
          <ChartComponent />
        </Box>

        {/* Right Chart */}
        <Box sx={{
          width: { xs: '100%', sm: '100%', md: '48%', lg: '48%', xl: '48%' },
          height: { xs: '400px', md: '80%' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          mx: 0
        }}>
          <PieChartBills />
        </Box>

      </Box>
    </div>
  );
};

export default Home;

