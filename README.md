
# TeleStat

Telestat transforms raw messaging data into visually stunning and insightful charts, allowing you to discover hidden patterns, track engagement, and gain a deeper understanding of your Telegram interactions in a fun and informative way.


## Run Locally

### Cloning the Repo
Clone the project

```bash
  git clone https://github.com/EugeneOYZ1203n/TelegramDataAnalyzer.git
```

Go to the project directory

```bash
  cd my-project
```

### Getting the telegram data
Open Telegram **Desktop**, navigate to Sidebar (3 bars icon) > Settings > Advanced > Export Telegram data

Select under Chat export settings > Personal chats

Unselect every other option

Choose the download path and Machine readable JSON

There should be a folder containing a result.json file at the download path

Move that result.json file into the repo, such that its relative path is data/result.json

### Run the Code

Run the following code in the project directory

```bash
python .\Main.py
```


## Authors

- [@EugeneOYZ1203n](https://github.com/EugeneOYZ1203n)

A TKinter window should pop up and you should be able to view the statistics of your chat history

Everything is run locally on your computer
