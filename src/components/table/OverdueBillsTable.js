import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

// Styled Components
const StyledTableContainer = styled(TableContainer)({
  marginTop: "2%",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  overflow: "hidden",
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: "#FCAB44", // Red tone for overdue
});

const StyledHeaderCell = styled(TableCell)({
  color: "#FFF",
  fontWeight: "bold",
  textAlign: "center",
});

const StyledRow = styled(TableRow)(({ index }) => ({
  backgroundColor: index % 2 === 0 ? "#F5F5F5" : "#fff",
}));

const StyledCell = styled(TableCell)({
  textAlign: "center",
  fontSize: "14px",
  fontWeight: "500",
});

// Function to convert "SEP-2024" to "September 2024"
const convertMonthAndYear = (monthAndYear) => {
  const [shortMonth, year] = monthAndYear.split("-");
  const monthsMap = {
    JAN: "JAN",
    FEB: "FEB",
    MAR: "MAR",
    APR: "APR",
    MAY: "MAY",
    JUN: "JUN",
    JUL: "JUL",
    AUG: "AUG",
    SEP: "SEP",
    OCT: "OCT",
    NOV: "NOV",
    DEC: "DEC",
  };

  return `${monthsMap[shortMonth.toUpperCase()] || shortMonth}-${year}`;
};

const OverdueBillsTable = () => {
  const { bills } = useSelector((state) => state.bills);
  const user = useSelector((state) => state.auth.user);
  const [overdueData, setOverdueData] = useState({});
  const [loading, setLoading] = useState(true);

  const allWards = [
    "Ward-A",
    "Ward-B",
    "Ward-C",
    "Ward-D",
    "Ward-E",
    "Ward-F",
    "Ward-G",
    "Ward-H",
    "Ward-I",
  ];

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const data = {};

    bills.forEach((bill) => {
      const dueDate = new Date(bill.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      const isOverdue = dueDate < today && bill.paymentStatus === "unpaid";

      if (isOverdue) {
        if (
          user?.role === "Junior Engineer" &&
          user?.ward !== bill.ward &&
          user?.ward !== "Head Office"
        ) {
          return;
        }

        const ward = bill.ward;
        const monthYear = bill.monthAndYear;

        if (!data[ward]) {
          data[ward] = {};
        }

        data[ward][monthYear] = (data[ward][monthYear] || 0) + 1;
      }
    });

    setOverdueData(data);
    setLoading(false);
  }, [bills, user]);

  return (
    <StyledTableContainer
      component={Paper}
      sx={{ width: { lg: "30%", md: "60%", sm: "100%", xs: "100%" } }}
    >
      {loading ? (
        <CircularProgress style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <>
          <Typography
            align="center"
            sx={{ fontWeight: "bold", fontSize: "14px", mt: 1, mb: 1 }}
          >
            Overdue Bills Count
          </Typography>
          <Table size="small">
            <StyledTableHead>
              <TableRow>
                <StyledHeaderCell>Ward</StyledHeaderCell>
                <StyledHeaderCell>Month</StyledHeaderCell>
                <StyledHeaderCell>Count</StyledHeaderCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {allWards.map((ward, index) => {
                const wardData = overdueData[ward] || {};
                const monthEntries = Object.entries(wardData);
                return monthEntries.length > 0 && (
                  monthEntries.map(([month, count], i) => (
                    <StyledRow key={`${ward}-${month}-${i}`} index={index + i}>
                      <StyledCell>{ward}</StyledCell>
                      <StyledCell>{convertMonthAndYear(month)}</StyledCell>
                      <StyledCell>{count}</StyledCell>
                    </StyledRow>
                  ))
                ) 
              })}
            </TableBody>
          </Table>
        </>
      )}
    </StyledTableContainer>
  );
};

export default OverdueBillsTable;
