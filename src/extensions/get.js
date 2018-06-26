Object.assign(DateTime.prototype, {

    getDate() {
        return this._date.getUTCDate();
    },

    getDay() {
        return this._date.getUTCDay();
    },

    getDayOfYear() {
        return DateTime.dayOfYear(this.getFullYear(), this.getMonth() + 1, this.getDate());
    },

    getFullYear() {
        return this._date.getUTCFullYear();
    },

    getHours() {
        return this._date.getUTCHours();
    },

    getIsoDay() {
        return ((this.getDay() + 6) % 7) + 1;
    },

    getIsoWeek() {
        const date = new DateTime(this.getFullYear(), this.getMonth(), this.getDate());

        // Thursday in current week decides the year.
        date.setIsoDay(4);

        // January 4 is always in week 1.
        const week1 = new DateTime(date.getFullYear(), 0, 4);

        // Adjust to Thursday in week 1
        week1.setIsoDay(4);

        // Count weeks between date and week1.
        const weeksBetween = (date.getTimestamp() - week1.getTimestamp()) / 604800;

        return 1 + Math.floor(weeksBetween);
    },

    getIsoYear() {
        const date = new DateTime(this.getFullYear(), this.getMonth(), this.getDate());
        date.setTimezone(this.getTimezone());
        date.getIsoDay(4);
        return date.getFullYear();
    },

    getMilliseconds() {
        return this._date.getUTCMilliseconds();
    },

    getMinutes() {
        return this._date.getUTCMinutes();
    },

    getMonth() {
        return this._date.getUTCMonth();
    },

    getQuarter() {
        return Math.ceil(this.getMonth() / 3);
    },

    getSeconds() {
        return this._date.getUTCSeconds();
    },

    getTime() {
        return this._date.getTime() + (this._offset * 60000);
    },

    getTimestamp() {
        return this.getTime() / 1000;
    },

    getTimezone() {
        return this._timezone;
    },

    getTimezoneOffset() {
        return this._offset;
    },

    getUTCDate() {
        return new Date(this.getTime()).getUTCDate();
    },

    getUTCDay() {
        return new Date(this.getTime()).getUTCDay();
    },

    getUTCFullYear() {
        return new Date(this.getTime()).getUTCFullYear();
    },

    getUTCHours() {
        return new Date(this.getTime()).getUTCHours();
    },

    getUTCMilliseconds() {
        return new Date(this.getTime()).getUTCMilliseconds();
    },

    getUTCMinutes() {
        return new Date(this.getTime()).getUTCMinutes();
    },

    getUTCMonth() {
        return new Date(this.getTime()).getUTCMonth();
    },

    getSeconds() {
        return new Date(this.getTime()).getUTCSeconds();
    }
});