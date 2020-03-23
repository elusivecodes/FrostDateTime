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
     * Format a number to an offset string.
     * @param {number} offset The offset to format.
     * @param {Boolean} [useColon=true] Whether to use a colon seperator.
     * @returns {string} The formatted offset string.
     */
    _formatOffset(offset, useColon = true) {
        const sign = offset > 0 ?
            '-' :
            '+';
        const hours = this._formatNumber(
            Math.abs(
                (offset / 60) | 0
            ),
            2
        );
        const minutes = this._formatNumber(
            Math.abs(offset % 60),
            2
        );
        const colon = useColon ?
            ':' :
            '';
        return `${sign}${hours}${colon}${minutes}`;
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
            (parseInt(day) + 6) % 7
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
    }

});
