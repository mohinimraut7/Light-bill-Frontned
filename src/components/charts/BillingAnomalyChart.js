// NEW (7-Oct-2026): Home — Billing Anomalies graph (mage chya 6 mahinyanche)
// Logic Billing Anomalies page (pages/BillingAnomaly.js) sarkhach:
//   Zero Consumption : totalConsumption === 0
//   High Bill        : chalu bill >= mage chya bill × 1.25
//   Low Bill         : chalu bill <= mage chya bill × 0.75
import React, { useEffect, useMemo, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';
import ChartCard from './ChartCard';
import {
  prefersReducedMotion,
  verticalGradient,
  hoverBandPlugin,
  createTooltipHandler,
  buildBaseOptions,
  buildScales,
} from './chartTheme';
import { lastNMonths } from './monthUtils';

const MONTHS_TO_SHOW = 6;

const tooltipHandler = createTooltipHandler({
  formatTitle: (points) => (points[0] ? points[0].label : ''),
  formatValue: (p) => `${Number(p.parsed.y).toLocaleString('en-IN')} bills`,
});

const makeBarDataset = (label, data, rgb, accentColor) => ({
  label,
  data,
  accentColor,
  borderWidth: 0,
  borderRadius: { topLeft: 6, topRight: 6, bottomLeft: 0, bottomRight: 0 },
  borderSkipped: false,
  barPercentage: 0.85,
  categoryPercentage: 0.7,
  maxBarThickness: 16,
  backgroundColor: (c) => verticalGradient(c.chart, `rgba(${rgb},0.92)`, `rgba(${rgb},0.55)`),
  hoverBackgroundColor: (c) => verticalGradient(c.chart, `rgba(${rgb},1)`, `rgba(${rgb},0.80)`),
});

const BillingAnomalyChart = () => {
  const chartRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const { bills: allBills, loading } = useSelector((state) => state.bills);

  const months = useMemo(() => lastNMonths(MONTHS_TO_SHOW), []);

  const series = useMemo(() => {
    const wanted = new Set(months.map((m) => m.key));
    const counts = Object.fromEntries(months.map((m) => [m.key, { zero: 0, high: 0, low: 0 }]));

    // consumer-wise history (ward filter: Junior Engineer fakt aapla ward)
    const history = new Map();
    allBills.forEach((bill) => {
      if (user?.role === 'Junior Engineer' && user?.ward !== 'Head Office' && bill.ward !== user?.ward) return;
      if (!history.has(bill.consumerNumber)) history.set(bill.consumerNumber, []);
      history.get(bill.consumerNumber).push(bill);
    });

    history.forEach((list) => {
      list.sort((a, b) => new Date(a.monthAndYear) - new Date(b.monthAndYear));
      for (let i = 1; i < list.length; i++) {
        const curr = list[i];
        if (!wanted.has(curr.monthAndYear)) continue;
        const prevAmt = list[i - 1].netBillAmount || 0;
        const currAmt = curr.netBillAmount || 0;
        const c = counts[curr.monthAndYear];
        if (curr.totalConsumption === 0) c.zero++;
        if (prevAmt > 0) {
          if (currAmt >= prevAmt * 1.25) c.high++;
          if (currAmt <= prevAmt * 0.75) c.low++;
        }
      }
    });

    return {
      zero: months.map((m) => counts[m.key].zero),
      high: months.map((m) => counts[m.key].high),
      low: months.map((m) => counts[m.key].low),
    };
  }, [allBills, user, months]);

  useEffect(() => {
    if (!chartRef.current || loading) return;
    const reduced = prefersReducedMotion();
    const base = buildBaseOptions({ tooltipHandler, legendPointStyle: 'rectRounded' });

    const chart = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: months.map((m) => m.label),
        datasets: [
          makeBarDataset('Zero Consumption', series.zero, '100,116,139', '#64748B'),
          makeBarDataset('High Bill (≥125%)', series.high, '236,94,84', '#EC5E54'),
          makeBarDataset('Low Bill (≤75%)', series.low, '246,160,33', '#F6A021'),
        ],
      },
      options: {
        ...base,
        animation: reduced
          ? false
          : {
              duration: 850,
              easing: 'easeOutCubic',
              delay: (c) => (c.type === 'data' && c.mode === 'default' ? c.dataIndex * 40 + c.datasetIndex * 50 : 0),
            },
        transitions: { active: { animation: { duration: reduced ? 0 : 180 } } },
        scales: buildScales(),
      },
      plugins: [hoverBandPlugin],
    });
    return () => chart.destroy();
  }, [series, loading, months]);

  return (
    <ChartCard
      title="Billing Anomalies"
      subtitle="Zero consumption, high and low bills vs previous bill"
      periodLabel={`${months[0].label} – ${months[months.length - 1].label}`}
      loading={loading}
      empty={!loading && allBills.length === 0}
      emptyText="No bill data available"
    >
      <canvas
        ref={chartRef}
        role="img"
        aria-label="Billing anomalies by month: zero consumption, high bill and low bill counts"
      />
    </ChartCard>
  );
};

export default BillingAnomalyChart;
