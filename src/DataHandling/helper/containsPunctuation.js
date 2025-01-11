export const containsPunctuation = (str) => {
    const punctuationRegex = /[^\w\s]/; 
    return punctuationRegex.test(str);
}
