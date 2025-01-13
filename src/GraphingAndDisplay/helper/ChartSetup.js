import {
    Chart as ChartJS,
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Title,
    Legend,
    ArcElement,
  } from 'chart.js';
  
  // Register required components
  ChartJS.register(BarController, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend, Title);
  
  export default ChartJS;