import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux';
const PieChartBills = () => {
  const chartRef = useRef(null); 
  const chartInstance = useRef(null); 
 const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const { bills, loading: loadingBills, error: errorBills } = useSelector((state) => state.bills);
  const { meters, loading: loadingMeters, error: errorUsers } = useSelector((state) => state.meters);
    const user = useSelector(state => state.auth.user);


  const uniqueBills = bills
  .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)) 
  .filter((bill, index, self) => {
    return index === self.findIndex(b => b.cn === bill.cn);
  });

// const meterStatusCounts = uniqueBills.reduce((acc, bill) => {
//     if (bill.meterStatus === 'Faulty') {
//         acc.Faulty += 1;
//     } else if (bill.meterStatus === 'Average') {
//         acc.Average += 1;
//     }
//     return acc;
// }, { Faulty: 0, Average: 0 });


const today = new Date(); 

const upcomingOverdueCount = bills.filter(bill => bill.dueAlert === true).length;

const dueAlertrows = bills.filter(bill => {
  const dueDate = new Date(bill.dueDate);
  const twoDaysBeforeDue = new Date(dueDate);
  twoDaysBeforeDue.setDate(dueDate.getDate() - 2);

  const isDueSoon = today >= twoDaysBeforeDue && today <= dueDate;
  const isUnpaid = bill.paymentStatus === 'unpaid';

  if (user?.role === 'Junior Engineer') {
    return isDueSoon && isUnpaid && user?.ward === bill.ward;
  }
  return isDueSoon && isUnpaid;
});

const dueAlertCount = dueAlertrows.length;


const paidBillCount = bills.filter(bill => {
  const ispaid = bill.paymentStatus === 'paid';
  return ispaid
}).length;

const passedDueDateCount = bills.filter(bill => {
  const dueDate = new Date(bill.dueDate);
  const isOverdue = dueDate < today;
  const isUnpaid = bill.paymentStatus === 'unpaid';

  if (user?.role === 'Junior Engineer') {
    return isOverdue && isUnpaid && user?.ward === bill.ward;
  }
  return isOverdue && isUnpaid;
}).length;


  useEffect(() => {
    if (chartRef.current) {
     
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      
      chartInstance.current = new Chart(chartRef.current, {
        type: 'pie', 
        data: {
          labels: ['Paid Bills','Upcoming Due Bills','Overdue Bills', uniqueBills.length], 
          datasets: [
            {
              label: 'Metffffer Status Distribution',
              data: [paidBillCount,dueAlertCount,passedDueDateCount ,10], 
              backgroundColor: [
                '#E74C3C', 
                '#23CCEF', 
                '#FFAE48', 
                '#F3F3F3', 
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
          responsive: true, // Make chart responsive
          maintainAspectRatio: false, // Allow chart to fill parent container
          plugins: {
            legend: {
              position: 'top', // Position of the legend
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}%`; // Display percentage on tooltip
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

export default PieChartBills;
