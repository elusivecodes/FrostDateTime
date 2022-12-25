import { modify } from './../helpers.js';
import { daysInMonth } from './../static/utility.js';

/**
 * DateTime Manipulation
 */

/**
 * Add a duration to the date.
 * @param {number} amount The amount to modify the date by.
 * @param {string} timeUnit The unit of time.
 * @return {DateTime} The DateTime object.
 */
export function add(amount, timeUnit) {
    return modify(this, amount, timeUnit);
};

/**
 * Modify the DateTime by setting it to the end of a unit of time.
 * @param {string} timeUnit The unit of time.
 * @return {DateTime} The DateTime object.
 */
export function endOf(timeUnit) {
    timeUnit = timeUnit.toLowerCase();

    switch (timeUnit) {
        case 'second':
            return this.setMilliseconds(999);
        case 'minute':
            return this.setSeconds(59, 999);
        case 'hour':
            return this.setMinutes(59, 59, 999);
        case 'day':
            return this.setHours(23, 59, 59, 999);
        case 'week':
            return this.setWeekDay(7)
                .setHours(23, 59, 59, 999);
        case 'month':
            return this.setDate(this.daysInMonth())
                .setHours(23, 59, 59, 999);
        case 'quarter':
            const month = this.getQuarter() * 3;
            return this.setMonth(month, daysInMonth(this.getYear(), month))
                .setHours(23, 59, 59, 999);
        case 'year':
            return this.setMonth(12, 31)
                .setHours(23, 59, 59, 999);
        default:
            throw new Error('Invalid time unit supplied');
    }
};

/**
 * Modify the DateTime by setting it to the start of a unit of time.
 * @param {string} timeUnit The unit of time.
 * @return {DateTime} The DateTime object.
 */
export function startOf(timeUnit) {
    timeUnit = timeUnit.toLowerCase();

    switch (timeUnit) {
        case 'second':
            return this.setMilliseconds(0);
        case 'minute':
            return this.setSeconds(0, 0);
        case 'hour':
            return this.setMinutes(0, 0, 0);
        case 'day':
            return this.setHours(0, 0, 0, 0);
        case 'week':
            return this.setWeekDay(1)
                .setHours(0, 0, 0, 0);
        case 'month':
            return this.setDate(1)
                .setHours(0, 0, 0, 0);
        case 'quarter':
            const month = this.getQuarter() * 3 - 2;
            return this.setMonth(month, 1)
                .setHours(0, 0, 0, 0);
        case 'year':
            return this.setMonth(1, 1)
                .setHours(0, 0, 0, 0);
        default:
            throw new Error('Invalid time unit supplied');
    }
};

/**
 * Subtract a duration from the date.
 * @param {number} amount The amount to modify the date by.
 * @param {string} timeUnit The unit of time.
 * @return {DateTime} The DateTime object.
 */
export function sub(amount, timeUnit) {
    return modify(this, -amount, timeUnit);
};
