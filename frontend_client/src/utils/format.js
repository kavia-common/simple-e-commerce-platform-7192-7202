 // PUBLIC_INTERFACE
 export function formatCurrency(value, currency = 'USD') {
   /** Format a number into a currency string with given currency code. */
   const num = Number.isFinite(Number(value)) ? Number(value) : 0;
   try {
     return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(num);
   } catch {
     return `${currency} ${num.toFixed(2)}`;
   }
 }
