Object.assign(DateTime.prototype, {

    setDate(date) {
        this._date.setUTCDate(date);

        return this.checkDST();
    },

    setDay(day) {
        let realDay = false;
        if (utility.isNumeric(day)) {
            realDay = day;
        } else {
            realDay = DateTime.getMonthFromName(day) ||
                DateTime.getMonthFromName(day, 'short') ||
                DateTime.getMonthFromName(day, 'min');
        }

        if (realDay === false) {
            return this;
        }

        return this.setDate(this.getDate() - this.getDay() + realDay);
    },

    setDayOfYear(day) {
        return this.setMonth(1).setDate(day);
    },

    setFullYear(year, month = null, date = null) {
        if (month === null) {
            month = this.getMonth();
        }

        let checkDate = false;
        if (date === null) {
            date = this.getDate();
            checkDate = true;
        }

        this._date.setUTCFullYear(year, month, date);

        if (checkDate && date != this.getDate()) {
            this._date.setUTCDate(0);
        }

        return this.checkDST();
    },

    setHours(hours, minutes = null, seconds = null, ms = null) {
        if (hours === null) {
            hours = this.getHours();
        }

        if (minutes === null) {
            minutes = this.getMinutes();
        }

        if (seconds === null) {
            seconds = this.getSeconds();
        }

        if (ms === null) {
            ms = this.getMilliseconds();
        }

        this._date.setUTCHours(hours, minutes, seconds, ms);

        return this.checkDST();
    },

    setIsoDay(day) {
        return this.setDate(this.getDate() - this.getIsoDay() + day);
    },

    setIsoWeek(week, day = null) {
        if (day === null) {
            day = this.getIsoDay();
        }

        this.setDayOfYear(4 + ((week - 1) * 7));

        return this.setIsoDay(day);
    },

    setIsoYear(year, week = null, day = null) {
        if (week === null) {
            week = this.getIsoWeek();
        }

        if (day === null) {
            day = this.getIsoDay();
        }

        this.setFullYear(year, 0, 4);

        return this.setIsoWeek(week, day);
    },

    setMilliseconds(ms) {
        this._date.setUTCMilliseconds(ms);

        return this.checkDST();
    },

    setMinutes(minutes, seconds = null, ms = null) {
        if (seconds === null) {
            seconds = this.getSeconds();
        }

        if (ms === null) {
            ms = this.getMilliseconds();
        }

        this._date.setUTCMinutes(minutes, seconds, ms);

        return this.checkDST();
    },

    setMonth(month, date = null) {
        let checkDate = false;
        if (date === null) {
            date = this.getDate();
            checkDate = true;
        }

        let realMonth = false;
        if (utility.isNumeric(month)) {
            realMonth = month;
        } else {
            realMonth = DateTime.getMonthFromName(month) ||
                DateTime.getMonthFromName(month, 'short');
        }

        if (realMonth === false) {
            return this;
        }

        this._date.setUTCMonth(realMonth, date);

        if (checkDate && date != this.getDate()) {
            this._date.setUTCDate(0);
        }

        return this.checkDST();
    },

    setQuarter(quarter) {
        this.setMonth(quarter * 3 - 3);

        return this.checkDST();
    },

    setSeconds(seconds, ms = null) {
        if (ms === null) {
            ms = this.getMilliseconds();
        }

        this._date.setUTCSeconds(seconds, ms);

        return this.checkDST();
    },

    setTime(time) {
        this._date.setTime(time - (this._offset * 60000));

        return this.checkDST();
    },

    setTimestamp(timestamp) {
        return this.setTime(timestamp * 1000);
    },

    setTimezone(timezone) {
        this._timezone = timezone;

        return this.checkDST();
    },

    setTimezoneOffset(offset) {
        const diff = this._offset - offset;
        if (diff) {
            this._date.setTime(this._date.getTime() + (diff * 60000));
        }

        this._offset = offset;

        return this;
    },

    setUTCDate(date) {
        const timestamp = new DateTime(this.getTime())
            .setTimezone('utc')
            .setDate(date)
            .getTime();
        this.setTime(timestamp);
    },

    setUTCFullYear(year, month = null, date = null) {
        const timestamp = new DateTime(this.getTime())
            .setTimezone('utc')
            .setFullYear(year, month, date)
            .getTime();
        this.setTime(timestamp);
    },

    setUTCHours(hours, minutes = null, seconds = null, ms = null) {
        const timestamp = new DateTime(this.getTime())
            .setTimezone('utc')
            .setHours(hours, minutes, seconds, ms)
            .getTime();
        this.setTime(timestamp);
    },

    setUTCMilliseconds(ms) {
        const timestamp = new DateTime(this.getTime())
            .setTimezone('utc')
            .setMilliseconds(ms)
            .getTime();
        this.setTime(timestamp);
    },

    setUTCMinutes(minutes, seconds = null, ms = null) {
        const timestamp = new DateTime(this.getTime())
            .setTimezone('utc')
            .setMinutes(minutes, seconds, ms)
            .getTime();
        this.setTime(timestamp);
    },

    setUTCMonth(month, date = null) {
        const timestamp = new DateTime(this.getTime())
            .setTimezone('utc')
            .setMonth(month, date)
            .getTime();
        this.setTime(timestamp);
    },

    setUTCSeconds(seconds, ms = null) {
        const timestamp = new DateTime(this.getTime())
            .setTimezone('utc')
            .setSeconds(seconds, ms)
            .getTime();
        this.setTime(timestamp);
    }
});