from DataReader import process_chat_data, read_telegram_json
from StatsDisplay import MainApp
import tkinter as tk

if __name__ == "__main__":
    print("Running")

    # Path to the JSON file
    json_file_path = "data/result.json"

    # Read the JSON file
    telegram_data = read_telegram_json(json_file_path)

    # Process and print the chat data
    data = process_chat_data(telegram_data)

    root = tk.Tk()

    app = MainApp(root, data)
    
    root.mainloop()