// // NEW (7-Oct-2026): Penalty page — Paid Bills Penalty ward-wise ani meter purpose (utilities)-wise
// // Home cha "Paid Bills Penalty" card click kela ki ithe yeto (/penalty?month=SEP-2026). Sidebar madhe pan "Penalty".
// // Backend madhe badal nahi: aadhichi APIs vaparli —
// //   GET /getBills?selectedMonthYear=..&limit=..  (bills)
// //   GET /getConsumers?page=1&limit=..            (meterPurpose sathi)
// // Penalty niyam Home card sarkhach: utils/penaltyHelper.js → getPaidPenalty
// import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import axios from 'axios';
// import Chart from 'chart.js/auto';
// import { useSelector } from 'react-redux';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import {
//   Box, Grid, Paper, Typography, FormControl, InputLabel, Select, MenuItem, Button,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Alert, Chip,
// } from '@mui/material';
// import DownloadIcon from '@mui/icons-material/Download';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import * as XLSX from 'xlsx';
// import { baseUrl } from '../config/config';
// import wardDataAtoI from '../data/warddataAtoI';
// import ChartCard from '../components/charts/ChartCard';
// import {
//   FONT_FAMILY, COLORS, prefersReducedMotion, createTooltipHandler, buildBaseOptions,
// } from '../components/charts/chartTheme';
// import { lastNMonths } from '../components/charts/monthUtils';
// import { getPaidPenalty } from '../utils/penaltyHelper';

// const BAR_COLOR = '#C2410C';
// const NOT_MAPPED = 'Not Mapped';
// const NO_WARD = 'No Ward';
// const BIG_LIMIT = 100000;

// const inr = (n) => `₹${Math.round(Number(n) || 0).toLocaleString('en-IN')}`;
// // Consumer number match: leading zeros kadhun compare
// const normCn = (cn) => String(cn ?? '').trim().replace(/^0+/, '');

// const getMonthYear = (date) =>
//   date.toLocaleString('en-US', { month: 'short' }).toUpperCase() + '-' + date.getFullYear();

// const defaultMonth = () => {
//   const d = new Date();
//   return getMonthYear(new Date(d.getFullYear(), d.getMonth() - 1, 1));
// };

// const tooltipHandler = createTooltipHandler({
//   formatTitle: (points) => (points[0] ? points[0].label : ''),
//   formatValue: (p) => inr(p.parsed.x),
// });

// // bills + purposeMap → ward-wise ani purpose-wise rows
// const emptyRow = (name) => ({ name, totalBills: 0, paidBills: 0, penaltyBills: 0, penalty: 0 });
// const addBill = (row, bill, pen) => {
//   row.totalBills += 1;
//   if (bill.paymentStatus === 'paid') row.paidBills += 1;
//   if (pen > 0) { row.penaltyBills += 1; row.penalty += pen; }
// };

// const buildSummary = (bills, purposeMap) => {
//   const totals = emptyRow('TOTAL');
//   const byWard = new Map();
//   const byPurpose = new Map();
//   bills.forEach((b) => {
//     const pen = getPaidPenalty(b);
//     const ward = (b.ward && String(b.ward).trim()) || NO_WARD;
//     const purpose = purposeMap.get(normCn(b.consumerNumber)) || NOT_MAPPED;
//     if (!byWard.has(ward)) byWard.set(ward, emptyRow(ward));
//     if (!byPurpose.has(purpose)) byPurpose.set(purpose, emptyRow(purpose));
//     addBill(totals, b, pen);
//     addBill(byWard.get(ward), b, pen);
//     addBill(byPurpose.get(purpose), b, pen);
//   });
//   const round = (r) => ({ ...r, penalty: Math.round(r.penalty) });
//   return {
//     totals: round(totals),
//     byWard: [...byWard.values()].map(round).sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true })),
//     byPurpose: [...byPurpose.values()].map(round).sort((a, b) => b.penalty - a.penalty || a.name.localeCompare(b.name)),
//   };
// };

// // ── Horizontal bar chart ────────────────────────────────────────────────────
// const PenaltyBarChart = ({ title, subtitle, rows, periodLabel, onBarClick }) => {
//   const ref = useRef(null);
//   const data = useMemo(() => rows.filter((r) => r.penalty > 0), [rows]);

//   useEffect(() => {
//     if (!ref.current || data.length === 0) return;
//     const reduced = prefersReducedMotion();
//     const base = buildBaseOptions({ tooltipHandler, legendPointStyle: 'rectRounded' });
//     const chart = new Chart(ref.current, {
//       type: 'bar',
//       data: {
//         labels: data.map((r) => r.name),
//         datasets: [{
//           label: 'Paid Bills Penalty',
//           data: data.map((r) => r.penalty),
//           accentColor: BAR_COLOR,
//           backgroundColor: BAR_COLOR,
//           borderRadius: 4,
//           borderSkipped: false,
//           barPercentage: 0.8,
//           categoryPercentage: 0.75,
//           maxBarThickness: 18,
//         }],
//       },
//       options: {
//         ...base,
//         indexAxis: 'y',
//         interaction: { mode: 'index', axis: 'y', intersect: false },
//         plugins: { ...base.plugins, legend: { display: false } },
//         animation: reduced ? false : { duration: 700, easing: 'easeOutCubic' },
//         onClick: onBarClick ? (evt, els) => { if (els[0]) onBarClick(data[els[0].index].name); } : undefined,
//         onHover: onBarClick ? (evt, els) => { evt.native.target.style.cursor = els.length ? 'pointer' : 'default'; } : undefined,
//         scales: {
//           x: {
//             beginAtZero: true,
//             grid: { color: COLORS.grid, drawBorder: false },
//             border: { display: false },
//             ticks: {
//               color: COLORS.faint, maxTicksLimit: 5, font: { size: 11 },
//               callback: (v) => (v >= 1000 ? `₹${(v / 1000).toLocaleString('en-IN')}k` : `₹${v}`),
//             },
//           },
//           y: {
//             grid: { display: false },
//             border: { display: false },
//             ticks: { color: COLORS.slate, font: { size: 11 }, autoSkip: false },
//           },
//         },
//       },
//     });
//     return () => chart.destroy();
//   }, [data, onBarClick]);

//   return (
//     <ChartCard title={title} subtitle={subtitle} periodLabel={periodLabel}
//       empty={data.length === 0} emptyText="No penalty for this selection">
//       <canvas ref={ref} role="img" aria-label={`${title} chart`} />
//     </ChartCard>
//   );
// };

// // ── Table ────────────────────────────────────────────────────────────────────
// const PenaltyTable = ({ firstCol, rows, totals, onRowClick, activeName }) => {
//   const head = { fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', fontFamily: FONT_FAMILY, fontSize: 12, px: 1.5 };
//   const num = { textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontFamily: FONT_FAMILY, fontSize: 13, whiteSpace: 'nowrap', px: 1.5 };
//   const txt = { fontFamily: FONT_FAMILY, fontSize: 13, whiteSpace: 'nowrap', px: 1.5 };
//   return (
//     <TableContainer component={Paper} elevation={0}
//       sx={{ borderRadius: '16px', border: '1px solid rgba(15,23,42,0.06)', boxShadow: '0 8px 24px rgba(15,23,42,0.06)', overflowX: 'auto' }}>
//       <Table size="small">
//         <TableHead>
//           <TableRow sx={{ '& th': { backgroundColor: '#1E3A8A' } }}>
//             <TableCell sx={head}>Sr.</TableCell>
//             <TableCell sx={head}>{firstCol}</TableCell>
//             <TableCell sx={{ ...head, textAlign: 'right' }}>Total Bills</TableCell>
//             <TableCell sx={{ ...head, textAlign: 'right' }}>Paid Bills</TableCell>
//             <TableCell sx={{ ...head, textAlign: 'right' }}>Paid with DPC</TableCell>
//             <TableCell sx={{ ...head, textAlign: 'right' }}>Penalty ₹</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((r, i) => {
//             const active = activeName && activeName === r.name;
//             return (
//               <TableRow key={r.name} hover={!!onRowClick}
//                 onClick={onRowClick ? () => onRowClick(r.name) : undefined}
//                 sx={{ cursor: onRowClick ? 'pointer' : 'default',
//                   backgroundColor: active ? 'rgba(47,107,255,0.08)' : i % 2 ? '#fff' : '#F8FAFC' }}>
//                 <TableCell sx={txt}>{i + 1}</TableCell>
//                 <TableCell sx={{ ...txt, fontWeight: 600, color: COLORS.navy }}>{r.name}</TableCell>
//                 <TableCell sx={num}>{r.totalBills.toLocaleString('en-IN')}</TableCell>
//                 <TableCell sx={num}>{r.paidBills.toLocaleString('en-IN')}</TableCell>
//                 <TableCell sx={num}>{r.penaltyBills.toLocaleString('en-IN')}</TableCell>
//                 <TableCell sx={{ ...num, fontWeight: 700, color: r.penalty > 0 ? BAR_COLOR : COLORS.faint }}>{inr(r.penalty)}</TableCell>
//               </TableRow>
//             );
//           })}
//           {totals && (
//             <TableRow sx={{ backgroundColor: '#EEF2FF', '& td': { fontWeight: 700 } }}>
//               <TableCell sx={txt} />
//               <TableCell sx={txt}>TOTAL</TableCell>
//               <TableCell sx={num}>{totals.totalBills.toLocaleString('en-IN')}</TableCell>
//               <TableCell sx={num}>{totals.paidBills.toLocaleString('en-IN')}</TableCell>
//               <TableCell sx={num}>{totals.penaltyBills.toLocaleString('en-IN')}</TableCell>
//               <TableCell sx={{ ...num, color: BAR_COLOR }}>{inr(totals.penalty)}</TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// const StatTile = ({ label, value, sub, color }) => (
//   <Paper elevation={0} sx={{
//     p: 2.25, borderRadius: '18px', height: '100%', boxSizing: 'border-box',
//     background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(15,23,42,0.05)',
//     boxShadow: '0 8px 24px rgba(15,23,42,0.06)',
//   }}>
//     <Box sx={{ width: 28, height: 4, borderRadius: 2, backgroundColor: color, mb: 1.25 }} />
//     <Typography sx={{ fontFamily: FONT_FAMILY, fontSize: 13, color: COLORS.muted, fontWeight: 500 }}>{label}</Typography>
//     <Typography sx={{ fontFamily: FONT_FAMILY, fontSize: { xs: 22, md: 26 }, fontWeight: 700, color: COLORS.navy, mt: 0.5, fontVariantNumeric: 'tabular-nums' }}>
//       {value}
//     </Typography>
//     {sub && <Typography sx={{ fontFamily: FONT_FAMILY, fontSize: 12, color: COLORS.faint, mt: 0.25 }}>{sub}</Typography>}
//   </Paper>
// );

// // ── Page ────────────────────────────────────────────────────────────────────
// const PenaltyReport = () => {
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const user = useSelector((state) => state.auth.user);

//   const isWardUser = user?.role === 'Junior Engineer' && user?.ward && user?.ward !== 'Head Office';
//   const month = searchParams.get('month') || defaultMonth();
//   const ward = isWardUser ? user.ward : searchParams.get('ward') || '';

//   const [bills, setBills] = useState([]);
//   const [purposeMap, setPurposeMap] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const updateParams = useCallback((next) => {
//     const params = { month, ...(ward && !isWardUser ? { ward } : {}), ...next };
//     Object.keys(params).forEach((k) => { if (!params[k]) delete params[k]; });
//     setSearchParams(params);
//   }, [month, ward, isWardUser, setSearchParams]);

//   // Consumers (meterPurpose) — ekdach
//   useEffect(() => {
//     let cancelled = false;
//     axios.get(`${baseUrl}/getConsumers?page=1&limit=${BIG_LIMIT}`)
//       .then((res) => {
//         if (cancelled) return;
//         const map = new Map();
//         (res.data?.consumers || []).forEach((c) => {
//           const p = c.meterPurpose && String(c.meterPurpose).trim();
//           if (p) map.set(normCn(c.consumerNumber), p);
//         });
//         setPurposeMap(map);
//       })
//       .catch(() => { if (!cancelled) setPurposeMap(new Map()); });
//     return () => { cancelled = true; };
//   }, []);

//   // Bills — selected month (+ ward user sathi fakta tyacha ward)
//   useEffect(() => {
//     if (!user) return;
//     let cancelled = false;
//     setLoading(true);
//     setError('');
//     const q = new URLSearchParams({ page: '1', limit: String(BIG_LIMIT), selectedMonthYear: month });
//     if (isWardUser) q.set('wardName', user.ward);
//     axios.get(`${baseUrl}/getBills?${q.toString()}`)
//       .then((res) => { if (!cancelled) setBills(res.data?.bills || []); })
//       .catch((e) => { if (!cancelled) setError(e?.response?.data?.message || e.message); })
//       .finally(() => { if (!cancelled) setLoading(false); });
//     return () => { cancelled = true; };
//   }, [month, user, isWardUser]);

//   const wardSummary = useMemo(
//     () => (purposeMap ? buildSummary(bills, purposeMap) : null),
//     [bills, purposeMap]
//   );
//   // Ward select kela tar purpose table fakta tya ward che
//   const purposeSummary = useMemo(() => {
//     if (!purposeMap) return null;
//     return ward ? buildSummary(bills.filter((b) => b.ward === ward), purposeMap) : wardSummary;
//   }, [bills, purposeMap, ward, wardSummary]);

//   const monthOptions = useMemo(() => {
//     const list = lastNMonths(12).map((m) => m.key).reverse();
//     return list.includes(month) ? list : [month, ...list];
//   }, [month]);

//   const scopeLabel = `${month}${ward ? ` · ${ward}` : ''}`;
//   const t = purposeSummary?.totals;

//   const onWardClick = useCallback((name) => {
//     if (isWardUser || !wardDataAtoI.some((w) => w.ward === name)) return;
//     updateParams({ ward: ward === name ? '' : name });
//   }, [isWardUser, updateParams, ward]);

//   const exportExcel = () => {
//     if (!wardSummary || !purposeSummary) return;
//     const toSheet = (rows, col) => rows.map((r, i) => ({
//       'Sr.No': r.name === 'TOTAL' ? '' : i + 1,
//       [col]: r.name,
//       'Total Bills': r.totalBills,
//       'Paid Bills': r.paidBills,
//       'Paid with DPC (Bills)': r.penaltyBills,
//       'Penalty (₹)': r.penalty,
//     }));
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(toSheet([...wardSummary.byWard, wardSummary.totals], 'Ward')), 'Ward-wise');
//     XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(toSheet([...purposeSummary.byPurpose, purposeSummary.totals], 'Meter Purpose')), 'Meter Purpose-wise');
//     XLSX.writeFile(wb, `Paid_Bills_Penalty_${month}${ward ? `_${ward}` : ''}.xlsx`);
//   };

//   const control = { minWidth: 170, bgcolor: '#fff', borderRadius: 2, '& .MuiInputBase-root': { height: 40, fontSize: 14 } };
//   const ready = wardSummary && purposeSummary;

//   return (
//     <Box sx={{
//       minHeight: '100vh',
//       ml: { xs: 0, sm: isSidebarOpen ? '250px' : '80px' },
//       transition: 'margin 0.3s',
//       p: { xs: 1.5, sm: 2, md: 3 },
//     }}>
//       {/* Header + filters */}
//       <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 2.5 }}>
//         <Box>
//           <Button size="small" startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}
//             sx={{ textTransform: 'none', color: COLORS.muted, mb: 0.5, px: 0 }}>
//             Dashboard
//           </Button>
//           <Typography sx={{ fontFamily: FONT_FAMILY, fontSize: { xs: 20, md: 24 }, fontWeight: 700, color: COLORS.navy }}>
//             Paid Bills Penalty
//           </Typography>
//           <Typography sx={{ fontFamily: FONT_FAMILY, fontSize: 13, color: COLORS.muted }}>
//             Ward-wise and meter purpose (utilities)-wise · {scopeLabel}
//           </Typography>
//         </Box>

//         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center' }}>
//           <FormControl size="small" sx={control}>
//             <InputLabel>Bill Month</InputLabel>
//             <Select label="Bill Month" value={month} onChange={(e) => updateParams({ month: e.target.value })}>
//               {monthOptions.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
//             </Select>
//           </FormControl>

//           {!isWardUser && (
//             <FormControl size="small" sx={control}>
//               <InputLabel shrink>Ward</InputLabel>
//               <Select label="Ward" notched displayEmpty value={ward} onChange={(e) => updateParams({ ward: e.target.value })}>
//                 <MenuItem value="">All Wards</MenuItem>
//                 {wardDataAtoI.filter((w) => w.ward !== 'All').map((w) => (
//                   <MenuItem key={w.ward} value={w.ward}>{w.ward}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           )}

//           <Button variant="contained" startIcon={<DownloadIcon />} onClick={exportExcel} disabled={!ready || loading}
//             sx={{ height: 40, borderRadius: 2, textTransform: 'none', bgcolor: COLORS.blue, '&:hover': { bgcolor: '#1F56E0' } }}>
//             Download Excel
//           </Button>
//         </Box>
//       </Box>

//       {error && <Alert severity="error" sx={{ mb: 2 }}>Bills load hou shakle nahi: {error}</Alert>}

//       {!ready || (loading && bills.length === 0) ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>
//       ) : (
//         <Box sx={{ opacity: loading ? 0.55 : 1, transition: 'opacity .2s' }}>
//           {/* Summary */}
//           <Grid container spacing={2} sx={{ mb: 2.5 }}>
//             <Grid item xs={12} sm={6} md={3}>
//               <StatTile label="Paid Bills Penalty" value={inr(t.penalty)} sub={scopeLabel} color={BAR_COLOR} />
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <StatTile label="Bills paid with DPC" value={t.penaltyBills.toLocaleString('en-IN')} sub="Penalty laglele bills" color="#EC5E54" />
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <StatTile label="Paid Bills" value={t.paidBills.toLocaleString('en-IN')} sub={`out of ${t.totalBills.toLocaleString('en-IN')} bills`} color="#14A680" />
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <StatTile label="Average penalty per DPC bill" value={inr(t.penaltyBills ? t.penalty / t.penaltyBills : 0)} color={COLORS.blue} />
//             </Grid>
//           </Grid>

//           {/* Ward-wise */}
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
//             <Typography sx={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 16, color: COLORS.navy }}>Ward-wise Penalty</Typography>
//             {ward && !isWardUser && (
//               <Chip size="small" label={`${ward} ×`} onClick={() => updateParams({ ward: '' })} />
//             )}
//           </Box>
//           {!isWardUser && (
//             <Typography sx={{ fontFamily: FONT_FAMILY, fontSize: 12, color: COLORS.faint, mb: 1.25 }}>
//               Ward var click kara — khali meter purpose-wise tya ward sathi filter hoil
//             </Typography>
//           )}
//           <Grid container spacing={2} sx={{ mb: 3.5 }}>
//             <Grid item xs={12} lg={4}>
//               <PenaltyBarChart title="Penalty by Ward" subtitle="Paid bills penalty (DPC − Net)"
//                 rows={wardSummary.byWard} periodLabel={month} onBarClick={isWardUser ? undefined : onWardClick} />
//             </Grid>
//             <Grid item xs={12} lg={8}>
//               <PenaltyTable firstCol="Ward" rows={wardSummary.byWard} totals={wardSummary.totals}
//                 onRowClick={isWardUser ? undefined : onWardClick} activeName={ward} />
//             </Grid>
//           </Grid>

//           {/* Meter purpose-wise */}
//           <Typography sx={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 16, color: COLORS.navy, mb: 1.25 }}>
//             Meter Purpose (Utilities)-wise Penalty{ward ? ` · ${ward}` : ''}
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12} lg={4}>
//               <PenaltyBarChart title="Penalty by Meter Purpose" subtitle="Top utilities by penalty"
//                 rows={purposeSummary.byPurpose.slice(0, 15)} periodLabel={month} />
//             </Grid>
//             <Grid item xs={12} lg={8}>
//               <PenaltyTable firstCol="Meter Purpose" rows={purposeSummary.byPurpose} totals={purposeSummary.totals} />
//             </Grid>
//           </Grid>
//           <Typography sx={{ fontFamily: FONT_FAMILY, fontSize: 12, color: COLORS.faint, mt: 1.5 }}>
//             Penalty = Net Bill Amount with DPC − Net Bill Amount (fakta DPC sobat bharlele bills).
//             "Not Mapped" = consumer master madhe meter purpose nahi.
//           </Typography>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default PenaltyReport;



// NEW (7-Oct-2026): Penalty page — Paid Bills Penalty ward-wise ani meter purpose (utilities)-wise
// Home cha "Paid Bills Penalty" card click kela ki ithe yeto (/penalty?month=SEP-2026). Sidebar madhe pan "Penalty".
// Backend madhe badal nahi: aadhichi APIs vaparli —
//   GET /getBills?selectedMonthYear=..&limit=..  (bills)
//   GET /getConsumers?page=1&limit=..            (meterPurpose sathi)
// Penalty niyam Home card sarkhach: utils/penaltyHelper.js → getPaidPenalty
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box, Grid, Paper, Typography, FormControl, InputLabel, Select, MenuItem, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Alert, Chip,
  Dialog, DialogTitle, DialogContent, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as XLSX from 'xlsx';
import { baseUrl } from '../config/config';
import wardDataAtoI from '../data/warddataAtoI';
import ChartCard from '../components/charts/ChartCard';
import {
  FONT_FAMILY, COLORS, prefersReducedMotion, createTooltipHandler, buildBaseOptions,
} from '../components/charts/chartTheme';
import { lastNMonths } from '../components/charts/monthUtils';
import { getPaidPenalty } from '../utils/penaltyHelper';

const BAR_COLOR = '#C2410C';
const NOT_MAPPED = 'Not Mapped';
const NO_WARD = 'No Ward';
const BIG_LIMIT = 100000;

const inr = (n) => `₹${Math.round(Number(n) || 0).toLocaleString('en-IN')}`;
// Consumer number match: leading zeros kadhun compare
const normCn = (cn) => String(cn ?? '').trim().replace(/^0+/, '');

const getMonthYear = (date) =>
  date.toLocaleString('en-US', { month: 'short' }).toUpperCase() + '-' + date.getFullYear();

const defaultMonth = () => {
  const d = new Date();
  return getMonthYear(new Date(d.getFullYear(), d.getMonth() - 1, 1));
};

const tooltipHandler = createTooltipHandler({
  formatTitle: (points) => (points[0] ? points[0].label : ''),
  formatValue: (p) => inr(p.parsed.x),
});

// bills + purposeMap → ward-wise ani purpose-wise rows
const emptyRow = (name) => ({ name, totalBills: 0, paidBills: 0, penaltyBills: 0, penalty: 0 });
const addBill = (row, bill, pen) => {
  row.totalBills += 1;
  if (bill.paymentStatus === 'paid') row.paidBills += 1;
  if (pen > 0) { row.penaltyBills += 1; row.penalty += pen; }
};

const buildSummary = (bills, purposeMap) => {
  const totals = emptyRow('TOTAL');
  const byWard = new Map();
  const byPurpose = new Map();
  bills.forEach((b) => {
    const pen = getPaidPenalty(b);
    const ward = (b.ward && String(b.ward).trim()) || NO_WARD;
    const purpose = purposeMap.get(normCn(b.consumerNumber)) || NOT_MAPPED;
    if (!byWard.has(ward)) byWard.set(ward, emptyRow(ward));
    if (!byPurpose.has(purpose)) byPurpose.set(purpose, emptyRow(purpose));
    addBill(totals, b, pen);
    addBill(byWard.get(ward), b, pen);
    addBill(byPurpose.get(purpose), b, pen);
  });
  const round = (r) => ({ ...r, penalty: Math.round(r.penalty) });
  return {
    totals: round(totals),
    byWard: [...byWard.values()].map(round).sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true })),
    byPurpose: [...byPurpose.values()].map(round).sort((a, b) => b.penalty - a.penalty || a.name.localeCompare(b.name)),
  };
};

// ── Horizontal bar chart ────────────────────────────────────────────────────
const PenaltyBarChart = ({ title, subtitle, rows, periodLabel, onBarClick }) => {
  const ref = useRef(null);
  const data = useMemo(() => rows.filter((r) => r.penalty > 0), [rows]);

  useEffect(() => {
    if (!ref.current || data.length === 0) return;
    const reduced = prefersReducedMotion();
    const base = buildBaseOptions({ tooltipHandler, legendPointStyle: 'rectRounded' });
    const chart = new Chart(ref.current, {
      type: 'bar',
      data: {
        labels: data.map((r) => r.name),
        datasets: [{
          label: 'Paid Bills Penalty',
          data: data.map((r) => r.penalty),
          accentColor: BAR_COLOR,
          backgroundColor: BAR_COLOR,
          borderRadius: 4,
          borderSkipped: false,
          barPercentage: 0.8,
          categoryPercentage: 0.75,
          maxBarThickness: 18,
        }],
      },
      options: {
        ...base,
        indexAxis: 'y',
        interaction: { mode: 'index', axis: 'y', intersect: false },
        plugins: { ...base.plugins, legend: { display: false } },
        animation: reduced ? false : { duration: 700, easing: 'easeOutCubic' },
        onClick: onBarClick ? (evt, els) => { if (els[0]) onBarClick(data[els[0].index].name); } : undefined,
        onHover: onBarClick ? (evt, els) => { evt.native.target.style.cursor = els.length ? 'pointer' : 'default'; } : undefined,
        scales: {
          x: {
            beginAtZero: true,
            grid: { color: COLORS.grid, drawBorder: false },
            border: { display: false },
            ticks: {
              color: COLORS.faint, maxTicksLimit: 5, font: { size: 11 },
              callback: (v) => (v >= 1000 ? `₹${(v / 1000).toLocaleString('en-IN')}k` : `₹${v}`),
            },
          },
          y: {
            grid: { display: false },
            border: { display: false },
            ticks: { color: COLORS.slate, font: { size: 11 }, autoSkip: false },
          },
        },
      },
    });
    return () => chart.destroy();
  }, [data, onBarClick]);

  return (
    <ChartCard title={title} subtitle={subtitle} periodLabel={periodLabel}
      empty={data.length === 0} emptyText="No penalty for this selection">
      <canvas ref={ref} role="img" aria-label={`${title} chart`} />
    </ChartCard>
  );
};

// ── Table ────────────────────────────────────────────────────────────────────
// NEW (7-Oct-2026): onCountClick → "Paid with DPC" aakda (> 0) var click kela ki details
const PenaltyTable = ({ firstCol, rows, totals, onRowClick, activeName, onCountClick }) => {
  const countLink = (n, key) => (onCountClick && n > 0 ? (
    <Box component="button" type="button"
      onClick={(e) => { e.stopPropagation(); onCountClick(key); }}
      title="Details baghnyasathi click kara"
      sx={{ border: 0, background: 'none', p: 0, cursor: 'pointer', font: 'inherit', fontWeight: 700,
        color: COLORS.blue, textDecoration: 'underline', textUnderlineOffset: 3,
        '&:hover': { color: '#1F56E0' }, '&:focus-visible': { outline: `2px solid ${COLORS.blue}`, outlineOffset: 2 } }}>
      {n.toLocaleString('en-IN')}
    </Box>
  ) : n.toLocaleString('en-IN'));
  const head = { fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', fontFamily: FONT_FAMILY, fontSize: 12, px: 1.5 };
  const num = { textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontFamily: FONT_FAMILY, fontSize: 13, whiteSpace: 'nowrap', px: 1.5 };
  const txt = { fontFamily: FONT_FAMILY, fontSize: 13, whiteSpace: 'nowrap', px: 1.5 };
  return (
    <TableContainer component={Paper} elevation={0}
      sx={{ borderRadius: '16px', border: '1px solid rgba(15,23,42,0.06)', boxShadow: '0 8px 24px rgba(15,23,42,0.06)', overflowX: 'auto' }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ '& th': { backgroundColor: '#1E3A8A' } }}>
            <TableCell sx={head}>Sr.</TableCell>
            <TableCell sx={head}>{firstCol}</TableCell>
            <TableCell sx={{ ...head, textAlign: 'right' }}>Total Bills</TableCell>
            <TableCell sx={{ ...head, textAlign: 'right' }}>Paid Bills</TableCell>
            <TableCell sx={{ ...head, textAlign: 'right' }}>Paid with DPC</TableCell>
            <TableCell sx={{ ...head, textAlign: 'right' }}>Penalty ₹</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r, i) => {
            const active = activeName && activeName === r.name;
            return (
              <TableRow key={r.name} hover={!!onRowClick}
                onClick={onRowClick ? () => onRowClick(r.name) : undefined}
                sx={{ cursor: onRowClick ? 'pointer' : 'default',
                  backgroundColor: active ? 'rgba(47,107,255,0.08)' : i % 2 ? '#fff' : '#F8FAFC' }}>
                <TableCell sx={txt}>{i + 1}</TableCell>
                <TableCell sx={{ ...txt, fontWeight: 600, color: COLORS.navy }}>{r.name}</TableCell>
                <TableCell sx={num}>{r.totalBills.toLocaleString('en-IN')}</TableCell>
                <TableCell sx={num}>{r.paidBills.toLocaleString('en-IN')}</TableCell>
                <TableCell sx={num}>{countLink(r.penaltyBills, r.name)}</TableCell>
                <TableCell sx={{ ...num, fontWeight: 700, color: r.penalty > 0 ? BAR_COLOR : COLORS.faint }}>{inr(r.penalty)}</TableCell>
              </TableRow>
            );
          })}
          {totals && (
            <TableRow sx={{ backgroundColor: '#EEF2FF', '& td': { fontWeight: 700 } }}>
              <TableCell sx={txt} />
              <TableCell sx={txt}>TOTAL</TableCell>
              <TableCell sx={num}>{totals.totalBills.toLocaleString('en-IN')}</TableCell>
              <TableCell sx={num}>{totals.paidBills.toLocaleString('en-IN')}</TableCell>
              <TableCell sx={num}>{countLink(totals.penaltyBills, null)}</TableCell>
              <TableCell sx={{ ...num, color: BAR_COLOR }}>{inr(totals.penalty)}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// NEW (7-Oct-2026): DPC sobat bharlelya bills chi details
const fmtDate = (d) => {
  if (!d) return '-';
  const x = new Date(d);
  return isNaN(x) ? String(d) : x.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const DpcDetailsDialog = ({ detail, onClose, month }) => {
  const rows = detail?.rows || [];
  const total = rows.reduce((s, r) => s + r.penalty, 0);
  const head = { fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', fontFamily: FONT_FAMILY, fontSize: 12, px: 1.25, backgroundColor: '#1E3A8A' };
  const cell = { fontFamily: FONT_FAMILY, fontSize: 13, whiteSpace: 'nowrap', px: 1.25 };
  const num = { ...cell, textAlign: 'right', fontVariantNumeric: 'tabular-nums' };

  const exportExcel = () => {
    const data = rows.map((r, i) => ({
      'Sr.No': i + 1, 'Consumer No.': r.consumerNumber, 'Consumer Name': r.consumerName, 'Ward': r.ward,
      'Meter Purpose': r.purpose, 'Bill Month': r.monthAndYear, 'Due Date': fmtDate(r.dueDate),
      'Payment Date': fmtDate(r.billPaymentDate), 'Net Bill Amount': r.netBillAmount,
      'Net Bill Amount With DPC': r.netBillAmountWithDPC, 'Paid Amount': r.paidAmount, 'Penalty (₹)': r.penalty,
    }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data), 'Paid with DPC');
    XLSX.writeFile(wb, `Paid_with_DPC_${(detail?.label || 'All').replace(/[^\w-]+/g, '_')}_${month}.xlsx`);
  };

  return (
    <Dialog open={!!detail} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ fontFamily: FONT_FAMILY, pr: 7 }}>
        <Typography component="span" sx={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 18, color: COLORS.navy, display: 'block' }}>
          Paid with DPC — {detail?.label}
        </Typography>
        <Typography component="span" sx={{ fontFamily: FONT_FAMILY, fontSize: 13, color: COLORS.muted }}>
          {month} · {rows.length} bills · Penalty {inr(total)}
        </Typography>
        <Button size="small" startIcon={<DownloadIcon />} onClick={exportExcel} disabled={!rows.length}
          sx={{ ml: 2, textTransform: 'none' }}>
          Excel
        </Button>
        <IconButton aria-label="Close" onClick={onClose} sx={{ position: 'absolute', right: 12, top: 12 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 0 }}>
        <TableContainer sx={{ maxHeight: '65vh' }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={head}>Sr.</TableCell>
                <TableCell sx={head}>Consumer No.</TableCell>
                <TableCell sx={head}>Consumer Name</TableCell>
                <TableCell sx={head}>Ward</TableCell>
                <TableCell sx={head}>Meter Purpose</TableCell>
                <TableCell sx={head}>Due Date</TableCell>
                <TableCell sx={head}>Payment Date</TableCell>
                <TableCell sx={{ ...head, textAlign: 'right' }}>Net Bill ₹</TableCell>
                <TableCell sx={{ ...head, textAlign: 'right' }}>With DPC ₹</TableCell>
                <TableCell sx={{ ...head, textAlign: 'right' }}>Paid ₹</TableCell>
                <TableCell sx={{ ...head, textAlign: 'right' }}>Penalty ₹</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((r, i) => (
                <TableRow key={r._id || `${r.consumerNumber}-${i}`} sx={{ backgroundColor: i % 2 ? '#fff' : '#F8FAFC' }}>
                  <TableCell sx={cell}>{i + 1}</TableCell>
                  <TableCell sx={{ ...cell, fontWeight: 600 }}>{r.consumerNumber}</TableCell>
                  <TableCell sx={{ ...cell, whiteSpace: 'normal', minWidth: 180 }}>{r.consumerName || '-'}</TableCell>
                  <TableCell sx={cell}>{r.ward}</TableCell>
                  <TableCell sx={cell}>{r.purpose}</TableCell>
                  <TableCell sx={cell}>{fmtDate(r.dueDate)}</TableCell>
                  <TableCell sx={cell}>{fmtDate(r.billPaymentDate)}</TableCell>
                  <TableCell sx={num}>{inr(r.netBillAmount)}</TableCell>
                  <TableCell sx={num}>{inr(r.netBillAmountWithDPC)}</TableCell>
                  <TableCell sx={num}>{inr(r.paidAmount)}</TableCell>
                  <TableCell sx={{ ...num, fontWeight: 700, color: BAR_COLOR }}>{inr(r.penalty)}</TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ backgroundColor: '#EEF2FF', '& td': { fontWeight: 700 } }}>
                <TableCell sx={cell} colSpan={10}>TOTAL</TableCell>
                <TableCell sx={{ ...num, color: BAR_COLOR }}>{inr(total)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

const StatTile = ({ label, value, sub, color }) => (
  <Paper elevation={0} sx={{
    p: 2.25, borderRadius: '18px', height: '100%', boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(15,23,42,0.05)',
    boxShadow: '0 8px 24px rgba(15,23,42,0.06)',
  }}>
    <Box sx={{ width: 28, height: 4, borderRadius: 2, backgroundColor: color, mb: 1.25 }} />
    <Typography sx={{ fontFamily: FONT_FAMILY, fontSize: 13, color: COLORS.muted, fontWeight: 500 }}>{label}</Typography>
    <Typography sx={{ fontFamily: FONT_FAMILY, fontSize: { xs: 22, md: 26 }, fontWeight: 700, color: COLORS.navy, mt: 0.5, fontVariantNumeric: 'tabular-nums' }}>
      {value}
    </Typography>
    {sub && <Typography sx={{ fontFamily: FONT_FAMILY, fontSize: 12, color: COLORS.faint, mt: 0.25 }}>{sub}</Typography>}
  </Paper>
);

// ── Page ────────────────────────────────────────────────────────────────────
const PenaltyReport = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const user = useSelector((state) => state.auth.user);

  const isWardUser = user?.role === 'Junior Engineer' && user?.ward && user?.ward !== 'Head Office';
  const month = searchParams.get('month') || defaultMonth();
  const ward = isWardUser ? user.ward : searchParams.get('ward') || '';

  const [bills, setBills] = useState([]);
  const [purposeMap, setPurposeMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dpcDetail, setDpcDetail] = useState(null); // NEW (7-Oct-2026): { label, rows }

  const updateParams = useCallback((next) => {
    const params = { month, ...(ward && !isWardUser ? { ward } : {}), ...next };
    Object.keys(params).forEach((k) => { if (!params[k]) delete params[k]; });
    setSearchParams(params);
  }, [month, ward, isWardUser, setSearchParams]);

  // Consumers (meterPurpose) — ekdach
  useEffect(() => {
    let cancelled = false;
    axios.get(`${baseUrl}/getConsumers?page=1&limit=${BIG_LIMIT}`)
      .then((res) => {
        if (cancelled) return;
        const map = new Map();
        (res.data?.consumers || []).forEach((c) => {
          const p = c.meterPurpose && String(c.meterPurpose).trim();
          if (p) map.set(normCn(c.consumerNumber), p);
        });
        setPurposeMap(map);
      })
      .catch(() => { if (!cancelled) setPurposeMap(new Map()); });
    return () => { cancelled = true; };
  }, []);

  // Bills — selected month (+ ward user sathi fakta tyacha ward)
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    setLoading(true);
    setError('');
    const q = new URLSearchParams({ page: '1', limit: String(BIG_LIMIT), selectedMonthYear: month });
    if (isWardUser) q.set('wardName', user.ward);
    axios.get(`${baseUrl}/getBills?${q.toString()}`)
      .then((res) => { if (!cancelled) setBills(res.data?.bills || []); })
      .catch((e) => { if (!cancelled) setError(e?.response?.data?.message || e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [month, user, isWardUser]);

  const wardSummary = useMemo(
    () => (purposeMap ? buildSummary(bills, purposeMap) : null),
    [bills, purposeMap]
  );
  // Ward select kela tar purpose table fakta tya ward che
  const purposeSummary = useMemo(() => {
    if (!purposeMap) return null;
    return ward ? buildSummary(bills.filter((b) => b.ward === ward), purposeMap) : wardSummary;
  }, [bills, purposeMap, ward, wardSummary]);

  const monthOptions = useMemo(() => {
    const list = lastNMonths(12).map((m) => m.key).reverse();
    return list.includes(month) ? list : [month, ...list];
  }, [month]);

  const scopeLabel = `${month}${ward ? ` · ${ward}` : ''}`;
  const t = purposeSummary?.totals;

  // NEW (7-Oct-2026): "Paid with DPC" aakda click → tya bills chi list
  const dpcRows = useCallback((list) => list
    .map((b) => ({
      ...b,
      ward: (b.ward && String(b.ward).trim()) || NO_WARD,
      purpose: purposeMap?.get(normCn(b.consumerNumber)) || NOT_MAPPED,
      penalty: Math.round(getPaidPenalty(b)),
    }))
    .filter((r) => r.penalty > 0)
    .sort((a, b) => a.ward.localeCompare(b.ward, 'en', { numeric: true }) || b.penalty - a.penalty), [purposeMap]);

  const openWardDpc = useCallback((name) => {
    const rows = dpcRows(bills).filter((r) => name === null || r.ward === name);
    setDpcDetail({ label: name || 'All Wards', rows });
  }, [bills, dpcRows]);

  const openPurposeDpc = useCallback((name) => {
    const scope = ward ? bills.filter((b) => b.ward === ward) : bills;
    const rows = dpcRows(scope).filter((r) => name === null || r.purpose === name);
    setDpcDetail({ label: `${name || 'All Meter Purposes'}${ward ? ` · ${ward}` : ''}`, rows });
  }, [bills, dpcRows, ward]);

  const onWardClick = useCallback((name) => {
    if (isWardUser || !wardDataAtoI.some((w) => w.ward === name)) return;
    updateParams({ ward: ward === name ? '' : name });
  }, [isWardUser, updateParams, ward]);

  const exportExcel = () => {
    if (!wardSummary || !purposeSummary) return;
    const toSheet = (rows, col) => rows.map((r, i) => ({
      'Sr.No': r.name === 'TOTAL' ? '' : i + 1,
      [col]: r.name,
      'Total Bills': r.totalBills,
      'Paid Bills': r.paidBills,
      'Paid with DPC (Bills)': r.penaltyBills,
      'Penalty (₹)': r.penalty,
    }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(toSheet([...wardSummary.byWard, wardSummary.totals], 'Ward')), 'Ward-wise');
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(toSheet([...purposeSummary.byPurpose, purposeSummary.totals], 'Meter Purpose')), 'Meter Purpose-wise');
    XLSX.writeFile(wb, `Paid_Bills_Penalty_${month}${ward ? `_${ward}` : ''}.xlsx`);
  };

  const control = { minWidth: 170, bgcolor: '#fff', borderRadius: 2, '& .MuiInputBase-root': { height: 40, fontSize: 14 } };
  const ready = wardSummary && purposeSummary;

  return (
    <Box sx={{
      minHeight: '100vh',
      ml: { xs: 0, sm: isSidebarOpen ? '250px' : '80px' },
      transition: 'margin 0.3s',
      p: { xs: 1.5, sm: 2, md: 3 },
    }}>
      {/* Header + filters */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 2.5 }}>
        <Box>
          <Button size="small" startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}
            sx={{ textTransform: 'none', color: COLORS.muted, mb: 0.5, px: 0 }}>
            Dashboard
          </Button>
          <Typography sx={{ fontFamily: FONT_FAMILY, fontSize: { xs: 20, md: 24 }, fontWeight: 700, color: COLORS.navy }}>
            Paid Bills Penalty
          </Typography>
          <Typography sx={{ fontFamily: FONT_FAMILY, fontSize: 13, color: COLORS.muted }}>
            Ward-wise and meter purpose (utilities)-wise · {scopeLabel}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center' }}>
          <FormControl size="small" sx={control}>
            <InputLabel>Bill Month</InputLabel>
            <Select label="Bill Month" value={month} onChange={(e) => updateParams({ month: e.target.value })}>
              {monthOptions.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
            </Select>
          </FormControl>

          {!isWardUser && (
            <FormControl size="small" sx={control}>
              <InputLabel shrink>Ward</InputLabel>
              <Select label="Ward" notched displayEmpty value={ward} onChange={(e) => updateParams({ ward: e.target.value })}>
                <MenuItem value="">All Wards</MenuItem>
                {wardDataAtoI.filter((w) => w.ward !== 'All').map((w) => (
                  <MenuItem key={w.ward} value={w.ward}>{w.ward}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <Button variant="contained" startIcon={<DownloadIcon />} onClick={exportExcel} disabled={!ready || loading}
            sx={{ height: 40, borderRadius: 2, textTransform: 'none', bgcolor: COLORS.blue, '&:hover': { bgcolor: '#1F56E0' } }}>
            Download Excel
          </Button>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>Bills load hou shakle nahi: {error}</Alert>}

      {!ready || (loading && bills.length === 0) ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>
      ) : (
        <Box sx={{ opacity: loading ? 0.55 : 1, transition: 'opacity .2s' }}>
          {/* Summary */}
          <Grid container spacing={2} sx={{ mb: 2.5 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatTile label="Paid Bills Penalty" value={inr(t.penalty)} sub={scopeLabel} color={BAR_COLOR} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatTile label="Bills paid with DPC" value={t.penaltyBills.toLocaleString('en-IN')} sub="Penalty laglele bills" color="#EC5E54" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatTile label="Paid Bills" value={t.paidBills.toLocaleString('en-IN')} sub={`out of ${t.totalBills.toLocaleString('en-IN')} bills`} color="#14A680" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatTile label="Average penalty per DPC bill" value={inr(t.penaltyBills ? t.penalty / t.penaltyBills : 0)} color={COLORS.blue} />
            </Grid>
          </Grid>

          {/* Ward-wise */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography sx={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 16, color: COLORS.navy }}>Ward-wise Penalty</Typography>
            {ward && !isWardUser && (
              <Chip size="small" label={`${ward} ×`} onClick={() => updateParams({ ward: '' })} />
            )}
          </Box>
          {!isWardUser && (
            <Typography sx={{ fontFamily: FONT_FAMILY, fontSize: 12, color: COLORS.faint, mb: 1.25 }}>
              Ward var click kara — khali meter purpose-wise tya ward sathi filter hoil
            </Typography>
          )}
          <Grid container spacing={2} sx={{ mb: 3.5 }}>
            <Grid item xs={12} lg={4}>
              <PenaltyBarChart title="Penalty by Ward" subtitle="Paid bills penalty (DPC − Net)"
                rows={wardSummary.byWard} periodLabel={month} onBarClick={isWardUser ? undefined : onWardClick} />
            </Grid>
            <Grid item xs={12} lg={8}>
              <PenaltyTable firstCol="Ward" rows={wardSummary.byWard} totals={wardSummary.totals}
                onRowClick={isWardUser ? undefined : onWardClick} activeName={ward} onCountClick={openWardDpc} />
            </Grid>
          </Grid>

          {/* Meter purpose-wise */}
          <Typography sx={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 16, color: COLORS.navy, mb: 1.25 }}>
            Meter Purpose (Utilities)-wise Penalty{ward ? ` · ${ward}` : ''}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4}>
              <PenaltyBarChart title="Penalty by Meter Purpose" subtitle="Top utilities by penalty"
                rows={purposeSummary.byPurpose.slice(0, 15)} periodLabel={month} />
            </Grid>
            <Grid item xs={12} lg={8}>
              <PenaltyTable firstCol="Meter Purpose" rows={purposeSummary.byPurpose} totals={purposeSummary.totals}
                onCountClick={openPurposeDpc} />
            </Grid>
          </Grid>
          <Typography sx={{ fontFamily: FONT_FAMILY, fontSize: 12, color: COLORS.faint, mt: 1.5 }}>
            Penalty = Net Bill Amount with DPC − Net Bill Amount (fakta DPC sobat bharlele bills).
            "Not Mapped" = consumer master madhe meter purpose nahi.
            "Paid with DPC" aakda var click kela ki tya bills chi details disatat.
          </Typography>
        </Box>
      )}
      <DpcDetailsDialog detail={dpcDetail} onClose={() => setDpcDetail(null)} month={month} />
    </Box>
  );
};

export default PenaltyReport;
