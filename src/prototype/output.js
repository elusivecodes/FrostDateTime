import { formats, formatTokenRegExp } from './../vars.js';
import tokens from './../formatter/tokens.js';

/**
 * DateTime Output
 */

/**
 * Format the current date using a format string.
 * @param {string} formatString The format string.
 * @return {string} The formatted date string.
 */
export function format(formatString) {
    let match;
    let output = '';

    while (formatString && (match = formatString.match(formatTokenRegExp))) {
        const token = match[1];
        const position = match.index;
        const length = match[0].length;

        if (position) {
            output += formatString.substring(0, position);
        }

        formatString = formatString.substring(position + length);

        if (!token) {
            output += match[0].slice(1, -1);
            continue;
        }

        if (!(token in tokens)) {
            throw new Error(`Invalid token in DateTime format: ${token}`);
        }

        output += tokens[token].output(this, length);
    }

    output += formatString;

    return output;
};

/**
 * Format the current date using "eee MMM dd yyyy".
 * @return {string} The formatted date string.
 */
export function toDateString() {
    return this.format(formats.date);
};

/**
 * Format the current date using "yyyy-MM-dd'THH:mm:ss.SSSSSSxxx".
 * @return {string} The formatted date string.
 */
export function toISOString() {
    return this
        .setLocale('en')
        .setTimeZone('UTC')
        .format(formats.rfc3339_extended);
};

/**
 * Format the current date using "eee MMM dd yyyy HH:mm:ss xx (VV)".
 * @return {string} The formatted date string.
 */
export function toString() {
    return this.format(formats.string);
};

/**
 * Format the current date using "HH:mm:ss xx (VV)".
 * @return {string} The formatted date string.
 */
export function toTimeString() {
    return this.format(formats.time);
};

/**
 * Format the current date in UTC timeZone using "eee MMM dd yyyy HH:mm:ss xx (VV)".
 * @return {string} The formatted date string.
 */
export function toUTCString() {
    return this
        .setLocale('en')
        .setTimeZone('UTC')
        .toString();
};
