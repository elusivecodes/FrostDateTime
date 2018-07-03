Object.assign(DateTime.prototype, {

    // Returns the date of the month in UTC timezone
    getUTCDate() {
        return this._date.getUTCDate();
    },

    // Returns the day of the week in UTC timezone
    // (0 - Sunday, 6 - Saturday)
    getUTCDay() {
        return this._date.getUTCDay();
    },

    getUTCDayName(type = 'full') {
        return DateTime.getDayName(this.getUTCDay(), type);
    },

    // Returns the day of the year in UTC timezone
    // (1, 366)
    getUTCDayOfYear() {
        return DateTime.dayOfYear(this._date.getUTCFullYear(), this._date.getUTCMonth(), this._date.getUTCDate());
    },

    // Returns the full year in UTC timezone
    getUTCFullYear() {
        return this._date.getUTCFullYear();
    },

    // Returns the hours in UTC timezone
    // (0, 23)
    getUTCHours() {
        return this._date.getUTCHours();
    },

    // Returns the ISO day of the week in UTC timezone
    // (1 - Monday, 7 - Sunday)
    getUTCIsoDay() {
        return DateTime.getIsoDay(this.getUTCDay());
    },

    // Returns the ISO week of the year in UTC timezone
    getUTCIsoWeek() {
        return DateTime.getIsoWeek(this._date.getUTCFullYear(), this._date.getUTCMonth(), this._date.getUTCDate());
    },

    // Returns the ISO year in UTC timezone
    getUTCIsoYear() {
        return DateTime.getIsoYear(this._date.getUTCFullYear(), this._date.getUTCMonth(), this._date.getUTCDate());
    },

    // Returns the milliseconds in UTC timezone
    getUTCMilliseconds() {
        return this._date.getUTCMilliseconds();
    },

    // Returns the minutes in UTC timezone
    // (0, 59)
    getUTCMinutes() {
        return this._date.getUTCMinutes();
    },

    // Returns the month in UTC timezone
    // (0, 11)
    getUTCMonth() {
        return this._date.getUTCMonth();
    },

    getUTCMonthName(type = 'full') {
        return DateTime.getMonthName(this.getUTCMonth(), type);
    },

    // Returns the quarter of the year in UTC timezone
    // (1, 4)
    getUTCQuarter() {
        return Math.ceil(this._date.getUTCMonth() / 3);
    },

    // Returns the seconds in UTC timezone
    // (0, 59)
    getUTCSeconds() {
        return this._date.getUTCSeconds();
    },

    // Sets the date of the month in UTC timezone
    setUTCDate() {
        const tempDate = new Date(this.getTime());
        tempDate.setUTCDate(...arguments);
        return this.setTime(tempDate.getTime());
    },

    // Sets the day of the week in UTC timezone
    // (0 - Sunday, 6 - Saturday)
    setUTCDay(day) {
        day = DateTime.parseDay(day);

        if (day === null) {
            return this;
        }

        const tempDate = new Date(this.getTime());
        tempDate.setUTCDate(tempDate.getUTCDate() - tempDate.getUTCDay() + day);
        return this.setTime(tempDate.getTime());
    },

    // Sets the day of the year in UTC timezone
    setUTCDayOfYear(day) {
        const tempDate = new Date(this.getTime());
        tempDate.setUTCMonth(0);
        tempDate.setUTCDate(day);
        return this.setTime(tempDate.getTime());
    },

    // Sets the full year in UTC timezone
    setUTCFullYear(year, month = null, date = null) {
        const tempDate = new Date(this.getTime());

        month = DateTime.parseMonth(month);

        if (month === null) {
            month = tempDate.getUTCMonth();
        }

        if (date === null) {
            date = tempDate.getUTCDate();
            const daysInMonth = DateTime.daysInMonth(year, month);
            if (date > daysInMonth) {
                date = daysInMonth;
            }
        }

        tempDate.setUTCFullYear(year, month, date);
        return this.setTime(tempDate.getTime());
    },

    // Sets the hours in UTC timezone
    // (0, 23)
    setUTCHours() {
        const tempDate = new Date(this.getTime());
        tempDate.setUTCHours(...arguments);
        return this.setTime(tempDate.getTime());
    },

    // Sets the ISO day of the week in UTC timezone
    // (1 - Monday, 7 - Sunday)
    setUTCIsoDay(day) {
        day = DateTime.parseDay(day);

        if (day === null) {
            return this;
        }

        const tempDate = new Date(this.getTime());
        const tempDay = DateTime.getIsoDay(tempDate.getUTCDay());
        tempDate.setUTCDate(tempDate.getUTCDate() - tempDay + day);
        return this.setTime(tempDate.getTime());
    },

    // Sets the ISO week of the year in UTC timezone
    setUTCIsoWeek(week, day = null) {
        const tempDate = new Date(this.getTime());

        day = DateTime.parseDay(day);

        if (day === null) {
            day = DateTime.getIsoDay(tempDate.getUTCDay());
        }

        tempDate.setUTCMonth(0);
        tempDate.setUTCDate(4 + ((week - 1) * 7));

        const tempDay = DateTime.getIsoDay(tempDate.getUTCDay());
        tempDate.setUTCDate(tempDate.getUTCDate() - tempDay + day);
 
        return this.setTime(tempDate.getTime());
    },

    // Sets the ISO year in UTC timezone
    setUTCIsoYear(year, week = null, day = null) {
        const tempDate = new Date(this.getTime());

        if (week === null) {
            week = DateTime.getIsoWeek(tempDate.getUTCFullYear(), tempDate.getUTCMonth(), tempDate.getUTCDate());
        }

        day = DateTime.parseDay(day);

        if (day === null) {
            day = DateTime.getIsoDay(tempDate.getUTCDay());
        }

        tempDate.setUTCFullYear(year, 0, 4);
        tempDate.setUTCDate(4 + ((week - 1) * 7));

        const tempDay = DateTime.getIsoDay(tempDate.getUTCDay());
        tempDate.setUTCDate(tempDate.getUTCDate() - tempDay + day);

        return this.setTime(tempDate.getTime());
    },

    // Sets the milliseconds in UTC timezone
    setUTCMilliseconds() {
        const tempDate = new Date(this.getTime());
        tempDate.setUTCMilliseconds(...arguments);
        return this.setTime(tempDate.getTime());
    },

    // Sets the minutes in UTC timezone
    // (0, 59)
    setUTCMinutes() {
        const tempDate = new Date(this.getTime());
        tempDate.setUTCMinutes(...arguments);
        return this.setTime(tempDate.getTime());
    },

    // Sets the month in UTC timezone
    // (0, 11)
    setUTCMonth(month, date = null) {
        month = DateTime.parseMonth(month);

        if (month === null) {
            return this;
        }

        const tempDate = new Date(this.getTime());

        if (date === null) {
            date = tempDate.getUTCDate();
            const daysInMonth = DateTime.daysInMonth(tempDate.getUTCFullYear(), month);
            if (date > daysInMonth) {
                date = daysInMonth;
            }
        }

        tempDate.setUTCMonth(month, date);
        return this.setTime(tempDate.getTime());
    },

    // Sets the quarter in UTC timezone
    // (1, 4)
    setUTCQuarter() {
        const tempDate = new Date(this.getTime());
        tempDate.setUTCMonth(quarter * 3 - 3);
        return this.setTime(tempDate.getTime());
    },

    // Sets the seconds in UTC timezone
    // (0, 59)
    setUTCSeconds() {
        const tempDate = new Date(this.getTime());
        tempDate.setUTCSeconds(...arguments);
        return this.setTime(tempDate.getTime());
    }
});