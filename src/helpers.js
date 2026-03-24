import { getDateFormatter } from './factory.js';
import { diffMethods, thresholds } from './vars.js';

/** @typedef {import('./date-time.js').default} DateTime */

/**
 * DateTime Helpers
 */

/**
 * Escapes a string for safe use inside a RegExp source.
 * @param {string} value The string to escape.
 * @return {string} The escaped string.
 */
function escapeRegExp(value) {
    return value.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
}

/**
 * Calculates the difference between two dates in a given time unit.
 * @param {DateTime} date The base DateTime.
 * @param {DateTime} other The DateTime to compare to.
 * @param {'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second'} timeUnit The time unit to compare in.
 * @param {boolean} [relative=true] Whether to use relative boundaries when calculating the difference.
 * @return {number} The difference between the dates in the given time unit.
 */
export function calculateDiff(date, other, timeUnit, relative = true) {
    other = other.withTimeZone(date.getTimeZone());

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
            return compensateDiff(
                date,
                other.withWeekYear(
                    date.getWeekYear(),
                    date.getWeek(),
                ),
                (date - other) / 604800000,
                relative,
            );
        case 'day':
            return compensateDiff(
                date,
                other.withYear(
                    date.getYear(),
                    date.getMonth(),
                    date.getDate(),
                ),
                (date - other) / 86400000,
                relative,
            );
        case 'hour':
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
                relative,
            );
        case 'minute':
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
                relative,
            );
        case 'second':
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
                relative,
            );
        default:
            throw new Error('Invalid time unit supplied');
    }
};

/**
 * Gets the RegExp for a list of string values.
 * Longer values are matched first to avoid prefix collisions.
 * @param {string[]} values The values to include in the RegExp.
 * @return {string} The values RegExp.
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
 * @return {number} The compensated amount.
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
 * @return {[number, string]} The biggest difference (amount and time unit).
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
 * @return {number} The offset.
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

    const localTime = Date.UTC(
        parseInt(values.year, 10),
        parseInt(values.month, 10) - 1,
        parseInt(values.day, 10),
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
 * @return {number} The number of milliseconds since the UNIX epoch (offset to timeZone).
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
 * Generates methods for parsing a date.
 * @return {Record<string, {get: Function, set: Function}>} An object containing date parsing methods.
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
 * Sets the number of milliseconds since the UNIX epoch (offset to timeZone).
 * @param {DateTime} date The DateTime.
 * @param {number} time The number of milliseconds since the UNIX epoch (offset to timeZone).
 * @return {DateTime} A new DateTime instance.
 */
export function setOffsetTime(date, time) {
    const oldOffset = date.getTimeZoneOffset();

    const newTime = time + (oldOffset * 60000);
    const newDate = date.withTime(newTime);

    const offset = newDate.getTimeZoneOffset();

    if (oldOffset === offset) {
        return newDate;
    }

    // compensate for DST transitions
    return newDate.withTime(newTime - ((oldOffset - offset) * 60000));
};
