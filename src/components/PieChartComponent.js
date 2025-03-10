import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux';
const PieChartComponent = () => {
  const chartRef = useRef(null); 
  const chartInstance = useRef(null); 
 const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const { bills, loading: loadingBills, error: errorBills } = useSelector((state) => state.bills);
  const { meters, loading: loadingMeters, error: errorUsers } = useSelector((state) => state.meters);
  const uniqueBills = bills
  .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)) 
  .filter((bill, index, self) => {
    return index === self.findIndex(b => b.cn === bill.cn);
  });
const meterStatusCounts = uniqueBills.reduce((acc, bill) => {
    if (bill.meterStatus === 'Faulty') {
        acc.Faulty += 1;
    } else if (bill.meterStatus === 'Average') {
        acc.Average += 1;
    }
    return acc;
}, { Faulty: 0, Average: 0 });
  useEffect(() => {
    if (chartRef.current) {
     
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      chartInstance.current = new Chart(chartRef.current, {
        type: 'pie', 
        data: {
          labels: ['Faulty Meters', 'Average Meters', uniqueBills.length], 
          datasets: [
            {
              label: 'Meter Status Distribution',
              data: [meterStatusCounts.Faulty,meterStatusCounts.Average,10], 
              backgroundColor: [
                '#E74C3C', 
                '#23CCEF', 
                '#FFAE48', 
              ],
              borderColor: [
              '#E74C3C', 
                '#23CCEF', 
                '#FFAE48', 
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true, 
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                },
              },
            },
          },
        },
      });
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);
  return (
      <canvas ref={chartRef}></canvas>
  );
};
export default PieChartComponent;
