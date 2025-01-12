export function formatDateToDDMMYY(date) {
    if (!(date instanceof Date)) {
      throw new Error("Input must be a valid Date object");
    }
  
    const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad with 0 if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year
  
    return `${day}/${month}/${year}`;
  }