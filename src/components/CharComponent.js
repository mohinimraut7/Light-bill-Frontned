// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';
// import { useSelector } from 'react-redux';
// import { Box, CircularProgress } from '@mui/material';

// const ChartComponent = () => {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);
//   const user = useSelector(state => state.auth.user);
//   const { bills: allBills, loading: isLoading } = useSelector(state => state.bills);

//   const currentDate = new Date();
//   const currentMonth = currentDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
//   const currentYear = currentDate.getFullYear();
//   const currentMonthYear = `${currentMonth}-${currentYear}`;

//   const prevDate = new Date();
//   prevDate.setMonth(prevDate.getMonth() - 1);
//   const previousMonth = prevDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
//   const prevYear = prevDate.getFullYear();
//   const previousMonthYear = `${previousMonth}-${prevYear}`;

//   const getFilteredBills = (billsData, monthYear) => {
//     return billsData.filter(bill =>
//       bill.monthAndYear === monthYear &&
//       (user?.role !== 'Junior Engineer' || bill.ward === user?.ward || user?.ward === 'Head Office')
//     );
//   };

//   const latestBills = getFilteredBills(allBills, currentMonthYear);
//   const previousBills = getFilteredBills(allBills, previousMonthYear);

//   const statusMapping = {
//     'R N A': 'R_N_A', 'RNA': 'R_N_A',
//     'METER CHNG': 'METER_CHNG', 'METER CHANGE': 'METER_CHNG', 'METERCHNG': 'METER_CHNG',
//     'NO METER': 'NO_METER', 'NOMETER': 'NO_METER',
//     'INACC RNT': 'INACC_RNT', 'INACCRENT': 'INACC_RNT', 'INACC RENT': 'INACC_RNT'
//   };

//   const normalizeStatus = (status) => {
//     const upper = status.toString().trim().toUpperCase();
//     return statusMapping[upper] || upper.replace(/\s+/g, '_');
//   };

//   const getAllUniqueStatuses = (bills) => {
//     const statusSet = new Set();
//     bills.forEach(bill => {
//       if (bill.meterStatus) statusSet.add(normalizeStatus(bill.meterStatus));
//     });
//     return Array.from(statusSet).sort();
//   };

//   const meterStatuses = getAllUniqueStatuses(allBills);

//   const getStatusCounts = (bills) => {
//     const counts = meterStatuses.reduce((acc, s) => ({ ...acc, [s]: 0 }), {});
//     bills.forEach(bill => {
//       if (bill.meterStatus) {
//         const mapped = normalizeStatus(bill.meterStatus);
//         if (counts[mapped] !== undefined) counts[mapped]++;
//       }
//     });
//     return counts;
//   };

//   const currentMonthCounts = getStatusCounts(latestBills);
//   const previousMonthCounts = getStatusCounts(previousBills);

//   useEffect(() => {
//     if (!chartRef.current || isLoading || allBills.length === 0) return;
//     if (chartInstance.current) chartInstance.current.destroy();

//     chartInstance.current = new Chart(chartRef.current, {
//       type: 'bar',
//       data: {
//         labels: meterStatuses.map(s => s.replace(/_/g, ' ')),
//         datasets: [
//           {
//             label: `Current Month (${currentMonthYear})`,
//             data: meterStatuses.map(s => currentMonthCounts[s] || 0),
//             backgroundColor: 'rgba(28, 204, 241, 0.8)',
//             borderColor: '#1CCCF1', borderWidth: 2, borderRadius: 4, borderSkipped: false,
//           },
//           {
//             label: `Previous Month (${previousMonthYear})`,
//             data: meterStatuses.map(s => previousMonthCounts[s] || 0),
//             backgroundColor: 'rgba(255, 174, 72, 0.8)',
//             borderColor: '#FFAE48', borderWidth: 2, borderRadius: 4, borderSkipped: false,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         interaction: { mode: 'index', intersect: false },
//         plugins: {
//           title: {
//             display: true,
//             text: `Meter Status Comparison: ${previousMonth} vs ${currentMonth} ${currentYear}`,
//             font: { size: 16, weight: 'bold' },
//             color: '#333',
//             padding: 20
//           },
//           legend: {
//             display: true,
//             position: 'top',
//             labels: { usePointStyle: true, padding: 20 }
//           },
//           tooltip: {
//             backgroundColor: 'rgba(0,0,0,0.8)',
//             titleColor: '#fff',
//             bodyColor: '#fff',
//             callbacks: {
//               title: (ctx) => `Meter Status: ${ctx[0].label}`,
//               label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y} meters`
//             }
//           }
//         },
//         scales: {
//           x: {
//             grid: { display: false },
//             ticks: { maxRotation: 45, minRotation: 45 }
//           },
//           y: {
//             beginAtZero: true,
//             ticks: { callback: v => Number.isInteger(v) ? v : '' },
//             title: { display: true, text: 'Number of Meters' }
//           }
//         }
//       },
//     });

//     return () => { if (chartInstance.current) chartInstance.current.destroy(); };
//   }, [allBills, isLoading]);

//   if (isLoading) {
//     return (
//       <Box sx={{
//         width: '100%', height: '400px', backgroundColor: '#fff',
//         borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//         padding: '16px', border: '1px solid #e0e0e0',
//         display: 'flex', justifyContent: 'center', alignItems: 'center'
//       }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{
//       width: '100%', height: '400px', backgroundColor: '#fff',
//       borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//       padding: '16px', border: '1px solid #e0e0e0'
//     }}>
//       <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
//     </Box>
//   );
// };

// export default ChartComponent;



import React, { useEffect, useMemo, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';
import ChartCard from './charts/ChartCard';
import {
  COLORS,
  prefersReducedMotion,
  verticalGradient,
  hoverLinePlugin,
  lineRevealPlugin,
  createTooltipHandler,
  buildBaseOptions,
  buildScales,
} from './charts/chartTheme';

// ── Data mapping: tasach (fakt component baher halvla) ─────────────────────
const statusMapping = {
  'R N A': 'R_N_A', 'RNA': 'R_N_A',
  'METER CHNG': 'METER_CHNG', 'METER CHANGE': 'METER_CHNG', 'METERCHNG': 'METER_CHNG',
  'NO METER': 'NO_METER', 'NOMETER': 'NO_METER',
  'INACC RNT': 'INACC_RNT', 'INACCRENT': 'INACC_RNT', 'INACC RENT': 'INACC_RNT'
};

const normalizeStatus = (status) => {
  const upper = status.toString().trim().toUpperCase();
  return statusMapping[upper] || upper.replace(/\s+/g, '_');
};

const getAllUniqueStatuses = (bills) => {
  const statusSet = new Set();
  bills.forEach(bill => {
    if (bill.meterStatus) statusSet.add(normalizeStatus(bill.meterStatus));
  });
  return Array.from(statusSet).sort();
};

// ── Tooltip (module level — ekdach banto) ──────────────────────────────────
const tooltipHandler = createTooltipHandler({
  formatTitle: (points) => `Status: ${points[0] ? points[0].label : ''}`,
  formatValue: (p) => `${Number(p.parsed.y).toLocaleString('en-IN')} meters`,
});

const makeLineDataset = ({ label, tooltipLabel, data, color, areaTop, order }) => ({
  label,
  tooltipLabel,
  data,
  order,
  accentColor: color,
  borderColor: color,
  borderWidth: 2.5,
  fill: true,
  backgroundColor: (c) => verticalGradient(c.chart, areaTop, 'rgba(255,255,255,0)'),
  cubicInterpolationMode: 'monotone', // smooth, pan 0 chya khali jaat nahi
  pointRadius: 3,
  pointBackgroundColor: '#fff',
  pointBorderColor: color,
  pointBorderWidth: 1.5,
  pointHoverRadius: 6,
  pointHoverBackgroundColor: color,
  pointHoverBorderColor: '#fff',
  pointHoverBorderWidth: 3,
});

const ChartComponent = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const user = useSelector(state => state.auth.user);
  const { bills: allBills, loading: isLoading } = useSelector(state => state.bills);

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const currentYear = currentDate.getFullYear();
  const currentMonthYear = `${currentMonth}-${currentYear}`;

  const prevDate = new Date();
  prevDate.setMonth(prevDate.getMonth() - 1);
  const previousMonth = prevDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const prevYear = prevDate.getFullYear();
  const previousMonthYear = `${previousMonth}-${prevYear}`;

  // Display sathi Title-case (Sep / Oct)
  const currentMonthLabel = currentDate.toLocaleString('en-US', { month: 'short' });
  const previousMonthLabel = prevDate.toLocaleString('en-US', { month: 'short' });

  // ── Counts: logic tasach, fakt useMemo madhe (bills/user badalle tarach recalculate) ──
  const chartData = useMemo(() => {
    const getFilteredBills = (billsData, monthYear) => {
      return billsData.filter(bill =>
        bill.monthAndYear === monthYear &&
        (user?.role !== 'Junior Engineer' || bill.ward === user?.ward || user?.ward === 'Head Office')
      );
    };

    const latestBills = getFilteredBills(allBills, currentMonthYear);
    const previousBills = getFilteredBills(allBills, previousMonthYear);
    const meterStatuses = getAllUniqueStatuses(allBills);

    const getStatusCounts = (bills) => {
      const counts = meterStatuses.reduce((acc, s) => ({ ...acc, [s]: 0 }), {});
      bills.forEach(bill => {
        if (bill.meterStatus) {
          const mapped = normalizeStatus(bill.meterStatus);
          if (counts[mapped] !== undefined) counts[mapped]++;
        }
      });
      return counts;
    };

    const currentMonthCounts = getStatusCounts(latestBills);
    const previousMonthCounts = getStatusCounts(previousBills);

    return {
      labels: meterStatuses.map(s => s.replace(/_/g, ' ')),
      current: meterStatuses.map(s => currentMonthCounts[s] || 0),
      previous: meterStatuses.map(s => previousMonthCounts[s] || 0),
    };
  }, [allBills, user, currentMonthYear, previousMonthYear]);

  useEffect(() => {
    if (!chartRef.current || isLoading || allBills.length === 0) return;

    const reduced = prefersReducedMotion();
    const base = buildBaseOptions({ tooltipHandler, legendPointStyle: 'circle' });

    const chart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: chartData.labels,
        datasets: [
          makeLineDataset({
            label: `Current Month (${currentMonthYear})`,
            tooltipLabel: `${currentMonthLabel} ${currentYear}`,
            data: chartData.current,
            color: COLORS.blue,
            areaTop: 'rgba(47, 107, 255, 0.22)',
            order: 0,
          }),
          makeLineDataset({
            label: `Previous Month (${previousMonthYear})`,
            tooltipLabel: `${previousMonthLabel} ${prevYear}`,
            data: chartData.previous,
            color: COLORS.orange,
            areaTop: 'rgba(246, 160, 33, 0.26)',
            order: 1,
          }),
        ],
      },
      options: {
        ...base,
        animation: { duration: 0 }, // drawing animation plugin karto
        transitions: { active: { animation: { duration: reduced ? 0 : 200 } } },
        plugins: {
          ...base.plugins,
          vvLineReveal: { duration: reduced ? 0 : 1100 },
        },
        scales: buildScales(),
      },
      plugins: [lineRevealPlugin, hoverLinePlugin],
    });

    chartInstance.current = chart;
    return () => {
      chart.destroy();
      chartInstance.current = null;
    };
  }, [chartData, isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ChartCard
      title={`Meter Status Comparison: ${previousMonth} vs ${currentMonth} ${currentYear}`}
      subtitle="Meters by status, month over month"
      periodLabel={`${previousMonthLabel} ${prevYear} – ${currentMonthLabel} ${currentYear}`}
      loading={isLoading}
      empty={!isLoading && allBills.length === 0}
      emptyText="No meter data available"
    >
      <canvas
        ref={chartRef}
        role="img"
        aria-label={`Meter status comparison between ${previousMonthYear} and ${currentMonthYear}`}
        // style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}



      />
    </ChartCard>
  );
};

export default ChartComponent;
