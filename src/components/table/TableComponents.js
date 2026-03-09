// ============================================================
// PaidBillCurrentMonth.jsx - Redux bills वापरतो, fetch नाही
// ============================================================
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

const getMonthYear = (date) => date.toLocaleString("en-US", { month: "short" }).toUpperCase() + "-" + date.getFullYear();
const currentMonthYear = getMonthYear(new Date());
const allWards = ["Ward-A", "Ward-B", "Ward-C", "Ward-D", "Ward-E", "Ward-F", "Ward-G", "Ward-H", "Ward-I"];

const S = {
  Container: styled(TableContainer)({ marginTop: "2%", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.2)", overflow: "hidden" }),
  Head: styled(TableHead)({ backgroundColor: "#07773D" }),
  HeaderCell: styled(TableCell)({ color: "#FFF", fontWeight: "bold", textAlign: "center" }),
  Row: styled(TableRow)(({ index }) => ({ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff" })),
  Cell: styled(TableCell)({ textAlign: "center", fontSize: "14px", fontWeight: "500" }),
  CloseBtn: styled(IconButton)({ position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(255,255,255,0.9)', zIndex: 1000 }),
};

export const PaidBillCurrentMonth = ({ onClose }) => {
  // ✅ Redux bills - no fetch!
  const { bills } = useSelector(state => state.bills);

  const paidCounts = allWards.reduce((acc, ward) => { acc[ward] = 0; return acc; }, {});
  const totalCounts = allWards.reduce((acc, ward) => { acc[ward] = 0; return acc; }, {});

  bills.forEach(bill => {
    if (bill.monthAndYear === currentMonthYear) {
      const w = bill.ward;
      if (paidCounts[w] !== undefined) {
        totalCounts[w]++;
        if (bill.paymentStatus === "paid") paidCounts[w]++;
      }
    }
  });

  return (
    <S.Container component={Paper} sx={{ width: '100%' }}>
      <S.CloseBtn onClick={onClose} size="small"><CloseIcon fontSize="small" /></S.CloseBtn>
      <Typography align="center" sx={{ fontWeight: "bold", fontSize: "14px", mt: 1, mb: 1 }}>Paid Bills for {currentMonthYear}</Typography>
      <Table size="small">
        <S.Head><TableRow><S.HeaderCell>Ward</S.HeaderCell><S.HeaderCell>Paid</S.HeaderCell><S.HeaderCell>Total</S.HeaderCell></TableRow></S.Head>
        <TableBody>
          {allWards.map((ward, i) => (
            <S.Row key={ward} index={i}>
              <S.Cell>{ward}</S.Cell><S.Cell>{paidCounts[ward]}</S.Cell><S.Cell>{totalCounts[ward]}</S.Cell>
            </S.Row>
          ))}
        </TableBody>
      </Table>
    </S.Container>
  );
};

// ============================================================
// PaidBillPreviousMonth.jsx
// ============================================================
export const PaidBillPreviousMonth = ({ onClose }) => {
  const { bills } = useSelector(state => state.bills);

  const prevDate = new Date(); prevDate.setMonth(prevDate.getMonth() - 1);
  const prevMonthYear = getMonthYear(prevDate);

  const paidCounts = allWards.reduce((acc, w) => { acc[w] = 0; return acc; }, {});
  const totalCounts = allWards.reduce((acc, w) => { acc[w] = 0; return acc; }, {});

  bills.forEach(bill => {
    if (bill.monthAndYear === prevMonthYear && paidCounts[bill.ward] !== undefined) {
      totalCounts[bill.ward]++;
      if (bill.paymentStatus === "paid") paidCounts[bill.ward]++;
    }
  });

  return (
    <S.Container component={Paper} sx={{ width: '100%' }}>
      <S.CloseBtn onClick={onClose} size="small"><CloseIcon fontSize="small" /></S.CloseBtn>
      <Typography align="center" sx={{ fontWeight: "bold", fontSize: "14px", mt: 1, mb: 1 }}>Paid Bills for {prevMonthYear}</Typography>
      <Table size="small">
        <S.Head><TableRow><S.HeaderCell>Ward</S.HeaderCell><S.HeaderCell>Paid</S.HeaderCell><S.HeaderCell>Total</S.HeaderCell></TableRow></S.Head>
        <TableBody>
          {allWards.map((ward, i) => (
            <S.Row key={ward} index={i}><S.Cell>{ward}</S.Cell><S.Cell>{paidCounts[ward]}</S.Cell><S.Cell>{totalCounts[ward]}</S.Cell></S.Row>
          ))}
        </TableBody>
      </Table>
    </S.Container>
  );
};

// ============================================================
// PaidBillpreviousTwoMonthBefore.jsx
// ============================================================
export const PaidBillpreviousTwoMonthBefore = ({ onClose }) => {
  const { bills } = useSelector(state => state.bills);

  const twoMonthDate = new Date(); twoMonthDate.setMonth(twoMonthDate.getMonth() - 2);
  const twoMonthYear = getMonthYear(twoMonthDate);

  const paidCounts = allWards.reduce((acc, w) => { acc[w] = 0; return acc; }, {});
  const totalCounts = allWards.reduce((acc, w) => { acc[w] = 0; return acc; }, {});

  bills.forEach(bill => {
    if (bill.monthAndYear === twoMonthYear && paidCounts[bill.ward] !== undefined) {
      totalCounts[bill.ward]++;
      if (bill.paymentStatus === "paid") paidCounts[bill.ward]++;
    }
  });

  return (
    <S.Container component={Paper} sx={{ width: '100%' }}>
      <S.CloseBtn onClick={onClose} size="small"><CloseIcon fontSize="small" /></S.CloseBtn>
      <Typography align="center" sx={{ fontWeight: "bold", fontSize: "14px", mt: 1, mb: 1 }}>Paid Bills for {twoMonthYear}</Typography>
      <Table size="small">
        <S.Head><TableRow><S.HeaderCell>Ward</S.HeaderCell><S.HeaderCell>Paid</S.HeaderCell><S.HeaderCell>Total</S.HeaderCell></TableRow></S.Head>
        <TableBody>
          {allWards.map((ward, i) => (
            <S.Row key={ward} index={i}><S.Cell>{ward}</S.Cell><S.Cell>{paidCounts[ward]}</S.Cell><S.Cell>{totalCounts[ward]}</S.Cell></S.Row>
          ))}
        </TableBody>
      </Table>
    </S.Container>
  );
};

// ============================================================
// FaultyMetersCurrentMonth.jsx
// ============================================================
export const FaultyMetersCurrentMonth = ({ onClose }) => {
  const { bills } = useSelector(state => state.bills);

  const counts = allWards.reduce((acc, w) => { acc[w] = 0; return acc; }, {});
  bills.forEach(bill => {
    if (bill.meterStatus === "FAULTY" && bill.monthAndYear === currentMonthYear && counts[bill.ward] !== undefined) {
      counts[bill.ward]++;
    }
  });

  return (
    <S.Container component={Paper} sx={{ width: '100%' }}>
      <S.CloseBtn onClick={onClose} size="small"><CloseIcon fontSize="small" /></S.CloseBtn>
      <Typography align="center" sx={{ fontWeight: "bold", fontSize: "14px", mt: 1, mb: 1 }}>Faulty Meters For {currentMonthYear}</Typography>
      <Table size="small">
        <S.Head><TableRow><S.HeaderCell>Ward</S.HeaderCell><S.HeaderCell>Count</S.HeaderCell></TableRow></S.Head>
        <TableBody>
          {allWards.map((ward, i) => (
            <S.Row key={ward} index={i}><S.Cell>{ward}</S.Cell><S.Cell>{counts[ward]}</S.Cell></S.Row>
          ))}
        </TableBody>
      </Table>
    </S.Container>
  );
};

// ============================================================
// FaultyMetersBeforeTwoMonth.jsx
// ============================================================
export const FaultyMetersBeforeTwoMonth = ({ onClose }) => {
  const { bills } = useSelector(state => state.bills);

  const twoMonthDate = new Date(); twoMonthDate.setMonth(twoMonthDate.getMonth() - 2);
  const twoMonthYear = getMonthYear(twoMonthDate);

  const counts = allWards.reduce((acc, w) => { acc[w] = 0; return acc; }, {});
  bills.forEach(bill => {
    if (bill.meterStatus === "FAULTY" && bill.monthAndYear === twoMonthYear && counts[bill.ward] !== undefined) {
      counts[bill.ward]++;
    }
  });

  return (
    <S.Container component={Paper} sx={{ width: '100%' }}>
      <S.CloseBtn onClick={onClose} size="small"><CloseIcon fontSize="small" /></S.CloseBtn>
      <Typography align="center" sx={{ fontWeight: "bold", fontSize: "14px", mt: 1, mb: 1 }}>Faulty Meters For {twoMonthYear}</Typography>
      <Table size="small">
        <S.Head><TableRow><S.HeaderCell>Ward</S.HeaderCell><S.HeaderCell>Faulty Count</S.HeaderCell></TableRow></S.Head>
        <TableBody>
          {allWards.map((ward, i) => (
            <S.Row key={ward} index={i}><S.Cell>{ward}</S.Cell><S.Cell>{counts[ward]}</S.Cell></S.Row>
          ))}
        </TableBody>
      </Table>
    </S.Container>
  );
};

// ============================================================
// AverageMetersCurrentMonth.jsx
// ============================================================
export const AverageMetersCurrentMonth = ({ onClose }) => {
  const { bills } = useSelector(state => state.bills);

  const counts = allWards.reduce((acc, w) => { acc[w] = 0; return acc; }, {});
  bills.forEach(bill => {
    if ((bill.meterStatus === "AVERAGE" || bill.meterStatus === "Average") && bill.monthAndYear === currentMonthYear && counts[bill.ward] !== undefined) {
      counts[bill.ward]++;
    }
  });

  return (
    <S.Container component={Paper} sx={{ width: '100%' }}>
      <S.CloseBtn onClick={onClose} size="small"><CloseIcon fontSize="small" /></S.CloseBtn>
      <Typography align="center" sx={{ fontWeight: "bold", fontSize: "14px", mt: 1, mb: 1 }}>Average Meters For {currentMonthYear}</Typography>
      <Table size="small">
        <S.Head><TableRow><S.HeaderCell>Ward</S.HeaderCell><S.HeaderCell>Count</S.HeaderCell></TableRow></S.Head>
        <TableBody>
          {allWards.map((ward, i) => (
            <S.Row key={ward} index={i}><S.Cell>{ward}</S.Cell><S.Cell>{counts[ward]}</S.Cell></S.Row>
          ))}
        </TableBody>
      </Table>
    </S.Container>
  );
};

// ============================================================
// OverdueBillsTable.jsx
// ============================================================
export const OverdueBillsTable = ({ onClose }) => {
  const { bills } = useSelector(state => state.bills);

  const today = new Date();
  const currentMonth = getMonthYear(today);
  const prevMonth = getMonthYear(new Date(today.getFullYear(), today.getMonth() - 1));

  const data = allWards.reduce((acc, w) => {
    acc[w] = { [prevMonth]: 0, [currentMonth]: 0 };
    return acc;
  }, {});

  bills.forEach(bill => {
    if (!bill.dueDate || !bill.monthAndYear || !bill.ward) return;
    const dueDate = new Date(bill.dueDate);
    const isOverdue = bill.paymentStatus?.toLowerCase() === "unpaid" && dueDate < today;
    if (isOverdue && (bill.monthAndYear === currentMonth || bill.monthAndYear === prevMonth)) {
      if (data[bill.ward]) data[bill.ward][bill.monthAndYear]++;
    }
  });

  const OHead = styled(TableHead)({ backgroundColor: "#FCAB44" });

  return (
    <S.Container component={Paper} sx={{ width: '100%' }}>
      <S.CloseBtn onClick={onClose} size="small"><CloseIcon fontSize="small" /></S.CloseBtn>
      <Typography align="center" sx={{ fontWeight: "bold", fontSize: "14px", mt: 1, mb: 1 }}>Overdue Bills Comparison ({prevMonth} & {currentMonth})</Typography>
      <Table size="small">
        <OHead>
          <TableRow>
            <S.HeaderCell>Ward</S.HeaderCell>
            <S.HeaderCell>{prevMonth}</S.HeaderCell>
            <S.HeaderCell>{currentMonth}</S.HeaderCell>
          </TableRow>
        </OHead>
        <TableBody>
          {allWards.map((ward, i) => (
            <S.Row key={ward} index={i}>
              <S.Cell>{ward}</S.Cell>
              <S.Cell>{data[ward]?.[prevMonth] || 0}</S.Cell>
              <S.Cell>{data[ward]?.[currentMonth] || 0}</S.Cell>
            </S.Row>
          ))}
        </TableBody>
      </Table>
    </S.Container>
  );
};