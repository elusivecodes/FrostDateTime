import { getRelativeFormatter, makeFormatter } from './../factory.js';
import { getDayPeriods, getDays, getEras, getMonths, getNumbers } from './values.js';

/**
 * Formats a day as a locale string.
 * @param {string} locale The locale.
 * @param {number} day The day to format (0-6).
 * @param {string} [type='long'] The formatting type.
 * @param {boolean} [standalone=true] Whether the value is standalone.
 * @returns {string} The formatted string.
 */
export function formatDay(locale, day, type = 'long', standalone = true) {
    return getDays(locale, type, standalone)[day];
};

/**
 * Formats a day period as a locale string.
 * @param {string} locale The locale.
 * @param {number} period The day-period index to format. (0-1)
 * @param {string} [type='long'] The formatting type.
 * @returns {string} The formatted string.
 */
export function formatDayPeriod(locale, period, type = 'long') {
    return getDayPeriods(locale, type)[period];
};

/**
 * Formats an era as a locale string.
 * @param {string} locale The locale.
 * @param {number} era The era index to format. (0-1)
 * @param {string} [type='long'] The formatting type.
 * @returns {string} The formatted string.
 */
export function formatEra(locale, era, type = 'long') {
    return getEras(locale, type)[era];
};

/**
 * Formats a month as a locale string.
 * @param {string} locale The locale.
 * @param {number} month The month to format (1-12).
 * @param {string} [type='long'] The formatting type.
 * @param {boolean} [standalone=true] Whether the value is standalone.
 * @returns {string} The formatted string.
 */
export function formatMonth(locale, month, type = 'long', standalone = true) {
    return getMonths(locale, type, standalone)[month - 1];
};

/**
 * Formats a number as a locale number string.
 * @param {string} locale The locale.
 * @param {number} number The number to format.
 * @param {number} [padding=0] The amount of padding to use.
 * @returns {string} The formatted string.
 */
export function formatNumber(locale, number, padding = 0) {
    const numbers = getNumbers(locale);
    return `${number}`
        .padStart(padding, '0')
        .replace(/\d/g, (match) => numbers[match]);
};

/**
 * Formats a number to an offset string.
 * @param {number} offset The offset to format.
 * @param {boolean} [useColon=true] Whether to use a colon separator.
 * @param {boolean} [optionalMinutes=false] Whether minutes are optional.
 * @param {boolean} [includeSeconds=true] Whether seconds are included.
 * @returns {string} The formatted offset string.
 */
export function formatOffset(offset, useColon = true, optionalMinutes = false, includeSeconds = true) {
    const absoluteSeconds = Math.abs(offset * 60);
    const totalSeconds = Math.round(absoluteSeconds);
    const precision = Number.EPSILON * Math.max(1, absoluteSeconds);
    const roundingError = Math.abs(absoluteSeconds - totalSeconds);
    if (!Number.isFinite(absoluteSeconds) || roundingError > precision || totalSeconds >= 86400) {
        throw new Error('Invalid time zone offset supplied');
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor(totalSeconds % 3600 / 60);
    const seconds = totalSeconds % 60;
    const sign = offset > 0 ?
        '-' :
        '+';
    const parts = [`${hours}`.padStart(2, '0')];

    if (!optionalMinutes || minutes || seconds) {
        parts.push(`${minutes}`.padStart(2, '0'));
    }

    if (includeSeconds && seconds) {
        parts.push(`${seconds}`.padStart(2, '0'));
    }

    return sign + parts.join(useColon ? ':' : '');
};

/**
 * Formats a relative duration as a locale string.
 * @param {string} locale The locale.
 * @param {number} amount The amount of duration.
 * @param {string} unit The time unit.
 * @returns {string} The relative duration.
 */
export function formatRelative(locale, amount, unit) {
    const relativeFormatter = getRelativeFormatter(locale);

    if (!relativeFormatter) {
        throw new Error('RelativeTimeFormat not supported');
    }

    return relativeFormatter.format(amount, unit);
};

/**
 * Formats a time zone as a locale string.
 * @param {string} locale The locale.
 * @param {number} timestamp The timestamp to use.
 * @param {string} timeZone The time zone to format.
 * @param {string} [type='long'] The formatting type.
 * @returns {string} The formatted string.
 */
export function formatTimeZoneName(locale, timestamp, timeZone, type = 'long') {
    return makeFormatter(locale, { second: 'numeric', timeZone, timeZoneName: type })
        .formatToParts(timestamp)
        .find((part) => part.type === 'timeZoneName')
        .value;
};
