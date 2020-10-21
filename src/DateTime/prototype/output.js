/**
 * DateTime Output
 */

Object.assign(DateTime.prototype, {

    /**
     * Format the current date using a format string.
     * @param {string} formatString The format string.
     * @returns {string} The formatted date string.
     */
    format(formatString) {
        let match,
            output = '';

        while (formatString && (match = formatString.match(this.constructor._formatTokenRegExp))) {
            const token = match[1],
                position = match.index,
                length = match[0].length;

            if (!(token in DateFormatter._formatDate)) {
                throw new Error(`Invalid token in DateTime format: ${token}`);
            }

            if (position) {
                const formatTemp = formatString.substring(0, position);
                output += this.constructor._unescapeOutput(formatTemp);
            }

            output += DateFormatter._formatDate[token].output(this, length);
            formatString = formatString.substring(position + length);
        }

        output += this.constructor._unescapeOutput(formatString);

        return output;
    },

    /**
     * Format the current date using "eee MMM dd yyyy".
     * @returns {string} The formatted date string.
     */
    toDateString() {
        return this.format(this.constructor.formats.date)
    },

    /**
     * Format the current date using "yyyy-MM-dd'THH:mm:ss.SSSSSSxxx".
     * @returns {string} The formatted date string.
     */
    toISOString() {
        return this.constructor.fromDate(this._utcDate, {
            locale: 'en-US',
            timeZone: 'UTC'
        }).format(this.constructor.formats.rfc3339_extended);
    },

    /**
     * Format the current date using "eee MMM dd yyyy HH:mm:ss xx (VV)".
     * @returns {string} The formatted date string.
     */
    toString() {
        return this.format(this.constructor.formats.string);
    },

    /**
     * Format the current date using "HH:mm:ss xx (VV)".
     * @returns {string} The formatted date string.
     */
    toTimeString() {
        return this.format(this.constructor.formats.time);
    },

    /**
     * Format the current date in UTC timeZone using "eee MMM dd yyyy HH:mm:ss xx (VV)".
     * @returns {string} The formatted date string.
     */
    toUTCString() {
        return this.constructor.fromDate(this._utcDate, {
            locale: this.getLocale(),
            timeZone: 'UTC'
        }).toString();
    }

});
