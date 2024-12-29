import tkinter as tk
from tkinter import ttk
from display import StackedBarPage

class MainApp:
    def __init__(self, root, data):
        self.data = data

        self.root = root
        self.root.title("Multi-Page Application")
        self.current_page = None
        self.index = 0

        self.pages = [
            self.show_message_count,
            self.show_total_word_count
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

    def _show_page(self, page_class, *params):
        if self.current_page:
            self.current_page.destroy()

        self.current_page = page_class(self.page_frame, *params)
        self.current_page.pack(fill=tk.BOTH, expand=True)
