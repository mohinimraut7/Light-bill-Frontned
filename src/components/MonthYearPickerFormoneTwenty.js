import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

const MonthYearPickerFormoneTwenty = ({ cRDate, handleCRDChange }) => {
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const dateValue = dayjs(cRDate);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
      slotProps={{ field: { size: 'small' } }}
      enableAccessibleFieldDOMStructure 
      sx={{
        
        width:{
            xl:isSidebarOpen ? '23%' : '20%',
         lg:isSidebarOpen ? '23%' : '20%',

        md:'45%',
        sm:'100%',
        xs:'100%'
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
        label="Search By Current Date" 
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

export default MonthYearPickerFormoneTwenty;
