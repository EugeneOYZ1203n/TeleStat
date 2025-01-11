
export const getMessageDate = (message) => {
    return new Date(message.date_unixtime * 1000);
};
