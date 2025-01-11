export const extractPhoneNumbers = (str) => {
    const phoneRegex = /(\+?\d{1,4}[\s.-]?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}/g;
    return str.match(phoneRegex) || [];
}

export const extractEmails = (str) => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    return str.match(emailRegex) || [];
}

export const extractSocialMediaHandles = (str) => {
    const handleRegex = /@[a-zA-Z0-9._]+/g;
    return str.match(handleRegex) || [];
}

export const extractLinks = (str) => {
    const linkRegex = /https?:\/\/[^\s/$.?#].[^\s]*/g;
    return str.match(linkRegex) || [];
}