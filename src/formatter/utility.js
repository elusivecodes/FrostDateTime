import { getWeekInfo } from './locale.js';
import { numberRegExp } from './values.js';

/**
 * Decodes a quoted ICU format literal.
 * @param {string} literal The literal to decode.
 * @return {string} The decoded literal.
 */
export function decodeLiteral(literal) {
    return literal === `''` ?
        `'` :
        literal.slice(1, -1).replace(/''/g, `'`);
};

/**
 * Gets the formatting type from the component token length.
 * @param {number} length The component token length.
 * @return {string} The formatting type.
 */
export function getType(length) {
    switch (length) {
        case 5:
            return 'narrow';
        case 4:
            return 'long';
        default:
            return 'short';
    }
};

/**
 * Gets the parsing RegExp data for a format token.
 * @param {string} source The token RegExp.
 * @param {string|null} nextSource The next token RegExp.
 * @param {number} length The token length.
 * @param {string} locale The parsing locale.
 * @param {boolean} previousNumeric Whether the previous token was an adjacent numeric token.
 * @return {{numeric: boolean, source: string}} The token RegExp data.
 */
export function getTokenRegExp(source, nextSource, length, locale, previousNumeric) {
    const numberSource = numberRegExp(locale);
    let numeric = true;

    if (source !== numberSource) {
        numeric = false;
    } else if (previousNumeric || nextSource === numberSource) {
        source = numberRegExp(locale, length);
    }

    return { numeric, source };
};

/**
 * Gets the locale's minimum days in the first week of the year.
 * @param {string} locale The locale.
 * @return {number} The minimum day count.
 */
export function minimumDays(locale) {
    return getWeekInfo(locale).minimalDays;
};

/**
 * Converts a Sunday-based day-of-week value to the locale's week numbering.
 * @param {string} locale The locale.
 * @param {number} day The day of the week. (0 = Sunday, 6 = Saturday)
 * @return {number} The local day of the week.
 */
export function weekDay(locale, day) {
    return (7 + parseInt(day, 10) - (getWeekInfo(locale).firstDay % 7)) % 7 + 1;
};
