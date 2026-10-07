// NEW (7-Oct-2026): Home — Bills payment success rate graph (mage chya 6 mahinyanche)
//   Success Rate  = paid bills / total bills × 100
//   On-time Rate  = due date paryant bharlele bills / total bills × 100
//                   (billPaymentDate vachta aali tarach dakhavto)
import React, { useEffect, useMemo, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';
import ChartCard from './ChartCard';
import {
  COLORS,
  prefersReducedMotion,
  verticalGradient,
  hoverLinePlugin,
  lineRevealPlugin,
  createTooltipHandler,
  buildBaseOptions,
  buildScales,
} from './chartTheme';
import { lastNMonths } from './monthUtils';

const MONTHS_TO_SHOW = 6;
const GREEN = '#14A680';

const tooltipHandler = createTooltipHandler({
  formatTitle: (points) => (points[0] ? points[0].label : ''),
  formatValue: (p) => {
    const i = p.dataIndex;
    const num = p.dataset.counts?.[i] ?? 0;
    const den = p.dataset.totals?.[i] ?? 0;
    return `${Number(p.parsed.y).toFixed(1)}%  (${num.toLocaleString('en-IN')}/${den.toLocaleString('en-IN')})`;
  },
});

const makeLineDataset = ({ label, data, counts, totals, color, areaTop, order }) => ({
  label,
  data,
  counts,
  totals,
  order,
  accentColor: color,
  borderColor: color,
  borderWidth: 2.5,
  fill: true,
  backgroundColor: (c) => verticalGradient(c.chart, areaTop, 'rgba(255,255,255,0)'),
  cubicInterpolationMode: 'monotone',
  pointRadius: 3,
  pointBackgroundColor: '#fff',
  pointBorderColor: color,
  pointBorderWidth: 1.5,
  pointHoverRadius: 6,
  pointHoverBackgroundColor: color,
  pointHoverBorderColor: '#fff',
  pointHoverBorderWidth: 3,
});

const pct = (num, den) => (den > 0 ? Math.round((num / den) * 1000) / 10 : 0);

const BillSuccessRateChart = () => {
  const chartRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const { bills: allBills, loading } = useSelector((state) => state.bills);

  const months = useMemo(() => lastNMonths(MONTHS_TO_SHOW), []);

  const series = useMemo(() => {
    const counts = Object.fromEntries(months.map((m) => [m.key, { total: 0, paid: 0, onTime: 0 }]));
    let paymentDateKnown = false;

    allBills.forEach((bill) => {
      const c = counts[bill.monthAndYear];
      if (!c) return;
      if (user?.role === 'Junior Engineer' && user?.ward !== 'Head Office' && bill.ward !== user?.ward) return;
      c.total++;
      if (bill.paymentStatus === 'paid') {
        c.paid++;
        const paidOn = bill.billPaymentDate ? new Date(bill.billPaymentDate) : null;
        const due = new Date(bill.dueDate);
        if (paidOn && !isNaN(paidOn) && !isNaN(due)) {
          paymentDateKnown = true;
          if (paidOn <= due) c.onTime++;
        }
      }
    });

    const totals = months.map((m) => counts[m.key].total);
    const paid = months.map((m) => counts[m.key].paid);
    const onTime = months.map((m) => counts[m.key].onTime);
    return {
      totals,
      paid,
      onTime,
      paidRate: months.map((m, i) => pct(paid[i], totals[i])),
      onTimeRate: months.map((m, i) => pct(onTime[i], totals[i])),
      paymentDateKnown,
    };
  }, [allBills, user, months]);

  useEffect(() => {
    if (!chartRef.current || loading) return;
    const reduced = prefersReducedMotion();
    const base = buildBaseOptions({ tooltipHandler, legendPointStyle: 'circle' });
    const scales = buildScales();

    const datasets = [
      makeLineDataset({
        label: 'Success Rate (Paid %)',
        data: series.paidRate,
        counts: series.paid,
        totals: series.totals,
        color: GREEN,
        areaTop: 'rgba(20, 166, 128, 0.22)',
        order: 0,
      }),
    ];
    if (series.paymentDateKnown) {
      datasets.push(
        makeLineDataset({
          label: 'Paid On Time %',
          data: series.onTimeRate,
          counts: series.onTime,
          totals: series.totals,
          color: COLORS.blue,
          areaTop: 'rgba(47, 107, 255, 0.16)',
          order: 1,
        })
      );
    }

    const chart = new Chart(chartRef.current, {
      type: 'line',
      data: { labels: months.map((m) => m.label), datasets },
      options: {
        ...base,
        animation: { duration: 0 },
        transitions: { active: { animation: { duration: reduced ? 0 : 200 } } },
        plugins: { ...base.plugins, vvLineReveal: { duration: reduced ? 0 : 1100 } },
        scales: {
          ...scales,
          y: {
            ...scales.y,
            min: 0,
            max: 100,
            grace: 0,
            ticks: { ...scales.y.ticks, stepSize: 25, callback: (v) => `${v}%` },
          },
        },
      },
      plugins: [lineRevealPlugin, hoverLinePlugin],
    });
    return () => chart.destroy();
  }, [series, loading, months]);

  return (
    <ChartCard
      title="Bills Payment Success Rate"
      subtitle="Share of each month's bills that have been paid"
      periodLabel={`${months[0].label} – ${months[months.length - 1].label}`}
      loading={loading}
      empty={!loading && allBills.length === 0}
      emptyText="No bill data available"
    >
      <canvas ref={chartRef} role="img" aria-label="Monthly bill payment success rate in percent" />
    </ChartCard>
  );
};

export default BillSuccessRateChart;
