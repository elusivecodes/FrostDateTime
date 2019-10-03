/**
 * DateTime Helpers
 */

Object.assign(DateTime.prototype, {

    /**
     * Update the timeZone offset for current timestamp.
     */
    _checkOffset() {
        this._offset = this._timeZone === 'UTC' ?
            0 :
            (
                new Date(DateTime._utcFormatter.format(this))
                - new Date(this._formatter.format(this))
            )
            / 60000;
    },

    /**
     * Get the number of milliseconds since the UNIX epoch (offset to timeZone).
     * @returns {number} The number of milliseconds since the UNIX epoch (offset to timeZone).
     */
    _getOffsetTime() {
        return this.getTime() - (this._offset * 60000);
    },

    /**
     * Update the timeZone transition for current timestamp.
     */
    _getTransition() {
        const timestamp = this.getTimestamp();

        this._transition = DateTime._timeZones[this._timeZone]
            .find(transition =>
                transition.start <= timestamp && transition.end >= timestamp
            );
    },

    /**
     * Update the formatter for current timeZone.
     */
    _makeFormatter() {
        this._formatter = new Intl.DateTimeFormat(DateTime._formatterLocale, {
            ...DateTime._formatterOptions,
            timeZone: this._timeZone
        });
    },

    /**
     * Modify the DateTime by a duration.
     * @param {string} durationString The relative date string to modify the date by.
     * @param {Boolean} [invert=false] Whether to invert (subtract) the interval.
     * @return {DateTime} The DateTime object.
     */
    _modify(durationString, invert = false) {
        return this._modifyInterval(
            DateInterval.fromString(durationString),
            invert
        );
    },

    /**
     * Modify the DateTime by a DateInterval.
     * @param {DateInterval} interval The DateInterval to modify the date by.
     * @param {Boolean} [invert=false] Whether to invert (subtract) the interval.
     * @return {DateTime} The DateTime object.
     */
    _modifyInterval(interval, invert = false) {
        let modify = 1;

        if (interval.invert) {
            modify *= -1;
        }

        if (invert) {
            modify *= -1;
        }

        if (interval.y) {
            this._offsetDate.setUTCFullYear(this._offsetDate.getUTCFullYear() + (interval.y * modify));
        }

        if (interval.m) {
            this._offsetDate.setUTCMonth(this._offsetDate.getUTCMonth() + (interval.m * modify));
        }

        if (interval.d) {
            this._offsetDate.setUTCDate(this._offsetDate.getUTCDate() + (interval.d * modify));
        }

        if (interval.h) {
            this._offsetDate.setUTCHours(this._offsetDate.getUTCHours() + (interval.h * modify));
        }

        if (interval.i) {
            this._offsetDate.setUTCMinutes(this._offsetDate.getUTCMinutes() + (interval.i * modify));
        }

        if (interval.s) {
            this._offsetDate.setUTCSeconds(this._offsetDate.getUTCSeconds() + (interval.s * modify));
        }

        if (interval.f) {
            this._offsetDate.setUTCTime(this._offsetDate.getUTCTime() + (interval.f * modify));
        }

        return this._setOffsetTime(this._offsetDate.getTime());
    },

    /**
     * Set the number of milliseconds since the UNIX epoch (offset to timeZone).
     * @param {number} time The number of milliseconds since the UNIX epoch (offset to timeZone).
     * @returns {DateTime} The DateTime object.
     */
    _setOffsetTime(time) {
        return this.setTime(time + (this._offset * 60000));
    }

});
