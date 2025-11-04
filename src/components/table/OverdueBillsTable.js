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
// import { useSelector } from "react-redux";

// // Styled Components
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
//   backgroundColor: "#FCAB44", // Red tone for overdue
// });

// const StyledHeaderCell = styled(TableCell)({
//   color: "#FFF",
//   fontWeight: "bold",
//   textAlign: "center",
// });

// const StyledRow = styled(TableRow)(({ index }) => ({
//   backgroundColor: index % 2 === 0 ? "#F5F5F5" : "#fff",
// }));

// const StyledCell = styled(TableCell)({
//   textAlign: "center",
//   fontSize: "14px",
//   fontWeight: "500",
// });

// // Function to convert "SEP-2024" to "September 2024"
// const convertMonthAndYear = (monthAndYear) => {
//   const [shortMonth, year] = monthAndYear.split("-");
//   const monthsMap = {
//     JAN: "JAN",
//     FEB: "FEB",
//     MAR: "MAR",
//     APR: "APR",
//     MAY: "MAY",
//     JUN: "JUN",
//     JUL: "JUL",
//     AUG: "AUG",
//     SEP: "SEP",
//     OCT: "OCT",
//     NOV: "NOV",
//     DEC: "DEC",
//   };

//   return `${monthsMap[shortMonth.toUpperCase()] || shortMonth}-${year}`;
// };

// const OverdueBillsTable = ({onClose}) => {
//   const { bills } = useSelector((state) => state.bills);
//   const user = useSelector((state) => state.auth.user);
//   const [overdueData, setOverdueData] = useState({});
//   const [loading, setLoading] = useState(true);

//   const allWards = [
//     "Ward-A",
//     "Ward-B",
//     "Ward-C",
//     "Ward-D",
//     "Ward-E",
//     "Ward-F",
//     "Ward-G",
//     "Ward-H",
//     "Ward-I",
//   ];

//   useEffect(() => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const data = {};

//     bills.forEach((bill) => {
//       const dueDate = new Date(bill.dueDate);
//       dueDate.setHours(0, 0, 0, 0);
//       const isOverdue = dueDate < today && bill.paymentStatus === "unpaid";

//       if (isOverdue) {
//         if (
//           user?.role === "Junior Engineer" &&
//           user?.ward !== bill.ward &&
//           user?.ward !== "Head Office"
//         ) {
//           return;
//         }

//         const ward = bill.ward;
//         const monthYear = bill.monthAndYear;

//         if (!data[ward]) {
//           data[ward] = {};
//         }

//         data[ward][monthYear] = (data[ward][monthYear] || 0) + 1;
//       }
//     });

//     setOverdueData(data);
//     setLoading(false);
//   }, [bills, user]);

//   return (
//     <StyledTableContainer
//       component={Paper}
//       sx={{ width:
//       {  
//       xs: '100%',
//       sm: '100%',
//       md: '100%',
//       lg: '100%',
//       xl: '100%',height:'100%'}
//     }}
//     >
//        <CloseButton onClick={onClose} size="small">
//           <CloseIcon fontSize="small" />
//         </CloseButton>
//       {loading ? (
//         <CircularProgress style={{ display: "block", margin: "20px auto" }} />
//       ) : (
//         <>
//           <Typography
//             align="center"
//             sx={{ fontWeight: "bold", fontSize: "14px", mt: 1, mb: 1 }}
//           >
//             Overdue Bills Count
//           </Typography>
//           <Table size="small">
//             <StyledTableHead>
//               <TableRow>
//                 <StyledHeaderCell>Ward</StyledHeaderCell>
//                 <StyledHeaderCell>Month</StyledHeaderCell>
//                 <StyledHeaderCell>Count</StyledHeaderCell>
//               </TableRow>
//             </StyledTableHead>
//             <TableBody>
//               {allWards.map((ward, index) => {
//                 const wardData = overdueData[ward] || {};
//                 const monthEntries = Object.entries(wardData);
//                 return monthEntries.length > 0 && (
//                   monthEntries.map(([month, count], i) => (
//                     <StyledRow key={`${ward}-${month}-${i}`} index={index + i}>
//                       <StyledCell>{ward}</StyledCell>
//                       <StyledCell>{convertMonthAndYear(month)}</StyledCell>
//                       <StyledCell>{count}</StyledCell>
//                     </StyledRow>
//                   ))
//                 ) 
//               })}
//             </TableBody>
//           </Table>
//         </>
//       )}
//     </StyledTableContainer>
//   );
// };

// export default OverdueBillsTable;

// ======================================================

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
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { baseUrl } from "../../config/config";

// 📅 Helper to get month-year format like "OCT-2025"
const getMonthYear = (date) => {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  return `${months[date.getMonth()]}-${date.getFullYear()}`;
};

// 🎨 Styled Components
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
  "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: "#FCAB44",
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

const OverdueBillsTable = ({ onClose }) => {
  const [loading, setLoading] = useState(true);
  const [overdueData, setOverdueData] = useState({});
  const allWards = ["Ward-A", "Ward-B", "Ward-C", "Ward-D", "Ward-E", "Ward-F", "Ward-G", "Ward-H", "Ward-I"];

  // 🔹 Function to fetch all bills from paginated API
  const fetchAllBills = async () => {
    try {
      let allBills = [];
      let currentPage = 1;
      let totalPages = 1;

      const firstPage = await fetch(`${baseUrl}/getBills?page=1&limit=100`);
      const firstData = await firstPage.json();
      allBills = [...firstData.bills];
      totalPages = firstData.pagination.totalPages;

      const promises = [];
      for (let i = 2; i <= totalPages; i++) {
        promises.push(fetch(`${baseUrl}/getBills?page=${i}&limit=100`).then((res) => res.json()));
      }

      const results = await Promise.all(promises);
      results.forEach((r) => {
        if (r?.bills) allBills.push(...r.bills);
      });

      return allBills;
    } catch (error) {
      console.error("Error fetching all bills:", error);
      return [];
    }
  };

  // 🔹 Calculate overdue counts (unpaid + dueDate < today)
  useEffect(() => {
    const loadOverdueData = async () => {
      setLoading(true);
      try {
        const allBills = await fetchAllBills();

        const today = new Date();
        const currentMonth = getMonthYear(today);
        const prevMonth = getMonthYear(new Date(today.getFullYear(), today.getMonth() - 1));

        const data = {};

        allBills.forEach((bill) => {
          if (!bill?.dueDate || !bill?.monthAndYear || !bill?.ward) return;

          const dueDate = new Date(bill.dueDate);
          // const isOverdue = bill.paymentStatus?.toLowerCase() === "unpaid" && dueDate < today;
          const isOverdue =
          bill.paymentStatus &&
          bill.paymentStatus.toLowerCase() === "unpaid" &&
          dueDate instanceof Date &&
          !isNaN(dueDate) &&
          dueDate < today;


          if (isOverdue && (bill.monthAndYear === currentMonth || bill.monthAndYear === prevMonth)) {
            const ward = bill.ward;
            if (!data[ward]) data[ward] = { [prevMonth]: 0, [currentMonth]: 0 };
            data[ward][bill.monthAndYear] = (data[ward][bill.monthAndYear] || 0) + 1;
          }
        });

        // Fill missing wards
        const filledData = allWards.reduce((acc, ward) => {
          acc[ward] = data[ward] || { [prevMonth]: 0, [currentMonth]: 0 };
          return acc;
        }, {});

        setOverdueData(filledData);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOverdueData();
  }, []);

  // 🔹 Prepare months for header
  const today = new Date();
  const currentMonth = getMonthYear(today);
  const prevMonth = getMonthYear(new Date(today.getFullYear(), today.getMonth() - 1));

  return (
    <StyledTableContainer component={Paper}>
      <CloseButton onClick={onClose} size="small">
        <CloseIcon fontSize="small" />
      </CloseButton>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading overdue bills...</Typography>
        </div>
      ) : (
        <>
          <Typography align="center" sx={{ fontWeight: "bold", fontSize: "14px", mt: 1, mb: 1 }}>
            Overdue Bills Comparison ({prevMonth} & {currentMonth})
          </Typography>
          <Table size="small">
            <StyledTableHead>
              <TableRow>
                <StyledHeaderCell>Ward</StyledHeaderCell>
                <StyledHeaderCell>{prevMonth}</StyledHeaderCell>
                <StyledHeaderCell>{currentMonth}</StyledHeaderCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {allWards.map((ward, index) => (
                <StyledRow key={ward} index={index}>
                  <StyledCell>{ward}</StyledCell>
                  <StyledCell>{overdueData[ward]?.[prevMonth] || 0}</StyledCell>
                  <StyledCell>{overdueData[ward]?.[currentMonth] || 0}</StyledCell>
                </StyledRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </StyledTableContainer>
  );
};

export default OverdueBillsTable;

