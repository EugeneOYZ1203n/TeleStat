import tkinter as tk
from tkinter import ttk
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import numpy as np
from joypy import joyplot

class RidgelinePlotPage(tk.Frame):
    def __init__(self, parent,data, bins, title):
        super().__init__(parent)

        self.data = data
        self.bins = bins

        self.title = title

        control_frame = ttk.Frame(self)
        control_frame.pack(side=tk.TOP, padx=10, pady=10)

        toggle_button = ttk.Button(control_frame, text="")
        toggle_button.pack(side=tk.LEFT, padx=5)

        self.fig, self.ax = plt.subplots(figsize=(16, 9))
        self.canvas = FigureCanvasTkAgg(self.fig, master=self)  # embedding the figure
        self.canvas.get_tk_widget().pack(side=tk.TOP, fill=tk.BOTH, expand=True)

        # Initial plot
        self.plot_ridgeline()

    def remove_outliers(self, input):
        cleaned_data = {}

        for category, data in input.items():
            # Interquartile Range (IQR) Method
            q1 = np.percentile(data, 25)
            q3 = np.percentile(data, 75)
            iqr = q3 - q1
            lower_bound = q1 - 1.5 * iqr
            upper_bound = q3 + 1.5 * iqr
            filtered_data = data[(data >= lower_bound) & (data <= upper_bound)]

            cleaned_data[category] = filtered_data
        
        return cleaned_data

    def plot_ridgeline(self):
        self.ax.clear()

        joyplot(
            self.remove_outliers(self.data),
            ax=self.ax,
            bins=self.bins,
            overlap=0.5,  # Adjust overlap between plots
            fade=True,  # Fade the colors for better distinction
            colormap=plt.cm.viridis,  # Color map for the ridgeline
            title=self.title,
            normalize=True,
            ylim='own'
        )

        self.ax.set_ylim(0, 10) 
        self.canvas.draw()