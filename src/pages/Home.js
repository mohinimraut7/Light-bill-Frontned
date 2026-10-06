import React, { useEffect, useMemo, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Box, Grid, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/actions/userActions';
import { fetchBills } from '../store/actions/billActions';
import { fetchRoles } from '../store/actions/roleActions';
// import { fetchMeters } from '../store/actions/meterActions';  // 3-Oct-2026: वापर बंद
import { fetchConsumers } from '../store/actions/consumerActions';
// import { getMasters } from '../store/actions/masterActions';  // 3-Oct-2026: वापर बंद
import InfoCard from '../components/cards/InfoCard';
import { CircularProgress } from '@mui/material';
import ChartComponent from '../components/CharComponent';
import './Home.css';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import ElectricMeterOutlinedIcon from '@mui/icons-material/ElectricMeterOutlined';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
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

import bodyBg from '../Images/subtleWhiteBody.png';



// ── Date helpers (component बाहेर - एकदाच calculate) ──────────────────────
const getMonthYear = (date) =>
  date.toLocaleString('en-US', { month: 'short' }).toUpperCase() + '-' + date.getFullYear();

const now = new Date();
const currentMonthYear = getMonthYear(now);

const prevDate = new Date(now);
prevDate.setMonth(now.getMonth() - 1);
const previousMonthCYear = getMonthYear(prevDate);

const twoMonthDate = new Date(now);
twoMonthDate.setMonth(now.getMonth() - 2);
const previousTwoMonthCYear = getMonthYear(twoMonthDate);
// ──────────────────────────────────────────────────────────────────────────────

const Home = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const user = useSelector(state => state.auth.user);

  // ✅ Redux - एकदाच fetch
  const { bills, loading: loadingBills } = useSelector((state) => state.bills);
  const { roles, loading: loadingRoles, error: errorRoles } = useSelector((state) => state.roles);

  const [totalConsumersCount, setTotalConsumersCount] = useState(0);
  

  // Modal states
  const [showConsumerTable, setShowConsumerTable] = useState(false);
  const [showCMonthPaidTable, setShowCMonthPaidTable] = useState(false);
  const [showPMonthPaidTable, setShowPMonthPaidTable] = useState(false);
  const [showCMonthAvgTable, setShowCMonthAvgTable] = useState(false);
  const [showCMonthUDueBill, setshowCMonthUDueBill] = useState(false);
  const [showOverdueBill, setShowOverdueBill] = useState(false);
const [showCMonthOverdueBill, setShowCMonthOverdueBill] = useState(false);


  const [showPTwoMonthBeforePaidTable, setShowPTwoMonthBeforePaidTable] = useState(false);
  const [showCMonthFaultyTable, setShowCMonthFaultyTable] = useState(false);
  const [showBeforeTwoMonthFaultyTable, setShowBeforeTwoMonthFaultyTable] = useState(false);

  // ✅ Ward filter helper
  const wardFilter = (bill) => {
    if (!user) return false;
    if (user.role !== 'Junior Engineer') return true;
    if (user.ward === 'Head Office') return true;
    return bill.ward === user.ward;
  };

  // ✅ useMemo - bills बदलल्यावरच recalculate, API call नाही!
  const dashboardCounts = useMemo(() => {
    if (!bills.length || !user) return {



      // currentMonthPaidCount: 0, previousMonthPaidCount: 0, previousTwoMonthPaidCount: 0,

            currentMonthPaidCount: 0, previousMonthPaidCount: 0, previousTwoMonthPaidCount: 0,
      previousMonthTotalCount: 0,previousMonthOverdueCount: 0,previousMonthPenaltyTotal: 0,


      // dueAlertCount: 0, passedDueDateCount: 0, totalFaultyCurrentMonth: 0,

      dueAlertCount: 0, passedDueDateCount: 0, currentMonthOverdueCount: 0, totalFaultyCurrentMonth: 0,

      totalFaultyBeforeTwoMonths: 0, averageMetersCount: 0
    };

    const today = new Date();
    const prevMonthYear = getMonthYear(new Date(today.getFullYear(), today.getMonth() - 1, 1));

    const currentMonthPaidCount = bills.filter(b =>
      b.paymentStatus === 'paid' && b.monthAndYear === currentMonthYear && wardFilter(b)
    ).length;

    const previousMonthPaidCount = bills.filter(b =>
      b.paymentStatus === 'paid' && b.monthAndYear === previousMonthCYear && wardFilter(b)
    ).length;

    // const previousTwoMonthPaidCount = bills.filter(b =>

    // NEW: mage chya mahinyache total bills (status kaahi pan)
    const previousMonthTotalCount = bills.filter(b =>
      b.monthAndYear === previousMonthCYear && wardFilter(b)
    ).length;

    const previousTwoMonthPaidCount = bills.filter(b =>


      b.paymentStatus === 'paid' && b.monthAndYear === previousTwoMonthCYear && wardFilter(b)
    ).length;

    const dueAlertCount = upComingDueBills(bills, user).length;

    const passedDueDateCount = bills.filter(b => {
      const isOverdue = new Date(b.dueDate) < today;
      const isUnpaid = b.paymentStatus === 'unpaid';
      const isRelevantMonth = b.monthAndYear === currentMonthYear || b.monthAndYear === prevMonthYear;
      return isOverdue && isUnpaid && isRelevantMonth && wardFilter(b);
    }).length;

      // NEW: fakta chalu mahinyache overdue bills
 const previousMonthOverdueCount = bills.filter(b =>
      new Date(b.dueDate) < today &&
      b.paymentStatus === 'unpaid' &&
      b.monthAndYear === previousMonthCYear &&
      wardFilter(b)
    ).length;

    // NEW: fakta chalu mahinyache overdue bills

    const currentMonthOverdueCount = bills.filter(b =>
      new Date(b.dueDate) < today &&
      b.paymentStatus === 'unpaid' &&
      b.monthAndYear === currentMonthYear &&
      wardFilter(b)
    ).length;

    // const totalFaultyCurrentMonth = bills.filter(b =>

          // NEW: mage chya mahinyacha total penalty (paidAmount == netBillAmountWithDPC asel tevha DPC - net)
    const previousMonthPenaltyTotal = Math.round(
      bills
        .filter(b => b.monthAndYear === previousMonthCYear && wardFilter(b))
        .reduce((sum, b) => {
          const net = Number(b.netBillAmount);
          const withDpc = Number(b.netBillAmountWithDPC);
          const paid = Number(b.paidAmount);
          if (isNaN(net) || isNaN(withDpc) || isNaN(paid)) return sum;
          const paidWithDpc = Math.abs(paid - withDpc) < 0.01;
          const penalty = withDpc - net;
          return paidWithDpc && penalty > 0 ? sum + penalty : sum;
        }, 0)
    );

    const totalFaultyCurrentMonth = bills.filter(b =>
      b.meterStatus === 'FAULTY' && b.monthAndYear === currentMonthYear && wardFilter(b)
    ).length;

    const totalFaultyBeforeTwoMonths = bills.filter(b =>
      b.meterStatus === 'FAULTY' && b.monthAndYear === previousTwoMonthCYear && wardFilter(b)
    ).length;

    const uniqueBills = bills
      .slice()
      .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
      .filter((b, i, self) => i === self.findIndex(x => x.cn === b.cn));

    const averageMetersCount = uniqueBills.filter(b => b.meterStatus === 'Average').length;

    return {
      // currentMonthPaidCount, previousMonthPaidCount, previousTwoMonthPaidCount,

            currentMonthPaidCount, previousMonthPaidCount, previousTwoMonthPaidCount,
      previousMonthTotalCount,previousMonthOverdueCount,previousMonthPenaltyTotal,


      dueAlertCount, passedDueDateCount, currentMonthOverdueCount, totalFaultyCurrentMonth,
      totalFaultyBeforeTwoMonths, averageMetersCount
    };
  }, [bills, user]);

  // ✅ Consumers count - फक्त 1 API call
  useEffect(() => {
    if (!user) return;
    const fetchConsumersCount = async () => {
      try {
        if (user.role === 'Junior Engineer' && user.ward !== 'Head Office') {
          const res = await fetch(`${baseUrl}/getConsumers?page=1&limit=1&ward=${encodeURIComponent(user.ward)}`);
          const data = await res.json();
          setTotalConsumersCount(data.pagination?.totalConsumers || 0);
        } else {
          const res = await fetch(`${baseUrl}/getConsumers?page=1&limit=1`);
          const data = await res.json();
          setTotalConsumersCount(data.pagination?.totalConsumers || 0);
        }
      } catch (e) {
        setTotalConsumersCount(0);
      }
    };
    fetchConsumersCount();
  }, [user]);

  // ✅ एकदाच dispatch
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchBills(1, 10000));
    // dispatch(getMasters());   // 3-Oct-2026: masters data कुठेही वापरला जात नाही → बंद
    dispatch(fetchRoles());
    // dispatch(fetchMeters());   // 3-Oct-2026: meters फक्त PieChartComponent मध्ये, जो कुठेही वापरला जात नाही; Meter page route सुद्धा बंद आहे → बंद
  //   dispatch(fetchConsumers());
  //   document.body.classList.add('home-body');
  //   return () => document.body.classList.remove('home-body');
  // }, [dispatch]);


      dispatch(fetchConsumers());
    document.body.classList.add('home-body');

    // NEW (5-Oct-2026): Home page cha background image
    const bodyStyle = document.body.style;
    bodyStyle.backgroundImage = `url(${bodyBg})`;
    bodyStyle.backgroundSize = 'cover';
    bodyStyle.backgroundPosition = 'center';
    bodyStyle.backgroundRepeat = 'no-repeat';
    bodyStyle.backgroundAttachment = 'fixed';

    return () => {
      document.body.classList.remove('home-body');
      bodyStyle.backgroundImage = '';
      bodyStyle.backgroundSize = '';
      bodyStyle.backgroundPosition = '';
      bodyStyle.backgroundRepeat = '';
      bodyStyle.backgroundAttachment = '';
    };
  }, [dispatch]);

  const closeAllTables = () => {
    setShowConsumerTable(false); setShowCMonthPaidTable(false); setShowPMonthPaidTable(false);

    setShowCMonthAvgTable(false); setshowCMonthUDueBill(false); setShowOverdueBill(false);
    setShowCMonthOverdueBill(false);

    setShowPTwoMonthBeforePaidTable(false); setShowCMonthFaultyTable(false);
    setShowBeforeTwoMonthFaultyTable(false);
  };

  const openSingleTable = (tableToShow) => {
    closeAllTables();
    const map = {
      consumer: setShowConsumerTable, currentPaid: setShowCMonthPaidTable,
      previousPaid: setShowPMonthPaidTable, average: setShowCMonthAvgTable,
      faulty: setShowCMonthFaultyTable, upcoming: setshowCMonthUDueBill,
      twoMonthPaid: setShowPTwoMonthBeforePaidTable, faultyBefore: setShowBeforeTwoMonthFaultyTable,
      
      overdue: setShowOverdueBill,
      overdueCurrent: setShowCMonthOverdueBill,
    };
    if (map[tableToShow]) map[tableToShow](true);
  };

  if (loadingRoles) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  if (errorRoles) return <p>Error loading roles: {errorRoles}</p>;

  const isAdminRole = user?.role === 'Super Admin' || user?.role === 'Admin' ||
    user?.role === 'Executive Engineer' ||
    (user?.role === 'Junior Engineer' && user?.ward === 'Head Office');

  const modalStyle = {
    position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)',
    bgcolor: 'background.paper', boxShadow: 24, p: 0, borderRadius: '10px',
    width: '50%', overflow: 'auto', outline: 'none',
  };

  const cardData = [
    {
      IconComponent: ElectricMeterOutlinedIcon, backgroundColor: "#EAEFF5", avatarColor: "#475569",
      title: "Total Meters", count: totalConsumersCount,
      onClick: () => openSingleTable('consumer')
    },
    {
      IconComponent: UpcomingIcon, backgroundColor: "#E8EDFF", avatarColor: "#4F46E5",
      title: `Upcoming Due Bills ${currentMonthYear}`, count: dashboardCounts.dueAlertCount,
      onClick: () => openSingleTable('upcoming')
    },
    {
      IconComponent: FactCheckIcon, backgroundColor: "#E7F1FF", avatarColor: "#2563EB",
      title: `Paid Bills (${currentMonthYear})`, count: dashboardCounts.currentMonthPaidCount,
      onClick: () => openSingleTable('currentPaid')
    },

  
     // NEW: chalu mahinyache Overdue Bills (Paid Bills chalu mahina chya nantar)
    {
      IconComponent: AccessTimeFilledIcon, backgroundColor: "#FFF1E6", avatarColor: "#EA580C",
      title: `Overdue Bills (${currentMonthYear})`, count: dashboardCounts.currentMonthOverdueCount,
      onClick: () => openSingleTable('overdueCurrent')
    },
     {
      IconComponent: ErrorOutlinedIcon, backgroundColor: "#FEEAEA", avatarColor: "#DC2626",
      title: `Total Faulty Meters ${currentMonthYear}`, count: dashboardCounts.totalFaultyCurrentMonth,
      onClick: () => openSingleTable('faulty')
    },
    // {
    //   IconComponent: FactCheckIcon, backgroundColor: "#E6FCED", avatarColor: "#16A34A",
    //   title: `Paid Bills (${previousMonthCYear})`, count: dashboardCounts.previousMonthPaidCount,

    // NEW: Paid Bills (mage cha mahina) chya aadhi, mage chya mahinyache Total Bills
    {
      IconComponent: FactCheckIcon, backgroundColor: "#EEF2FF", avatarColor: "#6366F1",
      title: `Total Bills (${previousMonthCYear})`, count: dashboardCounts.previousMonthTotalCount,
    },
    {
      IconComponent: FactCheckIcon, backgroundColor: "#E6FCED", avatarColor: "#16A34A",

      // title: `Paid Bills (${previousMonthCYear})`, count: dashboardCounts.previousMonthPaidCount,
      // onClick: () => openSingleTable('previousPaid')


      title: `Paid Bills (${previousMonthCYear})`, count: dashboardCounts.previousMonthPaidCount,
      onClick: () => openSingleTable('previousPaid')
    },
    // NEW: mage chya mahinyache Total Overdue Bills (Paid Bills (SEP) chya nantar)
    {
      IconComponent: AccessTimeFilledIcon, backgroundColor: "#FDECEC", avatarColor: "#B91C1C",
    //   title: `Overdue Bills (${previousMonthCYear})`, count: dashboardCounts.previousMonthOverdueCount,
    // },


      title: `Overdue Bills (${previousMonthCYear})`, count: dashboardCounts.previousMonthOverdueCount,
    },
    // NEW: chalu mahinyache Faulty Meters (Overdue Bills (SEP) chya nantar)
    {
      IconComponent: ErrorOutlinedIcon, backgroundColor: "#FEEAEA", avatarColor: "#DC2626",
    //   title: `Faulty Meters (${currentMonthYear})`, count: dashboardCounts.totalFaultyCurrentMonth,
    //   onClick: () => openSingleTable('faulty')
    // },

    

          title: `Faulty Meters (${currentMonthYear})`, count: dashboardCounts.totalFaultyCurrentMonth,
      onClick: () => openSingleTable('faulty')
    },
    // NEW: mage chya mahinyacha Total Penalty (Faulty Meters (OCT) chya nantar)
    {
      IconComponent: ErrorOutlinedIcon, backgroundColor: "#FFF4E5", avatarColor: "#C2410C",
      title: `Total Penalty ₹ (${previousMonthCYear})`, count: dashboardCounts.previousMonthPenaltyTotal,
    },

    // {
    //   IconComponent: ElectricMeterOutlinedIcon, backgroundColor: "#F6EEFF", avatarColor: "#9333EA",
    //   title: "Total Average Meters", count: dashboardCounts.averageMetersCount,
    //   onClick: () => openSingleTable('average')
    // },
   
    
    // ...(isAdminRole ? [{
    //   IconComponent: FactCheckIcon, backgroundColor: "#DCFCF5", avatarColor: "#0D9488",
    //   title: `Paid Bills (${previousTwoMonthCYear})`, count: dashboardCounts.previousTwoMonthPaidCount,
    //   onClick: () => openSingleTable('twoMonthPaid')
    // }] : []),


    // {
    //   IconComponent: ErrorOutlinedIcon, backgroundColor: "#FFF7D9", avatarColor: "#FFA534",
    //   title: `Faulty Meters ${previousTwoMonthCYear}`, count: dashboardCounts.totalFaultyBeforeTwoMonths,
    //   onClick: () => openSingleTable('faultyBefore')
    // },
    // {
    //   IconComponent: AccessTimeFilledIcon, backgroundColor: "#F6F7F8", avatarColor: "#D97706",
    //   title: `Overdue Bills (${currentMonthYear} & ${previousMonthCYear})`,
    //   count: dashboardCounts.passedDueDateCount,
    //   onClick: () => openSingleTable('overdue')
    // },
    // ...(isAdminRole ? [{
    //   IconComponent: Person2OutlinedIcon, backgroundColor: "#F6F7F9", avatarColor: "#374151",
    //   title: "Total Users", count: roles.length
    // }] : []),
  ];

  return (
    <div style={{ marginTop: isSidebarOpen ? '1%' : '4%' }} className="containerhome">

      {/* Cards */}
      {/* <Grid container spacing={2} className="info-card-container"
        sx={{ pl: { md: isSidebarOpen ? '18%' : '6%', xs: '20%' } }}> */}


      {/* OLD (3-Oct-2026 पर्यंत): sx={{ pl: { md: isSidebarOpen ? '18%' : '6%', xs: '20%' } }}
          नवीन navbar उंच झाल्याने वरच्या cards navbar ला चिकटत होत्या → फक्त mt (वरची जागा) वाढवली */}
      <Grid container spacing={2} className="info-card-container"
        sx={{ pl: { md: isSidebarOpen ? '18%' : '6%', xs: '20%' }, mt: { xs: 1, md: 1.5 } }}>


        {cardData.map((card, index) => (
          <Grid item key={index} xs={11} sm={5} md={3}
            lg={isSidebarOpen ? 2.4 : 2.3} xl={isSidebarOpen ? 2.4 : 2.3}>
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

      {/* Modals */}
      {isAdminRole && (
        <>
          <Modal open={showConsumerTable} onClose={() => setShowConsumerTable(false)}>
            <Box sx={modalStyle}><Wardnamecount onClose={() => setShowConsumerTable(false)} /></Box>
          </Modal>
          <Modal open={showCMonthPaidTable} onClose={() => setShowCMonthPaidTable(false)}>
            <Box sx={modalStyle}><PaidBillCurrentMonth onClose={() => setShowCMonthPaidTable(false)} /></Box>
          </Modal>
          <Modal open={showPMonthPaidTable} onClose={() => setShowPMonthPaidTable(false)}>
            <Box sx={modalStyle}><PaidBillPreviousMonth onClose={() => setShowPMonthPaidTable(false)} /></Box>
          </Modal>
          <Modal open={showCMonthAvgTable} onClose={() => setShowCMonthAvgTable(false)}>
            <Box sx={modalStyle}><AverageMetersCurrentMonth onClose={() => setShowCMonthAvgTable(false)} /></Box>
          </Modal>
          <Modal open={showCMonthFaultyTable} onClose={() => setShowCMonthFaultyTable(false)}>
            <Box sx={modalStyle}><FaultyMetersCurrentMonth onClose={() => setShowCMonthFaultyTable(false)} /></Box>
          </Modal>
          <Modal open={showCMonthUDueBill} onClose={() => setshowCMonthUDueBill(false)}>
            <Box sx={modalStyle}><UpcomingDueBillCurrentMonth onClose={() => setshowCMonthUDueBill(false)} /></Box>
          </Modal>
          <Modal open={showPTwoMonthBeforePaidTable} onClose={() => setShowPTwoMonthBeforePaidTable(false)}>
            <Box sx={modalStyle}><PaidBillpreviousTwoMonthBefore onClose={() => setShowPTwoMonthBeforePaidTable(false)} /></Box>
          </Modal>
          <Modal open={showBeforeTwoMonthFaultyTable} onClose={() => setShowBeforeTwoMonthFaultyTable(false)}>
            <Box sx={modalStyle}><FaultyMetersBeforeTwoMonth onClose={() => setShowBeforeTwoMonthFaultyTable(false)} /></Box>
          </Modal>
                   <Modal open={showOverdueBill} onClose={() => setShowOverdueBill(false)}>
            <Box sx={modalStyle}><OverdueBillsTable onClose={() => setShowOverdueBill(false)} /></Box>
          </Modal>
          <Modal open={showCMonthOverdueBill} onClose={() => setShowCMonthOverdueBill(false)}>
            <Box sx={modalStyle}><OverdueBillsTable currentMonthOnly onClose={() => setShowCMonthOverdueBill(false)} /></Box>
          </Modal>


          
        </>
      )}

      {/* Charts */}
      {/* <Box sx={{
        width: { xs: '90%', md: isSidebarOpen ? '85%' : '96%' },
        ml: { md: isSidebarOpen ? '15%' : '4%', xs: '9%' },
        display: 'flex', justifyContent: 'space-around',
        flexDirection: { xs: 'column', md: 'row' },
        mt: 0, gap: { xs: 4, md: 0 }, px: { xs: 2, sm: 3, md: 0 }
      }}>
        <Box sx={{ width: { xs: '100%', md: '48%' }, height: { xs: '400px', md: '80%' }, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <ChartComponent />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '48%' }, height: { xs: '400px', md: '80%' }, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <PieChartBills />
        </Box>
      </Box> */}


            {/* Charts: metric cards सारखीच spacing (Grid spacing={2} = 16px) आणि सारखाच डावा padding */}
      <Grid container spacing={2} className="info-card-container"
        sx={{ pl: { md: isSidebarOpen ? '18%' : '6%', xs: '20%' }, mt: { xs: 0, md: 0 }, mb: 3 }}>
        <Grid item xs={11} md={5.9}>
          <ChartComponent />
        </Grid>
        <Grid item xs={11} md={5.9}>
          <PieChartBills />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;