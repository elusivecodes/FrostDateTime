/**
 * DateTime Factory
 */

const data = {};

/**
 * Get values from cache (or generate if they don't exist).
 * @param {string} key The key for the values.
 * @param {function} callback The callback to generate the values.
 * @return {array} The cached values.
 */
export function getData(key, callback) {
    if (!(key in data)) {
        data[key] = callback();
    }

    return data[key];
};

/**
 * Create a new date formatter for a timeZone.
 * @param {string} timeZone The timeZone.
 * @param {object} options The options for the formatter.
 * @return {Intl.DateTimeFormat} A new DateTimeFormat object.
 */
export function getDateFormatter(timeZone) {
    return getData(
        `dateFormatter.${timeZone}`,
        (_) => makeFormatter('en', {
            timeZone,
            hourCycle: 'h23',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        }),
    );
};

/**
 * Create a new relative formatter for a locale.
 * @param {string} locale The locale.
 * @param {object} options The options for the formatter.
 * @return {Intl.RelativeTimeFormat} A new RelativeTimeFormat object.
 */
export function getRelativeFormatter(locale) {
    if (!('RelativeTimeFormat' in Intl)) {
        return null;
    }

    return getData(
        `relativeFormatter.${locale}`,
        (_) => new Intl.RelativeTimeFormat(locale, {
            numeric: 'auto',
            style: 'long',
        }),
    );
};

/**
 * Create a new formatter for a locale.
 * @param {string} locale The locale.
 * @param {object} options The options for the formatter.
 * @return {Intl.DateTimeFormat} A new DateTimeFormat object.
 */
export function makeFormatter(locale, options) {
    return new Intl.DateTimeFormat(locale, {
        timeZone: 'UTC',
        ...options,
    });
};
