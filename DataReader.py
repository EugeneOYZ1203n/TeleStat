import json
import re
from MessageData import MessageData

def read_telegram_json(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
        return data
    except FileNotFoundError:
        print(f"Error: File not found at {file_path}")
        return None
    except json.JSONDecodeError as e:
        print(f"Error: Failed to decode JSON file. {e}")
        return None

def process_chat_data(data):
    if not data or 'chats' not in data or 'list' not in data['chats']:
        print("Error: Invalid JSON format.")
        return

    chats = data['chats']['list']

    consolidated_stats = {}

    for chat in chats:
        if 'name' not in chat:
            continue

        if 'messages' not in chat:
            continue
        
        chat_name = chat['name']

        message_data = MessageData(chat['messages'], chat_name.split()[0])
        stats = message_data.compute_statistics()

        cleaned_name = re.sub(r'[^a-zA-Z0-9]+', ' ', chat_name).strip(' ')

        if stats:
            consolidated_stats[cleaned_name] = stats
    
    return consolidated_stats
