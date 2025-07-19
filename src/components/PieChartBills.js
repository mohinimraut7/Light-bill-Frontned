
// import React, { useEffect, useRef } from "react";
// import Chart from "chart.js/auto";
// import { useSelector } from "react-redux";
// const BarChartBills = () => {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);
//   const { bills } = useSelector((state) => state.bills);
//   const user = useSelector((state) => state.auth.user);
//   const getMonthsForCurrentYear = () => {
//     const currentYear = new Date().getFullYear();
//     const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
//     return monthNames.map((month) => `${month}-${currentYear}`);
//   };
//   const monthsForAPI = getMonthsForCurrentYear();
//   const monthlyCounts = monthsForAPI.reduce((acc, month) => {
//     acc[month] = { paid: 0, unpaid: 0, overdue: 0 };
//     return acc;
//   }, {});
//   const today = new Date();
//   bills.forEach((bill) => {
//     if (monthsForAPI.includes(bill.monthAndYear)) {
//       const { monthAndYear, paymentStatus, dueDate, ward } = bill;
//       if (user?.role === "Junior Engineer" && user?.ward !== ward && user?.ward !== "Head Office") return;
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
//   const labels = monthsForAPI;
//   const paidData = labels.map((month) => monthlyCounts[month]?.paid || 0);
//   const unpaidData = labels.map((month) => monthlyCounts[month]?.unpaid || 0);
//   const overdueData = labels.map((month) => monthlyCounts[month]?.overdue || 0);

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
// export default BarChartBills;


// ----------------------------------------


import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
import { Box } from '@mui/material';

const BarChartBills = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { bills } = useSelector((state) => state.bills);
  const user = useSelector((state) => state.auth.user);
  
  const currentYear = new Date().getFullYear();
  
  const getMonthsForCurrentYear = () => {
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return monthNames.map((month) => `${month}-${currentYear}`);
  };
  
  const monthsForAPI = getMonthsForCurrentYear();
  
  const monthlyCounts = monthsForAPI.reduce((acc, month) => {
    acc[month] = { paid: 0, unpaid: 0, overdue: 0 };
    return acc;
  }, {});
  
  const today = new Date();
  
  bills.forEach((bill) => {
    if (monthsForAPI.includes(bill.monthAndYear)) {
      const { monthAndYear, paymentStatus, dueDate, ward } = bill;
      if (user?.role === "Junior Engineer" && user?.ward !== ward && user?.ward !== "Head Office") return;
      
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
  
  const labels = monthsForAPI;
  const paidData = labels.map((month) => monthlyCounts[month]?.paid || 0);
  const unpaidData = labels.map((month) => monthlyCounts[month]?.unpaid || 0);
  const overdueData = labels.map((month) => monthlyCounts[month]?.overdue || 0);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      chartInstance.current = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: labels.map(label => label.split('-')[0]), // Show only month names
          datasets: [
            {
              label: "Paid Bills",
              data: paidData,
              backgroundColor: "rgba(35, 204, 239, 0.8)",
              borderColor: "#23CCEF",
              borderWidth: 2,
              borderRadius: 4,
              borderSkipped: false,
            },
            {
              label: "Unpaid Bills",
              data: unpaidData,
              backgroundColor: "rgba(255, 174, 72, 0.8)",
              borderColor: "#FFAE48",
              borderWidth: 2,
              borderRadius: 4,
              borderSkipped: false,
            },
            {
              label: "Overdue Bills",
              data: overdueData,
              backgroundColor: "rgba(231, 76, 60, 0.8)",
              borderColor: "#E74C3C",
              borderWidth: 2,
              borderRadius: 4,
              borderSkipped: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            title: {
              display: true,
              text: `Monthly Bills Status Overview - ${currentYear}`,
              font: {
                size: 16,
                weight: 'bold'
              },
              color: '#333',
              padding: 20
            },
            legend: {
              display: true,
              position: 'top',
              labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                  size: 12,
                  weight: '500'
                }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#fff',
              bodyColor: '#fff',
              borderColor: '#ddd',
              borderWidth: 1,
              cornerRadius: 8,
              displayColors: true,
              callbacks: {
                title: function(context) {
                  return `Month: ${context[0].label} ${currentYear}`;
                },
                label: function(context) {
                  return `${context.dataset.label}: ${context.parsed.y} bills`;
                },
                footer: function(tooltipItems) {
                  let total = 0;
                  tooltipItems.forEach(function(tooltipItem) {
                    total += tooltipItem.parsed.y;
                  });
                  return `Total Bills: ${total}`;
                }
              }
            }
          },
          scales: {
            x: {
              stacked: true,
              grid: {
                display: false
              },
              ticks: {
                color: '#666',
                font: {
                  size: 11,
                  weight: '500'
                },
                maxRotation: 45,
                minRotation: 0
              }
            },
            y: {
              stacked: true,
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
                lineWidth: 1
              },
              ticks: {
                color: '#666',
                font: {
                  size: 11
                },
                stepSize: 1,
                callback: function(value) {
                  return Number.isInteger(value) ? value : '';
                }
              },
              title: {
                display: true,
                text: 'Number of Bills',
                color: '#666',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            }
          },
          elements: {
            bar: {
              borderWidth: 2,
            }
          },
          layout: {
            padding: {
              top: 10,
              bottom: 10,
              left: 10,
              right: 10
            }
          }
        },
      });
    }
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [bills, currentYear]);

  return (
    <Box sx={{ 
      width: '100%', 
      height: '400px',
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      padding: '16px',
      border: '1px solid #e0e0e0'
    }}>
      <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
    </Box>
  );
};

export default BarChartBills;

// ---------------------------------------------------

// import React, { useEffect, useRef } from "react";
// import Chart from "chart.js/auto";
// import { useSelector } from "react-redux";
// import { 
//   Box, 
//   Card, 
//   CardContent, 
//   Typography, 
//   Chip, 
//   Stack,
//   alpha 
// } from '@mui/material';
// import { 
//   TrendingUp, 
//   BarChart3 
// } from 'lucide-react';

// const BarChartBills = () => {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);
//   const { bills } = useSelector((state) => state.bills);
//   const user = useSelector((state) => state.auth.user);
  
//   const currentYear = new Date().getFullYear();
  
//   const getMonthsForCurrentYear = () => {
//     const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
//     return monthNames.map((month) => `${month}-${currentYear}`);
//   };
  
//   const monthsForAPI = getMonthsForCurrentYear();
  
//   const monthlyCounts = monthsForAPI.reduce((acc, month) => {
//     acc[month] = { paid: 0, unpaid: 0, overdue: 0 };
//     return acc;
//   }, {});
  
//   const today = new Date();
  
//   bills.forEach((bill) => {
//     if (monthsForAPI.includes(bill.monthAndYear)) {
//       const { monthAndYear, paymentStatus, dueDate, ward } = bill;
//       if (user?.role === "Junior Engineer" && user?.ward !== ward && user?.ward !== "Head Office") return;
      
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
  
//   const labels = monthsForAPI;
//   const paidData = labels.map((month) => monthlyCounts[month]?.paid || 0);
//   const unpaidData = labels.map((month) => monthlyCounts[month]?.unpaid || 0);
//   const overdueData = labels.map((month) => monthlyCounts[month]?.overdue || 0);

//   // Calculate totals for display
//   const totalPaid = paidData.reduce((sum, value) => sum + value, 0);
//   const totalUnpaid = unpaidData.reduce((sum, value) => sum + value, 0);
//   const totalOverdue = overdueData.reduce((sum, value) => sum + value, 0);
//   const grandTotal = totalPaid + totalUnpaid + totalOverdue;

//   useEffect(() => {
//     if (chartRef.current) {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
      
//       chartInstance.current = new Chart(chartRef.current, {
//         type: "bar",
//         data: {
//           labels: labels.map(label => label.split('-')[0]),
//           datasets: [
//             {
//               label: "Paid Bills",
//               data: paidData,
//               backgroundColor: "rgba(46, 204, 113, 0.8)",
//               borderColor: "#2ECC71",
//               borderWidth: 2,
//               borderRadius: 6,
//               borderSkipped: false,
//             },
//             {
//               label: "Unpaid Bills",
//               data: unpaidData,
//               backgroundColor: "rgba(28, 204, 241, 0.8)",
//               borderColor: "rgba(28, 204, 241, 0.8)",
//               borderWidth: 2,
//               borderRadius: 6,
//               borderSkipped: false,
//             },
//             {
//               label: "Overdue Bills",
//               data: overdueData,
//               backgroundColor: "rgba(255, 174, 72, 0.8)",
//               borderColor: "rgba(255, 174, 72, 0.8)",
//               borderWidth: 2,
//               borderRadius: 6,
//               borderSkipped: false,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           interaction: {
//             mode: 'index',
//             intersect: false,
//           },
//           plugins: {
//             title: {
//               display: false
//             },
//             legend: {
//               display: true,
//               position: 'top',
//               align: 'end',
//               labels: {
//                 usePointStyle: true,
//                 pointStyle: 'circle',
//                 padding: 15,
//                 font: {
//                   size: 11,
//                   weight: '600'
//                 },
//                 color: '#374151'
//               }
//             },
//             tooltip: {
//               backgroundColor: 'rgba(17, 24, 39, 0.95)',
//               titleColor: '#F9FAFB',
//               bodyColor: '#F9FAFB',
//               borderColor: '#374151',
//               borderWidth: 1,
//               cornerRadius: 12,
//               displayColors: true,
//               padding: 12,
//               titleFont: {
//                 size: 13,
//                 weight: 'bold'
//               },
//               bodyFont: {
//                 size: 12
//               },
//               callbacks: {
//                 title: function(context) {
//                   return `Month: ${context[0].label} ${currentYear}`;
//                 },
//                 label: function(context) {
//                   return `${context.dataset.label}: ${context.parsed.y} bills`;
//                 },
//                 footer: function(tooltipItems) {
//                   let total = 0;
//                   tooltipItems.forEach(function(tooltipItem) {
//                     total += tooltipItem.parsed.y;
//                   });
//                   return `Total Bills: ${total}`;
//                 }
//               }
//             }
//           },
//           scales: {
//             x: {
//               stacked: true,
//               grid: {
//                 display: false
//               },
//               border: {
//                 display: false
//               },
//               ticks: {
//                 color: '#6B7280',
//                 font: {
//                   size: 11,
//                   weight: '500'
//                 },
//                 maxRotation: 0,
//                 minRotation: 0
//               }
//             },
//             y: {
//               stacked: true,
//               beginAtZero: true,
//               border: {
//                 display: false
//               },
//               grid: {
//                 color: 'rgba(156, 163, 175, 0.2)',
//                 lineWidth: 1,
//                 drawTicks: false
//               },
//               ticks: {
//                 color: '#6B7280',
//                 font: {
//                   size: 11
//                 },
//                 stepSize: 1,
//                 padding: 10,
//                 callback: function(value) {
//                   return Number.isInteger(value) ? value : '';
//                 }
//               }
//             }
//           },
//           elements: {
//             bar: {
//               borderWidth: 2,
//             }
//           },
//           layout: {
//             padding: {
//               top: 5,
//               bottom: 5,
//               left: 5,
//               right: 5
//             }
//           }
//         },
//       });
//     }
    
//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, [bills, currentYear]);

//   return (
//     <Card 
//       elevation={0}
//       sx={{ 
//         width: '100%',
//         height: '500px',
//         background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
//         borderRadius: '16px',
//         border: '1px solid',
//         borderColor: alpha('#E5E7EB', 0.6),
//         overflow: 'hidden',
//         transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//         '&:hover': {
//           boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
//           transform: 'translateY(-2px)',
//           borderColor: alpha('#3B82F6', 0.2)
//         }
//       }}
//     >
//       <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
//         {/* Header Section */}
//         <Box sx={{ mb: 3 }}>
//           <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
//             <Stack direction="row" alignItems="center" spacing={2}>
//               <Box 
//                 sx={{ 
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   width: 48,
//                   height: 48,
//                   borderRadius: '12px',
//                   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                   boxShadow: '0 4px 14px 0 rgba(102, 126, 234, 0.4)'
//                 }}
//               >
//                 <BarChart3 size={24} color="white" />
//               </Box>
//               <Box>
//                 <Typography 
//                   variant="h6" 
//                   sx={{ 
//                     fontWeight: 700,
//                     fontSize: '1.25rem',
//                     color: '#1F2937',
//                     lineHeight: 1.2
//                   }}
//                 >
//                   Monthly Bills Status Overview - {currentYear}
//                 </Typography>
//                 <Typography 
//                   variant="body2" 
//                   sx={{ 
//                     color: '#6B7280',
//                     fontSize: '0.875rem',
//                     mt: 0.5
//                   }}
//                 >
//                   Comprehensive analysis of bill payment status across all months
//                 </Typography>
//               </Box>
//             </Stack>
//             <Chip
//               icon={<TrendingUp size={16} />}
//               label={`${grandTotal} Total Bills`}
//               sx={{
//                 background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
//                 color: 'white',
//                 fontWeight: 600,
//                 fontSize: '0.75rem',
//                 height: 32,
//                 '& .MuiChip-icon': {
//                   color: 'white'
//                 }
//               }}
//             />
//           </Stack>

//           {/* Stats Summary */}
//           <Stack direction="row" spacing={2} mb={2}>
//             <Box 
//               sx={{ 
//                 flex: 1,
//                 p: 2,
//                 borderRadius: '12px',
//                 background: 'linear-gradient(135deg, rgba(46, 204, 113, 0.1) 0%, rgba(46, 204, 113, 0.05) 100%)',
//                 border: '1px solid',
//                 borderColor: alpha('#2ECC71', 0.2)
//               }}
//             >
//               <Typography variant="body2" sx={{ color: '#059669', fontWeight: 600, fontSize: '0.75rem' }}>
//                 PAID BILLS
//               </Typography>
//               <Typography variant="h6" sx={{ color: '#065F46', fontWeight: 700, fontSize: '1.125rem' }}>
//                 {totalPaid.toLocaleString()}
//               </Typography>
//             </Box>
//             <Box 
//               sx={{ 
//                 flex: 1,
//                 p: 2,
//                 borderRadius: '12px',
//                 background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1) 0%, rgba(52, 152, 219, 0.05) 100%)',
//                 border: '1px solid',
//                 borderColor: alpha('#3498DB', 0.2)
//               }}
//             >
//               <Typography variant="body2" sx={{ color: '#1D4ED8', fontWeight: 600, fontSize: '0.75rem' }}>
//                 UNPAID BILLS
//               </Typography>
//               <Typography variant="h6" sx={{ color: '#1E40AF', fontWeight: 700, fontSize: '1.125rem' }}>
//                 {totalUnpaid.toLocaleString()}
//               </Typography>
//             </Box>
//             <Box 
//               sx={{ 
//                 flex: 1,
//                 p: 2,
//                 borderRadius: '12px',
//                 background: 'linear-gradient(135deg, rgba(231, 76, 60, 0.1) 0%, rgba(231, 76, 60, 0.05) 100%)',
//                 border: '1px solid',
//                 borderColor: alpha('#E74C3C', 0.2)
//               }}
//             >
//               <Typography variant="body2" sx={{ color: '#DC2626', fontWeight: 600, fontSize: '0.75rem' }}>
//                 OVERDUE BILLS
//               </Typography>
//               <Typography variant="h6" sx={{ color: '#B91C1C', fontWeight: 700, fontSize: '1.125rem' }}>
//                 {totalOverdue.toLocaleString()}
//               </Typography>
//             </Box>
//           </Stack>
//         </Box>

//         {/* Chart Container */}
//         <Box 
//           sx={{ 
//             flex: 1,
//             position: 'relative',
//             background: '#FFFFFF',
//             borderRadius: '12px',
//             border: '1px solid',
//             borderColor: alpha('#E5E7EB', 0.5),
//             p: 2,
//             minHeight: 0
//           }}
//         >
//           <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default BarChartBills;