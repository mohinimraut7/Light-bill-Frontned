import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = () => {
  const chartRef = useRef(null); // Reference for canvas
  const chartInstance = useRef(null); // To hold chart instance

  useEffect(() => {
    if (chartRef.current) {
      // Destroy any existing chart instance to avoid duplicates
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create a new Chart instance
      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016'],
          datasets: [
            {
              label: 'Acquisitions by Year',
              data: [10, 20, 15, 25, 22, 30, 28],
              backgroundColor: '#1CCCF1', // Bar color
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true, // Make chart responsive
          maintainAspectRatio: false, // Allow chart to fill parent container
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

export default ChartComponent;
