/**
 * DateInterval (Static)
 */

Object.assign(DateInterval, {

    /**
     * Create a new DateInterval from the relative parts of the string.
     * @param {string} durationString The date with relative parts.
     * @returns {DateInterval} A new DateInterval object.
     */
    fromString(durationString) {
        const interval = new this,
            regExp = new RegExp(this._stringRegExp);

        let match;
        while (match = regExp.exec(durationString)) {
            const value = parseInt(match[1]);

            if (match[2]) {
                // years
                interval.y += value;
            } else if (match[3]) {
                // months
                interval.m += value;
            } else if (match[4]) {
                // fortnights
                interval.d += value * 14;
            } else if (match[5]) {
                // weeks
                interval.d += value * 7;
            } else if (match[6]) {
                // days
                interval.d += value;
            } else if (match[7]) {
                // hours
                interval.h += value;
            } else if (match[8]) {
                // minutes
                interval.i += value;
            } else if (match[9]) {
                // seconds
                interval.s += value;
            }
        }

        return interval;
    },

    /**
     * Format a number to string (optionally zero-padded).
     * @param {number} value The number to format.
     * @param {number} [padding] The number of digits to zero-pad to.
     * @returns {string} The formatted number string.
     */
    _formatNumber(number, padding = 0) {
        return `${number}`.padStart(padding, 0);
    }

});
