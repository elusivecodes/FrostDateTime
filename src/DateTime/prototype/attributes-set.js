/**
 * DateTime Attributes (Set)
 */

Object.assign(DateTime.prototype, {

    /**
     * Set the internet swatch time beat in current timeZone.
     * @param {number} beat The internet swatch time beat.
     * @returns {DateTime} The DateTime object.
     */
    setBeat(beat) {
        return this.setTime(
            new Date(
                this.getTime()
                + 3600000
            ).setUTCHours(
                0,
                0,
                0,
                beat * 86400
            )
            - 3600000
        );
    },

    /**
     * Set the date of the month in current timeZone.
     * @param {number} date The date of the month.
     * @returns {DateTime} The DateTime object.
     */
    setDate(date) {
        return this._setOffsetTime(
            this._offsetDate.setUTCDate(date)
        );
    },

    /**
     * Set the day of the week in current timeZone.
     * @param {number} day The day of the week. (0 - Sunday, 6 - Saturday)
     * @returns {DateTime} The DateTime object.
     */
    setDay(day) {
        return this._setOffsetTime(
            this._offsetDate.setUTCDate(
                this.getDate()
                - this.getDay()
                + day
            )
        );
    },

    /**
     * Set the day of the year in current timeZone.
     * @param {number} day The day of the year. (1, 366)
     * @returns {DateTime} The DateTime object.
     */
    setDayOfYear(day) {
        return this._setOffsetTime(
            this._offsetDate.setUTCMonth(
                0,
                day
            )
        );
    },

    /**
     * Set the hours in current timeZone (and optionally, minutes, seconds and milliseconds).
     * @param {number} hours The hours. (0, 23)
     * @param {number} [minutes] The minutes. (0, 59)
     * @param {number} [seconds] The seconds. (0, 59)
     * @param {number} [milliseconds] The milliseconds.
     * @returns {DateTime} The DateTime object.
     */
    setHours(...args) {
        return this._setOffsetTime(
            this._offsetDate.setUTCHours(...args)
        );
    },

    /**
     * Set the ISO day of the week in current timeZone.
     * @param {number} day The ISO day of the week. (1 - Monday, 7 - Sunday)
     * @returns {DateTime} The DateTime object.
     */
    setISODay(day) {
        return this._setOffsetTime(
            this._offsetDate.setUTCDate(
                this.getDate()
                - this.getISODay()
                + day
            )
        );
    },

    /**
     * Set the ISO day of the week in current timeZone (and optionally, day of the week).
     * @param {number} week The ISO week.
     * @param {null|number} [day] The ISO day of the week. (1 - Monday, 7 - Sunday)
     * @returns {DateTime} The DateTime object.
     */
    setISOWeek(week, day = null) {
        if (day === null) {
            day = this.getISODay();
        }

        this._offsetDate.setUTCMonth(
            0,
            4
            + (
                (week - 1)
                * 7
            )
        );

        return this._setOffsetTime(
            this._offsetDate.setUTCDate(
                this._offsetDate.getUTCDate()
                - DateTime._isoDay(
                    this._offsetDate.getUTCDay()
                )
                + day
            )
        );
    },

    /**
     * Set the ISO day of the week in current timeZone (and optionally, week and day of the week).
     * @param {number} year The ISO year.
     * @param {null|number} [week] The ISO week.
     * @param {null|number} [day] The ISO day of the week. (1 - Monday, 7 - Sunday)
     * @returns {DateTime} The DateTime object.
     */
    setISOYear(year, week = null, day = null) {
        if (week === null) {
            week = this.getISODay();
        }

        if (day === null) {
            day = this.getISODay();
        }

        this._offsetDate.setUTCFullYear(
            year,
            0,
            4
            + (
                (week - 1)
                * 7
            )
        );

        return this._setOffsetTime(
            this._offsetDate.setUTCDate(
                this._offsetDate.getUTCDate()
                - DateTime._isoDay(
                    this._offsetDate.getUTCDay()
                )
                + day
            )
        );
    },

    /**
     * Set the milliseconds in current timeZone.
     * @param {number} milliseconds The milliseconds.
     * @returns {DateTime} The DateTime object.
     */
    setMilliseconds(ms) {
        return this._setOffsetTime(
            this._offsetDate.setUTCMilliseconds(ms)
        );
    },

    /**
     * Set the minutes in current timeZone (and optionally, seconds and milliseconds).
     * @param {number} minutes The minutes. (0, 59)
     * @param {number} [seconds] The seconds. (0, 59)
     * @param {number} [milliseconds] The milliseconds.
     * @returns {DateTime} The DateTime object.
     */
    setMinutes(...args) {
        return this._setOffsetTime(
            this._offsetDate.setUTCMinutes(...args)
        );
    },

    /**
     * Set the month in current timeZone (and optionally, date).
     * @param {number} month The month. (0, 11)
     * @param {null|number} [date] The date of the month.
     * @returns {DateTime} The DateTime object.
     */
    setMonth(month, date = null) {
        if (DateTime.clampDates && date === null) {
            date = Math.min(
                this.getDate(),
                DateTime.daysInMonth(
                    this.getYear(),
                    month
                )
            );
        }

        return this._setOffsetTime(
            this._offsetDate.setUTCMonth(
                month,
                date
            )
        );
    },

    /**
     * Set the quarter of the year in current timeZone.
     * @param {number} quarter The quarter of the year. (1, 4)
     * @returns {DateTime} The DateTime object.
     */
    setQuarter(quarter) {
        return this._setOffsetTime(
            this._offsetDate.setUTCMonth(
                quarter * 3
                - 3
            )
        );
    },

    /**
     * Set the seconds in current timeZone (and optionally, milliseconds).
     * @param {number} seconds The seconds. (0, 59)
     * @param {number} [milliseconds] The milliseconds.
     * @returns {DateTime} The DateTime object.
     */
    setSeconds(...args) {
        return this._setOffsetTime(
            this._offsetDate.setUTCSeconds(...args)
        );
    },

    /**
     * Set the number of milliseconds since the UNIX epoch.
     * @param {number} time The number of milliseconds since the UNIX epoch.
     * @returns {DateTime} The DateTime object.
     */
    setTime(time) {
        this._utcDate.setTime(time);
        this._checkOffset();
        const timestamp = time / 1000;
        if (
            timestamp < this._transition.start ||
            timestamp > this._transition.end
        ) {
            this._getTransition();
        }
        this._offsetDate.setTime(this._getOffsetTime());

        return this;
    },

    /**
     * Set the number of seconds since the UNIX epoch.
     * @param {number} timestamp The number of seconds since the UNIX epoch.
     * @returns {DateTime} The DateTime object.
     */
    setTimestamp(timestamp) {
        return this.setTime(timestamp * 1000);
    },

    /**
     * Set the current timeZone.
     * @param {string} timeZone The name of the timeZone.
     * @returns {DateTime} The DateTime object.
     */
    setTimeZone(timeZone, adjust = false) {
        if (!DateTime._timeZones[timeZone]) {
            throw new Error('Invalid timeZone supplied');
        }

        this._timeZone = timeZone;
        this._makeFormatter();

        const offset = this._offset;

        this._checkOffset();

        // compensate for DST transitions
        if (adjust && offset !== this._offset) {
            this._utcDate.setTime(
                this._utcDate.getTime()
                - (offset - this._offset) * 60000
            );
        }

        this._getTransition();

        return this;
    },

    /**
     * Set the year in current timeZone (and optionally, month and date).
     * @param {number} year The year.
     * @param {null|number} [month] The month. (0, 11)
     * @param {null|number} [date] The date of the month.
     * @returns {DateTime} The DateTime object.
     */
    setYear(year, month = null, date = null) {
        if (month === null) {
            month = this.getMonth();
        }

        if (DateTime.clampDates && date === null) {
            date = Math.min(
                this.getDate(),
                DateTime.daysInMonth(
                    year,
                    month
                )
            );
        }

        return this._setOffsetTime(
            this._offsetDate.setUTCFullYear(
                year,
                month,
                date
            )
        );
    }

});
