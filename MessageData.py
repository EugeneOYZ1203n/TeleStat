import numpy as np
import pandas as pd
import emoji

class MessageData:
    def __init__(self, message_data, chat_name):
        self.chat_name = chat_name

        self.df = pd.DataFrame(message_data)

        self.valid = True
        if 'from' not in self.df.columns:
            self.valid = False
            return
        
        self.df['Message Text'] = self.df['text_entities'].apply(
            lambda entities: ''.join(entity['text'] for entity in entities if 'text' in entity)
        )
        
        self.df = self.df[self.df['type'] != 'service']

        self.df['date'] = pd.to_datetime(self.df['date'], errors='coerce')

        self.df['Phones'] = self.df['text_entities'].apply(lambda entities: self._extract_entities(entities, 'phone'))
        self.df['Emails'] = self.df['text_entities'].apply(lambda entities: self._extract_entities(entities, 'email'))
        self.df['Links'] = self.df['text_entities'].apply(lambda entities: self._extract_entities(entities, 'link'))

        # Compute additional features for analysis
        self.df['Word Count'] = self.df['Message Text'].apply(lambda x: len(str(x).split()))
        self.df['Contains Emoji'] = self.df['Message Text'].apply(self._contains_emoji)

    @staticmethod
    def _contains_emoji(text):
        return any(char in emoji.EMOJI_DATA for char in text)
    
    @staticmethod
    def _extract_entities(entities, entity_type):
        if isinstance(entities, list):
            return [entity['text'] for entity in entities if entity.get('type') == entity_type]
        return []

    def compute_statistics(self):
        stats = {}

        if not self.valid:
            return None

        # Message counts
        stats['Message Count'] = {
            "To": self.df[self.df['from'] == self.chat_name].shape[0],
            "From": self.df[self.df['from'] != self.chat_name].shape[0],
            'Total': self.df.shape[0]
        }

        if (stats['Message Count']['To'] < 100 or 
            stats['Message Count']['From'] < 100 or 
            stats['Message Count']['Total'] < 500):
            return None

        # Word counts
        stats['Word Count'] = {
            "To": self.df.loc[self.df['from'] == self.chat_name, 'Word Count'].sum(),
            "From": self.df.loc[self.df['from'] != self.chat_name, 'Word Count'].sum(),
            'Total': self.df['Word Count'].sum()
        }

        stats['Average Word Count'] = {
            "To": self.df.loc[self.df['from'] == self.chat_name, 'Word Count'].mean(),
            "From": self.df.loc[self.df['from'] != self.chat_name, 'Word Count'].mean(),
            'Total': self.df['Word Count'].mean()
        }

        self.df = self.df.sort_values(by='date')
        self.df['Response Time'] = self.df['date'].diff().where(
            self.df['from'] != self.df['from'].shift()
        ).dt.total_seconds()

        stats['Avg Response Time (Seconds)'] = {
            "To": self.df.loc[self.df['from'] != self.chat_name, 'Response Time'].mean(),
            "From": self.df.loc[self.df['from'] == self.chat_name, 'Response Time'].mean()
        }

        # Emoji statistics
        stats['Percentage of Messages with Emojis'] = {
            "To": self.df.loc[self.df['from'] == self.chat_name, 'Contains Emoji'].mean() * 100,
            "From": self.df.loc[self.df['from'] != self.chat_name, 'Contains Emoji'].mean() * 100,
        }

        stats['Phones'] = np.concatenate(self.df['Phones'].values)
        stats['Emails'] = np.concatenate(self.df['Emails'].values)
        stats['Links'] = np.concatenate(self.df['Links'].values)

        stats['Hour sent'] = self.df['date'].dt.hour

        return stats

