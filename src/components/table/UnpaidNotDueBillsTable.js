// NEW (7-Oct-2026): Unpaid bills jyanchi due date ajun baki aahe — ward-wise count + amount
import React, { useMemo } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { isUnpaidNotDue } from '../../utils/unpaidHelper';

const inr = (n) => `₹${Math.round(n).toLocaleString('en-IN')}`;

// monthAndYear dila tar fakta tya mahinyache bills (ex. SEP-2026)
const UnpaidNotDueBillsTable = ({ onClose, monthAndYear }) => {
  const { bills } = useSelector((state) => state.bills);
  const user = useSelector((state) => state.auth.user);

  const { rows, total } = useMemo(() => {
    const now = new Date();
    const map = new Map();
    bills.forEach((b) => {
      if (!isUnpaidNotDue(b, now)) return;
      if (monthAndYear && b.monthAndYear !== monthAndYear) return;
      if (user?.role === 'Junior Engineer' && user?.ward !== 'Head Office' && b.ward !== user?.ward) return;
      const ward = b.ward || 'No Ward';
      if (!map.has(ward)) map.set(ward, { ward, count: 0, amount: 0, nearestDue: null });
      const r = map.get(ward);
      r.count++;
      r.amount += Number(b.netBillAmount) || 0;
      const due = new Date(b.dueDate);
      if (!r.nearestDue || due < r.nearestDue) r.nearestDue = due;
    });
    const list = [...map.values()].sort((a, b) => a.ward.localeCompare(b.ward, 'en', { numeric: true }));
    return {
      rows: list,
      total: list.reduce((t, r) => ({ count: t.count + r.count, amount: t.amount + r.amount }), { count: 0, amount: 0 }),
    };
  }, [bills, user, monthAndYear]);

  const head = { color: '#fff', fontWeight: 700, textAlign: 'center' };
  const cell = { textAlign: 'center', fontSize: 14, fontWeight: 500 };

  return (
    <Box sx={{ position: 'relative', p: 2 }}>
      <IconButton onClick={onClose} aria-label="Close" sx={{ position: 'absolute', top: 8, right: 8 }}>
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, pr: 5 }}>
        Unpaid Bills – Due Date Baki{monthAndYear ? ` (${monthAndYear})` : ''}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
        Bills that are still unpaid but whose due date has not passed yet.
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.12)' }}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: '#4F46E5' }}>
            <TableRow>
              <TableCell sx={head}>Ward</TableCell>
              <TableCell sx={head}>Bills</TableCell>
              <TableCell sx={head}>Net Bill Amount</TableCell>
              <TableCell sx={head}>Nearest Due Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} sx={{ ...cell, py: 3, color: 'text.secondary' }}>
                  No unpaid bills with a pending due date
                </TableCell>
              </TableRow>
            )}
            {rows.map((r, i) => (
              <TableRow key={r.ward} sx={{ backgroundColor: i % 2 === 0 ? '#f5f5f5' : '#fff' }}>
                <TableCell sx={cell}>{r.ward}</TableCell>
                <TableCell sx={cell}>{r.count.toLocaleString('en-IN')}</TableCell>
                <TableCell sx={cell}>{inr(r.amount)}</TableCell>
                <TableCell sx={cell}>
                  {r.nearestDue ? r.nearestDue.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                </TableCell>
              </TableRow>
            ))}
            {rows.length > 0 && (
              <TableRow sx={{ backgroundColor: '#EEF2FF' }}>
                <TableCell sx={{ ...cell, fontWeight: 700 }}>Total</TableCell>
                <TableCell sx={{ ...cell, fontWeight: 700 }}>{total.count.toLocaleString('en-IN')}</TableCell>
                <TableCell sx={{ ...cell, fontWeight: 700 }}>{inr(total.amount)}</TableCell>
                <TableCell sx={cell} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UnpaidNotDueBillsTable;
