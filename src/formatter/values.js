import { getData, makeFormatter } from './../factory.js';
import { valuesRegExp } from './../helpers.js';

/**
 * Formatter value caches.
 */

/**
 * Gets cached localized day-period labels.
 * @param {string} locale The locale.
 * @param {string} [type=long] The formatting type.
 * @return {string[]} The localized day-period labels.
 */
export function getDayPeriods(locale, type = 'long') {
    return getData(
        `periods.${locale}.${type}`,
        () => {
            const dayPeriodFormatter = makeFormatter(locale, { hour: 'numeric', hourCycle: 'h11' });
            return new Array(2)
                .fill()
                .map((_, index) =>
                    dayPeriodFormatter.formatToParts(Date.UTC(2018, 0, 1, index * 12))
                        .find((part) => part.type === 'dayPeriod')
                        .value,
                );
        },
    );
};

/**
 * Gets cached localized weekday labels.
 * @param {string} locale The locale.
 * @param {string} [type=long] The formatting type.
 * @param {boolean} [standalone=true] Whether the values are standalone.
 * @return {string[]} The localized weekday labels.
 */
export function getDays(locale, type = 'long', standalone = true) {
    return getData(
        `days.${locale}.${type}.${standalone}`,
        () => {
            if (standalone) {
                const dayFormatter = makeFormatter(locale, { weekday: type });
                return new Array(7)
                    .fill()
                    .map((_, index) =>
                        dayFormatter.format(Date.UTC(2018, 0, index)),
                    );
            }

            const dayFormatter = makeFormatter(locale, { year: 'numeric', month: 'numeric', day: 'numeric', weekday: type });
            return new Array(7)
                .fill()
                .map((_, index) =>
                    dayFormatter.formatToParts(Date.UTC(2018, 0, index))
                        .find((part) => part.type === 'weekday')
                        .value,
                );
        },
    );
};

/**
 * Gets cached localized era labels.
 * @param {string} locale The locale.
 * @param {string} [type=long] The formatting type.
 * @return {string[]} The localized era labels.
 */
export function getEras(locale, type = 'long') {
    return getData(
        `eras.${locale}.${type}`,
        () => {
            const eraFormatter = makeFormatter(locale, { era: type });
            return new Array(2)
                .fill()
                .map((_, index) =>
                    eraFormatter.formatToParts(Date.UTC(index - 1, 0, 1))
                        .find((part) => part.type === 'era')
                        .value,
                );
        },
    );
};

/**
 * Gets cached localized month labels.
 * @param {string} locale The locale.
 * @param {string} [type=long] The formatting type.
 * @param {boolean} [standalone=true] Whether the values are standalone.
 * @return {string[]} The localized month labels.
 */
export function getMonths(locale, type = 'long', standalone = true) {
    return getData(
        `months.${locale}.${type}.${standalone}`,
        () => {
            if (standalone) {
                const monthFormatter = makeFormatter(locale, { month: type });
                return new Array(12)
                    .fill()
                    .map((_, index) =>
                        monthFormatter.format(Date.UTC(2018, index, 1)),
                    );
            }

            const monthFormatter = makeFormatter(locale, { year: 'numeric', month: type, day: 'numeric' });
            return new Array(12)
                .fill()
                .map((_, index) =>
                    monthFormatter.formatToParts(Date.UTC(2018, index, 1))
                        .find((part) => part.type === 'month')
                        .value,
                );
        },
    );
};

/**
 * Gets cached localized digit glyphs.
 * @param {string} locale The locale.
 * @return {string[]} The localized digit glyphs.
 */
export function getNumbers(locale) {
    return getData(
        `numbers.${locale}`,
        () => {
            const numberFormatter = makeFormatter(locale, { minute: 'numeric' });
            return new Array(10)
                .fill()
                .map((_, index) =>
                    numberFormatter.format(Date.UTC(2018, 0, 1, 0, index)),
                );
        },
    );
};

/**
 * Gets the RegExp for the number values.
 * @param {string} locale The locale.
 * @return {string} The number values RegExp.
 */
export function numberRegExp(locale) {
    return `(?:${valuesRegExp(getNumbers(locale))})+`;
};
