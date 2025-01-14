import React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const MonthYearPicker = ({ cRDate, handleCRDChange }) => {
  // Convert string cRDate to Dayjs object, default to current date if invalid
  const dateValue = dayjs(cRDate);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
      sx={{width:'190px'}}
    
        views={['year', 'month']}
        label="🔍yy-mm bill" 
        value={dateValue.isValid() ? dateValue : null} // Ensure a valid date object
        onChange={(newValue) => handleCRDChange(newValue)}
        renderInput={(params) => (
          <TextField {...params} 
          
         
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default MonthYearPicker;
