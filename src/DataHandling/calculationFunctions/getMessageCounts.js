import { chunkedFunction } from '../ChunkedFunctions';
import { combineDictionary } from '../helper/combineDictionary';
import { getDateString } from '../helper/getDateString';
import { getMessageDate } from '../helper/getMessageDate';

export const getMessageCounts = async (
    data,
    savedData,
    status_update_func
) => {
    

    const messages_from = await chunkedFunction(
        data.messages, 0,
        (a, b) => a + b,
        (messages) => {
            return messages.filter((message) => {
                return message.from_id === `user${data.id}`;
            }).length;
        },
        (progress) => status_update_func(`Number of messages from`, progress)
    );

    const messages_to = await chunkedFunction(
        data.messages, 0,
        (a, b) => a + b,
        (messages) => {
            return messages.filter((message) => {
                return message.from_id !== `user${data.id}`;
            }).length;
        },
        (progress) => status_update_func(`Number of messages to`, progress)
    );

    const messages_total = messages_to + messages_from;

    const messages_daily = await chunkedFunction(
        data.messages, {},
        combineDictionary,
        (messages) => {
            const result = {}
            messages.forEach((message) => {
                const dateString = getDateString(getMessageDate(message))
                result[dateString] = (result[dateString] || 0) + 1
            });
            return result;
        },
        (progress) => status_update_func(`Daily messages`, progress)
    );    

    if (savedData) {
        return [
            messages_from + savedData.messages_from, 
            messages_to + savedData.messages_to, 
            messages_total + savedData.messages_total, 
            combineDictionary(messages_daily, savedData.messages_daily)
        ]
    }

    return [messages_from, messages_to, messages_total, messages_daily];
};
