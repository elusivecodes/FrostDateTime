import { getDateFormatter } from './factory.js';
import { diffMethods, thresholds } from './vars.js';

/**
 * DateTime Helpers
 */

export function calculateDiff(date, other, timeUnit, relative = true) {
    other = other.setTimeZone(date.getTimeZone());

    switch (timeUnit) {
        case 'year':
            return compensateDiff(
                date,
                other.setYear(
                    date.getYear(),
                ),
                date.getYear() - other.getYear(),
                !relative,
                -1,
            );
        case 'month':
            return compensateDiff(
                date,
                other.setYear(
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
                other.setWeekYear(
                    date.getWeekYear(),
                    date.getWeek(),
                ),
                (date - other) / 604800000,
                relative,
            );
        case 'day':
            return compensateDiff(
                date,
                other.setYear(
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
                other.setYear(
                    date.getYear(),
                    date.getMonth(),
                    date.getDate(),
                ).setHours(
                    date.getHours(),
                ),
                (date - other) / 3600000,
                relative,
            );
        case 'minute':
            return compensateDiff(
                date,
                other.setYear(
                    date.getYear(),
                    date.getMonth(),
                    date.getDate(),
                ).setHours(
                    date.getHours(),
                    date.getMinutes(),
                ),
                (date - other) / 60000,
                relative,
            );
        case 'second':
            return compensateDiff(
                date,
                other.setYear(
                    date.getYear(),
                    date.getMonth(),
                    date.getDate(),
                ).setHours(
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
 * Compensate the difference between two dates.
 * @param {DateTime} date The DateTime.
 * @param {DateTime} other The DateTime to compare to.
 * @param {number} amount The amount to compensate.
 * @param {Boolean} [compensate=true] Whether to compensate the amount.
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
 * Get the biggest difference between two dates.
 * @param {DateTime} date The DateTime.
 * @param {DateTime} [other] The DateTime to compare to.
 * @return {array} The biggest difference (amount and time unit).
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
 * Get the offset for a DateTime.
 * @param {DateTime} date The DateTime.
 * @return {number} The offset.
 */
export function getOffset(date) {
    const timeZone = date.getTimeZone();

    if (timeZone === 'UTC') {
        return 0;
    }

    const utcString = getDateFormatter('UTC').format(date);
    const localString = getDateFormatter(timeZone).format(date);

    return (new Date(utcString) - new Date(localString)) / 60000;
};

/**
 * Get the number of milliseconds since the UNIX epoch (offset to timeZone).
 * @param {DateTime} date The DateTime.
 * @return {number} The number of milliseconds since the UNIX epoch (offset to timeZone).
 */
export function getOffsetTime(date) {
    return date.getTime() - (date.getTimeZoneOffset() * 60000);
};

/**
 * Compare a literal format string with a date string.
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
 * Generate methods for parsing a date.
 * @return {object} An object containing date parsing methods.
 */
export function parseFactory() {
    let isPM = false;
    let lastAM = true;

    return {
        date: {
            get: (datetime) => datetime.getDate(),
            set: (datetime, value) => datetime.setDate(value),
        },
        dayPeriod: {
            get: (datetime) => datetime.getHours() < 12 ? 0 : 1,
            set: (datetime, value) => {
                isPM = value;
                let hours = value ? 12 : 0;
                if (lastAM) {
                    hours += datetime.getHours();
                }
                return datetime.setHours(hours);
            },
        },
        dayOfYear: {
            get: (datetime) => datetime.getDayOfYear(),
            set: (datetime, value) => datetime.setDayOfYear(value),
        },
        era: {
            get: (datetime) => datetime.getYear() < 1 ? 0 : 1,
            set: (datetime, value) => {
                const offset = value ? 1 : -1;
                return datetime.setYear(
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
                return datetime.setHours(value);
            },
        },
        hours24: {
            get: (datetime) => datetime.getHours(),
            set: (datetime, value) => {
                lastAM = false;
                return datetime.setHours(value);
            },
        },
        milliseconds: {
            get: (datetime) => datetime.getMilliseconds(),
            set: (datetime, value) => datetime.setMilliseconds(value),
        },
        minutes: {
            get: (datetime) => datetime.getMinutes(),
            set: (datetime, value) => datetime.setMinutes(value),
        },
        month: {
            get: (datetime) => datetime.getMonth(),
            set: (datetime, value) => datetime.setMonth(value),
        },
        quarter: {
            get: (datetime) => datetime.getQuarter(),
            set: (datetime, value) => datetime.setQuarter(value),
        },
        seconds: {
            get: (datetime) => datetime.getSeconds(),
            set: (datetime, value) => datetime.setSeconds(value),
        },
        week: {
            get: (datetime) => datetime.getWeek(),
            set: (datetime, value) => datetime.setWeek(value),
        },
        weekDay: {
            get: (datetime) => datetime.getWeekDay(),
            set: (datetime, value) => datetime.setWeekDay(value),
        },
        weekDayInMonth: {
            get: (datetime) => datetime.getWeekDayInMonth(),
            set: (datetime, value) => datetime.setWeekDayInMonth(value),
        },
        weekOfMonth: {
            get: (datetime) => datetime.getWeekOfMonth(),
            set: (datetime, value) => datetime.setWeekOfMonth(value),
        },
        weekYear: {
            get: (datetime) => datetime.getWeekYear(),
            set: (datetime, value) => datetime.setWeekYear(value),
        },
        year: {
            get: (datetime) => {
                const year = datetime.getYear();
                return Math.abs(year);
            },
            set: (datetime, value) => datetime.setYear(value),
        },
    };
};

/**
 * Set the number of milliseconds since the UNIX epoch (offset to timeZone).
 * @param {DateTime} date The DateTime.
 * @param {number} time The number of milliseconds since the UNIX epoch (offset to timeZone).
 * @return {DateTime} The DateTime object.
 */
export function setOffsetTime(date, time) {
    const oldOffset = date.getTimeZoneOffset();

    const newTime = time + (oldOffset * 60000);
    const newDate = date.setTime(newTime);

    const offset = newDate.getTimeZoneOffset();

    if (oldOffset === offset) {
        return newDate;
    }

    // compensate for DST transitions
    return newDate.setTime(newTime - ((oldOffset - offset) * 60000));
};
