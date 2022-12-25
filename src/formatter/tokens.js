import { formatDay, formatMonth, formatNumber, formatOffset } from './format.js';
import { parseDay, parseDayPeriod, parseEra, parseMonth, parseNumber } from './parse.js';
import { getType } from './utility.js';
import { getDayPeriods, getDays, getEras, getMonths, numberRegExp } from './values.js';

/**
 * DateFormatter Format Data
 */

export default {

    /* ERA */

    G: {
        key: 'era',
        maxLength: 5,
        regex: (locale, length) => {
            const type = getType(length);
            return getEras(locale, type).join('|');
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
        input: (locale, value, length) => {
            value = parseNumber(locale, value);

            if (length !== 2 || `${value}`.length !== 2) {
                return value;
            }

            return value > 40 ?
                1900 + value :
                2000 + value;
        },
        output: (datetime, length) => {
            let year = datetime.getYear();
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

    // week year
    Y: {
        key: 'weekYear',
        regex: (locale) => numberRegExp(locale),
        input: (locale, value, length) => {
            value = parseNumber(locale, value);

            if (length !== 2 || `${value}`.length !== 2) {
                return value;
            }

            return value > 40 ?
                1900 + value :
                2000 + value;
        },
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
        regex: (locale) => numberRegExp(locale),
        input: (locale, value) => parseNumber(locale, value),
        output: (datetime, length) =>
            formatNumber(
                datetime.getLocale(),
                datetime.getQuarter(),
                length,
            ),
    },

    // quarter (standalone)
    q: {
        key: 'quarter',
        regex: (locale) => numberRegExp(locale),
        input: (locale, value) => parseNumber(locale, value),
        output: (datetime, length) =>
            formatNumber(
                datetime.getLocale(),
                datetime.getQuarter(),
                length,
            ),
    },

    /* MONTH */

    // month
    M: {
        key: 'month',
        regex: (locale, length) => {
            switch (length) {
                case 5:
                case 4:
                case 3:
                    const type = getType(length);
                    return getMonths(locale, type, false).join('|');
                default:
                    return numberRegExp(locale);
            }
        },
        input: (locale, value, length) => {
            switch (length) {
                case 5:
                    return null;
                case 4:
                case 3:
                    const type = getType(length);
                    return parseMonth(locale, value, type, false);
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
                case 3:
                    const type = getType(length);
                    return formatMonth(locale, month, type, false);
                default:
                    return formatNumber(locale, month, length);
            }
        },
    },

    // month (standalone)
    L: {
        key: 'month',
        regex: (locale, length) => {
            switch (length) {
                case 5:
                case 4:
                case 3:
                    const type = getType(length);
                    return getMonths(locale, type).join('|');
                default:
                    return numberRegExp(locale);
            }
        },
        input: (locale, value, length) => {
            switch (length) {
                case 5:
                    return null;
                case 4:
                case 3:
                    const type = getType(length);
                    return parseMonth(locale, value, type);
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
                case 3:
                    const type = getType(length);
                    return formatMonth(locale, month, type);
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
        output: (datetime) =>
            formatNumber(
                datetime.getLocale(),
                datetime.getWeekOfMonth(),
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
        output: (datetime) =>
            formatNumber(
                datetime.getLocale(),
                datetime.getWeekDayInMonth(),
            ),
    },

    // week day name
    E: {
        key: 'weekDay',
        regex: (locale, length) => {
            const type = getType(length);
            return getDays(locale, type, false).join('|');
        },
        input: (locale, value, length) => {
            if (length === 5) {
                return null;
            }

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
        maxLength: 5,
        regex: (locale, length) => {
            switch (length) {
                case 5:
                case 4:
                case 3:
                    const type = getType(length);
                    return getDays(locale, type, false).join('|');
                default:
                    return numberRegExp(locale);
            }
        },
        input: (locale, value, length) => {
            switch (length) {
                case 5:
                    return null;
                case 4:
                case 3:
                    const type = getType(length);
                    return parseDay(locale, value, type, false);
                default:
                    return parseNumber(locale, value);
            }
        },
        output: (datetime, length) => {
            const locale = datetime.getLocale();
            switch (length) {
                case 5:
                case 4:
                case 3:
                    const type = getType(length);
                    const day = datetime.getDay();
                    return formatDay(locale, day, type, false);
                default:
                    const weekDay = datetime.getWeekDay();
                    return formatNumber(locale, weekDay, length);
            }
        },
    },

    // week day (standalone)
    c: {
        key: 'weekDay',
        maxLength: 5,
        regex: (locale, length) => {
            switch (length) {
                case 5:
                case 4:
                case 3:
                    const type = getType(length);
                    return getDays(locale, type).join('|');
                default:
                    return numberRegExp(locale);
            }
        },
        input: (locale, value, length) => {
            switch (length) {
                case 5:
                    return null;
                case 4:
                case 3:
                    const type = getType(length);
                    return parseDay(locale, value, type);
                default:
                    return parseNumber(locale, value);
            }
        },
        output: (datetime, length) => {
            const locale = datetime.getLocale();
            switch (length) {
                case 5:
                case 4:
                case 3:
                    const type = getType(length);
                    const day = datetime.getDay();
                    return formatDay(locale, day, type);
                default:
                    const weekDay = datetime.getWeekDay();
                    return formatNumber(locale, weekDay);
            }
        },
    },

    /* PERIOD */

    a: {
        key: 'dayPeriod',
        regex: (locale, length) => {
            const type = getType(length);
            return getDayPeriods(locale, type).join('|');
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
        input: (_) => 0,
        output: (datetime, length) =>
            formatNumber(
                datetime.getLocale(),
                `${Math.floor(
                    datetime.getMilliseconds() *
                    1000,
                )}`.padEnd(length, '0').slice(0, length),
            ),
    },

    /* TIMEZONE/OFFSET */

    z: {
        output: (datetime, length) => {
            if (length === 5) {
                length = 1;
            }
            const type = getType(length);
            return datetime.timeZoneName(type);
        },
    },

    Z: {
        key: 'timeZone',
        regex: (_, length) => {
            switch (length) {
                case 5:
                    return `[\\+\\-]\\d{2}\\:\\d{2}|Z`;
                case 4:
                    return `GMT[\\+\\-]\\d{2}\\:\\d{2}|GMT`;
                default:
                    return `[\\+\\-]\\d{4}`;
            }
        },
        input: (_, value) => value,
        output: (datetime, length) => {
            const offset = datetime.getTimeZoneOffset();

            let useColon = true;
            let prefix = '';
            switch (length) {
                case 5:
                    if (!offset) {
                        return 'Z';
                    }
                    break;
                case 4:
                    prefix = 'GMT';

                    if (!offset) {
                        return prefix;
                    }

                    break;
                default:
                    useColon = false;
                    break;
            }

            return prefix + formatOffset(offset, useColon);
        },
    },

    O: {
        key: 'timeZone',
        regex: (_, length) => {
            switch (length) {
                case 4:
                    return `GMT[\\+\\-]\\d{2}\\:\\d{2}|GMT`;
                default:
                    return `GMT[\\+\\-]\\d{2}|GMT`;
            }
        },
        input: (_, value) => value,
        output: (datetime, length) => {
            const offset = datetime.getTimeZoneOffset();
            const prefix = 'GMT';

            if (!offset) {
                return prefix;
            }

            let optionalMinutes = false;
            switch (length) {
                case 4:
                    break;
                default:
                    optionalMinutes = true;
            }

            return prefix + formatOffset(offset, true, optionalMinutes);
        },
    },

    V: {
        key: 'timeZone',
        regex: (_) => '([a-zA-Z_\/]+)',
        input: (_, value) => value,
        output: (datetime) => datetime.getTimeZone(),
    },

    X: {
        key: 'timeZone',
        regex: (_, length) => {
            switch (length) {
                case 5:
                case 3:
                    return `[\\+\\-]\\d{2}\\:\\d{2}|Z`;
                case 4:
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

            let useColon;
            switch (length) {
                case 5:
                case 3:
                    useColon = true;
                    break;
                default:
                    useColon = false;
                    break;
            }

            return formatOffset(offset, useColon, length === 1);
        },
    },

    x: {
        key: 'timeZone',
        regex: (_, length) => {
            switch (length) {
                case 5:
                case 3:
                    return `[\\+\\-]\\d{2}\\:\\d{2}`;
                case 4:
                case 2:
                    return `[\\+\\-]\\d{4}`;
                default:
                    return `[\\+\\-]\\d{2}(?:\\d{2})?`;
            }
        },
        input: (_, value) => value,
        output: (datetime, length) => {
            let useColon;
            switch (length) {
                case 5:
                case 3:
                    useColon = true;
                    break;
                default:
                    useColon = false;
                    break;
            }

            return formatOffset(datetime.getTimeZoneOffset(), useColon, length === 1);
        },
    },

};
