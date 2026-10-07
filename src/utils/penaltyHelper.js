// NEW (7-Oct-2026): Paid Bills Penalty niyam — Home cha "Paid Bills Penalty" card ani Penalty page sathi ekach
//   paidAmount == netBillAmountWithDPC (DPC sobat bharla) → penalty = netBillAmountWithDPC - netBillAmount
export const getPaidPenalty = (b) => {
  const net = Number(b.netBillAmount);
  const withDpc = Number(b.netBillAmountWithDPC);
  const paid = Number(b.paidAmount);
  if (isNaN(net) || isNaN(withDpc) || isNaN(paid)) return 0;
  const paidWithDpc = Math.abs(paid - withDpc) < 0.01;
  const penalty = withDpc - net;
  return paidWithDpc && penalty > 0 ? penalty : 0;
};
