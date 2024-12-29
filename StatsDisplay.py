import tkinter as tk
from tkinter import ttk
from display import StackedBarPage, SideBySideBarPage, RidgelinePlotPage

class MainApp:
    def __init__(self, root, data):
        self.data = data

        self.root = root
        self.root.title("Multi-Page Application")
        self.current_page = None
        self.index = 0

        self.pages = [
            self.show_message_count,
            self.show_word_count_to,
            self.show_word_count_from,
            self.show_daily_avg_message_count,
            self.show_days_since_last_msg,
            self.show_total_word_count,
            self.show_avg_word_count,
            self.show_avg_sentiment,
            self.show_avg_response_time,
            self.show_response_time_to,
            self.show_response_time_from,
            self.show_hours_of_day_active,
            self.show_percent_emoji
        ]
        
        # Frame that will hold the pages
        self.page_frame = ttk.Frame(self.root)
        self.page_frame.pack(fill=tk.BOTH, expand=True)

        # Add navigation buttons
        self.nav_frame = ttk.Frame(self.root)
        self.nav_frame.pack(side=tk.TOP, fill=tk.X)

        self.page2_button = ttk.Button(self.nav_frame, text="Prev", command=self.prev_page)
        self.page2_button.pack(side=tk.LEFT)

        self.page1_button = ttk.Button(self.nav_frame, text="Next", command=self.next_page)
        self.page1_button.pack(side=tk.LEFT)

        # Show the first page initially
        self.show_message_count()
    
    def next_page(self):
        self.index += 1
        self.index %= len(self.pages)
        self.pages[self.index]()
    
    def prev_page(self):
        self.index -= 1
        self.index %= len(self.pages)
        self.pages[self.index]()

    def show_message_count(self):
        data = []
        for name in self.data.keys():
            data.append(
                (name,
                 self.data[name]['Message Count']['To'],
                 self.data[name]['Message Count']['From'],
                 self.data[name]['Message Count']['Total']))
        sorted_data = sorted(data, key=lambda x: x[3])
        names_sorted, to_sorted, from_sorted, total_sorted = zip(*sorted_data)
        bar_data = {
            'names': list(names_sorted),
            'to': list(to_sorted),
            'from': list(from_sorted),
            'total': list(total_sorted)
        }

        self._show_page(StackedBarPage.StackedBarPage, bar_data, "Number of Messages")

    def show_total_word_count(self):
        data = []
        for name in self.data.keys():
            data.append(
                (name,
                 self.data[name]['Total Word Count']['To'],
                 self.data[name]['Total Word Count']['From'],
                 self.data[name]['Total Word Count']['Total']))
        sorted_data = sorted(data, key=lambda x: x[3])
        names_sorted, to_sorted, from_sorted, total_sorted = zip(*sorted_data)
        bar_data = {
            'names': list(names_sorted),
            'to': list(to_sorted),
            'from': list(from_sorted),
            'total': list(total_sorted)
        }
        self._show_page(StackedBarPage.StackedBarPage, bar_data, "Total word count")

    def show_daily_avg_message_count(self):
        data = []
        for name in self.data.keys():
            data.append(
                (name,
                 self.data[name]['Daily Avg Message Count']['To'],
                 self.data[name]['Daily Avg Message Count']['From'],
                 self.data[name]['Daily Avg Message Count']['Total']))
        sorted_data = sorted(data, key=lambda x: x[3])
        names_sorted, to_sorted, from_sorted, total_sorted = zip(*sorted_data)
        bar_data = {
            'names': list(names_sorted),
            'groups': [list(to_sorted),list(from_sorted),list(total_sorted)],
            'labels': ['to', 'from', 'total']
        }
        self._show_page(SideBySideBarPage.SideBySideBarPage, bar_data, "Daily Avg Messages")

    def show_days_since_last_msg(self):
        data = []
        for name in self.data.keys():
            data.append(
                (name,
                 self.data[name]['Days since last message']))
        sorted_data = sorted(data, key=lambda x: x[1])
        names_sorted, data_sorted = zip(*sorted_data)
        bar_data = {
            'names': list(names_sorted),
            'groups': [list(data_sorted)],
            'labels': ['']
        }
        self._show_page(SideBySideBarPage.SideBySideBarPage, bar_data, "Days since last messaged")

    def show_avg_word_count(self):
        data = []
        for name in self.data.keys():
            data.append(
                (name,
                 self.data[name]['Average Word Count']['To'],
                 self.data[name]['Average Word Count']['From'],
                 self.data[name]['Average Word Count']['Total']))
        sorted_data = sorted(data, key=lambda x: x[3])
        names_sorted, to_sorted, from_sorted, total_sorted = zip(*sorted_data)
        bar_data = {
            'names': list(names_sorted),
            'groups': [list(to_sorted),list(from_sorted),list(total_sorted)],
            'labels': ['to', 'from', 'total']
        }
        self._show_page(SideBySideBarPage.SideBySideBarPage, bar_data, "Average Word Count per Message")
    
    def show_avg_sentiment(self):
        data = []
        for name in self.data.keys():
            data.append(
                (name,
                 self.data[name]['Average Sentiment']['To'],
                 self.data[name]['Average Sentiment']['From'],
                 self.data[name]['Average Sentiment']['Total']))
        sorted_data = sorted(data, key=lambda x: x[3])
        names_sorted, to_sorted, from_sorted, total_sorted = zip(*sorted_data)
        bar_data = {
            'names': list(names_sorted),
            'groups': [list(to_sorted),list(from_sorted),list(total_sorted)],
            'labels': ['to', 'from', 'total']
        }
        self._show_page(SideBySideBarPage.SideBySideBarPage, bar_data, "Average Sentiment (Positivity, 100 vs Negativity, -100)")
    
    def show_avg_response_time(self):
        data = []
        for name in self.data.keys():
            data.append(
                (name,
                 self.data[name]['Avg Response Time']['To'],
                 self.data[name]['Avg Response Time']['From']))
        sorted_data = sorted(data, key=lambda x: x[2])
        names_sorted, to_sorted, from_sorted = zip(*sorted_data)
        bar_data = {
            'names': list(names_sorted),
            'groups': [list(to_sorted),list(from_sorted)],
            'labels': ['to', 'from']
        }
        self._show_page(SideBySideBarPage.SideBySideBarPage, bar_data, "Average response time (Seconds)")
    
    def show_percent_emoji(self):
        data = []
        for name in self.data.keys():
            data.append(
                (name,
                 self.data[name]['Percentage of Messages with Emojis']['To'],
                 self.data[name]['Percentage of Messages with Emojis']['From']))
        sorted_data = sorted(data, key=lambda x: x[2])
        names_sorted, to_sorted, from_sorted = zip(*sorted_data)
        bar_data = {
            'names': list(names_sorted),
            'groups': [list(to_sorted),list(from_sorted)],
            'labels': ['to', 'from']
        }
        self._show_page(SideBySideBarPage.SideBySideBarPage, bar_data, "Percentage of Messages with Emojis")

    def show_word_count_to(self):
        data = {}
        for name in self.data.keys():
            data[name] = self.data[name]['Word Count']['To']
        self._show_page(RidgelinePlotPage.RidgelinePlotPage, data,8, "Word Count distributions (To)")

    def show_word_count_from(self):
        data = {}
        for name in self.data.keys():
            data[name] = self.data[name]['Word Count']['From']
        self._show_page(RidgelinePlotPage.RidgelinePlotPage, data,8, "Word Count distributions (From)")

    def show_response_time_to(self):
        data = {}
        for name in self.data.keys():
            data[name] = self.data[name]['Response Time']['To']
            data[name] = data[name][data[name].notna()]
        self._show_page(RidgelinePlotPage.RidgelinePlotPage, data,15, "Response Time distributions (To)")

    def show_response_time_from(self):
        data = {}
        for name in self.data.keys():
            data[name] = self.data[name]['Response Time']['From']
            data[name] = data[name][data[name].notna()]
        self._show_page(RidgelinePlotPage.RidgelinePlotPage, data,15, "Response Time distributions (From)")

    def show_hours_of_day_active(self):
        data = {}
        for name in self.data.keys():
            data[name] = self.data[name]['Hours of Day active']
        self._show_page(RidgelinePlotPage.RidgelinePlotPage, data,24, "Hours of day active")


    def _show_page(self, page_class, *params):
        if self.current_page:
            self.current_page.destroy()

        self.current_page = page_class(self.page_frame, *params)
        self.current_page.pack(fill=tk.BOTH, expand=True)
