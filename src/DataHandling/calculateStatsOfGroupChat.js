// Reusable functions from indiv chats
// 1. getActivePeriods
// 2. getPhonesAndLinks

import { getGroupMessageCounts } from "./groupCalculationFunctions/getGroupMessageCounts";
import { getActivePeriods } from './calculationFunctions/getActivePeriods';
import { getCommonWords } from './calculationFunctions/getCommonWords';
import { getPhonesAndLinks } from './calculationFunctions/getPhonesAndLinks';
import { getGroupWordCounts } from "./groupCalculationFunctions/getGroupWordCounts";
import { getEachAndTotalStats } from "./groupCalculationFunctions/getEachAndTotalStats";
import { containsEmoji } from "./helper/containsEmoji";
import { getUserIdentifier } from "./groupCalculationFunctions/getUserIdentifier";
import { getMessageText } from "./helper/GetMessageText";
import { containsPunctuation } from "./helper/containsPunctuation";


export const calculateStatsOfGroupChat = async (
    data,
    savedData, 
    status_update_func,
    increment_progress_func
) => {
    setTimeout(increment_progress_func, 100);
    if (data.name === "Telegram") { return null; }
    const [messagesByEach, messages_total, messages_daily] = await getGroupMessageCounts(data, savedData, status_update_func)
    if (messages_total < 3) { return null; }

    const [wordCountByEach, wordCount_total, wordCount_histogram] = await getGroupWordCounts(data, savedData, status_update_func)
    
    const [emojiMessagesByEach, emojiMessages_total] = await getEachAndTotalStats(
        data, savedData, 
        (progress) => status_update_func(`Emoji messages count`, progress),
        (message) => getUserIdentifier(message.from_id, message.from),
        (message) => containsEmoji(getMessageText(message)) ? 1 : 0
    )
    const [punctuatedMessagesByEach, punctuatedMessages_total] = await getEachAndTotalStats(
        data, savedData,
        (progress) => status_update_func(`Punctuated message count`, progress),
        (message) => getUserIdentifier(message.from_id, message.from),
        (message) => containsPunctuation(getMessageText(message)) ? 1 : 0
    )

    const [hours_active, daysOfWeek_active, month_active] = await getActivePeriods(data, savedData, status_update_func);
    
    const [keywords, abbreviation_counts] = await getCommonWords(data, savedData, status_update_func);
    
    const [phoneNumbers, emails, handles, links] = await getPhonesAndLinks(data, savedData, status_update_func);
    const output = {
        name: data.name,
        messagesByEach, messages_total, messages_daily,
        wordCountByEach, wordCount_total, wordCount_histogram,
        emojiMessagesByEach, emojiMessages_total,
        punctuatedMessagesByEach, punctuatedMessages_total,
        hours_active, daysOfWeek_active, month_active,
        keywords, abbreviation_counts,
        phoneNumbers, emails, handles, links
    }
    return output
}