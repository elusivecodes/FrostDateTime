Object.assign(DateTime.prototype, {

    checkDST() {
        const offset = DateTime.calculateTimezoneOffset(this._timezone, this.getTime());

        if (offset !== this.getTimezoneOffset()) {
            this.setTimezoneOffset(offset);
        }

        return this;
    },

    dateSuffix() {
        return DateTime.dateSuffix(this.getDate());
    },

    daysInMonth() {
        return DateTime.daysInMonth(this.getFullYear(), this.getMonth() + 1);
    },

    daysInYear() {
        return DateTime.daysInYear(this.getFullYear());
    },

    format(formatString) {
        const formatTokens = DateTime.formatTokens(true);

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
            output += DateTime.formatData[key].output(this);
        });

        return output;
    },

    isDST() {
        return this.getTimezoneOffset() < this.standardOffset();
    },

    isLeapYear() {
        return DateTime.isLeapYear(this.getFullYear());
    },

    isoWeeksInYear() {
        return DateTime.isoWeeksInYear(this.getFullYear());
    },

    standardOffset() {
        const jan = new DateTime(this.getFullYear(), 0, 1);
        jan.setTimezone(this.timezone());

        const jul = new DateTime(this.getFullYear(), 6, 1);
        jul.setTimezone(this.timezone());

        return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    },

    toObject() {
        return {
            timezone: this.timezone(),
            offset: this.offset(),
            year: this.year(),
            month: this.month(),
            date: this.date(),
            dayOfYear: this.dayOfYear(),
            hours: this.hours(),
            minutes: this.minutes(),
            seconds: this.seconds(),
            milliseconds: this.milliseconds(),
            timestamp: this.timestamp()
        }
    }

});