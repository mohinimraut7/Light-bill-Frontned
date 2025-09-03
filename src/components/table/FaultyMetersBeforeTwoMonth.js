// import React, { useEffect, useState } from "react";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography,IconButton } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';
// import { styled } from "@mui/material/styles";
// import { baseUrl } from "../../config/config";


// const getMonthYear = (date) => {
//   return date.toLocaleString("en-US", { month: "short" }).toUpperCase() + "-" + date.getFullYear();
// };


// const getPreviousMonthYear = () => {
//   const prevBeforeTwoMonthDate = new Date();
//   prevBeforeTwoMonthDate.setMonth(prevBeforeTwoMonthDate.getMonth() - 2);
//   return getMonthYear(prevBeforeTwoMonthDate);
// };

// const currentMonthYear = getPreviousMonthYear(); 


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


// const FaultyMetersBeforeTwoMonth = ({onClose}) => {
//   const [wardPaidCounts, setWardPaidCounts] = useState({});
//   const [loading, setLoading] = useState(true);

//   const allWards = ["Ward-A", "Ward-B", "Ward-C", "Ward-D", "Ward-E", "Ward-F", "Ward-G", "Ward-H", "Ward-I"];

//   useEffect(() => {
//     fetch(`${baseUrl}/getBills`)
//       .then((response) => response.json())
//       .then((data) => {
//         const counts = data.reduce((acc, bill) => {
//           if (bill.meterStatus === "FAULTY" && bill.monthAndYear === currentMonthYear) {
//             const ward = bill.ward;
//             acc[ward] = (acc[ward] || 0) + 1;
//           }
//           return acc;
//         }, {});

       
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
//   {   xs: '100%',
//       sm: '100%',
//       md: '100%',
//       lg: '100%',
//       xl: '100%',height:'100%'} 
//      }}>
//        <CloseButton onClick={onClose} size="small">
//           <CloseIcon fontSize="large" />
//         </CloseButton>

//       {loading ? (
//         <CircularProgress style={{ display: "block", margin: "20px auto" }} />
//       ) : (
//         <>
//           <Typography align="center" sx={{ fontWeight: "bold", fontSize: "14px", mt: 1, mb: 1 }}>
//             Faulty Meters For {currentMonthYear}
//           </Typography>
//           <Table size="small">
//             <StyledTableHead>
//               <TableRow>
//                 <StyledHeaderCell>Ward</StyledHeaderCell>
//                 <StyledHeaderCell>Count</StyledHeaderCell>
//               </TableRow>
//             </StyledTableHead>
//             <TableBody>
//               {allWards.map((ward, index) => (
//                 <StyledRow key={ward} index={index}>
//                   <StyledCell>{ward}</StyledCell>
//                   <StyledCell>{wardPaidCounts[ward]}</StyledCell>
//                 </StyledRow>
//               ))}
//             </TableBody>
//           </Table>
//         </>
//       )}
//     </StyledTableContainer>
//   );
// };

// export default FaultyMetersBeforeTwoMonth;

// -----------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, CircularProgress, Typography, IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { baseUrl } from "../../config/config";

// 📌 Month-Year helper
const getMonthYear = (date) => {
  return date.toLocaleString("en-US", { month: "short" }).toUpperCase() + "-" + date.getFullYear();
};

const getPreviousMonthYear = () => {
  const prevBeforeTwoMonthDate = new Date();
  prevBeforeTwoMonthDate.setMonth(prevBeforeTwoMonthDate.getMonth() - 2);
  return getMonthYear(prevBeforeTwoMonthDate);
};

const currentMonthYear = getPreviousMonthYear();

// 📌 Styled Components
const StyledTableContainer = styled(TableContainer)({
  marginTop: "2%",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  overflow: "hidden",
});

const CloseButton = styled(IconButton)({
  position: "absolute",
  top: 8,
  right: 8,
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  zIndex: 1000,
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
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

// 📌 Fetch All Bills with Pagination
const fetchAllBills = async () => {
  try {
    let allBills = [];
    let currentPage = 1;
    let totalPages = 1;

    // Get first page to know total pages
    const firstPageResponse = await fetch(`${baseUrl}/getBills?page=1&limit=100`);
    const firstPageData = await firstPageResponse.json();

    allBills = [...firstPageData.bills];
    totalPages = firstPageData.pagination.totalPages;

    // Fetch remaining pages
    const fetchPromises = [];
    for (let page = 2; page <= totalPages; page++) {
      fetchPromises.push(
        fetch(`${baseUrl}/getBills?page=${page}&limit=100`)
          .then((res) => res.json())
          .then((data) => data.bills)
      );
    }

    const remainingPages = await Promise.all(fetchPromises);
    remainingPages.forEach((bills) => {
      allBills = [...allBills, ...bills];
    });

    return allBills;
  } catch (error) {
    console.error("Error fetching bills:", error);
    return [];
  }
};

// 📌 Component
const FaultyMetersBeforeTwoMonth = ({ onClose }) => {
  const [wardFaultyCounts, setWardFaultyCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const allWards = [
    "Ward-A", "Ward-B", "Ward-C", "Ward-D", "Ward-E",
    "Ward-F", "Ward-G", "Ward-H", "Ward-I"
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const allBills = await fetchAllBills();

        // Count faulty meters before 2 months
        const counts = allBills.reduce((acc, bill) => {
          if (bill.meterStatus === "FAULTY" && bill.monthAndYear === currentMonthYear) {
            const ward = bill.ward;
            acc[ward] = (acc[ward] || 0) + 1;
          }
          return acc;
        }, {});

        // Ensure all wards are present
        const finalCounts = allWards.reduce((acc, ward) => {
          acc[ward] = counts[ward] || 0;
          return acc;
        }, {});

        setWardFaultyCounts(finalCounts);
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
        width: { xs: "100%", sm: "100%", md: "100%", lg: "100%", xl: "100%" },
        height: "100%",
      }}
    >
      <CloseButton onClick={onClose} size="small">
        <CloseIcon fontSize="large" />
      </CloseButton>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading faulty meters...</Typography>
        </div>
      ) : (
        <>
          <Typography align="center" sx={{ fontWeight: "bold", fontSize: "14px", mt: 1, mb: 1 }}>
            Faulty Meters For {currentMonthYear}
          </Typography>
          <Table size="small">
            <StyledTableHead>
              <TableRow>
                <StyledHeaderCell>Ward</StyledHeaderCell>
                <StyledHeaderCell>Faulty Count</StyledHeaderCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {allWards.map((ward, index) => (
                <StyledRow key={ward} index={index}>
                  <StyledCell>{ward}</StyledCell>
                  <StyledCell>{wardFaultyCounts[ward]}</StyledCell>
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
