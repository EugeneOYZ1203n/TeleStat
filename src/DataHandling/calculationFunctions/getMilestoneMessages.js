import { chunkedFunction } from './ChunkedFunctions';
import { getMessageDate } from './helper/getMessageDate';
import { getMessageText } from './helper/GetMessageText';

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
    status_update_func
) => {
    const max_index = data.messages.length

    const funMilestoneMessages = funMilestoneNumbers.reduce((acc, el) => {
        if (el <= max_index){
            const message = data.messages[el-1]
            acc[`Msg No. ${el}`] = {
                isFrom: message.from_id === `user${data.id}`,
                username: message.from,
                date: getMessageDate(message),
                text: getMessageText(message)
            }
        }
        return acc
    }, {})

    const roundedMilestoneMessages = generateRoundedMilestones(max_index).reduce((acc, el) => {
        if (el <= max_index){
            const message = data.messages[el-1]
            acc[`Msg No. ${el}`] = {
                isFrom: message.from_id === `user${data.id}`,
                username: message.from,
                date: getMessageDate(message),
                text: getMessageText(message)
            }
        }
        return acc
    }, {})

    const first20Messages = Array(20).fill(0).map((_, i) => i).reduce((acc, el) => {
        if (el <= max_index){
            const message = data.messages[el]
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
        (a, b) => a.text.length > b.text.length ? a : b,
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
                    .reduce((longest, current) => 
                        current.text.length > longest.text.length ? current : longest, 
                        {text: ""}
                    );
        },
        (progress) => status_update_func(`Longest message`, progress)
    )};

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