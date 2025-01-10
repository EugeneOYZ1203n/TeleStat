import { chunkedFunction } from './ChunkedFunctions';
import { getMessageSentiment } from './helper/getMessageSentiment';

export const getMessageSentiments = async (
    data: any,
    status_update_func: (arg0: string, arg1: number) => void
) => {
    const total_message_sentiments_from: any = await chunkedFunction(
        data.messages, 0,
        (a, b) => a + b,
        (messages) => {
            return messages
                    .filter((message: any) => {
                        return message.from_id === `user${data.id}`;
                    })
                    .reduce((acc:any,el) => {
                        return acc + getMessageSentiment(el)
                    }, 0);
        },
        (progress) => status_update_func(`Sentiment from`, progress)
    );

    const total_message_sentiments_to: any = await chunkedFunction(
        data.messages, 0,
        (a, b) => a + b,
        (messages) => {
            return messages
                    .filter((message: any) => {
                        return message.from_id !== `user${data.id}`;
                    })
                    .reduce((acc:any,el) => {
                        return acc + getMessageSentiment(el)
                    }, 0);
        },
        (progress) => status_update_func(`Sentiment to`, progress)
    );

    const total_message_sentiments_total = total_message_sentiments_to + total_message_sentiments_from;

    return [total_message_sentiments_from, total_message_sentiments_to, total_message_sentiments_total];
};
