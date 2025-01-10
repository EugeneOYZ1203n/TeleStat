import _ from 'lodash'
import { getMessageCounts } from './getMessageCounts';
import { getWordCounts } from './getWordCounts';

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

    const [messages_from, messages_to, messages_total] = await getMessageCounts(data,status_update_func)

    if (messages_to < 100 || messages_from < 100) { return null }

    const [wordCount_from, wordCount_to, wordCount_total] = await getWordCounts(data,status_update_func)

    return {
        name: data.name,
        messages_from, messages_to, messages_total,
        wordCount_from, wordCount_to, wordCount_total
    }
}

