import { getMessageText } from "./GetMessageText";
import Sentiment from 'sentiment';

export const getMessageSentiment = (message: any) => {
    const text = getMessageText(message)
    const sentiment = new Sentiment();
    const result = sentiment.analyze(text);
    const sentimentScore = result.score;
    return sentimentScore
}
    