from DataReader import process_chat_data, read_telegram_json

if __name__ == "__main__":
    # Path to the JSON file
    json_file_path = "data/result.json"

    # Read the JSON file
    telegram_data = read_telegram_json(json_file_path)

    # Process and print the chat data
    print(process_chat_data(telegram_data).keys())