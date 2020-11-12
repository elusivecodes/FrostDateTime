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
     * Get the difference between two Dates.
     * @param {DateTime} [other] The date to compare to.
     * @param {Boolean} [absolute=false] Whether the interval will be forced to be positive.
     * @returns {object} A new object.
     */
    diff(other = null, absolute = false) {
        const interval = {};

        const lessThan = this < other,
            thisMonth = this.getMonth(),
            thisDate = this.getDate(),
            thisHour = this.getHours(),
            thisMinute = this.getMinutes(),
            thisSecond = this.getSeconds(),
            thisMillisecond = this.getMilliseconds()
                * 1000,
            otherMonth = other.getMonth(),
            otherDate = other.getDate(),
            otherHour = other.getHours(),
            otherMinute = other.getMinutes(),
            otherSecond = other.getSeconds(),
            otherMillisecond = other.getMilliseconds()
                * 1000;

        interval.y = Math.abs(
            this.getYear()
            - other.getYear()
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
                (this - other)
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
                    other.daysInMonth()
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
     * Determine whether this DateTime is after another date (optionally to a granularity).
     * @param {DateTime} [other] The date to compare to.
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
     * @param {DateTime} [other] The date to compare to.
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
     * @param {DateTime} [start] The first date to compare to.
     * @param {DateTime} [end] The second date to compare to.
     * @param {string} [granularity] The level of granularity to use for comparison.
     * @returns {Boolean} TRUE if this DateTime is between the other dates, otherwise FALSE.
     */
    isBetween(start, end, granularity) {
        return this.isAfter(start, granularity) &&
            this.isBefore(end, granularity);
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
     * @param {DateTime} [other] The date to compare to.
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
     * @param {DateTime} other The date to compare to.
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
        return this.clone().setMonth(12, 28).getWeek();
    }

});
