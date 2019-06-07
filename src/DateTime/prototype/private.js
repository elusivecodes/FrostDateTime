/**
 * DateTime Internal
 */

Object.assign(DateTime.prototype, {

    /**
     * Update the timezone offset for current timestamp.
     */
    _checkOffset() {
        this._offset = this._timezone === 'UTC' ?
            0 :
            (
                new Date(DateTime._utcFormatter.format(this))
                - new Date(this._formatter.format(this))
            )
            / 60000;
    },

    /**
     * Get the number of milliseconds since the UNIX epoch (offset to timezone).
     * @returns {number} The number of milliseconds since the UNIX epoch (offset to timezone).
     */
    _getOffsetTime() {
        return this.getTime() - (this._offset * 60000);
    },

    /**
     * Update the timezone transition for current timestamp.
     */
    _getTransition() {
        const timestamp = this.getTimestamp();

        this._transition = DateTime._timezones[this._timezone]
            .find(transition =>
                transition.start <= timestamp && transition.end >= timestamp
            );
    },

    /**
     * Update the formatter for current timezone.
     */
    _makeFormatter() {
        this._formatter = new Intl.DateTimeFormat(DateTime._formatterLocale, {
            ...DateTime._formatterOptions,
            timeZone: this._timezone
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

        const tempDate = new Date(this._getOffsetTime());

        if (interval.y) {
            tempDate.setUTCFullYear(tempDate.getUTCFullYear() + (interval.y * modify));
        }

        if (interval.m) {
            tempDate.setUTCMonth(tempDate.getUTCMonth() + (interval.m * modify));
        }

        if (interval.d) {
            tempDate.setUTCDate(tempDate.getUTCDate() + (interval.d * modify));
        }

        if (interval.h) {
            tempDate.setUTCHours(tempDate.getUTCHours() + (interval.h * modify));
        }

        if (interval.i) {
            tempDate.setUTCMinutes(tempDate.getUTCMinutes() + (interval.i * modify));
        }

        if (interval.s) {
            tempDate.setUTCSeconds(tempDate.getUTCSeconds() + (interval.s * modify));
        }

        if (interval.f) {
            tempDate.setUTCTime(tempDate.getUTCTime() + (interval.f * modify));
        }

        return this._setOffsetTime(tempDate.getTime());
    },

    /**
     * Set the number of milliseconds since the UNIX epoch (offset to timezone).
     * @param {number} time The number of milliseconds since the UNIX epoch (offset to timezone).
     * @returns {DateTime} The DateTime object.
     */
    _setOffsetTime(time) {
        return this.setTime(time + (this._offset * 60000));
    }

});
