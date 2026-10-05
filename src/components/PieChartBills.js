// import React, { useEffect, useRef } from "react";
// import Chart from "chart.js/auto";
// import { useSelector } from "react-redux";
// import { Box, CircularProgress } from '@mui/material';

// const PieChartBills = () => {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);
//   const user = useSelector((state) => state.auth.user);
//   const { bills: allBills, loading } = useSelector((state) => state.bills);

//   const currentYear = new Date().getFullYear();
//   const monthNames = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
//   const monthsForAPI = monthNames.map((m) => `${m}-${currentYear}`);

//   const monthlyCounts = monthsForAPI.reduce((acc, month) => {
//     acc[month] = { paid: 0, unpaid: 0, overdue: 0 };
//     return acc;
//   }, {});

//   const today = new Date();
//   allBills.forEach((bill) => {
//     if (!monthsForAPI.includes(bill.monthAndYear)) return;
//     if (user?.role === "Junior Engineer" && user?.ward !== bill.ward && user?.ward !== "Head Office") return;
//     if (bill.paymentStatus === "paid") {
//       monthlyCounts[bill.monthAndYear].paid++;
//     } else if (bill.paymentStatus === "unpaid") {
//       monthlyCounts[bill.monthAndYear].overdue += new Date(bill.dueDate) < today ? 1 : 0;
//       monthlyCounts[bill.monthAndYear].unpaid += new Date(bill.dueDate) >= today ? 1 : 0;
//     }
//   });

//   const paidData = monthsForAPI.map((m) => monthlyCounts[m].paid);
//   const unpaidData = monthsForAPI.map((m) => monthlyCounts[m].unpaid);
//   const overdueData = monthsForAPI.map((m) => monthlyCounts[m].overdue);

//   useEffect(() => {
//     if (!chartRef.current || loading) return;
//     if (chartInstance.current) chartInstance.current.destroy();
//     chartInstance.current = new Chart(chartRef.current, {
//       type: "bar",
//       data: {
//         labels: monthNames,
//         datasets: [
//           { label: "Paid Bills", data: paidData, backgroundColor: "rgba(35,204,239,0.8)", borderColor: "#23CCEF", borderWidth: 2, borderRadius: 4, borderSkipped: false },
//           { label: "Unpaid Bills", data: unpaidData, backgroundColor: "rgba(255,174,72,0.8)", borderColor: "#FFAE48", borderWidth: 2, borderRadius: 4, borderSkipped: false },
//           { label: "Overdue Bills", data: overdueData, backgroundColor: "rgba(231,76,60,0.8)", borderColor: "#E74C3C", borderWidth: 2, borderRadius: 4, borderSkipped: false },
//         ],
//       },
//       options: {
//         responsive: true, maintainAspectRatio: false,
//         plugins: {
//           title: { display: true, text: `Monthly Bills Status Overview - ${currentYear}`, font: { size: 16, weight: 'bold' } },
//           legend: { display: true, position: 'top' },
//         },
//         scales: {
//           x: { stacked: true, grid: { display: false } },
//           y: { stacked: true, beginAtZero: true, title: { display: true, text: 'Number of Bills' } }
//         }
//       },
//     });
//     return () => { if (chartInstance.current) chartInstance.current.destroy(); };
//   }, [allBills, loading]);

//   if (loading) return <Box sx={{ width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></Box>;

//   return (
//     <Box sx={{ width: '100%', height: '400px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', padding: '16px', border: '1px solid #e0e0e0' }}>
//       <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
//     </Box>
//   );
// };

// export default PieChartBills;





import React, { useEffect, useMemo, useRef } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
import ChartCard from "./charts/ChartCard";
import {
  prefersReducedMotion,
  verticalGradient,
  hoverBandPlugin,
  createTooltipHandler,
  buildBaseOptions,
  buildScales,
} from "./charts/chartTheme";

const monthNames = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
// Display sathi: Jan, Feb ...
const monthLabels = monthNames.map((m) => m.charAt(0) + m.slice(1).toLowerCase());

// Tooltip (module level — ekdach banto)
const tooltipHandler = createTooltipHandler({
  formatTitle: (points) => `${points[0] ? points[0].label : ""} ${new Date().getFullYear()}`,
  formatValue: (p) => Number(p.parsed.y).toLocaleString("en-IN"),
});

// Paid = teal-green, Unpaid = orange, Overdue = coral red, Faulty = soft red
const makeBarDataset = (label, data, rgb, accentColor) => ({
  label,
  data,
  accentColor,
  borderWidth: 0,
  borderRadius: { topLeft: 6, topRight: 6, bottomLeft: 0, bottomRight: 0 },
  borderSkipped: false,
  barPercentage: 0.85,
  categoryPercentage: 0.74,
  maxBarThickness: 11,
  backgroundColor: (c) => verticalGradient(c.chart, `rgba(${rgb},0.92)`, `rgba(${rgb},0.55)`),
  hoverBackgroundColor: (c) => verticalGradient(c.chart, `rgba(${rgb},1)`, `rgba(${rgb},0.80)`),
});

const PieChartBills = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const { bills: allBills, loading } = useSelector((state) => state.bills);

  const currentYear = new Date().getFullYear();

  // ── Counts: logic tasach + Faulty add kela; useMemo madhe ──
  const series = useMemo(() => {
    const monthsForAPI = monthNames.map((m) => `${m}-${currentYear}`);

    const monthlyCounts = monthsForAPI.reduce((acc, month) => {
      acc[month] = { paid: 0, unpaid: 0, overdue: 0, faulty: 0 };
      return acc;
    }, {});

    const today = new Date();
    allBills.forEach((bill) => {
      if (!monthsForAPI.includes(bill.monthAndYear)) return;
      if (user?.role === "Junior Engineer" && user?.ward !== bill.ward && user?.ward !== "Head Office") return;
      if (bill.paymentStatus === "paid") {
        monthlyCounts[bill.monthAndYear].paid++;
      } else if (bill.paymentStatus === "unpaid") {
        monthlyCounts[bill.monthAndYear].overdue += new Date(bill.dueDate) < today ? 1 : 0;
        monthlyCounts[bill.monthAndYear].unpaid += new Date(bill.dueDate) >= today ? 1 : 0;
      }
      // Faulty: paid/unpaid cha vegla count (Home cha "Total Faulty Meters" sarkhach check)
      if (bill.meterStatus === "FAULTY") {
        monthlyCounts[bill.monthAndYear].faulty++;
      }
    });

    return {
      paid: monthsForAPI.map((m) => monthlyCounts[m].paid),
      unpaid: monthsForAPI.map((m) => monthlyCounts[m].unpaid),
      overdue: monthsForAPI.map((m) => monthlyCounts[m].overdue),
      faulty: monthsForAPI.map((m) => monthlyCounts[m].faulty),
    };
  }, [allBills, user, currentYear]);

  useEffect(() => {
    if (!chartRef.current || loading) return;

    const reduced = prefersReducedMotion();
    const base = buildBaseOptions({ tooltipHandler, legendPointStyle: "rectRounded" });

    const chart = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: monthLabels,
        datasets: [
          makeBarDataset("Paid Bills", series.paid, "20,166,128", "#14A680"),
          makeBarDataset("Unpaid Bills", series.unpaid, "246,160,33", "#F6A021"),
          makeBarDataset("Overdue Bills", series.overdue, "236,94,84", "#EC5E54"),
          makeBarDataset("Faulty Bills", series.faulty, "240,140,150", "#F08C96"),
        ],
      },
      options: {
        ...base,
        // bars baseline pasun var chadhtat (halka stagger)
        animation: reduced
          ? false
          : {
              duration: 850,
              easing: "easeOutCubic",
              delay: (c) =>
                c.type === "data" && c.mode === "default" ? c.dataIndex * 28 + c.datasetIndex * 36 : 0,
            },
        transitions: { active: { animation: { duration: reduced ? 0 : 180 } } },
        scales: buildScales(), // grouped (stacked nahi)
      },
      plugins: [hoverBandPlugin],
    });

    chartInstance.current = chart;
    return () => {
      chart.destroy();
      chartInstance.current = null;
    };
  }, [series, loading]);

  return (
    <ChartCard
      title={`Monthly Bills Status Overview - ${currentYear}`}
      subtitle="Paid, unpaid, overdue and faulty bills by month"
      periodLabel={`${currentYear}`}
      loading={loading}
    >
      <canvas
        ref={chartRef}
        role="img"
        aria-label={`Monthly bills status overview for ${currentYear}`}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      />
    </ChartCard>
  );
};

export default PieChartBills;