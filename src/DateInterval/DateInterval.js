class DateInterval
{

    /**
     * New DateInterval constructor
     * @param {string} [interval] The ISO interval to use for the new interval
     * @returns {DateInterval} The new DateInterval object
     */
    constructor(interval = '')
    {
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
     * Format the current interval with a PHP DateInterval format string
     * @param {string} formatString The string to use for formatting
     * @returns {string} The formatted string of the current DateInterval
     */
    format(formatString)
    {
        let output = '';
        let prefixed = false;

        formatString.split('').forEach(char =>
        {
            if (!prefixed && char === '%') {
                prefixed = true;
                return;
            }

            if (!prefixed || !DateInterval.formatData[char]) {
                output += char;
                prefixed = false;
                return;
            }

            output += DateInterval.formatData[char](this);
        });

        return output;
    }

    /**
     * Format the current interval to a relative time string
     * @param {int} [maxValues=1] The maximum number of values to include in the output
     * @returns {string} The formatted string of the current DateInterval
     */
    toString(maxValues = 1)
    {
        const formats = [];

        if (maxValues > 0 && this.y) {
            formats.push(Math.abs(this.y) === 1 ? 'year' : 'years');
            maxValues--;
        }

        if (maxValues > 0 && this.m) {
            formats.push(Math.abs(this.m) === 1 ? 'month' : 'months');
            maxValues--;
        }

        if (maxValues > 0 && this.d) {
            formats.push(Math.abs(this.d) === 1 ? 'day' : 'days');
            maxValues--;
        }

        if (maxValues > 0 && this.h) {
            formats.push(Math.abs(this.h) === 1 ? 'hour' : 'hours');
            maxValues--;
        }

        if (maxValues > 0 && this.i) {
            formats.push(Math.abs(this.i) === 1 ? 'minute' : 'minutes');
            maxValues--;
        }

        if (maxValues > 0 && this.s) {
            formats.push(Math.abs(this.s) === 1 ? 'second' : 'seconds');
            maxValues--;
        }

        return formats.length > 0 ?
            DateInterval.lang.relative[this.invert ? 'ago' : 'in']
                .replace(
                    '{interval}',
                    this.format(
                        formats.map(f => DateInterval.lang.intervals[f])
                            .join(DateInterval.lang.seperator)
                    )
                ) :
            DateInterval.lang.relative.now;
    }

    /**
     * Create a new DateInterval from the relative parts of the string
     * @param {string} time The date with relative parts
     * @returns {DateInterval} The new DateInterval object
     */
    static fromString(time)
    {
        const interval = new this;
        const regex = new RegExp(DateInterval.stringRegex, 'gi');

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
     * Format a number to string (optionally zero-padded)
     * @param {int} value The number to format
     * @param {int} [padding] The number of digits to pad the number to
     * @returns {string} The formatted number
     */
    static _formatNumber(number, padding = 0)
    {
        return `${number}`.padStart(padding, 0);
    }

}