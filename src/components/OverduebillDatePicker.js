import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const OverduebillDatePicker = ({ selectedMonthYear, onChange }) => {
  const [dateValue, setDateValue] = useState(
    selectedMonthYear ? dayjs(selectedMonthYear, "MMM-YYYY") : null
  );

  const [view, setView] = useState("year"); // 🔥 IMPORTANT

  // Sync external value
  useEffect(() => {
    if (selectedMonthYear) {
      const parsed = dayjs(selectedMonthYear, "MMM-YYYY");
      if (parsed.isValid()) {
        setDateValue(parsed);
      }
    } else {
      setDateValue(null);
    }
  }, [selectedMonthYear]);

  const handleChange = (newValue) => {
    if (!newValue) return;

    setDateValue(newValue);

    // Month select झाल्यावरच parent ला value
    if (view === "month") {
      const formatted = dayjs(newValue)
        .format("MMM-YYYY")
        .toUpperCase();

      if (onChange) onChange(formatted);
    }
  };

  const handleViewChange = (newView) => {
    setView(newView);

    // 🔥 Year select होताच month ला force करा
    if (newView === "year") {
      setTimeout(() => {
        setView("month");
      }, 0);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        views={["year", "month"]}
        view={view}
        openTo="year"
        label="Month and Year"
        value={dateValue}
        onChange={handleChange}
        onViewChange={handleViewChange}
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

export default OverduebillDatePicker;
