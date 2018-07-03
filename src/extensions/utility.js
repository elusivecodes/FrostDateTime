Object.assign(DateTime.prototype, {

    _checkOffset() {
        this._offset = DateTime.calculateTimezoneOffset(this._timezone, this._date.getTime());

        return this;
    },

    dateSuffix() {
        return DateTime.dateSuffix(this.getDate());
    },

    daysInMonth() {
        return DateTime.daysInMonth(this.getFullYear(), this.getMonth());
    },

    daysInYear() {
        return DateTime.daysInYear(this.getFullYear());
    },

    diff(other, absolute = false) {
        const interval = new DateInterval();

        const tempDate = new Date(this.getTime());
        const otherDate = new Date(other.getTime());

        interval.y = Math.abs(tempDate.getUTCFullYear() - otherDate.getUTCFullYear());
        interval.m = Math.abs(tempDate.getUTCMonth() - otherDate.getUTCMonth());
        interval.d = Math.abs(tempDate.getUTCDate() - otherDate.getUTCDate());
        interval.h = Math.abs(tempDate.getUTCHours() - otherDate.getUTCHours());
        interval.i = Math.abs(tempDate.getUTCMinutes() - otherDate.getUTCMinutes());
        interval.s = Math.abs(tempDate.getUTCSeconds() - otherDate.getUTCSeconds());
        interval.f = Math.abs((tempDate.getUTCMilliseconds() - otherDate.getUTCMilliseconds()) * 1000);
        interval.days = Math.abs((tempDate - otherDate) / 86400000);
        interval.invert = ! absolute && date < otherDate;

        return interval;
    },

    format(formatString) {
        const formatTokens = DateTime.formatTokens(true);
        const date = new Date(this.getLocalTime());

        let output = '';
        let escaped = false;
        formatString.split('').forEach(char => {
            if ( ! escaped && char === '\\') {
                escaped = true;
                return;
            }

            if (escaped || ! formatTokens[char]) {
                output += char;
                escaped = false;
                return;
            }

            const key = formatTokens[char];
            output += DateTime.formatData[key].output(date, this);
        });

        return output;
    },

    isDST() {
        return this._offset < this.standardOffset();
    },

    isLeapYear() {
        return DateTime.isLeapYear(this.getFullYear());
    },

    isoWeeksInYear() {
        return DateTime.isoWeeksInYear(this.getFullYear());
    },

    modify(interval, invert = false) {
        if (Frost.isString(interval)) {
            interval = DateInterval.fromString(interval);
        }

        let modify = 1;
 
        if (interval.invert) {
            modify *= -1;
        }
  
        if (invert) {
            modify *= -1;
        }

        const tempDate = new Date(this.getLocalTime());

        if (interval.y) {
            tempDate.setUTCFullYear(tempDate.getUTCFullYear() + (interval.y * modify));
        }

        if (interval.m) {
            tempDate.setUTCMonth(tempDate.getUTCMonth() + (interval.m * modify));
        }

        if (interval.d) {
            tempDate.setUTCDate(tempDate.getUTCDate() + (interval.d * modify));
        }

        if (interval.h) {
            tempDate.setUTCHours(tempDate.getUTCHours() + (interval.h * modify));
        }

        if (interval.i) {
            tempDate.setUTCMinutes(tempDate.getUTCMinutes() + (interval.i * modify));
        }

        if (interval.s) {
            tempDate.setUTCSeconds(tempDate.getUTCSeconds() + (interval.s * modify));
        }

        if (interval.f) {
            tempDate.setUTCTime(tempDate.getUTCTime() + (interval.f * modify));
        }

        return this.setLocalTime(tempDate.getTime());
    },

    standardOffset() {
        return DateTime.standardOffset(this.getFullYear(), this._timezone);
    }

});