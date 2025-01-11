
export const calculateMedian = (arr) => {
    if (arr.length === 0) return null; // Handle empty array
    const sorted = [...arr].sort((a, b) => a - b); // Sort array in ascending order
    const mid = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
        // If even, return average of two middle values
        return (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
        // If odd, return the middle value
        return sorted[mid];
    }
};
