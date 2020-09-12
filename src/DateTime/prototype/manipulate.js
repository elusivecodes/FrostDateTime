/**
 * DateTime Manipulation
 */

Object.assign(DateTime.prototype, {

    /**
     * Add a duration to the date.
     * @param {number} amount The amount to modify the date by.
     * @param {string} timeUnit The unit of time.
     * @returns {DateTime} The DateTime object.
     */
    add(amount, timeUnit) {
        return this._modify(amount, timeUnit);
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
            case 'isoweek':
                return this.setISODay(7)
                    .setHours(23, 59, 59, 999);
            case 'month':
                return this.setDate(this.daysInMonth())
                    .setHours(23, 59, 59, 999);
            case 'quarter':
                const month = this.getQuarter() * 3;
                return this.setMonth(month, this.constructor.daysInMonth(this.getYear(), month))
                    .setHours(23, 59, 59, 999);
            case 'year':
                return this.setMonth(12, 31)
                    .setHours(23, 59, 59, 999);
            default:
                throw new Error('Invalid time unit supplied');
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
            case 'isoweek':
                return this.setISODay(1)
                    .setHours(0, 0, 0, 0);
            case 'month':
                return this.setDate(1)
                    .setHours(0, 0, 0, 0);
            case 'quarter':
                const month = this.getQuarter() * 3 - 2;
                return this.setMonth(month, 1)
                    .setHours(0, 0, 0, 0);
            case 'year':
                return this.setMonth(1, 1)
                    .setHours(0, 0, 0, 0);
            default:
                throw new Error('Invalid time unit supplied');
        }
    },

    /**
     * Subtract a duration from the date.
     * @param {number} amount The amount to modify the date by.
     * @param {string} timeUnit The unit of time.
     * @returns {DateTime} The DateTime object.
     */
    sub(amount, timeUnit) {
        return this._modify(-amount, timeUnit);
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
