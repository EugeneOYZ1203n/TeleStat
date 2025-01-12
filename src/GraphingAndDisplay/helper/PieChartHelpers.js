import { colors } from "../../config";

export function generatePieChartData(dataObj, label) {
    const labels = Object.keys(dataObj);
    const data = Object.values(dataObj);
  
    // Generate random colors
    const backgroundColors = generatePieChartColors(labels.length)
  
    const borderColors = labels.map((_, index) => {
      return backgroundColors[index].replace('0.5', '1'); // Solid color for borders
    });
  
    return {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    };
  }
  

export function generatePieChartOptions(legends=true, legendPosition='top', tooltips=true) {
    const defaultOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: legendPosition,
          display: legends,
        },
        tooltip: {
          enabled: tooltips,
        },
      },
    };
  
    return defaultOptions;
}

function generatePieChartColors(labelCount) {
    const baseColors = [colors.primary, colors.secondary, colors.bg1]; 
    const colorShades = []; // Array to hold the generated colors
  
    // Convert a hex color to HSL
    function hexToHsl(hex) {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
  
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = (max + min) / 2;
      let s = (max + min) / 2;
      let l = (max + min) / 2;
  
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        if (max === r) {
          h = (g - b) / d + (g < b ? 6 : 0);
        } else if (max === g) {
          h = (b - r) / d + 2;
        } else {
          h = (r - g) / d + 4;
        }
        h /= 6;
      }
  
      return { h: h * 360, s: s * 100, l: l * 100 };
    }
  
    // Convert HSL to Hex
    function hslToHex(h, s, l) {
      s /= 100;
      l /= 100;
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
      const m = l - c / 2;
      let r = 0, g = 0, b = 0;
  
      if (h >= 0 && h < 60) {
        r = c, g = x, b = 0;
      } else if (h >= 60 && h < 120) {
        r = x, g = c, b = 0;
      } else if (h >= 120 && h < 180) {
        r = 0, g = c, b = x;
      } else if (h >= 180 && h < 240) {
        r = 0, g = x, b = c;
      } else if (h >= 240 && h < 300) {
        r = x, g = 0, b = c;
      } else {
        r = c, g = 0, b = x;
      }
  
      r = Math.round((r + m) * 255);
      g = Math.round((g + m) * 255);
      b = Math.round((b + m) * 255);
  
      return `#${(1 << 24) + (r << 16) + (g << 8) + b}
        .toString(16).slice(1)}`;
    }
  
    // Generate random hue shift (±30 degrees)
    function shiftHueRandomly(hsl) {
      const randomShift = Math.floor(Math.random() * 60) - 30; // Random shift between -30 and 30
      let newHue = hsl.h + randomShift;
      if (newHue < 0) newHue += 360;
      if (newHue >= 360) newHue -= 360;
      return hslToHex(newHue, hsl.s, hsl.l); // Return the new color in hex
    }
  
    for (let i = 0; i < labelCount; i++) {
      const baseIndex = i % 3; // Cycle through the 3 base colors
      let hsl = hexToHsl(baseColors[baseIndex]); // Convert base color to HSL
  
      if (i >= 3) {
        // If the index exceeds 3, shift the hue randomly
        colorShades.push(shiftHueRandomly(hsl));
      } else {
        colorShades.push(baseColors[baseIndex]); // Keep base colors for the first 3
      }
    }
  
    return colorShades;
  }