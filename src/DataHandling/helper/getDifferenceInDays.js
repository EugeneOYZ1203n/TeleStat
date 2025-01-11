
export const getDifferenceInDays = (date1, date2) => {
    const differenceInMillis = date2 - date1;
    const differenceInDays = Math.floor(differenceInMillis / (1000 * 3600 * 24));
    return differenceInDays;
};

export const getDifferenceInSeconds = (date1, date2) => {
    const differenceInMillis = date2 - date1;
    const differenceInSeconds = Math.floor(differenceInMillis / 1000);
    return differenceInSeconds;
};