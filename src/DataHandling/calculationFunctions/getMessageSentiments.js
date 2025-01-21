import { chunkedFunction } from '../ChunkedFunctions';
import { getMessageSentiment } from '../helper/getMessageSentiment';

export const getMessageSentiments = async (
    data,
    status_update_func
) => {
    const total_message_sentiments_from = await chunkedFunction(
        data.messages, 0,
        (a, b) => a + b,
        (messages) => {
            return messages
                    .filter((message) => {
                        return message.from_id === `user${data.id}`;
                    })
                    .reduce((acc,el) => {
                        return acc + getMessageSentiment(el)
                    }, 0);
        },
        (progress) => status_update_func(`Sentiment from`, progress)
    );

    const total_message_sentiments_to = await chunkedFunction(
        data.messages, 0,
        (a, b) => a + b,
        (messages) => {
            return messages
                    .filter((message) => {
                        return message.from_id !== `user${data.id}`;
                    })
                    .reduce((acc,el) => {
                        return acc + getMessageSentiment(el)
                    }, 0);
        },
        (progress) => status_update_func(`Sentiment to`, progress)
    );

    const total_message_sentiments_total = total_message_sentiments_to + total_message_sentiments_from;

    return [total_message_sentiments_from, total_message_sentiments_to, total_message_sentiments_total];
};
