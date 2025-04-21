import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { baseUrl } from "../../config/config";


const getMonthYear = (date) => {
  return date.toLocaleString("en-US", { month: "short" }).toUpperCase() + "-" + date.getFullYear();
};


const getPreviousMonthYear = () => {
  const prevBeforeTwoMonthDate = new Date();
  prevBeforeTwoMonthDate.setMonth(prevBeforeTwoMonthDate.getMonth() - 2);
  return getMonthYear(prevBeforeTwoMonthDate);
};

const currentMonthYear = getPreviousMonthYear(); 


const StyledTableContainer = styled(TableContainer)({
  marginTop: "2%",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  overflow: "hidden",
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: "#07773D",
});

const StyledHeaderCell = styled(TableCell)({
  color: "#FFF",
  fontWeight: "bold",
  textAlign: "center",
});

const StyledRow = styled(TableRow)(({ index }) => ({
  backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
}));

const StyledCell = styled(TableCell)({
  textAlign: "center",
  fontSize: "14px",
  fontWeight: "500",
});

const FaultyMetersBeforeTwoMonth = () => {
  const [wardPaidCounts, setWardPaidCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const allWards = ["Ward-A", "Ward-B", "Ward-C", "Ward-D", "Ward-E", "Ward-F", "Ward-G", "Ward-H", "Ward-I"];

  useEffect(() => {
    fetch(`${baseUrl}/getBills`)
      .then((response) => response.json())
      .then((data) => {
        const counts = data.reduce((acc, bill) => {
          if (bill.meterStatus === "FAULTY" && bill.monthAndYear === currentMonthYear) {
            const ward = bill.ward;
            acc[ward] = (acc[ward] || 0) + 1;
          }
          return acc;
        }, {});

       
        const finalCounts = allWards.reduce((acc, ward) => {
          acc[ward] = counts[ward] || 0;
          return acc;
        }, {});

        setWardPaidCounts(finalCounts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <StyledTableContainer component={Paper} sx={{ width: { lg: "25%", xl: "25%", md: "25%", sm: "60%", xs: "100%" } }}>
      {loading ? (
        <CircularProgress style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <>
          <Typography align="center" sx={{ fontWeight: "bold", fontSize: "14px", mt: 1, mb: 1 }}>
            Faulty Meters For {currentMonthYear}
          </Typography>
          <Table size="small">
            <StyledTableHead>
              <TableRow>
                <StyledHeaderCell>Ward</StyledHeaderCell>
                <StyledHeaderCell>Count</StyledHeaderCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {allWards.map((ward, index) => (
                <StyledRow key={ward} index={index}>
                  <StyledCell>{ward}</StyledCell>
                  <StyledCell>{wardPaidCounts[ward]}</StyledCell>
                </StyledRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </StyledTableContainer>
  );
};

export default FaultyMetersBeforeTwoMonth;
