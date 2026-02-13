import React from "react";
import { Button, Typography } from "@mui/material";

const ConsumerButton = ({ onClick, disabled, children, customStyles,startIcon}) => {
//   const defaultStyles = {
//     backgroundColor: "#23CCEF",
//     border: "2px solid #23CCEF",
//     cursor: "pointer",
//     textTransform:"uppercase",
//     display: "flex",
//     // backgroundColor: "#23CCEF",
//    color: "#fff",
//     // fontSize: "1px",
//     // fontWeight: "bold",
//     borderRadius: "8px",
//     transition: "background-color 0.3s ease, transform 0.2s ease",
//     fontFamily: "'Poppins','Roboto',sans-serif", // ✅ font added
//      '&:hover': {
              
//                color: '#fff',
//                 opacity: 0.7,
//       transform: "scale(1.02)",
//  backgroundColor: '#1AB3D1',
//                   border: '1px solid #1AB3D1',
      
//               },
//     // "&:hover": {
//     //   backgroundColor: "#23CCEF",
//     //   opacity: 0.7,
//     //   transform: "scale(1.02)",
//     // },
//     "&:active": {
//       transform: "scale(0.98)",
//     },
//     justifyContent: "center",
//     alignItems: "center",
//     mt: { xl: 0, lg: 0, md: 0, sm: 1, xs: 1 },
//     width: { xl: "21%", lg: "26%", md: "22%", sm: "80%", xs: "80%" },
//   };

  
const defaultStyles = {
  backgroundColor: "#23CCEF",
  border: "2px solid #23CCEF",
  cursor: "pointer",
  textTransform: "uppercase",
  display: "flex",
  color: "#fff",
  borderRadius: "8px",
  fontFamily: "'Poppins','Roboto',sans-serif",
  transition: "all 0.25s ease",

  // ✅ subtle shadow
  boxShadow: "0px 3px 8px rgba(0,0,0,0.15)",

  '&:hover': {
    color: '#fff',
    backgroundColor: '#1AB3D1',
    border: '1px solid #1AB3D1',

    // smoother hover
    transform: "translateY(-1px)",
    boxShadow: "0px 6px 14px rgba(0,0,0,0.2)",
  },

  "&:active": {
    transform: "scale(0.98)",
    boxShadow: "none",
  },

  justifyContent: "center",
  alignItems: "center",
  mt: { xl: 0, lg: 0, md: 0, sm: 1, xs: 1 },
  width: { xl: "21%", lg: "26%", md: "22%", sm: "80%", xs: "80%" },
};



return (
    <Button sx={{ ...defaultStyles, ...customStyles }} onClick={onClick} disabled={disabled}
    startIcon={startIcon}
    size="small"
    >
      <Typography
        sx={{

          fontSize: { xl: "17px", lg: "12px", md: "10px", sm: "15px", xs: "15px" },
          fontWeight: "bold",
          textTransform: { xl: "capitalize", lg: "uppercase", md: "uppercase", sm: "uppercase", xs: "uppercase" },
        }}
      >
        {children}
      </Typography>
    </Button>
  );
};

export default ConsumerButton;
