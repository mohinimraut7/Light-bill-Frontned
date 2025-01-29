import React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const MonthYearBill = ({ monthAndYear, setFieldValue, setFieldTouched, error, helperText, name }) => {

  
  const dateValue = monthAndYear ? dayjs(monthAndYear, 'MMM-YYYY', true) : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        views={['year', 'month']}
        label="Month and Year"
        value={dateValue && dateValue.isValid() ? dateValue : null}
        onChange={(newValue) => {
          const formattedValue = newValue ? dayjs(newValue).format('MMM-YYYY') : '';

          
          setFieldValue(name, formattedValue);
          setFieldTouched(name, true, false);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            fullWidth
            error={Boolean(error)} 
            helperText={helperText} 
            sx={{
              width: {
                xl: '40%',
                lg: '40%',
                md: '80%',
                sm: '80%',
                xs: '80%',
              },
              mb: {
                xl: '0px',
                lg: '0px',
                md: '10px',
                sm: '10px',
                xs: '10px',
              },
              color: '#1C1C1C',
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default MonthYearBill;


