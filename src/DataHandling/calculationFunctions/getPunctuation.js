import { chunkedFunction } from '../ChunkedFunctions';
import { containsPunctuation } from '../helper/containsPunctuation';
import { getMessageText } from '../helper/GetMessageText';

export const getPunctuation = async (
    data,
    savedData,
    status_update_func
) => {
    const punctuated_messages_from = await chunkedFunction(
        data.messages, 0,
        (a, b) => a + b,
        (messages) => {
            return messages.filter((message) => {
                return message.from_id === `user${data.id}` && containsPunctuation(getMessageText(message));
            }).length;
        },
        (progress) => status_update_func(`Punctuated messages from`, progress)
    );

    const punctuated_messages_to = await chunkedFunction(
        data.messages, 0,
        (a, b) => a + b,
        (messages) => {
            return messages.filter((message) => {
                return message.from_id !== `user${data.id}` && containsPunctuation(getMessageText(message));
            }).length;
        },
        (progress) => status_update_func(`Punctuated messages to`, progress)
    );

    const punctuated_messages_total = punctuated_messages_to + punctuated_messages_from;

    if (savedData) {
        return [
            punctuated_messages_from + savedData.punctuated_messages_from,
            punctuated_messages_to + savedData.punctuated_messages_to,
            punctuated_messages_total + savedData.punctuated_messages_total
        ]
    }

    return [punctuated_messages_from, punctuated_messages_to, punctuated_messages_total];
};