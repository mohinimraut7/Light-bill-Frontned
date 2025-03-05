// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';
// import { useDispatch, useSelector } from 'react-redux';

// const ChartComponent = () => {
//   const chartRef = useRef(null); 
//   const chartInstance = useRef(null); 
//   const { bills, loading: loadingBills, error: errorBills } = useSelector((state) => state.bills);

//   useEffect(() => {
//     if (chartRef.current) {
      
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }

      
//       chartInstance.current = new Chart(chartRef.current, {
//         type: 'bar',
//         data: {
//           labels: ['FAULTY','NORMAL','R.N.A','METER CHNG','NO METER','LOCKED','INACC,R.N.T.'],
//           datasets: [
//             {
//               label: 'Meter Status Distribution',
//               data: ['FAULTY','NORMAL','R.N.A','METER CHNG','NO METER','LOCKED','INACC,R.N.T.'],
//               backgroundColor: '#1CCCF1', 
//               borderColor: 'rgba(75, 192, 192, 1)',
//               borderWidth: 1,
//             },
//           ],
//         },
//         options: {
//           responsive: true, // Make chart responsive
//           maintainAspectRatio: false, // Allow chart to fill parent container
//         },
//       });
//     }

//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, []);

//   return (
   
//       <canvas ref={chartRef}></canvas>
    
//   );
// };

// export default ChartComponent;

// ===========================================================

// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';
// import { useSelector } from 'react-redux';

// const ChartComponent = () => {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);
//   const { bills } = useSelector((state) => state.bills);


//   const currentDate = new Date();
// const currentMonth = currentDate.toLocaleString('en-US', { month: 'short' }).toUpperCase(); // e.g., "FEB"
// const currentYear = currentDate.getFullYear(); // e.g., 2025

// const currentMonthYear = `${currentMonth}-${currentYear}`;

// console.log(currentMonthYear); // Output: "FEB-2025"


//   // Latest month and year kadha
//   const latestMonthYear = bills?.length
//     ? bills.reduce((latest, bill) => {
//         return new Date(bill.billDate) > new Date(latest.billDate) ? bill : latest;
//       }).monthAndYear
//     : null;

//   // Latest month & year sathi filter kara
//   const filteredBills = latestMonthYear
//     ? bills.filter((bill) => bill.monthAndYear === latestMonthYear)
//     : [];

//   // Meter status wise count kadhun dya
//   const meterStatusCounts = filteredBills.reduce((acc, bill) => {
//     acc[bill.meterStatus] = (acc[bill.meterStatus] || 0) + 1;
//     return acc;
//   }, {});

//   useEffect(() => {
//     if (chartRef.current) {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }

//       // Labels & Data prepare kara
//       const labels = Object.keys(meterStatusCounts);
//       const data = Object.values(meterStatusCounts);

//       chartInstance.current = new Chart(chartRef.current, {
//         type: 'bar',
//         data: {
//           labels,
//           datasets: [
//             {
//               label: `Meter Status Distribution (${latestMonthYear || "N/A"})`,
//               data,
//               backgroundColor: ['#E74C3C', '#1CCCF1', '#FFAE48', '#23CCEF', '#A569BD', '#2ECC71', '#F39C12'],
//               borderColor: 'rgba(75, 192, 192, 1)',
//               borderWidth: 1,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           plugins: {
//             legend: { position: 'top' },
//             tooltip: {
//               callbacks: {
//                 label: function (tooltipItem) {
//                   return `${tooltipItem.label}: ${tooltipItem.raw}`;
//                 },
//               },
//             },
//           },
//         },
//       });
//     }

//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, [bills]);

//   return <canvas ref={chartRef}></canvas>;
// };

// export default ChartComponent;
// =====================================================
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';

const ChartComponent = () => {
  const chartRef = useRef(null); 
  const chartInstance = useRef(null); 
  const { bills } = useSelector((state) => state.bills);
  const user = useSelector(state => state.auth.user);
  // Current month & year (e.g., "FEB-2025")
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const currentYear = currentDate.getFullYear();
  const currentMonthYear = `${currentMonth}-${currentYear}`;

  console.log("Current Month-Year:", currentMonthYear); 


  currentDate.setMonth(currentDate.getMonth() - 1); // पिछले महीने पर सेट करें

const previousMonth = currentDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();

const previousMonthYear = `${previousMonth}-${currentYear}`;

  // Filter bills matching latest month & year
  // const latestBills = bills.filter(bill => bill.monthAndYear === currentMonthYear);
  const latestBills = bills.filter(bill =>
    bill.monthAndYear === currentMonthYear &&
    (user?.role !== 'Junior Engineer' || bill.ward === user?.ward)
  );

  
  // const meterStatusCounts = {
  //   FAULTY: 0, NORMAL: 0, R_N_A: 0, METER_CHNG: 0, NO_METER: 0, LOCKED: 0, INACC_RNT: 0
  // };

  // latestBills.forEach(bill => {
  //   const status = bill.meterStatus?.toUpperCase().replace(/\s+/g, "_"); // Normalize keys
  //   if (meterStatusCounts.hasOwnProperty(status)) {
  //     meterStatusCounts[status]++;
  //   }
  // });


  const meterStatusCounts = {
    FAULTY: 0, NORMAL: 0, R_N_A: 0, METER_CHNG: 0, NO_METER: 0, LOCKED: 0, INACC_RNT: 0
  };
  
  latestBills.forEach(bill => {
    if (!bill.meterStatus) return; // Null/undefined status असल्यास skip कर
    const status = bill.meterStatus.toUpperCase().replace(/\s+/g, "_"); // Normalize key
  
    // जर status आधीपासून असेल तर त्याचा count वाढव
    // नसेल तर नवीन status add कर आणि count 1 ठेवा
    meterStatusCounts[status] = (meterStatusCounts[status] || 0) + 1;
  });

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: Object.keys(meterStatusCounts),
          datasets: [
            {
              label: `Meter Status Distribution (${currentMonthYear})`,
              // label: `Meter Status Distribution (${previousMonthYear})`,
                            data: Object.values(meterStatusCounts),
              backgroundColor: '#1CCCF1',
              borderColor: '#0099CC',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true }
          }
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [bills]); 

  return <canvas ref={chartRef}></canvas>;
};

export default ChartComponent;

