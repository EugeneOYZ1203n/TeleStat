// Reusable functions from indiv chats
// 1. getActivePeriods
// 2. getPhonesAndLinks

import { getGroupMessageCounts } from "./groupCalculationFunctions/getGroupMessageCounts";

export const calculateStatsOfGroupChat = async (
    data,
    savedData, 
    status_update_func,
    increment_progress_func
) => {
    setTimeout(increment_progress_func, 100);
    if (data.name === "Telegram") {
        return null;
    }
    const [messagesByEach, messages_total, messages_daily] = await getGroupMessageCounts(data, savedData, status_update_func)
    if (messages_total < 3) { return null; }

    const [hours_active, daysOfWeek_active, month_active] = await getActivePeriods(data, savedData, status_update_func);
    
    const [phoneNumbers, emails, handles, links] = await getPhonesAndLinks(data, savedData, status_update_func);
    
    const output = {
        name: data.name,
        messagesByEach, messages_total, messages_daily,
        hours_active, daysOfWeek_active, month_active,
        phoneNumbers, emails, handles, links
    }
    return output
}