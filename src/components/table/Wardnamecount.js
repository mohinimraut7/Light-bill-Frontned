// import React, { useEffect, useState } from "react";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from "@mui/material";
// import { baseUrl } from "../../config/config";

// const WardTable = () => {
//   const [wardCounts, setWardCounts] = useState({});
//   const [loading, setLoading] = useState(true);

//   // Define all possible wards (Ward-A to Ward-I)
//   const allWards = ["Ward-A", "Ward-B", "Ward-C", "Ward-D", "Ward-E", "Ward-F", "Ward-G", "Ward-H", "Ward-I"];

//   useEffect(() => {
//     fetch(`${baseUrl}/getConsumers`)
//       .then((response) => response.json())
//       .then((data) => {
//         // Group and count consumers by ward
//         const counts = data.reduce((acc, consumer) => {
//           const ward = consumer.ward;
//           acc[ward] = (acc[ward] || 0) + 1;
//           return acc;
//         }, {});

//         // Ensure all wards exist in the counts object (missing ones should have count 0)
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
//     <TableContainer sx={{width:'20%'}} component={Paper}>
//       {loading ? (
//         <CircularProgress style={{ margin: "20px auto", display: "block" }} />
//       ) : (
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell><b>Ward</b></TableCell>
//               <TableCell><b>Total Meters</b></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {allWards.map((ward) => (
//               <TableRow key={ward}>
//                 <TableCell>{ward}</TableCell>
//                 <TableCell>{wardCounts[ward]}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       )}
//     </TableContainer>
//   );
// };

// export default WardTable;
// ---------------------------------------------
import React, { useEffect, useState } from "react";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  CircularProgress, Typography 
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { baseUrl } from "../../config/config";

// Custom styling
const StyledTableContainer = styled(TableContainer)({
 
  marginTop:'2%',
//   margin: "20px auto",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  overflow: "hidden",
  
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: "#1976D2",
});

const StyledHeaderCell = styled(TableCell)({
  color: "#FFF",
 fontWeight:'bold',
  textAlign: "center",
});

const StyledRow = styled(TableRow)(({ index }) => ({
  backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
}));

const StyledCell = styled(TableCell)({
  textAlign: "center",
  fontSize: "12px",
  fontWeight: "500",
});

const WardTable = () => {
  const [wardCounts, setWardCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const allWards = ["Ward-A", "Ward-B", "Ward-C", "Ward-D", "Ward-E", "Ward-F", "Ward-G", "Ward-H", "Ward-I"];

  useEffect(() => {
    fetch(`${baseUrl}/getConsumers`)
      .then((response) => response.json())
      .then((data) => {
        const counts = data.reduce((acc, consumer) => {
          const ward = consumer.ward;
          acc[ward] = (acc[ward] || 0) + 1;
          return acc;
        }, {});

        const finalCounts = allWards.reduce((acc, ward) => {
          acc[ward] = counts[ward] || 0;
          return acc;
        }, {});

        setWardCounts(finalCounts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* <Typography variant="h5" align="center" sx={{ fontWeight: "bold", mt: 3 }}>
        Ward-Wise Meter Count
      </Typography> */}

      <StyledTableContainer sx={{ width:{lg:"25%",xl:"25%",md:'25%',sm:'60%',xs:'100%'},
      
    }}
      
      component={Paper}>
        {loading ? (
          <CircularProgress style={{ display: "block" }} />
        ) : (
          <Table size="small">
            <StyledTableHead>
              <TableRow>
                <StyledHeaderCell>Ward</StyledHeaderCell>
                <StyledHeaderCell>Total Meters</StyledHeaderCell>
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
        )}
      </StyledTableContainer>
    </>
  );
};

export default WardTable;


