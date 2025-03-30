import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

// 📌 Styled Components
const StyledTableContainer = styled(TableContainer)({
  marginTop: "2%",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  overflow: "hidden",
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: "#07773D", // Light color for due warning
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

const getMonthYear = (date) => {
    return date.toLocaleString("en-US", { month: "short" }).toUpperCase() + "-" + date.getFullYear();
  };
  
  const currentMonthYear = getMonthYear(new Date());

const UpcomingDueBillCurrentMonth = () => {
  const { bills } = useSelector((state) => state.bills);
  const user = useSelector((state) => state.auth.user);
  const [wardDueCounts, setWardDueCounts] = useState({});
  const [loading, setLoading] = useState(true);
  
  const allWards = ["Ward-A", "Ward-B", "Ward-C", "Ward-D", "Ward-E", "Ward-F", "Ward-G", "Ward-H", "Ward-I"];
  const today = new Date();

  // useEffect(() => {
  //   const dueCounts = bills.reduce((acc, bill) => {
  //     const dueDate = new Date(bill.dueDate);
  //     const twoDaysBeforeDue = new Date(dueDate);
  //     twoDaysBeforeDue.setDate(dueDate.getDate() - 2);

  //     const isDueSoon = today >= twoDaysBeforeDue && today <= dueDate;
  //     const isUnpaid = bill.paymentStatus === "unpaid";

  //     if (isDueSoon && isUnpaid) {
  //       if (user?.role === "Junior Engineer" && user?.ward !== bill.ward) {
  //         return acc;
  //       }
        
  //       const ward = bill.ward;
  //       acc[ward] = (acc[ward] || 0) + 1;
  //     }
  //     return acc;
  //   }, {});

  //   // Ensure all wards are present
  //   const finalCounts = allWards.reduce((acc, ward) => {
  //     acc[ward] = dueCounts[ward] || 0;
  //     return acc;
  //   }, {});

  //   setWardDueCounts(finalCounts);
  //   setLoading(false);
  // }, [bills, user]);

  // =======================================================================
  
  // useEffect(() => {
  //   const dueCounts = bills.reduce((acc, bill) => {
  //     const dueDate = new Date(bill.dueDate);
  //     dueDate.setHours(0, 0, 0, 0); // Reset time for accurate comparison
  
  //     const today = new Date();
  //     today.setHours(0, 0, 0, 0); // Reset time for accurate comparison
  
  //     // Calculate two days before the due date
  //     const twoDaysBeforeDue = new Date(dueDate);
  //     twoDaysBeforeDue.setDate(dueDate.getDate() - 2);
  //     twoDaysBeforeDue.setHours(0, 0, 0, 0);
  
  //     // Check if the due date is today or within the two-day range before due date
  //     const isDueSoon = (dueDate === today) || (today >= twoDaysBeforeDue && today <= dueDate);
  //     const isUnpaid = bill.paymentStatus === "unpaid";
  
  //     if (isDueSoon && isUnpaid) {
  //       if (user?.role === "Junior Engineer" && user?.ward !== bill.ward) {
  //         return acc;
  //       }
  
  //       const ward = bill.ward;
  //       acc[ward] = (acc[ward] || 0) + 1;
  //     }
  //     return acc;
  //   }, {});
  
  //   // Ensure all wards are present
  //   const finalCounts = allWards.reduce((acc, ward) => {
  //     acc[ward] = dueCounts[ward] || 0;
  //     return acc;
  //   }, {});
  
  //   setWardDueCounts(finalCounts);
  //   setLoading(false);
  // }, [bills, user]);
  
  // ========================================================================
  useEffect(() => {
    const dueCounts = bills.reduce((acc, bill) => {
      const dueDate = new Date(bill.dueDate);
      dueDate.setHours(0, 0, 0, 0); // Reset time for accurate comparison
  
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time for accurate comparison
  
      // Calculate two days before the due date
      const twoDaysBeforeDue = new Date(dueDate);
      twoDaysBeforeDue.setDate(dueDate.getDate() - 2);
      twoDaysBeforeDue.setHours(0, 0, 0, 0);
  
      // Correct way to check if the due date is today or within the two-day range before due date
      const isDueSoon = (dueDate.getTime() === today.getTime()) || 
                        (today >= twoDaysBeforeDue && today <= dueDate);
      
      const isUnpaid = bill.paymentStatus === "unpaid";
  
      if (isDueSoon && isUnpaid) {
        if (user?.role === "Junior Engineer" && user?.ward !== bill.ward && user?.ward !== "Head Office") {
          return acc;
        }
  
        const ward = bill.ward;
        acc[ward] = (acc[ward] || 0) + 1;
      }
      return acc;
    }, {});
  
    // Ensure all wards are present
    const finalCounts = allWards.reduce((acc, ward) => {
      acc[ward] = dueCounts[ward] || 0;
      return acc;
    }, {});
  
    setWardDueCounts(finalCounts);
    setLoading(false);
  }, [bills, user]);
  
  
  return (
    <StyledTableContainer component={Paper} sx={{ width: { lg: "25%", xl: "25%", md: "25%", sm: "60%", xs: "100%" } }}>
      {loading ? (
        <CircularProgress style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <>
          <Typography align="center" sx={{ fontWeight: "bold", fontSize: "14px", mt: 1, mb: 1 }}>
            Upcoming Due Bills for {currentMonthYear}
          </Typography>
          <Table size="small">
            <StyledTableHead>
              <TableRow>
                <StyledHeaderCell>Ward</StyledHeaderCell>
                <StyledHeaderCell>Due Count</StyledHeaderCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {allWards.map((ward, index) => (
                <StyledRow key={ward} index={index}>
                  <StyledCell>{ward}</StyledCell>
                  <StyledCell>{wardDueCounts[ward]}</StyledCell>
                </StyledRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </StyledTableContainer>
  );
};

export default UpcomingDueBillCurrentMonth;
