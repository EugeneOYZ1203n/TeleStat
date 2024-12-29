import tkinter as tk
from tkinter import ttk
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import numpy as np

class SideBySideBarPage(tk.Frame):
    def __init__(self, parent,data, title):
        super().__init__(parent)

        self.categories = data['names']
        self.groups = data['groups']
        self.labels = data['labels']

        self.title = title

        control_frame = ttk.Frame(self)
        control_frame.pack(side=tk.TOP, padx=10, pady=10)

        toggle_button = ttk.Button(control_frame, text="")
        toggle_button.pack(side=tk.LEFT, padx=5)

        self.fig, self.ax = plt.subplots(figsize=(16, 9))
        self.canvas = FigureCanvasTkAgg(self.fig, master=self)  # embedding the figure
        self.canvas.get_tk_widget().pack(side=tk.TOP, fill=tk.BOTH, expand=True)

        # Initial plot
        self.plot_sbs_bar()

    def plot_sbs_bar(self):
        colors = [
            'tomato',
            'orange',
            'khaki'
        ]

        self.ax.clear()
        self.ax.set_title(self.title)

        total_bar_height = 0.9
        bar_height = total_bar_height / len(self.groups)

        index = np.arange(len(self.categories)) 

        for i, group in enumerate(self.groups):
            bars = self.ax.barh(index + i * bar_height, group, 
                                height=bar_height, label=self.labels[i], 
                                color=colors[i])
            
            for bar, val in zip(bars, group):
                self.ax.text(bar.get_x(), bar.get_y()+bar.get_height()/2, f'{val:.1f}', 
                             color = 'black', ha = 'left', va = 'center', font = {'size'   : 8})

        self.ax.set_yticks(index + bar_height / 2)
        self.ax.set_yticklabels(self.categories)
        self.ax.legend()
        self.canvas.draw()