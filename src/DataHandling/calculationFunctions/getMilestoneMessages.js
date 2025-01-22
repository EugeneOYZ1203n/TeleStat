import { get } from 'lodash';
import { chunkedFunction } from '../ChunkedFunctions';
import { combineDictionaryNoDuplicates } from '../helper/combineDictionary';
import { getMessageDate } from '../helper/getMessageDate';
import { getMessageText } from '../helper/GetMessageText';

const funMilestoneNumbers = [69, 111, 123, 420, 666, 777, 888, 1010, 1234, 1337, 9001]
/*
69: Popular in internet culture for its humor.
111: Repeating digits.
123: A fun, sequential number.
420: A meme number often associated with cannabis culture.
666: Often called the "number of the beast" in pop culture.
777: Lucky number associated with jackpots and good fortune.
888: Considered lucky in some cultures, particularly in East Asia.
1010: Binary-themed milestone.
1234: Sequential and satisfying.
1337: "Leet" (elite) speak, often used in gaming or hacking culture.
9001: "It's over 9000!" meme from Dragon Ball Z.
*/

export const getMilestoneMessages = async (
    data,
    savedData,
    status_update_func
) => {
    const shift = savedData ? savedData.messages_total : 0
    const max_index = data.messages.length + shift

    const funMilestoneMessages = funMilestoneNumbers
        .filter(el=>el>=shift)
        .reduce((acc, el) => {
        if (el <= max_index){
            const message = data.messages[el-shift-1]
            acc[`Msg No. ${el}`] = {
                isFrom: message.from_id === `user${data.id}`,
                username: message.from,
                date: getMessageDate(message),
                text: getMessageText(message)
            }
        }
        return acc
    }, {})

    const roundedMilestoneMessages = generateRoundedMilestones(max_index)
        .filter(el=>el>=shift)
        .reduce((acc, el) => {
        if (el <= max_index){
            const message = data.messages[el-shift-1]
            acc[`Msg No. ${el}`] = {
                isFrom: message.from_id === `user${data.id}`,
                username: message.from,
                date: getMessageDate(message),
                text: getMessageText(message)
            }
        }
        return acc
    }, {})

    const first20Messages = Array(20).fill(0).map((_, i) => i)
        .filter(el=>el>=shift)
        .reduce((acc, el) => {
        if (el <= max_index){
            const message = data.messages[el-shift]
            acc[`Msg No. ${el+1}`] = {
                isFrom: message.from_id === `user${data.id}`,
                username: message.from,
                date: getMessageDate(message),
                text: getMessageText(message)
            }
        }
        return acc
    }, {});

    const longestMessage = {"Longest": await chunkedFunction(
        data.messages, {text: ""},
        getLongerOfTwoText,
        (messages) => {
            return messages
                    .map((message) => {
                        return {
                            isFrom: message.from_id === `user${data.id}`,
                            username: message.from,
                            date: getMessageDate(message),
                            text: getMessageText(message)
                        }
                    })
                    .reduce( 
                        getLongerOfTwoText, 
                        {text: ""}
                    );
        },
        (progress) => status_update_func(`Longest message`, progress)
    )};

    if (savedData) {
        return [
            combineDictionaryNoDuplicates(savedData.funMilestoneMessages, funMilestoneMessages),
            combineDictionaryNoDuplicates(savedData.roundedMilestoneMessages, roundedMilestoneMessages),
            combineDictionaryNoDuplicates(savedData.first20Messages, first20Messages),
            {"Longest": getLongerOfTwoText(savedData.longestMessage["Longest"], longestMessage["Longest"])}
        ]
    }

    return [funMilestoneMessages, roundedMilestoneMessages, first20Messages, longestMessage]
};

const generateRoundedMilestones = (max) => {
    const milestones = [10,50,100,500];
    let base = 1000; // Start with 10
  
    while (base <= max) {
        milestones.push(base);
        base += 1000
    }
  
    return milestones;
  }

const getLongerOfTwoText = (a, b) => {
    return a.text.length > b.text.length ? a : b
}