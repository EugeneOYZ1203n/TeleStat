// Reusable functions from indiv chats
// 1. getPhonesAndLinks

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
    const output = {
        name: data.name,
        messagesByEach, messages_total, messages_daily
    }
    return output
}