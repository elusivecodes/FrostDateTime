import { config, monthDays } from './../vars.js';

/**
 * DateTime (Static) Utility
 */

/**
 * Get the day of the year for a year, month and date.
 * @param {number} year The year.
 * @param {number} month The month. (1, 12)
 * @param {number} date The date.
 * @return {number} The day of the year. (1, 366)
 */
export function dayOfYear(year, month, date) {
    return new Array(month - 1)
        .fill()
        .reduce(
            (d, _, i) =>
                d + daysInMonth(year, i + 1),
            date,
        );
};

/**
 * Get the number of days in a month, from a year and month.
 * @param {number} year The year.
 * @param {number} month The month. (1, 12)
 * @return {number} The number of days in the month.
 */
export function daysInMonth(year, month) {
    const date = new Date(Date.UTC(year, month - 1));
    month = date.getUTCMonth();

    return monthDays[month] +
        (
            month == 1 && isLeapYear(
                date.getUTCFullYear(),
            ) ?
                1 :
                0
        );
};

/**
 * Get the number of days in a year.
 * @param {number} year The year.
 * @return {number} The number of days in the year.
 */
export function daysInYear(year) {
    return !isLeapYear(year) ?
        365 :
        366;
};

/**
 * Get the default locale.
 * @return {string} The locale.
 */
export function getDefaultLocale() {
    return config.defaultLocale;
};

/**
 * Get the default timeZone.
 * @return {string} The name of the timeZone.
 */
export function getDefaultTimeZone() {
    return config.defaultTimeZone;
};

/**
 * Return true if a year is a leap year.
 * @param {number} year The year.
 * @return {Boolean} TRUE if the year is a leap year, otherwise FALSE.
 */
export function isLeapYear(year) {
    return new Date(year, 1, 29)
        .getDate() === 29;
};

/**
 * Set whether dates will be clamped when changing months.
 * @param {Boolean} clampDates Whether to clamp dates.
 */
export function setDateClamping(clampDates) {
    config.clampDates = clampDates;
};

/**
 * Set the default locale.
 * @param {string} locale The locale.
 */
export function setDefaultLocale(locale) {
    config.defaultLocale = locale;
};

/**
 * Set the default timeZone.
 * @param {string} timeZone The name of the timeZone.
 */
export function setDefaultTimeZone(timeZone) {
    config.defaultTimeZone = timeZone;
};
