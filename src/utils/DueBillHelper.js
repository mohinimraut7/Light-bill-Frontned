export const upComingDueBills = (bills, user) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    return bills.filter((bill) => {
      const dueDate = new Date(bill.dueDate);
      dueDate.setHours(0, 0, 0, 0);
  
      const twoDaysBeforeDue = new Date(dueDate);
      twoDaysBeforeDue.setDate(dueDate.getDate() - 5);
  
      const isWithinRange = today >= twoDaysBeforeDue && today <= dueDate;
      const isUnpaid = bill.paymentStatus === 'unpaid';
  
      if (user?.role === 'Junior Engineer' && user?.ward !== 'Head Office' ) {
        return isWithinRange && isUnpaid && user?.ward === bill.ward;
      }
      
      return isWithinRange && isUnpaid;
    });
  };
  

// =======================================================================





// ==================================================================

// export const upComingDueBills = (bills, user) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
    
//     // Get current month and year
//     const currentMonth = today.getMonth(); // 0-11
//     const currentYear = today.getFullYear();
    
//     // Get previous month and year
//     const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
//     const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
//     // Get next month and year
//     const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
//     const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    
//     // Month abbreviations mapping
//     const monthAbbreviations = [
//         'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
//         'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
//     ];
    
//     // Format previous, current and next month-year for comparison (APR-2025 format)
//     const prevMonthFormatted = `${monthAbbreviations[prevMonth]}-${prevMonthYear}`;
//     const currentMonthYear = `${monthAbbreviations[currentMonth]}-${currentYear}`;
//     const nextMonthFormatted = `${monthAbbreviations[nextMonth]}-${nextMonthYear}`;
    
//     // First filter by monthAndYear - only previous, current and next month
//     return bills.filter((bill) => {
//         // Filter by monthAndYear first
//         if (!bill.monthAndYear) return false;
//         if (bill.monthAndYear !== prevMonthFormatted && 
//             bill.monthAndYear !== currentMonthYear && 
//             bill.monthAndYear !== nextMonthFormatted) {
//             return false;
//         }
        
//         // Then apply existing due date logic
//         const dueDate = new Date(bill.dueDate);
//         dueDate.setHours(0, 0, 0, 0);
        
//         const twoDaysBeforeDue = new Date(dueDate);
//         twoDaysBeforeDue.setDate(dueDate.getDate() - 5);
        
//         const isWithinRange = today >= twoDaysBeforeDue && today <= dueDate;
//         const isUnpaid = bill.paymentStatus === 'unpaid';
        
//         if (user?.role === 'Junior Engineer' && user?.ward !== 'Head Office') {
//             return isWithinRange && isUnpaid && user?.ward === bill.ward;
//         }
        
//         return isWithinRange && isUnpaid;
//     });
// };