/**
 * DateTime Helpers
 */

Object.assign(DateTime.prototype, {

    _adjustOffset() {
        if (!this._offset) {
            return;
        }

        const oldOffset = this._offset;
        this._utcDate.setTime(
            this.getTime()
            + this._offset * 60000
        );

        if (this._dynamicTz) {
            this._checkOffset();

            // compensate for DST transitions
            if (oldOffset !== this._offset) {
                this._utcDate.setTime(
                    this._utcDate.getTime()
                    - (oldOffset - this._offset) * 60000
                );
            }
        }
    },

    /**
     * Update the timeZone offset for current timestamp.
     */
    _checkOffset() {
        this._offset = this._timeZone === 'UTC' ?
            0 :
            (
                new Date(
                    this.constructor._utcFormatter.format(this)
                )
                - new Date(
                    this._formatter.format(this)
                )
            )
            / 60000;
    },

    /**
     * Compare this DateTime with another date.
     * @param {DateTime} other The date to compare to.
     * @param {string} granularity The level of granularity to use for comparison.
     * @param {function} callback The callback to compare the difference in values.
     * @returns {Boolean} TRUE if the comparison test was passed for the level of granularity, otherwise FALSE.
     */
    _compare(other, granularity, callback) {
        if (!granularity) {
            const timeDiff = this.getTime()
                - other.getTime();
            return callback(timeDiff) >= 0;
        }

        granularity = granularity.toLowerCase();

        for (const lookup of this.constructor._compareLookup) {
            const preCheck = !lookup.values.includes(granularity);
            const method = lookup.method;
            const diff = this[method]() - other[method]();
            const result = callback(diff, preCheck);

            if (result < 0) {
                return false;
            } else if (result > 0) {
                return true;
            }

            if (!preCheck) {
                break;
            }
        }

        return true;
    },

    /**
     * Get the number of milliseconds since the UNIX epoch (offset to timeZone).
     * @returns {number} The number of milliseconds since the UNIX epoch (offset to timeZone).
     */
    _getOffsetTime() {
        return this.getTime()
            - this._offset * 60000;
    },

    /**
     * Update the timeZone transition for current timestamp.
     */
    _getTransition() {
        const timestamp = this.getTimestamp();

        this._transition = this.constructor._timeZones[this._timeZone]
            .find(transition =>
                transition.start <= timestamp &&
                transition.end >= timestamp
            );
    },

    /**
     * Update the formatter for current timeZone.
     */
    _makeFormatter() {
        this._formatter = new Intl.DateTimeFormat(this.constructor._formatterLocale, {
            ...this.constructor._formatterOptions,
            timeZone: this._timeZone
        });
    },

    /**
     * Modify the DateTime by a duration.
     * @param {number} amount The amount to modify the date by.
     * @param {string} [timeUnit] The unit of time.
     * @return {DateTime} The DateTime object.
     */
    _modify(amount, timeUnit) {
        timeUnit = timeUnit.toLowerCase();

        switch (timeUnit) {
            case 'second':
            case 'seconds':
                return this.setSeconds(
                    this.getSeconds() + amount
                );
            case 'minute':
            case 'minutes':
                return this.setMinutes(
                    this.getMinutes() + amount
                );
            case 'hour':
            case 'hours':
                return this.setHours(
                    this.getHours() + amount
                );
            case 'week':
            case 'weeks':
                return this.setDate(
                    this.getDate() + (amount * 7)
                );
            case 'day':
            case 'days':
                return this.setDate(
                    this.getDate() + amount
                );
            case 'month':
            case 'months':
                return this.setMonth(
                    this.getMonth() + amount
                );
            case 'year':
            case 'years':
                return this.setYear(
                    this.getYear() + amount
                );
            default:
                throw new Error('Invalid time unit supplied');
        }
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
            tempDate.setUTCFullYear(
                tempDate.getUTCFullYear()
                + interval.y * modify
            );
        }

        if (interval.m) {
            tempDate.setUTCMonth(
                tempDate.getUTCMonth()
                + interval.m * modify
            );
        }

        if (interval.d) {
            tempDate.setUTCDate(
                tempDate.getUTCDate()
                + interval.d * modify
            );
        }

        if (interval.h) {
            tempDate.setUTCHours(
                tempDate.getUTCHours()
                + interval.h * modify
            );
        }

        if (interval.i) {
            tempDate.setUTCMinutes(
                tempDate.getUTCMinutes()
                + interval.i * modify
            );
        }

        if (interval.s) {
            tempDate.setUTCSeconds(
                tempDate.getUTCSeconds()
                + interval.s * modify
            );
        }

        if (interval.f) {
            tempDate.setUTCTime(
                tempDate.getUTCTime()
                + interval.f * modify
            );
        }

        return this._setOffsetTime(
            tempDate.getTime()
        );
    },

    /**
     * Set the number of milliseconds since the UNIX epoch (offset to timeZone).
     * @param {number} time The number of milliseconds since the UNIX epoch (offset to timeZone).
     * @returns {DateTime} The DateTime object.
     */
    _setOffsetTime(time) {
        return this.setTime(
            time +
            this._offset * 60000
        );
    }

});
