import { getDayPeriods, getDays, getEras, getMonths, getNumbers } from './values.js';
import { weekDay } from './utility.js';

/**
 * Parse a day from a locale string.
 * @param {string} locale The locale.
 * @param {string} value The value to parse.
 * @param {string} [type=long] The formatting type.
 * @param {Boolean} [standalone=true] Whether the value is standalone.
 * @return {number} The day number (0-6).
 */
export function parseDay(locale, value, type = 'long', standalone = true) {
    const day = getDays(locale, type, standalone).indexOf(value) || 7;
    return weekDay(locale, day);
};

/**
 * Parse a day period from a locale string.
 * @param {string} locale The locale.
 * @param {string} value The value to parse.
 * @param {string} [type=long] The formatting type.
 * @return {number} The day period (0-1).
 */
export function parseDayPeriod(locale, value, type = 'long') {
    return getDayPeriods(locale, type).indexOf(value);
};

/**
 * Parse an era from a locale string.
 * @param {string} locale The locale.
 * @param {string} value The value to parse.
 * @param {string} [type=long] The formatting type.
 * @return {number} The era (0-1).
 */
export function parseEra(locale, value, type = 'long') {
    return getEras(locale, type).indexOf(value);
};

/**
 * Parse a month from a locale string.
 * @param {string} locale The locale.
 * @param {string} value The value to parse.
 * @param {string} [type=long] The formatting type.
 * @param {Boolean} [standalone=true] Whether the value is standalone.
 * @return {number} The month number (1-12).
 */
export function parseMonth(locale, value, type = 'long', standalone = true) {
    return getMonths(locale, type, standalone).indexOf(value) + 1;
};

/**
 * Parse a number from a locale number string.
 * @param {string} locale The locale.
 * @param {string} value The value to parse.
 * @return {number} The parsed number.
 */
export function parseNumber(locale, value) {
    const numbers = getNumbers(locale);
    return parseInt(
        `${value}`.replace(/./g, (match) => numbers.indexOf(match)),
    );
};
