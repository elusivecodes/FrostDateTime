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

        if (!interval) {
            return;
        }

        if (this._parseISO(interval)) {
            return;
        }

        if (this._parseDateTime(interval)) {
            return;
        }

        throw new Error('Invalid interval supplied');
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

    /**
     * Format the current interval to a relative time string.
     * @param {number} [maxValues=1] The maximum number of values to return.
     * @returns {string} The formatted relative time string.
     */
    toString(maxValues = 1) {
        const formats = [],
            keys = this.constructor._formatKeys.slice();

        let key;
        while (key = keys.shift()) {
            if (maxValues <= 0) {
                break;
            }

            if (!this[key]) {
                continue;
            }

            const index = Math.abs(this[key]) === 1 ?
                0 :
                1;
            formats.push(
                this.constructor.langs[key][index]
            );
            maxValues--;
        }

        return formats.length ?
            this.constructor.lang.relative[this.invert ?
                'ago' :
                'in'
            ].replace(
                '%n',
                this.format(
                    formats
                        .map(f => this.constructor.lang.intervals[f])
                        .join(this.constructor.lang.seperator)
                )
            ) :
            this.constructor.lang.relative.now;
    }

}
