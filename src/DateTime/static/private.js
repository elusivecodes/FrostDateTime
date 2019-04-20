/**
 * DateTime (Static) Internal
 */

Object.assign(DateTime, {

    /**
     * Format a number to string using localized digits (and optionally zero-padded).
     * @param {number} value The number to format.
     * @param {number} [padding] The number of digits to zero-pad to.
     * @returns {string} The formatted number string.
     */
    _formatNumber(value, padding) {
        value = value.toString();

        if (padding) {
            value = value.padStart(padding, 0);
        }

        return this.lang.numbers ?
            value.replace(/./g, match => this.lang.numbers[match]) :
            value;
    },

    /**
     * Create a Date object set to Thursday of the ISO week.
     * @param {number} year The year.
     * @param {number} month The month.
     * @param {number} date The date.
     * @returns {Date} A new Date object.
     */
    _isoDate(...args) {
        const date = new Date(Date.UTC(...args)),
            day = this._isoDay(date.getUTCDay());
        date.setUTCDate(date.getUTCDate() - day + 4);
        return date;
    },

    /**
     * Convert a day of the week to a ISO format.
     * @param {number} day The day of the week. (0 - Sunday, 6 - Saturday)
     * @returns {number} The day of the week in ISO format. (1 - Monday, 7 - Sunday)
     */
    _isoDay(day) {
        return ((day + 6) % 7) + 1;
    },

    /**
     * Parse a number from a string using localized digits.
     * @param {string} value The formatted number string.
     * @returns {number} The parsed number.
     */
    _parseNumber(value) {
        if (this.lang.numbers) {
            value = value.replace(/./g, match => this.lang.numbers.findIndex(match));
        }

        return parseInt(value);
    },

    /**
     * Return a timezone for a date using an abbreviated name or offset.
     * @param {number|number[]|string|Date|DateTime} date The date to use when testing.
     * @param {string} [abbr] The timezone abbreviation.
     * @param {number} [offset] The timezone offset.
     * @returns {string} The timezone name.
     */
    _timezoneFromAbbrOffset(date, abbr = null, offset = null) {
        if (abbr === 'UTC' || offset === 0) {
            return 'UTC';
        }

        const tempDate = new DateTime(date, 'UTC');
        for (const timezone in this._timezones) {
            try {
                tempDate.setTimezone(tempDate, true);
                const dateOffset = tempDate.getTimezoneOffset();

                // compensate for DST transitions
                if (offset !== null && offset !== dateOffset) {
                    tempDate.setTime(tempDate.getTime() - (dateOffset - offset) * 60000);
                }

                if (
                    (abbr === null || abbr === tempDate.getTimezoneAbbr()) &&
                    (offset === null || offset === tempDate.getTimezoneOffset())
                ) {
                    return timezone;
                }
            } catch (error) { }
        }
    }

});
