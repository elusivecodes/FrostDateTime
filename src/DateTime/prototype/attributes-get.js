/**
 * DateTime Attributes (Get)
 */

Object.assign(DateTime.prototype, {

    /**
     * Get the internet swatch time beat in current timezone.
     * @returns {number} The internet swatch time beat.
     */
    getBeat() {
        const tempDate = new Date(this.getTime() + 3600000);
        return (
            (
                tempDate.getUTCHours() * 3600000
                + tempDate.getUTCMinutes() * 60000
                + tempDate.getUTCSeconds() * 1000
                + tempDate.getUTCMilliseconds()
            )
            / 86400
        ) | 0;
    },

    /**
     * Get the date of the month in current timezone.
     * @returns {number} The date of the month.
     */
    getDate() {
        return new Date(this._getOffsetTime())
            .getUTCDate();
    },

    /**
     * Get the day of the week in current timezone.
     * @returns {number} The day of the week. (0 - Sunday, 6 - Saturday)
     */
    getDay() {
        return new Date(this._getOffsetTime())
            .getUTCDay();
    },

    /**
     * Get the name of the day of the week in current timezone.
     * @param {string} [type=full] The type of day name to return.
     * @returns {string} The name of the day of the week.
     */
    getDayName(type = 'full') {
        return DateTime.lang.days[type][this.getDay()];
    },

    /**
     * Get the day of the year in current timezone.
     * @returns {number} The day of the year. (1, 366)
     */
    getDayOfYear() {
        return DateTime.dayOfYear(
            this.getYear(),
            this.getMonth(),
            this.getDate()
        );
    },

    /**
     * Get the hours of the day in current timezone.
     * @returns {number} The hours of the day. (0, 23)
     */
    getHours() {
        return new Date(this._getOffsetTime())
            .getUTCHours();
    },

    /**
     * Get the ISO day of the week in current timezone.
     * @returns {number} The ISO day of the week. (1 - Monday, 7 = Sunday)
     */
    getISODay() {
        return DateTime._isoDay(this.getDay());
    },

    /**
     * Get the ISO week in current timezone.
     * @returns {number} The ISO week. (1, 53)
     */
    getISOWeek() {
        const week = DateTime._isoDate(
            this.getYear(),
            this.getMonth(),
            this.getDate()
        ),
            firstWeek = DateTime._isoDate(week.getUTCFullYear(), 0, 4);

        return 1 + (((week - firstWeek) / 604800000) | 0);
    },

    /**
     * Get the ISO year in current timezone.
     * @returns {number} The ISO year.
     */
    getISOYear() {
        return DateTime._isoDate(
            this.getYear(),
            this.getMonth(),
            this.getDate()
        )
            .getUTCFullYear();
    },

    /**
     * Get the milliseconds in current timezone.
     * @returns {number} The milliseconds.
     */
    getMilliseconds() {
        return new Date(this._getOffsetTime())
            .getUTCMilliseconds();
    },

    /**
     * Get the minutes in current timezone.
     * @returns {number} The minutes. (0, 59)
     */
    getMinutes() {
        return new Date(this._getOffsetTime())
            .getUTCMinutes();
    },

    /**
     * Get the month in current timezone.
     * @returns {number} The month. (0, 11)
     */
    getMonth() {
        return new Date(this._getOffsetTime())
            .getUTCMonth();
    },

    /**
     * Get the name of the month in current timezone.
     * @param {string} [type=full] The type of month name to return.
     * @returns {string} The name of the month.
     */
    getMonthName(type = 'full') {
        return DateTime.lang.months[type][this.getMonth()];
    },

    /**
     * Get the quarter of the year in current timezone.
     * @returns {number} The quarter of the year. (1, 4)
     */
    getQuarter() {
        return Math.ceil((this.getMonth() + 1) / 3);
    },

    /**
     * Get the seconds in current timezone.
     * @returns {number} The seconds. (0, 59)
     */
    getSeconds() {
        return new Date(this._getOffsetTime())
            .getUTCSeconds();
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
        return this.getTime() / 1000;
    },

    /**
     * Get the name of the current timezone.
     * @returns {string} The name of the current timezone.
     */
    getTimezone() {
        return this._timezone;
    },

    /**
     * Get the abbreviated name of the current timezone.
     * @returns {string} The abbreviated name of the current timezone.
     */
    getTimezoneAbbr() {
        return this.isDST() ?
            this._transition.dst :
            this._transition.abbr;
    },

    /**
     * Get the UTC offset (in minutes) of the current timezone.
     * @returns {number} The UTC offset (in minutes) of the current timezone.
     */
    getTimezoneOffset() {
        return this._offset;
    },

    /**
     * Get the year in current timezone.
     * @returns {number} The year.
     */
    getYear() {
        return new Date(this._getOffsetTime())
            .getUTCFullYear();
    }

});
