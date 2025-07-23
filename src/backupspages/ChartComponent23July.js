

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

const ChartComponent = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { bills } = useSelector((state) => state.bills);
  const user = useSelector(state => state.auth.user);
  
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const currentYear = currentDate.getFullYear();
  const currentMonthYear = `${currentMonth}-${currentYear}`;
  
  const prevDate = new Date();
  prevDate.setMonth(currentDate.getMonth() - 1);
  const previousMonth = prevDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const previousMonthYear = `${previousMonth}-${currentYear}`;

  const latestBills = bills.filter(bill =>
    bill.monthAndYear === currentMonthYear &&
    (user?.role !== 'Junior Engineer' || bill.ward === user?.ward || (user?.ward === 'Head Office' && user?.role === 'Junior Engineer'))
  );

  const previousBills = bills.filter(bill =>
    bill.monthAndYear === previousMonthYear &&
    (user?.role !== 'Junior Engineer' || bill.ward === user?.ward || (user?.ward === 'Head Office' && user?.role === 'Junior Engineer'))
  );


  const getAllUniqueStatuses = (bills) => {
    const statusSet = new Set();
    bills.forEach(bill => {
      if (bill.meterStatus) {
        let normalizedStatus = bill.meterStatus.toString().trim().toUpperCase();
        
        
        const statusMapping = {
          'R N A': 'R_N_A',
          'RNA': 'R_N_A',
          'METER CHNG': 'METER_CHNG',
          'METER CHANGE': 'METER_CHNG',
          'METERCHNG': 'METER_CHNG',
          'NO METER': 'NO_METER',
          'NOMETER': 'NO_METER',
          'INACC RNT': 'INACC_RNT',
          'INACCRENT': 'INACC_RNT',
          'INACC RENT': 'INACC_RNT'
        };
        
        const mappedStatus = statusMapping[normalizedStatus] || normalizedStatus.replace(/\s+/g, '_');
        statusSet.add(mappedStatus);
      }
    });
    return Array.from(statusSet).sort();
  };

  
  const allBills = [...latestBills, ...previousBills];
  const meterStatuses = getAllUniqueStatuses(allBills);

  
  const getStatusCounts = (bills) => {
    
    const counts = meterStatuses.reduce((acc, status) => ({ ...acc, [status]: 0 }), {});
    
    bills.forEach(bill => {
      if (bill.meterStatus) {
      
        let normalizedStatus = bill.meterStatus.toString().trim().toUpperCase();
        
      
        const statusMapping = {
          'R N A': 'R_N_A',
          'RNA': 'R_N_A',
          'METER CHNG': 'METER_CHNG',
          'METER CHANGE': 'METER_CHNG',
          'METERCHNG': 'METER_CHNG',
          'NO METER': 'NO_METER',
          'NOMETER': 'NO_METER',
          'INACC RNT': 'INACC_RNT',
          'INACCRENT': 'INACC_RNT',
          'INACC RENT': 'INACC_RNT'
        };

     
        const mappedStatus = statusMapping[normalizedStatus] || normalizedStatus.replace(/\s+/g, '_');
        
        if (counts[mappedStatus] !== undefined) {
          counts[mappedStatus]++;
        }
      }
    });
    
    return counts;
  };

  const currentMonthCounts = getStatusCounts(latestBills);
  const previousMonthCounts = getStatusCounts(previousBills);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: meterStatuses.map(status => {
         
            return status.replace(/_/g, ' ');
          }),
          datasets: [
            {
              label: `Current Month (${currentMonthYear})`,
              data: meterStatuses.map(status => currentMonthCounts[status] || 0),
              backgroundColor: 'rgba(28, 204, 241, 0.8)',
              borderColor: '#1CCCF1',
              borderWidth: 2,
              borderRadius: 4,
              borderSkipped: false,
            },
            {
              label: `Previous Month (${previousMonthYear})`,
              data: meterStatuses.map(status => previousMonthCounts[status] || 0),
              backgroundColor: 'rgba(255, 174, 72, 0.8)',
              borderColor: '#FFAE48',
              borderWidth: 2,
              borderRadius: 4,
              borderSkipped: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            title: {
              display: true,
              text: `Meter Status Comparison: ${previousMonth} vs ${currentMonth} ${currentYear}`,
              font: {
                size: 16,
                weight: 'bold'
              },
              color: '#333',
              padding: 20
            },
            legend: {
              display: true,
              position: 'top',
              labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                  size: 12,
                  weight: '500'
                }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#fff',
              bodyColor: '#fff',
              borderColor: '#ddd',
              borderWidth: 1,
              cornerRadius: 8,
              displayColors: true,
              callbacks: {
                title: function(context) {
                  return `Meter Status: ${context[0].label}`;
                },
                label: function(context) {
                  return `${context.dataset.label}: ${context.parsed.y} meters`;
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: '#666',
                font: {
                  size: 11,
                  weight: '500'
                },
                maxRotation: 45,
                minRotation: 45
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
                lineWidth: 1
              },
              ticks: {
                color: '#666',
                font: {
                  size: 11
                },
                stepSize: 1,
                callback: function(value) {
                  return Number.isInteger(value) ? value : '';
                }
              },
              title: {
                display: true,
                text: 'Number of Meters',
                color: '#666',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            }
          },
          elements: {
            bar: {
              borderWidth: 2,
            }
          },
          layout: {
            padding: {
              top: 10,
              bottom: 10,
              left: 10,
              right: 10
            }
          }
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [bills, currentMonthYear, previousMonthYear]);

  return (
    <Box sx={{ 
      width: '100%', 
      height: '400px',
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      padding: '16px',
      border: '1px solid #e0e0e0'
    }}>
      <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
    </Box>
  );
};

export default ChartComponent;
