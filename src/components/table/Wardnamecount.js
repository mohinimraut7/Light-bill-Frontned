// import React, { useEffect, useState } from "react";
// import { 
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
//   CircularProgress, Typography 
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { baseUrl } from "../../config/config";
// const StyledTableContainer = styled(TableContainer)({
//   marginTop:'2%',
//   borderRadius: "10px",
//   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//   overflow: "hidden",
// });
// const StyledTableHead = styled(TableHead)({
//   backgroundColor: "#07773D",
// });
// const StyledHeaderCell = styled(TableCell)({
//   color: "#FFF",
//  fontWeight:'bold',
//   textAlign: "center",
// });
// const StyledRow = styled(TableRow)(({ index }) => ({
//   backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
// }));
// const StyledCell = styled(TableCell)({
//   textAlign: "center",
//   fontSize: "12px",
//   fontWeight: "500",
// });
// const WardTable = () => {
//   const [wardCounts, setWardCounts] = useState({});
//   const [loading, setLoading] = useState(true);
//   const allWards = ["Ward-A", "Ward-B", "Ward-C", "Ward-D", "Ward-E", "Ward-F", "Ward-G", "Ward-H", "Ward-I"];
//   useEffect(() => {
//     fetch(`${baseUrl}/getConsumers`)
//       .then((response) => response.json())
//       .then((data) => {
//         const counts = data.reduce((acc, consumer) => {
//           const ward = consumer.ward;
//           acc[ward] = (acc[ward] || 0) + 1;
//           return acc;
//         }, {});
//         const finalCounts = allWards.reduce((acc, ward) => {
//           acc[ward] = counts[ward] || 0;
//           return acc;
//         }, {});
//         setWardCounts(finalCounts);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       });
//   }, []);
//   return (
//     <>
//       <StyledTableContainer sx={{ width:{lg:"25%",xl:"25%",md:'25%',sm:'60%',xs:'100%'},
//     }}
//       component={Paper}>
//         {loading ? (
//           <CircularProgress style={{ display: "block" }} />
//         ) : (
//           <>
//           <Typography  align="center" sx={{ fontWeight: "bold",fontSize:'14px',mt:1,mb:1  }}>
//         Total Ward Wise Meter Count
//       </Typography>
//           <Table size="small">
//             <StyledTableHead>
//               <TableRow>
//                 <StyledHeaderCell>Ward</StyledHeaderCell>
//                 <StyledHeaderCell>Meters</StyledHeaderCell>
//               </TableRow>
//             </StyledTableHead>
//             <TableBody>
//               {allWards.map((ward, index) => (
//                 <StyledRow key={ward} index={index}>
//                   <StyledCell>{ward}</StyledCell>
//                   <StyledCell>{wardCounts[ward]}</StyledCell>
//                 </StyledRow>
//               ))}
//             </TableBody>
//           </Table>
//           </>
//         )}
//       </StyledTableContainer>
//     </>
//   );
// };
// export default WardTable;

// =================================================
// import React, { useEffect, useState } from "react";
// import { 
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
//   CircularProgress, Typography, IconButton, Box 
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import CloseIcon from '@mui/icons-material/Close';
// import { baseUrl } from "../../config/config";

// const StyledTableContainer = styled(TableContainer)({
//   marginTop:'2%',
//   borderRadius: "10px",
//   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//   overflow: "hidden",
//   position: 'relative'
// });

// const StyledTableHead = styled(TableHead)({
//   backgroundColor: "#07773D",
// });

// const StyledHeaderCell = styled(TableCell)({
//   color: "#FFF",
//   fontWeight:'bold',
//   textAlign: "center",
// });

// const StyledRow = styled(TableRow)(({ index }) => ({
//   backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
// }));

// const StyledCell = styled(TableCell)({
//   textAlign: "center",
//   fontSize: "12px",
//   fontWeight: "500",
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

// const Wardnamecount = ({ onClose }) => {
//   const [wardCounts, setWardCounts] = useState({});
//   const [loading, setLoading] = useState(true);
//   const allWards = ["Ward-A", "Ward-B", "Ward-C", "Ward-D", "Ward-E", "Ward-F", "Ward-G", "Ward-H", "Ward-I"];
  
//   useEffect(() => {
//     fetch(`${baseUrl}/getConsumers`)
//       .then((response) => response.json())
//       .then((data) => {
//         const counts = data.reduce((acc, consumer) => {
//           const ward = consumer.ward;
//           acc[ward] = (acc[ward] || 0) + 1;
//           return acc;
//         }, {});
//         const finalCounts = allWards.reduce((acc, ward) => {
//           acc[ward] = counts[ward] || 0;
//           return acc;
//         }, {});
//         setWardCounts(finalCounts);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       });
//   }, []);
  
//   return (
//     <>
//       <StyledTableContainer sx={{ width:{lg:"25%",xl:"25%",md:'25%',sm:'60%',xs:'100%'} }}
//       component={Paper}>
//         <CloseButton onClick={onClose} size="small">
//           <CloseIcon fontSize="small" />
//         </CloseButton>
//         {loading ? (
//           <CircularProgress style={{ display: "block", margin: "20px auto" }} />
//         ) : (
//           <>
//           <Typography align="center" sx={{ fontWeight: "bold",fontSize:'14px',mt:1,mb:1 }}>
//             Total Ward Wise Meter Count
//           </Typography>
//           <Table size="small">
//             <StyledTableHead>
//               <TableRow>
//                 <StyledHeaderCell>Ward</StyledHeaderCell>
//                 <StyledHeaderCell>Meters</StyledHeaderCell>
//               </TableRow>
//             </StyledTableHead>
//             <TableBody>
//               {allWards.map((ward, index) => (
//                 <StyledRow key={ward} index={index}>
//                   <StyledCell>{ward}</StyledCell>
//                   <StyledCell>{wardCounts[ward]}</StyledCell>
//                 </StyledRow>
//               ))}
//             </TableBody>
//           </Table>
//           </>
//         )}
//       </StyledTableContainer>
//     </>
//   );
// };
// export default Wardnamecount;


// =======================================

// import React, { useEffect, useState } from "react";
// import { 
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
//   CircularProgress, Typography, IconButton, Box 
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import CloseIcon from '@mui/icons-material/Close';

// const StyledTableContainer = styled(TableContainer)({
//   marginTop:'2%',
//   borderRadius: "10px",
//   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//   overflow: "hidden",
//   position: 'relative'
// });

// const StyledTableHead = styled(TableHead)({
//   backgroundColor: "#07773D",
// });

// const StyledHeaderCell = styled(TableCell)({
//   color: "#FFF",
//   fontWeight:'bold',
//   textAlign: "center",
// });

// const StyledRow = styled(TableRow)(({ index }) => ({
//   backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
// }));

// const StyledCell = styled(TableCell)({
//   textAlign: "center",
//   fontSize: "12px",
//   fontWeight: "500",
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

// const Wardnamecount = ({ onClose }) => {
//   const [wardCounts, setWardCounts] = useState({});
//   const [loading, setLoading] = useState(true);
//   const allWards = ["Ward-A", "Ward-B", "Ward-C", "Ward-D", "Ward-E", "Ward-F", "Ward-G", "Ward-H", "Ward-I"];
  
//   useEffect(() => {
//     // Simulating API call with mock data
//     setTimeout(() => {
//       const mockData = [
//         { ward: "Ward-A" }, { ward: "Ward-A" }, { ward: "Ward-B" },
//         { ward: "Ward-C" }, { ward: "Ward-C" }, { ward: "Ward-C" },
//         { ward: "Ward-D" }, { ward: "Ward-E" }, { ward: "Ward-E" },
//         { ward: "Ward-F" }, { ward: "Ward-G" }, { ward: "Ward-H" },
//         { ward: "Ward-I" }, { ward: "Ward-I" }, { ward: "Ward-I" }
//       ];
      
//       const counts = mockData.reduce((acc, consumer) => {
//         const ward = consumer.ward;
//         acc[ward] = (acc[ward] || 0) + 1;
//         return acc;
//       }, {});
//       const finalCounts = allWards.reduce((acc, ward) => {
//         acc[ward] = counts[ward] || 0;
//         return acc;
//       }, {});
//       setWardCounts(finalCounts);
//       setLoading(false);
//     }, 1000);
//   }, []);
  
//   return (
//     <>
//       {/* <StyledTableContainer sx={{ width:{lg:"25%",xl:"25%",md:'25%',sm:'60%',xs:'100%'} }}
//       component={Paper}> */}
//       <StyledTableContainer
//   sx={{
//     width: {
//       xs: '100%',
//       sm: '100%',
//       md: '100%',
//       lg: '100%',
//       xl: '100%',
//     },
//     height:"100%",
//     // mt: 5,
//     mx: 'auto',
//     position: 'relative',
//   }}
//   component={Paper}
// >
//         <CloseButton onClick={onClose} size="small">
//           <CloseIcon fontSize="small" />
//         </CloseButton>
//         {loading ? (
//           <CircularProgress style={{ display: "block", margin: "20px auto" }} />
//         ) : (
//           <>
//           <Typography align="center" sx={{ fontWeight: "bold",fontSize:'14px',mt:1,mb:1 }}>
//             Total Ward Wise Meter Count
//           </Typography>
//           <Table size="small">
//             <StyledTableHead>
//               <TableRow>
//                 <StyledHeaderCell>Ward</StyledHeaderCell>
//                 <StyledHeaderCell>Meters</StyledHeaderCell>
//               </TableRow>
//             </StyledTableHead>
//             <TableBody>
//               {allWards.map((ward, index) => (
//                 <StyledRow key={ward} index={index}>
//                   <StyledCell>{ward}</StyledCell>
//                   <StyledCell>{wardCounts[ward]}</StyledCell>
//                 </StyledRow>
//               ))}
//             </TableBody>
//           </Table>
//           </>
//         )}
//       </StyledTableContainer>
//     </>
//   );
// };
// export default Wardnamecount;

// ================================

import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  CircularProgress, Typography, IconButton
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';
import { baseUrl } from "../../config/config";

// Styled components
const StyledTableContainer = styled(TableContainer)({
  marginTop: '2%',
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  overflow: "hidden",
  position: 'relative'
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: "#07773D",
});

const StyledHeaderCell = styled(TableCell)({
  color: "#FFF",
  fontWeight: 'bold',
  textAlign: "center",
  fontSize: "13px"
});

const StyledRow = styled(TableRow)(({ index }) => ({
  backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
}));

const StyledCell = styled(TableCell)({
  textAlign: "center",
  fontSize: "13px",
  fontWeight: "500",
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

// Main component
const Wardnamecount = ({ onClose }) => {
  const [wardCounts, setWardCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const allWards = [
    "Ward-A", "Ward-B", "Ward-C", "Ward-D", "Ward-E",
    "Ward-F", "Ward-G", "Ward-H", "Ward-I"
  ];

  useEffect(() => {
    fetch(`${baseUrl}/getConsumers`)
      .then((res) => res.json())
      .then((data) => {
        const counts = data.reduce((acc, consumer) => {
          const ward = consumer.ward;
          if (ward) {
            acc[ward] = (acc[ward] || 0) + 1;
          }
          return acc;
        }, {});
        const finalCounts = allWards.reduce((acc, ward) => {
          acc[ward] = counts[ward] || 0;
          return acc;
        }, {});
        setWardCounts(finalCounts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <StyledTableContainer
      sx={{
        width: {
          xs: '100%',
          sm: '100%',
          md: '100%',
          lg: '100%',
          xl: '100%',
        },
        mx: 'auto',
        position: 'relative',
      }}
      component={Paper}
    >
      <CloseButton onClick={onClose} size="small">
        <CloseIcon fontSize="small" />
      </CloseButton>

      {loading ? (
        <CircularProgress sx={{ display: "block", my: 4, mx: "auto" }} />
      ) : (
        <>
          <Typography
            align="center"
            sx={{ fontWeight: "bold", fontSize: '15px', mt: 2, mb: 2 }}
          >
            Total Ward Wise Meter Count
          </Typography>
          <Table size="small">
            <StyledTableHead>
              <TableRow>
                <StyledHeaderCell>Ward</StyledHeaderCell>
                <StyledHeaderCell>Meters</StyledHeaderCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {allWards.map((ward, index) => (
                <StyledRow key={ward} index={index}>
                  <StyledCell>{ward}</StyledCell>
                  <StyledCell>{wardCounts[ward]}</StyledCell>
                </StyledRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </StyledTableContainer>
  );
};

export default Wardnamecount;
