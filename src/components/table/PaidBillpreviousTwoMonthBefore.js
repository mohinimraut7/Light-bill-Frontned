// import React, { useEffect, useState } from "react";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress,Typography,IconButton } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';
// import { styled } from "@mui/material/styles";
// import { baseUrl } from "../../config/config";

// // 📌 Get Previous Month-Year
// const getPreviousMonthYear = () => {
//   const prevBeforeTwoMonthDate = new Date();
//   // console.log("prevDate----table",prevDate)
//   prevBeforeTwoMonthDate.setMonth(prevBeforeTwoMonthDate.getMonth() - 2);
//   // console.log(" prevDate.setMonth(prevDate.getMonth() - 1)----table",prevDate.setMonth(prevDate.getMonth() - 1))
//   return prevBeforeTwoMonthDate.toLocaleString("en-US", { month: "short" }).toUpperCase() + "-" + prevBeforeTwoMonthDate.getFullYear();
// };

// const previousMonthYear = getPreviousMonthYear();
// // console.log("previousMonthYear-----table",previousMonthYear)
// // 📌 Styled Components
// const StyledTableContainer = styled(TableContainer)({
//   marginTop: "2%",
//   borderRadius: "10px",
//   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//   overflow: "hidden",
// });

// const CloseButton = styled(IconButton)({
//   position: 'absolute',
//   top: 8,
//   right: 8,
//   backgroundColor: 'rgba(255, 255, 255, 0.9)',
//   zIndex: 1000,
//   '&:hover': {
//     backgroundColor: 'rgba(255, 255, 255, 1)',
//   }
// });
// const StyledTableHead = styled(TableHead)({
//   backgroundColor: "#07773D",
// });

// const StyledHeaderCell = styled(TableCell)({
//   color: "#FFF",
//   fontWeight: "bold",
//   textAlign: "center",
// });

// const StyledRow = styled(TableRow)(({ index }) => ({
//   backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
// }));

// const StyledCell = styled(TableCell)({
//   textAlign: "center",
//   fontSize: "14px",
//   fontWeight: "500",
// });

// const PaidBillpreviousTwoMonthBefore = ({onClose}) => {
//   const [wardPaidCounts, setWardPaidCounts] = useState({});
//   const [loading, setLoading] = useState(true);

//   const [previousMonthTotalBills, setPreviousMonthTotalBills] = useState({});
// const [beforeTwoMonthTotalBills, setBeforeTwoMonthTotalBills] = useState({});
//   const allWards = ["Ward-A", "Ward-B", "Ward-C", "Ward-D", "Ward-E", "Ward-F", "Ward-G", "Ward-H", "Ward-I"];

//   useEffect(() => {
//     fetch(`${baseUrl}/getBills`)
//       .then((response) => response.json())
//       .then((data) => {
//         const counts = data.reduce((acc, bill) => {
//           if (bill.paymentStatus === "paid" && bill.monthAndYear === previousMonthYear) {
//             const ward = bill.ward;
//             acc[ward] = (acc[ward] || 0) + 1;
//           }
//           return acc;
//         }, {});


//        const beforeTwoCounts = data.reduce((acc, bill) => {
//     if (bill.monthAndYear === previousMonthYear) {
//         const ward = bill.ward;
//         acc[ward] = (acc[ward] || 0) + 1;
//     }
//     return acc;
// }, {});
// setBeforeTwoMonthTotalBills(beforeTwoCounts);

//         // Ensure all wards are present
//         const finalCounts = allWards.reduce((acc, ward) => {
//           acc[ward] = counts[ward] || 0;
//           return acc;
//         }, {});

//         setWardPaidCounts(finalCounts);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <StyledTableContainer component={Paper} sx={{ width: 
//     {   xs: '100%',
//       sm: '100%',
//       md: '100%',
//       lg: '100%',
//       xl: '100%',height:'100%'} 
//      }}>
//  <CloseButton onClick={onClose} size="small">
//           <CloseIcon fontSize="small" />
//         </CloseButton>


      
//       {loading ? (
//         <CircularProgress style={{ display: "block", margin: "20px auto" }} />
//       ) : (
//         <>
//           <Typography align="center" sx={{ fontWeight: "bold", fontSize: "14px", mt: 1, mb: 1 }}>
//             Paid Bills for {previousMonthYear}
//           </Typography>
//           <Table size="small">
//             <StyledTableHead>
//               <TableRow>
//                 <StyledHeaderCell>Ward</StyledHeaderCell>
//                 <StyledHeaderCell>Paid</StyledHeaderCell>
//                  <StyledHeaderCell>Total</StyledHeaderCell>
//               </TableRow>
//             </StyledTableHead>
//             <TableBody>
//               {allWards.map((ward, index) => (
//                 <StyledRow key={ward} index={index}>
//                   <StyledCell>{ward}</StyledCell>
//                   <StyledCell>{wardPaidCounts[ward]}</StyledCell>
//                {/* <StyledCell>{beforeTwoMonthTotalBills[ward]}</StyledCell> */}
//                   <StyledCell>{beforeTwoMonthTotalBills[ward] != null ? beforeTwoMonthTotalBills[ward] : '-'}</StyledCell> 
//                 </StyledRow>
//               ))}
//             </TableBody>
//           </Table>
//         </>
//       )}
//     </StyledTableContainer>
//   );
// };

// export default PaidBillpreviousTwoMonthBefore;


// ====================================================================
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, IconButton } from "@mui/material";
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
console.log("previousMonthYear Nove 2 month before-----table",previousMonthYear)
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

const PaidBillpreviousTwoMonthBefore = ({ onClose }) => {
  const [wardPaidCounts, setWardPaidCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [previousMonthTotalBills, setPreviousMonthTotalBills] = useState({});
  const [beforeTwoMonthTotalBills, setBeforeTwoMonthTotalBills] = useState({});
  const allWards = ["Ward-A", "Ward-B", "Ward-C", "Ward-D", "Ward-E", "Ward-F", "Ward-G", "Ward-H", "Ward-I"];

  // Function to fetch all bills from all pages
  const fetchAllBills = async () => {
    try {
      let allBills = [];
      let currentPage = 1;
      let totalPages = 1;

      // First, get the first page to know total pages
      const firstPageResponse = await fetch(`${baseUrl}/getBills?page=1&limit=100`);
      const firstPageData = await firstPageResponse.json();
      
      allBills = [...firstPageData.bills];
      totalPages = firstPageData.pagination.totalPages;

      // Fetch remaining pages
      const fetchPromises = [];
      for (let page = 2; page <= totalPages; page++) {
        fetchPromises.push(
          fetch(`${baseUrl}/getBills?page=${page}&limit=100`)
            .then(response => response.json())
            .then(data => data.bills)
        );
      }

      // Wait for all promises to resolve and combine results
      const remainingPages = await Promise.all(fetchPromises);
      remainingPages.forEach(bills => {
        allBills = [...allBills, ...bills];
      });

      return allBills;
    } catch (error) {
      console.error("Error fetching all bills:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      try {
        const allBills = await fetchAllBills();
        
        // Calculate paid counts for previous month (2 months before)
        const counts = allBills.reduce((acc, bill) => {
          if (bill.paymentStatus === "paid" && bill.monthAndYear === previousMonthYear) {
            const ward = bill.ward;
            acc[ward] = (acc[ward] || 0) + 1;
          }
          return acc;
        }, {});

        // Total bills (paid + unpaid) count wardwise for previous month (2 months before)
        const beforeTwoCounts = allBills.reduce((acc, bill) => {

          console.log("previousMonthYear Nov testing in table",)
          if (bill.monthAndYear === previousMonthYear) {
            const ward = bill.ward;
            acc[ward] = (acc[ward] || 0) + 1;
          }
          return acc;
        }, {});

        // Ensure all wards are present in paid counts
        const finalCounts = allWards.reduce((acc, ward) => {
          acc[ward] = counts[ward] || 0;
          return acc;
        }, {});

        // Ensure all wards are present in total counts
        const finalTotalCounts = allWards.reduce((acc, ward) => {
          acc[ward] = beforeTwoCounts[ward] || 0;
          return acc;
        }, {});

        setWardPaidCounts(finalCounts);
        setBeforeTwoMonthTotalBills(finalTotalCounts);
        
      } catch (error) {
        console.error("Error processing data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <StyledTableContainer 
      component={Paper} 
      sx={{ 
        width: {
          xs: '100%',
          sm: '100%',
          md: '100%',
          lg: '100%',
          xl: '100%'
        },
        height: '100%'
      }}
    >
      <CloseButton onClick={onClose} size="small">
        <CloseIcon fontSize="small" />
      </CloseButton>
      
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading all bills data...</Typography>
        </div>
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
                  <StyledCell>{wardPaidCounts[ward] || 0}</StyledCell>
                  <StyledCell>{beforeTwoMonthTotalBills[ward] || 0}</StyledCell>
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