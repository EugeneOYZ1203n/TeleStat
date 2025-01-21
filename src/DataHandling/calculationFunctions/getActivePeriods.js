import { chunkedFunction } from '../ChunkedFunctions';
import { combineDictionary } from '../helper/combineDictionary';
import { getDayOfWeekString, getHourString, getMonthString } from '../helper/getDateString';
import { getMessageDate } from '../helper/getMessageDate';

export const getActivePeriods = async (
    data,
    status_update_func
) => {
    const hours_active = await chunkedFunction(
        data.messages, {},
        combineDictionary,
        (messages) => {
            const result = {}
            messages.forEach((message) => {
                const key = getHourString(getMessageDate(message))
                result[key] = (result[key] || 0) + 1
            });
            return result;
        },
        (progress) => status_update_func(`Hours Active`, progress)
    );

    const daysOfWeek_active = await chunkedFunction(
        data.messages, {},
        combineDictionary,
        (messages) => {
            const result = {}
            messages.forEach((message) => {
                const key = getDayOfWeekString(getMessageDate(message))
                result[key] = (result[key] || 0) + 1
            });
            return result;
        },
        (progress) => status_update_func(`Days Of Week Active`, progress)
    );

    const month_active = await chunkedFunction(
        data.messages, {},
        combineDictionary,
        (messages) => {
            const result = {}
            messages.forEach((message) => {
                const key = getMonthString(getMessageDate(message))
                result[key] = (result[key] || 0) + 1
            });
            return result;
        },
        (progress) => status_update_func(`Month Active`, progress)
    );

    return [hours_active, daysOfWeek_active, month_active];
};