import { chunkedFunction } from './ChunkedFunctions';
import { combineDictionary } from './helper/combineDictionary';
import { getDateString } from './helper/getDateString';
import { getMessageDate } from './helper/getMessageDate';

export const getMessageCounts = async (
    data: any,
    status_update_func: (arg0: string, arg1: number) => void
) => {
    const messages_from: any = await chunkedFunction(
        data.messages, 0,
        (a, b) => a + b,
        (messages) => {
            return messages.filter((message: any) => {
                return message.from_id === `user${data.id}`;
            }).length;
        },
        (progress) => status_update_func(`Number of messages from`, progress)
    );

    const messages_to: any = await chunkedFunction(
        data.messages, 0,
        (a, b) => a + b,
        (messages) => {
            return messages.filter((message: any) => {
                return message.from_id !== `user${data.id}`;
            }).length;
        },
        (progress) => status_update_func(`Number of messages to`, progress)
    );

    const messages_total = messages_to + messages_from;

    const messages_daily: any = await chunkedFunction(
        data.messages, {},
        combineDictionary,
        (messages) => {
            let result : any = {}
            messages.forEach((message: any) => {
                const dateString = getDateString(getMessageDate(message))
                result[dateString] = (result[dateString] || 0) + 1
            });
            return result;
        },
        (progress) => status_update_func(`Daily messages`, progress)
    );

    return [messages_from, messages_to, messages_total, messages_daily];
};
