/**
 * DateTime Utility
 */

Object.assign(DateTime.prototype, {

    /**
     * Create a new DateTime using the current date and timeZone.
     * @returns {DateTime} A new DateTime object.
     */
    clone() {
        return new DateTime(this);
    },

    /**
     * Get the ordinal suffix for the date of the month.
     * @returns {string} The ordinal suffix for the date of the month.
     */
    dateSuffix() {
        return DateTime.lang.ordinal(
            this.getDate()
        );
    },

    /**
     * Get the name of the day of the week in current timeZone.
     * @param {string} [type=full] The type of day name to return.
     * @returns {string} The name of the day of the week.
     */
    dayName(type = 'full') {
        return DateTime.lang.days[type][this.getDay()];
    },

    /**
     * Get the number of days in the current month.
     * @returns {number} The number of days in the current month.
     */
    daysInMonth() {
        return DateTime.daysInMonth(
            this.getYear(),
            this.getMonth()
        );
    },

    /**
     * Get the number of days in the current year.
     * @returns {number} The number of days in the current year.
     */
    daysInYear() {
        return DateTime.daysInYear(
            this.getYear()
        );
    },

    /**
     * Get the difference between two Dates.
     * @param {number|number[]|string|Date|DateTime} [other] The date to compare to.
     * @param {Boolean} [absolute=false] Whether the interval will be forced to be positive.
     * @returns {DateInterval} A new DateInterval object.
     */
    diff(other, absolute = false) {
        const tempDate = new DateTime(other, this._timeZone),
            interval = new DateInterval;

        if (this.getTime() === tempDate.getTime()) {
            return inverval;
        }

        const lessThan = this < tempDate,
            thisMonth = this.getMonth(),
            thisDate = this.getDate(),
            thisHour = this.getHours(),
            thisMinute = this.getMinutes(),
            thisSecond = this.getSeconds(),
            thisMillisecond = this.getMilliseconds()
                * 1000,
            otherMonth = tempDate.getMonth(),
            otherDate = tempDate.getDate(),
            otherHour = tempDate.getHours(),
            otherMinute = tempDate.getMinutes(),
            otherSecond = tempDate.getSeconds(),
            otherMillisecond = tempDate.getMilliseconds()
                * 1000;

        interval.y = Math.abs(
            this.getYear()
            - tempDate.getYear()
        );
        interval.m = Math.abs(
            thisMonth
            - otherMonth
        );
        interval.d = Math.abs(
            thisDate
            - otherDate
        );
        interval.h = Math.abs(
            thisHour
            - otherHour
        );
        interval.i = Math.abs(
            thisMinute
            - otherMinute
        );
        interval.s = Math.abs(
            thisSecond
            - otherSecond
        );
        interval.f = Math.abs(
            thisMillisecond
            - otherMillisecond
        );
        interval.days = (
            Math.abs(
                (this - tempDate)
                / 86400000
            )
        ) | 0;
        interval.invert = !absolute && lessThan;

        if (
            interval.y &&
            interval.m &&
            (
                (
                    !lessThan &&
                    thisMonth < otherMonth
                ) ||
                (
                    lessThan &&
                    thisMonth > otherMonth
                )
            )
        ) {
            interval.y--;
            interval.m = 12 - interval.m;
        }

        if (
            interval.m &&
            interval.d &&
            (
                (!
                    lessThan &&
                    thisDate < otherDate
                ) ||
                (
                    lessThan &&
                    thisDate > otherDate
                )
            )
        ) {
            interval.m--;
            interval.d = (
                lessThan ?
                    this.daysInMonth() :
                    tempDate.daysInMonth()
            ) - interval.d;
        }

        if (
            interval.d &&
            interval.h &&
            (
                (
                    !lessThan &&
                    thisHour < otherHour
                ) ||
                (
                    lessThan &&
                    thisHour > otherHour
                )
            )
        ) {
            interval.d--;
            interval.h = 24 - interval.h;
        }

        if (
            interval.h &&
            interval.i &&
            (
                (
                    !lessThan &&
                    thisMinute < otherMinute
                ) ||
                (
                    lessThan &&
                    thisMinute > otherMinute
                )
            )
        ) {
            interval.h--;
            interval.i = 60 - interval.i;
        }

        if (
            interval.i &&
            interval.s &&
            (
                (
                    !lessThan &&
                    thisSecond < otherSecond
                ) ||
                (
                    lessThan &&
                    thisSecond > otherSecond
                )
            )
        ) {
            interval.i--;
            interval.s = 60 - interval.s;
        }

        if (
            interval.s &&
            interval.f &&
            (
                (
                    !lessThan &&
                    thisMillisecond < otherMillisecond
                ) ||
                (
                    lessThan &&
                    thisMillisecond > otherMillisecond
                )
            )
        ) {
            interval.s--;
            interval.f = 1000000 - interval.f;
        }

        return interval;
    },

    /**
     * Determine whether this DateTime is after another date (optionally to a granularity).
     * @param {number|number[]|string|Date|DateTime} [other] The date to compare to.
     * @param {string} [granularity] The level of granularity to use for comparison.
     * @returns {Boolean} TRUE if this DateTime is after the other date, otherwise FALSE.
     */
    isAfter(other, granularity) {
        return this._compare(
            other,
            granularity,
            (diff, preCheck) => {
                if (diff > 0) {
                    return 1;
                }

                if (diff < 0 || (!diff && !preCheck)) {
                    return -1;
                }

                return 0;
            }
        );
    },

    /**
     * Determine whether this DateTime is before another date (optionally to a granularity).
     * @param {number|number[]|string|Date|DateTime} [other] The date to compare to.
     * @param {string} [granularity] The level of granularity to use for comparison.
     * @returns {Boolean} TRUE if this DateTime is before the other date, otherwise FALSE.
     */
    isBefore(other, granularity) {
        return this._compare(
            other,
            granularity,
            (diff, preCheck) => {
                if (diff < 0) {
                    return 1;
                }

                if (diff > 0 || (!diff && !preCheck)) {
                    return -1;
                }

                return 0;
            }
        );
    },

    /**
     * Determine whether this DateTime is between two other dates (optionally to a granularity).
     * @param {number|number[]|string|Date|DateTime} [other1] The first date to compare to.
     * @param {number|number[]|string|Date|DateTime} [other2] The second date to compare to.
     * @param {string} [granularity] The level of granularity to use for comparison.
     * @returns {Boolean} TRUE if this DateTime is between the other dates, otherwise FALSE.
     */
    isBetween(other1, other2, granularity) {
        return this.isAfter(other1, granularity) &&
            this.isBefore(other2, granularity);
    },

    /**
     * Return true if the DateTime is in daylight savings.
     * @returns {Boolean} TRUE if the current time is in daylight savings, otherwise FALSE.
     */
    isDST() {
        if (!this._transition.dst) {
            return false;
        }

        const year = this.getYear(),
            dateA = new DateTime([year, 0, 1], this._timeZone),
            dateB = new DateTime([year, 5, 1], this._timeZone);

        if (dateA.getTimestamp() < this._transition.start) {
            dateA.setYear(year + 1);
        }

        if (dateB.getTimestamp() > this._transition.end) {
            dateB.setYear(year - 1);
        }

        if (
            dateA.getTimestamp() > this._transition.end ||
            dateB.getTimestamp() < this._transition.start
        ) {
            dateA.setTimestamp(this._transition.start);
            dateB.setTimestamp(this._transition.end);
        }

        return this._offset < Math.max(dateA._offset, dateB._offset);
    },

    /**
     * Return true if the year is a leap year.
     * @returns {Boolean} TRUE if the current year is a leap year, otherwise FALSE.
     */
    isLeapYear() {
        return DateTime.isLeapYear(
            this.getYear()
        );
    },

    /**
     * Determine whether this DateTime is the same as another date (optionally to a granularity).
     * @param {number|number[]|string|Date|DateTime} [other] The date to compare to.
     * @param {string} [granularity] The level of granularity to use for comparison.
     * @returns {Boolean} TRUE if this DateTime is the same as the other date, otherwise FALSE.
     */
    isSame(other, granularity) {
        return this._compare(
            other,
            granularity,
            diff => diff ?
                -1 :
                0
        );
    },

    /**
     * Determine whether this DateTime is the same or after another date (optionally to a granularity).
     * @param {number|number[]|string|Date|DateTime} [other] The date to compare to.
     * @param {string} [granularity] The level of granularity to use for comparison.
     * @returns {Boolean} TRUE if this DateTime is the same or after the other date, otherwise FALSE.
     */
    isSameOrAfter(other, granularity) {
        return this._compare(
            other,
            granularity,
            diff => {
                if (diff > 0) {
                    return 1;
                }

                if (diff < 0) {
                    return -1;
                }

                return 0;
            }
        );
    },

    /**
     * Determine whether this DateTime is the same or before another date.
     * @param {number|number[]|string|Date|DateTime} other The date to compare to.
     * @param {string} [granularity] The level of granularity to use for comparison.
     * @returns {Boolean} TRUE if this DateTime is the same or before the other date, otherwise FALSE.
     */
    isSameOrBefore(other, granularity) {
        return this._compare(
            other,
            granularity,
            diff => {
                if (diff < 0) {
                    return 1;
                }

                if (diff > 0) {
                    return -1;
                }

                return 0;
            }
        );
    },

    /**
     * Get the name of the month in current timeZone.
     * @param {string} [type=full] The type of month name to return.
     * @returns {string} The name of the month.
     */
    monthName(type = 'full') {
        return DateTime.lang.months[type][this.getMonth()];
    },

    /**
     * Get the number of weeks in the current ISO year.
     * @returns {number} The number of weeks in the current ISO year.
     */
    weeksInISOYear() {
        return DateTime.weeksInISOYear(this.getISOYear());
    }

});
