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
  