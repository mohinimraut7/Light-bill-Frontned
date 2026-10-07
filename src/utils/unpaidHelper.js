// NEW (7-Oct-2026): unpaid bill, pan due date ajun gelee nahi (Overdue card chya ulat: dueDate >= aata)
export const isUnpaidNotDue = (bill, now = new Date()) => {
  if (bill.paymentStatus !== 'unpaid') return false;
  const due = new Date(bill.dueDate);
  return !isNaN(due) && due >= now;
};
