/**
 * DateTime Factory
 */

const data = new Map();

/**
 * Clears all cached formatter and locale values.
 */
export function clearDataCache() {
    data.clear();
};

/**
 * Gets a cached value, creating it on first access.
 * @template T
 * @param {string} key The key for the values.
 * @param {() => T} callback The callback to generate the values.
 * @return {T} The cached value.
 */
export function getData(key, callback) {
    if (!data.has(key)) {
        data.set(key, callback());
    }

    return data.get(key);
};

/**
 * Creates a date formatter for a time zone.
 * @param {string} timeZone The time zone.
 * @return {Intl.DateTimeFormat} The formatter instance.
 */
export function getDateFormatter(timeZone) {
    return getData(
        `dateFormatter.${timeZone}`,
        () => makeFormatter('en', {
            timeZone,
            hourCycle: 'h23',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            fractionalSecondDigits: 3,
        }),
    );
};

/**
 * Creates a relative-time formatter for a locale.
 * @param {string} locale The locale.
 * @return {Intl.RelativeTimeFormat|null} The formatter instance, or null when unsupported.
 */
export function getRelativeFormatter(locale) {
    if (!('RelativeTimeFormat' in Intl)) {
        return null;
    }

    return getData(
        `relativeFormatter.${locale}`,
        () => new Intl.RelativeTimeFormat(locale, {
            numeric: 'auto',
            style: 'long',
        }),
    );
};

/**
 * Creates a formatter for a locale.
 * @param {string} locale The locale.
 * @param {Intl.DateTimeFormatOptions} options The options for the formatter.
 * @return {Intl.DateTimeFormat} The formatter instance.
 */
export function makeFormatter(locale, options) {
    return new Intl.DateTimeFormat(locale, {
        timeZone: 'UTC',
        ...options,
    });
};
