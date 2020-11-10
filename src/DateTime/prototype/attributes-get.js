/**
 * DateTime Attributes (Get)
 */

Object.assign(DateTime.prototype, {

    /**
     * Get the date of the month in current timeZone.
     * @returns {number} The date of the month.
     */
    getDate() {
        return new Date(this._getOffsetTime()).getUTCDate();
    },

    /**
     * Get the day of the week in current timeZone.
     * @returns {number} The day of the week. (0 - Sunday, 6 - Saturday)
     */
    getDay() {
        return new Date(this._getOffsetTime()).getUTCDay();
    },

    /**
     * Get the day of the year in current timeZone.
     * @returns {number} The day of the year. (1, 366)
     */
    getDayOfYear() {
        return this.constructor.dayOfYear(
            this.getYear(),
            this.getMonth(),
            this.getDate()
        );
    },

    /**
     * Get the hours of the day in current timeZone.
     * @returns {number} The hours of the day. (0, 23)
     */
    getHours() {
        return new Date(this._getOffsetTime()).getUTCHours();
    },

    /**
     * Get the name of the current locale.
     * @returns {string} The name of the current locale.
     */
    getLocale() {
        return this.formatter.locale;
    },

    /**
     * Get the milliseconds in current timeZone.
     * @returns {number} The milliseconds.
     */
    getMilliseconds() {
        return new Date(this._getOffsetTime()).getUTCMilliseconds();
    },

    /**
     * Get the minutes in current timeZone.
     * @returns {number} The minutes. (0, 59)
     */
    getMinutes() {
        return new Date(this._getOffsetTime()).getUTCMinutes();
    },

    /**
     * Get the month in current timeZone.
     * @returns {number} The month. (1, 12)
     */
    getMonth() {
        return new Date(this._getOffsetTime()).getUTCMonth() + 1;
    },

    /**
     * Get the quarter of the year in current timeZone.
     * @returns {number} The quarter of the year. (1, 4)
     */
    getQuarter() {
        return Math.ceil(
            (this.getMonth() + 1)
            / 3
        );
    },

    /**
     * Get the seconds in current timeZone.
     * @returns {number} The seconds. (0, 59)
     */
    getSeconds() {
        return new Date(this._getOffsetTime()).getUTCSeconds();
    },

    /**
     * Get the number of milliseconds since the UNIX epoch.
     * @returns {number} The number of milliseconds since the UNIX epoch.
     */
    getTime() {
        return this._utcDate.getTime();
    },

    /**
     * Get the number of seconds since the UNIX epoch.
     * @returns {number} The number of seconds since the UNIX epoch.
     */
    getTimestamp() {
        return this.getTime()
            / 1000;
    },

    /**
     * Get the name of the current timeZone.
     * @returns {string} The name of the current timeZone.
     */
    getTimeZone() {
        return this._timeZone;
    },

    /**
     * Get the UTC offset (in minutes) of the current timeZone.
     * @returns {number} The UTC offset (in minutes) of the current timeZone.
     */
    getTimeZoneOffset() {
        return this._offset;
    },

    /**
     * Get the year in current timeZone.
     * @returns {number} The year.
     */
    getYear() {
        return new Date(this._getOffsetTime()).getUTCFullYear();
    },

    /**
     * Get the local week in current timeZone.
     * @returns {number} The local week. (1, 53)
     */
    getWeek() {
        const week = this.clone().startOf('day').setWeekDay(4);
        const firstWeek = week.clone().setMonth(1, 4).setWeekDay(4);

        return 1
            + (
                (
                    (week - firstWeek)
                    / 604800000
                ) | 0
            );
    },

    /**
     * Get the local day of the week in current timeZone.
     * @returns {number} The local day of the week. (1 - 7)
     */
    getWeekDay() {
        return this.formatter.weekDay(
            this.getDay()
        );
    },

    /**
     * Get the week day in month in current timeZone.
     * @returns {number} The week day in month.
     */
    getWeekDayInMonth() {
        const thisWeek = this.getWeek();
        const first = this.clone().setDate(1);
        const firstWeek = first.getWeek();
        const offset = first.getWeekDay() > this.getWeekDay() ?
            0 : 1;
        return firstWeek > thisWeek ?
            thisWeek + offset :
            thisWeek - firstWeek + offset;
    },

    /**
     * Get the week of month in current timeZone.
     * @returns {number} The week of month.
     */
    getWeekOfMonth() {
        const thisWeek = this.getWeek();
        let firstWeek = this.clone().setDate(1).getWeek();
        return firstWeek > thisWeek ?
            thisWeek + 1 :
            thisWeek - firstWeek + 1;
    },

    /**
     * Get the ISO year in current timeZone.
     * @returns {number} The ISO year.
     */
    getWeekYear() {
        return this.clone().setWeekDay(4).getYear();
    }

});
