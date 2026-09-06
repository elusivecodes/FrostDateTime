/** @import DateTime from './date-time.js' */

import { getDateFormatter } from './factory.js';
import { diffMethods, parseOrderKeys, thresholds } from './vars.js';

/**
 * @typedef {{key: string, value: number|string, literal: string, token: string, length: number}} ParsedDateValue
 */

/**
 * DateTime Helpers
 */

/**
 * Applies parsed fields in calendar order and validates their final values.
 * @param {DateTime} datetime The base date.
 * @param {ParsedDateValue[]} values The parsed fields.
 * @returns {DateTime} The parsed date.
 */
function applyDateValues(datetime, values) {
    const methods = parseFactory();
    const testValues = [];

    for (const parseKey of parseOrderKeys) {
        if (parseKey === 'era' && !values.some((data) => data.key === 'year')) {
            continue;
        }

        for (const data of values) {
            const { key, value } = data;

            if (key !== parseKey) {
                continue;
            }

            datetime = methods[key].set(datetime, value);
            testValues.push(data);
        }
    }

    datetime.isValid = testValues.every(({ key, value }) => methods[key].get(datetime) === value);
    return datetime;
}

/**
 * Escapes a string for safe use inside a RegExp source.
 * @param {string} value The string to escape.
 * @returns {string} The escaped string.
 */
function escapeRegExp(value) {
    return value.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
}

/**
 * Gets a stable day number from a DateTime's local calendar fields.
 * @param {DateTime} date The DateTime.
 * @returns {number} The local calendar day number.
 */
function calendarDay(date) {
    const calendarDate = new Date(0);
    calendarDate.setUTCFullYear(date.getYear(), date.getMonth() - 1, date.getDate());

    return calendarDate.getTime() / 86400000;
}

/**
 * Calculates the difference between two dates in a given time unit.
 * @param {DateTime} date The base DateTime.
 * @param {DateTime} other The DateTime to compare to.
 * @param {'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second'} timeUnit The time unit to compare in.
 * @param {boolean} [relative=true] Whether to use relative boundaries when calculating the difference.
 * @returns {number} The difference between the dates in the given time unit.
 */
export function calculateDiff(date, other, timeUnit, relative = true) {
    if (relative || timeUnit === 'year' || timeUnit === 'month') {
        other = other.withTimeZone(date.getTimeZone());
    }

    switch (timeUnit) {
        case 'year':
            return compensateDiff(
                date,
                other.withYear(
                    date.getYear(),
                ),
                date.getYear() - other.getYear(),
                !relative,
                -1,
            );
        case 'month':
            return compensateDiff(
                date,
                other.withYear(
                    date.getYear(),
                    date.getMonth(),
                ),
                (date.getYear() - other.getYear()) * 12 + date.getMonth() - other.getMonth(),
                !relative,
                -1,
            );
        case 'week':
            if (relative) {
                const dateWeek = date.startOfWeek();
                const otherWeek = other.withLocale(date.getLocale()).startOfWeek();

                return (
                    calendarDay(dateWeek) -
                    calendarDay(otherWeek)
                ) / 7;
            }

            return Math.trunc((date - other) / 604800000);
        case 'day':
            if (relative) {
                return calendarDay(date) - calendarDay(other);
            }

            return Math.trunc((date - other) / 86400000);
        case 'hour':
            if (!relative) {
                return Math.trunc((date - other) / 3600000);
            }

            return compensateDiff(
                date,
                other.withYear(
                    date.getYear(),
                    date.getMonth(),
                    date.getDate(),
                ).withHours(
                    date.getHours(),
                ),
                (date - other) / 3600000,
            );
        case 'minute':
            if (!relative) {
                return Math.trunc((date - other) / 60000);
            }

            return compensateDiff(
                date,
                other.withYear(
                    date.getYear(),
                    date.getMonth(),
                    date.getDate(),
                ).withHours(
                    date.getHours(),
                    date.getMinutes(),
                ),
                (date - other) / 60000,
            );
        case 'second':
            if (!relative) {
                return Math.trunc((date - other) / 1000);
            }

            return compensateDiff(
                date,
                other.withYear(
                    date.getYear(),
                    date.getMonth(),
                    date.getDate(),
                ).withHours(
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds(),
                ),
                (date - other) / 1000,
            );
        default:
            throw new Error('Invalid time unit supplied');
    }
};

/**
 * Gets the RegExp for a list of string values.
 * Longer values are matched first to avoid prefix collisions.
 * @param {string[]} values The values to include in the RegExp.
 * @returns {string} The values RegExp.
 */
export function valuesRegExp(values) {
    return values.slice()
        .sort((a, b) => b.length - a.length)
        .map((value) => escapeRegExp(`${value}`))
        .join('|');
};

/**
 * Compensates the difference between two dates.
 * @param {DateTime} date The DateTime.
 * @param {DateTime} other The DateTime to compare to.
 * @param {number} amount The amount to compensate.
 * @param {boolean} [compensate=true] Whether to compensate the amount.
 * @param {number} [compensation=1] The compensation offset.
 * @returns {number} The compensated amount.
 */
function compensateDiff(date, other, amount, compensate = true, compensation = 1) {
    if (amount > 0) {
        amount = Math.floor(amount);

        if (compensate && date < other) {
            amount += compensation;
        }
    } else if (amount < 0) {
        amount = Math.ceil(amount);

        if (compensate && date > other) {
            amount -= compensation;
        }
    }

    return amount;
};

/**
 * Gets the biggest difference between two dates.
 * @param {DateTime} date The DateTime.
 * @param {DateTime} [other] The DateTime to compare to.
 * @returns {[number, string]} The biggest difference (amount and time unit).
 */
export function getBiggestDiff(date, other) {
    let lastResult;
    for (const [timeUnit, diffMethod] of Object.entries(diffMethods)) {
        const relativeDiff = date[diffMethod](other);

        if (lastResult && thresholds[timeUnit] && Math.abs(relativeDiff) >= thresholds[timeUnit]) {
            return lastResult;
        }

        const actualDiff = date[diffMethod](other, { relative: false });

        if (actualDiff) {
            return [relativeDiff, timeUnit];
        }

        if (relativeDiff) {
            lastResult = [relativeDiff, timeUnit];
        } else {
            lastResult = null;
        }
    }

    return lastResult ?
        lastResult :
        [0, 'second'];
};

/**
 * Gets the offset for a DateTime.
 * @param {DateTime} date The DateTime.
 * @returns {number} The offset.
 */
export function getOffset(date) {
    const timeZone = date.getTimeZone();

    if (timeZone === 'UTC') {
        return 0;
    }

    const values = Object.fromEntries(
        getDateFormatter(timeZone)
            .formatToParts(date)
            .filter((part) => part.type !== 'literal')
            .map(({ type, value }) => [type, value]),
    );

    let year = parseInt(values.year, 10);
    if (values.era === 'BC') {
        year = 1 - year;
    }

    const localDate = new Date(0);
    localDate.setUTCFullYear(
        year,
        parseInt(values.month, 10) - 1,
        parseInt(values.day, 10),
    );
    const localTime = localDate.setUTCHours(
        parseInt(values.hour, 10),
        parseInt(values.minute, 10),
        parseInt(values.second, 10),
        parseInt(values.fractionalSecond, 10),
    );

    return (date.getTime() - localTime) / 60000;
};

/**
 * Gets the number of milliseconds since the UNIX epoch (offset to timeZone).
 * @param {DateTime} date The DateTime.
 * @returns {number} The number of milliseconds since the UNIX epoch (offset to timeZone).
 */
export function getOffsetTime(date) {
    return date.getTime() - (date.getTimeZoneOffset() * 60000);
};

/**
 * Compares a literal format string with a date string.
 * @param {string} formatString The literal format string.
 * @param {string} dateString The date string.
 */
export function parseCompare(formatString, dateString) {
    let i = 0;
    for (const char of formatString) {
        if (char !== dateString[i]) {
            throw new Error(`Unmatched character in DateTime string: ${char}`);
        }

        i++;
    }
};

/**
 * Resolves two-digit years in a moving century window and applies parsed fields.
 * The window starts 80 calendar years before the reference time in UTC.
 * @param {DateTime} baseDate The base date in the parsing locale and time zone.
 * @param {ParsedDateValue[]} values The parsed fields.
 * @param {number} referenceTime The epoch milliseconds captured when parsing began.
 * @returns {DateTime} The parsed date.
 */
export function parseDateValues(baseDate, values, referenceTime) {
    const shortYears = values.filter(({ key, literal, length }) =>
        (key === 'year' || key === 'weekYear') &&
        length <= 2 && Array.from(literal).length === 2,
    );
    let centuryStart = null;
    let startYear;

    if (shortYears.length) {
        centuryStart = new Date(referenceTime);
        startYear = centuryStart.getUTCFullYear() - 80;
        const month = centuryStart.getUTCMonth();
        const day = Math.min(
            centuryStart.getUTCDate(),
            baseDate.constructor.daysInMonth(startYear, month + 1),
        );
        centuryStart.setUTCFullYear(startYear, month, day);

        for (const data of shortYears) {
            data.value += Math.floor(startYear / 100) * 100 +
                (data.value < startYear % 100 ? 100 : 0);
        }
    }

    let datetime = applyDateValues(baseDate, values);

    if (centuryStart && datetime < centuryStart) {
        const boundaryYears = shortYears.filter(({ value }) => value === startYear);

        if (boundaryYears.length) {
            for (const data of boundaryYears) {
                data.value += 100;
            }

            // Reapply the original fields so leap days, week dates and DST gaps
            // are resolved in the chosen century rather than carried over.
            datetime = applyDateValues(baseDate, values);
        }
    }

    return datetime;
};

/**
 * Parses a supported unzoned ISO string as a neutral wall-clock timestamp.
 * @param {string} dateString The date string to parse.
 * @returns {number|null} The timestamp, or null if the shape is not supported.
 */
export function parseLocalTimestamp(dateString) {
    const match =
        dateString.match(/^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/) ||
        dateString.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d+))?)?$/);

    if (!match) {
        return null;
    }

    const [
        , year,
        month = 1,
        day = 1,
        hours = 0,
        minutes = 0,
        seconds = 0,
        fraction = '',
    ] = match;
    const date = new Date(0);

    date.setUTCFullYear(year, month - 1, day);
    date.setUTCHours(hours, minutes, seconds, fraction.padEnd(3, '0').substring(0, 3));

    return date.getTime();
};

/**
 * Generates methods for parsing a date.
 * @returns {Record<string, {get: Function, set: Function}>} An object containing date parsing methods.
 */
export function parseFactory() {
    let isPM = false;
    let lastAM = true;

    return {
        date: {
            get: (datetime) => datetime.getDate(),
            set: (datetime, value) => datetime.withDate(value),
        },
        dayPeriod: {
            get: (datetime) => datetime.getHours() < 12 ? 0 : 1,
            set: (datetime, value) => {
                isPM = value;
                let hours = value ? 12 : 0;
                if (lastAM) {
                    hours += datetime.getHours();
                }
                return datetime.withHours(hours);
            },
        },
        dayOfYear: {
            get: (datetime) => datetime.getDayOfYear(),
            set: (datetime, value) => datetime.withDayOfYear(value),
        },
        era: {
            get: (datetime) => datetime.getYear() < 0 ? 0 : 1,
            set: (datetime, value) => {
                const offset = value ? 1 : -1;
                return datetime.withYear(
                    datetime.getYear() * offset,
                );
            },
        },
        hours12: {
            get: (datetime) => datetime.getHours() % 12,
            set: (datetime, value) => {
                if (isPM) {
                    value += 12;
                }
                lastAM = true;
                return datetime.withHours(value);
            },
        },
        hours24: {
            get: (datetime) => datetime.getHours(),
            set: (datetime, value) => {
                lastAM = false;
                return datetime.withHours(value);
            },
        },
        milliseconds: {
            get: (datetime) => datetime.getMilliseconds(),
            set: (datetime, value) => datetime.withMilliseconds(value),
        },
        minutes: {
            get: (datetime) => datetime.getMinutes(),
            set: (datetime, value) => datetime.withMinutes(value),
        },
        month: {
            get: (datetime) => datetime.getMonth(),
            set: (datetime, value) => datetime.withMonth(value),
        },
        quarter: {
            get: (datetime) => datetime.getQuarter(),
            set: (datetime, value) => datetime.withQuarter(value),
        },
        seconds: {
            get: (datetime) => datetime.getSeconds(),
            set: (datetime, value) => datetime.withSeconds(value),
        },
        week: {
            get: (datetime) => datetime.getWeek(),
            set: (datetime, value) => datetime.withWeek(value),
        },
        weekDay: {
            get: (datetime) => datetime.getWeekDay(),
            set: (datetime, value) => datetime.withWeekDay(value),
        },
        weekDayInMonth: {
            get: (datetime) => datetime.getWeekDayInMonth(),
            set: (datetime, value) => datetime.withWeekDayInMonth(value),
        },
        weekOfMonth: {
            get: (datetime) => datetime.getWeekOfMonth(),
            set: (datetime, value) => datetime.withWeekOfMonth(value),
        },
        weekYear: {
            get: (datetime) => datetime.getWeekYear(),
            set: (datetime, value) => datetime.withWeekYear(value),
        },
        year: {
            get: (datetime) => {
                const year = datetime.getYear();
                return Math.abs(year);
            },
            set: (datetime, value) => datetime.withYear(value),
        },
    };
};

/**
 * Selects the later occurrence of a matching local wall time.
 * @param {DateTime} date A date matching the requested wall time.
 * @param {number} time The requested wall-clock timestamp.
 * @returns {DateTime} The later matching date.
 */
function resolveRepeatedTime(date, time) {
    const nextTime = Math.min(date.getTime() + 86400000, 8.64e15);
    const nextOffset = date.withTime(nextTime).getTimeZoneOffset();
    const laterDate = date.withTime(time + (nextOffset * 60000));

    return laterDate > date && getOffsetTime(laterDate) === time ?
        laterDate :
        date;
}

/**
 * Sets the number of milliseconds since the UNIX epoch (offset to timeZone).
 * @param {DateTime} date The DateTime.
 * @param {number} time The number of milliseconds since the UNIX epoch (offset to timeZone).
 * @param {number} [direction=1] The direction to resolve a gap.
 * @returns {DateTime} A new DateTime instance.
 */
export function setOffsetTime(date, time, direction = 1) {
    const newDate = date.withTime(
        time + (date.getTimeZoneOffset() * 60000),
    );
    const newOffsetTime = getOffsetTime(newDate);

    if (newOffsetTime === time) {
        return resolveRepeatedTime(newDate, time);
    }

    const adjustedDate = date.withTime(
        time + (newDate.getTimeZoneOffset() * 60000),
    );
    const adjustedOffsetTime = getOffsetTime(adjustedDate);

    if (adjustedOffsetTime === time) {
        return resolveRepeatedTime(adjustedDate, time);
    }

    if (direction < 0) {
        return newOffsetTime < adjustedOffsetTime ?
            newDate :
            adjustedDate;
    }

    return newOffsetTime > adjustedOffsetTime ?
        newDate :
        adjustedDate;
};
