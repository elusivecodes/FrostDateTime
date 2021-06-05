/**
 * DateTime Utility
 */

Object.assign(DateTime.prototype, {

    /**
     * Create a new DateTime using the current date and timeZone.
     * @returns {DateTime} A new DateTime object.
     */
    clone() {
        return this.constructor.fromTimestamp(this.getTimestamp(), {
            locale: this.getLocale(),
            timeZone: this.getTimeZone()
        });
    },

    /**
     * Get the name of the day of the week in current timeZone.
     * @param {string} [type=long] The type of day name to return.
     * @returns {string} The name of the day of the week.
     */
    dayName(type = 'long') {
        return this.formatter.formatDay(this.getDay(), type);
    },

    /**
     * Get the day period in current timeZone.
     * @param {string} [type=long] The type of day period to return.
     * @returns {string} The day period.
     */
    dayPeriod(type = 'long') {
        return this.formatter.formatDayPeriod(
            this.getHours() < 12 ?
                0 :
                1,
            type
        );
    },

    /**
     * Get the number of days in the current month.
     * @returns {number} The number of days in the current month.
     */
    daysInMonth() {
        return this.constructor.daysInMonth(
            this.getYear(),
            this.getMonth()
        );
    },

    /**
     * Get the number of days in the current year.
     * @returns {number} The number of days in the current year.
     */
    daysInYear() {
        return this.constructor.daysInYear(
            this.getYear()
        );
    },

    /**
     * Get the difference between this and another Date.
     * @param {DateTime} [other] The date to compare to.
     * @param {string} [timeUnit] The unit of time.
     * @param {Boolean} [relative=true] Whether to use the relative difference.
     * @returns {number} The difference.
     */
    diff(other, timeUnit, relative = true) {
        if (!other) {
            other = new this.constructor;
        }

        if (!timeUnit) {
            return this - other;
        }

        if (timeUnit) {
            timeUnit = timeUnit.toLowerCase();
        }

        other = other.clone().setTimeZone(this.getTimeZone());

        switch (timeUnit) {
            case 'year':
            case 'years':
                return this._compensateDiff(
                    this.getYear() - other.getYear(),
                    other.setYear(
                        this.getYear()
                    ),
                    !relative,
                    -1
                );
            case 'month':
            case 'months':
                return this._compensateDiff(
                    (this.getYear() - other.getYear())
                    * 12
                    + this.getMonth()
                    - other.getMonth(),
                    other.setYear(
                        this.getYear(),
                        this.getMonth()
                    ),
                    !relative,
                    -1
                );
            case 'day':
            case 'days':
                return this._compensateDiff(
                    (this - other) / 86400000,
                    other.setYear(
                        this.getYear(),
                        this.getMonth(),
                        this.getDate()
                    ),
                    relative
                );
            case 'hour':
            case 'hours':
                return this._compensateDiff(
                    (this - other) / 3600000,
                    other.setYear(
                        this.getYear(),
                        this.getMonth(),
                        this.getDate()
                    ).setHours(
                        this.getHours()
                    ),
                    relative
                );
            case 'minute':
            case 'minutes':
                return this._compensateDiff(
                    (this - other) / 60000,
                    other.setYear(
                        this.getYear(),
                        this.getMonth(),
                        this.getDate()
                    ).setHours(
                        this.getHours(),
                        this.getMinutes()
                    ),
                    relative
                );
            case 'second':
            case 'seconds':
                return this._compensateDiff(
                    (this - other) / 1000,
                    other.setYear(
                        this.getYear(),
                        this.getMonth(),
                        this.getDate()
                    ).setHours(
                        this.getHours(),
                        this.getMinutes(),
                        this.getSeconds()
                    ),
                    relative
                );
            default:
                throw new Error('Invalid time unit supplied');
        }
    },

    /**
     * Get the era in current timeZone.
     * @param {string} [type=long] The type of era to return.
     * @returns {string} The era.
     */
    era(type = 'long') {
        return this.formatter.formatEra(
            this.getYear() < 0 ?
                0 :
                1,
            type
        );
    },

    /**
     * Get the difference between this and another Date in human readable form.
     * @param {DateTime} [other] The date to compare to.
     * @param {string} [timeUnit] The unit of time.
     * @returns {string} The difference in human readable form.
     */
    humanDiff(other, timeUnit) {
        if (!other) {
            other = new this.constructor;
        }

        let amount;
        if (timeUnit) {
            amount = this.diff(other, timeUnit);
        } else {
            [amount, timeUnit] = this._getBiggestDiff(other);
        }

        return this.relativeFormatter.format(amount, timeUnit);
    },

    /**
     * Determine whether this DateTime is after another date (optionally to a granularity).
     * @param {DateTime} [other] The date to compare to.
     * @param {string} [granularity] The level of granularity to use for comparison.
     * @returns {Boolean} TRUE if this DateTime is after the other date, otherwise FALSE.
     */
    isAfter(other, granularity) {
        return this.diff(other, granularity) > 0;
    },

    /**
     * Determine whether this DateTime is before another date (optionally to a granularity).
     * @param {DateTime} [other] The date to compare to.
     * @param {string} [granularity] The level of granularity to use for comparison.
     * @returns {Boolean} TRUE if this DateTime is before the other date, otherwise FALSE.
     */
    isBefore(other, granularity) {
        return this.diff(other, granularity) < 0;
    },

    /**
     * Determine whether this DateTime is between two other dates (optionally to a granularity).
     * @param {DateTime} [start] The first date to compare to.
     * @param {DateTime} [end] The second date to compare to.
     * @param {string} [granularity] The level of granularity to use for comparison.
     * @returns {Boolean} TRUE if this DateTime is between the other dates, otherwise FALSE.
     */
    isBetween(start, end, granularity) {
        return this.diff(start, granularity) > 0 && this.diff(end, granularity) < 0;
    },

    /**
     * Return true if the DateTime is in daylight savings.
     * @returns {Boolean} TRUE if the current time is in daylight savings, otherwise FALSE.
     */
    isDST() {
        if (!this._dynamicTz) {
            return false;
        }

        const year = this.getYear(),
            dateA = DateTime.fromArray([year, 1, 1], {
                timeZone: this.getTimeZone()
            }),
            dateB = DateTime.fromArray([year, 6, 1], {
                timeZone: this.getTimeZone()
            });

        return this._offset < Math.max(dateA._offset, dateB._offset);
    },

    /**
     * Return true if the year is a leap year.
     * @returns {Boolean} TRUE if the current year is a leap year, otherwise FALSE.
     */
    isLeapYear() {
        return this.constructor.isLeapYear(
            this.getYear()
        );
    },

    /**
     * Determine whether this DateTime is the same as another date (optionally to a granularity).
     * @param {DateTime} [other] The date to compare to.
     * @param {string} [granularity] The level of granularity to use for comparison.
     * @returns {Boolean} TRUE if this DateTime is the same as the other date, otherwise FALSE.
     */
    isSame(other, granularity) {
        return this.diff(other, granularity) === 0;
    },

    /**
     * Determine whether this DateTime is the same or after another date (optionally to a granularity).
     * @param {DateTime} [other] The date to compare to.
     * @param {string} [granularity] The level of granularity to use for comparison.
     * @returns {Boolean} TRUE if this DateTime is the same or after the other date, otherwise FALSE.
     */
    isSameOrAfter(other, granularity) {
        return this.diff(other, granularity) >= 0;
    },

    /**
     * Determine whether this DateTime is the same or before another date.
     * @param {DateTime} other The date to compare to.
     * @param {string} [granularity] The level of granularity to use for comparison.
     * @returns {Boolean} TRUE if this DateTime is the same or before the other date, otherwise FALSE.
     */
    isSameOrBefore(other, granularity) {
        return this.diff(other, granularity) <= 0;
    },

    /**
     * Get the name of the month in current timeZone.
     * @param {string} [type=long] The type of month name to return.
     * @returns {string} The name of the month.
     */
    monthName(type = 'long') {
        return this.formatter.formatMonth(this.getMonth(), type);
    },

    /**
     * Get the name of the current timeZone.
     * @param {string} [type=long] The formatting type.
     * @returns {string} The name of the time zone.
     */
    timeZoneName(type = 'long') {
        return this._dynamicTz ?
            this.formatter.formatTimeZoneName(this._utcDate, this.getTimeZone(), type) :
            DateFormatter.formatOffset(this.getTimeZoneOffset(), true, type === 'short');
    },

    /**
     * Get the number of weeks in the current ISO year.
     * @returns {number} The number of weeks in the current ISO year.
     */
    weeksInYear() {
        const minimumDays = this.formatter.minimumDays();
        return this.clone().setMonth(12, 24 + minimumDays).getWeek();
    }

});
