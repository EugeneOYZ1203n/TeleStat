import { chunkedFunction } from '../ChunkedFunctions';
import { containsEmoji } from '../helper/containsEmoji';
import { getMessageText } from '../helper/GetMessageText';

export const getEmojiReactions = async (
    data,
    savedData,
    status_update_func
) => {
    const emoji_messages_from = await chunkedFunction(
        data.messages, 0,
        (a, b) => a + b,
        (messages) => {
            return messages.filter((message) => {
                return message.from_id === `user${data.id}` && containsEmoji(getMessageText(message));
            }).length;
        },
        (progress) => status_update_func(`Emoji messages from`, progress)
    );

    const emoji_messages_to = await chunkedFunction(
        data.messages, 0,
        (a, b) => a + b,
        (messages) => {
            return messages.filter((message) => {
                return message.from_id !== `user${data.id}` && containsEmoji(getMessageText(message));
            }).length;
        },
        (progress) => status_update_func(`Emoji messages to`, progress)
    );

    const emoji_messages_total = emoji_messages_to + emoji_messages_from;

    if (savedData) {
        return [
            emoji_messages_from + savedData.emoji_messages_from,
            emoji_messages_to + savedData.emoji_messages_to,
            emoji_messages_total + savedData.emoji_messages_total
        ]
    }

    return [emoji_messages_from, emoji_messages_to, emoji_messages_total];
};
