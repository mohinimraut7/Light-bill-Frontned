// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';
// import { useDispatch, useSelector } from 'react-redux';
// const PieChartBills = () => {
//   const chartRef = useRef(null); 
//   const chartInstance = useRef(null); 
//  const dispatch = useDispatch();
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const { bills, loading: loadingBills, error: errorBills } = useSelector((state) => state.bills);
//   const { meters, loading: loadingMeters, error: errorUsers } = useSelector((state) => state.meters);
//     const user = useSelector(state => state.auth.user);


//   const uniqueBills = bills
//   .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)) 
//   .filter((bill, index, self) => {
//     return index === self.findIndex(b => b.cn === bill.cn);
//   });

// // const meterStatusCounts = uniqueBills.reduce((acc, bill) => {
// //     if (bill.meterStatus === 'Faulty') {
// //         acc.Faulty += 1;
// //     } else if (bill.meterStatus === 'Average') {
// //         acc.Average += 1;
// //     }
// //     return acc;
// // }, { Faulty: 0, Average: 0 });


// const today = new Date(); 

// const upcomingOverdueCount = bills.filter(bill => bill.dueAlert === true).length;

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


// const paidBillCount = bills.filter(bill => {
//   const ispaid = bill.paymentStatus === 'paid';
//   return ispaid
// }).length;

// const passedDueDateCount = bills.filter(bill => {
//   const dueDate = new Date(bill.dueDate);
//   const isOverdue = dueDate < today;
//   const isUnpaid = bill.paymentStatus === 'unpaid';

//   if (user?.role === 'Junior Engineer') {
//     return isOverdue && isUnpaid && user?.ward === bill.ward;
//   }
//   return isOverdue && isUnpaid;
// }).length;


//   useEffect(() => {
//     if (chartRef.current) {
     
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }

      
//       chartInstance.current = new Chart(chartRef.current, {
//         type: 'pie', 
//         data: {
//           labels: ['Paid Bills','Upcoming Due Bills','Overdue Bills', uniqueBills.length], 
//           datasets: [
//             {
//               label: 'Metffffer Status Distribution',
//               data: [paidBillCount,dueAlertCount,passedDueDateCount ,10], 
//               backgroundColor: [
//                 '#E74C3C', 
//                 '#23CCEF', 
//                 '#FFAE48', 
//                 '#F3F3F3', 
//               ],
//               borderColor: [
//               '#E74C3C', 
//                 '#23CCEF', 
//                 '#FFAE48', 
//               ],
//               borderWidth: 1,
//             },
//           ],
//         },
//         options: {
//           responsive: true, // Make chart responsive
//           maintainAspectRatio: false, // Allow chart to fill parent container
//           plugins: {
//             legend: {
//               position: 'top', // Position of the legend
//             },
//             tooltip: {
//               callbacks: {
//                 label: function (tooltipItem) {
//                   return `${tooltipItem.label}: ${tooltipItem.raw}%`; // Display percentage on tooltip
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
//   }, []);

//   return (
 
//       <canvas ref={chartRef}></canvas>
    
//   );
// };

// export default PieChartBills;
// ---------------------------------------------------------------------------
// import React, { useEffect, useRef } from "react";
// import Chart from "chart.js/auto";
// import { useSelector } from "react-redux";

// const PieChartBills = () => {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   const { bills } = useSelector((state) => state.bills);
//   const user = useSelector((state) => state.auth.user);

//   // 🔹 Generate Month-Year Labels (JAN-2025, FEB-2025, ...)
//   const getMonthsForCurrentYear = () => {
//     const currentYear = new Date().getFullYear();
//     const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
//     return monthNames.map((month) => `${month}-${currentYear}`);
//   };

//   const monthsForAPI = getMonthsForCurrentYear();

//   // 🔹 Initialize Data Object for Each Month
//   const monthlyCounts = monthsForAPI.reduce((acc, month) => {
//     acc[month] = { paid: 0, unpaid: 0, overdue: 0 };
//     return acc;
//   }, {});

//   // 🔹 Today's Date for Overdue Calculation
//   const today = new Date();

//   // 🔹 Process Bills and Count Paid, Unpaid, Overdue for Each Month
//   bills.forEach((bill) => {
//     if (monthsForAPI.includes(bill.monthAndYear)) {
//       const { monthAndYear, paymentStatus, dueDate, ward } = bill;

//       // Apply Role-Based Filtering (For Junior Engineer)
//       if (user?.role === "Junior Engineer" && user?.ward !== ward) return;

//       if (paymentStatus === "paid") {
//         monthlyCounts[monthAndYear].paid++;
//       } else if (paymentStatus === "unpaid") {
//         const due = new Date(dueDate);
//         if (due < today) {
//           monthlyCounts[monthAndYear].overdue++;
//         } else {
//           monthlyCounts[monthAndYear].unpaid++;
//         }
//       }
//     }
//   });

//   // 🔹 Convert Data into Chart.js Format
//   const labels = monthsForAPI;
//   const paidData = labels.map((month) => monthlyCounts[month].paid);
//   const unpaidData = labels.map((month) => monthlyCounts[month].unpaid);
//   const overdueData = labels.map((month) => monthlyCounts[month].overdue);

//   useEffect(() => {
//     if (chartRef.current) {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }

//       chartInstance.current = new Chart(chartRef.current, {
//         type: "bar",
//         data: {
//           labels,
//           datasets: [
//             {
//               label: "Paid Bills",
//               data: paidData,
//               backgroundColor: "#23CCEF",
//             },
//             {
//               label: "Unpaid Bills",
//               data: unpaidData,
//               backgroundColor: "#FFAE48",
//             },
//             {
//               label: "Overdue Bills",
//               data: overdueData,
//               backgroundColor: "#E74C3C",
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           plugins: {
//             legend: { position: "top" },
//           },
//           scales: {
//             x: { stacked: true },
//             y: { stacked: true },
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

//   return (
//     <div style={{ width: "100%", height: "400px" }}>
//       <canvas ref={chartRef}></canvas>
//     </div>
//   );
// };

// export default PieChartBills;
// =============================================================
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";

const BarChartBills = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const { bills } = useSelector((state) => state.bills);
  console.log("Total Bills from API:", bills.length);
  const user = useSelector((state) => state.auth.user);

  // 🔹 Get all 12 months with year (JAN-2025, FEB-2025, ...)
  const getMonthsForCurrentYear = () => {
    const currentYear = new Date().getFullYear();
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return monthNames.map((month) => `${month}-${currentYear}`);
  };

  const monthsForAPI = getMonthsForCurrentYear();

  // 🔹 Initialize all months with zero values
  const monthlyCounts = monthsForAPI.reduce((acc, month) => {
    acc[month] = { paid: 0, unpaid: 0, overdue: 0 };
    return acc;
  }, {});

  // 🔹 Today's Date for Overdue Calculation
  const today = new Date();

  // 🔹 Process Bills and Count Paid, Unpaid, Overdue for Each Month
  bills.forEach((bill) => {
    if (monthsForAPI.includes(bill.monthAndYear)) {
      const { monthAndYear, paymentStatus, dueDate, ward } = bill;


    
      // Apply Role-Based Filtering (For Junior Engineer)
      if (user?.role === "Junior Engineer" && user?.ward !== ward) return;

      if (paymentStatus === "paid") {
        monthlyCounts[monthAndYear].paid++;
      } else if (paymentStatus === "unpaid") {
        const due = new Date(dueDate);
        if (due < today) {
          monthlyCounts[monthAndYear].overdue++;
        } else {
          monthlyCounts[monthAndYear].unpaid++;
        }
      }
    }
  });

  // 🔹 Ensure all months have data (even if 0)
  const labels = monthsForAPI;
  const paidData = labels.map((month) => monthlyCounts[month]?.paid || 0);
  const unpaidData = labels.map((month) => monthlyCounts[month]?.unpaid || 0);
  const overdueData = labels.map((month) => monthlyCounts[month]?.overdue || 0);
  console.log("Processed Bills in Chart:", Object.values(monthlyCounts).reduce((sum, month) => sum + month.paid + month.unpaid + month.overdue, 0));

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Paid Bills",
              data: paidData,
              backgroundColor: "#23CCEF",
            },
            {
              label: "Unpaid Bills",
              data: unpaidData,
              backgroundColor: "#FFAE48",
            },
            {
              label: "Overdue Bills",
              data: overdueData,
              backgroundColor: "#E74C3C",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top" },
          },
          scales: {
            x: { stacked: true },
            y: { stacked: true },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [bills]);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default BarChartBills;
