// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Typography,
//   IconButton
// } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';
// import { styled } from "@mui/material/styles";
// import { baseUrl } from "../../config/config";
// const getCurrentMonthYear = () => {
//   const currentDate = new Date();
//   return currentDate.toLocaleString("en-US", { month: "short" }).toUpperCase() + "-" + currentDate.getFullYear();
// };
// const currentMonthYear = getCurrentMonthYear();
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
// const PaidBillCurrentMonth = ({onClose}) => {
//   const [wardTotalCountsBills, setWardTotalCountsBills] = useState({});
//   const [wardPaidCounts, setWardPaidCounts] = useState({});
//   const [loading, setLoading] = useState(true);
//   const allWards = ["Ward-A", "Ward-B", "Ward-C", "Ward-D", "Ward-E", "Ward-F", "Ward-G", "Ward-H", "Ward-I"];
//   useEffect(() => {
//     fetch(`${baseUrl}/getBills`)
//       .then((response) => response.json())
//       .then((data) => {
//         const counts = data.reduce((acc, bill) => {
//           if (bill.paymentStatus === "paid" && bill.monthAndYear === currentMonthYear) {
//             const ward = bill.ward;
//             acc[ward] = (acc[ward] || 0) + 1;
//           }
//           return acc;
//         }, {});

//          // Total bills (paid + unpaid) count wardwise for previous month
//       const totalCounts = data.reduce((acc, bill) => {
//         if (bill.monthAndYear === currentMonthYear) {
//           const ward = bill.ward;
//           acc[ward] = (acc[ward] || 0) + 1;
//         }
//         return acc;
//       }, {})

//       setWardTotalCountsBills(totalCounts); // <-- You need to create this state

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
//    {  
//       xs: '100%',
//       sm: '100%',
//       md: '100%',
//       lg: '100%',
//       xl: '100%',height:'100%'}
//      }}>
//       <CloseButton onClick={onClose} size="small">
//           <CloseIcon fontSize="small" />
//         </CloseButton>
//       {loading ? (
//         <CircularProgress style={{ display: "block", margin: "20px auto" }} />
//       ) : (
//         <>
//           <Typography align="center" sx={{ fontWeight: "bold", fontSize: "14px", mt: 1, mb: 1 }}>
//             Paid Bills for {currentMonthYear}
//           </Typography>
//           <Table size="small">
//             <StyledTableHead>
//               <TableRow>
//                 <StyledHeaderCell>Ward</StyledHeaderCell>
//                 <StyledHeaderCell>Paid</StyledHeaderCell>
//                 <StyledHeaderCell>Total</StyledHeaderCell>
//               </TableRow>
//             </StyledTableHead>
//             <TableBody>
//               {allWards.map((ward, index) => (
//                 <StyledRow key={ward} index={index}>
//                   <StyledCell>{ward}</StyledCell>
//                   <StyledCell>{wardPaidCounts[ward]}</StyledCell>
//                    <StyledCell>{wardTotalCountsBills[ward]||'-'}</StyledCell>

//                 </StyledRow>
//               ))}
//             </TableBody>
//           </Table>
//         </>
//       )}
//     </StyledTableContainer>
//   );
// };
// export default PaidBillCurrentMonth;


// --------------------------------------------------------------------------------------------------------------------------------


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
  IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { styled } from "@mui/material/styles";
import { baseUrl } from "../../config/config";

const getCurrentMonthYear = () => {
  const currentDate = new Date();
  return currentDate.toLocaleString("en-US", { month: "short" }).toUpperCase() + "-" + currentDate.getFullYear();
};
const currentMonthYear = getCurrentMonthYear();

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

const PaidBillCurrentMonth = ({ onClose }) => {
  const [wardTotalCountsBills, setWardTotalCountsBills] = useState({});
  const [wardPaidCounts, setWardPaidCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const allWards = ["Ward-A", "Ward-B", "Ward-C", "Ward-D", "Ward-E", "Ward-F", "Ward-G", "Ward-H", "Ward-I"];

  // Fetch all bills across pagination (if API uses pagination). Returns an array of bills.
  const fetchAllBills = async () => {
    try {
      // Try first without pagination (some APIs directly return array)
      const resp = await fetch(`${baseUrl}/getBills?page=1&limit=100`);
      const json = await resp.json();

      // If response contains bills + pagination
      if (json && Array.isArray(json.bills)) {
        let all = [...json.bills];
        const totalPages = json.pagination?.totalPages || 1;

        if (totalPages > 1) {
          const promises = [];
          for (let p = 2; p <= totalPages; p++) {
            promises.push(
              fetch(`${baseUrl}/getBills?page=${p}&limit=100`)
                .then(r => r.json())
                .then(d => d.bills || [])
                .catch(() => [])
            );
          }
          const remaining = await Promise.all(promises);
          remaining.forEach(arr => { all = all.concat(arr); });
        }
        return all;
      }

      // If the endpoint returned an array directly when called with /getBills?page=1...
      if (Array.isArray(json)) {
        return json;
      }

      // Fallback: try calling without query params (some endpoints behave differently)
      const resp2 = await fetch(`${baseUrl}/getBills`);
      const json2 = await resp2.json();
      if (Array.isArray(json2)) return json2;
      if (json2 && Array.isArray(json2.bills)) return json2.bills;

      // If nothing works, return empty array
      return [];
    } catch (err) {
      console.error("fetchAllBills error:", err);
      return [];
    }
  };

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const allBills = await fetchAllBills();

        // Compute paid counts for current month
        const paidCounts = allBills.reduce((acc, bill) => {
          try {
            if (bill?.paymentStatus === "paid" && bill?.monthAndYear === currentMonthYear) {
              const ward = bill.ward || "Unknown";
              acc[ward] = (acc[ward] || 0) + 1;
            }
          } catch (e) { /* ignore malformed bill */ }
          return acc;
        }, {});

        // Compute total counts for current month (paid + unpaid)
        const totalCounts = allBills.reduce((acc, bill) => {
          try {
            if (bill?.monthAndYear === currentMonthYear) {
              const ward = bill.ward || "Unknown";
              acc[ward] = (acc[ward] || 0) + 1;
            }
          } catch (e) { /* ignore malformed bill */ }
          return acc;
        }, {});

        // Ensure all wards present (fill missing with 0)
        const finalPaid = allWards.reduce((acc, ward) => {
          acc[ward] = paidCounts[ward] || 0;
          return acc;
        }, {});
        const finalTotal = allWards.reduce((acc, ward) => {
          acc[ward] = totalCounts[ward] || 0;
          return acc;
        }, {});

        if (mounted) {
          setWardPaidCounts(finalPaid);
          setWardTotalCountsBills(finalTotal);
        }
      } catch (error) {
        console.error("Error processing bills:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, []); // run once

  return (
    <StyledTableContainer component={Paper} sx={{
      width: {
        xs: '100%',
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '100%'
      },
      height: '100%'
    }}>
      <CloseButton onClick={onClose} size="small">
        <CloseIcon fontSize="small" />
      </CloseButton>

      {loading ? (
        <div style={{ padding: 30, textAlign: "center" }}>
          <CircularProgress />
          <Typography sx={{ mt: 1 }}>Loading bills...</Typography>
        </div>
      ) : (
        <>
          <Typography align="center" sx={{ fontWeight: "bold", fontSize: "14px", mt: 1, mb: 1 }}>
            Paid Bills for {currentMonthYear}
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
                  <StyledCell>{wardPaidCounts[ward] ?? 0}</StyledCell>
                  <StyledCell>{wardTotalCountsBills[ward] ?? 0}</StyledCell>
                </StyledRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </StyledTableContainer>
  );
};

export default PaidBillCurrentMonth;
