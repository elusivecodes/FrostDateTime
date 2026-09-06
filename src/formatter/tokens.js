import { valuesRegExp } from './../helpers.js';
import { formatDay, formatMonth, formatNumber, formatOffset } from './format.js';
import { parseDay, parseDayPeriod, parseEra, parseMonth, parseNumber, parseNumberString } from './parse.js';
import { getType } from './utility.js';
import { getDayPeriods, getDays, getEras, getMonths, numberRegExp } from './values.js';

/**
 * DateFormatter Format Data
 */

export default {

    /* ERA */

    G: {
        key: 'era',
        regex: (locale, length) => {
            const type = getType(length);
            return valuesRegExp(getEras(locale, type));
        },
        input: (locale, value, length) => {
            const type = getType(length);
            return parseEra(locale, value, type);
        },
        output: (datetime, length) => {
            const type = getType(length);
            return datetime.era(type);
        },
    },

    /* YEAR */

    // year
    y: {
        key: 'year',
        regex: (locale) => numberRegExp(locale),
        input: (locale, value) => parseNumber(locale, value),
        output: (datetime, length) => {
            const year = datetime.getYear();
            const yearOfEra = year <= 0 ? 1 - year : year;
            return formatNumber(
                datetime.getLocale(),
                length === 2 ? yearOfEra % 100 : yearOfEra,
                length,
            );
        },
    },

    // week year
    Y: {
        key: 'weekYear',
        regex: (locale) => numberRegExp(locale),
        input: (locale, value) => parseNumber(locale, value),
        output: (datetime, length) => {
            let year = datetime.getWeekYear();
            if (length === 2) {
                year = `${year}`.slice(-2);
            }
            return formatNumber(
                datetime.getLocale(),
                Math.abs(year),
                length,
            );
        },
    },

    /* QUARTER */

    // quarter
    Q: {
        key: 'quarter',
        supportsLength: (length) => length !== 3 && length !== 4,
        regex: (locale) => numberRegExp(locale),
        input: (locale, value) => parseNumber(locale, value),
        output: (datetime, length) =>
            formatNumber(
                datetime.getLocale(),
                datetime.getQuarter(),
                length < 3 ? length : 0,
            ),
    },

    // quarter (standalone)
    q: {
        key: 'quarter',
        supportsLength: (length) => length !== 3 && length !== 4,
        regex: (locale) => numberRegExp(locale),
        input: (locale, value) => parseNumber(locale, value),
        output: (datetime, length) =>
            formatNumber(
                datetime.getLocale(),
                datetime.getQuarter(),
                length < 3 ? length : 0,
            ),
    },

    /* MONTH */

    // month
    M: {
        key: 'month',
        supportsLength: (length, parsing) => !parsing || length !== 5,
        regex: (locale, length) => {
            switch (length) {
                case 5:
                case 4:
                case 3: {
                    const type = getType(length);
                    return valuesRegExp(getMonths(locale, type, false));
                }
                default:
                    return numberRegExp(locale);
            }
        },
        input: (locale, value, length) => {
            switch (length) {
                case 4:
                case 3: {
                    const type = getType(length);
                    return parseMonth(locale, value, type, false);
                }
                default:
                    return parseNumber(locale, value);
            }
        },
        output: (datetime, length) => {
            const locale = datetime.getLocale();
            const month = datetime.getMonth();
            switch (length) {
                case 5:
                case 4:
                case 3: {
                    const type = getType(length);
                    return formatMonth(locale, month, type, false);
                }
                default:
                    return formatNumber(locale, month, length);
            }
        },
    },

    // month (standalone)
    L: {
        key: 'month',
        supportsLength: (length, parsing) => !parsing || length !== 5,
        regex: (locale, length) => {
            switch (length) {
                case 5:
                case 4:
                case 3: {
                    const type = getType(length);
                    return valuesRegExp(getMonths(locale, type));
                }
                default:
                    return numberRegExp(locale);
            }
        },
        input: (locale, value, length) => {
            switch (length) {
                case 4:
                case 3: {
                    const type = getType(length);
                    return parseMonth(locale, value, type);
                }
                default:
                    return parseNumber(locale, value);
            }
        },
        output: (datetime, length) => {
            const locale = datetime.getLocale();
            const month = datetime.getMonth();
            switch (length) {
                case 5:
                case 4:
                case 3: {
                    const type = getType(length);
                    return formatMonth(locale, month, type);
                }
                default:
                    return formatNumber(locale, month, length);
            }
        },
    },

    /* WEEK */

    // local week
    w: {
        key: 'week',
        regex: (locale) => numberRegExp(locale),
        input: (locale, value) => parseNumber(locale, value),
        output: (datetime, length) =>
            formatNumber(
                datetime.getLocale(),
                datetime.getWeek(),
                length,
            ),
    },

    // local week of month
    W: {
        key: 'weekOfMonth',
        regex: (locale) => numberRegExp(locale),
        input: (locale, value) => parseNumber(locale, value),
        output: (datetime, length) =>
            formatNumber(
                datetime.getLocale(),
                datetime.getWeekOfMonth(),
                length,
            ),
    },

    /* DAY */

    // day of month
    d: {
        key: 'date',
        regex: (locale) => numberRegExp(locale),
        input: (locale, value) => parseNumber(locale, value),
        output: (datetime, length) =>
            formatNumber(
                datetime.getLocale(),
                datetime.getDate(),
                length,
            ),
    },

    // day of year
    D: {
        key: 'dayOfYear',
        regex: (locale) => numberRegExp(locale),
        input: (locale, value) => parseNumber(locale, value),
        output: (datetime, length) =>
            formatNumber(
                datetime.getLocale(),
                datetime.getDayOfYear(),
                length,
            ),
    },

    // day of week in month
    F: {
        key: 'weekDayInMonth',
        regex: (locale) => numberRegExp(locale),
        input: (locale, value) => parseNumber(locale, value),
        output: (datetime, length) =>
            formatNumber(
                datetime.getLocale(),
                datetime.getWeekDayInMonth(),
                length,
            ),
    },

    // week day name
    E: {
        key: 'weekDay',
        supportsLength: (length, parsing) =>
            length !== 6 && (!parsing || length !== 5),
        regex: (locale, length) => {
            const type = getType(length);
            return valuesRegExp(getDays(locale, type, false));
        },
        input: (locale, value, length) => {
            const type = getType(length);
            return parseDay(locale, value, type, false);
        },
        output: (datetime, length) => {
            const type = getType(length);
            const locale = datetime.getLocale();
            const day = datetime.getDay();
            return formatDay(locale, day, type, false);
        },
    },

    // week day
    e: {
        key: 'weekDay',
        supportsLength: (length, parsing) =>
            length !== 6 && (!parsing || length !== 5),
        regex: (locale, length) => {
            if (length < 3) {
                return numberRegExp(locale);
            }

            const type = getType(length);
            return valuesRegExp(getDays(locale, type, false));
        },
        input: (locale, value, length) => {
            if (length < 3) {
                return parseNumber(locale, value);
            }

            const type = getType(length);
            return parseDay(locale, value, type, false);
        },
        output: (datetime, length) => {
            const locale = datetime.getLocale();
            if (length < 3) {
                return formatNumber(locale, datetime.getWeekDay(), length);
            }

            const type = getType(length);
            return formatDay(locale, datetime.getDay(), type, false);
        },
    },

    // week day (standalone)
    c: {
        key: 'weekDay',
        supportsLength: (length, parsing) =>
            length !== 6 && (!parsing || length !== 5),
        regex: (locale, length) => {
            if (length < 3) {
                return numberRegExp(locale);
            }

            const type = getType(length);
            return valuesRegExp(getDays(locale, type));
        },
        input: (locale, value, length) => {
            if (length < 3) {
                return parseNumber(locale, value);
            }

            const type = getType(length);
            return parseDay(locale, value, type);
        },
        output: (datetime, length) => {
            const locale = datetime.getLocale();
            if (length < 3) {
                return formatNumber(locale, datetime.getWeekDay());
            }

            const type = getType(length);
            return formatDay(locale, datetime.getDay(), type);
        },
    },

    /* PERIOD */

    a: {
        key: 'dayPeriod',
        supportsLength: (length) => length <= 4,
        regex: (locale, length) => {
            const type = getType(length);
            return valuesRegExp(getDayPeriods(locale, type));
        },
        input: (locale, value, length) => {
            const type = getType(length);
            return parseDayPeriod(locale, value, type);
        },
        output: (datetime, length) => {
            const type = getType(length);
            return datetime.dayPeriod(type);
        },
    },

    /* HOUR */

    h: {
        key: 'hours12',
        regex: (locale) => numberRegExp(locale),
        input: (locale, value) => {
            value = parseNumber(locale, value);
            if (value === 12) {
                value = 0;
            }
            return value;
        },
        output: (datetime, length) =>
            formatNumber(
                datetime.getLocale(),
                datetime.getHours() % 12 || 12,
                length,
            ),
    },

    H: {
        key: 'hours24',
        regex: (locale) => numberRegExp(locale),
        input: (locale, value) => parseNumber(locale, value),
        output: (datetime, length) =>
            formatNumber(
                datetime.getLocale(),
                datetime.getHours(),
                length,
            ),
    },

    K: {
        key: 'hours12',
        regex: (locale) => numberRegExp(locale),
        input: (locale, value) => parseNumber(locale, value),
        output: (datetime, length) =>
            formatNumber(
                datetime.getLocale(),
                datetime.getHours() % 12,
                length,
            ),
    },

    k: {
        key: 'hours24',
        regex: (locale) => numberRegExp(locale),
        input: (locale, value) => {
            value = parseNumber(locale, value);
            if (value === 24) {
                value = 0;
            }
            return value;
        },
        output: (datetime, length) =>
            formatNumber(
                datetime.getLocale(),
                datetime.getHours() || 24,
                length,
            ),
    },

    /* MINUTE */

    m: {
        key: 'minutes',
        regex: (locale) => numberRegExp(locale),
        input: (locale, value) => parseNumber(locale, value),
        output: (datetime, length) =>
            formatNumber(
                datetime.getLocale(),
                datetime.getMinutes(),
                length,
            ),
    },

    /* SECOND */

    s: {
        key: 'seconds',
        regex: (locale) => numberRegExp(locale),
        input: (locale, value) => parseNumber(locale, value),
        output: (datetime, length) =>
            formatNumber(
                datetime.getLocale(),
                datetime.getSeconds(),
                length,
            ),
    },

    /* FRACTIONAL */

    S: {
        key: 'milliseconds',
        regex: (locale) => numberRegExp(locale),
        input: (locale, value) =>
            parseInt(
                parseNumberString(locale, value)
                    .padEnd(3, '0')
                    .slice(0, 3),
                10,
            ),
        output: (datetime, length) => {
            const milliseconds = `${datetime.getMilliseconds()}`.padStart(3, '0');
            return formatNumber(
                datetime.getLocale(),
                milliseconds.padEnd(length, '0').slice(0, length),
            );
        },
    },

    /* TIMEZONE/OFFSET */

    z: {
        supportsLength: (_, parsing) => !parsing,
        output: (datetime, length) => {
            const type = getType(Math.min(length, 4));
            return datetime.timeZoneName(type);
        },
    },

    Z: {
        key: 'timeZone',
        regex: (_, length) => {
            if (length === 5) {
                return `[\\+\\-]\\d{2}\\:\\d{2}(?:\\:\\d{2})?|Z`;
            }

            return length >= 4 ?
                `GMT[\\+\\-]\\d{2}\\:\\d{2}|GMT` :
                `[\\+\\-]\\d{4}`;
        },
        input: (_, value) => value,
        output: (datetime, length) => {
            const offset = datetime.getTimeZoneOffset();

            let useColon = true;
            let prefix = '';
            if (length === 5) {
                if (!offset) {
                    return 'Z';
                }
            } else if (length >= 4) {
                prefix = 'GMT';

                if (!offset) {
                    return prefix;
                }
            } else {
                useColon = false;
            }

            return prefix + formatOffset(offset, useColon, false, length === 5);
        },
    },

    O: {
        key: 'timeZone',
        supportsLength: (length) => length === 1 || length === 4,
        regex: (_, length) => {
            switch (length) {
                case 4:
                    return `GMT(?:[+-]\\d{2}:\\d{2}(?::\\d{2})?)?`;
                default:
                    return `GMT(?:[+-]\\d{2}(?::\\d{2}(?::\\d{2})?)?)?`;
            }
        },
        input: (_, value) => value,
        output: (datetime, length) => {
            const offset = datetime.getTimeZoneOffset();
            const prefix = 'GMT';

            if (!offset) {
                return prefix;
            }

            const optionalMinutes = length !== 4;

            return prefix + formatOffset(offset, true, optionalMinutes);
        },
    },

    V: {
        key: 'timeZone',
        supportsLength: (length) => length === 2,
        regex: (_) => '(?:[+-]\\d{2}:\\d{2}(?::\\d{2})?|[A-Za-z0-9_.+\\-/]+)',
        input: (_, value) => value,
        output: (datetime) => datetime.getTimeZone(),
    },

    X: {
        key: 'timeZone',
        supportsLength: (length) => length <= 5,
        regex: (_, length) => {
            switch (length) {
                case 5:
                    return `[\\+\\-]\\d{2}\\:\\d{2}(?:\\:\\d{2})?|Z`;
                case 4:
                    return `[\\+\\-]\\d{4}(?:\\d{2})?|Z`;
                case 3:
                    return `[\\+\\-]\\d{2}\\:\\d{2}|Z`;
                case 2:
                    return `[\\+\\-]\\d{4}|Z`;
                default:
                    return `[\\+\\-]\\d{2}(?:\\d{2})?|Z`;
            }
        },
        input: (_, value) => value,
        output: (datetime, length) => {
            const offset = datetime.getTimeZoneOffset();

            if (!offset) {
                return 'Z';
            }

            const useColon = length === 3 || length === 5;

            return formatOffset(offset, useColon, length === 1, length >= 4);
        },
    },

    x: {
        key: 'timeZone',
        supportsLength: (length) => length <= 5,
        regex: (_, length) => {
            switch (length) {
                case 5:
                    return `[\\+\\-]\\d{2}\\:\\d{2}(?:\\:\\d{2})?`;
                case 4:
                    return `[\\+\\-]\\d{4}(?:\\d{2})?`;
                case 3:
                    return `[\\+\\-]\\d{2}\\:\\d{2}`;
                case 2:
                    return `[\\+\\-]\\d{4}`;
                default:
                    return `[\\+\\-]\\d{2}(?:\\d{2})?`;
            }
        },
        input: (_, value) => value,
        output: (datetime, length) => {
            const useColon = length === 3 || length === 5;

            return formatOffset(datetime.getTimeZoneOffset(), useColon, length === 1, length >= 4);
        },
    },

};
