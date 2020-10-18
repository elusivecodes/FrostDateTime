class DateFormatter {

    constructor(locale) {
        this.locale = locale;

        this.formatters = {};
    }

    static load(locale) {
        if (!locale) {
            locale = Intl.DateTimeFormat().resolvedOptions().locale;
        }

        if (!(locale in this.formatters)) {
            this.formatters[locale] = new this(locale);
        }

        return this.formatters[locale];
    }

    /**
     * Format a number to an offset string.
     * @param {number} offset The offset to format.
     * @param {Boolean} [useColon=true] Whether to use a colon seperator.
     * @param {Boolean} [optionalMinutes=false] Whether minutes are optional.
     * @returns {string} The formatted offset string.
     */
    static formatOffset(offset, useColon = true, optionalMinutes = false) {
        const hours = Math.abs(
            (offset / 60) | 0
        );
        const minutes = Math.abs(offset % 60);

        const sign = offset > 0 ?
            '-' :
            '+';
        const hourString = `${hours}`.padStart(2, 0);
        const minuteString = minutes || !optionalMinutes ?
            `${minutes}`.padStart(2, 0) :
            '';
        const colon = useColon && minuteString ?
            ':' :
            '';

        return `${sign}${hourString}${colon}${minuteString}`;
    }

}

DateFormatter.formatters = {};
