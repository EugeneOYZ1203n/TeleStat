import { chunkedFunction } from './ChunkedFunctions';
import { combineDictionary } from './helper/combineDictionary';
import { getDayOfWeekString, getHourString, getMonthString } from './helper/getDateString';
import { getMessageDate } from './helper/getMessageDate';

export const getActivePeriods = async (
    data: any,
    status_update_func: (arg0: string, arg1: number) => void
) => {
    const hours_active: any = await chunkedFunction(
        data.messages, {},
        combineDictionary,
        (messages) => {
            let result : any = {}
            messages.forEach((message: any) => {
                const key = getHourString(getMessageDate(message))
                result[key] = (result[key] || 0) + 1
            });
            return result;
        },
        (progress) => status_update_func(`Hours Active`, progress)
    );

    const daysOfWeek_active: any = await chunkedFunction(
        data.messages, {},
        combineDictionary,
        (messages) => {
            let result : any = {}
            messages.forEach((message: any) => {
                const key = getDayOfWeekString(getMessageDate(message))
                result[key] = (result[key] || 0) + 1
            });
            return result;
        },
        (progress) => status_update_func(`Days Of Week Active`, progress)
    );

    const month_active: any = await chunkedFunction(
        data.messages, {},
        combineDictionary,
        (messages) => {
            let result : any = {}
            messages.forEach((message: any) => {
                const key = getMonthString(getMessageDate(message))
                result[key] = (result[key] || 0) + 1
            });
            return result;
        },
        (progress) => status_update_func(`Month Active`, progress)
    );

    return [hours_active, daysOfWeek_active, month_active];
};