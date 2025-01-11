import { calculateStatsOfChat } from './calculateStatsOfChat.js';

export const calculateStats = async (
    data, 
    status_update_func,
    increment_progress_func
) => {
    const individualStats = []
    let index = 0;
    
    for (const chat_data of data) {
        if (index > 1) {
            break
        }
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


