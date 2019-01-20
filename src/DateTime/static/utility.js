Object.assign(DateTime, {

    /**
     * Get the day of the year for a year, month and date
     * @param {int} year The year
     * @param {int} month The month (0, 11)
     * @param {int} date The date
     * @returns {int} The day of the year (1, 366)
     */
    dayOfYear(year, month, date)
    {
        for (let i = 0; i < month; i++) {
            date += this.daysInMonth(year, i);
        }

        return date;
    },

    /**
     * Get the number of days in a month, from a year and month
     * @param {int} year The year
     * @param {int} month The month (0, 11)
     * @returns {int} The number of days in the month
     */
    daysInMonth(year, month)
    {
        const date = new Date(Date.UTC(year, month));
        month = date.getUTCMonth();

        return this.monthDays[month]
            + (month == 1 && this.isLeapYear(date.getUTCFullYear()) ?
                1 :
                0
            );
    },

    /**
     * Get the number of days in a year
     * @param {int} year The year
     * @returns {int} The number of days in the year
     */
    daysInYear(year)
    {
        return !this.isLeapYear(year) ?
            365 :
            366;
    },

    /**
     * Returns true if a year is a leap year
     * @param {int} year The year
     * @returns {bool} Whether the year is a leap year
     */
    isLeapYear(year)
    {
        return new Date(year, 1, 29).getDate() === 29;
    },

    /**
     * Returns a timezone for a date using an abbreviated name or offset
     * @param {int|array|string|Date|DateTime} date The timestamp, date array, date string, Date object or DateTime object
     * @param {string} [abbr] The timezone abbreviation
     * @param {int} [offset] The timezone offset
     * @returns {string} The name of the timezone
     */
    timezoneFromAbbrOffset(date, abbr = null, offset = null)
    {
        if (abbr === 'UTC' || offset === 0) {
            return 'UTC';
        }

        return Object.keys(this.timezones)
            .find(timezone =>
            {
                const tempDate = new DateTime(date, timezone);
                return (abbr === null || abbr === tempDate.getTimezoneAbbr())
                    && (offset === null || offset === tempDate.getTimezoneOffset());
            });
    },

    /**
     * Get the number of ISO weeks in a year
     * @param {int} year The year
     * @returns {int} The number of ISO weeks in the year
     */
    weeksInISOYear(year)
    {
        return new DateTime([year, 11, 28]).getISOWeek();
    }

});