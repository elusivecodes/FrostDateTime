/**
 * DateTime Output
 */

Object.assign(DateTime.prototype, {

    /**
     * Format the current date with a PHP DateTime format string.
     * @param {string} formatString The string to use for formatting.
     * @returns {string} The formatted date string.
     */
    format(formatString) {
        let escaped = false;
        return [...formatString].reduce(
            (acc, char) => {
                if (
                    !escaped &&
                    char === '\\'
                ) {
                    escaped = true;
                } else if (
                    escaped ||
                    !this.constructor._formatData[char] ||
                    !this.constructor._formatData[char].output
                ) {
                    acc += char;
                    escaped = false;
                } else {
                    acc += this.constructor._formatData[char].output(this);
                }
                return acc;
            },
            ''
        );
    },

    /**
     * Format the current date using "D M d Y".
     * @returns {string} The formatted date string.
     */
    toDateString() {
        return this.format(this.constructor.formats.date)
    },

    /**
     * Format the current date using Date's native "toLocaleDateString" method.
     * @param {string|string[]} [locales] The locale(s) to use for formatting.
     * @param {object} [options] The options to use for formatting.
     * @param {string} [options.localeMatcher] The locale matching algorithm to use.
     * @param {string} [options.timeZone] The time zone to use.ANGLE_instanced_arrays
     * @param {Boolean} [options.hour12] Whether to use 12-hour time.
     * @param {string} [options.hourCycle] The hour cycle to use.
     * @param {string} [options.formatMatcher] The format matching algorithm to use.
     * @param {string} [options.weekday] The method to represent the weekday.
     * @param {string} [options.era] The method to represent the era.
     * @param {string} [options.year] The method to represent the year.
     * @param {string} [options.month] The method to represent the month.
     * @param {string} [options.day] The method to represent the day.
     * @param {string} [options.hour] The method to represent the hour.
     * @param {string} [options.minute] The method to represent the minute.
     * @param {string} [options.second] The method to represent the second.
     * @param {string} [options.timeZoneName] The method to represent the time zone name.
     * @returns {string} The formatted date string.
     */
    toLocaleDateString(locales, options) {
        return this._utcDate.toLocaleDateString(
            locales || this.constructor.defaultLocale,
            {
                timeZone: this._timeZone,
                ...options
            }
        );
    },

    /**
     * Format the current date using Date's native "toLocaleString" method.
     * @param {string|string[]} [locales] The locale(s) to use for formatting.
     * @param {object} [options] The options to use for formatting.
     * @param {string} [options.localeMatcher] The locale matching algorithm to use.
     * @param {string} [options.timeZone] The time zone to use.ANGLE_instanced_arrays
     * @param {Boolean} [options.hour12] Whether to use 12-hour time.
     * @param {string} [options.hourCycle] The hour cycle to use.
     * @param {string} [options.formatMatcher] The format matching algorithm to use.
     * @param {string} [options.weekday] The method to represent the weekday.
     * @param {string} [options.era] The method to represent the era.
     * @param {string} [options.year] The method to represent the year.
     * @param {string} [options.month] The method to represent the month.
     * @param {string} [options.day] The method to represent the day.
     * @param {string} [options.hour] The method to represent the hour.
     * @param {string} [options.minute] The method to represent the minute.
     * @param {string} [options.second] The method to represent the second.
     * @param {string} [options.timeZoneName] The method to represent the time zone name.
     * @returns {string} The formatted date string.
     */
    toLocaleString(locales, options) {
        return this._utcDate.toLocaleString(
            locales || this.constructor.defaultLocale,
            {
                timeZone: this._timeZone,
                ...options
            }
        );
    },

    /**
     * Format the current date using Date's native "toLocaleTimeString" method.
     * @param {string|string[]} [locales] The locale(s) to use for formatting.
     * @param {object} [options] The options to use for formatting.
     * @param {string} [options.localeMatcher] The locale matching algorithm to use.
     * @param {string} [options.timeZone] The time zone to use.ANGLE_instanced_arrays
     * @param {Boolean} [options.hour12] Whether to use 12-hour time.
     * @param {string} [options.hourCycle] The hour cycle to use.
     * @param {string} [options.formatMatcher] The format matching algorithm to use.
     * @param {string} [options.weekday] The method to represent the weekday.
     * @param {string} [options.era] The method to represent the era.
     * @param {string} [options.year] The method to represent the year.
     * @param {string} [options.month] The method to represent the month.
     * @param {string} [options.day] The method to represent the day.
     * @param {string} [options.hour] The method to represent the hour.
     * @param {string} [options.minute] The method to represent the minute.
     * @param {string} [options.second] The method to represent the second.
     * @param {string} [options.timeZoneName] The method to represent the time zone name.
     * @returns {string} The formatted date string.
     */
    toLocaleTimeString(locales, options) {
        return this._utcDate.toLocaleTimeString(
            locales || this.constructor.defaultLocale,
            {
                timeZone: this._timeZone,
                ...options
            }
        );
    },

    /**
     * Format the current date using "Y-m-d\TH:i:s.vP".
     * @returns {string} The formatted date string.
     */
    toISOString() {
        return this.format(this.constructor.formats.rfc3339_extended)
    },

    /**
     * Format the current date using "D M d Y H:i:s O (e)".
     * @returns {string} The formatted date string.
     */
    toString() {
        return this.format(this.constructor.formats.string);
    },

    /**
     * Format the current date using "H:i:s O (e)".
     * @returns {string} The formatted date string.
     */
    toTimeString() {
        return this.format(this.constructor.formats.time);
    },

    /**
     * Format the current date in UTC timeZone using "D M d Y H:i:s O (e)".
     * @returns {string} The formatted date string.
     */
    toUTCString() {
        return new DateTime(this.getTime(), 'UTC')
            .toString();
    }

});
