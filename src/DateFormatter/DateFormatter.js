/**
 * DateFormatter class
 * @class
 */
class DateFormatter {

    /**
     * New DateFormatter constructor.
     * @param {string} [locale] The locale to load.
     * @returns {DateFormatter} A new DateFormatter object.
     */
    constructor(locale) {
        this.locale = locale;
        this._weekStartOffset = this.constructor.getWeekStartOffset(this.locale);
        this._data = {};
    }

    /**
     * Format a day as a locale string.
     * @param {number} number The day to format (0-6).
     * @param {string} [type=long] The formatting type.
     * @param {Boolean} [standalone=true] Whether the value is standalone.
     * @returns {string} The formatted string.
     */
    formatDay(day, type = 'long', standalone = true) {
        return this.getDays(type, standalone)[day];
    }

    /**
     * Format a day period as a locale string.
     * @param {number} number The period to format (0-1).
     * @param {string} [type=long] The formatting type.
     * @returns {string} The formatted string.
     */
    formatDayPeriod(period, type = 'long') {
        return this.getDayPeriods(type)[period];
    }

    /**
     * Format an era as a locale string.
     * @param {number} number The period to format (0-1).
     * @param {string} [type=long] The formatting type.
     * @returns {string} The formatted string.
     */
    formatEra(era, type = 'long') {
        return this.getEras(type)[era];
    }

    /**
     * Format a month as a locale string.
     * @param {number} number The month to format (1-12).
     * @param {string} [type=long] The formatting type.
     * @param {Boolean} [standalone=true] Whether the value is standalone.
     * @returns {string} The formatted string.
     */
    formatMonth(month, type = 'long', standalone = true) {
        return this.getMonths(type, standalone)[month - 1];
    }

    /**
     * Format a number as a locale number string.
     * @param {number} number The number to format.
     * @returns {string} The formatted string.
     */
    formatNumber(number, padding = 0) {
        const numbers = this.getNumbers();
        return `${number}`
            .padStart(padding, 0)
            .replace(/\d/g, match => numbers[match])
    }

    /**
     * Format a time zone as a locale string.
     * @param {Date} date The date to use.
     * @param {string} timeZone The time zone to format.
     * @param {string} [type=long] The formatting type.
     * @returns {string} The formatted string.
     */
    formatTimeZoneName(date, timeZone, type = 'long') {
        return this._makeFormatter({ second: 'numeric', timeZone, timeZoneName: type })
            .formatToParts(date)
            .find(part => part.type === 'timeZoneName')
            .value;
    }

    /**
     * Parse a day from a locale string.
     * @param {string} value The value to parse.
     * @param {string} [type=long] The formatting type.
     * @param {Boolean} [standalone=true] Whether the value is standalone.
     * @returns {number} The month number (0-6).
     */
    parseDay(value, type = 'long', standalone = true) {
        return this.getDays(type, standalone).indexOf(value) || 7;
    }

    /**
     * Parse a day period from a locale string.
     * @param {string} value The value to parse.
     * @param {string} [type=long] The formatting type.
     * @returns {number} The day period (0-1).
     */
    parseDayPeriod(value, type = 'long') {
        return this.getDayPeriods(type).indexOf(value);
    }

    /**
     * Parse an era from a locale string.
     * @param {string} value The value to parse.
     * @param {string} [type=long] The formatting type.
     * @returns {number} The era (0-1).
     */
    parseEra(value, type = 'long') {
        return this.getEras(type).indexOf(value);
    }

    /**
     * Parse a month from a locale string.
     * @param {string} value The value to parse.
     * @param {string} [type=long] The formatting type.
     * @param {Boolean} [standalone=true] Whether the value is standalone.
     * @returns {number} The month number (1-12).
     */
    parseMonth(value, type = 'long', standalone = true) {
        return this.getMonths(type, standalone).indexOf(value) + 1;
    }

    /**
     * Parse a number from a locale number string.
     * @param {string} value The value to parse.
     * @returns {number} The parsed number.
     */
    parseNumber(value) {
        const numbers = this.getNumbers();
        return parseInt(
            `${value}`.replace(/./g, match => numbers.indexOf(match))
        );
    }

    /**
     * Create a Date object set to Thursday of the local week.
     * @param {number} year The year.
     * @param {number} month The month.
     * @param {number} date The date.
     * @returns {Date} A new Date object.
     */
    weekDate(...args) {
        if (args.length > 1) {
            args[1]--;
        }

        const date = new Date(
            Date.UTC(...args)
        );

        date.setUTCDate(
            date.getUTCDate()
            - this.weekDay(date.getUTCDay())
            + this.weekDay(4)
        );

        return date;
    }

    /**
     * Convert a day of the week to a local format.
     * @param {number} day The day of the week.
     * @returns {number} The local day of the week.
     */
    weekDay(day) {
        return (7 + parseInt(day) - this._weekStartOffset) % 7 || 7;
    }

    /**
     * Format a number to an offset string.
     * @param {number} offset The offset to format.
     * @param {Boolean} [useColon=true] Whether to use a colon seperator.
     * @param {Boolean} [optionalMinutes=false] Whether minutes are optional.
     * @returns {string} The formatted offset string.
     */
    static formatOffset(offset, useColon = true, optionalMinutes = false) {
        const hours = Math.abs(
            (offset / 60) | 0
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
    }

    /**
     * Get the formatting type from the component token length.
     * @param {number} length The component token length.
     * @returns {string} The formatting type.
     */
    static getType(length) {
        switch (length) {
            case 5:
                return 'narrow';
            case 4:
                return 'long';
            default:
                return 'short';
        }
    }

    /**
     * Get the week start offset for a locale.
     * @param {string} [locale] The locale to load.
     * @returns {number} The week start offset.
     */
    static getWeekStartOffset(locale) {
        let weekStart;
        const localeTest = locale.toLowerCase().split('-');
        while (!weekStart && localeTest.length) {
            for (const start in this._weekStart) {
                const locales = this._weekStart[start];

                if (locales.includes(localeTest.join('-'))) {
                    weekStart = start;
                    break;
                }
            }

            localeTest.pop();
        }

        return weekStart ?
            weekStart - 2 :
            0; 
    }

    /**
     * Load a (cached) DateFormatter for a locale.
     * @param {string} [locale] The locale to load.
     * @returns {DateFormatter} The cached DateFormatter object.
     */
    static load(locale) {
        if (!locale) {
            locale = Intl.DateTimeFormat().resolvedOptions().locale;
        }

        if (!(locale in this._formatters)) {
            this._formatters[locale] = new this(locale);
        }

        return this._formatters[locale];
    }

}

// Cached formatters
DateFormatter._formatters = {};
