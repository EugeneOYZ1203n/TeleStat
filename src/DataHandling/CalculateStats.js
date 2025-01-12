import { calculateStatsOfChat } from './calculateStatsOfChat.js';
import { combineDictionary } from './helper/combineDictionary.js';
import { estimateOverallMedian } from './helper/estimateOverallMedian.js';
import { getDifferenceInDays } from './helper/getDifferenceInDays.js';

export const calculateStats = async (
    data, 
    status_update_func,
    increment_progress_func
) => {
    const individualStats = []
    let index = 0;
    
    for (const chat_data of data) {
        if (index > 0) {
            break
        }
        const val = await calculateStatsOfChat(
            chat_data, status_update_func, 
            () => increment_progress_func(`Calculating stats for ${chat_data.name} (${chat_data.messages.length} messages)`, index)
        )
        if (val) { individualStats.push(val); }
        index += 1;
    }

    const messages_sent = individualStats.reduce((acc,el) => acc + el.messages_to, 0)
    const messages_received = individualStats.reduce((acc,el) => acc + el.messages_from, 0)
    const wordCount_sent = individualStats.reduce((acc,el) => acc + el.wordCount_to, 0)
    const wordCount_received = individualStats.reduce((acc,el) => acc + el.wordCount_from, 0)
    const avgWordCountPerMessageSent = wordCount_sent/messages_sent
    const firstDateMessaged = individualStats.reduce((acc,el) => acc < el.firstDateMessaged 
        ? acc : el.firstDateMessaged, individualStats[0].firstDateMessaged)
    const lastDateMessaged = individualStats.reduce((acc,el) => acc > el.lastDateMessaged 
        ? acc : el.lastDateMessaged, individualStats[0].lastDateMessaged)
    const daysBetweenFirstAndLastMessage = getDifferenceInDays(firstDateMessaged, lastDateMessaged)
    const avgDailyMessages = (messages_sent + messages_received) / daysBetweenFirstAndLastMessage
    const emoji_percent = individualStats.reduce((acc,el) => acc + el.emoji_messages_to, 0)
                            / messages_sent
    const punctuated_percent = individualStats.reduce((acc,el) => acc + el.punctuated_messages_to, 0)
                            / messages_sent
    const avg_message_sentiments = individualStats.reduce((acc,el) => acc + el.total_message_sentiments_to, 0)
                            / messages_sent
    const hours_active = individualStats.map((el)=>el.hours_active).reduce(combineDictionary, {})
    const daysOfWeek_active = individualStats.map((el)=>el.daysOfWeek_active).reduce(combineDictionary, {})
    const month_active = individualStats.map((el)=>el.month_active).reduce(combineDictionary, {})
    const avgResponseTime = individualStats.reduce((acc,el) => acc + el.avgResponseTime_to * el.responseCount_to, 0)
                            / individualStats.reduce((acc,el) => acc + el.responseCount_to, 0)
    const medianResponseTime = estimateOverallMedian(
        individualStats.map((el) => el.medianResponseTime_to),
        individualStats.map((el) => el.responseCount_to)
    )

    return {
        overall: {
            messages_sent, messages_received,
            wordCount_sent, wordCount_received, 
            avgWordCountPerMessageSent,
            firstDateMessaged, lastDateMessaged, daysBetweenFirstAndLastMessage, avgDailyMessages,
            emoji_percent, punctuated_percent, avg_message_sentiments, 
            hours_active, daysOfWeek_active, month_active,
            avgResponseTime, medianResponseTime
        },
        chats: individualStats
    }
}


