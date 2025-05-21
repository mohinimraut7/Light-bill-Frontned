import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import SearchIcon from '@mui/icons-material/Search';

const MonthYearPicker = ({ cRDate, handleCRDChange }) => {
  
  const dateValue = dayjs(cRDate);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
      slotProps={{ field: { size: 'small' } }}
      enableAccessibleFieldDOMStructure 
      sx={{width:{
        xl:'40%',
        lg:'40%',
        md:'50%',
        sm:'80%',
        xs:'80%'
      },
      mb:{
        xl:'0px',
        lg:'0px',
        md:'10px',
        sm:'10px',
        xs:'10px'
      }  
        
      
      }}
    
        views={['year', 'month']}
        label="Current Date" 
        value={dateValue.isValid() ? dateValue : null} 
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
