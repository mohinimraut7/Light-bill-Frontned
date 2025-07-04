
// import React, { useEffect,useState } from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import { Button, useMediaQuery } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUsers } from '../store/actions/userActions';
// import {fetchBills} from '../store/actions/billActions';
// import { fetchRoles } from '../store/actions/roleActions';
// import { fetchMeters } from '../store/actions/meterActions';
// import { fetchConsumers } from '../store/actions/consumerActions';

// import { getMasters } from '../store/actions/masterActions';
// import InfoCard from '../components/cards/InfoCard';
// import { CircularProgress, Box } from '@mui/material';
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



// const Home = () => {
//   const dispatch = useDispatch();
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//     const user = useSelector(state => state.auth.user);
//   const { bills, loading: loadingBills, error: errorBills } = useSelector((state) => state.bills);
//   const { meters, loading: loadingMeters, error: errorUsers } = useSelector((state) => state.meters);
//   const { consumers, loading: loadingConsumers, error: errorConsumers } = useSelector((state) => state.consumers);

//   const { roles, loading: loadingRoles, error: errorRoles } = useSelector((state) => state.roles);
//   const { masters, loading: loadingMasters, error: errorMasters } = useSelector((state) => state.masters);
//   const [showConsumerTable, setShowConsumerTable] = useState(false);
//   const [showCMonthPaidTable, setShowCMonthPaidTable] = useState(false);
//   const [showPMonthPaidTable, setShowPMonthPaidTable] = useState(false);
//   const [showCMonthAvgTable, setShowCMonthAvgTable] = useState(false);
//   const [showCMonthUDueBill, setshowCMonthUDueBill] = useState(false);
//   const [showOverdueBill, setShowOverdueBill] = useState(false);

// const [showPTwoMonthBeforePaidTable,setShowPTwoMonthBeforePaidTable]=useState(false);
//   const allWards = ["Ward-A", "Ward-B", "Ward-C", "Ward-D", "Ward-E", "Ward-F", "Ward-G", "Ward-H", "Ward-I"];
//   const [wardFaultyCounts, setWardFaultyCounts] = useState({});
//   const [totalFaultyMeters, setTotalFaultyMeters] = useState(0);
//   const [showCMonthFaultyTable, setShowCMonthFaultyTable] = useState(false);
//   const [totalFaultyMetersBeforeTwo, setTotalFaultyMetersBeforeTwo] = useState(0);

//   const [showBeforeTwoMonthFaultyTable, setShowBeforeTwoMonthFaultyTable] = useState(false);
// const[twoMB,setTwoMB]=useState('');
 

//   useEffect(() => {
//     if (!loadingBills && bills.length > 0 && user) {  // 🔹 user असला पाहिजे
//       const counts = bills.reduce((acc, bill) => {
//         if (
//           bill.meterStatus === "FAULTY" && 
//           bill.monthAndYear === currentMonthYear && 
//           (user.role !== "Junior Engineer" || bill.ward === user.ward ||(user.role === "Junior Engineer" && user.ward === "Head Office"))  // 🔹 जर Junior Engineer असेल, तर फक्त त्याच्या वॉर्डचा डेटा
//         ) {
//           const ward = bill.ward;
//           acc[ward] = (acc[ward] || 0) + 1;
//         }
//         return acc;
//       }, {});
  
//       // Ensure all wards are present
//       const finalCounts = allWards.reduce((acc, ward) => {
//         acc[ward] = counts[ward] || 0;
//         return acc;
//       }, {});
  
//       const totalFaulty = Object.values(finalCounts).reduce((sum, count) => sum + count, 0);
  
//       setWardFaultyCounts(finalCounts);
//       setTotalFaultyMeters(totalFaulty);





// const prevDateTMB = new Date();
// prevDateTMB.setMonth(prevDateTMB.getMonth() - 2);  // 👉 2 months back

// const prevMonthTMB = prevDateTMB.toLocaleString("en-US", { month: "short" }).toUpperCase();  // eg. FEB
// const prevTwoMonthYear = `${prevMonthTMB}-${currentYear}`;  // 👈 Use currentYear here
// setTwoMB(prevTwoMonthYear);
// const beforeTwoCounts = bills.reduce((acc, bill) => {
//   if (
//     bill.meterStatus === "FAULTY" &&
//     bill.monthAndYear === prevTwoMonthYear &&
//     (user.role !== "Junior Engineer" || bill.ward === user.ward || (user.role === "Junior Engineer" && user.ward === "Head Office"))
//   ) {
//     const ward = bill.ward;
//     acc[ward] = (acc[ward] || 0) + 1;
//   }
//   return acc;
// }, {});

// const totalBeforeTwo = Object.values(beforeTwoCounts).reduce((sum, count) => sum + count, 0);
// setTotalFaultyMetersBeforeTwo(totalBeforeTwo);



//     }
//   }, [bills, loadingBills, user]);

  
// const uniqueBills = bills
//   .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)) 
//   .filter((bill, index, self) => {
//     return index === self.findIndex(b => b.cn === bill.cn);
//   });
  
// const meterStatusCounts = uniqueBills.reduce((acc, bill) => {
//     if (bill.meterStatus === 'Faulty') {
//         acc.Faulty += 1;
//     } else if (bill.meterStatus === 'Average') {
//         acc.Average += 1;
//     }
//     return acc;
// }, { Faulty: 0, Average: 0 });

// const upcomingOverdueCount = bills.filter(bill => bill.dueAlert === true).length;




// const filteredConsumers = consumers?.filter(consumer => {
//   // return user?.role === 'Junior Engineer' ? consumer.ward === user.ward : true;
//   return user?.role === 'Junior Engineer' && user?.ward !== 'Head Office' 
//   ? consumer.ward === user.ward 
//   : true;
// });

// const today = new Date(); 



// const dueAlertrows = upComingDueBills(bills, user);

// const dueAlertCount = dueAlertrows.length;

// const passedDueDateCount = bills.filter(bill => {
//   const dueDate = new Date(bill.dueDate);
//   const isOverdue = dueDate < today;
//   const isUnpaid = bill.paymentStatus === 'unpaid';

//   if (user?.role === 'Junior Engineer' && user?.ward !== 'Head Office') {
//     return isOverdue && isUnpaid && user?.ward === bill.ward;
//   }
//   return isOverdue && isUnpaid;
// }).length;




// const currentDate = new Date();
// const currentMonth = currentDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
// const currentYear = currentDate.getFullYear();
// const currentMonthYear = `${currentMonth}-${currentYear}`;


// const prevDate = new Date(currentDate);
// prevDate.setMonth(prevDate.getMonth() - 1);
// const previousMonth = prevDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
// const previousYear = prevDate.getFullYear();
// const previousMonthCYear = `${previousMonth}-${currentYear}`;


// const prevDateTwo = new Date(currentDate);
// prevDateTwo.setMonth(prevDateTwo.getMonth() - 2);
// const previousTwoMonth = prevDateTwo.toLocaleString('en-US', { month: 'short' }).toUpperCase();
// // const previousYear = prevDate.getFullYear();
// const previousTwoMonthCYear = `${previousTwoMonth}-${currentYear}`;


// const currentMonthPaidCount = bills.filter(bill => 
//   bill.paymentStatus === 'paid' 
//   && bill.monthAndYear === currentMonthYear &&
//   (user.role !== "Junior Engineer"|| user.ward === "Head Office" || bill.ward === user.ward) 
// ).length;

// const previousMonthPaidCount = bills.filter(bill => 
//   bill.paymentStatus === 'paid' && bill.monthAndYear === previousMonthCYear &&
//   (user.role !== "Junior Engineer"|| user.ward === "Head Office" || bill.ward === user.ward) 
// ).length;


// const previousMonthBills = bills.filter(bill => bill.monthAndYear === previousMonthCYear);
// // Total Bills Count for previous month
// const previousMonthTotalCount = previousMonthBills.length;

// const previousTwoMonthPaidCount = bills.filter(bill => 
//   bill.paymentStatus === 'paid' && bill.monthAndYear === previousTwoMonthCYear &&
//   (user.role !== "Junior Engineer"|| user.ward === "Head Office" || bill.ward === user.ward) 
// ).length;


//   const theme = useTheme();
//   const isXs = useMediaQuery(theme.breakpoints.down('xs'));
//   const isSm = useMediaQuery(theme.breakpoints.down('sm'));
//   const isMd = useMediaQuery(theme.breakpoints.down('md'));
//   const isLg = useMediaQuery(theme.breakpoints.down('lg'));
//   const isXl = useMediaQuery(theme.breakpoints.down('xl'));
//   useEffect(() => {
//     dispatch(fetchUsers());
//     dispatch(fetchBills());
//     dispatch(getMasters());
//     dispatch(fetchRoles());
//     dispatch(fetchMeters());
//     dispatch(fetchConsumers());
//     document.body.classList.add('home-body');
//     return () => {
     
//       document.body.classList.remove('home-body');
//     };

//   }, [dispatch]);

//   if ( loadingRoles) {
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
//     width: '100%',
    
//     width: isSm || isXs ? '80%' : isSidebarOpen ? '90%' : '99%',
  
//   marginLeft: isSm || isXs ? '60px' : isSidebarOpen ? '12%' : '3%',
 
//   // display: 'flex',
//   // justifyContent: 'center',
//   // alignContent: 'center',
//   // alignItems:'center'
//   };
  
//   return (
//     <div style={{
//     ...gridStyle,
//     marginTop: isSidebarOpen ? '1%' : '4%',
//   }} className="containerhome">
//      <div className="info-card-container" sx={{width: isSm || isXs? '100%' : '30%'}}
//      >
// <InfoCard
// IconComponent={ElectricMeterOutlinedIcon}
// // backgroundColor="#fff9ed"
// backgroundColor="#EAEFF5"
//   className="container-infocard"
//   avatarColor="#475569"
//   avatarIcon="M"
//   title="Total Meters"
//   count={filteredConsumers.length}
//   onClick={() => {
//     setShowConsumerTable(prev => !prev);
//     console.log("showConsumerTable:", !showConsumerTable); // Debug log
//   }}
// />
// <InfoCard
// // IconComponent={PaidIcon}
// IconComponent={FactCheckIcon}
// // backgroundColor="#f8fffc"
// backgroundColor="#E7F1FF"
//   className="container-infocard"
//   // avatarColor="#1976D2"
// avatarColor="#2563EB"
//   avatarIcon="M"
//   title={`Paid Bills (${currentMonthYear})`}
//   count={currentMonthPaidCount}
//   onClick={() => {
//     setShowCMonthPaidTable(prev => !prev);
//   }}
// />
// <InfoCard
//   // IconComponent={CurrencyRupeeOutlinedIcon}
//   IconComponent={FactCheckIcon}
//   // backgroundColor="#f3f8fe"
//  backgroundColor="#E6FCED"
//   className="container-infocard"
//   // avatarColor="#1976D2"
// avatarColor="#16A34A"
//   avatarIcon="M"
//   title={`Paid Bills (${previousMonthCYear})`}
//   count={previousMonthPaidCount}
//   onClick={() => {
//     setShowPMonthPaidTable(prev => !prev);
//   }}
// />




// {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer'|| (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) &&
//  (showConsumerTable || showCMonthPaidTable || showPMonthPaidTable || showPTwoMonthBeforePaidTable) && (
//   <Box sx={{
//     display: 'flex',
//     flexDirection: {
//       xl: 'row',
//       lg: 'row',
//       md: 'row',
//       sm: 'column',
//       xs: 'column'
//     },
//     width: '100%',
//     justifyContent: {
//       lg: 'space-around',
//       xl: 'space-around',
//       sm: 'center',
//       xs: 'space-between'
//     },
//     pl: { xl: '0%', lg: '0%', sm: '0%', xs: '0%' },
//     mt: { xl: 5, lg: 5 },
//     mb: { xl: 8, lg: 8 }
//   }}>
//     {showConsumerTable && <Wardnamecount />}
//     {showCMonthPaidTable && <PaidBillCurrentMonth />}
//     {showPMonthPaidTable && <PaidBillPreviousMonth />}
//     {/* {showPTwoMonthBeforePaidTable && <PaidBillpreviousTwoMonthBefore />} */}
//   </Box>
// )}


// <InfoCard
// IconComponent={ElectricMeterOutlinedIcon}
// // backgroundColor="#FFF9ED"
// backgroundColor="#F6EEFF"
//   className="container-infocard"
//   // avatarColor="#06763C"
// avatarColor="#9333EA"
//   avatarIcon="M"
//   title="Total Average Meters"
//   count={meterStatusCounts.Average}
//   onClick={() => {
//     setShowCMonthAvgTable(prev => !prev);
//   }}
// />
// <InfoCard
// IconComponent={ErrorOutlinedIcon}
// // backgroundColor="#F8FFFC"
// backgroundColor="#FEEAEA"

//   className="container-infocard"
//   // avatarColor="#FFA534"
// avatarColor="#DC2626"
//   avatarIcon="M"
//   title="Total Faulty Meters"
//   // count={meterStatusCounts.Faulty}
//   count={ totalFaultyMeters}
//   onClick={() => {
//     setShowCMonthFaultyTable(prev => !prev);
//   }}
// />
// <InfoCard
// // IconComponent={CurrencyRupeeOutlinedIcon}
// IconComponent={UpcomingIcon}
//   // backgroundColor='#F3F8FE'
// backgroundColor='#E8EDFF'
//   className="container-infocard"
//   // avatarColor="#fedadc"
// avatarColor="#4F46E5"

  
//   avatarIcon="M"
//   title="Upcoming Due Bills"
//   count={dueAlertCount}
//   onClick={() => {
//     setshowCMonthUDueBill(prev => !prev);
//   }}
// />


  

// {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) &&
//  (showCMonthAvgTable || showCMonthFaultyTable || showCMonthUDueBill) && (
//   <Box sx={{
//     display: 'flex',
//     flexDirection: {
//       xl: 'row',
//       lg: 'row',
//       md: 'row',
//       sm: 'column',
//       xs: 'column'
//     },
//     height: 'auto',
//     width: '100%',
//     justifyContent: {
//       lg: 'space-around',
//       xl: 'space-around',
//       sm: 'center',
//       xs: 'space-between'
//     },
//     pl: { xl: '0%', lg: '0%', sm: '0%', xs: '0%' },
//     mt: { xl: 5, lg: 5 },
//     mb: { xl: 8, lg: 8 }
//   }}>
//     {showCMonthAvgTable && <AverageMetersCurrentMonth />}
//     {showCMonthFaultyTable && <FaultyMetersCurrentMonth />}
//     {showCMonthUDueBill && <UpcomingDueBillCurrentMonth />}
//   </Box>
// )}



// {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer'|| (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (

// <InfoCard
//   // IconComponent={CurrencyRupeeOutlinedIcon}
//   IconComponent={FactCheckIcon}
//   // backgroundColor="#f3f8fe"
// backgroundColor="#DCFCF5"
//   className="container-infocard"
//   // avatarColor="#1976D2"
// avatarColor="#0D9488"
//   avatarIcon="M"
//   title={`Paid Bills (${previousTwoMonthCYear})`}
//   count={previousTwoMonthPaidCount}
//   onClick={() => {
//     setShowPTwoMonthBeforePaidTable(prev => !prev);
//   }}
// />
// )}


// <InfoCard
// IconComponent={ErrorOutlinedIcon}
// // backgroundColor="#F8FFFC"
// backgroundColor="#FFF7D9"
//   className="container-infocard"
//   avatarColor="#FFA534"
//   avatarIcon="M"
//  title={`Faulty Meters ${twoMB}`}
//   // count={meterStatusCounts.Faulty}
//   count={totalFaultyMetersBeforeTwo}
//   onClick={() => {
//     setShowBeforeTwoMonthFaultyTable(prev => !prev);
//   }}
// />



// <InfoCard
// IconComponent={AccessTimeFilledIcon}
// // backgroundColor="#f8fffc"
// backgroundColor="#F6F7F8"
//   className="container-infocard"
//   // avatarColor="#1976D2"
// avatarColor="#D97706"
//   avatarIcon="M"
//   title="Overdue Bills"
//   count={passedDueDateCount}
//   onClick={() => {
//     setShowOverdueBill(prev => !prev);
//   }}
// />
// {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
//   <Box sx={{
//     display: 'flex',
//     flexDirection: {
//       xl: 'row',
//       lg: 'row',
//       md: 'row',
//       sm: 'column',
//       xs: 'column'
//     },
//     width: '100%',
//     justifyContent: {
//       lg: 'space-around',
//       xl: 'space-around',
//       sm: 'center',
//       xs: 'space-between'
//     },
//     pl: { xl: '0%', lg: '0%', sm: '0%', xs: '0%' },
//   }}>
//     {showPTwoMonthBeforePaidTable && <PaidBillpreviousTwoMonthBefore />}
//     {showBeforeTwoMonthFaultyTable && <FaultyMetersBeforeTwoMonth />}
//     {showOverdueBill &&  <OverdueBillsTable />}
//   </Box>
// )}


// {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer'|| (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
//   <InfoCard
//   IconComponent={Person2OutlinedIcon}
// //  backgroundColor="#fff9ed"
//  backgroundColor="#F6F7F9"

//     className="container-infocard"
//     // avatarColor="#FB404B"
// // avatarColor="#4B5563"
// avatarColor="#374151"
    
//     avatarIcon="PersonIcon"
//     title="Total Users"
//     count={roles.length} 
//   />
// )}




//      </div>





//      {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer') && (<Box sx={{display:'flex',width:'100%',justifyContent:{lg:'flex-start',xl:'flex-start',sm:'center'},pl:{xl:'5%',lg:'5%',sm:'0%',xs:'0%'}}}></Box>)}
//      <Box sx={{width:'100%',display:'flex',justifyContent:'space-around',flexDirection:{xs:'column',md:'row',lg:'row',xl:'row'},mt:10}}>
//       <Box sx={{
//         width:{
//         xs:'100%',
//         sm:'90%',
//         md:'42%',
//         lg:'42%',
//         xl:'42%'
//       },
//       ml:{
       

//         xs:'0%',
//         sm:isSidebarOpen?'13%':'2%',
//         md:isSidebarOpen?'3%':'2%',
//         lg:'0%',
//         xl:'0%'
//       },
//       height:'80%',display:'flex',alignItems:'center',alignContent:'center',justifyContent:'center',flexDirection:'column'}}>
//       <h4 style={{color:'black'}}>Meter Status Of Months {previousMonth},{currentMonth}-{currentYear}</h4>
//       <ChartComponent />
//       </Box>
        
//       {/* <Box sx={{ width:{
//         xs:'100%',
//         md:'25%',
//         lg:'25%',
//         xl:'25%'
//       },mt:{
//         xs:10,
//         md:1,
//         lg:1,
//         xl:1
//       },
//       height:'80%',display:'flex',alignItems:'center',justifyContent:'center',alignContent:'center',flexDirection:'column'}}>
//       <h3 style={{color:'black'}}>Meters</h3>
//       <PieChartComponent />
//       </Box> */}

//       <Box sx={{ width:{
//         xs:'100%',
//         sm:'80%',
//         md:'42%',
//         lg:'42%',
//         xl:'42%'
//       },
//       ml:{
//         xs:'0%',
//         sm:isSidebarOpen?'13%':'2%',
//         md:'0%',
//         lg:'0%',
//         xl:'0%'
//       },
//       height:'80%',display:'flex',alignItems:'center',justifyContent:'center',alignContent:'center',flexDirection:'column',mt:{
//         xs:10,
//         md:1,
//         lg:1,
//         xl:1
//       },}}>
//       <h4 style={{color:'black'}}>Light Bill Payment Status of {currentYear}</h4>
//       <PieChartBills />
//       </Box>
//       </Box>
//     </div>
//   );
// };

// export default Home;

// ================================

// import React, { useEffect, useState } from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import { Button, useMediaQuery, Box, Grid } from '@mui/material';
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

// const Home = () => {
//   const dispatch = useDispatch();
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const user = useSelector(state => state.auth.user);
//   const { bills, loading: loadingBills, error: errorBills } = useSelector((state) => state.bills);
//   const { meters, loading: loadingMeters, error: errorUsers } = useSelector((state) => state.meters);
//   const { consumers, loading: loadingConsumers, error: errorConsumers } = useSelector((state) => state.consumers);
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
//     dispatch(fetchBills());
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
//     width: '100%',
//     width: isSm || isXs ? '80%' : isSidebarOpen ? '90%' : '99%',
//     marginLeft: isSm || isXs ? '60px' : isSidebarOpen ? '12%' : '3%',
//   };

//   // Card data array for easier management
//   const cardData = [
//     {
//       IconComponent: ElectricMeterOutlinedIcon,
//       backgroundColor: "#EAEFF5",
//       avatarColor: "#475569",
//       title: "Total Meters",
//       count: filteredConsumers.length,
//       onClick: () => {
//         setShowConsumerTable(prev => !prev);
//         console.log("showConsumerTable:", !showConsumerTable);
//       }
//     },
//     {
//       IconComponent: FactCheckIcon,
//       backgroundColor: "#E7F1FF",
//       avatarColor: "#2563EB",
//       title: `Paid Bills (${currentMonthYear})`,
//       count: currentMonthPaidCount,
//       onClick: () => {
//         setShowCMonthPaidTable(prev => !prev);
//       }
//     },
//     {
//       IconComponent: FactCheckIcon,
//       backgroundColor: "#E6FCED",
//       avatarColor: "#16A34A",
//       title: `Paid Bills (${previousMonthCYear})`,
//       count: previousMonthPaidCount,
//       onClick: () => {
//         setShowPMonthPaidTable(prev => !prev);
//       }
//     },
//     {
//       IconComponent: ElectricMeterOutlinedIcon,
//       backgroundColor: "#F6EEFF",
//       avatarColor: "#9333EA",
//       title: "Total Average Meters",
//       count: meterStatusCounts.Average,
//       onClick: () => {
//         setShowCMonthAvgTable(prev => !prev);
//       }
//     },
//     {
//       IconComponent: ErrorOutlinedIcon,
//       backgroundColor: "#FEEAEA",
//       avatarColor: "#DC2626",
//       title: "Total Faulty Meters",
//       count: totalFaultyMeters,
//       onClick: () => {
//         setShowCMonthFaultyTable(prev => !prev);
//       }
//     },
//     {
//       IconComponent: UpcomingIcon,
//       backgroundColor: "#E8EDFF",
//       avatarColor: "#4F46E5",
//       title: "Upcoming Due Bills",
//       count: dueAlertCount,
//       onClick: () => {
//         setshowCMonthUDueBill(prev => !prev);
//       }
//     },
//     ...(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office') ? [{
//       IconComponent: FactCheckIcon,
//       backgroundColor: "#DCFCF5",
//       avatarColor: "#0D9488",
//       title: `Paid Bills (${previousTwoMonthCYear})`,
//       count: previousTwoMonthPaidCount,
//       onClick: () => {
//         setShowPTwoMonthBeforePaidTable(prev => !prev);
//       }
//     }] : []),
//     {
//       IconComponent: ErrorOutlinedIcon,
//       backgroundColor: "#FFF7D9",
//       avatarColor: "#FFA534",
//       title: `Faulty Meters ${twoMB}`,
//       count: totalFaultyMetersBeforeTwo,
//       onClick: () => {
//         setShowBeforeTwoMonthFaultyTable(prev => !prev);
//       }
//     },
//     {
//       IconComponent: AccessTimeFilledIcon,
//       backgroundColor: "#F6F7F8",
//       avatarColor: "#D97706",
//       title: "Overdue Bills",
//       count: passedDueDateCount,
//       onClick: () => {
//         setShowOverdueBill(prev => !prev);
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
//       <Grid container spacing={2} className="info-card-container">
//         {cardData.map((card, index) => (
//           <Grid 
//             item 
//             key={index}
//             xs={12}  // 1 card per row on extra small screens
//             sm={12}  // 1 card per row on small screens
//             md={3}   // 4 cards per row on medium screens
//             lg={2.4} // 5 cards per row on large screens
//             xl={2.4} // 5 cards per row on extra large screens
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

//       {/* Tables Section */}
//       {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer'|| (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) &&
//        (showConsumerTable || showCMonthPaidTable || showPMonthPaidTable || showPTwoMonthBeforePaidTable) && (
//         <Box sx={{
//           display: 'flex',
//           flexDirection: {
//             xl: 'row',
//             lg: 'row',
//             md: 'row',
//             sm: 'column',
//             xs: 'column'
//           },
//           width: '100%',
//           justifyContent: {
//             lg: 'space-around',
//             xl: 'space-around',
//             sm: 'center',
//             xs: 'space-between'
//           },
//           pl: { xl: '0%', lg: '0%', sm: '0%', xs: '0%' },
//           mt: { xl: 5, lg: 5 },
//           mb: { xl: 8, lg: 8 }
//         }}>
//           {showConsumerTable && <Wardnamecount />}
//           {showCMonthPaidTable && <PaidBillCurrentMonth />}
//           {showPMonthPaidTable && <PaidBillPreviousMonth />}
//         </Box>
//       )}

//       {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) &&
//        (showCMonthAvgTable || showCMonthFaultyTable || showCMonthUDueBill) && (
//         <Box sx={{
//           display: 'flex',
//           flexDirection: {
//             xl: 'row',
//             lg: 'row',
//             md: 'row',
//             sm: 'column',
//             xs: 'column'
//           },
//           height: 'auto',
//           width: '100%',
//           justifyContent: {
//             lg: 'space-around',
//             xl: 'space-around',
//             sm: 'center',
//             xs: 'space-between'
//           },
//           pl: { xl: '0%', lg: '0%', sm: '0%', xs: '0%' },
//           mt: { xl: 5, lg: 5 },
//           mb: { xl: 8, lg: 8 }
//         }}>
//           {showCMonthAvgTable && <AverageMetersCurrentMonth />}
//           {showCMonthFaultyTable && <FaultyMetersCurrentMonth />}
//           {showCMonthUDueBill && <UpcomingDueBillCurrentMonth />}
//         </Box>
//       )}

//       {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
//         <Box sx={{
//           display: 'flex',
//           flexDirection: {
//             xl: 'row',
//             lg: 'row',
//             md: 'row',
//             sm: 'column',
//             xs: 'column'
//           },
//           width: '100%',
//           justifyContent: {
//             lg: 'space-around',
//             xl: 'space-around',
//             sm: 'center',
//             xs: 'space-between'
//           },
//           pl: { xl: '0%', lg: '0%', sm: '0%', xs: '0%' },
//         }}>
//           {showPTwoMonthBeforePaidTable && <PaidBillpreviousTwoMonthBefore />}
//           {showBeforeTwoMonthFaultyTable && <FaultyMetersBeforeTwoMonth />}
//           {showOverdueBill && <OverdueBillsTable />}
//         </Box>
//       )}

//       {/* Charts Section */}
//       {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer') && (
//         <Box sx={{display:'flex',width:'100%',justifyContent:{lg:'flex-start',xl:'flex-start',sm:'center'},pl:{xl:'5%',lg:'5%',sm:'0%',xs:'0%'}}}></Box>
//       )}
      
//       <Box sx={{width:'100%',display:'flex',justifyContent:'space-around',flexDirection:{xs:'column',md:'row',lg:'row',xl:'row'},mt:10}}>
//         <Box sx={{
//           width:{
//           xs:'100%',
//           sm:'90%',
//           md:'42%',
//           lg:'42%',
//           xl:'42%'
//         },
//         ml:{
//           xs:'0%',
//           sm:isSidebarOpen?'13%':'2%',
//           md:isSidebarOpen?'3%':'2%',
//           lg:'0%',
//           xl:'0%'
//         },
//         height:'80%',display:'flex',alignItems:'center',alignContent:'center',justifyContent:'center',flexDirection:'column'}}>
//         <h4 style={{color:'black'}}>Meter Status Of Months {previousMonth},{currentMonth}-{currentYear}</h4>
//         <ChartComponent />
//         </Box>

//         <Box sx={{ width:{
//           xs:'100%',
//           sm:'80%',
//           md:'42%',
//           lg:'42%',
//           xl:'42%'
//         },
//         ml:{
//           xs:'0%',
//           sm:isSidebarOpen?'13%':'2%',
//           md:'0%',
//           lg:'0%',
//           xl:'0%'
//         },
//         height:'80%',display:'flex',alignItems:'center',justifyContent:'center',alignContent:'center',flexDirection:'column',mt:{
//           xs:10,
//           md:1,
//           lg:1,
//           xl:1
//         },}}>
//         <h4 style={{color:'black'}}>Light Bill Payment Status of {currentYear}</h4>
//         <PieChartBills />
//         </Box>
//       </Box>
//     </div>
//   );
// };

// export default Home;
// ================================

// import React, { useEffect, useState } from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import { Button, useMediaQuery, Box, Grid } from '@mui/material';
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

// const Home = () => {
//   const dispatch = useDispatch();
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const user = useSelector(state => state.auth.user);
//   const { bills, loading: loadingBills, error: errorBills } = useSelector((state) => state.bills);
//   const { meters, loading: loadingMeters, error: errorUsers } = useSelector((state) => state.meters);
//   const { consumers, loading: loadingConsumers, error: errorConsumers } = useSelector((state) => state.consumers);
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

//   // Function to close all tables
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
//     dispatch(fetchBills());
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
//     width: '100%',
//     width: isSm || isXs ? '80%' : isSidebarOpen ? '90%' : '99%',
//     marginLeft: isSm || isXs ? '60px' : isSidebarOpen ? '12%' : '3%',
//   };

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
//       count: currentMonthPaidCount,
//       onClick: () => {
//         openSingleTable('currentPaid');
//       }
//     },
//     {
//       IconComponent: FactCheckIcon,
//       backgroundColor: "#E6FCED",
//       avatarColor: "#16A34A",
//       title: `Paid Bills (${previousMonthCYear})`,
//       count: previousMonthPaidCount,
//       onClick: () => {
//         openSingleTable('previousPaid');
//       }
//     },
//     {
//       IconComponent: ElectricMeterOutlinedIcon,
//       backgroundColor: "#F6EEFF",
//       avatarColor: "#9333EA",
//       title: "Total Average Meters",
//       count: meterStatusCounts.Average,
//       onClick: () => {
//         openSingleTable('average');
//       }
//     },
//     {
//       IconComponent: ErrorOutlinedIcon,
//       backgroundColor: "#FEEAEA",
//       avatarColor: "#DC2626",
//       title: "Total Faulty Meters",
//       count: totalFaultyMeters,
//       onClick: () => {
//         openSingleTable('faulty');
//       }
//     },
//     {
//       IconComponent: UpcomingIcon,
//       backgroundColor: "#E8EDFF",
//       avatarColor: "#4F46E5",
//       title: "Upcoming Due Bills",
//       count: dueAlertCount,
//       onClick: () => {
//         openSingleTable('upcoming');
//       }
//     },
//     ...(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office') ? [{
//       IconComponent: FactCheckIcon,
//       backgroundColor: "#DCFCF5",
//       avatarColor: "#0D9488",
//       title: `Paid Bills (${previousTwoMonthCYear})`,
//       count: previousTwoMonthPaidCount,
//       onClick: () => {
//         openSingleTable('twoMonthPaid');
//       }
//     }] : []),
//     {
//       IconComponent: ErrorOutlinedIcon,
//       backgroundColor: "#FFF7D9",
//       avatarColor: "#FFA534",
//       title: `Faulty Meters ${twoMB}`,
//       count: totalFaultyMetersBeforeTwo,
//       onClick: () => {
//         openSingleTable('faultyBefore');
//       }
//     },
//     {
//       IconComponent: AccessTimeFilledIcon,
//       backgroundColor: "#F6F7F8",
//       avatarColor: "#D97706",
//       title: "Overdue Bills",
//       count: passedDueDateCount,
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
//       <Grid container spacing={2} className="info-card-container">
//         {cardData.map((card, index) => (
//           <Grid 
//             item 
//             key={index}
//             xs={12}  // 1 card per row on extra small screens
//             sm={12}  // 1 card per row on small screens
//             md={3}   // 4 cards per row on medium screens
//             lg={2.4} // 5 cards per row on large screens
//             xl={2.4} // 5 cards per row on extra large screens
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

//       {/* Tables Section - Only one table shows at a time */}
//       {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer'|| (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
//         <Box sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           width: '100%',
//           alignItems: 'center',
//           mt: { xl: 5, lg: 5 },
//           mb: { xl: 8, lg: 8 }
//         }}>
//           {showConsumerTable && <Wardnamecount onClose={() => setShowConsumerTable(false)} />}
//           {showCMonthPaidTable && <PaidBillCurrentMonth onClose={() => setShowCMonthPaidTable(false)} />}
//           {showPMonthPaidTable && <PaidBillPreviousMonth onClose={() => setShowPMonthPaidTable(false)} />}
//           {showCMonthAvgTable && <AverageMetersCurrentMonth onClose={() => setShowCMonthAvgTable(false)} />}
//           {showCMonthFaultyTable && <FaultyMetersCurrentMonth onClose={() => setShowCMonthFaultyTable(false)} />}
//           {showCMonthUDueBill && <UpcomingDueBillCurrentMonth onClose={() => setshowCMonthUDueBill(false)} />}
//           {showPTwoMonthBeforePaidTable && <PaidBillpreviousTwoMonthBefore onClose={() => setShowPTwoMonthBeforePaidTable(false)} />}
//           {showBeforeTwoMonthFaultyTable && <FaultyMetersBeforeTwoMonth onClose={() => setShowBeforeTwoMonthFaultyTable(false)} />}
//           {showOverdueBill && <OverdueBillsTable onClose={() => setShowOverdueBill(false)} />}
//         </Box>
//       )}

//       {/* Charts Section */}
//       {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer') && (
//         <Box sx={{display:'flex',width:'100%',justifyContent:{lg:'flex-start',xl:'flex-start',sm:'center'},pl:{xl:'5%',lg:'5%',sm:'0%',xs:'0%'}}}></Box>
//       )}
      
//       <Box sx={{width:'100%',display:'flex',justifyContent:'space-around',flexDirection:{xs:'column',md:'row',lg:'row',xl:'row'},mt:10}}>
//         <Box sx={{
//           width:{
//           xs:'100%',
//           sm:'90%',
//           md:'42%',
//           lg:'42%',
//           xl:'42%'
//         },
//         ml:{
//           xs:'0%',
//           sm:isSidebarOpen?'13%':'2%',
//           md:isSidebarOpen?'3%':'2%',
//           lg:'0%',
//           xl:'0%'
//         },
//         height:'80%',display:'flex',alignItems:'center',alignContent:'center',justifyContent:'center',flexDirection:'column'}}>
//         <h4 style={{color:'black'}}>Meter Status Of Months {previousMonth},{currentMonth}-{currentYear}</h4>
//         <ChartComponent />
//         </Box>

//         <Box sx={{ width:{
//           xs:'100%',
//           sm:'80%',
//           md:'42%',
//           lg:'42%',
//           xl:'42%'
//         },
//         ml:{
//           xs:'0%',
//           sm:isSidebarOpen?'13%':'2%',
//           md:'0%',
//           lg:'0%',
//           xl:'0%'
//         },
//         height:'80%',display:'flex',alignItems:'center',justifyContent:'center',alignContent:'center',flexDirection:'column',mt:{
//           xs:10,
//           md:1,
//           lg:1,
//           xl:1
//         },}}>
//         <h4 style={{color:'black'}}>Light Bill Payment Status of {currentYear}</h4>
//         <PieChartBills />
//         </Box>
//       </Box>
//     </div>
//   );
// };

// export default Home;

// ====================
import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Button, useMediaQuery, Box, Grid, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/actions/userActions';
import { fetchBills } from '../store/actions/billActions';
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

const Home = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const user = useSelector(state => state.auth.user);
  const { bills, loading: loadingBills, error: errorBills } = useSelector((state) => state.bills);
  const { meters, loading: loadingMeters, error: errorUsers } = useSelector((state) => state.meters);
  const { consumers, loading: loadingConsumers, error: errorConsumers } = useSelector((state) => state.consumers);
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
  const previousYear = prevDate.getFullYear();
  const previousMonthCYear = `${previousMonth}-${currentYear}`;

  const prevDateTwo = new Date(currentDate);
  prevDateTwo.setMonth(prevDateTwo.getMonth() - 2);
  const previousTwoMonth = prevDateTwo.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const previousTwoMonthCYear = `${previousTwoMonth}-${currentYear}`;

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
    width: '100%',
    width: isSm || isXs ? '80%' : isSidebarOpen ? '90%' : '99%',
    marginLeft: isSm || isXs ? '60px' : isSidebarOpen ? '12%' : '3%',
  };

  // Modal style for tables
  // const modalStyle = {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   bgcolor: 'background.paper',
  //   boxShadow: 24,
  //   p: 0,
  //   borderRadius: '10px',
  //   maxHeight: '90vh',
  //   overflow: 'auto',
  //   outline: 'none'
  // };
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
      count: filteredConsumers.length,
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
      count: currentMonthPaidCount,
      onClick: () => {
        openSingleTable('currentPaid');
      }
    },
    {
      IconComponent: FactCheckIcon,
      backgroundColor: "#E6FCED",
      avatarColor: "#16A34A",
      title: `Paid Bills (${previousMonthCYear})`,
      count: previousMonthPaidCount,
      onClick: () => {
        openSingleTable('previousPaid');
      }
    },
    {
      IconComponent: ElectricMeterOutlinedIcon,
      backgroundColor: "#F6EEFF",
      avatarColor: "#9333EA",
      title: "Total Average Meters",
      count: meterStatusCounts.Average,
      onClick: () => {
        openSingleTable('average');
      }
    },
    {
      IconComponent: ErrorOutlinedIcon,
      backgroundColor: "#FEEAEA",
      avatarColor: "#DC2626",
      title: "Total Faulty Meters",
      count: totalFaultyMeters,
      onClick: () => {
        openSingleTable('faulty');
      }
    },
    {
      IconComponent: UpcomingIcon,
      backgroundColor: "#E8EDFF",
      avatarColor: "#4F46E5",
      title: "Upcoming Due Bills",
      count: dueAlertCount,
      onClick: () => {
        openSingleTable('upcoming');
      }
    },
    ...(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office') ? [{
      IconComponent: FactCheckIcon,
      backgroundColor: "#DCFCF5",
      avatarColor: "#0D9488",
      title: `Paid Bills (${previousTwoMonthCYear})`,
      count: previousTwoMonthPaidCount,
      onClick: () => {
        openSingleTable('twoMonthPaid');
      }
    }] : []),
    {
      IconComponent: ErrorOutlinedIcon,
      backgroundColor: "#FFF7D9",
      avatarColor: "#FFA534",
      title: `Faulty Meters ${twoMB}`,
      count: totalFaultyMetersBeforeTwo,
      onClick: () => {
        openSingleTable('faultyBefore');
      }
    },
    {
      IconComponent: AccessTimeFilledIcon,
      backgroundColor: "#F6F7F8",
      avatarColor: "#D97706",
      title: "Overdue Bills",
      count: passedDueDateCount,
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
      <Grid container spacing={2} className="info-card-container">
        {cardData.map((card, index) => (
          <Grid 
            item 
            key={index}
            xs={12}  // 1 card per row on extra small screens
            sm={12}  // 1 card per row on small screens
            md={3}   // 4 cards per row on medium screens
            lg={2.4} // 5 cards per row on large screens
            xl={2.4} // 5 cards per row on extra large screens
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
      {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer') && (
        <Box sx={{display:'flex',width:'100%',justifyContent:{lg:'flex-start',xl:'flex-start',sm:'center'},pl:{xl:'5%',lg:'5%',sm:'0%',xs:'0%'}}}></Box>
      )}
      
      <Box sx={{width:'100%',display:'flex',justifyContent:'space-around',flexDirection:{xs:'column',md:'row',lg:'row',xl:'row'},mt:10}}>
        <Box sx={{
          width:{
          xs:'100%',
          sm:'90%',
          md:'42%',
          lg:'42%',
          xl:'42%'
        },
        ml:{
          xs:'0%',
          sm:isSidebarOpen?'13%':'2%',
          md:isSidebarOpen?'3%':'2%',
          lg:'0%',
          xl:'0%'
        },
        height:'80%',display:'flex',alignItems:'center',alignContent:'center',justifyContent:'center',flexDirection:'column'}}>
        <h4 style={{color:'black'}}>Meter Status Of Months {previousMonth},{currentMonth}-{currentYear}</h4>
        <ChartComponent />
        </Box>

        <Box sx={{ width:{
          xs:'100%',
          sm:'80%',
          md:'42%',
          lg:'42%',
          xl:'42%'
        },
        ml:{
          xs:'0%',
          sm:isSidebarOpen?'13%':'2%',
          md:'0%',
          lg:'0%',
          xl:'0%'
        },
        height:'80%',display:'flex',alignItems:'center',justifyContent:'center',alignContent:'center',flexDirection:'column',mt:{
          xs:10,
          md:1,
          lg:1,
          xl:1
        },}}>
        <h4 style={{color:'black'}}>Light Bill Payment Status of {currentYear}</h4>
        <PieChartBills />
        </Box>
      </Box>
    </div>
  );
};

export default Home;