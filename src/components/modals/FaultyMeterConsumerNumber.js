// import React from 'react';
// import {
//   Modal,
//   Box,
//   Typography,
//   TextField,
//   Button
// } from '@mui/material';

// const FaultyMeterConsumerNumber = ({
//   open,
//   handleClose,
//   jakraKramank,
//   setJakraKramank,
//   consumerNumber,
//   setConsumerNumber,
//   date,
//   setDate,
//   handleSubmit
// }) => {
//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: { xs: '95%', sm: '75%', md: '50%', lg: '53%', xl: '55%' },
//           maxWidth: 600,
//           bgcolor: 'background.paper',
//           boxShadow: 24,
//           p: 4,
//           borderRadius: '4px',
//           maxHeight: '90vh',
//           overflowY: 'auto',
//           '&::-webkit-scrollbar': {
//             width: '8px',
//           },
//           '&::-webkit-scrollbar-track': {
//             background: '#f1f1f1',
//             borderRadius: '5px',
//           },
//           '&::-webkit-scrollbar-thumb': {
//             background: '#23CCEF',
//             borderRadius: '5px',
//           },
//           '&::-webkit-scrollbar-thumb:hover': {
//             background: '#1EA2C1',
//           },
//         }}
//       >
//         <Box component="form" onSubmit={handleSubmit}>
//           <Typography variant="h6" gutterBottom>Enter Details</Typography>

//           <TextField
//             label="Jakra Kramank"
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             value={jakraKramank}
//             onChange={(e) => setJakraKramank(e.target.value)}
//           />

//           <TextField
//             label="Consumer Number"
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             value={consumerNumber}
//             onChange={(e) => setConsumerNumber(e.target.value)}
//           />

//           <TextField
//             label="Date"
//             type="date"
//             fullWidth
//             margin="normal"
//             InputLabelProps={{ shrink: true }}
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//           />

//           <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
//             <Button
//               type="button"
//               onClick={handleClose}
//               variant="contained"
//               sx={{
//                 mr: 2,
//                 backgroundColor: '#23CCEF',
//                 width: '100px',
//                 '&:hover': {
//                   backgroundColor: '#23CCEF',
//                   opacity: '0.8',
//                 },
//               }}
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               variant="contained"
//               sx={{
//                 backgroundColor: '#FB404B',
//                 '&:hover': {
//                   backgroundColor: '#FB404B',
//                   opacity: '0.8',
//                 },
//               }}
//             >
//               Save
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default FaultyMeterConsumerNumber;
// ----------------------------------------------------------------

// import React from 'react';
// import {
//   Modal,
//   Box,
//   Typography,
//   TextField,
//   Button
// } from '@mui/material';

// const FaultyMeterConsumerNumber = ({
//   open,
//   handleClose,
//   jakraKramank,
//   setJakraKramank,
//   consumerNumber,
//   setConsumerNumber,
//   date,
//   setDate,
//   handleSubmit
// }) => {
//   const onSubmit = (e) => {
//     e.preventDefault();
//     handleSubmit();
//   };

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: { xs: '95%', sm: '75%', md: '50%', lg: '53%', xl: '55%' },
//           maxWidth: 600,
//           bgcolor: 'background.paper',
//           boxShadow: 24,
//           p: 4,
//           borderRadius: '4px',
//           maxHeight: '90vh',
//           overflowY: 'auto',
//           '&::-webkit-scrollbar': {
//             width: '8px',
//           },
//           '&::-webkit-scrollbar-track': {
//             background: '#f1f1f1',
//             borderRadius: '5px',
//           },
//           '&::-webkit-scrollbar-thumb': {
//             background: '#23CCEF',
//             borderRadius: '5px',
//           },
//           '&::-webkit-scrollbar-thumb:hover': {
//             background: '#1EA2C1',
//           },
//         }}
//       >
//         <Box component="form" onSubmit={onSubmit}>
//           <Typography variant="h6" gutterBottom>Enter Consumer Details</Typography>

//           <TextField
//             label="Jakra Kramank"
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             value={jakraKramank || ''}
//             onChange={(e) => setJakraKramank(e.target.value)}
//             required
//           />

//           <TextField
//             label="Consumer Number"
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             value={consumerNumber || ''}
//             onChange={(e) => setConsumerNumber(e.target.value)}
//             required
//           />

//           <TextField
//             label="Date"
//             type="date"
//             fullWidth
//             margin="normal"
//             InputLabelProps={{ shrink: true }}
//             value={date || ''}
//             onChange={(e) => setDate(e.target.value)}
//             required
//           />

//           <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
//             <Button
//               type="button"
//               onClick={handleClose}
//               variant="contained"
//               sx={{
//                 mr: 2,
//                 backgroundColor: '#23CCEF',
//                 width: '100px',
//                 '&:hover': {
//                   backgroundColor: '#23CCEF',
//                   opacity: '0.8',
//                 },
//               }}
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               variant="contained"
//               sx={{
//                 backgroundColor: '#FB404B',
//                 '&:hover': {
//                   backgroundColor: '#FB404B',
//                   opacity: '0.8',
//                 },
//               }}
//             >
//               Save
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default FaultyMeterConsumerNumber;

// -------------------------------

import React from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button
} from '@mui/material';

const FaultyMeterConsumerNumber = ({
  open,
  handleClose,
  jakraKramank,
  setJakraKramank,
  consumerNumber,
  setConsumerNumber,
  date,
  setDate,
  handleSubmit
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '95%', sm: '75%', md: '50%', lg: '53%', xl: '55%' },
          maxWidth: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '4px',
          maxHeight: '90vh',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '5px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#23CCEF',
            borderRadius: '5px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#1EA2C1',
          },
        }}
      >
        <Box component="form" onSubmit={onSubmit}>
          <Typography variant="h6" gutterBottom>Enter Consumer Details</Typography>

          <TextField
            label="Jakra Kramank"
            fullWidth
            margin="normal"
            variant="outlined"
            value={jakraKramank || ''}
            onChange={(e) => setJakraKramank(e.target.value)}
            required
          />

          <TextField
            label="Consumer Number"
            fullWidth
            margin="normal"
            variant="outlined"
            value={consumerNumber || ''}
            onChange={(e) => setConsumerNumber(e.target.value)}
            required
          />

          <TextField
            label="Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={date || ''}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button
              type="button"
              onClick={handleClose}
              variant="contained"
              sx={{
                mr: 2,
                backgroundColor: '#23CCEF',
                width: '100px',
                '&:hover': {
                  backgroundColor: '#23CCEF',
                  opacity: '0.8',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#FB404B',
                '&:hover': {
                  backgroundColor: '#FB404B',
                  opacity: '0.8',
                },
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default FaultyMeterConsumerNumber;