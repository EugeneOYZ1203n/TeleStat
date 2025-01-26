import { chunkedFunction } from '../ChunkedFunctions';
import { combineDictionary } from '../helper/combineDictionary';
import { getDateString } from '../helper/getDateString';
import { getMessageDate } from '../helper/getMessageDate';
import { getUserIdentifier } from './getUserIdentifier';

export const getGroupMessageCounts = async (
    data,
    savedData,
    status_update_func
) => {
    
    // can change this to directly update an object instead of combining dict through accumulator
    const messagesByEach = await chunkedFunction(
        data.messages, {},
        combineDictionary,
        (messages) => {
            const result = {}
            messages.forEach((message) => {
                const key = getUserIdentifier(message.from_id, message.from)
                result[key] = (result[key] || 0) + 1
            })
            return result
        },
        (progress) => status_update_func(`Number of messages in group`, progress)
    );

    const messages_total = Object.values(messagesByEach).reduce((a, b) => a + b, 0)

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
    console.log(messagesByEach)
    return [messagesByEach, messages_total, messages_daily];
};

