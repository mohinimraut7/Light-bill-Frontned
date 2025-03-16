// import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';

// const BillDatePicker = ({ billMon, onChange, error, helperText }) => {
//   const [dateValue, setDateValue] = useState(billMon ? dayjs(billMon, 'MMM-YYYY') : null);

//   const handleChange = (newValue) => {
//     const formattedValue = newValue ? dayjs(newValue).format('MMM-YYYY').toUpperCase() : ''; 

//     setDateValue(newValue);
//     if (onChange) {
//       onChange(formattedValue);
//     }
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DatePicker
//         views={['year', 'month']}
//         label="Month and Year"
//         value={dateValue}
//         onChange={handleChange}
//         slotProps={{
//           textField: {
//             size: 'small',
//             fullWidth: true,
//             error: Boolean(error),
//             helperText: helperText,
//             sx: {
//               width: { xl: '40%', lg: '40%', md: '80%', sm: '80%', xs: '80%' },
//               mb: { xl: '0px', lg: '0px', md: '10px', sm: '10px', xs: '10px' },
//               color: '#1C1C1C',
//             },
//           },
//         }}
//       />
//     </LocalizationProvider>
//   );
// };

// export default BillDatePicker;
// =============================================
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const BillDatePicker = ({ selectedMonthYear, onChange }) => {
  console.log("selectedMonthYear---->>",selectedMonthYear)
  const [dateValue, setDateValue] = useState(
    selectedMonthYear ? dayjs(selectedMonthYear, "MMM-YYYY") : null
  );

  const handleChange = (newValue) => {
    const formattedValue = newValue
      ? dayjs(newValue).format("MMM-YYYY").toUpperCase()
      : "";
    setDateValue(newValue);
    if (onChange) {
      onChange(formattedValue);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        views={["year", "month"]}
        label="Month and Year"
        value={dateValue}
        onChange={handleChange}
        slotProps={{
          textField: {
            size: "small",
            fullWidth: true,
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default BillDatePicker;
