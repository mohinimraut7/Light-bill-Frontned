// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Typography,
//   IconButton
// } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';
// import { styled } from "@mui/material/styles";
// import { useSelector } from "react-redux";

// // Styled Components
// const StyledTableContainer = styled(TableContainer)({
//   marginTop: "2%",
//   borderRadius: "10px",
//   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//   overflow: "hidden",
// });
// const CloseButton = styled(IconButton)({
//   position: 'absolute',
//   top: 8,
//   right: 8,
//   backgroundColor: 'rgba(255, 255, 255, 0.9)',
//   zIndex: 1000,
//   '&:hover': {
//     backgroundColor: 'rgba(255, 255, 255, 1)',
//   }
// });
// const StyledTableHead = styled(TableHead)({
//   backgroundColor: "#FCAB44", // Red tone for overdue
// });

// const StyledHeaderCell = styled(TableCell)({
//   color: "#FFF",
//   fontWeight: "bold",
//   textAlign: "center",
// });

// const StyledRow = styled(TableRow)(({ index }) => ({
//   backgroundColor: index % 2 === 0 ? "#F5F5F5" : "#fff",
// }));

// const StyledCell = styled(TableCell)({
//   textAlign: "center",
//   fontSize: "14px",
//   fontWeight: "500",
// });

// // Function to convert "SEP-2024" to "September 2024"
// const convertMonthAndYear = (monthAndYear) => {
//   const [shortMonth, year] = monthAndYear.split("-");
//   const monthsMap = {
//     JAN: "JAN",
//     FEB: "FEB",
//     MAR: "MAR",
//     APR: "APR",
//     MAY: "MAY",
//     JUN: "JUN",
//     JUL: "JUL",
//     AUG: "AUG",
//     SEP: "SEP",
//     OCT: "OCT",
//     NOV: "NOV",
//     DEC: "DEC",
//   };

//   return `${monthsMap[shortMonth.toUpperCase()] || shortMonth}-${year}`;
// };

// const OverdueBillsTable = ({onClose}) => {
//   const { bills } = useSelector((state) => state.bills);
//   const user = useSelector((state) => state.auth.user);
//   const [overdueData, setOverdueData] = useState({});
//   const [loading, setLoading] = useState(true);

//   const allWards = [
//     "Ward-A",
//     "Ward-B",
//     "Ward-C",
//     "Ward-D",
//     "Ward-E",
//     "Ward-F",
//     "Ward-G",
//     "Ward-H",
//     "Ward-I",
//   ];

//   useEffect(() => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const data = {};

//     bills.forEach((bill) => {
//       const dueDate = new Date(bill.dueDate);
//       dueDate.setHours(0, 0, 0, 0);
//       const isOverdue = dueDate < today && bill.paymentStatus === "unpaid";

//       if (isOverdue) {
//         if (
//           user?.role === "Junior Engineer" &&
//           user?.ward !== bill.ward &&
//           user?.ward !== "Head Office"
//         ) {
//           return;
//         }

//         const ward = bill.ward;
//         const monthYear = bill.monthAndYear;

//         if (!data[ward]) {
//           data[ward] = {};
//         }

//         data[ward][monthYear] = (data[ward][monthYear] || 0) + 1;
//       }
//     });

//     setOverdueData(data);
//     setLoading(false);
//   }, [bills, user]);

//   return (
//     <StyledTableContainer
//       component={Paper}
//       sx={{ width:
//       {  
//       xs: '100%',
//       sm: '100%',
//       md: '100%',
//       lg: '100%',
//       xl: '100%',height:'100%'}
//     }}
//     >
//        <CloseButton onClick={onClose} size="small">
//           <CloseIcon fontSize="small" />
//         </CloseButton>
//       {loading ? (
//         <CircularProgress style={{ display: "block", margin: "20px auto" }} />
//       ) : (
//         <>
//           <Typography
//             align="center"
//             sx={{ fontWeight: "bold", fontSize: "14px", mt: 1, mb: 1 }}
//           >
//             Overdue Bills Count
//           </Typography>
//           <Table size="small">
//             <StyledTableHead>
//               <TableRow>
//                 <StyledHeaderCell>Ward</StyledHeaderCell>
//                 <StyledHeaderCell>Month</StyledHeaderCell>
//                 <StyledHeaderCell>Count</StyledHeaderCell>
//               </TableRow>
//             </StyledTableHead>
//             <TableBody>
//               {allWards.map((ward, index) => {
//                 const wardData = overdueData[ward] || {};
//                 const monthEntries = Object.entries(wardData);
//                 return monthEntries.length > 0 && (
//                   monthEntries.map(([month, count], i) => (
//                     <StyledRow key={`${ward}-${month}-${i}`} index={index + i}>
//                       <StyledCell>{ward}</StyledCell>
//                       <StyledCell>{convertMonthAndYear(month)}</StyledCell>
//                       <StyledCell>{count}</StyledCell>
//                     </StyledRow>
//                   ))
//                 ) 
//               })}
//             </TableBody>
//           </Table>
//         </>
//       )}
//     </StyledTableContainer>
//   );
// };

// export default OverdueBillsTable;

// ======================================================

// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Typography,
//   IconButton,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { styled } from "@mui/material/styles";
// import { baseUrl } from "../../config/config";

// // 📅 Helper to get month-year format like "OCT-2025"
// const getMonthYear = (date) => {
//   const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
//   return `${months[date.getMonth()]}-${date.getFullYear()}`;
// };

// // 🎨 Styled Components
// const StyledTableContainer = styled(TableContainer)({
//   marginTop: "2%",
//   borderRadius: "10px",
//   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//   overflow: "hidden",
// });

// const CloseButton = styled(IconButton)({
//   position: "absolute",
//   top: 8,
//   right: 8,
//   backgroundColor: "rgba(255, 255, 255, 0.9)",
//   zIndex: 1000,
//   "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
// });

// const StyledTableHead = styled(TableHead)({
//   backgroundColor: "#FCAB44",
// });

// const StyledHeaderCell = styled(TableCell)({
//   color: "#FFF",
//   fontWeight: "bold",
//   textAlign: "center",
// });

// const StyledRow = styled(TableRow)(({ index }) => ({
//   backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
// }));

// const StyledCell = styled(TableCell)({
//   textAlign: "center",
//   fontSize: "14px",
//   fontWeight: "500",
// });

// const OverdueBillsTable = ({ onClose }) => {
//   const [loading, setLoading] = useState(true);
//   const [overdueData, setOverdueData] = useState({});
//   const allWards = ["Ward-A", "Ward-B", "Ward-C", "Ward-D", "Ward-E", "Ward-F", "Ward-G", "Ward-H", "Ward-I"];

//   // 🔹 Function to fetch all bills from paginated API
//   const fetchAllBills = async () => {
//     try {
//       let allBills = [];
//       let currentPage = 1;
//       let totalPages = 1;

//       const firstPage = await fetch(`${baseUrl}/getBills?page=1&limit=100`);
//       const firstData = await firstPage.json();
//       allBills = [...firstData.bills];
//       totalPages = firstData.pagination.totalPages;

//       const promises = [];
//       for (let i = 2; i <= totalPages; i++) {
//         promises.push(fetch(`${baseUrl}/getBills?page=${i}&limit=100`).then((res) => res.json()));
//       }

//       const results = await Promise.all(promises);
//       results.forEach((r) => {
//         if (r?.bills) allBills.push(...r.bills);
//       });

//       return allBills;
//     } catch (error) {
//       console.error("Error fetching all bills:", error);
//       return [];
//     }
//   };

//   // 🔹 Calculate overdue counts (unpaid + dueDate < today)
//   useEffect(() => {
//     const loadOverdueData = async () => {
//       setLoading(true);
//       try {
//         const allBills = await fetchAllBills();

//         const today = new Date();
//         const currentMonth = getMonthYear(today);
//         const prevMonth = getMonthYear(new Date(today.getFullYear(), today.getMonth() - 1));

//         const data = {};

//         allBills.forEach((bill) => {
//           if (!bill?.dueDate || !bill?.monthAndYear || !bill?.ward) return;

//           const dueDate = new Date(bill.dueDate);
//           // const isOverdue = bill.paymentStatus?.toLowerCase() === "unpaid" && dueDate < today;
//           const isOverdue =
//           bill.paymentStatus &&
//           bill.paymentStatus.toLowerCase() === "unpaid" &&
//           dueDate instanceof Date &&
//           !isNaN(dueDate) &&
//           dueDate < today;


//           if (isOverdue && (bill.monthAndYear === currentMonth || bill.monthAndYear === prevMonth)) {
//             const ward = bill.ward;
//             if (!data[ward]) data[ward] = { [prevMonth]: 0, [currentMonth]: 0 };
//             data[ward][bill.monthAndYear] = (data[ward][bill.monthAndYear] || 0) + 1;
//           }
//         });

//         // Fill missing wards
//         const filledData = allWards.reduce((acc, ward) => {
//           acc[ward] = data[ward] || { [prevMonth]: 0, [currentMonth]: 0 };
//           return acc;
//         }, {});

//         setOverdueData(filledData);
//       } catch (err) {
//         console.error("Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadOverdueData();
//   }, []);

//   // 🔹 Prepare months for header
//   const today = new Date();
//   const currentMonth = getMonthYear(today);
//   const prevMonth = getMonthYear(new Date(today.getFullYear(), today.getMonth() - 1));

//   return (
//     <StyledTableContainer component={Paper}>
//       <CloseButton onClick={onClose} size="small">
//         <CloseIcon fontSize="small" />
//       </CloseButton>

//       {loading ? (
//         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
//           <CircularProgress />
//           <Typography sx={{ ml: 2 }}>Loading overdue bills...</Typography>
//         </div>
//       ) : (
//         <>
//           <Typography align="center" sx={{ fontWeight: "bold", fontSize: "14px", mt: 1, mb: 1 }}>
//             Overdue Bills Comparison ({prevMonth} & {currentMonth})
//           </Typography>
//           <Table size="small">
//             <StyledTableHead>
//               <TableRow>
//                 <StyledHeaderCell>Ward</StyledHeaderCell>
//                 <StyledHeaderCell>{prevMonth}</StyledHeaderCell>
//                 <StyledHeaderCell>{currentMonth}</StyledHeaderCell>
//               </TableRow>
//             </StyledTableHead>
//             <TableBody>
//               {allWards.map((ward, index) => (
//                 <StyledRow key={ward} index={index}>
//                   <StyledCell>{ward}</StyledCell>
//                   <StyledCell>{overdueData[ward]?.[prevMonth] || 0}</StyledCell>
//                   <StyledCell>{overdueData[ward]?.[currentMonth] || 0}</StyledCell>
//                 </StyledRow>
//               ))}
//             </TableBody>
//           </Table>
//         </>
//       )}
//     </StyledTableContainer>
//   );
// };

// export default OverdueBillsTable;

// ======================================

// import React, { useEffect, useMemo, useState } from 'react';
// import { useTheme } from '@mui/material/styles';
// import { useMediaQuery, Box, Grid, Modal } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUsers } from '../store/actions/userActions';
// import { fetchBills } from '../store/actions/billActions';
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
// import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
// import UpcomingIcon from '@mui/icons-material/Upcoming';
// import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
// import FactCheckIcon from '@mui/icons-material/FactCheck';

// // ✅ सगळ्या table components एकाच file मधून import करा (TableComponents.jsx)
// import {
//   PaidBillCurrentMonth,
//   PaidBillPreviousMonth,
//   PaidBillpreviousTwoMonthBefore,
//   FaultyMetersCurrentMonth,
//   FaultyMetersBeforeTwoMonth,
//   AverageMetersCurrentMonth,
//   OverdueBillsTable,
// } from '../components/table/TableComponents';
// import UpcomingDueBillCurrentMonth from '../components/table/UpcomingDueBillCurrenthMonth';
// import Wardnamecount from '../components/table/Wardnamecount';
// import PieChartBills from '../components/PieChartBills';
// import { upComingDueBills } from '../utils/DueBillHelper';
// import { baseUrl } from '../config/config';

// // ── Date helpers ───────────────────────────────────────────────────────────────
// const getMonthYear = (date) =>
//   date.toLocaleString('en-US', { month: 'short' }).toUpperCase() + '-' + date.getFullYear();

// const now = new Date();
// const currentMonthYear = getMonthYear(now);

// const prevDate = new Date(now); prevDate.setMonth(now.getMonth() - 1);
// const previousMonthCYear = getMonthYear(prevDate);

// const twoMonthDate = new Date(now); twoMonthDate.setMonth(now.getMonth() - 2);
// const previousTwoMonthCYear = getMonthYear(twoMonthDate);
// // ──────────────────────────────────────────────────────────────────────────────

// const allWards = ["Ward-A", "Ward-B", "Ward-C", "Ward-D", "Ward-E", "Ward-F", "Ward-G", "Ward-H", "Ward-I"];

// const Home = () => {
//   const dispatch = useDispatch();
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const user = useSelector(state => state.auth.user);

//   // ✅ Redux state - एकदाच fetch होतो
//   const { bills, loading: loadingBills } = useSelector((state) => state.bills);
//   const { roles, loading: loadingRoles, error: errorRoles } = useSelector((state) => state.roles);

//   const [totalConsumersCount, setTotalConsumersCount] = useState(0);
//   const [twoMB] = useState(previousTwoMonthCYear);

//   // Modal states
//   const [showConsumerTable, setShowConsumerTable] = useState(false);
//   const [showCMonthPaidTable, setShowCMonthPaidTable] = useState(false);
//   const [showPMonthPaidTable, setShowPMonthPaidTable] = useState(false);
//   const [showCMonthAvgTable, setShowCMonthAvgTable] = useState(false);
//   const [showCMonthUDueBill, setshowCMonthUDueBill] = useState(false);
//   const [showOverdueBill, setShowOverdueBill] = useState(false);
//   const [showPTwoMonthBeforePaidTable, setShowPTwoMonthBeforePaidTable] = useState(false);
//   const [showCMonthFaultyTable, setShowCMonthFaultyTable] = useState(false);
//   const [showBeforeTwoMonthFaultyTable, setShowBeforeTwoMonthFaultyTable] = useState(false);

//   // ── Ward filter helper ────────────────────────────────────────────────────
//   const wardFilter = (bill) => {
//     if (!user) return false;
//     if (user.role !== 'Junior Engineer') return true;
//     if (user.ward === 'Head Office') return true;
//     return bill.ward === user.ward;
//   };

//   // ✅ useMemo - bills बदलल्यावरच recalculate होतो, render प्रत्येक वेळी नाही
//   const dashboardCounts = useMemo(() => {
//     if (!bills.length || !user) return {
//       currentMonthPaidCount: 0, previousMonthPaidCount: 0, previousTwoMonthPaidCount: 0,
//       dueAlertCount: 0, passedDueDateCount: 0, totalFaultyCurrentMonth: 0,
//       totalFaultyBeforeTwoMonths: 0, averageMetersCount: 0
//     };

//     const today = new Date();
//     const prevMonthDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
//     const prevMonthYear = getMonthYear(prevMonthDate);

//     // Paid counts
//     const currentMonthPaidCount = bills.filter(b =>
//       b.paymentStatus === 'paid' && b.monthAndYear === currentMonthYear && wardFilter(b)
//     ).length;

//     const previousMonthPaidCount = bills.filter(b =>
//       b.paymentStatus === 'paid' && b.monthAndYear === previousMonthCYear && wardFilter(b)
//     ).length;

//     const previousTwoMonthPaidCount = bills.filter(b =>
//       b.paymentStatus === 'paid' && b.monthAndYear === previousTwoMonthCYear && wardFilter(b)
//     ).length;

//     // Due alerts
//     const dueAlertCount = upComingDueBills(bills, user).length;

//     // Overdue (current + prev month only)
//     const passedDueDateCount = bills.filter(b => {
//       const isOverdue = new Date(b.dueDate) < today;
//       const isUnpaid = b.paymentStatus === 'unpaid';
//       const isRelevantMonth = b.monthAndYear === currentMonthYear || b.monthAndYear === prevMonthYear;
//       return isOverdue && isUnpaid && isRelevantMonth && wardFilter(b);
//     }).length;

//     // Faulty meters
//     const totalFaultyCurrentMonth = bills.filter(b =>
//       b.meterStatus === "FAULTY" && b.monthAndYear === currentMonthYear && wardFilter(b)
//     ).length;

//     const totalFaultyBeforeTwoMonths = bills.filter(b =>
//       b.meterStatus === "FAULTY" && b.monthAndYear === previousTwoMonthCYear && wardFilter(b)
//     ).length;

//     // Average meters (unique by CN, latest bill)
//     const uniqueBills = bills
//       .slice().sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
//       .filter((b, i, self) => i === self.findIndex(x => x.cn === b.cn));

//     const averageMetersCount = uniqueBills.filter(b => b.meterStatus === 'Average').length;

//     return {
//       currentMonthPaidCount, previousMonthPaidCount, previousTwoMonthPaidCount,
//       dueAlertCount, passedDueDateCount, totalFaultyCurrentMonth,
//       totalFaultyBeforeTwoMonths, averageMetersCount
//     };
//   }, [bills, user]);

//   // ✅ Consumers count - फक्त 1 API call (pagination info साठी)
//   useEffect(() => {
//     if (!user) return;
//     const fetchConsumersCount = async () => {
//       try {
//         if (user.role === 'Junior Engineer' && user.ward !== 'Head Office') {
//           const res = await fetch(`${baseUrl}/getConsumers?page=1&limit=1&ward=${encodeURIComponent(user.ward)}`);
//           const data = await res.json();
//           setTotalConsumersCount(data.pagination?.totalConsumers || 0);
//         } else {
//           const res = await fetch(`${baseUrl}/getConsumers?page=1&limit=1`);
//           const data = await res.json();
//           setTotalConsumersCount(data.pagination?.totalConsumers || 0);
//         }
//       } catch (e) { setTotalConsumersCount(0); }
//     };
//     fetchConsumersCount();
//   }, [user]);

//   // ✅ एकदाच dispatch - reload झाला तरी परत call होणार नाही
//   useEffect(() => {
//     dispatch(fetchUsers());
//     dispatch(fetchBills());
//     dispatch(getMasters());
//     dispatch(fetchRoles());
//     dispatch(fetchMeters());
//     dispatch(fetchConsumers());
//     document.body.classList.add('home-body');
//     return () => document.body.classList.remove('home-body');
//   }, [dispatch]);

//   const closeAllTables = () => {
//     setShowConsumerTable(false); setShowCMonthPaidTable(false); setShowPMonthPaidTable(false);
//     setShowCMonthAvgTable(false); setshowCMonthUDueBill(false); setShowOverdueBill(false);
//     setShowPTwoMonthBeforePaidTable(false); setShowCMonthFaultyTable(false); setShowBeforeTwoMonthFaultyTable(false);
//   };

//   const openSingleTable = (tableToShow) => {
//     closeAllTables();
//     const map = {
//       consumer: setShowConsumerTable, currentPaid: setShowCMonthPaidTable,
//       previousPaid: setShowPMonthPaidTable, average: setShowCMonthAvgTable,
//       faulty: setShowCMonthFaultyTable, upcoming: setshowCMonthUDueBill,
//       twoMonthPaid: setShowPTwoMonthBeforePaidTable, faultyBefore: setShowBeforeTwoMonthFaultyTable,
//       overdue: setShowOverdueBill,
//     };
//     if (map[tableToShow]) map[tableToShow](true);
//   };

//   const theme = useTheme();
//   const isSm = useMediaQuery(theme.breakpoints.down('sm'));

//   if (loadingRoles) {
//     return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
//   }

//   const isAdminRole = user?.role === 'Super Admin' || user?.role === 'Admin' ||
//     user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office');

//   const cardData = [
//     { IconComponent: ElectricMeterOutlinedIcon, backgroundColor: "#EAEFF5", avatarColor: "#475569", title: "Total Meters", count: totalConsumersCount, onClick: () => openSingleTable('consumer') },
//     { IconComponent: FactCheckIcon, backgroundColor: "#E7F1FF", avatarColor: "#2563EB", title: `Paid Bills (${currentMonthYear})`, count: dashboardCounts.currentMonthPaidCount, onClick: () => openSingleTable('currentPaid') },
//     { IconComponent: FactCheckIcon, backgroundColor: "#E6FCED", avatarColor: "#16A34A", title: `Paid Bills (${previousMonthCYear})`, count: dashboardCounts.previousMonthPaidCount, onClick: () => openSingleTable('previousPaid') },
//     { IconComponent: ElectricMeterOutlinedIcon, backgroundColor: "#F6EEFF", avatarColor: "#9333EA", title: "Total Average Meters", count: dashboardCounts.averageMetersCount, onClick: () => openSingleTable('average') },
//     { IconComponent: ErrorOutlinedIcon, backgroundColor: "#FEEAEA", avatarColor: "#DC2626", title: "Total Faulty Meters", count: dashboardCounts.totalFaultyCurrentMonth, onClick: () => openSingleTable('faulty') },
//     { IconComponent: UpcomingIcon, backgroundColor: "#E8EDFF", avatarColor: "#4F46E5", title: "Upcoming Due Bills", count: dashboardCounts.dueAlertCount, onClick: () => openSingleTable('upcoming') },
//     ...(isAdminRole ? [{ IconComponent: FactCheckIcon, backgroundColor: "#DCFCF5", avatarColor: "#0D9488", title: `Paid Bills (${previousTwoMonthCYear})`, count: dashboardCounts.previousTwoMonthPaidCount, onClick: () => openSingleTable('twoMonthPaid') }] : []),
//     { IconComponent: ErrorOutlinedIcon, backgroundColor: "#FFF7D9", avatarColor: "#FFA534", title: `Faulty Meters ${twoMB}`, count: dashboardCounts.totalFaultyBeforeTwoMonths, onClick: () => openSingleTable('faultyBefore') },
//     { IconComponent: AccessTimeFilledIcon, backgroundColor: "#F6F7F8", avatarColor: "#D97706", title: `Overdue Bills (${currentMonthYear} & ${previousMonthCYear})`, count: dashboardCounts.passedDueDateCount, onClick: () => openSingleTable('overdue') },
//     ...(isAdminRole ? [{ IconComponent: Person2OutlinedIcon, backgroundColor: "#F6F7F9", avatarColor: "#374151", title: "Total Users", count: roles.length }] : []),
//   ];

//   const modalStyle = {
//     position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)',
//     bgcolor: 'background.paper', boxShadow: 24, p: 0, borderRadius: '10px',
//     width: '50%', overflow: 'auto', outline: 'none',
//   };

//   return (
//     <div style={{ marginTop: isSidebarOpen ? '1%' : '4%' }} className="containerhome">

//       {/* Cards */}
//       <Grid container spacing={2} className="info-card-container" sx={{ pl: { md: isSidebarOpen ? '18%' : '6%', xs: '20%' } }}>
//         {cardData.map((card, index) => (
//           <Grid item key={index} xs={11} sm={5} md={3} lg={isSidebarOpen ? 2.4 : 2.3} xl={isSidebarOpen ? 2.4 : 2.3}>
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

//       {/* Modals */}
//       {isAdminRole && (
//         <>
//           <Modal open={showConsumerTable} onClose={() => setShowConsumerTable(false)}>
//             <Box sx={modalStyle}><Wardnamecount onClose={() => setShowConsumerTable(false)} /></Box>
//           </Modal>
//           <Modal open={showCMonthPaidTable} onClose={() => setShowCMonthPaidTable(false)}>
//             <Box sx={modalStyle}><PaidBillCurrentMonth onClose={() => setShowCMonthPaidTable(false)} /></Box>
//           </Modal>
//           <Modal open={showPMonthPaidTable} onClose={() => setShowPMonthPaidTable(false)}>
//             <Box sx={modalStyle}><PaidBillPreviousMonth onClose={() => setShowPMonthPaidTable(false)} /></Box>
//           </Modal>
//           <Modal open={showCMonthAvgTable} onClose={() => setShowCMonthAvgTable(false)}>
//             <Box sx={modalStyle}><AverageMetersCurrentMonth onClose={() => setShowCMonthAvgTable(false)} /></Box>
//           </Modal>
//           <Modal open={showCMonthFaultyTable} onClose={() => setShowCMonthFaultyTable(false)}>
//             <Box sx={modalStyle}><FaultyMetersCurrentMonth onClose={() => setShowCMonthFaultyTable(false)} /></Box>
//           </Modal>
//           <Modal open={showCMonthUDueBill} onClose={() => setshowCMonthUDueBill(false)}>
//             <Box sx={modalStyle}><UpcomingDueBillCurrentMonth onClose={() => setshowCMonthUDueBill(false)} /></Box>
//           </Modal>
//           <Modal open={showPTwoMonthBeforePaidTable} onClose={() => setShowPTwoMonthBeforePaidTable(false)}>
//             <Box sx={modalStyle}><PaidBillpreviousTwoMonthBefore onClose={() => setShowPTwoMonthBeforePaidTable(false)} /></Box>
//           </Modal>
//           <Modal open={showBeforeTwoMonthFaultyTable} onClose={() => setShowBeforeTwoMonthFaultyTable(false)}>
//             <Box sx={modalStyle}><FaultyMetersBeforeTwoMonth onClose={() => setShowBeforeTwoMonthFaultyTable(false)} /></Box>
//           </Modal>
//           <Modal open={showOverdueBill} onClose={() => setShowOverdueBill(false)}>
//             <Box sx={modalStyle}><OverdueBillsTable onClose={() => setShowOverdueBill(false)} /></Box>
//           </Modal>
//         </>
//       )}

//       {/* Charts */}
//       <Box sx={{
//         width: { xs: '90%', md: isSidebarOpen ? '85%' : '96%' },
//         ml: { md: isSidebarOpen ? '15%' : '4%', xs: '9%' },
//         display: 'flex', justifyContent: 'space-around',
//         flexDirection: { xs: 'column', md: 'row' },
//         mt: 0, gap: { xs: 4, md: 0 }, px: { xs: 2, sm: 3, md: 0 }
//       }}>
//         <Box sx={{ width: { xs: '100%', md: '48%' }, height: { xs: '400px', md: '80%' }, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
//           <ChartComponent />
//         </Box>
//         <Box sx={{ width: { xs: '100%', md: '48%' }, height: { xs: '400px', md: '80%' }, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
//           <PieChartBills />
//         </Box>
//       </Box>
//     </div>
//   );
// };

// export default Home;

// =====================================================

import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

// ── Date helpers ──────────────────────────────────────────────
const getMonthYear = (date) => {
  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  return `${months[date.getMonth()]}-${date.getFullYear()}`;
};

const today = new Date();
const currentMonth = getMonthYear(today);
const prevMonth = getMonthYear(new Date(today.getFullYear(), today.getMonth() - 1));
const allWards = ["Ward-A","Ward-B","Ward-C","Ward-D","Ward-E","Ward-F","Ward-G","Ward-H","Ward-I"];

// ── Styled Components ─────────────────────────────────────────
const StyledTableContainer = styled(TableContainer)({
  marginTop: "2%", borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.2)", overflow: "hidden",
});
const CloseButton = styled(IconButton)({
  position: "absolute", top: 8, right: 8,
  backgroundColor: "rgba(255,255,255,0.9)", zIndex: 1000,
  "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
});
const StyledTableHead = styled(TableHead)({ backgroundColor: "#FCAB44" });
const StyledHeaderCell = styled(TableCell)({ color: "#FFF", fontWeight: "bold", textAlign: "center" });
const StyledRow = styled(TableRow)(({ index }) => ({
  backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
}));
const StyledCell = styled(TableCell)({ textAlign: "center", fontSize: "14px", fontWeight: "500" });

// ── Component ─────────────────────────────────────────────────
const OverdueBillsTable = ({ onClose }) => {
  // ✅ Redux bills - no fetch!
  const { bills } = useSelector((state) => state.bills);

  // Calculate overdue data directly from Redux bills
  const data = allWards.reduce((acc, w) => {
    acc[w] = { [prevMonth]: 0, [currentMonth]: 0 };
    return acc;
  }, {});

  bills.forEach((bill) => {
    if (!bill?.dueDate || !bill?.monthAndYear || !bill?.ward) return;
    const dueDate = new Date(bill.dueDate);
    const isOverdue =
      bill.paymentStatus?.toLowerCase() === "unpaid" &&
      dueDate instanceof Date && !isNaN(dueDate) && dueDate < today;
    const isRelevantMonth =
      bill.monthAndYear === currentMonth || bill.monthAndYear === prevMonth;

    if (isOverdue && isRelevantMonth && data[bill.ward]) {
      data[bill.ward][bill.monthAndYear]++;
    }
  });

  return (
    <StyledTableContainer component={Paper} sx={{ width: "100%" }}>
      <CloseButton onClick={onClose} size="small">
        <CloseIcon fontSize="small" />
      </CloseButton>

      <Typography align="center" sx={{ fontWeight: "bold", fontSize: "14px", mt: 1, mb: 1 }}>
        Overdue Bills Comparison ({prevMonth} &amp; {currentMonth})
      </Typography>

      <Table size="small">
        <StyledTableHead>
          <TableRow>
            <StyledHeaderCell>Ward</StyledHeaderCell>
            <StyledHeaderCell>{prevMonth}</StyledHeaderCell>
            <StyledHeaderCell>{currentMonth}</StyledHeaderCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {allWards.map((ward, index) => (
            <StyledRow key={ward} index={index}>
              <StyledCell>{ward}</StyledCell>
              <StyledCell>{data[ward]?.[prevMonth] || 0}</StyledCell>
              <StyledCell>{data[ward]?.[currentMonth] || 0}</StyledCell>
            </StyledRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default OverdueBillsTable;