// import React, { useState } from "react";
// import { Box, TextField, IconButton, Typography } from "@mui/material";
// import RefreshIcon from "@mui/icons-material/Refresh";

// const MathCaptcha = ({ onValidate }) => {
//   const [num1, setNum1] = useState(generateRandomNumber());
//   const [num2, setNum2] = useState(generateRandomNumber());
//   const [userInput, setUserInput] = useState("");
  
//   function generateRandomNumber() {
//     return Math.floor(Math.random() * 10) + 1; // Random number between 1-10
//   }

//   const refreshCaptcha = () => {
//     setNum1(generateRandomNumber());
//     setNum2(generateRandomNumber());
//     setUserInput("");
//   };

//   const handleInputChange = (e) => {
//     setUserInput(e.target.value);
//     if (parseInt(e.target.value) === num1 + num2) {
//       onValidate(true); // If correct, allow login
//     }
//   };

//   return (
//     <Box display="flex" alignItems="center" gap={1} sx={{ mt: 1 ,justifyContent:'center'}}>
//       <Typography variant="h6" sx={{ fontWeight: "bold", color: "#007185"}}>
//         {num1} + {num2} =
//       </Typography>
//       <TextField
//         variant="outlined"
//         size="small"
//         value={userInput}
//         onChange={handleInputChange}
//         placeholder="Enter Answer"
//         sx={{ width: "65%" }}
//       />
//       <IconButton onClick={refreshCaptcha} color="primary">
//         <RefreshIcon />
//       </IconButton>
//     </Box>
//   );
// };

// export default MathCaptcha;

// ====================================================

import React, { useState } from "react";
import { Box, TextField, IconButton, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const MathCaptcha = ({ onValidate }) => {
  const [num1, setNum1] = useState(generateRandomNumber());
  const [num2, setNum2] = useState(generateRandomNumber());
  const [userInput, setUserInput] = useState("");
  
  function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1; // Random number between 1-10
  }

  const refreshCaptcha = () => {
    setNum1(generateRandomNumber());
    setNum2(generateRandomNumber());
    setUserInput("");
    onValidate(false); // Reset validation when refreshing
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    if (parseInt(e.target.value) === num1 + num2) {
      onValidate(true); // If correct, allow login
    } else {
      onValidate(false); // If incorrect, don't allow login
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: 1.5,
        p: 1.5,
        bgcolor: 'rgba(8, 102, 255, 0.05)',
        borderRadius: '8px',
        border: '1px solid rgba(8, 102, 255, 0.1)',
        mt: 1
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: "bold", 
          color: "#0866FF",
          fontSize: '1.1rem',
          minWidth: 'fit-content'
        }}
      >
        {num1} + {num2} =
      </Typography>
      
      <TextField
        variant="outlined"
        size="small"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Answer"
        sx={{ 
          width: "80px",
          '& .MuiOutlinedInput-root': {
            borderRadius: '6px',
            '& input': {
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: '500'
            }
          }
        }}
      />
      
      <IconButton 
        onClick={refreshCaptcha} 
        sx={{ 
          color: '#0866FF',
          '&:hover': { 
            backgroundColor: 'rgba(8, 102, 255, 0.1)',
            transform: 'rotate(180deg)'
          },
          transition: 'all 0.3s ease'
        }}
      >
        <RefreshIcon />
      </IconButton>
    </Box>
  );
};

export default MathCaptcha;
