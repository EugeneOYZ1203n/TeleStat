
export const getMessageDate = (message: any) => {
    return new Date(message.date_unixtime * 1000);
};
