
import React, { useEffect,useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Button, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/actions/userActions';
import {fetchBills} from '../store/actions/billActions';
import { fetchRoles } from '../store/actions/roleActions';
import { fetchMeters } from '../store/actions/meterActions';
import { fetchConsumers } from '../store/actions/consumerActions';

import { getMasters } from '../store/actions/masterActions';
import InfoCard from '../components/cards/InfoCard';
import { CircularProgress, Box } from '@mui/material';
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


 



  const allWards = ["Ward-A", "Ward-B", "Ward-C", "Ward-D", "Ward-E", "Ward-F", "Ward-G", "Ward-H", "Ward-I"];
  const [wardFaultyCounts, setWardFaultyCounts] = useState({});
  const [totalFaultyMeters, setTotalFaultyMeters] = useState(0);
  const [showCMonthFaultyTable, setShowCMonthFaultyTable] = useState(false);
  
  // useEffect(() => {
  //   if (!loadingBills && bills.length > 0) {
  //     const counts = bills.reduce((acc, bill) => {
  //       if (bill.meterStatus === "FAULTY" && bill.monthAndYear === currentMonthYear) {
  //         const ward = bill.ward;
  //         acc[ward] = (acc[ward] || 0) + 1;
  //       }
  //       return acc;
  //     }, {});
  
  //     // Ensure all wards are present
  //     const finalCounts = allWards.reduce((acc, ward) => {
  //       acc[ward] = counts[ward] || 0;
  //       return acc;
  //     }, {});
  
  //     const totalFaulty = Object.values(finalCounts).reduce((sum, count) => sum + count, 0);
  
  //     setWardFaultyCounts(finalCounts);
  //     setTotalFaultyMeters(totalFaulty);
  //   }
  // }, [bills, loadingBills]);


  

  // useEffect(() => {
  //   if (!loadingBills && bills.length > 0) {
  //     const counts = bills.reduce((acc, bill) => {
  //       if (bill.meterStatus === "FAULTY" && bill.monthAndYear === currentMonthYear) {
  //         const ward = bill.ward;
  //         acc[ward] = (acc[ward] || 0) + 1;
  //       }
  //       return acc;
  //     }, {});
  
  //     // Ensure all wards are present
  //     const finalCounts = allWards.reduce((acc, ward) => {
  //       acc[ward] = counts[ward] || 0;
  //       return acc;
  //     }, {});
  
  //     const totalFaulty = Object.values(finalCounts).reduce((sum, count) => sum + count, 0);
  
  //     setWardFaultyCounts(finalCounts);
  //     setTotalFaultyMeters(totalFaulty);
  //   }
  // }, [bills, loadingBills]);

  useEffect(() => {
    if (!loadingBills && bills.length > 0 && user) {  // 🔹 user असला पाहिजे
      const counts = bills.reduce((acc, bill) => {
        if (
          bill.meterStatus === "FAULTY" && 
          bill.monthAndYear === currentMonthYear && 
          (user.role !== "Junior Engineer" || bill.ward === user.ward ||(user.role === "Junior Engineer" && user.ward === "Head Office"))  // 🔹 जर Junior Engineer असेल, तर फक्त त्याच्या वॉर्डचा डेटा
        ) {
          const ward = bill.ward;
          acc[ward] = (acc[ward] || 0) + 1;
        }
        return acc;
      }, {});
  
      // Ensure all wards are present
      const finalCounts = allWards.reduce((acc, ward) => {
        acc[ward] = counts[ward] || 0;
        return acc;
      }, {});
  
      const totalFaulty = Object.values(finalCounts).reduce((sum, count) => sum + count, 0);
  
      setWardFaultyCounts(finalCounts);
      setTotalFaultyMeters(totalFaulty);
    }
  }, [bills, loadingBills, user]);

  
const uniqueBills = bills
  .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)) 
  .filter((bill, index, self) => {
    return index === self.findIndex(b => b.cn === bill.cn);
  });
  console.log("uniqueBills>>>>",uniqueBills)
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
  // return user?.role === 'Junior Engineer' ? consumer.ward === user.ward : true;
  return user?.role === 'Junior Engineer' && user?.ward !== 'Head Office' 
  ? consumer.ward === user.ward 
  : true;
});

const today = new Date(); 


// =============================================================
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
// ================================================================

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
// ===============================================================

// const passedDueDateCount = bills.filter(bill => {
//   const dueDate = new Date(bill.dueDate); 
//   return dueDate < today
// }).length;

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
// const previousYear = prevDate.getFullYear();
const previousTwoMonthCYear = `${previousTwoMonth}-${currentYear}`;


const currentMonthPaidCount = bills.filter(bill => 
  bill.paymentStatus === 'paid' && bill.monthAndYear === currentMonthYear &&
  (user.role !== "Junior Engineer"|| user.ward === "Head Office" || bill.ward === user.ward) 
).length;

const previousMonthPaidCount = bills.filter(bill => 
  bill.paymentStatus === 'paid' && bill.monthAndYear === previousMonthCYear &&
  (user.role !== "Junior Engineer"|| user.ward === "Head Office" || bill.ward === user.ward) 
).length;

const previousTwoMonthPaidCount = bills.filter(bill => 
  bill.paymentStatus === 'paid' && bill.monthAndYear === previousTwoMonthCYear &&
  (user.role !== "Junior Engineer"|| user.ward === "Head Office" || bill.ward === user.ward) 
).length;


console.log("Current Month Paid Count:", currentMonthPaidCount);
console.log("Previous Month Paid Count:", previousMonthPaidCount);


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

  if ( loadingRoles) {
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
    
    width: isSm || isXs ? '80%' : isSidebarOpen ? '80%' : '95%',
  
  marginLeft: isSm || isXs ? '60px' : isSidebarOpen ? '20%' : '60px',
 
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems:'center'
  };
  
  return (
    <div style={gridStyle} className="containerhome">
     <div className="info-card-container" sx={{width: isSm || isXs? '100%' : '30%'}}>
<InfoCard
IconComponent={ElectricMeterOutlinedIcon}
backgroundColor="#fff9ed"
  className="container-infocard"
  avatarColor="#23CCEF"
  avatarIcon="M"
  title="Total Meters"
  count={filteredConsumers.length}
  onClick={() => {
    setShowConsumerTable(prev => !prev);
    console.log("showConsumerTable:", !showConsumerTable); // Debug log
  }}
/>
<InfoCard
// IconComponent={PaidIcon}
IconComponent={FactCheckIcon}
backgroundColor="#f8fffc"
  className="container-infocard"
  avatarColor="#1976D2"
  avatarIcon="M"
  title={`Paid Bills (${currentMonthYear})`}
  count={currentMonthPaidCount}
  onClick={() => {
    setShowCMonthPaidTable(prev => !prev);
  }}
/>
<InfoCard
  // IconComponent={CurrencyRupeeOutlinedIcon}
  IconComponent={FactCheckIcon}
  backgroundColor="#f3f8fe"
  className="container-infocard"
  avatarColor="#1976D2"
  avatarIcon="M"
  title={`Paid Bills (${previousMonthCYear})`}
  count={previousMonthPaidCount}

  onClick={() => {
    setShowPMonthPaidTable(prev => !prev);
  }}
/>


{/* {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer') && (<Box sx={{display:'flex',flexDirection:{
      xl:'row',
      lg:'row',
      md:'row',
      sm:'column',
      xs:'column'
     },width:'100%',justifyContent:{lg:'space-around',xl:'space-around',sm:'center',sm:'space-between'},pl:{xl:'0%',lg:'0%',sm:'0%',xs:'0%'},mt:{xl:5,lg:5},mb:{xl:8,lg:8}}}>
     {showConsumerTable &&  <Wardnamecount/>}
     {showCMonthPaidTable && <PaidBillCurrentMonth/>}
     {showPMonthPaidTable &&  <PaidBillPreviousMonth/>}
      
    </Box>)} */}

{(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer'|| (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) &&
 (showConsumerTable || showCMonthPaidTable || showPMonthPaidTable) && (
  <Box sx={{
    display: 'flex',
    flexDirection: {
      xl: 'row',
      lg: 'row',
      md: 'row',
      sm: 'column',
      xs: 'column'
    },
    width: '100%',
    justifyContent: {
      lg: 'space-around',
      xl: 'space-around',
      sm: 'center',
      xs: 'space-between'
    },
    pl: { xl: '0%', lg: '0%', sm: '0%', xs: '0%' },
    mt: { xl: 5, lg: 5 },
    mb: { xl: 8, lg: 8 }
  }}>
    {showConsumerTable && <Wardnamecount />}
    {showCMonthPaidTable && <PaidBillCurrentMonth />}
    {showPMonthPaidTable && <PaidBillPreviousMonth />}
  </Box>
)}


<InfoCard
IconComponent={ElectricMeterOutlinedIcon}
backgroundColor="#FFF9ED"
  className="container-infocard"
  avatarColor="#06763C"
  avatarIcon="M"
  title="Total Average Meters"
  count={meterStatusCounts.Average}
  onClick={() => {
    setShowCMonthAvgTable(prev => !prev);
  }}
/>
<InfoCard
IconComponent={ErrorOutlinedIcon}
backgroundColor="#F8FFFC"
  className="container-infocard"
  avatarColor="#FFA534"
  avatarIcon="M"
  title="Total Faulty Meters"
  // count={meterStatusCounts.Faulty}
  count={ totalFaultyMeters}
  onClick={() => {
    setShowCMonthFaultyTable(prev => !prev);
  }}
/>
<InfoCard
// IconComponent={CurrencyRupeeOutlinedIcon}
IconComponent={UpcomingIcon}
  backgroundColor='#F3F8FE'
  className="container-infocard"
  avatarColor="#fedadc"
  avatarIcon="M"
  title="Upcoming Due Bills"
  count={dueAlertCount}
  onClick={() => {
    setshowCMonthUDueBill(prev => !prev);
  }}
/>
  {/* {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer') && (<Box sx={{display:'flex',flexDirection:{
        xl:'row',
        lg:'row',
        md:'row',
        sm:'column',
        xs:'column'
      },
      height:'auto',
      width:'100%',justifyContent:{lg:'space-around',xl:'space-around',sm:'center',sm:'space-between'},pl:{xl:'0%',lg:'0%',sm:'0%',xs:'0%'},mt:{xl:5,lg:5},mb:{xl:8,lg:8}}}>
        {showCMonthAvgTable && <AverageMetersCurrentMonth/>}

{showCMonthFaultyTable && <FaultyMetersCurrentMonth/>}

       {showCMonthUDueBill && <UpcomingDueBillCurrentMonth/> } 

        
        </Box>)} */}

{(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) &&
 (showCMonthAvgTable || showCMonthFaultyTable || showCMonthUDueBill) && (
  <Box sx={{
    display: 'flex',
    flexDirection: {
      xl: 'row',
      lg: 'row',
      md: 'row',
      sm: 'column',
      xs: 'column'
    },
    height: 'auto',
    width: '100%',
    justifyContent: {
      lg: 'space-around',
      xl: 'space-around',
      sm: 'center',
      xs: 'space-between'
    },
    pl: { xl: '0%', lg: '0%', sm: '0%', xs: '0%' },
    mt: { xl: 5, lg: 5 },
    mb: { xl: 8, lg: 8 }
  }}>
    {showCMonthAvgTable && <AverageMetersCurrentMonth />}
    {showCMonthFaultyTable && <FaultyMetersCurrentMonth />}
    {showCMonthUDueBill && <UpcomingDueBillCurrentMonth />}
  </Box>
)}


{(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer'|| (user?.role === 'Junior Engineer' && user?.ward === 'Head Office')) && (
  <InfoCard
  IconComponent={Person2OutlinedIcon}
 backgroundColor="#fff9ed"
    className="container-infocard"
    avatarColor="#FB404B"
    avatarIcon="PersonIcon"
    title="Total Users"
    count={roles.length} 
  />
)}


<InfoCard
  // IconComponent={CurrencyRupeeOutlinedIcon}
  IconComponent={FactCheckIcon}
  backgroundColor="#f3f8fe"
  className="container-infocard"
  avatarColor="#1976D2"
  avatarIcon="M"
  title={`Paid Bills (${previousTwoMonthCYear})`}
  count={previousTwoMonthPaidCount}

  onClick={() => {
    setShowPMonthPaidTable(prev => !prev);
  }}
/>
<InfoCard
// IconComponent={CurrencyRupeeOutlinedIcon}
IconComponent={AccessTimeFilledIcon}


backgroundColor="#f8fffc"
  className="container-infocard"
  avatarColor="#1976D2"
  avatarIcon="M"
  title="Overdue Bills"
  count={passedDueDateCount}
/>
     </div>
     {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer') && (<Box sx={{display:'flex',width:'100%',justifyContent:{lg:'flex-start',xl:'flex-start',sm:'center'},pl:{xl:'5%',lg:'5%',sm:'0%',xs:'0%'}}}></Box>)}
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
        
      {/* <Box sx={{ width:{
        xs:'100%',
        md:'25%',
        lg:'25%',
        xl:'25%'
      },mt:{
        xs:10,
        md:1,
        lg:1,
        xl:1
      },
      height:'80%',display:'flex',alignItems:'center',justifyContent:'center',alignContent:'center',flexDirection:'column'}}>
      <h3 style={{color:'black'}}>Meters</h3>
      <PieChartComponent />
      </Box> */}

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

