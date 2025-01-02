from DataReader import read_telegram_json

if __name__ == "__main__":
    print("Running")

    # Path to the JSON file
    json_file_path = "data/result.json"

    # Read the JSON file
    data = read_telegram_json(json_file_path)

    chats = data['chats']['list']

    complete_chat_hist = ""

    name = "redacted"

    for chat in chats:
        if 'name' not in chat:
            continue

        chat_name = chat['name']

        if chat_name != name:
            continue

        curr_name = None
        total_text = ""

        for i, message in enumerate(chat['messages']):
            print(f"Reading {i} message")

            if message['type'] == 'service':
                continue

            if curr_name != message['from']:
                if total_text:
                    complete_chat_hist += f'{curr_name}: {total_text}\n\n'
                curr_name = message['from']
                total_text = ""

            full_text = ''.join(
                entity['text'] for entity in 
                message['text_entities'] if 'text' in entity)
            
            total_text += full_text + " "
        
    with open('./data/output.txt', 'w', encoding='utf-8', errors='ignore') as output_file:
        output_file.write(complete_chat_hist)
