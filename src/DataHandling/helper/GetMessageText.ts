export const getMessageText = (message: any) => {
    return message.text_entities.reduce((acc: any, el: any) => {
        return acc + el.text ? el.text : "";
    }, "");
};
