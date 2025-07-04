import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress,Typography,IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { styled } from "@mui/material/styles";
import { baseUrl } from "../../config/config";

// 📌 Get Previous Month-Year
const getPreviousMonthYear = () => {
  const prevBeforeTwoMonthDate = new Date();
  // console.log("prevDate----table",prevDate)
  prevBeforeTwoMonthDate.setMonth(prevBeforeTwoMonthDate.getMonth() - 2);
  // console.log(" prevDate.setMonth(prevDate.getMonth() - 1)----table",prevDate.setMonth(prevDate.getMonth() - 1))
  return prevBeforeTwoMonthDate.toLocaleString("en-US", { month: "short" }).toUpperCase() + "-" + prevBeforeTwoMonthDate.getFullYear();
};

const previousMonthYear = getPreviousMonthYear();
// console.log("previousMonthYear-----table",previousMonthYear)
// 📌 Styled Components
const StyledTableContainer = styled(TableContainer)({
  marginTop: "2%",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  overflow: "hidden",
});

const CloseButton = styled(IconButton)({
  position: 'absolute',
  top: 8,
  right: 8,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  zIndex: 1000,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  }
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

const PaidBillpreviousTwoMonthBefore = ({onClose}) => {
  const [wardPaidCounts, setWardPaidCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const [previousMonthTotalBills, setPreviousMonthTotalBills] = useState({});
const [beforeTwoMonthTotalBills, setBeforeTwoMonthTotalBills] = useState({});
  const allWards = ["Ward-A", "Ward-B", "Ward-C", "Ward-D", "Ward-E", "Ward-F", "Ward-G", "Ward-H", "Ward-I"];

  useEffect(() => {
    fetch(`${baseUrl}/getBills`)
      .then((response) => response.json())
      .then((data) => {
        const counts = data.reduce((acc, bill) => {
          if (bill.paymentStatus === "paid" && bill.monthAndYear === previousMonthYear) {
            const ward = bill.ward;
            acc[ward] = (acc[ward] || 0) + 1;
          }
          return acc;
        }, {});


       const beforeTwoCounts = data.reduce((acc, bill) => {
    if (bill.monthAndYear === previousMonthYear) {
        const ward = bill.ward;
        acc[ward] = (acc[ward] || 0) + 1;
    }
    return acc;
}, {});
setBeforeTwoMonthTotalBills(beforeTwoCounts);

        // Ensure all wards are present
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
    <StyledTableContainer component={Paper} sx={{ width: 
    {   xs: '100%',
      sm: '100%',
      md: '100%',
      lg: '100%',
      xl: '100%',height:'100%'} 
     }}>
 <CloseButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </CloseButton>


      
      {loading ? (
        <CircularProgress style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <>
          <Typography align="center" sx={{ fontWeight: "bold", fontSize: "14px", mt: 1, mb: 1 }}>
            Paid Bills for {previousMonthYear}
          </Typography>
          <Table size="small">
            <StyledTableHead>
              <TableRow>
                <StyledHeaderCell>Ward</StyledHeaderCell>
                <StyledHeaderCell>Paid</StyledHeaderCell>
                 <StyledHeaderCell>Total</StyledHeaderCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {allWards.map((ward, index) => (
                <StyledRow key={ward} index={index}>
                  <StyledCell>{ward}</StyledCell>
                  <StyledCell>{wardPaidCounts[ward]}</StyledCell>
               <StyledCell>{beforeTwoMonthTotalBills[ward]}</StyledCell>



                  
                </StyledRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </StyledTableContainer>
  );
};

export default PaidBillpreviousTwoMonthBefore;
