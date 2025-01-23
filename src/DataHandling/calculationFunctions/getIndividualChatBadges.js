import { getDifferenceInDays } from "../helper/getDifferenceInDays"
import * as ss from 'simple-statistics'; //Old library, requires special import

export const getIndividualChatBadges = (
    messages_total, messages_daily,
    wordCount_from, wordCount_to, 
    firstDateMessaged, daysBetweenFirstAndLastMessage, daysSinceLastMessaged, 
    emoji_percent_total,
    punctuated_percent_total,
    avg_message_sentiments_from, avg_message_sentiments_to, 
    hours_active, daysOfWeek_active, 
    medianResponseTime_from, medianResponseTime_to
) => {
    const positiveBadges = []
    const negativeBadges = []
    const neutralBadges = []
    
    // 1. Dominant and Passive (Whether you are dominant in this conversation or not)
    if (wordCount_from < wordCount_to/2) {
        neutralBadges.push(["Dominant", "You talk significantly more than the other party in this conversation"])
    } else if (wordCount_to < wordCount_from/2) {
        neutralBadges.push(["Passive", "You talk significantly less than the other party in this conversation"])
    } else {
        positiveBadges.push(["Balanced", "You talk almost as much as the other party in this conversation"])
    }

    // 2. Connection trend, increasing, decreasing or neither (Considers number of daily messages in past 90 days)
    const messages_daily_array = Object.entries(messages_daily).map((val) => {
        const date = new Date(val[0])
        const frequency = new Date(val[1])
        const index = getDifferenceInDays(firstDateMessaged, date)
        return [index, frequency]
    })

    const linearRegResult = ss.linearRegression(messages_daily_array.slice(-90)) 

    if (linearRegResult.slope > 1) {
        positiveBadges.push(["Increasing Connection", "You have been talking with them more recently"])
    } else if (linearRegResult.slope < -1) {
        negativeBadges.push(["Decreasing Connection", "You have been talking with them less recently"])
    }

    // 3. Emoji and Punctuation Usage
    if (emoji_percent_total > 0.3) {
        neutralBadges.push(["Emoji Users", "A lot of emojis are used in this chat"])
    } 

    if (punctuated_percent_total > 0.3) {
        neutralBadges.push(["Punctuation Users", "A lot of punctuation is used in this chat"])
    } 

    // 4. Responding times
    if (medianResponseTime_from < 60 && medianResponseTime_to < 60) {
        positiveBadges.push(["Rapid response", "Both of you respond quickly"])
    } else if (medianResponseTime_from < 60) {
        negativeBadges.push(["Slow response", "They respond quickly but you do not"])
    } else if (medianResponseTime_to < 60) {
        neutralBadges.push(["Often Waiting", "You respond quickly but they do not"])
    } else {
        neutralBadges.push(["Slow conversations", "Both of you enjoy slow conversations, responding at your own pace"])
    }

    // 5. Sentiment
    if (avg_message_sentiments_from > 0.4 && avg_message_sentiments_to > 0.4) {
        positiveBadges.push(["Positive atmosphere", "Very positive vibes in this chat"])
    } else if (avg_message_sentiments_from < -0.1 && avg_message_sentiments_to < -0.1) {
        negativeBadges.push(["Negative atmosphere", "Gloomy conversations in this chat"])
    } 

    // 6. Days since last message
    if (daysSinceLastMessaged > 7) {
        negativeBadges.push(["Recent silence", `It has been ${daysSinceLastMessaged} since you have talked with them`])
    }

    // 7. History
    if (daysBetweenFirstAndLastMessage > 365) {
        neutralBadges.push(["Long History", `Both of you have been messaging for ${daysBetweenFirstAndLastMessage} days`])
    } else if (daysBetweenFirstAndLastMessage < 10) {
        neutralBadges.push(["Recent Acquiantance", `Both of you have been messaging for ${daysBetweenFirstAndLastMessage} days`])
    }

    // 8. Early Bird and Night Owl
    const lateHoursCount = Array.from({ length: 5 }, (_, index) => index).reduce((acc,el) => acc + hours_active[el], 0)
    const earlyHoursCount = Array.from({ length: 5 }, (_, index) => 5 + index).reduce((acc,el) => acc + hours_active[el], 0)

    if (lateHoursCount > messages_total*0.3) {
        neutralBadges.push(["Night Owl Chat", `${Math.round(lateHoursCount/messages_total * 1000)/10}% of all Messages occur between 0am - 4am`])
    } else if (earlyHoursCount > messages_total*0.3) {
        neutralBadges.push(["Early Bird Chat", `${Math.round(earlyHoursCount/messages_total * 1000)/10}% of all Messages occur between 5am - 10am`])
    }

    // 9. Weekend warrior
    const weekendMessagesCount = daysOfWeek_active["Sunday"] + daysOfWeek_active["Saturday"]
    if (weekendMessagesCount > messages_total*0.3) {
        neutralBadges.push(["Weekend Warriors", `${Math.round(weekendMessagesCount/messages_total * 1000)/10}% of all Messages occur on weekends`])
    }

    return [positiveBadges, negativeBadges, neutralBadges]
}