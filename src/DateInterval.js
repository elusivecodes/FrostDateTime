class DateInterval {
    constructor(interval = '') {
        const match = interval.match(DateInterval.isoRegex);

        this.y = match[1] || 0;
        this.m = match[2] || 0;
        this.d = match[4] ? match[4] * 7 : match[3] || 0;
        this.h = match[5] || 0;
        this.i = match[6] || 0;
        this.s = match[7] || 0;

        this.days = null;
        this.invert = false;
    }

    format(formatString) {
        const formatTokens = {};

        Object.keys(this.formatData).forEach(key => {
            const token = this.formatData[key].token;
            formatTokens[token] = key;
        });

        let output = '';
        let prefixed = false;
        formatString.split('').forEach(char => {
            if ( ! prefixed && char === '%') {
                prefixed = true;
                return;
            }

            if ( ! prefixed || ! formatTokens[char]) {
                output += char;
                prefixed = false;
                return;
            }

            const key = formatTokens[char];
            output += DateInterval.formatData[key].output(this);
        });

        return output;
    }

    static fromString(string) {
        const interval = new DateInterval();

        const regex = new RegExp(DateInterval.stringRegex, 'gi');

        let match;
        while (match = regex.exec(string)) {
            const type = match[2];
            const value = parseInt(match[1]);
            if (type === 'year') {
                interval.y += value;
            } else if (type === 'month') {
                interval.m += value;
            } else if (type === 'day') {
                interval.d += value;
            } else if (type === 'fortnight' || type === 'forthnight') {
                interval.d += value * 14;
            } else if (type === 'week') {
                interval.d += value * 7;
            } else if (type === 'hour') {
                interval.h += value;
            } else if (type === 'min' || type === 'minute') {
                interval.i += value;
            } else if (type === 'sec' || type === 'second') {
                interval.s += value;
            }
        }

        return interval;
    }
}

frost.DateInterval = DateInterval;