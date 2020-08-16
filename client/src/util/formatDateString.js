import dateFormat from 'dateformat';

export default function formatDateString(dateISO) {
    const date = new Date(dateISO);
    return dateFormat(date, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
};
