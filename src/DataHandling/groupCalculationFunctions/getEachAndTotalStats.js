import { chunkedFunction } from "../ChunkedFunctions"
import { combineDictionary } from "../helper/combineDictionary"

export const getEachAndTotalStats = async (
    data,
    savedData,
    progress_func,
    keyFunc,
    valueFunc, // increments value in dictionary by valueFunc(message)
) => {
    const each_dict = await chunkedFunction(
        data.messages, {},
        combineDictionary,
        (messages) => {
            const result = {}
            messages.forEach((message) => {
                const key = keyFunc(message)
                result[key] = (result[key] || 0) + valueFunc(message)
            })
            return result
        },
        progress_func
    )
    const total = Object.values(each_dict).reduce((a, b) => a + b, 0)
    return [each_dict, total];
}