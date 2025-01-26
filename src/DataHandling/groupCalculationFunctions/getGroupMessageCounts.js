import { chunkedFunction } from '../ChunkedFunctions';
import { combineDictionary } from '../helper/combineDictionary';
import { getDateString } from '../helper/getDateString';
import { getMessageDate } from '../helper/getMessageDate';
import { getEachAndTotalStats } from './getEachAndTotalStats';
import { getUserIdentifier } from './getUserIdentifier';

export const getGroupMessageCounts = async (
    data,
    savedData,
    status_update_func
) => {
    const [messagesByEach, messages_total] = await getEachAndTotalStats(
        data, 
        savedData,
        (progress) => status_update_func(`Number of messages in group`, progress),
        (message) => getUserIdentifier(message.from_id, message.from),
        (_) => 1
    )

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
    return [messagesByEach, messages_total, messages_daily];
};

