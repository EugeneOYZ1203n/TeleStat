import { chunkedFunction } from './ChunkedFunctions';
import { getMessageText } from './GetMessageText';

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

    return [wordCount_from, wordCount_to, wordCount_total];
};
