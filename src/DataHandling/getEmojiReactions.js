import { chunkedFunction } from './ChunkedFunctions';
import { containsEmoji } from './helper/containsEmoji';
import { getMessageText } from './helper/GetMessageText';

export const getEmojiReactions = async (
    data,
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

    return [emoji_messages_from, emoji_messages_to, emoji_messages_total];
};