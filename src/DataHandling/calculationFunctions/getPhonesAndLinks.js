import { chunkedFunction } from '../ChunkedFunctions';
import { extractEmails, extractLinks, extractPhoneNumbers, extractSocialMediaHandles } from '../helper/extractPhonesAndLinks';
import { getMessageText } from '../helper/GetMessageText';

export const getPhonesAndLinks = async (
    data,
    status_update_func
) => {
    const phoneNumbers = await chunkedFunction(
        data.messages, [],
        (a, b) => a.concat(b),
        (messages) => {
            return messages
                    .map((message) => {
                        return extractPhoneNumbers(getMessageText(message));})
                    .reduce((acc,el) => acc.concat(el));
        },
        (progress) => status_update_func(`Phone Numbers shared`, progress)
    );

    const emails = await chunkedFunction(
        data.messages, [],
        (a, b) => a.concat(b),
        (messages) => {
            return messages
                    .map((message) => {
                        return extractEmails(getMessageText(message));})
                    .reduce((acc,el) => acc.concat(el));
        },
        (progress) => status_update_func(`Emails shared`, progress)
    );

    const handles = await chunkedFunction(
        data.messages, [],
        (a, b) => a.concat(b),
        (messages) => {
            return messages
                    .map((message) => {
                        return extractSocialMediaHandles(getMessageText(message));})
                    .reduce((acc,el) => acc.concat(el));
        },
        (progress) => status_update_func(`Social Media handles shared`, progress)
    );

    const links = await chunkedFunction(
        data.messages, [],
        (a, b) => a.concat(b),
        (messages) => {
            return messages
                    .map((message) => {
                        return extractLinks(getMessageText(message));})
                    .reduce((acc,el) => acc.concat(el));
        },
        (progress) => status_update_func(`Links shared`, progress)
    );

    return [phoneNumbers, emails, handles, links];
};