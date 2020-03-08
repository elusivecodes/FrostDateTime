/**
 * DateTime Manipulation
 */

Object.assign(DateTime.prototype, {

    /**
     * Add a duration to the date.
     * @param {string} [durationString] The relative date string to add to the current date.
     * @returns {DateTime} The DateTime object.
     */
    add(durationString) {
        return this._modify(durationString);
    },

    /**
     * Add a DateInterval to the date.
     * @param {DateInterval} [interval] The DateInterval to add to the current date.
     * @returns {DateTime} The DateTime object.
     */
    addInterval(interval) {
        return this._modifyInterval(interval);
    },

    /**
     * Set the date to the last millisecond of the day in current timeZone.
     * @returns {DateTime} The DateTime object.
     */
    endOfDay() {
        return this.setHours(23)
            .endOfHour();
    },

    /**
     * Modify the DateTime by setting it to the end of a unit of time.
     * @param {string} [timeUnit] The unit of time.
     * @returns {DateTime} The DateTime object.
     */
    endOf(timeUnit) {
        timeUnit = timeUnit.toLowerCase();

        switch (timeUnit) {
            case 'second':
                return this.setMilliseconds(999);
            case 'minute':
                return this.setSeconds(59, 999);
            case 'hour':
                return this.setMinutes(59, 59, 999);
            case 'day':
            case 'date':
                return this.setHours(23, 59, 59, 999);
            case 'week':
                return this.setDay(6)
                    .setHours(23, 59, 59, 999);
            case 'isoWeek':
                return this.setISODay(7)
                    .setHours(23, 59, 59, 999);
            case 'month':
                return this.setDate(this.daysInMonth())
                    .setHours(23, 59, 59, 999);
            case 'quarter':
                const month = this.getQuarter() * 3 - 3;
                return this.setMonth(month, this.constructor.daysInMonth(this.getYear(), month))
                    .setHours(23, 59, 59, 999);
            case 'year':
            default:
                return this.setMonth(11, 31)
                    .setHours(23, 59, 59, 999);
        }
    },

    /**
     * Modify the DateTime by setting it to the start of a unit of time.
     * @param {string} [timeUnit] The unit of time.
     * @returns {DateTime} The DateTime object.
     */
    startOf(timeUnit) {
        timeUnit = timeUnit.toLowerCase();

        switch (timeUnit) {
            case 'second':
                return this.setMilliseconds(0);
            case 'minute':
                return this.setSeconds(0, 0);
            case 'hour':
                return this.setMinutes(0, 0, 0);
            case 'day':
            case 'date':
                return this.setHours(0, 0, 0, 0);
            case 'week':
                return this.setDay(0)
                    .setHours(0, 0, 0, 0);
            case 'isoWeek':
                return this.setISODay(0)
                    .setHours(0, 0, 0, 0);
            case 'month':
                return this.setDate(1)
                    .setHours(0, 0, 0, 0);
            case 'quarter':
                const month = this.getQuarter() * 3 - 3;
                return this.setMonth(month, 1)
                    .setHours(0, 0, 0, 0);
            case 'year':
            default:
                return this.setMonth(0, 1)
                    .setHours(0, 0, 0, 0);
        }
    },

    /**
     * Subtract a duration from the date.
     * @param {string} [durationString] The relative date string to subtract from the current date.
     * @returns {DateTime} The DateTime object.
     */
    sub(durationString) {
        return this._modify(durationString, true);
    },

    /**
     * Subtract a DateInterval to the date.
     * @param {DateInterval} [interval] The DateInterval to subtract from the current date.
     * @returns {DateTime} The DateTime object.
     */
    subInterval(interval) {
        return this._modifyInterval(interval, true);
    }

});
