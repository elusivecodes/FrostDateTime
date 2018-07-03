Object.assign(DateTime.prototype, {

    // Returns the date of the month in local timezone
    getDate() {
        return new Date(this.getLocalTime()).getUTCDate();
    },

    // Returns the day of the week in local timezone
    // (0 - Sunday, 6 - Saturday)
    getDay() {
        return new Date(this.getLocalTime()).getUTCDay();
    },

    // Returns the name of the day of the week in local timezone
    getDayName(type = 'full') {
        return DateTime.getDayName(this.getDay(), type);
    },

    // Returns the day of the year in local timezone
    // (1, 366)
    getDayOfYear() {
        const tempDate = new Date(this.getLocalTime());
        return DateTime.dayOfYear(tempDate.getUTCFullYear(), tempDate.getUTCMonth(), tempDate.getUTCDate());
    },

    // Returns the full year in local timezone
    getFullYear() {
        return new Date(this.getLocalTime()).getUTCFullYear();
    },

    // Returns the hours in local timezone
    // (0, 23)
    getHours() {
        return new Date(this.getLocalTime()).getUTCHours();
    },

    // Returns the ISO day of the week in local timezone
    // (1 - Monday, 7 - Sunday)
    getIsoDay() {
        return DateTime.getIsoDay(this.getDay());
    },

    // Returns the ISO week of the year in local timezone
    getIsoWeek() {
        const tempDate = new Date(this.getLocalTime());
        return DateTime.getIsoWeek(tempDate.getUTCFullYear(), tempDate.getUTCMonth(), tempDate.getUTCDate());
    },

    // Returns the ISO year in local timezone
    getIsoYear() {
        const tempDate = new Date(this.getLocalTime());
        return DateTime.getIsoYear(tempDate.getUTCFullYear(), tempDate.getUTCMonth(), tempDate.getUTCDate());
    },

    // Returns the milliseconds in local timezone
    getMilliseconds() {
        return new Date(this.getLocalTime()).getUTCMilliseconds();
    },

    // Returns the minutes in local timezone
    // (0, 59)
    getMinutes() {
        return new Date(this.getLocalTime()).getUTCMinutes();
    },

    // Returns the month in local timezone
    // (0, 11)
    getMonth() {
        return new Date(this.getLocalTime()).getUTCMonth();
    },

    // Returns the name of the month in local timezone
    getMonthName(type = 'full') {
        return DateTime.getMonthName(this.getMonth(), type);
    },

    // Returns the quarter of the year in local timezone
    // (1, 4)
    getQuarter() {
        return Math.ceil(this.getMonth() / 3);
    },

    // Returns the seconds in local timezone
    // (0, 59)
    getSeconds() {
        return new Date(this.getLocalTime()).getUTCSeconds();
    },

    // Sets the date of the month in local timezone
    setDate() {
        const tempDate = new Date(this.getLocalTime());
        tempDate.setUTCDate(...arguments);
        return this.setLocalTime(tempDate.getTime());
    },

    // Sets the day of the week in local timezone
    // (0 - Sunday, 6 - Saturday)
    setDay(day) {
        day = DateTime.parseDay(day);

        if (day === null) {
            return this;
        }

        const tempDate = new Date(this.getLocalTime());
        tempDate.setUTCDate(tempDate.getUTCDate() - tempDate.getUTCDay() + day);
        return this.setLocalTime(tempDate.getTime());
    },

    // Sets the day of the year in local timezone
    setDayOfYear(day) {
        const tempDate = new Date(this.getLocalTime());
        tempDate.setUTCMonth(0);
        tempDate.setUTCDate(day);
        return this.setLocalTime(tempDate.getTime());
    },

    // Sets the full year in local timezone
    setFullYear(year, month = null, date = null) {
        const tempDate = new Date(this.getLocalTime());

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
        return this.setLocalTime(tempDate.getTime());
    },

    // Sets the hours in local timezone
    // (0, 23)
    setHours() {
        const tempDate = new Date(this.getLocalTime());
        tempDate.setUTCHours(...arguments);
        return this.setLocalTime(tempDate.getTime());
    },

    // Sets the ISO day of the week in local timezone
    // (1 - Monday, 7 - Sunday)
    setIsoDay(day) {
        day = DateTime.parseDay(day);

        if (day === null) {
            return this;
        }

        const tempDate = new Date(this.getLocalTime());
        const tempDay = DateTime.getIsoDay(tempDate.getUTCDay());
        tempDate.setUTCDate(tempDate.getUTCDate() - tempDay + day);
        return this.setLocalTime(tempDate.getTime());
    },

    // Sets the ISO week of the year in local timezone
    setIsoWeek(week, day = null) {
        const tempDate = new Date(this.getLocalTime());

        day = DateTime.parseDay(day);

        if (day === null) {
            day = DateTime.getIsoDay(tempDate.getUTCDay());
        }

        tempDate.setUTCMonth(0);
        tempDate.setUTCDate(4 + ((week - 1) * 7));

        const tempDay = DateTime.getIsoDay(tempDate.getUTCDay());
        tempDate.setUTCDate(tempDate.getUTCDate() - tempDay + day);
 
        return this.setLocalTime(tempDate.getTime());
    },

    // Sets the ISO year in local timezone
    setIsoYear(year, week = null, day = null) {
        const tempDate = new Date(this.getLocalTime());

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

        return this.setLocalTime(tempDate.getTime());
    },

    // Sets the milliseconds in local timezone
    setMilliseconds() {
        const tempDate = new Date(this.getLocalTime());
        tempDate.setUTCMilliseconds(...arguments);
        return this.setLocalTime(tempDate.getTime());
    },

    // Sets the minutes in local timezone
    // (0, 59)
    setMinutes() {
        const tempDate = new Date(this.getLocalTime());
        tempDate.setUTCMinutes(...arguments);
        return this.setLocalTime(tempDate.getTime());
    },

    // Sets the month in local timezone
    // (0, 11)
    setMonth(month, date = null) {
        month = DateTime.parseMonth(month);

        if (month === null) {
            return this;
        }

        const tempDate = new Date(this.getLocalTime());
 
        if (date === null) {
            date = tempDate.getUTCDate();
            const daysInMonth = DateTime.daysInMonth(tempDate.getUTCFullYear(), month);
            if (date > daysInMonth) {
                date = daysInMonth;
            }
        }

        tempDate.setUTCMonth(month, date);
        return this.setLocalTime(tempDate.getTime());
    },

    // Sets the quarter in local timezone
    // (1, 4)
    setQuarter(quarter) {
        const tempDate = new Date(this.getLocalTime());
        tempDate.setUTCMonth(quarter * 3 - 3);
        return this.setLocalTime(tempDate.getTime());
    },

    // Sets the seconds in local timezone
    // (0, 59)
    setSeconds() {
        const tempDate = new Date(this.getLocalTime());
        tempDate.setUTCSeconds(...arguments);
        return this.setLocalTime(tempDate.getTime());
    }
});