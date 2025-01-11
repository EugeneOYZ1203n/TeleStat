export const getMessageText = (message) => {
    return message.text_entities.reduce((acc, el) => {
        return acc + el.text ? el.text : "";
    }, "");
};
