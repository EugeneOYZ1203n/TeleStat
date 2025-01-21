import { getActivePeriods } from './calculationFunctions/getActivePeriods';
import { getCommonWords } from './calculationFunctions/getCommonWords';
import { getEmojiReactions } from './calculationFunctions/getEmojiReactions';
import { getIndividualChatBadges } from './calculationFunctions/getIndividualChatBadges';
import { getMessageCounts } from './calculationFunctions/getMessageCounts';
import { getMessageSentiments } from './calculationFunctions/getMessageSentiments';
import { getMilestoneMessages } from './calculationFunctions/getMilestoneMessages';
import { getPhonesAndLinks } from './calculationFunctions/getPhonesAndLinks';
import { getPunctuation } from './calculationFunctions/getPunctuation';
import { getResponseTimes } from './calculationFunctions/getResponseTimes';
import { getWordCounts } from './calculationFunctions/getWordCounts';
import { getDifferenceInDays } from './helper/getDifferenceInDays';
import { getMessageDate } from './helper/getMessageDate';


export const calculateStatsOfChat = async (
    data,
    status_update_func,
    increment_progress_func
) => {
    await setTimeout(increment_progress_func, 100);

    if (data.name === "Telegram") {
        return null;
    }

    const last_message_id = data.messages.slice(-1)[0].id;

    const [messages_from, messages_to, messages_total, messages_daily] = await getMessageCounts(data, status_update_func);

    if (messages_to < 2 || messages_from < 2) { return null; }

    const [wordCount_from, wordCount_to, wordCount_total, wordCount_histogram] = await getWordCounts(data, status_update_func);

    const [avgWordCountPerMessage_from, avgWordCountPerMessage_to, avgWordCountPerMessage_total] = [
        wordCount_from / messages_from, wordCount_to / messages_to, wordCount_total / messages_total
    ];

    const [firstDateMessaged, lastDateMessaged] = [getMessageDate(data.messages[0]), getMessageDate(data.messages[data.messages.length - 1])];
    const daysBetweenFirstAndLastMessage = getDifferenceInDays(firstDateMessaged, lastDateMessaged);
    const daysSinceLastMessaged = getDifferenceInDays(lastDateMessaged, new Date());

    const avgDailyMessages = messages_total / daysBetweenFirstAndLastMessage;

    const [emoji_messages_from, emoji_messages_to, emoji_messages_total] = await getEmojiReactions(data, status_update_func);
    const [emoji_percent_from, emoji_percent_to, emoji_percent_total] = [
        emoji_messages_from / messages_from, emoji_messages_to / messages_to, emoji_messages_total / messages_total
    ];

    const [punctuated_messages_from, punctuated_messages_to, punctuated_messages_total] = await getPunctuation(data, status_update_func);
    const [punctuated_percent_from, punctuated_percent_to, punctuated_percent_total] = [
        punctuated_messages_from / messages_from, punctuated_messages_to / messages_to, punctuated_messages_total / messages_total
    ];

    const [funMilestoneMessages, roundedMilestoneMessages, first20Messages, longestMessage] = await getMilestoneMessages(data, status_update_func);

    const [total_message_sentiments_from, total_message_sentiments_to, total_message_sentiments_total] = await getMessageSentiments(data, status_update_func);
    const [avg_message_sentiments_from, avg_message_sentiments_to, avg_message_sentiments_total] = [
        total_message_sentiments_from / messages_from, total_message_sentiments_to / messages_to, total_message_sentiments_total / messages_total
    ];

    const [hours_active, daysOfWeek_active, month_active] = await getActivePeriods(data, status_update_func);

    const [keywords, common10Abbreviations] = await getCommonWords(data, status_update_func);

    const [phoneNumbers, emails, handles, links] = await getPhonesAndLinks(data, status_update_func);

    const [responseCount_from, responseCount_to, avgResponseTime_from, avgResponseTime_to, medianResponseTime_from, medianResponseTime_to, responseTime_from_histogram, responseTime_to_histogram] = await getResponseTimes(data, status_update_func);

    const [positiveBadges, negativeBadges, neutralBadges] = getIndividualChatBadges(
        messages_total, messages_daily,
        wordCount_from, wordCount_to, 
        firstDateMessaged, daysBetweenFirstAndLastMessage, daysSinceLastMessaged, 
        emoji_percent_total,
        punctuated_percent_total,
        avg_message_sentiments_from, avg_message_sentiments_to, 
        hours_active, daysOfWeek_active, 
        medianResponseTime_from, medianResponseTime_to
    )

    return {
        name: data.name, last_message_id,
        messages_from, messages_to, messages_total, messages_daily,
        wordCount_from, wordCount_to, wordCount_total, wordCount_histogram,
        avgWordCountPerMessage_from, avgWordCountPerMessage_to, avgWordCountPerMessage_total,
        firstDateMessaged, lastDateMessaged, daysBetweenFirstAndLastMessage, daysSinceLastMessaged, avgDailyMessages,
        emoji_messages_from, emoji_messages_to, emoji_messages_total,
        emoji_percent_from, emoji_percent_to, emoji_percent_total,
        punctuated_messages_from, punctuated_messages_to, punctuated_messages_total,
        punctuated_percent_from, punctuated_percent_to, punctuated_percent_total,
        funMilestoneMessages, roundedMilestoneMessages, first20Messages, longestMessage,
        total_message_sentiments_from, total_message_sentiments_to, total_message_sentiments_total,
        avg_message_sentiments_from, avg_message_sentiments_to, avg_message_sentiments_total,
        hours_active, daysOfWeek_active, month_active,
        keywords, common10Abbreviations,
        phoneNumbers, emails, handles, links,
        responseCount_from, responseCount_to, avgResponseTime_from, avgResponseTime_to,
        medianResponseTime_from, medianResponseTime_to, responseTime_from_histogram, responseTime_to_histogram,
        positiveBadges, negativeBadges, neutralBadges
    };
};
