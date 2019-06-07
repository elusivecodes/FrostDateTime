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
     * Set the date to the last millisecond of the day in current timezone.
     * @returns {DateTime} The DateTime object.
     */
    endOfDay() {
        return this.setHours(23)
            .endOfHour();
    },

    /**
     * Set the date to the last millisecond of the hour in current timezone.
     * @returns {DateTime} The DateTime object.
     */
    endOfHour() {
        return this.setMinutes(59)
            .endOfMinute();
    },

    /**
     * Set the date to the last millisecond of the minute in current timezone.
     * @returns {DateTime} The DateTime object.
     */
    endOfMinute() {
        return this.setSeconds(59)
            .endOfSecond();
    },

    /**
     * Set the date to the last millisecond of the month in current timezone.
     * @returns {DateTime} The DateTime object.
     */
    endOfMonth() {
        return this.setDate(this.daysInMonth())
            .endOfDay();
    },

    /**
     * Set the date to the last millisecond of the second in current timezone.
     * @returns {DateTime} The DateTime object.
     */
    endOfSecond() {
        return this.setMilliseconds(999)
    },

    /**
     * Set the date to the last millisecond of the week in current timezone.
     * @returns {DateTime} The DateTime object.
     */
    endOfWeek() {
        return this.setISODay(7)
            .endOfDay();
    },

    /**
     * Set the date to the last millisecond of the year in current timezone.
     * @returns {DateTime} The DateTime object.
     */
    endOfYear() {
        return this.setMonth(11)
            .endOfMonth();
    },

    /**
     * Set the date to the first millisecond of the day in current timezone.
     * @returns {DateTime} The DateTime object.
     */
    startOfDay() {
        return this.setHours(0)
            .startOfHour();
    },

    /**
     * Set the date to the first millisecond of the hour in current timezone.
     * @returns {DateTime} The DateTime object.
     */
    startOfHour() {
        return this.setMinutes(0)
            .startOfMinute();
    },

    /**
     * Set the date to the first millisecond of the minute in current timezone.
     * @returns {DateTime} The DateTime object.
     */
    startOfMinute() {
        return this.setSeconds(0)
            .startOfSecond();
    },

    /**
     * Set the date to the first millisecond of the month in current timezone.
     * @returns {DateTime} The DateTime object.
     */
    startOfMonth() {
        return this.setDate(1)
            .startOfDay();
    },

    /**
     * Set the date to the first millisecond of the second in current timezone.
     * @returns {DateTime} The DateTime object.
     */
    startOfSecond() {
        return this.setMilliseconds(0)
    },

    /**
     * Set the date to the first millisecond of the week in current timezone.
     * @returns {DateTime} The DateTime object.
     */
    startOfWeek() {
        return this.setISODay(1)
            .startOfDay();
    },

    /**
     * Set the date to the first millisecond of the year in current timezone.
     * @returns {DateTime} The DateTime object.
     */
    startOfYear() {
        return this.setMonth(0)
            .startOfMonth();
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
