import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const BillDatePicker = ({ selectedMonthYear, onChange }) => {
  const [dateValue, setDateValue] = useState(null);

  useEffect(() => {
    if (selectedMonthYear) {
      const parsedDate = dayjs(selectedMonthYear, "MMM-YYYY");
      if (parsedDate.isValid()) {
        setDateValue(parsedDate);
      }
    } else {
      setDateValue(null);
    }
  }, [selectedMonthYear]);

  const handleChange = (newValue) => {
    setDateValue(newValue);

    if (onChange) {
      if (newValue && dayjs(newValue).isValid()) {
        const formattedValue = dayjs(newValue).format("MMM-YYYY").toUpperCase();
        onChange(formattedValue);
      } else {
        onChange("");
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        views={["year", "month"]}
        label="Month and Year"
        value={dateValue}
        onChange={handleChange}
        openTo="year"
        slotProps={{
          textField: {
            size: "small",
            fullWidth: true,
          },
          actionBar: {
            actions: ["clear", "cancel", "accept"],
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default BillDatePicker;
