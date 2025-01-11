import { chunkedFunction } from "./ChunkedFunctions";
import { combineDictionary } from "./helper/combineDictionary";
import { getMessageText } from "./helper/GetMessageText";
import { removeStopwords } from 'stopword';

const abbreviations = [
    "lol", "brb", "omg", "idk", "tbh", "smh", "btw", "lmao", "rofl", "np", "bff", "yolo", "ttyl", "fyi",
    "gtg", "asl", "omw", "lmfao", "ppl", "cya", "hmu", "wyd", "lmk", "fomo", "swag", "ftw", 
    "g2g", "bffl", "jk", "fyi", "wbu", "tmi", "jk", "xoxo", "smfh", "gtfo",
    "wth", "ig", "dm", "bruh", "bae", "fam", "srsly", 
    "mfw", "slay", "srs", "mvp", "hbd", "sus", 
    "lit", "clout", "vibe", "simp", "noob", "lit", "yas", "skrrt", "yeet", "sksksk", 
    "fr", "cap", "bet", "ily", "ilysm", "wtf", 
    "omfg", "yo", "gdi", "ok", "k", "okie", "bc", "gg", "ggwp", "imho"
];

export const getCommonWords = async (
    data,
    status_update_func
) => {

    const word_counts = await chunkedFunction(
        data.messages, {},
        combineDictionary,
        (messages) => {
            const result = {}
            messages.forEach((message) => {
                cleanText(
                    getMessageText(message)
                ).forEach((word)=>{
                    result[word] = (result[word] || 0) + 1
                })
            });
            return result;
        },
        (progress) => status_update_func(`Common Words`, progress)
    )

    const abbreviation_counts = await chunkedFunction(
        data.messages, {},
        combineDictionary,
        (messages) => {
            const result = {}
            messages.forEach((message) => {
                getMessageText(message)
                    .toLowerCase()
                    .split(' ')
                    .filter((word) => {
                        return abbreviations.includes(word);
                    })
                    .forEach((word)=>{
                    result[word] = (result[word] || 0) + 1
                })
            });
            return result;
        },
        (progress) => status_update_func(`Abbreviations`, progress)
    )

    const common30Words = Array.from(Object.entries(word_counts))
                                    .sort((a, b) => b[1] - a[1])
                                    .slice(0,29) // Sort by frequency
                                    .map((entry) => entry[0]);
    
    const common10Abbreviations = Array.from(Object.entries(abbreviation_counts))
                                    .sort((a, b) => b[1] - a[1])
                                    .slice(0,9) // Sort by frequency
                                    .map((entry) => entry[0]);

    return [common30Words, common10Abbreviations];
};

const cleanText = (text) => {
    return removeStopwords(
        text.toLowerCase().split(' ')
    ).filter(word => {
        return !abbreviations.includes(word) && word.length > 3;
    })
}