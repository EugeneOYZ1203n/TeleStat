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
  
  for (let i = 0; i < labelCount; i++) {
    const baseIndex = i % 3; // Cycle through the 3 base colors
    const color = baseColors[baseIndex]; // Convert base color to HSL

    if (i >= 3) {
      colorShades.push(mutateHexColor(color, 60));
    } else {
      colorShades.push(color); // Keep base colors for the first 3
    }
  }

  return colorShades;
}

function mutateHexColor(hex, mutationRange = 15) {

  // Remove the "#" and convert to RGB
  hex = hex.slice(1);
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // Randomly mutate each color component (R, G, B)
  const mutate = (value) => {
    const randomShift = Math.floor(Math.random() * (mutationRange * 2 + 1)) - mutationRange;
    const mutatedValue = Math.min(255, Math.max(0, value + randomShift)); // Ensure value stays between 0 and 255
    return mutatedValue;
  };

  const mutatedR = mutate(r);
  const mutatedG = mutate(g);
  const mutatedB = mutate(b);

  // Convert mutated RGB back to hex
  const toHex = (value) => value.toString(16).padStart(2, "0");

  const mutatedHex = `#${toHex(mutatedR)}${toHex(mutatedG)}${toHex(mutatedB)}`;

  return mutatedHex;
}