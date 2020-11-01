class DateInterval {

    constructor(options) {
        this.y = 0;
        this.m = 0;
        this.d = 0;
        this.h = 0;
        this.i = 0;
        this.s = 0;
        this.f = 0;

        this.days = null;
        this.invert = false;
    }

    /**
     * Format the current interval with a PHP DateInterval format string.
     * @param {string} formatString The format string to use.
     * @returns {string} The formatted date interval.
     */
    format(formatString) {
        let escaped = false;
        return [...formatString].reduce(
            (acc, char) => {
                if (!escaped && char === '%') {
                    escaped = true;
                } else if (!escaped || !this.constructor._formatData[char]) {
                    acc += char;
                } else {
                    acc += this.constructor._formatData[char](this);
                    escaped = false;
                }
                return acc;
            },
            ''
        );
    }

    toISOString() {
        let output = 'P';

        if (this.y) {
            output += `Y${this.y}`;
        }

        if (this.m) {
            output += `M${this.m}`;
        }

        if (this.d) {
            output += `D${this.d}`;
        }

        if (this.h || this.i || this.s) {
            output += 'T';
        }

        if (this.h) {
            output += `H${this.h}`;
        }

        if (this.i) {
            output += `M${this.i}`;
        }

        if (this.s) {
            output += `S${this.i}`;
        }

        return output;
    }

    toString() {
        return this.formatter.format(amount, unit);
    }

    static fromISOString(string, options) {
        const isoMatch = string.match(this.constructor._isoRegExp);

        if (!isoMatch) {
            throw new Error('Invalid string supplied');
        }

        const interval = new this(options);

        if (isoMatch[1]) {
            interval.y += parseInt(isoMatch[1]);
        }

        if (isoMatch[2]) {
            interval.m += parseInt(isoMatch[2]);
        }

        if (isoMatch[3]) {
            interval.d += parseInt(isoMatch[3]);
        }

        if (isoMatch[4]) {
            interval.d += parseInt(isoMatch[4]) * 7;
        }

        if (isoMatch[5]) {
            interval.h += parseInt(isoMatch[5]);
        }

        if (isoMatch[6]) {
            interval.i += parseInt(isoMatch[6]);
        }

        if (isoMatch[7]) {
            interval.s += parseInt(isoMatch[7]);
        }

        return interval;
    }

    static fromUnit(amount, timeUnit, options) {
        const interval = new this(options);

        timeUnit = timeUnit.toLowerCase();

        switch (timeUnit) {
            case 'second':
            case 'seconds':
                interval.s = amount;
                break;
            case 'minute':
            case 'minutes':
                interval.i = amount;
                break;
            case 'hour':
            case 'hours':
                interval.h = amount;
                break;
            case 'day':
            case 'days':
                interval.d = amount;
                break;
            case 'week':
            case 'weeks':
                interval.d = amount * 7;
                break;
            case 'month':
            case 'months':
                interval.m = amount;
                break;
            case 'year':
            case 'years':
                interval.y = amount;
                break;
            default:
                throw new Error('Invalid time unit supplied');
        }

        return interval;
    }

}

// ISO RegExp
DateInterval._isoRegExp = /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:(\d+)W)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?|)$/;
