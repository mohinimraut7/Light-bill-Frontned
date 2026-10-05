// src/components/charts/chartTheme.js
// Doni charts (CharComponent + PieChartBills) hi shared theme vaparatat.
import Chart from 'chart.js/auto';

export const FONT_FAMILY =
  '"Montserrat", "Inter", "Segoe UI", system-ui, -apple-system, sans-serif';

export const COLORS = {
  navy: '#0F172A',
  slate: '#475569',
  muted: '#64748B',
  faint: '#94A3B8',
  grid: 'rgba(15, 23, 42, 0.06)',
  orange: '#F6A021',
  blue: '#2F6BFF',
};

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ───────────── Gradient helper (cached per chart) ───────────── */
const gradientStore = new WeakMap();

export const verticalGradient = (chart, topColor, bottomColor) => {
  const { ctx, chartArea } = chart;
  if (!chartArea) return topColor; // first pass, layout aadhi

  const areaKey = `${Math.round(chartArea.top)}|${Math.round(chartArea.bottom)}`;
  let store = gradientStore.get(chart);
  if (!store || store.areaKey !== areaKey) {
    store = { areaKey, items: {} };
    gradientStore.set(chart, store);
  }

  const key = `${topColor}|${bottomColor}`;
  if (!store.items[key]) {
    const g = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    g.addColorStop(0, topColor);
    g.addColorStop(1, bottomColor);
    store.items[key] = g;
  }
  return store.items[key];
};

const roundedRectPath = (ctx, x, y, w, h, r) => {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
};

const getActive = (chart) => (chart.getActiveElements ? chart.getActiveElements() : []);

/* ───────────── Plugins (local, global register hot nahit) ───────────── */

// Line chart: hover var halka vertical dashed indicator
export const hoverLinePlugin = {
  id: 'vvHoverLine',
  beforeDatasetsDraw(chart) {
    const active = getActive(chart);
    if (!active.length) return;
    const { ctx, chartArea } = chart;
    const x = active[0].element.x;
    ctx.save();
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(15, 23, 42, 0.18)';
    ctx.moveTo(x, chartArea.top);
    ctx.lineTo(x, chartArea.bottom);
    ctx.stroke();
    ctx.restore();
  },
};

// Bar chart: hover kelelya mahinyachi halki background band
export const hoverBandPlugin = {
  id: 'vvHoverBand',
  beforeDatasetsDraw(chart) {
    const active = getActive(chart);
    if (!active.length) return;
    const { ctx, chartArea, data } = chart;
    const count = (data.labels && data.labels.length) || 1;
    const step = chartArea.width / count;
    const x = chartArea.left + step * active[0].index + 3;
    ctx.save();
    ctx.fillStyle = 'rgba(246, 160, 33, 0.08)';
    roundedRectPath(ctx, x, chartArea.top, step - 6, chartArea.height, 10);
    ctx.fill();
    ctx.restore();
  },
};

// Line chart: left -> right "line drawing" reveal (area pan sobat)
export const lineRevealPlugin = {
  id: 'vvLineReveal',
  afterInit(chart, _args, opts) {
    const duration = opts && opts.duration;
    if (!duration) {
      chart.$vvReveal = 1;
      return;
    }
    chart.$vvReveal = 0;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      chart.$vvReveal = 1 - Math.pow(1 - t, 3); // easeOutCubic
      chart.draw();
      if (t < 1) chart.$vvRaf = requestAnimationFrame(tick);
    };
    chart.$vvRaf = requestAnimationFrame(tick);
  },
  beforeDatasetsDraw(chart) {
    const p = chart.$vvReveal;
    if (p === undefined || p >= 1) return;
    const { ctx, chartArea } = chart;
    ctx.save();
    ctx.beginPath();
    ctx.rect(chartArea.left - 10, chartArea.top - 10, (chartArea.width + 20) * p, chartArea.height + 20);
    ctx.clip();
    chart.$vvClipped = true;
  },
  afterDatasetsDraw(chart) {
    if (chart.$vvClipped) {
      chart.ctx.restore();
      chart.$vvClipped = false;
    }
  },
  beforeDestroy(chart) {
    if (chart.$vvRaf) cancelAnimationFrame(chart.$vvRaf);
  },
};

/* ───────────── Floating HTML tooltip (soft shadow sathi) ───────────── */
const TOOLTIP_CLASS = 'vv-chart-tooltip';

const getTooltipEl = (chart) => {
  const parent = chart.canvas.parentNode;
  let el = parent.querySelector(`.${TOOLTIP_CLASS}`);
  if (!el) {
    el = document.createElement('div');
    el.className = TOOLTIP_CLASS;
    el.setAttribute('role', 'tooltip');
    el.style.cssText = [
      'position:absolute',
      'top:0',
      'left:0',
      'z-index:5',
      'opacity:0',
      'pointer-events:none',
      'min-width:150px',
      'max-width:260px',
      'padding:10px 12px',
      'border-radius:12px',
      'background:rgba(255,255,255,0.98)',
      'border:1px solid rgba(15,23,42,0.06)',
      'box-shadow:0 10px 30px rgba(15,23,42,0.14), 0 2px 6px rgba(15,23,42,0.06)',
      `font-family:${FONT_FAMILY}`,
      'white-space:nowrap',
      'transform:translateY(4px)',
      'transition:opacity .16s ease, transform .16s ease, left .12s ease, top .12s ease',
    ].join(';');
    parent.appendChild(el);
  }
  return el;
};

export const createTooltipHandler = ({ formatTitle, formatValue }) => (context) => {
  const { chart, tooltip } = context;
  const el = getTooltipEl(chart);

  if (tooltip.opacity === 0) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(4px)';
    return;
  }

  const points = tooltip.dataPoints || [];
  el.textContent = '';

  const title = document.createElement('div');
  title.textContent = formatTitle(points);
  title.style.cssText = `font-size:12px;font-weight:600;color:${COLORS.navy};margin-bottom:6px;`;
  el.appendChild(title);

  points.forEach((p) => {
    const row = document.createElement('div');
    row.style.cssText = `display:flex;align-items:center;gap:8px;font-size:11.5px;color:${COLORS.slate};line-height:1.75;`;

    const dot = document.createElement('span');
    dot.style.cssText = `width:8px;height:8px;border-radius:50%;flex:none;background:${p.dataset.accentColor || COLORS.faint};`;

    const name = document.createElement('span');
    name.textContent = p.dataset.tooltipLabel || p.dataset.label;
    name.style.flex = '1';

    const val = document.createElement('strong');
    val.textContent = formatValue(p);
    val.style.cssText = `margin-left:14px;font-weight:700;color:${COLORS.navy};`;

    row.appendChild(dot);
    row.appendChild(name);
    row.appendChild(val);
    el.appendChild(row);
  });

  const canvas = chart.canvas;
  const w = el.offsetWidth;
  const h = el.offsetHeight;
  let x = canvas.offsetLeft + tooltip.caretX + 16;
  if (x + w > canvas.offsetLeft + chart.width) x = canvas.offsetLeft + tooltip.caretX - w - 16;
  x = Math.max(canvas.offsetLeft, x);
  let y = canvas.offsetTop + tooltip.caretY - h / 2;
  y = Math.min(Math.max(y, canvas.offsetTop), canvas.offsetTop + chart.height - h);

  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.opacity = '1';
  el.style.transform = 'translateY(0)';
};

/* ───────────── Shared options ───────────── */
const legendOptions = (pointStyle = 'circle') => ({
  display: true,
  position: 'top',
  align: 'center',
  labels: {
    usePointStyle: true,
    pointStyle,
    boxWidth: 8,
    boxHeight: 8,
    padding: 16,
    color: COLORS.muted,
    font: { family: FONT_FAMILY, size: 11, weight: '500' },
    // gradient/alpha fill mule legend dot phikat disu naye mhanun accentColor vapra
    generateLabels: (chart) => {
      const base = Chart.defaults.plugins.legend.labels.generateLabels(chart);
      base.forEach((l) => {
        const ds = chart.data.datasets[l.datasetIndex];
        if (ds && ds.accentColor) {
          l.fillStyle = ds.accentColor;
          l.strokeStyle = ds.accentColor;
          l.lineWidth = 0;
        }
      });
      return base;
    },
  },
});

export const buildBaseOptions = ({ tooltipHandler, legendPointStyle }) => ({
  responsive: true,
  maintainAspectRatio: false,
  font: { family: FONT_FAMILY, size: 11 },
//   layout: { padding: { top: 4, right: 8, bottom: 0, left: 0 } },

layout: { padding: { top: 4, right: 8, bottom: 4, left: 4 } },
  interaction: { mode: 'index', intersect: false },
  plugins: {
    title: { display: false }, // title ata card header madhe aahe
    legend: legendOptions(legendPointStyle),
    tooltip: { enabled: false, external: tooltipHandler },
  },
});

export const buildScales = () => ({
  x: {
    grid: { display: false, drawBorder: false },
    border: { display: false },
    // ticks: { color: COLORS.muted, padding: 8, maxRotation: 35, autoSkip: true, font: { size: 11 } },

    ticks: { color: COLORS.muted, padding: 8, maxRotation: 0, minRotation: 0, autoSkip: true, font: { size: 11 } },
  },
  y: {
    beginAtZero: true,
    grace: '6%',
    grid: { color: COLORS.grid, drawBorder: false, tickLength: 0 },
    border: { display: false },
    ticks: { color: COLORS.faint, padding: 10, precision: 0, maxTicksLimit: 5, font: { size: 11 } },
  },
});