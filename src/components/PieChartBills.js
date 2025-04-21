
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
const BarChartBills = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { bills } = useSelector((state) => state.bills);
  const user = useSelector((state) => state.auth.user);
  const getMonthsForCurrentYear = () => {
    const currentYear = new Date().getFullYear();
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return monthNames.map((month) => `${month}-${currentYear}`);
  };
  const monthsForAPI = getMonthsForCurrentYear();
  const monthlyCounts = monthsForAPI.reduce((acc, month) => {
    acc[month] = { paid: 0, unpaid: 0, overdue: 0 };
    return acc;
  }, {});
  const today = new Date();
  bills.forEach((bill) => {
    if (monthsForAPI.includes(bill.monthAndYear)) {
      const { monthAndYear, paymentStatus, dueDate, ward } = bill;
      if (user?.role === "Junior Engineer" && user?.ward !== ward && user?.ward !== "Head Office") return;
      if (paymentStatus === "paid") {
        monthlyCounts[monthAndYear].paid++;
      } else if (paymentStatus === "unpaid") {
        const due = new Date(dueDate);
        if (due < today) {
          monthlyCounts[monthAndYear].overdue++;
        } else {
          monthlyCounts[monthAndYear].unpaid++;
        }
      }
    }
  });
  const labels = monthsForAPI;
  const paidData = labels.map((month) => monthlyCounts[month]?.paid || 0);
  const unpaidData = labels.map((month) => monthlyCounts[month]?.unpaid || 0);
  const overdueData = labels.map((month) => monthlyCounts[month]?.overdue || 0);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      chartInstance.current = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Paid Bills",
              data: paidData,
              backgroundColor: "#23CCEF",
            },
            {
              label: "Unpaid Bills",
              data: unpaidData,
              backgroundColor: "#FFAE48",
            },
            {
              label: "Overdue Bills",
              data: overdueData,
              backgroundColor: "#E74C3C",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top" },
          },
          scales: {
            x: { stacked: true },
            y: { stacked: true },
          },
        },
      });
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [bills]);
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};
export default BarChartBills;
