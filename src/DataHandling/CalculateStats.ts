import _ from 'lodash'
import { getMessageCounts } from './getMessageCounts';
import { getWordCounts } from './getWordCounts';
import { getMessageDate } from './helper/getMessageDate';
import { getDifferenceInDays } from './helper/getDifferenceInDays';
import { getEmojiReactions } from './getEmojiReactions';
import { getMilestoneMessages } from './getMilestoneMessages';
import { getMessageSentiments } from './getMessageSentiments';
import { getActivePeriods } from './getActivePeriods';
import { getCommonWords } from './getCommonWords';

export const calculateStats = async (
    data : any, 
    status_update_func: (arg0: string, arg1: number) => void,
    increment_progress_func: (arg1: number) => void
) => {
    let individualStats: any[] = []
    let index = 0;
    
    for (const chat_data of data) {
        const val = await calculateStatsOfChat(
            chat_data, status_update_func, () => increment_progress_func(index)
        )
        if (val) { individualStats.push(val); }
        index += 1;
    }

    return {
        chats: individualStats
    }
}

const calculateStatsOfChat = async (
    data : any, 
    status_update_func: (arg0: string, arg1: number) => void,
    increment_progress_func: () => void
) => {
    await setTimeout(increment_progress_func, 100)

    if (data.name === "Telegram") {
        return null
    }

    const [messages_from, messages_to, messages_total, messages_daily] = await getMessageCounts(data,status_update_func)

    if (messages_to < 100 || messages_from < 100) { return null }

    const [wordCount_from, wordCount_to, wordCount_total, wordCount_histogram] = await getWordCounts(data,status_update_func)

    const [avgWordCountPerMessage_from, avgWordCountPerMessage_to, avgWordCountPerMessage_total] = [
        wordCount_from/messages_from, wordCount_to/messages_to, wordCount_total/messages_total
    ]

    const [firstDateMessaged, lastDateMessaged] = [getMessageDate(data.messages[0]), getMessageDate(data.messages[data.messages.length-1])]
    const daysBetweenFirstAndLastMessage = getDifferenceInDays(firstDateMessaged, lastDateMessaged)
    const daysSinceLastMessaged = getDifferenceInDays(lastDateMessaged, new Date())

    const avgDailyMessages = messages_total / daysBetweenFirstAndLastMessage

    const [emoji_messages_from, emoji_messages_to, emoji_messages_total] = await getEmojiReactions(data,status_update_func)
    const [emoji_percent_from, emoji_percent_to, emoji_percent_total] = [
        emoji_messages_from/messages_from, emoji_messages_to/messages_to, emoji_messages_total/messages_total
    ]

    const [funMilestoneMessages, roundedMilestoneMessages, first20Messages, longestMessage] = await getMilestoneMessages(data, status_update_func)

    const [total_message_sentiments_from, total_message_sentiments_to, total_message_sentiments_total] = await getMessageSentiments(data, status_update_func)
    const [avg_message_sentiments_from, avg_message_sentiments_to, avg_message_sentiments_total] = [
        total_message_sentiments_from/messages_from, total_message_sentiments_to/messages_to, total_message_sentiments_total/messages_total
    ]

    const [hours_active, daysOfWeek_active, month_active] = await getActivePeriods(data, status_update_func)

    const [common30Words, common10Abbreviations] = await getCommonWords(data, status_update_func)

    return {
        name: data.name,
        messages_from, messages_to, messages_total, messages_daily,
        wordCount_from, wordCount_to, wordCount_total, wordCount_histogram,
        avgWordCountPerMessage_from, avgWordCountPerMessage_to, avgWordCountPerMessage_total,
        firstDateMessaged, lastDateMessaged, daysBetweenFirstAndLastMessage, daysSinceLastMessaged, avgDailyMessages,
        emoji_messages_from, emoji_messages_to, emoji_messages_total,
        emoji_percent_from, emoji_percent_to, emoji_percent_total,
        funMilestoneMessages, roundedMilestoneMessages, first20Messages, longestMessage,
        total_message_sentiments_from, total_message_sentiments_to, total_message_sentiments_total,
        avg_message_sentiments_from, avg_message_sentiments_to, avg_message_sentiments_total,
        hours_active, daysOfWeek_active, month_active,
        common30Words, common10Abbreviations
    }
}

