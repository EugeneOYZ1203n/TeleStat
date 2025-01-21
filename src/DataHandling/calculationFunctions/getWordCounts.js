import { chunkedFunction } from '../ChunkedFunctions';
import { combineDictionary } from '../helper/combineDictionary';
import { getMessageText } from '../helper/GetMessageText';

export const getWordCounts = async (
    data,
    status_update_func
) => {
    const wordCount_from = await chunkedFunction(
        data.messages, 0,
        (a,b) => a + b,
        (messages) => {
            return messages
                        .filter((message) => {
                            return message.from_id === `user${data.id}`
                        })
                        .reduce((acc,el) => {
                            return acc + getMessageText(el).split(' ').length
                        }, 0)
        },
        (progress) => status_update_func(`Word count from`, progress)
    )

    const wordCount_to = await chunkedFunction(
        data.messages, 0,
        (a,b) => a + b,
        (messages) => {
            return messages
                        .filter((message) => {
                            return message.from_id !== `user${data.id}`
                        })
                        .reduce((acc,el) => {
                            return acc + getMessageText(el).split(' ').length
                        }, 0)
        },
        (progress) => status_update_func(`Word count to`, progress)
    )

    const wordCount_total = wordCount_from + wordCount_to

    const wordCount_histogram = await chunkedFunction(
        data.messages, {},
        combineDictionary,
        (messages) => {
            const result = {}
            messages.forEach((message) => {
                let key = getMessageText(message).split(' ').length
                if (key > 100) { key = "100+" }
                else if (key > 20) { key = "20+" }
                result[key] = (result[key] || 0) + 1
            });
            return result;
        },
        (progress) => status_update_func(`Word count histogram`, progress)
    )

    return [wordCount_from, wordCount_to, wordCount_total, wordCount_histogram];
};
