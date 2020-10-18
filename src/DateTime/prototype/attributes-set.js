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
            new Date(this._getOffsetTime()).setUTCDate(date)
        );
    },

    /**
     * Set the day of the week in current timeZone.
     * @param {number} day The day of the week. (0 - Sunday, 6 - Saturday)
     * @returns {DateTime} The DateTime object.
     */
    setDay(day) {
        return this._setOffsetTime(
            new Date(this._getOffsetTime()).setUTCDate(
                this.getDate()
                - this.getDay()
                + parseInt(day)
            )
        );
    },

    /**
     * Set the ISO day of the week in current timeZone.
     * @param {number} day The ISO day of the week. (1 - Monday, 7 - Sunday)
     * @returns {DateTime} The DateTime object.
     */
    setDayOfWeek(day) {
        return this._setOffsetTime(
            new Date(this._getOffsetTime()).setUTCDate(
                this.getDate()
                - this.getDayOfWeek()
                + parseInt(day)
            )
        );
    },

    setDayOfWeekInMonth(week) {
        return this.setDate(
            this.getDate()
            + (
                week -
                this.getDayOfWeekInMonth()
            ) * 7
        )
    },

    /**
     * Set the day of the year in current timeZone.
     * @param {number} day The day of the year. (1, 366)
     * @returns {DateTime} The DateTime object.
     */
    setDayOfYear(day) {
        return this._setOffsetTime(
            new Date(this._getOffsetTime()).setUTCMonth(
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
            new Date(this._getOffsetTime()).setUTCHours(...args)
        );
    },

    /**
     * Set the milliseconds in current timeZone.
     * @param {number} milliseconds The milliseconds.
     * @returns {DateTime} The DateTime object.
     */
    setMilliseconds(ms) {
        return this._setOffsetTime(
            new Date(this._getOffsetTime()).setUTCMilliseconds(ms)
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
            new Date(this._getOffsetTime()).setUTCMinutes(...args)
        );
    },

    /**
     * Set the month in current timeZone (and optionally, date).
     * @param {number} month The month. (1, 12)
     * @param {null|number} [date] The date of the month.
     * @returns {DateTime} The DateTime object.
     */
    setMonth(month, date = null) {
        if (date === null) {
            date = this.getDate();

            if (this.constructor.clampDates) {
                date = Math.min(
                    date,
                    this.constructor.daysInMonth(
                        this.getYear(),
                        month
                    )
                );
            }
        }

        return this._setOffsetTime(
            new Date(this._getOffsetTime()).setUTCMonth(
                month - 1,
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
            new Date(this._getOffsetTime()).setUTCMonth(
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
            new Date(this._getOffsetTime()).setUTCSeconds(...args)
        );
    },

    /**
     * Set the number of milliseconds since the UNIX epoch.
     * @param {number} time The number of milliseconds since the UNIX epoch.
     * @returns {DateTime} The DateTime object.
     */
    setTime(time) {
        this._utcDate.setTime(time);

        if (this._dynamicTz) {
            this._checkOffset();
        }

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
     * @param {Boolean} [adjust=false] Whether to adjsut the timestamp.
     * @returns {DateTime} The DateTime object.
     */
    setTimeZone(timeZone, adjust = false) {
        this._dynamicTz = false;

        const offset = this._offset;

        const match = timeZone.match(this.constructor._offsetRegExp);
        if (match) {
            this._offset = match[2] * 60 + parseInt(match[4]);
            if (this._offset && match[1] === '+') {
                this._offset *= -1;
            }
            this._timeZone = this.constructor._formatOffset(this._offset);
        } else {
            if (['Z', 'GMT'].includes(timeZone)) {
                timeZone = 'UTC';
            }

            this._dynamicTz = true;
            this._timeZone = timeZone;

            this._makeFormatter();
            this._checkOffset();
        }

        // compensate for DST transitions
        if (adjust && offset !== this._offset) {
            this._utcDate.setTime(
                this._utcDate.getTime()
                - (offset - this._offset) * 60000
            );
        }

        return this;
    },

    /**
     * Set the current UTC offset.
     * @param {number} offset The UTC offset (in minutes).
     * @returns {DateTime} The DateTime object.
     */
    setTimeZoneOffset(offset) {
        this._dynamicTz = false;
        this._offset = offset || 0;
        this._timeZone = this.constructor._formatOffset(this._offset);
        this._formatter = null;

        return this;
    },

    /**
     * Set the ISO day of the week in current timeZone (and optionally, day of the week).
     * @param {number} week The ISO week.
     * @param {null|number} [day] The ISO day of the week. (1 - Monday, 7 - Sunday)
     * @returns {DateTime} The DateTime object.
     */
    setWeek(week, day = null) {
        if (day === null) {
            day = this.getDayOfWeek();
        }

        const tempDate = new Date(this._getOffsetTime());

        tempDate.setUTCFullYear(
            this.getWeekYear(),
            0,
            4
            + (
                (week - 1)
                * 7
            )
        );

        return this._setOffsetTime(
            tempDate.setUTCDate(
                tempDate.getUTCDate()
                - this.constructor._isoDay(
                    tempDate.getUTCDay()
                )
                + parseInt(day)
            )
        );
    },

    setWeekOfMonth(week) {
        return this.setDate(
            this.getDate()
            + (
                week -
                this.getWeekOfMonth()
            ) * 7
        )
    },

    /**
     * Set the ISO day of the week in current timeZone (and optionally, week and day of the week).
     * @param {number} year The ISO year.
     * @param {null|number} [week] The ISO week.
     * @param {null|number} [day] The ISO day of the week. (1 - Monday, 7 - Sunday)
     * @returns {DateTime} The DateTime object.
     */
    setWeekYear(year, week = null, day = null) {
        if (week === null) {
            week = this.getWeek();
        }

        if (day === null) {
            day = this.getDayOfWeek();
        }

        const tempDate = new Date(this._getOffsetTime());

        tempDate.setUTCFullYear(
            year,
            0,
            4
            + (
                (week - 1)
                * 7
            )
        );

        return this._setOffsetTime(
            tempDate.setUTCDate(
                tempDate.getUTCDate()
                - this.constructor._isoDay(
                    tempDate.getUTCDay()
                )
                + parseInt(day)
            )
        );
    },

    /**
     * Set the year in current timeZone (and optionally, month and date).
     * @param {number} year The year.
     * @param {null|number} [month] The month. (1, 12)
     * @param {null|number} [date] The date of the month.
     * @returns {DateTime} The DateTime object.
     */
    setYear(year, month = null, date = null) {
        if (month === null) {
            month = this.getMonth();
        }

        if (this.constructor.clampDates && date === null) {
            date = Math.min(
                this.getDate(),
                this.constructor.daysInMonth(
                    year,
                    month
                )
            );
        }

        return this._setOffsetTime(
            new Date(this._getOffsetTime()).setUTCFullYear(
                year,
                month - 1,
                date
            )
        );
    }

});
