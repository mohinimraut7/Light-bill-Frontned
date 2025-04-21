import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const BillDatePicker = ({ selectedMonthYear, onChange }) => {
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
