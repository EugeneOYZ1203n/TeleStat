
export const estimateOverallMedian = (medians, sampleSizes) => {
    // First, calculate the total size of all the samples
    const totalSize = sampleSizes.reduce((acc, size) => acc + size, 0);

    // Pair each median with its sample size and sort them based on the medians
    const mediansWithSizes = medians.map((median, index) => ({
        median,
        sampleSize: sampleSizes[index]
    }));

    // Sort based on the median values
    mediansWithSizes.sort((a, b) => a.median - b.median);

    let cumulativeSize = 0;
    const halfSize = totalSize / 2;

    // Find the weighted median
    for (const { median, sampleSize } of mediansWithSizes) {
        cumulativeSize += sampleSize;
        if (cumulativeSize >= halfSize) {
            return median;
        }
    }

    return null; // If no median found, should not happen with valid inputs
};
