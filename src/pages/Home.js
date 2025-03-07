
import React, { useEffect } from 'react';
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
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import PieChartBills from '../components/PieChartBills';

import Wardnamecount from '../components/table/Wardnamecount';
const Home = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
    const user = useSelector(state => state.auth.user);
  const { bills, loading: loadingBills, error: errorBills } = useSelector((state) => state.bills);
  const { meters, loading: loadingMeters, error: errorUsers } = useSelector((state) => state.meters);
  const { consumers, loading: loadingConsumers, error: errorConsumers } = useSelector((state) => state.consumers);

  const { roles, loading: loadingRoles, error: errorRoles } = useSelector((state) => state.roles);
  const { masters, loading: loadingMasters, error: errorMasters } = useSelector((state) => state.masters);
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
  return user?.role === 'Junior Engineer' ? consumer.ward === user.ward : true;
});

const today = new Date(); 



const dueAlertrows = bills.filter(bill => {
  const dueDate = new Date(bill.dueDate);
  const twoDaysBeforeDue = new Date(dueDate);
  twoDaysBeforeDue.setDate(dueDate.getDate() - 2);

  const isDueSoon = today >= twoDaysBeforeDue && today <= dueDate;
  const isUnpaid = bill.paymentStatus === 'unpaid';

  if (user?.role === 'Junior Engineer') {
    return isDueSoon && isUnpaid && user?.ward === bill.ward;
  }
  return isDueSoon && isUnpaid;
});

const dueAlertCount = dueAlertrows.length;

// const passedDueDateCount = bills.filter(bill => {
//   const dueDate = new Date(bill.dueDate); 
//   return dueDate < today
// }).length;

const passedDueDateCount = bills.filter(bill => {
  const dueDate = new Date(bill.dueDate);
  const isOverdue = dueDate < today;
  const isUnpaid = bill.paymentStatus === 'unpaid';

  if (user?.role === 'Junior Engineer') {
    return isOverdue && isUnpaid && user?.ward === bill.ward;
  }
  return isOverdue && isUnpaid;
}).length;


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
  

  // height: isSm ? '100vh' : (isMd ? '100vh' : (isLg ? '80vh' : (isXl ? '60vh' : 'auto'))),

  
  justifyContent: 'center',
  
  alignContent: 'center',
  alignItems:'center'

  };
  
  return (
    <div style={gridStyle} className="containerhome">
     
     <div className="info-card-container" sx={{width: isSm || isXs? '100%' : '30%'}}>
     {/* <InfoCard
  className="container-infocard"
  avatarColor="#FB404B"
  avatarIcon="U"
  title="Total Users"
  count={roles.length} 
/> */}

{(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer') && (
  <InfoCard
  // <PersonIcon sx={{ color: 'white' }} /> {/* User Icon */}
  IconComponent={Person2OutlinedIcon}
   backgroundColor='#FFEBF0'
    className="container-infocard"
    avatarColor="#FB404B"
    avatarIcon="PersonIcon"
    title="Total Users"
    count={roles.length} 
  />
)}

     {/* <InfoCard
  className="container-infocard"
  avatarColor="#23CCEF"
  
  avatarIcon="M"
  title="Total Meters"
  count={meters.length}
/> */}

<InfoCard
IconComponent={ElectricMeterOutlinedIcon}
backgroundColor="#e3e3fe"
  className="container-infocard"
  avatarColor="#06763C"
  avatarIcon="M"
  title="Total Average Meters"
  count={meterStatusCounts.Average}
/>



<InfoCard
IconComponent={ErrorOutlinedIcon}
backgroundColor="#C9FBE2"
  className="container-infocard"
  avatarColor="#FFA534"
  avatarIcon="M"
  title="Total Faulty Meters"
  count={meterStatusCounts.Faulty}
/>


<InfoCard
IconComponent={ElectricMeterOutlinedIcon}
backgroundColor="#DCEBFB"
  className="container-infocard"
  avatarColor="#23CCEF"
  avatarIcon="M"
  title="Total Meters"
  count={filteredConsumers.length}
/>

<InfoCard
IconComponent={CurrencyRupeeOutlinedIcon}
backgroundColor="#FFF0D3"
  className="container-infocard"
  avatarColor="#1976D2"
  avatarIcon="M"
  title="Upcoming Due Bills"
  count={dueAlertCount}
/>

<InfoCard
IconComponent={CurrencyRupeeOutlinedIcon}
backgroundColor="#f1e1fd"
  className="container-infocard"
  avatarColor="#1976D2"
  avatarIcon="M"
  title="Passed Due Bills"
  count={passedDueDateCount}
/>
     


     </div>
  
     {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer') && (<Box sx={{display:'flex',width:'100%',justifyContent:{lg:'flex-start',xl:'flex-start',sm:'center'},pl:{xl:'5%',lg:'5%',sm:'0%',xs:'0%'}}}><Wardnamecount/></Box>)}

     
     <Box sx={{width:'100%',height:'60vh',display:'flex',justifyContent:'space-around',flexDirection:{xs:'column',md:'row',lg:'row',xl:'row'},mt:10}}>
      <Box sx={{
        width:{
        xs:'100%',
        md:'25%',
        lg:'25%',
        xl:'25%'
      },
      height:'80%',display:'flex',alignItems:'center',alignContent:'center',justifyContent:'center',flexDirection:'column'}}>
      <h3 style={{color:'black'}}>Meter Status</h3>
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
        md:'25%',
        lg:'25%',
        xl:'25%'
      },height:'80%',display:'flex',alignItems:'center',justifyContent:'center',alignContent:'center',flexDirection:'column',mt:{
        xs:10,
        md:1,
        lg:1,
        xl:1
      },}}>
      <h3 style={{color:'black'}}>Bills</h3>
      <PieChartBills />
      </Box>
      </Box>
    </div>
  );
};

export default Home;

