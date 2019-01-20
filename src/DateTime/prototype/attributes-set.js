Object.assign(DateTime.prototype, {

    /**
     * Set the internet swatch time beat in current timezone
     * @param {int} beat The beat to set
     * @returns {DateTime}
     */
    setBeat(beat)
    {
        return this.setTime(
            new Date(this.getTime() + 3600000)
                .setUTCHours(
                    0,
                    0,
                    0,
                    beat * 86400
                )
            - 3600000
        );
    },

    /**
     * Set the date of the month in current timezone
     * @param {int} date The date to set
     * @returns {DateTime}
     */
    setDate(date)
    {
        return this._setOffsetTime(
            new Date(this._getOffsetTime())
                .setUTCDate(date)
        );
    },

    /**
     * Set the day of the week in current timezone
     * @param {int} day The day of the week to set (0 - Sunday, 6 - Saturday)
     * @returns {DateTime}
     */
    setDay(day)
    {
        return this._setOffsetTime(
            new Date(this._getOffsetTime())
                .setUTCDate(this.getDate() - this.getDay() + day)
        );
    },

    /**
     * Set the day of the year in current timezone
     * @param {int} day The day of the year to set (1, 366)
     * @returns {DateTime}
     */
    setDayOfYear(day)
    {
        return this._setOffsetTime(
            new Date(this._getOffsetTime())
                .setUTCMonth(
                    0,
                    day
                )
        );
    },

    /**
     * Set the hours in current timezone (and optionally, minutes, seconds and milliseconds)
     * @param {int} hours The hours to set (0, 23)
     * @param {int} [minutes] The minutes to set (0, 59)
     * @param {int} [seconds] The seconds to set (0, 59)
     * @param {int} [milliseconds] The milliseconds to set
     * @returns {DateTime}
     */
    setHours(...args)
    {
        return this._setOffsetTime(
            new Date(this._getOffsetTime())
                .setUTCHours(...args)
        );
    },

    /**
     * Set the ISO day of the week in current timezone
     * @param {int} day The ISO day of the week to set (1 - Monday, 7 - Sunday)
     * @returns {DateTime}
     */
    setISODay(day)
    {
        return this._setOffsetTime(
            new Date(this._getOffsetTime())
                .setUTCDate(this.getDate() - this.getISODay() + day)
        );
    },

    /**
     * Set the ISO day of the week in current timezone (and optionally, day of the week)
     * @param {int} week The ISO week to set
     * @param {int} [day] The ISO day of the week to set (1 - Monday, 7 - Sunday)
     * @returns {DateTime}
     */
    setISOWeek(week, day = null)
    {
        if (day === null) {
            day = this.getISODay();
        }

        const tempDate = new Date(this._getOffsetTime());
        tempDate.setUTCMonth(0, 4 + ((week - 1) * 7));

        return this._setOffsetTime(
            tempDate.setUTCDate(tempDate.getUTCDate() - DateTime._isoDay(tempDate.getUTCDay()) + day)
        );
    },

    /**
     * Set the ISO day of the week in current timezone (and optionally, week and day of the week)
     * @param {int} year The ISO year to set
     * @param {int} [week] The ISO week to set
     * @param {int} [day] The ISO day of the week to set (1 - Monday, 7 - Sunday)
     * @returns {DateTime}
     */
    setISOYear(year, week = null, day = null)
    {
        if (week === null) {
            week = this.getISODay();
        }

        if (day === null) {
            day = this.getISODay();
        }

        const tempDate = new Date(this._getOffsetTime());
        tempDate.setUTCFullYear(year, 0, 4 + ((week - 1) * 7));

        return this._setOffsetTime(
            tempDate.setUTCDate(tempDate.getUTCDate() - DateTime._isoDay(tempDate.getUTCDay()) + day)
        );
    },

    /**
     * Set the milliseconds in current timezone
     * @param {int} milliseconds The milliseconds to set
     * @returns {DateTime}
     */
    setMilliseconds(ms)
    {
        return this._setOffsetTime(
            new Date(this._getOffsetTime())
                .setUTCMilliseconds(ms)
        );
    },

    /**
     * Set the minutes in current timezone (and optionally, seconds and milliseconds)
     * @param {int} minutes The minutes to set (0, 59)
     * @param {int} [seconds] The seconds to set (0, 59)
     * @param {int} [milliseconds] The milliseconds to set
     * @returns {DateTime}
     */
    setMinutes(...args)
    {
        return this._setOffsetTime(
            new Date(this._getOffsetTime())
                .setUTCMinutes(...args)
        );
    },

    /**
     * Set the month in current timezone (and optionally, date)
     * @param {int} month The month to set (0, 11)
     * @param {int} [date] The date of the month to set
     * @returns {DateTime}
     */
    setMonth(month, date = null)
    {
        if (date === null) {
            date = Math.min(
                this.getDate(),
                DateTime.daysInMonth(
                    this.getYear(),
                    month
                )
            );
        }

        return this._setOffsetTime(
            new Date(this._getOffsetTime())
                .setUTCMonth(
                    month,
                    date
                )
        );
    },

    /**
     * Set the quarter of the year in current timezone
     * @param {int} quarter The quarter of the year to set (1, 4)
     * @returns {DateTime}
     */
    setQuarter(quarter)
    {
        return this._setOffsetTime(
            new Date(this._getOffsetTime())
                .setUTCMonth(quarter * 3 - 3)
        );
    },

    /**
     * Set the seconds in current timezone (and optionally, milliseconds)
     * @param {int} seconds The seconds to set (0, 59)
     * @param {int} [milliseconds] The milliseconds to set
     * @returns {DateTime}
     */
    setSeconds(...args)
    {
        return this._setOffsetTime(
            new Date(this._getOffsetTime())
                .setUTCSeconds(...args)
        );
    },

    /**
     * Set the number of milliseconds since the UNIX epoch
     * @param {int} time The number of milliseconds since the UNIX epoch to set
     * @returns {DateTime}
     */
    setTime(time)
    {
        this.utcDate.setTime(time);
        this._checkOffset();
        const timestamp = time / 1000;
        if (timestamp < this.transition.start || timestamp > this.transition.end) {
            this._getTransition();
        }

        return this;
    },

    /**
     * Set the number of seconds since the UNIX epoch
     * @param {int} timestamp The number of seconds since the UNIX epoch to set
     * @returns {DateTime}
     */
    setTimestamp(timestamp)
    {
        return this.setTime(timestamp * 1000);
    },

    /**
     * Set the current timezone
     * @param {string} timezone The name of the timezone to set
     * @returns {DateTime}
     */
    setTimezone(timezone)
    {
        if (!DateTime.timezones[timezone]) {
            return this;
        }

        this.timezone = timezone;
        this._makeFormatter();
        this._checkOffset();
        this._getTransition();

        return this;
    },

    /**
     * Set the year in current timezone (and optionally, month and date)
     * @param {int} year The year to set
     * @param {int} [month] The month to set (0, 11)
     * @param {int} [date] The date of the month to set
     * @returns {DateTime}
     */
    setYear(year, month = null, date = null)
    {
        if (month === null) {
            month = this.getMonth();
        }

        if (date === null) {
            date = Math.min(
                this.getDate(),
                DateTime.daysInMonth(
                    year,
                    month
                )
            );
        }

        return this._setOffsetTime(
            new Date(this._getOffsetTime())
                .setUTCFullYear(
                    year,
                    month,
                    date
                )
        );
    }

});