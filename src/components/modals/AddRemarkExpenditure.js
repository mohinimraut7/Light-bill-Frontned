import React from 'react';
import { Modal, Box, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import expstatus from '../../data/expstatus'; // तुमचं expstatus

const AddRemarkExpenditure = ({ open, handleClose, remark, setRemark, handleSubmit }) => {
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
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>Add Remark</Typography>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="remark-label">Status Name</InputLabel>
              <Select
                labelId="remark-label"
                id="remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                label="Enter Remark"
              >
                {expstatus.map((item, index) => (
                  <MenuItem key={index} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
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

export default AddRemarkExpenditure;
