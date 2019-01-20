Object.assign(DateTime.prototype, {

    /**
     * Format the current date with a PHP DateTime format string
     * @param {string} formatString The string to use for formatting
     * @returns {string} The formatted string of the current DateTime
     */
    format(formatString)
    {
        let output = '',
            escaped = false;

        formatString.split('')
            .forEach(char =>
            {
                if (!escaped && char === '\\') {
                    escaped = true;
                    return;
                }

                if (escaped || !DateTime.formatData[char] || !DateTime.formatData[char].output) {
                    output += char;
                    escaped = false;
                    return;
                }

                output += DateTime.formatData[char].output(this);
            }
            );

        return output;
    },

    /**
     * Format the current date using "D M d Y"
     * @returns {string} The formatted string of the current DateTime
     */
    toDateString()
    {
        return this.format(DateTime.formats.date)
    },

    /**
     * Format the current date using Date's native "toLocaleDateString" method
     * @param {string|array} [locales] The locale to use for formatting
     * @param {object} [options] Options to use for formatting
     * @returns {string} The formatted string of the current DateTime
     */
    toLocaleDateString(locales, options = {})
    {
        return this.utcDate.toLocaleDateString(
            locales || DateTime.defaultLocale,
            {
                timeZone: this.timezone,
                ...options
            }
        );
    },

    /**
     * Format the current date using Date's native "toLocaleString" method
     * @param {string|array} [locales] The locale to use for formatting
     * @param {object} [options] Options to use for formatting
     * @returns {string} The formatted string of the current DateTime
     */
    toLocaleString(locales, options = {})
    {
        return this.utcDate.toLocaleString(
            locales || DateTime.defaultLocale,
            {
                timeZone: this.timezone,
                ...options
            }
        );
    },

    /**
     * Format the current date using Date's native "toLocaleTimeString" method
     * @param {string|array} [locales] The locale to use for formatting
     * @param {object} [options] Options to use for formatting
     * @returns {string} The formatted string of the current DateTime
     */
    toLocaleTimeString(locales, options = {})
    {
        return this.utcDate.toLocaleTimeString(
            locales || DateTime.defaultLocale,
            {
                timeZone: this.timezone,
                ...options
            }
        );
    },

    /**
     * Format the current date using "Y-m-d\\TH:i:s.vP"
     * @returns {string} The formatted string of the current DateTime
     */
    toISOString()
    {
        return this.format(DateTime.formats.rfc3339_extended)
    },

    /**
     * Format the current date using "D M d Y H:i:s O (e)"
     * @returns {string} The formatted string of the current DateTime
     */
    toString()
    {
        return this.format(DateTime.formats.string);
    },

    /**
     * Format the current date using "H:i:s O (e)"
     * @returns {string} The formatted string of the current DateTime
     */
    toTimeString()
    {
        return this.format(DateTime.formats.time);
    },

    /**
     * Format the current date in UTC timezone using "D M d Y H:i:s O (e)"
     * @returns {string} The formatted string of the current DateTime
     */
    toUTCString()
    {
        return new DateTime(this.getTime(), 'UTC')
            .toString();
    }

});