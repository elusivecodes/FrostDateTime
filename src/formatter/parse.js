import { weekDay } from './utility.js';
import { getDayPeriods, getDays, getEras, getMonths, getNumbers } from './values.js';

/**
 * Parses a day from a locale string.
 * @param {string} locale The locale.
 * @param {string} value The value to parse.
 * @param {string} [type=long] The formatting type.
 * @param {boolean} [standalone=true] Whether the value is standalone.
 * @return {number} The local day of the week (1-7).
 */
export function parseDay(locale, value, type = 'long', standalone = true) {
    const day = getDays(locale, type, standalone).indexOf(value);
    if (day === -1) {
        throw new Error(`Unmatched day string in DateTime string: ${value}`);
    }
    return weekDay(locale, day);
};

/**
 * Parses a day period from a locale string.
 * @param {string} locale The locale.
 * @param {string} value The value to parse.
 * @param {string} [type=long] The formatting type.
 * @return {number} The day period (0-1).
 */
export function parseDayPeriod(locale, value, type = 'long') {
    return getDayPeriods(locale, type).indexOf(value);
};

/**
 * Parses an era from a locale string.
 * @param {string} locale The locale.
 * @param {string} value The value to parse.
 * @param {string} [type=long] The formatting type.
 * @return {number} The era (0-1).
 */
export function parseEra(locale, value, type = 'long') {
    return getEras(locale, type).indexOf(value);
};

/**
 * Parses a month from a locale string.
 * @param {string} locale The locale.
 * @param {string} value The value to parse.
 * @param {string} [type=long] The formatting type.
 * @param {boolean} [standalone=true] Whether the value is standalone.
 * @return {number} The month number (1-12).
 */
export function parseMonth(locale, value, type = 'long', standalone = true) {
    return getMonths(locale, type, standalone).indexOf(value) + 1;
};

/**
 * Parses locale digits into an ASCII digit string.
 * @param {string} locale The locale.
 * @param {string} value The value to parse.
 * @return {string} The parsed ASCII digit string.
 */
export function parseNumberString(locale, value) {
    const numbers = getNumbers(locale);
    return `${value}`.replace(/./g, (match) => numbers.indexOf(match));
};

/**
 * Parses a number from a locale number string.
 * @param {string} locale The locale.
 * @param {string} value The value to parse.
 * @return {number} The parsed number.
 */
export function parseNumber(locale, value) {
    return parseInt(
        parseNumberString(locale, value),
        10,
    );
};
