export const parseReviver = (data) => {
    console.log(data)

    // data.isTeleStatData = data.isTeleStatData === "true";
    
    // for (const term in [
    //     "messages_sent", "messages_received", "wordCount_sent", "wordCount_received",
    //     "avgWordCountPerMessageSent", "daysBetweenFirstAndLastMessage", "avgDailyMessages",
    //     "emoji_percent", "punctuated_percent", "avg_message_sentiments", "avgResponseTime",
    //     "medianResponseTime"
    // ]) {
    //     data.overall[term] = parseFloat(data.overall[term])
    // }

    for (const term of [
        "firstDateMessaged", "lastDateMessaged"
    ]) {
        data.overall[term] = new Date(data.overall[term])
    }

    // for (const term in [
    //     "hours_active", "daysOfWeek_active", "month_active"
    // ]) {
    //     for (const key in Object.keys(data.overall[term])) {
    //         data.overall[term][key] = parseFloat(data.overall[term][key])
    //     }
    // }

    data.chats.forEach((el, ind) => {
        // for (const term in [
        //     "last_message_id",
        //     "messages_from", "messages_to", "messages_total",
        //     "wordCount_from", "wordCount_to", "wordCount_total",
        //     "avgWordCountPerMessage_from","avgWordCountPerMessage_to","avgWordCountPerMessage_total",
        //     "daysBetweenFirstAndLastMessage", "daysSinceLastMessaged", "avgDailyMessages",
        //     "emoji_messages_from", "emoji_messages_to", "emoji_messages_total",
        //     "emoji_percent_from", "emoji_percent_to", "emoji_percent_total",
        //     "punctuated_messages_from", "punctuated_messages_to", "punctuated_messages_total",
        //     "punctuated_percent_from", "punctuated_percent_to", "punctuated_percent_total",
        //     "total_message_sentiments_from", "total_message_sentiments_to", "total_message_sentiments_total",
        //     "avg_message_sentiments_from", "avg_message_sentiments_to", "avg_message_sentiments_total",
        //     "responseCount_from", "responseCount_to", "avgResponseTime_from", "avgResponseTime_to",
        //     "medianResponseTime_from", "medianResponseTime_to",
        // ]) {
        //     data.chats[ind][term] = parseFloat(data.chats[ind][term])
        // }

        for (const term of [
            "firstDateMessaged", "lastDateMessaged"
        ]) {
            data.chats[ind][term] = new Date(data.chats[ind][term])
        }

        // for (const term in [
        //     "messages_daily", "wordCount_histogram",
        //     "hours_active", "daysOfWeek_active", "month_active",
        //     "responseTime_from_histogram", "responseTime_to_histogram",
        // ]) {
        //     for (const key in Object.keys(data.chats[ind][term])) {
        //         data.chats[ind][term][key] = parseFloat(data.chats[ind][term][key])
        //     }
        // }
    })

    return data
}