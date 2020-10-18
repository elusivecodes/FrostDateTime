/**
 * DateTime Output
 */

Object.assign(DateTime.prototype, {

    format(formatString) {
        let match;
        let output = '';

        const unescapeOutput = a => {
            let output = '';
            let escaped = false;
            for (const char of a) {
                if (char === "'" && !escaped) {
                    escaped = true;
                    continue;
                }

                escaped = false;
                output += char;
            }
            return output;
        };

        while (formatString && (match = formatString.match(/(?<!\')([a-z])\1*/i))) {
            const token = match[1];
            if (!(token in DateFormatter._formatDate)) {
                throw new Error(`Invalid token in DateTime format: ${token}`);
            }

            const position = match.index;
            if (position) {
                const formatTemp = formatString.substring(0, position);
                output += unescapeOutput(formatTemp);
            }
            const length = match[0].length;
            output += DateFormatter._formatDate[token].output(this, length);

            formatString = formatString.substring(position + length);
        }

        output += unescapeOutput(formatString);

        return output;
    },

    /**
     * Format the current date using "D M d Y".
     * @returns {string} The formatted date string.
     */
    toDateString() {
        return this.format(this.constructor.formats.date)
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
        return new DateTime(null, 'UTC')
            .setTime(this.getTime())
            .toString();
    }

});
