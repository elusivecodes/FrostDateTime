Object.assign(DateTime, {

    /**
     * Get the day of the year for a year, month and date.
     * @param {number} year The year.
     * @param {number} month The month. (0, 11)
     * @param {number} date The date.
     * @returns {number} The day of the year. (1, 366)
     */
    dayOfYear(year, month, date) {
        return new Array(month)
            .fill()
            .reduce(
                (d, _, i) => d + this.daysInMonth(year, i),
                date
            );
    },

    /**
     * Get the number of days in a month, from a year and month.
     * @param {number} year The year.
     * @param {number} month The month. (0, 11)
     * @returns {number} The number of days in the month.
     */
    daysInMonth(year, month) {
        const date = new Date(Date.UTC(year, month));
        month = date.getUTCMonth();

        return this._monthDays[month]
            + (month == 1 && this.isLeapYear(date.getUTCFullYear()) ?
                1 :
                0
            );
    },

    /**
     * Get the number of days in a year.
     * @param {number} year The year.
     * @returns {number} The number of days in the year.
     */
    daysInYear(year) {
        return !this.isLeapYear(year) ?
            365 :
            366;
    },

    /**
     * Return true if a year is a leap year.
     * @param {number} year The year.
     * @returns {Boolean} TRUE if the year is a leap year, otherwise FALSE.
     */
    isLeapYear(year) {
        return new Date(year, 1, 29).getDate() === 29;
    },

    /**
     * Return a timezone for a date using an abbreviated name or offset.
     * @param {number|number[]|string|Date|DateTime} date The date to use when testing.
     * @param {string} [abbr] The timezone abbreviation.
     * @param {number} [offset] The timezone offset.
     * @returns {string} The timezone name.
     */
    timezoneFromAbbrOffset(date, abbr = null, offset = null) {
        if (abbr === 'UTC' || offset === 0) {
            return 'UTC';
        }

        return Object.keys(this._timezones)
            .find(timezone => {
                try {
                    const tempDate = new DateTime(date, timezone);
                    return (abbr === null || abbr === tempDate.getTimezoneAbbr())
                        && (offset === null || offset === tempDate.getTimezoneOffset());
                } catch (error) {
                    return;
                }
            });
    },

    /**
     * Get the number of ISO weeks in a year.
     * @param {number} year  The year.
     * @returns {number} The number of ISO weeks in the year.
     */
    weeksInISOYear(year) {
        return new DateTime([year, 11, 28]).getISOWeek();
    }

});
