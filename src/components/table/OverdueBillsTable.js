

import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

// ── Date helpers ──────────────────────────────────────────────
const getMonthYear = (date) => {
  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  return `${months[date.getMonth()]}-${date.getFullYear()}`;
};

const today = new Date();
const currentMonth = getMonthYear(today);
const prevMonth = getMonthYear(new Date(today.getFullYear(), today.getMonth() - 1));
const allWards = ["Ward-A","Ward-B","Ward-C","Ward-D","Ward-E","Ward-F","Ward-G","Ward-H","Ward-I"];

// ── Styled Components ─────────────────────────────────────────
const StyledTableContainer = styled(TableContainer)({
  marginTop: "2%", borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.2)", overflow: "hidden",
});
const CloseButton = styled(IconButton)({
  position: "absolute", top: 8, right: 8,
  backgroundColor: "rgba(255,255,255,0.9)", zIndex: 1000,
  "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
});
const StyledTableHead = styled(TableHead)({ backgroundColor: "#FCAB44" });
const StyledHeaderCell = styled(TableCell)({ color: "#FFF", fontWeight: "bold", textAlign: "center" });
const StyledRow = styled(TableRow)(({ index }) => ({
  backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
}));
const StyledCell = styled(TableCell)({ textAlign: "center", fontSize: "14px", fontWeight: "500" });

// ── Component ─────────────────────────────────────────────────
const OverdueBillsTable = ({ onClose,currentMonthOnly = false}) => {
  // ✅ Redux bills - no fetch!
  const { bills } = useSelector((state) => state.bills);

  // Calculate overdue data directly from Redux bills
  const data = allWards.reduce((acc, w) => {
    acc[w] = { [prevMonth]: 0, [currentMonth]: 0 };
    return acc;
  }, {});

  bills.forEach((bill) => {
    if (!bill?.dueDate || !bill?.monthAndYear || !bill?.ward) return;
    const dueDate = new Date(bill.dueDate);
    const isOverdue =
      bill.paymentStatus?.toLowerCase() === "unpaid" &&
      dueDate instanceof Date && !isNaN(dueDate) && dueDate < today;
    // const isRelevantMonth =
    //   bill.monthAndYear === currentMonth || bill.monthAndYear === prevMonth;

        const isRelevantMonth = currentMonthOnly
      ? bill.monthAndYear === currentMonth
      : bill.monthAndYear === currentMonth || bill.monthAndYear === prevMonth;

    if (isOverdue && isRelevantMonth && data[bill.ward]) {
      data[bill.ward][bill.monthAndYear]++;
    }
  });

  return (
    <StyledTableContainer component={Paper} sx={{ width: "100%" }}>
      <CloseButton onClick={onClose} size="small">
        <CloseIcon fontSize="small" />
      </CloseButton>

      <Typography align="center" sx={{ fontWeight: "bold", fontSize: "14px", mt: 1, mb: 1 }}>
        {/* Overdue Bills Comparison ({prevMonth} &amp; {currentMonth}) */}

                {currentMonthOnly
          ? `Overdue Bills (${currentMonth})`
          : <>Overdue Bills Comparison ({prevMonth} &amp; {currentMonth})</>}
      </Typography>

      <Table size="small">
        <StyledTableHead>
          <TableRow>
            <StyledHeaderCell>Ward</StyledHeaderCell>
            {/* <StyledHeaderCell>{prevMonth}</StyledHeaderCell> */}

            {!currentMonthOnly && <StyledHeaderCell>{prevMonth}</StyledHeaderCell>}

            <StyledHeaderCell>{currentMonth}</StyledHeaderCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {allWards.map((ward, index) => (
            <StyledRow key={ward} index={index}>
              <StyledCell>{ward}</StyledCell>
              {/* <StyledCell>{data[ward]?.[prevMonth] || 0}</StyledCell> */}

                            {!currentMonthOnly && <StyledCell>{data[ward]?.[prevMonth] || 0}</StyledCell>}
              <StyledCell>{data[ward]?.[currentMonth] || 0}</StyledCell>
            </StyledRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default OverdueBillsTable;