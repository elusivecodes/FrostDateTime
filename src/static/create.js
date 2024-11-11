import DateTime from './../date-time.js';
import { parseCompare, parseFactory } from './../helpers.js';
import { config, formats, formatTokenRegExp, parseOrderKeys } from './../vars.js';
import tokens from './../formatter/tokens.js';

/**
 * DateTime (Static) Creation
 */

/**
 * Create a new DateTime from an array.
 * @param {number[]} dateArray The date to parse.
 * @param {object} [options] Options for the new DateTime.
 * @param {string} [options.timeZone] The timeZone to use.
 * @param {string} [options.locale] The locale to use.
 * @return {DateTime} A new DateTime object.
 */
export function fromArray(dateArray, options = {}) {
    const dateValues = dateArray.slice(0, 3);
    const timeValues = dateArray.slice(3);

    if (dateValues.length < 3) {
        dateValues.push(...new Array(3 - dateValues.length).fill(1));
    }

    if (timeValues.length < 4) {
        timeValues.push(...new Array(4 - timeValues.length).fill(0));
    }

    return new DateTime(null, options)
        .setTimestamp(0)
        .setYear(...dateValues)
        .setHours(...timeValues);
};

/**
 * Create a new DateTime from a Date.
 * @param {Date} date The date.
 * @param {object} [options] Options for the new DateTime.
 * @param {string} [options.timeZone] The timeZone to use.
 * @param {string} [options.locale] The locale to use.
 * @return {DateTime} A new DateTime object.
 */
export function fromDate(date, options = {}) {
    return new DateTime(date.getTime(), options);
};

/**
 * Create a new DateTime from a format string.
 * @param {string} formatString The format string.
 * @param {string} dateString The date string.
 * @param {object} [options] Options for the new DateTime.
 * @param {string} [options.timeZone] The timeZone to use.
 * @param {string} [options.locale] The locale to use.
 * @return {DateTime} A new DateTime object.
 */
export function fromFormat(formatString, dateString, options = {}) {
    if (!('locale' in options)) {
        options.locale = config.defaultLocale;
    }

    const values = [];

    let match;
    while (formatString && (match = formatString.match(formatTokenRegExp))) {
        const token = match[1];
        const position = match.index;
        const length = match[0].length;

        if (position) {
            const formatTest = formatString.substring(0, position);
            parseCompare(formatTest, dateString);
        }

        formatString = formatString.substring(position + length);
        dateString = dateString.substring(position);

        if (!token) {
            const literal = match[0].slice(1, -1);
            parseCompare(literal || `'`, dateString);
            dateString = dateString.substring(literal.length);
            continue;
        }

        if (!(token in tokens)) {
            throw new Error(`Invalid token in DateTime format: ${token}`);
        }

        const regExp = tokens[token].regex(options.locale, length);
        const matchedValue = dateString.match(new RegExp(`^${regExp}`));

        if (!matchedValue) {
            throw new Error(`Unmatched token in DateTime string: ${token}`);
        }

        const literal = matchedValue[0];
        const value = tokens[token].input(options.locale, literal, length);

        if (value !== null) {
            const key = tokens[token].key;
            values.push({ key, value, literal, token, length });
        }

        dateString = dateString.substring(literal.length);
    }

    if (formatString) {
        parseCompare(formatString, dateString);
    }

    if (!('timeZone' in options)) {
        options.timeZone = config.defaultTimeZone;
    }

    let timeZone = options.timeZone;
    for (const { key, value } of values) {
        if (key !== 'timeZone') {
            continue;
        }

        timeZone = value;
    }

    let datetime = this.fromTimestamp(0, {
        locale: options.locale,
    }).setTimeZone(timeZone);

    const methods = parseFactory();

    const testValues = [];

    for (const subKeys of parseOrderKeys) {
        for (const subKey of subKeys) {
            if (subKey === 'era' && !values.find((data) => data.key === 'year')) {
                continue;
            }

            for (const data of values) {
                const { key, value, literal, token, length } = data;

                if (key !== subKey) {
                    continue;
                }

                // skip narrow month and day names if output already matches
                if (length === 5 && ['M', 'L', 'E', 'e', 'c'].includes(token)) {
                    const fullToken = token.repeat(length);
                    if (datetime.format(fullToken) === literal) {
                        continue;
                    }
                }

                datetime = methods[key].set(datetime, value);
                testValues.push(data);
            }
        }
    }

    let isValid = true;
    for (const { key, value } of testValues) {
        if (key in methods && methods[key].get(datetime) !== value) {
            isValid = false;
            break;
        }
    }

    if (options.timeZone !== timeZone) {
        datetime = datetime.setTimeZone(options.timeZone);
    }

    datetime.isValid = isValid;

    return datetime;
};

/**
 * Create a new DateTime from an ISO format string.
 * @param {string} dateString The date string.
 * @param {object} [options] Options for the new DateTime.
 * @param {string} [options.timeZone] The timeZone to use.
 * @param {string} [options.locale] The locale to use.
 * @return {DateTime} A new DateTime object.
 */
export function fromISOString(dateString, options = {}) {
    let date = this.fromFormat(formats.rfc3339_extended, dateString, {
        locale: 'en',
    });

    if ('timeZone' in options) {
        date = date.setTimeZone(options.timeZone);
    }

    if ('locale' in options) {
        date = date.setLocale(options.locale);
    }

    return date;
};

/**
 * Create a new DateTime from a timestamp.
 * @param {number} timestamp The timestamp.
 * @param {object} [options] Options for the new DateTime.
 * @param {string} [options.timeZone] The timeZone to use.
 * @param {string} [options.locale] The locale to use.
 * @return {DateTime} A new DateTime object.
 */
export function fromTimestamp(timestamp, options = {}) {
    return new DateTime(null, options)
        .setTimestamp(timestamp);
};

/**
 * Create a new DateTime for the current time.
 * @param {object} [options] Options for the new DateTime.
 * @param {string} [options.timeZone] The timeZone to use.
 * @param {string} [options.locale] The locale to use.
 * @return {DateTime} A new DateTime object.
 */
export function now(options = {}) {
    return new DateTime(null, options);
};
