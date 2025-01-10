
export const containsEmoji = (text: string) => {
    const emojiRegex = /[\p{Emoji_Presentation}\p{Emoji}\uFE0F]/u;
    return emojiRegex.test(text);
};
