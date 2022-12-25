import { makeFormatter } from './../factory.js';
import { getDayPeriods, getDays, getEras, getMonths, getNumbers } from './values.js';

/**
 * Format a day as a locale string.
 * @param {string} locale The locale.
 * @param {number} day The day to format (0-6).
 * @param {string} [type=long] The formatting type.
 * @param {Boolean} [standalone=true] Whether the value is standalone.
 * @return {string} The formatted string.
 */
export function formatDay(locale, day, type = 'long', standalone = true) {
    return getDays(locale, type, standalone)[day];
};

/**
 * Format a day period as a locale string.
 * @param {string} locale The locale.
 * @param {number} period The period to format (0-1).
 * @param {string} [type=long] The formatting type.
 * @return {string} The formatted string.
 */
export function formatDayPeriod(locale, period, type = 'long') {
    return getDayPeriods(locale, type)[period];
};

/**
 * Format an era as a locale string.
 * @param {string} locale The locale.
 * @param {number} era The period to format (0-1).
 * @param {string} [type=long] The formatting type.
 * @return {string} The formatted string.
 */
export function formatEra(locale, era, type = 'long') {
    return getEras(locale, type)[era];
};

/**
 * Format a month as a locale string.
 * @param {string} locale The locale.
 * @param {number} month The month to format (1-12).
 * @param {string} [type=long] The formatting type.
 * @param {Boolean} [standalone=true] Whether the value is standalone.
 * @return {string} The formatted string.
 */
export function formatMonth(locale, month, type = 'long', standalone = true) {
    return getMonths(locale, type, standalone)[month - 1];
};

/**
 * Format a number as a locale number string.
 * @param {string} locale The locale.
 * @param {number} number The number to format.
 * @param {number} [padding=0] The amount of padding to use.
 * @return {string} The formatted string.
 */
export function formatNumber(locale, number, padding = 0) {
    const numbers = getNumbers(locale);
    return `${number}`
        .padStart(padding, 0)
        .replace(/\d/g, (match) => numbers[match]);
};

/**
 * Format a number to an offset string.
 * @param {number} offset The offset to format.
 * @param {Boolean} [useColon=true] Whether to use a colon seperator.
 * @param {Boolean} [optionalMinutes=false] Whether minutes are optional.
 * @return {string} The formatted offset string.
 */
export function formatOffset(offset, useColon = true, optionalMinutes = false) {
    const hours = Math.abs(
        (offset / 60) | 0,
    );
    const minutes = Math.abs(offset % 60);

    const sign = offset > 0 ?
        '-' :
        '+';
    const hourString = `${hours}`.padStart(2, 0);
    const minuteString = minutes || !optionalMinutes ?
        `${minutes}`.padStart(2, 0) :
        '';
    const colon = useColon && minuteString ?
        ':' :
        '';

    return `${sign}${hourString}${colon}${minuteString}`;
};

/**
 * Format a time zone as a locale string.
 * @param {string} locale The locale.
 * @param {number} timestamp The timestamp to use.
 * @param {string} timeZone The time zone to format.
 * @param {string} [type=long] The formatting type.
 * @return {string} The formatted string.
 */
export function formatTimeZoneName(locale, timestamp, timeZone, type = 'long') {
    return makeFormatter(locale, { second: 'numeric', timeZone, timeZoneName: type })
        .formatToParts(timestamp)
        .find((part) => part.type === 'timeZoneName')
        .value;
};
