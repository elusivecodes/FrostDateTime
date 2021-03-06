/**
 * DateTime Helpers
 */

Object.assign(DateTime.prototype, {

    /**
     * Adjust the timestamp by the current offset.
     */
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
     * Compensate the difference between this and another Date.
     * @param {number} amount The amount to compensate.
     * @param {DateTime} [other] The date to compare to.
     * @param {Boolean} [compensate=true] Whether to compensate the amount.
     * @param {number} [compensation=1] The compensation offset.
     * @return {number} The compensated amount.
     */
    _compensateDiff(amount, other, compensate = true, compensation = 1) {
        if (amount > 0) {
            amount = Math.floor(amount);

            if (compensate && this < other) {
                amount += compensation;
            }
        } else if (amount < 0) {
            amount = Math.ceil(amount);

            if (compensate && this > other) {
                amount -= compensation;
            }
        }

        return amount;
    },

    /**
     * Get the biggest difference between this and another Date.
     * @param {DateTime} [other] The date to compare to.
     * @return {array} The biggest difference (amount and time unit).
     */
    _getBiggestDiff(other) {
        const limits = {
            month: 12,
            day: Math.min(this.daysInMonth(), other.daysInMonth()),
            hour: 24,
            minute: 60,
            second: 60
        };

        let lastResult;
        for (const timeUnit of ['year', 'month', 'day', 'hour', 'minute', 'second']) {
            const relativeDiff = this.diff(other, timeUnit);
            if (lastResult && Math.abs(relativeDiff) >= limits[timeUnit]) {
                return lastResult;
            }

            const actualDiff = this.diff(other, timeUnit, false);
            if (actualDiff) {
                return [relativeDiff, timeUnit];
            }

            if (relativeDiff) {
                lastResult = [relativeDiff, timeUnit];
            } else {
                lastResult = null;
            }
        }

        return lastResult ?
            lastResult :
            [0, 'second'];
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
     * Update the formatter for current timeZone.
     */
    _makeFormatter() {
        this._formatter = new Intl.DateTimeFormat(this.constructor._formatterLocale, {
            ...this.constructor._formatterOptions,
            timeZone: this.getTimeZone()
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
