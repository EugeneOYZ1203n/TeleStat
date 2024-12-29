import numpy as np
import pandas as pd
import emoji
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import spacy
from collections import Counter
from spacy.lang.en.stop_words import STOP_WORDS
import string

class MessageData:
    ANALYZER = SentimentIntensityAnalyzer()
    NLP = spacy.load("en_core_web_sm")

    def __init__(self, message_data, chat_name):
        self.chat_name = chat_name

        self.df = pd.DataFrame(message_data)

        self.valid = True
        if 'from' not in self.df.columns:
            self.valid = False
            return

        self.df['from'] = self.df['from'].str.split().str[0]
        
        self.df['Message Text'] = self.df['text_entities'].apply(
            lambda entities: ''.join(entity['text'] for entity in entities if 'text' in entity)
        )
        
        self.df = self.df[self.df['type'] != 'service']

        self.df['date'] = pd.to_datetime(self.df['date'], errors='coerce')

        self.df['Phones'] = self.df['text_entities'].apply(lambda entities: self._extract_entities(entities, 'phone'))
        self.df['Emails'] = self.df['text_entities'].apply(lambda entities: self._extract_entities(entities, 'email'))
        self.df['Links'] = self.df['text_entities'].apply(lambda entities: self._extract_entities(entities, 'link'))

        self.df['Word Count'] = self.df['Message Text'].apply(lambda x: len(str(x).split()))
        self.df['Contains Emoji'] = self.df['Message Text'].apply(self._contains_emoji)

        self.df['Sentiment'] = self.df['Message Text'].apply(self._calculate_sentiment)

    @staticmethod
    def _contains_emoji(text):
        return any(char in emoji.EMOJI_DATA for char in text)
    
    @staticmethod
    def _calculate_sentiment(text):
        return MessageData.ANALYZER.polarity_scores(text)['compound']
    
    @staticmethod
    def _extract_entities(entities, entity_type):
        if isinstance(entities, list):
            return [entity['text'] for entity in entities if entity.get('type') == entity_type]
        return []

    def compute_statistics(self):
        if not self.valid:
            return None
        
        stats = {}
        
        self.df = self.df.sort_values(by='date')

        # Message Count -------------------------------------------------------------------------------------------------------------------------------------------
        stats['Message Count'] = {
            "To": self.df[self.df['from'] != self.chat_name].shape[0],
            "From": self.df[self.df['from'] == self.chat_name].shape[0],
            'Total': self.df.shape[0]
        }

        earliest_date = self.df['date'].min()
        latest_date = self.df['date'].max()
        total_days = max((latest_date - earliest_date).days, 1)

        if (stats['Message Count']['To'] < 200 or 
            stats['Message Count']['From'] < 200 or 
            stats['Message Count']['Total'] < 500):
            return None

        # Daily Avg Message Count -------------------------------------------------------------------------------------------------------------------------------------------
        stats['Daily Avg Message Count'] = {
            key: value / total_days for key, value in stats['Message Count'].items()
        }

        current_date = pd.to_datetime('now')

        # Days since last message -------------------------------------------------------------------------------------------------------------------------------------------
        stats['Days since last message'] = (current_date - latest_date).days

        # Word Counts -------------------------------------------------------------------------------------------------------------------------------------------
        stats['Total Word Count'] = {
            "To": self.df.loc[self.df['from'] != self.chat_name, 'Word Count'].sum(),
            "From": self.df.loc[self.df['from'] == self.chat_name, 'Word Count'].sum(),
            'Total': self.df['Word Count'].sum()
        }

        stats['Average Word Count'] = {
            "To": self.df.loc[self.df['from'] != self.chat_name, 'Word Count'].mean(),
            "From": self.df.loc[self.df['from'] == self.chat_name, 'Word Count'].mean(),
            'Total': self.df['Word Count'].mean()
        }

        stats['Word Count'] = {
            "To": self.df.loc[self.df['from'] != self.chat_name, 'Word Count'],
            "From": self.df.loc[self.df['from'] == self.chat_name, 'Word Count']
        }

        full_text = " ".join(self.df['Message Text'])[-1000:]
        doc = MessageData.NLP(full_text)

        custom_stop_words = {"maybe", "want", "got", "also", "know", "feel", "even", "would", "could", "should", "like"}

        new_stop_words = STOP_WORDS.union(custom_stop_words)

        words = [
            token.text.lower() for token in doc
            if token.text not in new_stop_words and token.text not in string.punctuation and token.pos_ in ['NOUN', 'VERB', 'ADJ', 'ADV']
        ]

        word_freq = Counter(words)

        top_words = word_freq.most_common(5)

        # Common words -------------------------------------------------------------------------------------------------------------------------------------------
        stats["Recent Common words"] = top_words

        # Sentiment -------------------------------------------------------------------------------------------------------------------------------------------
        stats['Average Sentiment'] = {
            "To": self.df.loc[self.df['from'] != self.chat_name, 'Sentiment'].mean(),
            "From": self.df.loc[self.df['from'] == self.chat_name, 'Sentiment'].mean(),
            'Total': self.df['Sentiment'].mean()
        }

        # Response time -------------------------------------------------------------------------------------------------------------------------------------------
        self.df['Response Time'] = self.df['date'].diff().where(
            self.df['from'] != self.df['from'].shift()
        ).dt.total_seconds()

        stats['Response Time'] = {
            "To": self.df.loc[self.df['from'] == self.chat_name, 'Response Time'],
            "From": self.df.loc[self.df['from'] != self.chat_name, 'Response Time']
        }

        stats['Avg Response Time (Seconds)'] = {
            "To": self.df.loc[self.df['from'] == self.chat_name, 'Response Time'].mean(),
            "From": self.df.loc[self.df['from'] != self.chat_name, 'Response Time'].mean()
        }

        stats['Percentage of Messages with Emojis'] = {
            "To": self.df.loc[self.df['from'] != self.chat_name, 'Contains Emoji'].mean() * 100,
            "From": self.df.loc[self.df['from'] == self.chat_name, 'Contains Emoji'].mean() * 100,
        }

        # Contacts and links -------------------------------------------------------------------------------------------------------------------------------------------
        stats['Phones'] = np.concatenate(self.df['Phones'].values)
        stats['Emails'] = np.concatenate(self.df['Emails'].values)
        stats['Links'] = np.concatenate(self.df['Links'].values)

        # Hours of day active -------------------------------------------------------------------------------------------------------------------------------------------
        stats['Hours of Day active'] = self.df['date'].dt.hour

        return stats

