// NEW (7-Oct-2026): chart sathi mahine — "SEP-2026" key + "Sep 26" label
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

// juna → navin kramane, shevti chalu mahina
export const lastNMonths = (n, from = new Date()) => {
  const out = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(from.getFullYear(), from.getMonth() - i, 1);
    const m = MONTHS[d.getMonth()];
    out.push({
      key: `${m}-${d.getFullYear()}`,
      label: `${m.charAt(0)}${m.slice(1).toLowerCase()} ${String(d.getFullYear()).slice(2)}`,
    });
  }
  return out;
};
