export const getDateString = (date : Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-indexed
    const day = date.getDate();

    return `${year}-${month}-${day}`;
}

export const getHourString = (date : Date) => {
    const day = date.getHours(); 

    return `${day}`;
}

export const getDayOfWeekString = (date : Date) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    const dayIndex = date.getDay(); 

    return daysOfWeek[dayIndex];
}

export const getMonthString = (date : Date) => {
    const month = date.getMonth() + 1; // Months are 0-indexed

    return `${month}`;
}