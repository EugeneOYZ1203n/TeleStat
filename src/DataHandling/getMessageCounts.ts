import { chunkedFunction } from './ChunkedFunctions';

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

    return [messages_from, messages_to, messages_total];
};
