Object.assign(DateTime, {

    /**
     * Format a number to string using localized digits (and optionally zero-padded)
     * @param {int} value The number to format
     * @param {int} [padding] The number of digits to pad the number to
     * @returns {string} The formatted number
     */
    _formatNumber(value, padding)
    {
        value = value.toString();

        if (padding) {
            value = value.padStart(padding, 0);
        }

        return this.lang.numbers ?
            value.replace(/./g, match => this.lang.numbers[match]) :
            value;
    },

    /**
     * Create a Date object set to Thursday of the ISO week
     * @param {int} year The year to set
     * @param {int} month The month to set (0, 11)
     * @param {int} date The date of the month to set
     * @returns {Date}
     */
    _isoDate(...args)
    {
        const date = new Date(Date.UTC(...args));
        const day = this._isoDay(date.getUTCDay());
        date.setUTCDate(date.getUTCDate() - day + 4);
        return date;
    },

    /**
     * Convert a day of the week to a ISO format
     * @param {int} day The day of the week (0 - Sunday, 6 - Saturday)
     * @returns {int} The ISO day of the week (1 - Monday, 7 - Sunday)
     */
    _isoDay(day)
    {
        return ((day + 6) % 7) + 1;
    },

    /**
     * Parse a number from a string using localized digits
     * @param {string} value The formatted number
     * @returns {int} The numeric version of the number
     */
    _parseNumber(value)
    {
        if (this.lang.numbers) {
            value = value.replace(/./g, match => this.lang.numbers.findIndex(match));
        }

        return parseInt(value);
    }

});