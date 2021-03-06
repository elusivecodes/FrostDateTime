/**
 * DateTime (Static) Utility
 */

Object.assign(DateTime, {

    /**
     * Get the day of the year for a year, month and date.
     * @param {number} year The year.
     * @param {number} month The month. (1, 12)
     * @param {number} date The date.
     * @returns {number} The day of the year. (1, 366)
     */
    dayOfYear(year, month, date) {
        return new Array(month - 1)
            .fill()
            .reduce(
                (d, _, i) =>
                    d + this.daysInMonth(year, i + 1),
                date
            );
    },

    /**
     * Get the number of days in a month, from a year and month.
     * @param {number} year The year.
     * @param {number} month The month. (1, 12)
     * @returns {number} The number of days in the month.
     */
    daysInMonth(year, month) {
        const date = new Date(Date.UTC(year, month - 1));
        month = date.getUTCMonth();

        return this._monthDays[month]
            + (
                month == 1 && this.isLeapYear(
                    date.getUTCFullYear()
                ) ?
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
        return new Date(year, 1, 29)
            .getDate() === 29;
    },

    /**
     * Set whether dates will be clamped when changing months.
     * @param {Boolean} clampDates Whether to clamp dates.
     */
    setDateClamping(clampDates) {
        this._clampDates = clampDates;
    },

    /**
     * Set the default locale.
     * @param {string} locale The locale.
     */
    setDefaultLocale(locale) {
        this._defaultLocale = locale;
    },

    /**
     * Set the default timeZone.
     * @param {string} timeZone The name of the timeZone.
     */
    setDefaultTimeZone(timeZone) {
        this._defaultTimeZone = timeZone;
    }

});
