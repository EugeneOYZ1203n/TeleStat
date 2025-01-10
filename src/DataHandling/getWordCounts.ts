import { chunkedFunction } from './ChunkedFunctions';
import { combineDictionary } from './helper/combineDictionary';
import { getMessageText } from './helper/GetMessageText';

export const getWordCounts = async (
    data: any,
    status_update_func: (arg0: string, arg1: number) => void
) => {
    const wordCount_from : any = await chunkedFunction(
        data.messages, 0,
        (a,b) => a + b,
        (messages) => {
            return messages
                        .filter((message : any) => {
                            return message.from_id === `user${data.id}`
                        })
                        .reduce((acc,el) => {
                            return acc + getMessageText(el).split(' ').length
                        }, 0)
        },
        (progress) => status_update_func(`Word count from`, progress)
    )

    const wordCount_to : any = await chunkedFunction(
        data.messages, 0,
        (a,b) => a + b,
        (messages) => {
            return messages
                        .filter((message : any) => {
                            return message.from_id !== `user${data.id}`
                        })
                        .reduce((acc,el) => {
                            return acc + getMessageText(el).split(' ').length
                        }, 0)
        },
        (progress) => status_update_func(`Word count to`, progress)
    )

    const wordCount_total = wordCount_from + wordCount_to

    const wordCount_histogram : any = await chunkedFunction(
        data.messages, {},
        combineDictionary,
        (messages) => {
            let result : any = {}
            messages.forEach((message: any) => {
                let key = getMessageText(message).split(' ').length
                if (key > 100) { key = "100+" }
                else if (key > 20) { key = "20+" }
                result[key] = (result[key] || 0) + 1
            });
            return result;
        },
        (progress) => status_update_func(`Word count histogram`, progress)
    )

    return [wordCount_from, wordCount_to, wordCount_total, wordCount_histogram];
};
