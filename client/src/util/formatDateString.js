import dateFormat from 'dateformat';

export function formatDateString(dateISO) {
    const date = new Date(dateISO);
    return dateFormat(date, 'mmm d, yyyy h:MM TT');
};
