import tkinter as tk
from tkinter import ttk
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import numpy as np

class StackedBarPage(tk.Frame):
    def __init__(self, parent,data, title):
        super().__init__(parent)

        self.categories = data['names']
        self.group1 = data['to']
        self.group2 = data['from']

        self.title = title
        
        self.alignment = tk.StringVar(value="aligned")

        control_frame = ttk.Frame(self)
        control_frame.pack(side=tk.TOP, padx=10, pady=10)

        toggle_button = ttk.Button(control_frame, text="Switch Alignment", command=self.toggle_alignment)
        toggle_button.pack(side=tk.LEFT, padx=5)

        self.fig, self.ax = plt.subplots(figsize=(8, 6))
        self.canvas = FigureCanvasTkAgg(self.fig, master=self)  # embedding the figure
        self.canvas.get_tk_widget().pack(side=tk.TOP, fill=tk.BOTH, expand=True)

        # Initial plot
        self.plot_stacked_bar(self.alignment.get())

    def toggle_alignment(self):
        """Toggle between left-aligned and diverging stacked bar plots."""
        if self.alignment.get() == "aligned":
            self.alignment.set("diverging")
        else:
            self.alignment.set("aligned")
        self.plot_stacked_bar(self.alignment.get())

    def plot_stacked_bar(self, alignment):
        """Plot stacked bar plots with different alignments."""
        self.ax.clear()
        self.ax.set_title(self.title)

        if alignment == "aligned":
            bars1 = self.ax.barh(self.categories, self.group1, label='To', color='skyblue')
            bars2 = self.ax.barh(self.categories, self.group2, label='From', left=self.group1, color='orange')

            for bar, val in zip(bars1+bars2, self.group1+self.group2):
                self.ax.text(bar.get_x(), bar.get_y()+bar.get_height()/2, val, color = 'black', ha = 'left', va = 'center')

        elif alignment == "diverging":
            group1_left = np.array(self.group1)
            group2_right = np.array(self.group2) 

            bars1 = self.ax.barh(self.categories, -group1_left, label='To', color='skyblue', align='center')
            bars2 = self.ax.barh(self.categories, group2_right, label='From', color='orange', align='center')

            for bar, val in zip(bars1, self.group1):
                self.ax.text(bar.get_x(), bar.get_y()+bar.get_height()/2, val, color = 'black', ha = 'right', va = 'center')

            for bar, val in zip(bars2, self.group2):
                self.ax.text(bar.get_x(), bar.get_y()+bar.get_height()/2, val, color = 'black', ha = 'left', va = 'center')
     
        self.ax.legend()
        self.canvas.draw()