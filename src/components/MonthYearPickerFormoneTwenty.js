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
     slotProps={{
          textField: {
            size: 'small',
            sx: {
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#000',       // Normal border
                },
                '&:hover fieldset': {
                  borderColor: '#000',       // Hover border
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#000',       // Focus border
                },
              },
              '& .MuiInputLabel-root': {
                color: '#000',               // Label text
                textTransform: 'uppercase',
                fontSize: '12px',
              },
              '& .MuiInputBase-input': {
                color: '#000',               // Input text color
                fontSize: '13px',
              },
              '& .MuiSvgIcon-root': {
                color: '#000',               // Calendar icon
              },
            },
          },
        }}
      enableAccessibleFieldDOMStructure 
      sx={{
        
        width:{
            xl:isSidebarOpen ? '25%' : '25%',
         lg:isSidebarOpen ? '25%' : '25%',

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
