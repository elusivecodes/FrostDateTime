/**
 * DateTime (Static) Helpers
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
            value.replace(
                /./g,
                match => this.lang.numbers[match]
            ) :
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
        const date = new Date(
            Date.UTC(...args)
        ),
            day = this._isoDay(date.getUTCDay());
        date.setUTCDate(
            date.getUTCDate()
            - day
            + 4
        );
        return date;
    },

    /**
     * Convert a day of the week to a ISO format.
     * @param {number} day The day of the week. (0 - Sunday, 6 - Saturday)
     * @returns {number} The day of the week in ISO format. (1 - Monday, 7 - Sunday)
     */
    _isoDay(day) {
        return (
            (day + 6) % 7
        ) + 1;
    },

    /**
     * Parse a number from a string using localized digits.
     * @param {string} value The formatted number string.
     * @returns {number} The parsed number.
     */
    _parseNumber(value) {
        if (this.lang.numbers) {
            value = value.replace(
                /./g,
                match => this.lang.numbers.findIndex(match)
            );
        }

        return parseInt(value);
    },

    /**
     * Return a timeZone and offset for a date using an abbreviated name or offset.
     * @param {null|number|number[]|string|Date|DateTime} [date] The date to use when testing.
     * @param {null|string} [abbr] The timeZone abbreviation.
     * @param {null|number} [offset] The timeZone offset.
     * @returns {array} An array containing the timeZone name and offset.
     */
    _timeZoneFromAbbrOffset(date = null, abbr = null, offset = null) {
        if (
            (
                abbr === null ||
                abbr === 'UTC'
            ) &&
            (
                offset === null ||
                offset === 0
            )
        ) {
            return ['UTC', 0];
        }

        const tempDate = new DateTime(date, 'UTC');
        const tempDateDst = new DateTime(date, 'UTC');
        tempDateDst.setTime(
            tempDateDst.getTime()
            - 3600000
        );

        for (const timeZone in this._timeZones) {
            try {
                tempDate.setTimeZone(timeZone, true);

                if (
                    (
                        abbr === null ||
                        abbr === tempDate.getTimeZoneAbbr()
                    ) &&
                    (
                        offset === null ||
                        offset === tempDate.getTimeZoneOffset()
                    )
                ) {
                    return [timeZone, tempDate.getTimeZoneOffset()];
                }

                tempDateDst.setTimeZone(timeZone, true);

                if (
                    tempDateDst.isDST() &&
                    (
                        abbr === null ||
                        abbr === tempDateDst.getTimeZoneAbbr()
                    ) &&
                    (
                        offset === null ||
                        offset === tempDateDst.getTimeZoneOffset()
                    )
                ) {
                    return [timeZone, tempDateDst.getTimeZoneOffset()];
                }
            } catch (error) { }
        }
    }

});
