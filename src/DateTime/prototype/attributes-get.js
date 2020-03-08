/**
 * DateTime Attributes (Get)
 */

Object.assign(DateTime.prototype, {

    /**
     * Get the internet swatch time beat in current timeZone.
     * @returns {number} The internet swatch time beat.
     */
    getBeat() {
        const tempDate = new Date(
            this.getTime()
            + 3600000
        );
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
     * Get the ISO day of the week in current timeZone.
     * @returns {number} The ISO day of the week. (1 - Monday, 7 = Sunday)
     */
    getISODay() {
        return this.constructor._isoDay(
            this.getDay()
        );
    },

    /**
     * Get the ISO week in current timeZone.
     * @returns {number} The ISO week. (1, 53)
     */
    getISOWeek() {
        const
            week = this.constructor._isoDate(
                this.getYear(),
                this.getMonth(),
                this.getDate()
            ),
            firstWeek = this.constructor._isoDate(
                week.getUTCFullYear(),
                0,
                4
            );

        return 1
            + (
                (
                    (week - firstWeek)
                    / 604800000
                ) | 0
            );
    },

    /**
     * Get the ISO year in current timeZone.
     * @returns {number} The ISO year.
     */
    getISOYear() {
        return this.constructor._isoDate(
            this.getYear(),
            this.getMonth(),
            this.getDate()
        ).getUTCFullYear();
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
     * @returns {number} The month. (0, 11)
     */
    getMonth() {
        return new Date(this._getOffsetTime()).getUTCMonth();
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
     * Get the abbreviated name of the current timeZone.
     * @returns {string} The abbreviated name of the current timeZone.
     */
    getTimeZoneAbbr() {
        if (!this._dynamicTz) {
            return this._timeZone;
        }

        return this.isDST() ?
            this._transition.dst :
            this._transition.abbr;
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
    }

});
