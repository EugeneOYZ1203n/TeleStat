export const combineDictionary = (a, b) => {
    const result = {}
    for (const key in a) {
        result[key] = (result[key] || 0) + a[key];
    }
    for (const key in b) {
        result[key] = (result[key] || 0) + b[key];
    }
    return result;
}