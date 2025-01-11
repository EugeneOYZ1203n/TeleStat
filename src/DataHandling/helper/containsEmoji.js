
export const containsEmoji = (text) => {
    const emojiRegex = /[\p{Emoji_Presentation}\p{Emoji}\uFE0F]/u;
    return emojiRegex.test(text);
};
