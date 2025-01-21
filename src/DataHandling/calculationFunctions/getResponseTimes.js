import { calculateMedian } from '../helper/calculateMedian';
import { chunkedFunction } from '../ChunkedFunctions';
import { combineDictionary } from '../helper/combineDictionary';
import { getDifferenceInSeconds } from '../helper/getDifferenceInDays';
import { getMessageDate } from '../helper/getMessageDate';

export const getResponseTimes = async (
    data,
    status_update_func
) => {
    let prevDate = getMessageDate(data.messages[0])
    let prevID = data.messages[0].from_id

    const responseTime_from = []
    const responseTime_to = []

    await chunkedFunction(
        data.messages, 0,
        (a, b) => a + b,
        (messages) => {
            messages.forEach((message) => {
                if (message.from_id != prevID) {
                    const currDate = getMessageDate(message)
                    const responseTime = getDifferenceInSeconds(prevDate, currDate)
                    const responderID = message.from_id
                    if (responderID === `user${data.id}`){
                        responseTime_from.push(responseTime)
                    } else {
                        responseTime_to.push(responseTime)
                    }
                    prevDate = currDate
                    prevID = responderID
                }
            });
            return 0
        }, 
        (progress) => status_update_func(`Response time calculation`, progress)
    );

    const responseCount_from = responseTime_from.length
    const responseCount_to = responseTime_to.length

    const avgResponseTime_from = responseTime_from
                                    .reduce((acc, num) => acc + num, 0) / responseCount_from
    const avgResponseTime_to = responseTime_to
                                    .reduce((acc, num) => acc + num, 0) / responseCount_to

    const medianResponseTime_from = calculateMedian(responseTime_from)
    const medianResponseTime_to = calculateMedian(responseTime_to)

    const responseTime_from_histogram = await chunkedFunction(
        responseTime_from, {},
        combineDictionary,
        (responseTimes) => {
            const result = {}
            responseTimes.forEach((responseTime) => {
                const key = getResponseTimeCategory(responseTime)
                result[key] = (result[key] || 0) + 1
            });
            return result;
        },
        (progress) => status_update_func(`Response time from histogram`, progress)
    )

    const responseTime_to_histogram = await chunkedFunction(
        responseTime_to, {},
        combineDictionary,
        (responseTimes) => {
            const result = {}
            responseTimes.forEach((responseTime) => {
                const key = getResponseTimeCategory(responseTime)
                result[key] = (result[key] || 0) + 1
            });
            return result;
        },
        (progress) => status_update_func(`Response time to histogram`, progress)
    )

    return [responseCount_from, responseCount_to, avgResponseTime_from, avgResponseTime_to, 
        medianResponseTime_from, medianResponseTime_to, responseTime_from_histogram, responseTime_to_histogram];
};

const getResponseTimeCategory = (responseTime) => {
    let key = Math.round(responseTime)
    if (key > 60*60*6) { key = "6hr+" }
    else if (key > 60*60) { key = "1hr+" }
    else if (key > 30*60) { key = "30m+" }
    else if (key > 60*5) { key = `${Math.trunc(key/60/5)*5}m` }
    else if (key > 60) { key = `${Math.trunc(key/60)}m` }
    else { key = `${Math.trunc(key/5)*5}s` }
    return key
}