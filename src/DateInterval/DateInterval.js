/**
 * DateInterval class
 * @class
 */
class DateInterval {

    /**
     * New DateInterval constructor.
     * @param {string} [interval] The ISO duration string.
     * @returns {DateInterval} A new DateInterval object.
     */
    constructor(interval = '') {
        this.y = 0;
        this.m = 0;
        this.d = 0;
        this.h = 0;
        this.i = 0;
        this.s = 0;
        this.f = 0;

        this.days = null;
        this.invert = false;

        const match = interval.match(DateInterval.isoRegex);

        if (match) {
            this.y += match[1];
            this.m += match[2];
            this.d += match[3];
            this.d += match[4] * 7;
            this.h += match[5];
            this.i += match[6];
            this.s += match[7];
        }
    }

    /**
     * Format the current interval with a PHP DateInterval format string.
     * @param {string} formatString The format string to use.
     * @returns {string} The formatted date interval.
     */
    format(formatString) {
        let output = '',
            prefixed = false;

        for (const char of [...formatString]) {
            if (!prefixed && char === '%') {
                prefixed = true;
                continue;
            }

            if (!prefixed || !DateInterval.formatData[char]) {
                output += char;
                prefixed = false;
                continue;
            }

            output += DateInterval.formatData[char](this);
        }

        return output;
    }

    /**
     * Format the current interval to a relative time string.
     * @param {number} [maxValues=1] The maximum number of values to return.
     * @returns {string} The formatted relative time string.
     */
    toString(maxValues = 1) {
        const formats = [],
            keys = ['y', 'm', 'd', 'h', 'i', 's'];

        while (maxValues > 0 && keys.length) {
            const key = keys.shift();

            if (!this[key]) {
                continue;
            }

            formats.push(
                DateInterval.langs[key][Math.abs(this[key] === 1 ?
                    0 :
                    1
                )]
            );
            maxValues--;
        }

        return formats.length ?
            DateInterval.lang.relative[this.invert ?
                'ago' :
                'in'
            ].replace(
                '%n',
                this.format(
                    formats.map(f => DateInterval.lang.intervals[f])
                        .join(DateInterval.lang.seperator)
                )
            ) :
            DateInterval.lang.relative.now;
    }

    /**
     * Create a new DateInterval from the relative parts of the string.
     * @param {string} time The date with relative parts.
     * @returns {DateInterval} A new DateInterval object.
     */
    static fromString(time) {
        const interval = new this,
            regex = new RegExp(DateInterval.stringRegex, 'gi');

        let match;
        while (match = regex.exec(time)) {
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
    }

    /**
     * Format a number to string (optionally zero-padded).
     * @param {number} value The number to format.
     * @param {number} [padding] The number of digits to zero-pad to.
     * @returns {string} The formatted number string.
     */
    static _formatNumber(number, padding = 0) {
        return `${number}`.padStart(padding, 0);
    }

}
