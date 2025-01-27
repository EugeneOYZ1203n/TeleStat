import { ldaFunc } from "../helper/lda";
import { chunkedFunction } from "../ChunkedFunctions";
import { combineDictionary } from "../helper/combineDictionary";
import { getMessageText } from "../helper/GetMessageText";

const extraStopwords = [
    "just","want","think","damn","need","when","time","first","back","maybe","going","nice",
    "know","good","quite","wait","kinda","right","sure","check","down","start","shall","tell",
    "will", "where", "what", "who", "how", "be", "have", "do", "say", "make", "go", "take", "come",
    "see","get","give","find","ask","work","seem","feel","try","leave","call","become","put",
    "mean","keep","let","begin","show","hear","play","run","move","like","live","believe","hold","bring",
    "write","sit","stand","lose","pay","meet","include","continue","set","learn","change","lead",
    "understand","watch", "follow","stop","create","speak","read","allow","add","spend","grow","open",
    "walk","win","offer","remember","love","consider","appear","buy","wait","serve","die","send",
    "expect","build","stay","fall","cut","reach","kill","remain","suggest","raise","pass","sell","require",
    "report","decide","pull","return","explain","hope","develop","carry","break","receive","agree","support",
    "hit","produce","eat","cover","catch","draw","choose", "talk", "yeah", "shit"
]

const abbreviations = [
    "lol", "brb", "omg", "idk", "tbh", "smh", "btw", "lmao", "rofl", "np", "bff", "yolo", "ttyl", "fyi",
    "gtg", "asl", "omw", "lmfao", "ppl", "cya", "hmu", "wyd", "lmk", "fomo", "swag", "ftw", "aights",
    "g2g", "bffl", "jk", "fyi", "wbu", "tmi", "jk", "xoxo", "smfh", "gtfo","imma","ill","yall",
    "wth", "ig", "dm", "bruh", "bae", "fam", "srsly", "prob", "uhrm", "uh", "hrm", "uhh",
    "mfw", "slay", "srs", "mvp", "hbd", "sus", "fkin", "nope", "wanna", "gotta", "sorta",
    "lit", "clout", "vibe", "simp", "noob", "lit", "yas", "skrrt", "yeet", "sksksk", 
    "fr", "cap", "bet", "ily", "ilysm", "wtf", 
    "omfg", "yo", "gdi", "ok", "k", "okie", "bc", "gg", "ggwp", "imho"
];

export const getCommonWords = async (
    data,
    savedData,
    status_update_func
) => {

    const keywords = await chunkedFunction(
        data.messages, [],
        (a,b) => a.concat(b),
        (messages) => {
            return ldaFunc(
                messages.map((message) => {
                    return cleanText(
                        getMessageText(message)
                    ).join(' ')
                }), 2, 1
            )[0].map((val) => val.term)
        },
        (progress) => status_update_func(`Keywords extraction`, progress),
        100
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

    if (savedData) {
        return [
            savedData.keywords.concat(keywords),
            combineDictionary(abbreviation_counts, savedData.abbreviation_counts)
        ]
    }

    return [keywords, abbreviation_counts];
    // keywords is an array of strings, each representing the main keyword of each set of 100 messages
};

const cleanText = (text) => {
    return text.toLowerCase().split(' ').map(word => {
        return word.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
    }).filter(word => {
        return !abbreviations.includes(word) && word.length > 3;
    }).filter(word => {
        return !extraStopwords.includes(word) && word.length > 3;
    })
}