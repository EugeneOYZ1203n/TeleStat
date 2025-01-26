import { chunkedFunction } from '../ChunkedFunctions';
import { combineDictionary } from '../helper/combineDictionary';
import { getMessageText } from '../helper/GetMessageText';

export const getGroupWordCounts = async (
    data,
    savedData,
    status_update_func
) => {
    const wordCountByEach = await chunkedFunction(
            data.messages, {},
            combineDictionary,
            (messages) => {
                const result = {}
                messages.forEach((message) => {
                    const key = getUserIdentifier(message.from_id, message.from)
                    result[key] = (result[key] || 0) + getMessageText(message).split(' ').length
                })
                return result
            },
            (progress) => status_update_func(`Word count in group`, progress)
    );

    const wordCount_total = Object.values(wordCountByEach).reduce((a, b) => a + b, 0)
    
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

    return [wordCountByEach, wordCount_total, wordCount_histogram];
};
