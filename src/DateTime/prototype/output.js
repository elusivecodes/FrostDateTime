Object.assign(DateTime.prototype, {

    /**
     * Format the current date with a PHP DateTime format string.
     * @param {string} formatString The string to use for formatting.
     * @returns {string} The formatted date string.
     */
    format(formatString) {
        let output = '',
            escaped = false;

        for (const char of [...formatString]) {
            if (!escaped && char === '\\') {
                escaped = true;
                continue;
            }

            if (escaped || !DateTime.formatData[char] || !DateTime.formatData[char].output) {
                output += char;
                escaped = false;
                continue;
            }

            output += DateTime.formatData[char].output(this);
        }

        return output;
    },

    /**
     * Format the current date using "D M d Y".
     * @returns {string} The formatted date string.
     */
    toDateString() {
        return this.format(DateTime.formats.date)
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
            locales || DateTime.defaultLocale,
            {
                timeZone: this._timezone,
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
            locales || DateTime.defaultLocale,
            {
                timeZone: this._timezone,
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
            locales || DateTime.defaultLocale,
            {
                timeZone: this._timezone,
                ...options
            }
        );
    },

    /**
     * Format the current date using "Y-m-d\TH:i:s.vP".
     * @returns {string} The formatted date string.
     */
    toISOString() {
        return this.format(DateTime.formats.rfc3339_extended)
    },

    /**
     * Format the current date using "D M d Y H:i:s O (e)".
     * @returns {string} The formatted date string.
     */
    toString() {
        return this.format(DateTime.formats.string);
    },

    /**
     * Format the current date using "H:i:s O (e)".
     * @returns {string} The formatted date string.
     */
    toTimeString() {
        return this.format(DateTime.formats.time);
    },

    /**
     * Format the current date in UTC timezone using "D M d Y H:i:s O (e)".
     * @returns {string} The formatted date string.
     */
    toUTCString() {
        return new DateTime(this.getTime(), 'UTC')
            .toString();
    }

});
