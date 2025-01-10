
export const getDifferenceInDays = (date1: any, date2: any) => {
    const differenceInMillis = date2 - date1;
    const differenceInDays = Math.floor(differenceInMillis / (1000 * 3600 * 24));
    return differenceInDays;
};
