
// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';
// import { useSelector } from 'react-redux';

// const ChartComponent = () => {
//   const chartRef = useRef(null); 
//   const chartInstance = useRef(null); 
//   const { bills } = useSelector((state) => state.bills);
//   const user = useSelector(state => state.auth.user);
//   // Current month & year (e.g., "FEB-2025")
//   const currentDate = new Date();
//   const currentMonth = currentDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
//   const currentYear = currentDate.getFullYear();
//   const currentMonthYear = `${currentMonth}-${currentYear}`;

//   console.log("Current Month-Year:", currentMonthYear); 


//   currentDate.setMonth(currentDate.getMonth() - 1); // पिछले महीने पर सेट करें

// const previousMonth = currentDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();

// const previousMonthYear = `${previousMonth}-${currentYear}`;

//   // Filter bills matching latest month & year
//   // const latestBills = bills.filter(bill => bill.monthAndYear === currentMonthYear);
//   const latestBills = bills.filter(bill =>
//     bill.monthAndYear === currentMonthYear &&
//     (user?.role !== 'Junior Engineer' || bill.ward === user?.ward)
//   );

  
//   // const meterStatusCounts = {
//   //   FAULTY: 0, NORMAL: 0, R_N_A: 0, METER_CHNG: 0, NO_METER: 0, LOCKED: 0, INACC_RNT: 0
//   // };

//   // latestBills.forEach(bill => {
//   //   const status = bill.meterStatus?.toUpperCase().replace(/\s+/g, "_"); // Normalize keys
//   //   if (meterStatusCounts.hasOwnProperty(status)) {
//   //     meterStatusCounts[status]++;
//   //   }
//   // });


//   const meterStatusCounts = {
//     FAULTY: 0, NORMAL: 0, R_N_A: 0, METER_CHNG: 0, NO_METER: 0, LOCKED: 0, INACC_RNT: 0
//   };
  
//   latestBills.forEach(bill => {
//     if (!bill.meterStatus) return; // Null/undefined status असल्यास skip कर
//     const status = bill.meterStatus.toUpperCase().replace(/\s+/g, "_"); // Normalize key
  
//     // जर status आधीपासून असेल तर त्याचा count वाढव
//     // नसेल तर नवीन status add कर आणि count 1 ठेवा
//     meterStatusCounts[status] = (meterStatusCounts[status] || 0) + 1;
//   });

//   useEffect(() => {
//     if (chartRef.current) {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }

//       chartInstance.current = new Chart(chartRef.current, {
//         type: 'bar',
//         data: {
//           labels: Object.keys(meterStatusCounts),
//           datasets: [
//             {
//               label: `Meter Status Distribution (${currentMonthYear})`,
//               // label: `Meter Status Distribution (${previousMonthYear})`,
//                             data: Object.values(meterStatusCounts),
//               backgroundColor: '#1CCCF1',
//               borderColor: '#0099CC',
//               borderWidth: 1,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           scales: {
//             y: { beginAtZero: true }
//           }
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

// --------------------------------------------------------------------------------------

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';

const ChartComponent = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { bills } = useSelector((state) => state.bills);
  const user = useSelector(state => state.auth.user);
  
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const currentYear = currentDate.getFullYear();
  const currentMonthYear = `${currentMonth}-${currentYear}`;
  
  const prevDate = new Date();
  prevDate.setMonth(currentDate.getMonth() - 1);
  const previousMonth = prevDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const previousMonthYear = `${previousMonth}-${currentYear}`;

  const latestBills = bills.filter(bill =>
    bill.monthAndYear === currentMonthYear &&
    (user?.role !== 'Junior Engineer' || bill.ward === user?.ward || (user?.ward === 'Head Office' && user?.role === 'Junior Engineer'))
  );

  const previousBills = bills.filter(bill =>
    bill.monthAndYear === previousMonthYear &&
    (user?.role !== 'Junior Engineer' || bill.ward === user?.ward || (user?.ward === 'Head Office' && user?.role === 'Junior Engineer'))
  );

  // ⚡ Define Meter Status Categories
  const meterStatuses = ["FAULTY", "NORMAL", "R_N_A", "METER_CHNG", "NO_METER", "LOCKED", "INACC_RNT"];

  // ✅ Function to Count Meter Status Occurrences
  const getStatusCounts = (bills) => {
    const counts = meterStatuses.reduce((acc, status) => ({ ...acc, [status]: 0 }), {});
    bills.forEach(bill => {
      if (bill.meterStatus) {
        const status = bill.meterStatus.toUpperCase().replace(/\s+/g, "_");
        if (counts[status] !== undefined) {
          counts[status]++;
        }
      }
    });
    return counts;
  };

  const currentMonthCounts = getStatusCounts(latestBills);
  const previousMonthCounts = getStatusCounts(previousBills);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: meterStatuses,
          datasets: [
            {
              label: `Meter Status (${currentMonthYear})`,
              data: meterStatuses.map(status => currentMonthCounts[status]),
              backgroundColor: '#1CCCF1',
              borderColor: '#0099CC',
              borderWidth: 1,
            },
            {
              label: `Meter Status (${previousMonthYear})`,
              data: meterStatuses.map(status => previousMonthCounts[status]),
              backgroundColor: '#FFAE48',
              borderColor: '#FF8C00',
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
