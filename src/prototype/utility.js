import DateTime from './../date-time.js';
import { getRelativeFormatter } from './../factory.js';
import { compensateDiff, getBiggestDiff } from './../helpers.js';
import { formatDay, formatDayPeriod, formatEra, formatMonth, formatOffset, formatTimeZoneName } from './../formatter/format.js';
import { minimumDays } from './../formatter/utility.js';
import { daysInMonth as _daysInMonth, daysInYear as _daysInYear, isLeapYear as _isLeapYear } from './../static/utility.js';

/**
 * DateTime Utility
 */

/**
 * Get the name of the day of the week in current timeZone.
 * @param {string} [type=long] The type of day name to return.
 * @return {string} The name of the day of the week.
 */
export function dayName(type = 'long') {
    return formatDay(this.getLocale(), this.getDay(), type);
};

/**
 * Get the day period in current timeZone.
 * @param {string} [type=long] The type of day period to return.
 * @return {string} The day period.
 */
export function dayPeriod(type = 'long') {
    return formatDayPeriod(
        this.getLocale(),
        this.getHours() < 12 ?
            0 :
            1,
        type,
    );
};

/**
 * Get the number of days in the current month.
 * @return {number} The number of days in the current month.
 */
export function daysInMonth() {
    return _daysInMonth(
        this.getYear(),
        this.getMonth(),
    );
};

/**
 * Get the number of days in the current year.
 * @return {number} The number of days in the current year.
 */
export function daysInYear() {
    return _daysInYear(
        this.getYear(),
    );
};

/**
 * Get the difference between this and another Date.
 * @param {DateTime} [other] The date to compare to.
 * @param {string} [timeUnit] The unit of time.
 * @param {Boolean} [relative=true] Whether to use the relative difference.
 * @return {number} The difference.
 */
export function diff(other, timeUnit, relative = true) {
    if (!other) {
        other = new this.constructor;
    }

    if (!timeUnit) {
        return this - other;
    }

    if (timeUnit) {
        timeUnit = timeUnit.toLowerCase();
    }

    other = other.setTimeZone(this.getTimeZone());

    switch (timeUnit) {
        case 'year':
        case 'years':
            const yearDiff = this.getYear() - other.getYear();
            return compensateDiff(
                this,
                other.setYear(
                    this.getYear(),
                ),
                yearDiff,
                !relative,
                -1,
            );
        case 'month':
        case 'months':
            const monthDiff = (this.getYear() - other.getYear()) *
                12 +
                this.getMonth() -
                other.getMonth();
            return compensateDiff(
                this,
                other.setYear(
                    this.getYear(),
                    this.getMonth(),
                ),
                monthDiff,
                !relative,
                -1,
            );
        case 'week':
        case 'weeks':
            const weekDiff = (this - other) / 604800000;
            return compensateDiff(
                this,
                other.setWeekYear(
                    this.getWeekYear(),
                    this.getWeek(),
                ),
                weekDiff,
                relative,
            );
        case 'day':
        case 'days':
            const dayDiff = (this - other) / 86400000;
            return compensateDiff(
                this,
                other.setYear(
                    this.getYear(),
                    this.getMonth(),
                    this.getDate(),
                ),
                dayDiff,
                relative,
            );
        case 'hour':
        case 'hours':
            const hourDiff = (this - other) / 3600000;
            return compensateDiff(
                this,
                other.setYear(
                    this.getYear(),
                    this.getMonth(),
                    this.getDate(),
                ).setHours(
                    this.getHours(),
                ),
                hourDiff,
                relative,
            );
        case 'minute':
        case 'minutes':
            const minuteDiff = (this - other) / 60000;
            return compensateDiff(
                this,
                other.setYear(
                    this.getYear(),
                    this.getMonth(),
                    this.getDate(),
                ).setHours(
                    this.getHours(),
                    this.getMinutes(),
                ),
                minuteDiff,
                relative,
            );
        case 'second':
        case 'seconds':
            const secondDiff = (this - other) / 1000;
            return compensateDiff(
                this,
                other.setYear(
                    this.getYear(),
                    this.getMonth(),
                    this.getDate(),
                ).setHours(
                    this.getHours(),
                    this.getMinutes(),
                    this.getSeconds(),
                ),
                secondDiff,
                relative,
            );
        default:
            throw new Error('Invalid time unit supplied');
    }
};

/**
 * Get the era in current timeZone.
 * @param {string} [type=long] The type of era to return.
 * @return {string} The era.
 */
export function era(type = 'long') {
    return formatEra(
        this.getLocale(),
        this.getYear() < 0 ?
            0 :
            1,
        type,
    );
};

/**
 * Get the difference between this and another Date in human readable form.
 * @param {DateTime} [other] The date to compare to.
 * @param {string} [timeUnit] The unit of time.
 * @return {string} The difference in human readable form.
 */
export function humanDiff(other, timeUnit) {
    const relativeFormatter = getRelativeFormatter(this.getLocale());

    if (!relativeFormatter) {
        throw new Error('RelativeTimeFormat not supported');
    }

    if (!other) {
        other = new this.constructor;
    }

    let amount;
    if (timeUnit) {
        amount = this.diff(other, timeUnit);
    } else {
        [amount, timeUnit] = getBiggestDiff(this, other);
    }

    return relativeFormatter.format(amount, timeUnit);
};

/**
 * Determine whether this DateTime is after another date (optionally to a granularity).
 * @param {DateTime} [other] The date to compare to.
 * @param {string} [granularity] The level of granularity to use for comparison.
 * @return {Boolean} TRUE if this DateTime is after the other date, otherwise FALSE.
 */
export function isAfter(other, granularity) {
    return this.diff(other, granularity) > 0;
};

/**
 * Determine whether this DateTime is before another date (optionally to a granularity).
 * @param {DateTime} [other] The date to compare to.
 * @param {string} [granularity] The level of granularity to use for comparison.
 * @return {Boolean} TRUE if this DateTime is before the other date, otherwise FALSE.
 */
export function isBefore(other, granularity) {
    return this.diff(other, granularity) < 0;
};

/**
 * Determine whether this DateTime is between two other dates (optionally to a granularity).
 * @param {DateTime} [start] The first date to compare to.
 * @param {DateTime} [end] The second date to compare to.
 * @param {string} [granularity] The level of granularity to use for comparison.
 * @return {Boolean} TRUE if this DateTime is between the other dates, otherwise FALSE.
 */
export function isBetween(start, end, granularity) {
    return this.diff(start, granularity) > 0 && this.diff(end, granularity) < 0;
};

/**
 * Return true if the DateTime is in daylight savings.
 * @return {Boolean} TRUE if the current time is in daylight savings, otherwise FALSE.
 */
export function isDST() {
    if (!this.isDynamicTimeZone()) {
        return false;
    }

    const year = this.getYear();
    const dateA = DateTime.fromArray([year, 1, 1], {
        timeZone: this.getTimeZone(),
    });
    const dateB = DateTime.fromArray([year, 6, 1], {
        timeZone: this.getTimeZone(),
    });

    return this.getTimeZoneOffset() < Math.max(dateA.getTimeZoneOffset(), dateB.getTimeZoneOffset());
};

/**
 * Return true if the year is a leap year.
 * @return {Boolean} TRUE if the current year is a leap year, otherwise FALSE.
 */
export function isLeapYear() {
    return _isLeapYear(
        this.getYear(),
    );
};

/**
 * Determine whether this DateTime is the same as another date (optionally to a granularity).
 * @param {DateTime} [other] The date to compare to.
 * @param {string} [granularity] The level of granularity to use for comparison.
 * @return {Boolean} TRUE if this DateTime is the same as the other date, otherwise FALSE.
 */
export function isSame(other, granularity) {
    return this.diff(other, granularity) === 0;
};

/**
 * Determine whether this DateTime is the same or after another date (optionally to a granularity).
 * @param {DateTime} [other] The date to compare to.
 * @param {string} [granularity] The level of granularity to use for comparison.
 * @return {Boolean} TRUE if this DateTime is the same or after the other date, otherwise FALSE.
 */
export function isSameOrAfter(other, granularity) {
    return this.diff(other, granularity) >= 0;
};

/**
 * Determine whether this DateTime is the same or before another date.
 * @param {DateTime} other The date to compare to.
 * @param {string} [granularity] The level of granularity to use for comparison.
 * @return {Boolean} TRUE if this DateTime is the same or before the other date, otherwise FALSE.
 */
export function isSameOrBefore(other, granularity) {
    return this.diff(other, granularity) <= 0;
};

/**
 * Get the name of the month in current timeZone.
 * @param {string} [type=long] The type of month name to return.
 * @return {string} The name of the month.
 */
export function monthName(type = 'long') {
    return formatMonth(this.getLocale(), this.getMonth(), type);
};

/**
 * Get the name of the current timeZone.
 * @param {string} [type=long] The formatting type.
 * @return {string} The name of the time zone.
 */
export function timeZoneName(type = 'long') {
    return this.isDynamicTimeZone() ?
        formatTimeZoneName(this.getLocale(), this.getTime(), this.getTimeZone(), type) :
        'GMT' + formatOffset(this.getTimeZoneOffset(), true, type === 'short');
};

/**
 * Get the number of weeks in the current year.
 * @return {number} The number of weeks in the current year.
 */
export function weeksInYear() {
    const minDays = minimumDays(this.getLocale());
    return this.setMonth(12, 24 + minDays).getWeek();
};
