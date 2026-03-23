/**
 * DateTime Variables
 */

const resolvedOptions = new Intl.DateTimeFormat().resolvedOptions();

export const config = {
    clampDates: true,
    defaultLocale: resolvedOptions.locale,
    defaultTimeZone: resolvedOptions.timeZone,
};

export const dateStringTimeZoneRegExp = /(?:\b(?:UTC|GMT)\b|[T\s]\d{2}:\d{2}(?::\d{2}(?:\.\d{3})?)?(?:Z|[\+\-]\d{2}(?::?\d{2})?)\b)/i;

export const formats = {
    date: 'eee MMM dd yyyy',
    rfc3339_extended: `yyyy-MM-dd'T'HH:mm:ss.SSSxxx`,
    string: 'eee MMM dd yyyy HH:mm:ss xx (VV)',
    time: 'HH:mm:ss xx (VV)',
};

export const formatTokenRegExp = /([a-z])\1*|'[^']*'/i;

export const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const offsetRegExp = /^(?:GMT)?([\+\-])(\d{2})(\:?)(\d{2})?$/;

export const parseOrderKeys = [
    ['year', 'weekYear'],
    ['era'],
    ['quarter', 'month', 'week', 'dayOfYear'],
    ['weekOfMonth'],
    ['date', 'weekDay'],
    ['weekDayInMonth'],
    ['hours24', 'hours12', 'dayPeriod'],
    ['minutes', 'seconds', 'milliseconds'],
];

export const diffMethods = {
    year: 'diffInYears',
    month: 'diffInMonths',
    week: 'diffInWeeks',
    day: 'diffInDays',
    hour: 'diffInHours',
    minute: 'diffInMinutes',
    second: 'diffInSeconds',
};

export const thresholds = {
    month: 12,
    week: null,
    day: 7,
    hour: 24,
    minute: 60,
    second: 60,
};
