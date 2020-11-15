/**
 * DateTime Attributes (Set)
 */

Object.assign(DateTime.prototype, {

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
     * Set the current locale.
     * @param {string} locale The name of the timeZone.
     * @returns {DateTime} The DateTime object.
     */
    setLocale(locale) {
        this.formatter = DateFormatter.load(locale);
        this.relativeFormatter = DateFormatter.loadRelative(locale);
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
     * @param {Boolean} [adjust=false] Whether to adjust the timestamp.
     * @returns {DateTime} The DateTime object.
     */
    setTimeZone(timeZone, adjust = false) {
        if (['Z', 'GMT'].includes(timeZone)) {
            timeZone = 'UTC';
        }

        this._dynamicTz = false;

        const offset = this._offset;

        const match = timeZone.match(this.constructor._offsetRegExp);
        if (match) {
            this._offset = match[2] * 60 + parseInt(match[4] || 0);
            if (this._offset && match[1] === '+') {
                this._offset *= -1;
            }

            if (this._offset) {
                this._timeZone = DateFormatter.formatOffset(this._offset);
            } else {
                this._dynamicTz = true;
                this._timeZone = 'UTC';
            }
        } else {
            this._dynamicTz = true;
            this._timeZone = timeZone;
        }

        if (this._dynamicTz) {
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
        this._timeZone = DateFormatter.formatOffset(this._offset);
        this._formatter = null;

        return this;
    },

    /**
     * Set the local day of the week in current timeZone (and optionally, day of the week).
     * @param {number} week The local week.
     * @param {null|number} [day] The local day of the week. (1 - 7)
     * @returns {DateTime} The DateTime object.
     */
    setWeek(week, day = null) {
        if (day === null) {
            day = this.getWeekDay();
        }

        return this.setYear(this.getWeekYear(), 1, 4 + ((week - 1) * 7)).setWeekDay(day);
    },

    /**
     * Set the local day of the week in current timeZone.
     * @param {number} day The local day of the week. (1 - 7)
     * @returns {DateTime} The DateTime object.
     */
    setWeekDay(day) {
        return this._setOffsetTime(
            new Date(this._getOffsetTime()).setUTCDate(
                this.getDate()
                - this.getWeekDay()
                + parseInt(day)
            )
        );
    },

    /**
     * Set the week day in month in current timeZone.
     * @param {number} week The week day in month.
     * @returns {DateTime} The DateTime object.
     */
    setWeekDayInMonth(week) {
        return this.setDate(
            this.getDate()
            + (
                week -
                this.getWeekDayInMonth()
            ) * 7
        )
    },

    /**
     * Set the week of month in current timeZone.
     * @param {number} week The week of month.
     * @returns {DateTime} The DateTime object.
     */
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
     * Set the local day of the week in current timeZone (and optionally, week and day of the week).
     * @param {number} year The local year.
     * @param {null|number} [week] The local week.
     * @param {null|number} [day] The local day of the week. (1 - 7)
     * @returns {DateTime} The DateTime object.
     */
    setWeekYear(year, week = null, day = null) {
        if (week === null) {
            week = Math.min(
                this.getWeek(),
                DateTime.fromArray([year, 1, 4]).weeksInYear()
            );
        }

        if (day === null) {
            day = this.getWeekDay();
        }

        return this.setYear(year, 1, 4 + ((week - 1) * 7)).setWeekDay(day);
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
